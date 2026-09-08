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

  const userId = 'user-default';

  try {
    if (req.method === 'GET') {
      const { rows } = await query('SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      const formatted = rows.map(l => ({
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
      return res.status(200).json({ success: true, source: 'neon_postgres', data: formatted });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { product, variant, emiPlan, selectedFundId } = body || {};

      if (!product || !variant || !emiPlan) {
        return res.status(400).json({ error: 'Missing required purchase data' });
      }

      const orderId = '1FI-ORD-' + Math.floor(100000 + Math.random() * 900000);
      const loanId = '1FI-LOAN-' + Math.floor(10000 + Math.random() * 90000);
      const lienAmount = emiPlan.requiredCollateral || (emiPlan.principal * 1.25);

      // Find selected fund or default fund
      let targetFundName = 'Parag Parikh Flexi Cap Fund - Direct Growth';
      let fundId = selectedFundId || 'fund-1';

      const { rows: targetFunds } = await query('SELECT * FROM mutual_funds WHERE id = $1', [fundId]);
      if (targetFunds.length > 0) {
        targetFundName = targetFunds[0].scheme_name;
      }

      // Update mutual fund pledged amount
      await query(`
        UPDATE mutual_funds 
        SET pledged_amount = pledged_amount + $1 
        WHERE id = $2
      `, [lienAmount, fundId]);

      // Update portfolio used limit
      await query(`
        UPDATE portfolio 
        SET used_limit = used_limit + $1, updated_at = CURRENT_TIMESTAMP 
        WHERE user_id = $2
      `, [emiPlan.principal, userId]);

      // Insert new loan
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
        pledgedFundName: targetFundName,
        pledgedCollateralValue: lienAmount,
        status: 'ACTIVE',
        nextDueAmount: emiPlan.monthlyEMI,
        nextDueDate: emiPlan.schedule?.[0]?.dueDate || 'In 30 days',
        emisRemaining: emiPlan.tenureMonths,
        schedule: emiPlan.schedule || []
      };

      await query(`
        INSERT INTO loans (
          loan_id, order_id, user_id, product_name, product_image, variant_details,
          principal, tenure_months, monthly_emi, total_amount_payable,
          pledged_fund_name, pledged_collateral_value, status, next_due_amount,
          next_due_date, emis_remaining, schedule
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      `, [
        newLoan.loanId, newLoan.orderId, userId, newLoan.productName, newLoan.productImage,
        newLoan.variantDetails, newLoan.principal, newLoan.tenureMonths, newLoan.monthlyEMI,
        newLoan.totalAmountPayable, newLoan.pledgedFundName, newLoan.pledgedCollateralValue,
        newLoan.status, newLoan.nextDueAmount, newLoan.nextDueDate, newLoan.emisRemaining,
        JSON.stringify(newLoan.schedule)
      ]);

      // Insert order record
      await query(`
        INSERT INTO orders (order_id, loan_id, user_id, product_id, product_name, amount, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [orderId, loanId, userId, product.id, product.name, emiPlan.principal, 'CONFIRMED']);

      return res.status(200).json({
        success: true,
        source: 'neon_postgres',
        orderId,
        loanId,
        loan: newLoan
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Loans API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
