/**
 * 1Fi EMI & Mutual Fund Collateral Calculation Engine
 * 
 * 1Fi's Core Value Proposition:
 * - 0% No-Cost EMI on selected tenures (3, 6, 9, 12, 18, 24 months)
 * - ₹0 Down Payment
 * - ₹0 Processing Fee
 * - Backed by Mutual Fund Lien (1.2x Loan-to-Value requirement)
 * - Mutual funds remain invested and keep compounding/generating returns
 */

export const EMI_TENURES = [
  {
    months: 3,
    label: '3 Months',
    interestRate: 0,
    isNoCost: true,
    badge: 'Quick Pay',
    description: 'Zero interest, pay off in 3 easy monthly parts'
  },
  {
    months: 6,
    label: '6 Months',
    interestRate: 0,
    isNoCost: true,
    isPopular: true,
    badge: 'Most Popular',
    description: 'Balanced tenure with 0% interest and ₹0 down payment'
  },
  {
    months: 9,
    label: '9 Months',
    interestRate: 0,
    isNoCost: true,
    badge: 'Zero Cost',
    description: 'Affordable monthly instalments backed by your MF portfolio'
  },
  {
    months: 12,
    label: '12 Months',
    interestRate: 0,
    isNoCost: true,
    badge: 'Best Value',
    description: '1 full year of zero-interest monthly instalments'
  },
  {
    months: 18,
    label: '18 Months',
    interestRate: 0,
    isNoCost: true,
    badge: 'Extended',
    description: 'Low monthly EMI with zero processing charges'
  },
  {
    months: 24,
    label: '24 Months',
    interestRate: 0,
    isNoCost: true,
    badge: 'Lowest EMI',
    description: 'Minimum monthly commitment, highest affordability'
  }
];

/**
 * Calculate complete EMI breakdown for a given principal and tenure
 * @param {number} principal - The price of the product
 * @param {number} tenureMonths - Number of months (3, 6, 9, 12, 18, 24)
 * @returns {object} EMI calculation details
 */
export function calculateEMIDetails(principal, tenureMonths = 6) {
  const tenureConfig = EMI_TENURES.find(t => t.months === tenureMonths) || EMI_TENURES[1];
  
  // 1Fi provides 0% No-Cost EMI subsidized by brand / platform
  const monthlyInterestRate = (tenureConfig.interestRate / 100) / 12;
  
  let monthlyEMI = 0;
  if (monthlyInterestRate === 0) {
    monthlyEMI = Math.round(principal / tenureMonths);
  } else {
    // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + monthlyInterestRate, tenureMonths);
    monthlyEMI = Math.round((principal * monthlyInterestRate * factor) / (factor - 1));
  }

  const totalAmountPayable = monthlyEMI * tenureMonths;
  const totalInterest = Math.max(0, totalAmountPayable - principal);
  const downPayment = 0; // 1Fi 0% down payment
  const processingFee = 0; // ₹0 processing fee for 1Fi users

  // Mutual Fund Lien required: 1.2x (120% LTV) of principal amount
  // E.g., For ₹60,000 purchase, ₹72,000 MF portfolio lien is created
  const collateralLienRatio = 1.2;
  const requiredCollateral = Math.round(principal * collateralLienRatio);

  // Standard credit card/NBFC interest would have been ~16% p.a.
  const standardNBFCInterest = Math.round((principal * 0.16 * (tenureMonths / 12)));
  const totalSavings = standardNBFCInterest + 1499; // savings on interest + typical processing fees

  // Generate repayment schedule starting next month
  const schedule = [];
  const now = new Date();
  for (let i = 1; i <= tenureMonths; i++) {
    const dueDate = new Date(now.getFullYear(), now.getMonth() + i, 5); // 5th of each month
    schedule.push({
      installmentNumber: i,
      dueDate: dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: monthlyEMI,
      principalComponent: Math.round(principal / tenureMonths),
      interestComponent: 0,
      status: 'Upcoming'
    });
  }

  return {
    principal,
    tenureMonths,
    tenureLabel: tenureConfig.label,
    monthlyEMI,
    downPayment,
    processingFee,
    totalInterest,
    totalAmountPayable,
    isNoCost: tenureConfig.isNoCost,
    badge: tenureConfig.badge,
    isPopular: tenureConfig.isPopular,
    requiredCollateral,
    collateralLienRatio,
    totalSavings,
    schedule
  };
}

/**
 * Format currency to Indian Rupee (INR) format (e.g. ₹1,29,900)
 * @param {number} amount 
 * @returns {string}
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
