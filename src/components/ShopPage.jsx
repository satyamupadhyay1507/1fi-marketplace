import React from 'react';
import { useApp } from '../context/AppContext';
import TopBanner from './TopBanner';
import SegmentedTabs from './SegmentedTabs';
import MarketplaceTab from './MarketplaceTab';
import TopBrandsTab from './TopBrandsTab';
import NearbyStoresTab from './NearbyStoresTab';

export default function ShopPage() {
  const { shopSubTab } = useApp();

  return (
    <div className="shop-page-root">
      {/* 1Fi Royal Purple Hero Banner */}
      <TopBanner />

      {/* Segmented Options: Top Brands | Nearby Stores | 1Fi Marketplace */}
      <SegmentedTabs />

      {/* Dynamic Sub-tab Content */}
      {shopSubTab === 'marketplace' && <MarketplaceTab />}
      {shopSubTab === 'top-brands' && <TopBrandsTab />}
      {shopSubTab === 'nearby-stores' && <NearbyStoresTab />}
    </div>
  );
}
