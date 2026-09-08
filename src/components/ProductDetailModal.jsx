import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateEMIDetails, formatINR, EMI_TENURES } from '../services/emiCalculator';
import { 
  X, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Info, 
  ArrowRight,
  Truck,
  RotateCcw,
  Percent
} from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProductModal, closeProductDetail, initiateCheckout } = useApp();

  if (!selectedProductModal) return null;

  return (
    <ProductDetailContent
      product={selectedProductModal}
      closeProductDetail={closeProductDetail}
      initiateCheckout={initiateCheckout}
    />
  );
}

function ProductDetailContent({ product, closeProductDetail, initiateCheckout }) {
  // Variant States
  const [selectedColorId, setSelectedColorId] = useState(product.defaultColor || product.variants.colors[0].id);
  const [selectedStorageId, setSelectedStorageId] = useState(product.defaultStorage || product.variants.storage[0].id);
  const [selectedTenure, setSelectedTenure] = useState(6);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  // Active Variant Objects
  const activeColor = product.variants.colors.find(c => c.id === selectedColorId) || product.variants.colors[0];
  const activeStorage = product.variants.storage.find(s => s.id === selectedStorageId) || product.variants.storage[0];

  const currentPrice = activeStorage.price;
  const currentMrp = activeStorage.mrp;
  const discountAmount = currentMrp - currentPrice;
  const discountPercent = Math.round((discountAmount / currentMrp) * 100);

  // Calculate EMI for the chosen variant and tenure
  const emiDetails = calculateEMIDetails(currentPrice, selectedTenure);

  // Available tenures filtered by product's max tenure limit
  const availableTenures = EMI_TENURES.filter(t => t.months <= (product.maxTenureMonths || 24));

  const handleProceed = () => {
    initiateCheckout(
      product,
      { color: activeColor, storage: activeStorage },
      emiDetails
    );
  };

  return (
    <div className="modal-overlay" onClick={closeProductDetail}>
      <div className="bottom-sheet-modal" onClick={(e) => e.stopPropagation()}>
        {/* Handle Bar */}
        <div className="sheet-handle-bar" />

        {/* Modal Header */}
        <div className="sheet-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6C3CE9', background: '#F1ECFE', padding: '3px 8px', borderRadius: '999px' }}>
              1Fi Marketplace
            </span>
            <span style={{ fontSize: '12.5px', color: '#6A6E82', fontWeight: 600 }}>
              {product.brand}
            </span>
          </div>
          <button className="sheet-close-btn" onClick={closeProductDetail} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="sheet-scroll-body">
          {/* Main Showcase Image */}
          <div style={{
            width: '100%',
            height: '220px',
            background: '#F8F9FD',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '16px',
            padding: '16px'
          }}>
            <img
              src={activeColor.image}
              alt={`${product.name} - ${activeColor.name}`}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'all 0.3s ease' }}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              background: 'rgba(19, 20, 34, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '999px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Star size={11} fill="#FFD700" color="#FFD700" />
              <span>{product.rating} ({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Product Title & Badge */}
          <div style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#131422', lineHeight: '1.3', marginBottom: '6px' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '12.5px', color: '#686E82', lineHeight: '1.45' }}>
              {product.description}
            </p>
          </div>

          {/* Pricing Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            padding: '12px 14px',
            background: '#FAF8FF',
            border: '1px solid #ECE7FD',
            borderRadius: '12px',
            marginBottom: '18px'
          }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#131422' }}>
              {formatINR(currentPrice)}
            </span>
            <span style={{ fontSize: '14px', color: '#9AA0B6', textDecoration: 'line-through' }}>
              {formatINR(currentMrp)}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#00B377', background: '#E8F8F2', padding: '2px 8px', borderRadius: '6px' }}>
              {discountPercent}% OFF • Save {formatINR(discountAmount)}
            </span>
          </div>

          {/* Color Variants */}
          <div className="variant-section">
            <div className="variant-label">
              <span>Color</span>
              <strong style={{ color: '#131422' }}>{activeColor.name}</strong>
            </div>
            <div className="color-swatch-list">
              {product.variants.colors.map(c => (
                <button
                  key={c.id}
                  className={`color-swatch-item ${selectedColorId === c.id ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColorId(c.id)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Storage / Spec Variants */}
          <div className="variant-section">
            <div className="variant-label">
              <span>Storage / Configuration</span>
              <strong style={{ color: '#131422' }}>{activeStorage.label}</strong>
            </div>
            <div className="storage-chip-list">
              {product.variants.storage.map(s => (
                <button
                  key={s.id}
                  className={`storage-chip ${selectedStorageId === s.id ? 'active' : ''}`}
                  onClick={() => setSelectedStorageId(s.id)}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* EMI Tenure Selector Section */}
          <div className="emi-plans-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#131422' }}>Select EMI Tenure</span>
                <span style={{ fontSize: '11px', color: '#00B377', fontWeight: 700, marginLeft: '8px' }}>
                  ✦ 0% No-Cost EMI
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#6C3CE9', fontWeight: 700 }}>
                {selectedTenure} Months
              </span>
            </div>

            {/* Tenure Options Grid */}
            <div className="tenure-card-grid">
              {availableTenures.map(tenure => {
                const plan = calculateEMIDetails(currentPrice, tenure.months);
                const isSelected = selectedTenure === tenure.months;
                return (
                  <div
                    key={tenure.months}
                    className={`tenure-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedTenure(tenure.months)}
                  >
                    {tenure.badge && (
                      <span className="tenure-card-badge" style={{ background: isSelected ? '#6C3CE9' : '#8A8FA6' }}>
                        {tenure.badge}
                      </span>
                    )}
                    <div className="tenure-months-label">{tenure.label}</div>
                    <div className="tenure-emi-val">{formatINR(plan.monthlyEMI)}</div>
                    <div className="tenure-zerocost-tag">0% Interest</div>
                  </div>
                );
              })}
            </div>

            {/* Detailed EMI Financial Breakdown */}
            <div className="emi-breakdown-card">
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#131422', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Percent size={14} color="#6C3CE9" />
                <span>EMI & Mutual Fund Collateral Summary</span>
              </div>

              <div className="breakdown-row">
                <span>Monthly Instalment</span>
                <strong>{formatINR(emiDetails.monthlyEMI)} / month</strong>
              </div>
              <div className="breakdown-row">
                <span>Down Payment</span>
                <strong style={{ color: '#00B377' }}>₹0 (Zero Down Payment)</strong>
              </div>
              <div className="breakdown-row">
                <span>Interest Charges (p.a.)</span>
                <strong style={{ color: '#00B377' }}>0% No-Cost EMI</strong>
              </div>
              <div className="breakdown-row">
                <span>Processing & Platform Fees</span>
                <strong style={{ color: '#00B377' }}>₹0 (Waived for 1Fi users)</strong>
              </div>
              <div className="breakdown-row">
                <span>Mutual Fund Lien Amount</span>
                <strong>{formatINR(emiDetails.requiredCollateral)} (1.2x LTV)</strong>
              </div>
              <div className="breakdown-row highlight">
                <span>Total Amount Payable</span>
                <span style={{ fontSize: '15px', color: '#6C3CE9' }}>{formatINR(emiDetails.totalAmountPayable)}</span>
              </div>

              {/* Collateral Informational Callout */}
              <div className="collateral-lien-notice">
                <Info size={13} style={{ float: 'left', marginRight: '6px', marginTop: '2px' }} />
                <strong>How Mutual Fund Backed EMI works:</strong> Your mutual funds stay invested and keep compounding returns. A digital lien of {formatINR(emiDetails.requiredCollateral)} is created via CAMS/KFintech and automatically released as you pay your monthly dues!
              </div>

              {/* Repayment Schedule Toggle */}
              <button
                style={{
                  marginTop: '12px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  background: '#FFFFFF',
                  border: '1px solid #ECEEF6',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#6C3CE9'
                }}
                onClick={() => setShowSchedule(!showSchedule)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} />
                  <span>View Repayment Schedule ({emiDetails.tenureMonths} Months)</span>
                </span>
                {showSchedule ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Repayment Schedule Table */}
              {showSchedule && (
                <div style={{ marginTop: '10px', maxHeight: '180px', overflowY: 'auto', border: '1px solid #ECEEF6', borderRadius: '8px', background: '#FFF' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#F8F9FD', borderBottom: '1px solid #ECEEF6', color: '#6A6E82' }}>
                        <th style={{ padding: '6px 8px' }}>#</th>
                        <th style={{ padding: '6px 8px' }}>Due Date</th>
                        <th style={{ padding: '6px 8px' }}>EMI Amount</th>
                        <th style={{ padding: '6px 8px' }}>Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiDetails.schedule.map(item => (
                        <tr key={item.installmentNumber} style={{ borderBottom: '1px solid #F2F3F8' }}>
                          <td style={{ padding: '6px 8px', fontWeight: 700 }}>{item.installmentNumber}</td>
                          <td style={{ padding: '6px 8px', color: '#131422' }}>{item.dueDate}</td>
                          <td style={{ padding: '6px 8px', fontWeight: 700, color: '#6C3CE9' }}>{formatINR(item.amount)}</td>
                          <td style={{ padding: '6px 8px', color: '#00B377' }}>₹0 (0%)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Highlights & Bullet Points */}
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#131422', display: 'block', marginBottom: '8px' }}>
              Key Highlights
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {product.highlights.map((hl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#4D5164' }}>
                  <Check size={14} color="#00B377" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Accordion */}
          <div style={{ marginBottom: '16px' }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: '#F8F9FD',
                borderRadius: '12px',
                border: '1px solid #ECEEF6',
                fontSize: '13px',
                fontWeight: 700,
                color: '#131422'
              }}
              onClick={() => setShowSpecs(!showSpecs)}
            >
              <span>Technical Specifications</span>
              {showSpecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showSpecs && (
              <div style={{ padding: '12px', border: '1px solid #ECEEF6', borderTop: 'none', borderRadius: '0 0 12px 12px', background: '#FFF' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F5F6FA', fontSize: '11.5px' }}>
                    <span style={{ color: '#7E8398', fontWeight: 600 }}>{key}</span>
                    <span style={{ color: '#131422', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '12px 0' }}>
            <div style={{ textAlign: 'center', padding: '8px', background: '#F8F9FD', borderRadius: '10px' }}>
              <Truck size={16} color="#6C3CE9" style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#131422' }}>Free Express</div>
              <div style={{ fontSize: '9px', color: '#7E8398' }}>Delivered in 2-3 days</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: '#F8F9FD', borderRadius: '10px' }}>
              <RotateCcw size={16} color="#6C3CE9" style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#131422' }}>7-Day Returns</div>
              <div style={{ fontSize: '9px', color: '#7E8398' }}>Hassle-free swap</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: '#F8F9FD', borderRadius: '10px' }}>
              <ShieldCheck size={16} color="#6C3CE9" style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#131422' }}>100% Genuine</div>
              <div style={{ fontSize: '9px', color: '#7E8398' }}>Brand Warranty</div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="modal-sticky-action-bar">
          <div className="sticky-plan-summary">
            <span className="sticky-plan-emi">{formatINR(emiDetails.monthlyEMI)}<span style={{ fontSize: '12px', fontWeight: 600 }}>/mo</span></span>
            <span className="sticky-plan-tenure">{emiDetails.tenureMonths} Months • 0% Interest</span>
          </div>

          <button className="sticky-action-cta" onClick={handleProceed}>
            <span>Proceed with {emiDetails.tenureMonths}m EMI</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
