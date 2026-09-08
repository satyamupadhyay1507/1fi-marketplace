import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, ChevronRight, Plane, Sparkles } from 'lucide-react';

export default function TopBrandsTab() {
  const { setShopSubTab } = useApp();
  const [search, setSearch] = useState('');

  const brands = [
    {
      id: 'air-india',
      name: 'Air India',
      tenure: 'No-cost EMIs upto 18 months',
      type: 'air-india',
      logoText: 'AIR INDIA',
      accentColor: '#D91C24'
    },
    {
      id: 'apple',
      name: 'Apple Premium Reseller',
      tenure: 'No-cost EMIs upto 24 months',
      type: 'apple',
      logoText: '',
      accentColor: '#000000'
    },
    {
      id: 'caratlane',
      name: 'CaratLane',
      tenure: 'No-cost EMIs upto 6 months',
      type: 'caratlane',
      logoText: 'CARATLANE',
      accentColor: '#731B66'
    }
  ];

  const filtered = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="top-brands-tab-root">
      {/* Search Input from Screenshot 4 */}
      <div className="shop-search-section">
        <div className="search-pill-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search online stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear-btn" onClick={() => setSearch('')}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div style={{ padding: '0 18px 12px 18px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#131422' }}>Top Brands</h2>
      </div>

      {/* Brand Cards List */}
      <div className="brands-list-container">
        {filtered.map((brand) => (
          <div
            key={brand.id}
            className="brand-card-item"
            onClick={() => {
              // Clicking brand can guide user to Marketplace Apple / Gadget deals
              if (brand.id === 'apple') {
                setShopSubTab('marketplace');
              }
            }}
          >
            {/* Brand Logo Box */}
            <div className={`brand-logo-wrap ${brand.type}`}>
              {brand.type === 'air-india' && (
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.04em' }}>AIR INDIA</span>
                </div>
              )}
              {brand.type === 'apple' && (
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                  <svg width="24" height="24" viewBox="0 0 170 170" fill="#FFF">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.87-12.24-14.37-6.52-9.67-11.66-20.9-15.42-33.7-3.76-12.79-5.64-25.04-5.64-36.75 0-16.71 4.54-30.73 13.62-42.06 9.08-11.33 20.48-17.06 34.2-17.18 4.79 0 10.23 1.25 16.32 3.75 6.09 2.5 10.15 3.81 12.18 3.93 1.74-.24 5.92-1.63 12.54-4.18 6.62-2.55 12.28-3.71 16.98-3.48 13.06.72 23.63 5.37 31.71 13.95-11.53 7.08-17.18 16.98-16.96 29.7.22 10.02 4.13 18.34 11.74 24.97 7.61 6.63 16.63 10.3 27.06 11.02-2.5 7.63-5.74 15.1-9.72 22.41zM119.22 33.15c0-7.39 2.67-14.45 8.01-21.18 5.34-6.73 11.83-11.05 19.47-12.97.43 2.18.65 4.14.65 5.88 0 7.4-2.82 14.54-8.46 21.41-5.64 6.87-12.22 11.02-19.74 12.44-.22-1.96-.33-3.82-.33-5.58z" />
                  </svg>
                  <div style={{ fontSize: '7px', fontWeight: 600, color: '#A0A0A8', marginTop: '2px' }}>Reseller</div>
                </div>
              )}
              {brand.type === 'caratlane' && (
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '0.04em', display: 'block', marginTop: '2px' }}>CARATLANE</span>
                </div>
              )}
            </div>

            {/* Brand Info */}
            <div className="brand-info" style={{ flex: 1 }}>
              <div className="brand-name">{brand.name}</div>
              <div className="brand-tenure-tag">{brand.tenure}</div>
            </div>

            <ChevronRight size={18} color="#9AA0B6" />
          </div>
        ))}
      </div>
    </div>
  );
}
