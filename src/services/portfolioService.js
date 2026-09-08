/**
 * 1Fi Mutual Fund Portfolio & Credit Limit Service
 * Simulates fetching investment portfolio from CAMS / KFintech via PAN / Mobile OTP,
 * calculating pledgeable credit limits (typically 60-70% of equity MFs),
 * and managing mutual fund liens for marketplace purchases.
 */

const INITIAL_PORTFOLIO = {
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
 * Pledges a mutual fund lien for an EMI plan purchase
 */
export function createLienForOrder({ product, variant, emiPlan, selectedFundId }) {
  const current = getPortfolioData();
  const lienAmount = emiPlan.requiredCollateral;
  
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
    productImage: variant.color.image,
    variantDetails: `${variant.color.name} • ${variant.storage.label}`,
    principal: emiPlan.principal,
    tenureMonths: emiPlan.tenureMonths,
    monthlyEMI: emiPlan.monthlyEMI,
    totalAmountPayable: emiPlan.totalAmountPayable,
    pledgedFundName: targetFund.schemeName,
    pledgedCollateralValue: lienAmount,
    status: 'ACTIVE',
    nextDueAmount: emiPlan.monthlyEMI,
    nextDueDate: emiPlan.schedule[0].dueDate,
    emisRemaining: emiPlan.tenureMonths,
    schedule: emiPlan.schedule
  };

  current.activeLoans = [newLoan, ...(current.activeLoans || [])];
  savePortfolioData(current);

  return {
    success: true,
    orderId,
    loanId,
    loan: newLoan,
    updatedPortfolio: current
  };
}

/**
 * Reset simulated portfolio to initial state
 */
export function resetPortfolio() {
  savePortfolioData(INITIAL_PORTFOLIO);
  return INITIAL_PORTFOLIO;
}
