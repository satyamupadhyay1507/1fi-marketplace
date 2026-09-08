import { query, isDatabaseConfigured } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { loanId, installmentNumber } = body || {};

    if (!loanId) {
      return res.status(400).json({ error: 'Missing loanId' });
    }

    const { rows } = await query('SELECT * FROM loans WHERE loan_id = $1 AND user_id = $2', [loanId, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const loan = rows[0];
    const emisRemaining = Math.max(0, parseInt(loan.emis_remaining, 10) - 1);
    const newStatus = emisRemaining === 0 ? 'COMPLETED' : 'ACTIVE';
    const monthlyEMI = parseFloat(loan.monthly_emi);

    await query(`
      UPDATE loans 
      SET emis_remaining = $1, status = $2 
      WHERE loan_id = $3
    `, [emisRemaining, newStatus, loanId]);

    // Restore proportional used credit limit
    await query(`
      UPDATE portfolio 
      SET used_limit = GREATEST(0, used_limit - $1), updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $2
    `, [monthlyEMI, userId]);

    return res.status(200).json({
      success: true,
      source: 'neon_postgres',
      message: `EMI installment for ${loan.product_name} successfully paid!`,
      loanId,
      emisRemaining,
      status: newStatus
    });
  } catch (error) {
    console.error('Dues API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
