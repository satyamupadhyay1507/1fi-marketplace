import { Pool, neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool = null;

export function getPool() {
  if (!connectionString) {
    return null;
  }
  if (!pool) {
    pool = new Pool({ connectionString });
  }
  return pool;
}

export function isDatabaseConfigured() {
  return Boolean(connectionString);
}

/**
 * Execute a SQL query against Neon PostgreSQL
 * @param {string} text - SQL statement
 * @param {Array} params - Parameterized values
 */
export async function query(text, params = []) {
  if (!connectionString) {
    throw new Error('DATABASE_URL or POSTGRES_URL environment variable is not configured.');
  }

  const client = getPool();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Neon Database Query Error:', error.message, text);
    throw error;
  }
}
