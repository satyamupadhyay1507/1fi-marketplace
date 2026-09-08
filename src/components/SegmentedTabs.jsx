import React from 'react';
import { useApp } from '../context/AppContext';

export default function SegmentedTabs() {
  const { shopSubTab, setShopSubTab } = useApp();

  return (
    <div className="shop-segmented-container">
      {/* Tab A: Top Brands */}
      <button
        className={`segmented-tab-btn ${shopSubTab === 'top-brands' ? 'active' : ''}`}
        onClick={() => setShopSubTab('top-brands')}
      >
        <span>Top Brands</span>
        {shopSubTab === 'top-brands' && <span className="segmented-indicator-line" />}
      </button>

      {/* Tab B: Nearby Stores */}
      <button
        className={`segmented-tab-btn ${shopSubTab === 'nearby-stores' ? 'active' : ''}`}
        onClick={() => setShopSubTab('nearby-stores')}
      >
        <span>Nearby Stores</span>
        {shopSubTab === 'nearby-stores' && <span className="segmented-indicator-line" />}
      </button>

      {/* Tab C: 1Fi Marketplace (Assignment Feature) */}
      <button
        className={`segmented-tab-btn ${shopSubTab === 'marketplace' ? 'active' : ''}`}
        onClick={() => setShopSubTab('marketplace')}
      >
        <span>1Fi Marketplace</span>
        <span className="tab-badge-new">NEW</span>
        {shopSubTab === 'marketplace' && <span className="segmented-indicator-line" />}
      </button>
    </div>
  );
}
