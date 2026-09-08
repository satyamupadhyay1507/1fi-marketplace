import React, { useState, useEffect } from 'react';
import { marketplaceApi } from '../services/marketplaceApi';
import ProductCard from './ProductCard';
import { 
  Search, 
  X, 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Home, 
  SlidersHorizontal, 
  AlertCircle, 
  RefreshCw,
  Zap
} from 'lucide-react';

export default function MarketplaceTab() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Load Categories on mount
  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await marketplaceApi.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCats();
  }, []);

  // Fetch products whenever filters/search/sort changes
  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await marketplaceApi.getProducts({
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy
        });

        if (!isCancelled) {
          setProducts(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setErrorMessage(err.message || 'Something went wrong fetching products');
          setIsLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      loadProducts();
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery, sortBy]);

  // Category Icon Resolver
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={13} />;
      case 'Laptop': return <Laptop size={13} />;
      case 'Headphones': return <Headphones size={13} />;
      case 'Watch': return <Watch size={13} />;
      case 'Home': return <Home size={13} />;
      case 'Sparkles':
      default: return <Sparkles size={13} />;
    }
  };

  return (
    <div className="marketplace-tab-root">
      {/* Search Bar matching 1Fi style */}
      <div className="shop-search-section">
        <div className="search-pill-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search Apple, Samsung, Laptops, Audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="category-filter-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {getCategoryIcon(cat.icon)}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Header Row: Count & Sort Select */}
      <div className="marketplace-control-row">
        <div>
          <span className="marketplace-section-title">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.label}
          </span>
          <span style={{ fontSize: '11px', color: '#8F94A8', marginLeft: '6px', fontWeight: 600 }}>
            ({products.length})
          </span>
        </div>

        <div className="sort-select-wrapper">
          <SlidersHorizontal size={12} color="#6C3CE9" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="emi_low">Lowest EMI First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {errorMessage && (
        <div style={{
          margin: '20px 16px',
          padding: '24px',
          background: '#FFF0F0',
          border: '1px solid #FFD0D0',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <AlertCircle size={32} color="#E63946" style={{ margin: '0 auto 8px auto' }} />
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#E63946', marginBottom: '4px' }}>
            Unable to Load Products
          </h4>
          <p style={{ fontSize: '12px', color: '#686E82', marginBottom: '14px' }}>
            {errorMessage}
          </p>
          <button
            className="primary-pill-cta"
            style={{ padding: '8px 18px', fontSize: '12px' }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            <RefreshCw size={13} />
            <span>Reset Filters & Retry</span>
          </button>
        </div>
      )}

      {/* Shimmer Loading Skeleton */}
      {isLoading && (
        <div className="products-grid">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="product-card" style={{ padding: '12px' }}>
              <div className="skeleton-box" style={{ width: '100%', height: '130px', marginBottom: '12px' }} />
              <div className="skeleton-box" style={{ width: '40%', height: '12px', marginBottom: '8px' }} />
              <div className="skeleton-box" style={{ width: '90%', height: '16px', marginBottom: '8px' }} />
              <div className="skeleton-box" style={{ width: '60%', height: '14px', marginBottom: '12px' }} />
              <div className="skeleton-box" style={{ width: '100%', height: '40px' }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !errorMessage && products.length === 0 && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#F1ECFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6C3CE9',
            marginBottom: '14px'
          }}>
            <Search size={28} />
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#131422', marginBottom: '6px' }}>
            No matching products found
          </h4>
          <p style={{ fontSize: '12.5px', color: '#686E82', maxWidth: '280px', marginBottom: '18px' }}>
            Try searching for "iPhone", "MacBook", "Sony", or explore other categories.
          </p>
          <button
            className="primary-pill-cta"
            style={{ padding: '10px 20px', fontSize: '13px' }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Show All Products
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !errorMessage && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
