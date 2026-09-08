import { query, isDatabaseConfigured } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!isDatabaseConfigured()) {
    return res.status(200).json({
      configured: false,
      source: 'local_fallback',
      message: 'DATABASE_URL not configured'
    });
  }

  try {
    const userId = 'user-default';

    if (req.method === 'POST') {
      const { action } = req.body || {};
      if (action === 'reset') {
        // Reset usedLimit and fund pledged amounts, delete loans and orders
        await query('UPDATE portfolio SET used_limit = 0 WHERE user_id = $1', [userId]);
        await query('UPDATE mutual_funds SET pledged_amount = 0 WHERE user_id = $1', [userId]);
        await query('DELETE FROM loans WHERE user_id = $1', [userId]);
        await query('DELETE FROM orders WHERE user_id = $1', [userId]);

        return res.status(200).json({
          success: true,
          message: 'Portfolio and loan state reset to initial values in Neon DB'
        });
      }
    }

    // GET Portfolio
    const { rows: portRows } = await query('SELECT * FROM portfolio WHERE user_id = $1', [userId]);
    if (portRows.length === 0) {
      return res.status(200).json({
        configured: true,
        data: null,
        message: 'Portfolio not found. Run /api/init-db to seed.'
      });
    }

    const port = portRows[0];
    const { rows: fundRows } = await query('SELECT * FROM mutual_funds WHERE user_id = $1 ORDER BY current_value DESC', [userId]);
    const { rows: loanRows } = await query('SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

    const formattedFunds = fundRows.map(f => ({
      id: f.id,
      schemeName: f.scheme_name,
      category: f.category,
      isin: f.isin,
      currentValue: parseFloat(f.current_value),
      nav: parseFloat(f.nav),
      units: parseFloat(f.units),
      pledgeableRatio: parseFloat(f.pledgeable_ratio),
      pledgedAmount: parseFloat(f.pledged_amount),
      rta: f.rta
    }));

    const formattedLoans = loanRows.map(l => ({
      loanId: l.loan_id,
      orderId: l.order_id,
      createdAt: l.created_at,
      productName: l.product_name,
      productImage: l.product_image,
      variantDetails: l.variant_details,
      principal: parseFloat(l.principal),
      tenureMonths: l.tenure_months,
      monthlyEMI: parseFloat(l.monthly_emi),
      totalAmountPayable: parseFloat(l.total_amount_payable),
      pledgedFundName: l.pledged_fund_name,
      pledgedCollateralValue: parseFloat(l.pledged_collateral_value),
      status: l.status,
      nextDueAmount: parseFloat(l.next_due_amount),
      nextDueDate: l.next_due_date,
      emisRemaining: l.emis_remaining,
      schedule: typeof l.schedule === 'string' ? JSON.parse(l.schedule) : l.schedule
    }));

    const result = {
      investorName: port.investor_name,
      panMasked: port.pan_masked,
      phoneMasked: port.phone_masked,
      totalPortfolioValue: parseFloat(port.total_portfolio_value),
      maxEligibleLimit: parseFloat(port.max_eligible_limit),
      usedLimit: parseFloat(port.used_limit),
      isFetched: true,
      lastUpdated: 'Live from Neon DB',
      funds: formattedFunds,
      activeLoans: formattedLoans
    };

    return res.status(200).json({
      success: true,
      configured: true,
      source: 'neon_postgres',
      data: result
    });
  } catch (error) {
    console.error('Portfolio API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
