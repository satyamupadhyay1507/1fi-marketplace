import { query, isDatabaseConfigured } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, category = 'all', search = '', sort = 'popular' } = req.query || {};

  // If database is not yet set up, return indicator so frontend uses local fallback
  if (!isDatabaseConfigured()) {
    return res.status(200).json({
      configured: false,
      source: 'local_fallback',
      message: 'DATABASE_URL not configured'
    });
  }

  try {
    if (id) {
      const { rows } = await query('SELECT * FROM products WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: `Product with id "${id}" not found` });
      }
      const p = formatProductRow(rows[0]);
      return res.status(200).json({ success: true, source: 'neon_postgres', data: p });
    }

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search && search.trim() !== '') {
      params.push(`%${search.trim().toLowerCase()}%`);
      sql += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(brand) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
    }

    // Sorting
    switch (sort) {
      case 'rating':
        sql += ' ORDER BY rating DESC';
        break;
      case 'popular':
      default:
        sql += ' ORDER BY review_count DESC';
        break;
    }

    const { rows } = await query(sql, params);
    let formatted = rows.map(formatProductRow);

    // Dynamic price sorting on JSON variants
    if (sort === 'price_low') {
      formatted.sort((a, b) => (a.variants?.storage?.[0]?.price || 0) - (b.variants?.storage?.[0]?.price || 0));
    } else if (sort === 'price_high') {
      formatted.sort((a, b) => (b.variants?.storage?.[0]?.price || 0) - (a.variants?.storage?.[0]?.price || 0));
    }

    return res.status(200).json({
      success: true,
      configured: true,
      source: 'neon_postgres',
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return res.status(500).json({ error: error.message, configured: true });
  }
}

function formatProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    rating: parseFloat(row.rating),
    reviewCount: parseInt(row.review_count, 10),
    badge: row.badge,
    isNoCostEmi: row.is_no_cost_emi,
    maxTenureMonths: row.max_tenure_months,
    description: row.description,
    highlights: typeof row.highlights === 'string' ? JSON.parse(row.highlights) : row.highlights,
    variants: typeof row.variants === 'string' ? JSON.parse(row.variants) : row.variants,
    defaultColor: row.default_color,
    defaultStorage: row.default_storage,
    specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : row.specs
  };
}
