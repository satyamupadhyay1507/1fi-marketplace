import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateEMIDetails, formatINR } from '../services/emiCalculator';
import { Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { openProductDetail } = useApp();

  // Get base variant
  const baseStorage = product.variants.storage[0];
  const baseColor = product.variants.colors[0];
  const basePrice = baseStorage.price;
  const mrp = baseStorage.mrp;
  const discountPercent = Math.round(((mrp - basePrice) / mrp) * 100);

  // Calculate lowest monthly EMI for max tenure
  const emiDetails = calculateEMIDetails(basePrice, product.maxTenureMonths || 24);

  return (
    <div className="product-card" onClick={() => openProductDetail(product)}>
      {/* Top Badge */}
      {product.badge && (
        <div className={`card-badge-top ${product.badge.includes('Trending') ? 'trending' : ''}`}>
          <Sparkles size={9} />
          <span>{product.badge}</span>
        </div>
      )}

      {/* Product Image */}
      <div className="card-image-wrap">
        <img
          src={baseColor.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            // Fallback tech gadget SVG if offline or image failed
            e.currentTarget.src = 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <h3 className="card-title">{product.name}</h3>

        {/* Pricing */}
        <div className="card-pricing-row">
          <span className="card-price">{formatINR(basePrice)}</span>
          <span className="card-mrp">{formatINR(mrp)}</span>
          <span className="card-discount-badge">{discountPercent}% OFF</span>
        </div>

        {/* EMI Box */}
        <div className="card-emi-box">
          <div className="card-emi-label">
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#6C3CE9' }}></span>
            <span>0% No-Cost EMI</span>
          </div>
          <span className="card-emi-amount">
            {formatINR(emiDetails.monthlyEMI)}
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#6C3CE9', marginLeft: '3px' }}>
              /mo ({emiDetails.tenureMonths}m)
            </span>
          </span>
          <div className="card-collateral-tag">
            <ShieldCheck size={11} color="#00B377" />
            <span>Mutual Fund Collateral</span>
          </div>
        </div>

        {/* View EMI Options Button */}
        <button
          className="card-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            openProductDetail(product);
          }}
        >
          <span>View EMI Plans</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
