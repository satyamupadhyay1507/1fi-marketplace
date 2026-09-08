/**
 * 1Fi Mutual Fund Portfolio & Credit Limit Service
 * Manages mutual fund holdings, credit lines, and loan liens.
 * Integrates with Neon PostgreSQL serverless backend with transparent
 * offline/localStorage fallback.
 */

export const INITIAL_PORTFOLIO = {
  investorName: 'Satyam Upadhyay',
  panMasked: 'ABCDE****F',
  phoneMasked: '+91 98****0195',
  totalPortfolioValue: 485000,
  maxEligibleLimit: 290000, // ~60% of MF portfolio
  usedLimit: 0,
  isFetched: true,
  lastUpdated: 'Just now',
  funds: [
    {
      id: 'fund-1',
      schemeName: 'Parag Parikh Flexi Cap Fund - Direct Growth',
      category: 'Equity - Flexi Cap',
      isin: 'INF879O01019',
      currentValue: 185000,
      nav: 82.45,
      units: 2243.78,
      pledgeableRatio: 0.60,
      pledgedAmount: 0,
      rta: 'CAMS'
    },
    {
      id: 'fund-2',
      schemeName: 'Nippon India Small Cap Fund - Direct Growth',
      category: 'Equity - Small Cap',
      isin: 'INF204K01XF1',
      currentValue: 140000,
      nav: 164.20,
      units: 852.61,
      pledgeableRatio: 0.55,
      pledgedAmount: 0,
      rta: 'KFintech'
    },
    {
      id: 'fund-3',
      schemeName: 'Mirae Asset Large Cap Fund - Direct Growth',
      category: 'Equity - Large Cap',
      isin: 'INF769K01168',
      currentValue: 110000,
      nav: 112.50,
      units: 977.77,
      pledgeableRatio: 0.65,
      pledgedAmount: 0,
      rta: 'KFintech'
    },
    {
      id: 'fund-4',
      schemeName: 'HDFC Mid-Cap Opportunities Fund - Growth',
      category: 'Equity - Mid Cap',
      isin: 'INF179K01BE2',
      currentValue: 50000,
      nav: 178.60,
      units: 279.95,
      pledgeableRatio: 0.60,
      pledgedAmount: 0,
      rta: 'CAMS'
    }
  ],
  activeLoans: []
};

// Retrieve current state from localStorage or initialize
export function getPortfolioData() {
  try {
    const cached = localStorage.getItem('1fi_portfolio_data');
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('LocalStorage not available, using memory store', e);
  }
  return { ...INITIAL_PORTFOLIO };
}

export function savePortfolioData(data) {
  try {
    localStorage.setItem('1fi_portfolio_data', JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage write failed', e);
  }
}

/**
 * Fetch latest portfolio from Neon PostgreSQL API and synchronize local cache
 */
export async function fetchPortfolioFromDatabase() {
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const json = await res.json();
      if (json.configured && json.data) {
        savePortfolioData(json.data);
        return { success: true, source: 'neon_postgres', data: json.data };
      }
    }
  } catch (err) {
    // Graceful fallback to local cache
  }
  return { success: false, source: 'local_storage', data: getPortfolioData() };
}

/**
 * Pledges a mutual fund lien for an EMI plan purchase
 */
export async function createLienForOrder({ product, variant, emiPlan, selectedFundId }) {
  const current = getPortfolioData();
  const lienAmount = emiPlan.requiredCollateral || (emiPlan.principal * 1.25);
  
  // Find fund or pick primary fund
  const fundIndex = current.funds.findIndex(f => f.id === selectedFundId);
  const targetFund = fundIndex >= 0 ? current.funds[fundIndex] : current.funds[0];

  targetFund.pledgedAmount = (targetFund.pledgedAmount || 0) + lienAmount;
  current.usedLimit += emiPlan.principal;

  const orderId = '1FI-ORD-' + Math.floor(100000 + Math.random() * 900000);
  const loanId = '1FI-LOAN-' + Math.floor(10000 + Math.random() * 90000);

  const newLoan = {
    loanId,
    orderId,
    createdAt: new Date().toISOString(),
    productName: product.name,
    productImage: variant.color?.image || '',
    variantDetails: `${variant.color?.name || ''} • ${variant.storage?.label || ''}`,
    principal: emiPlan.principal,
    tenureMonths: emiPlan.tenureMonths,
    monthlyEMI: emiPlan.monthlyEMI,
    totalAmountPayable: emiPlan.totalAmountPayable,
    pledgedFundName: targetFund.schemeName,
    pledgedCollateralValue: lienAmount,
    status: 'ACTIVE',
    nextDueAmount: emiPlan.monthlyEMI,
    nextDueDate: emiPlan.schedule?.[0]?.dueDate || 'In 30 days',
    emisRemaining: emiPlan.tenureMonths,
    schedule: emiPlan.schedule || []
  };

  current.activeLoans = [newLoan, ...(current.activeLoans || [])];
  savePortfolioData(current);

  // Asynchronously persist to Neon DB if API is online
  try {
    fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, variant, emiPlan, selectedFundId })
    }).catch(err => console.debug('Neon loan sync background notice:', err));
  } catch (e) {
    // Non-blocking
  }

  return {
    success: true,
    orderId,
    loanId,
    loan: newLoan,
    updatedPortfolio: current
  };
}

/**
 * Pay EMI installment
 */
export async function payEMIInstallment(loanId) {
  const current = getPortfolioData();
  const loan = (current.activeLoans || []).find(l => l.loanId === loanId);
  if (loan) {
    loan.emisRemaining = Math.max(0, loan.emisRemaining - 1);
    if (loan.emisRemaining === 0) {
      loan.status = 'COMPLETED';
    }
    current.usedLimit = Math.max(0, current.usedLimit - loan.monthlyEMI);
    savePortfolioData(current);

    // Sync to Neon API
    try {
      fetch('/api/dues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanId })
      }).catch(err => console.debug('Neon dues sync notice:', err));
    } catch (e) {
      // Non-blocking
    }
  }
  return current;
}

/**
 * Reset simulated portfolio to initial state
 */
export async function resetPortfolio() {
  savePortfolioData(INITIAL_PORTFOLIO);

  // Sync reset to Neon DB if available
  try {
    fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' })
    }).catch(err => console.debug('Neon reset notice:', err));
  } catch (e) {
    // Non-blocking
  }

  return INITIAL_PORTFOLIO;
}
