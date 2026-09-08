/**
 * 1Fi Marketplace Dynamic API Service
 * Encapsulates dynamic asynchronous retrieval of products, variants,
 * categories, and EMI plans, simulating network roundtrips, search,
 * filtering, and sorting.
 */

import { PRODUCTS_DATA, CATEGORIES } from '../data/productsData';
import { calculateEMIDetails, EMI_TENURES } from './emiCalculator';

// Helper to simulate realistic async network response
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const marketplaceApi = {
  /**
   * Fetch all categories
   */
  async getCategories() {
    await delay(100);
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
    await delay(350);

    if (simulateError) {
      throw new Error('Failed to load marketplace products. Please check your network connection.');
    }

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
    await delay(200);
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
    await delay(150);
    const price = typeof productOrPrice === 'number' 
      ? productOrPrice 
      : productOrPrice.variants.storage[0].price;

    const allPlans = EMI_TENURES.map(tenure => {
      return calculateEMIDetails(price, tenure.months);
    });

    return {
      plans: allPlans,
      recommendedPlan: allPlans.find(p => p.tenureMonths === preferredTenure) || allPlans[1]
    };
  }
};
