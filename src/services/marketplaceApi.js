/**
 * 1Fi Marketplace Dynamic API Service
 * Encapsulates dynamic asynchronous retrieval of products, variants,
 * categories, and EMI plans. Connects to Vercel Serverless Functions
 * backed by Neon PostgreSQL when deployed, with transparent local fallback.
 */

import { PRODUCTS_DATA, CATEGORIES } from '../data/productsData';
import { calculateEMIDetails, EMI_TENURES } from './emiCalculator';

// Helper to simulate realistic async network response for local fallback
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

export const marketplaceApi = {
  /**
   * Check connection status to Neon PostgreSQL
   */
  async checkDatabaseStatus() {
    try {
      const res = await fetch('/api/init-db');
      if (!res.ok) return { connected: false, message: 'Endpoint returned error' };
      const data = await res.json();
      return {
        connected: Boolean(data.configured && data.success),
        database: data.database || 'Neon PostgreSQL',
        message: data.message
      };
    } catch (e) {
      return { connected: false, message: 'Local fallback mode' };
    }
  },

  /**
   * Initialize / Seed Neon Database
   */
  async initializeDatabase() {
    try {
      const res = await fetch('/api/init-db', { method: 'POST' });
      const data = await res.json();
      return data;
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  /**
   * Fetch all categories
   */
  async getCategories() {
    await delay(50);
    return [...CATEGORIES];
  },

  /**
   * Fetch products with search, category filtering, and sorting
   * @param {object} options
   * @param {string} options.category - Category id ('all' or specific)
   * @param {string} options.search - Query string
   * @param {string} options.sort - 'popular' | 'price_low' | 'price_high' | 'emi_low' | 'rating'
   * @param {boolean} options.simulateError - Test error state
   */
  async getProducts({ category = 'all', search = '', sort = 'popular', simulateError = false } = {}) {
    if (simulateError) {
      throw new Error('Failed to load marketplace products. Please check your network connection.');
    }

    // Attempt live Neon Database via /api/products
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.set('category', category);
      if (search && search.trim() !== '') params.set('search', search.trim());
      if (sort) params.set('sort', sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.configured && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      // Graceful fallback to static data
    }

    // Local / fallback evaluation
    await delay(150);
    let results = [...PRODUCTS_DATA];

    // Filter by Category
    if (category && category !== 'all') {
      results = results.filter(p => p.category === category);
    }

    // Filter by Search Query
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort Results
    results.sort((a, b) => {
      const aMinPrice = a.variants.storage[0].price;
      const bMinPrice = b.variants.storage[0].price;

      switch (sort) {
        case 'price_low':
          return aMinPrice - bMinPrice;
        case 'price_high':
          return bMinPrice - aMinPrice;
        case 'emi_low': {
          const aEmi = calculateEMIDetails(aMinPrice, a.maxTenureMonths).monthlyEMI;
          const bEmi = calculateEMIDetails(bMinPrice, b.maxTenureMonths).monthlyEMI;
          return aEmi - bEmi;
        }
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return results;
  },

  /**
   * Fetch single product details by ID
   * @param {string} id
   */
  async getProductById(id) {
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.configured && json.data) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }

    await delay(100);
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with ID "${id}" was not found.`);
    }
    return JSON.parse(JSON.stringify(product));
  },

  /**
   * Calculate EMI plans dynamically for a specific product and price
   */
  async getEMIPlansForProduct(productOrPrice, preferredTenure = 6) {
    await delay(80);
    const price = typeof productOrPrice === 'number' 
      ? productOrPrice 
      : productOrPrice.variants.storage[0].price;

    const plans = EMI_TENURES.map(tenure => {
      const emiDetails = calculateEMIDetails(price, tenure.months);
      return {
        ...tenure,
        ...emiDetails,
        isPreferred: tenure.months === preferredTenure
      };
    });

    return plans;
  }
};
