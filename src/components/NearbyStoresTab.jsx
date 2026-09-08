import React from 'react';
import { MapPin, Store, Navigation } from 'lucide-react';

export default function NearbyStoresTab() {
  return (
    <div className="nearby-stores-container">
      <div className="nearby-illustration-wrap">
        <Store size={56} strokeWidth={1.5} />
      </div>

      <span style={{ fontSize: '11px', fontWeight: 800, color: '#8F94A8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
        Store Locator
      </span>

      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#131422', marginBottom: '8px' }}>
        Discover Partner Stores Near You
      </h3>

      <p style={{ fontSize: '13px', color: '#686E82', maxWidth: '300px', lineHeight: '1.45', marginBottom: '24px' }}>
        Walk in to any partner store, scan the 1Fi QR, and pay with 0% No-Cost EMI backed by your Mutual Funds.
      </p>

      <button className="primary-pill-cta" style={{ maxWidth: '240px' }}>
        <Navigation size={16} />
        <span>Enable Location</span>
      </button>
    </div>
  );
}
