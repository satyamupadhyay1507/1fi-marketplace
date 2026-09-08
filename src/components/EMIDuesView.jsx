import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/emiCalculator';
import { 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ShoppingBag,
  CreditCard
} from 'lucide-react';

export default function EMIDuesView() {
  const { portfolio, setActiveTab, setShopSubTab } = useApp();
  const activeLoans = portfolio.activeLoans || [];

  return (
    <div className="emi-dues-root">
      {/* If No Loans exist: Exact recreation of Reference Screenshot 1 */}
      {activeLoans.length === 0 ? (
        <div className="zero-state-view">
          {/* SVG Illustration of Receipt with Question Mark Bubble */}
          <div className="zero-state-illustration">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Soft Drop Shadow under receipt */}
              <ellipse cx="90" cy="155" rx="50" ry="8" fill="#E8EAEE" />

              {/* Little Sparkles / Crosses */}
              <polygon points="50,135 52,138 55,140 52,142 50,145 48,142 45,140 48,138" fill="#A855F7" opacity="0.6" />
              <polygon points="53,92 54,94 56,95 54,96 53,98 52,96 50,95 52,94" fill="#E9D5FF" />
              <rect x="135" y="115" width="8" height="8" rx="2" fill="#C084FC" opacity="0.7" transform="rotate(20 135 115)" />

              {/* Receipt Body */}
              <g filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))">
                <path
                  d="M60 40 C60 36, 64 32, 68 32 L112 32 C116 32, 120 36, 120 40 L120 138 L114 133 L108 138 L102 133 L96 138 L90 133 L84 138 L78 133 L72 138 L66 133 L60 138 Z"
                  fill="#FFFFFF"
                  stroke="#E2E5EE"
                  strokeWidth="1.5"
                />
              </g>

              {/* Purple Header Bar on Receipt */}
              <rect x="70" y="44" width="40" height="5" rx="2.5" fill="#6C3CE9" />

              {/* Horizontal Line Placeholders on Receipt */}
              <rect x="70" y="58" width="34" height="4" rx="2" fill="#E2E5EE" />
              <rect x="70" y="68" width="40" height="4" rx="2" fill="#E2E5EE" />
              <rect x="70" y="84" width="22" height="4" rx="2" fill="#E2E5EE" />

              {/* Yellow Highlight Pill */}
              <rect x="70" y="96" width="16" height="5" rx="2.5" fill="#FDE68A" />

              {/* Circular Question Mark Badge at Top Right */}
              <circle cx="120" cy="42" r="16" fill="#6C3CE9" />
              <text x="120" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800" fontFamily="sans-serif">?</text>
            </svg>
          </div>

          <div className="zero-state-header-tag">NOTHING DUE YET</div>
          <h2 className="zero-state-title">
            Looks like you haven't shopped yet with 1Fi
          </h2>

          <button
            className="primary-pill-cta"
            onClick={() => {
              setActiveTab('shop');
              setShopSubTab('marketplace');
            }}
          >
            <span>Explore 1Fi Marketplace</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        /* If Loans Exist (Purchased via Marketplace): Active Dues View */
        <div className="active-dues-container">
          <div style={{ padding: '0 4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#9297AA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ACTIVE INSTALMENTS
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#131422' }}>
              Your Monthly EMI Dues
            </h2>
          </div>

          {activeLoans.map((loan) => (
            <div key={loan.loanId} className="active-loan-card">
              <div className="loan-card-header">
                <div>
                  <span style={{ fontSize: '11px', color: '#888D9F', fontWeight: 600 }}>Loan #{loan.loanId}</span>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#131422', marginTop: '2px' }}>
                    {loan.productName}
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#686E82' }}>{loan.variantDetails}</div>
                </div>

                <div className="loan-status-tag">
                  <CheckCircle size={12} />
                  <span>0% Interest</span>
                </div>
              </div>

              {/* Next Due Highlight Box */}
              <div style={{
                background: '#FAF8FF',
                border: '1px solid #ECE7FD',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#7E8398', fontWeight: 600 }}>NEXT DUE DATE</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#131422', marginTop: '2px' }}>
                    {loan.nextDueDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#7E8398', fontWeight: 600 }}>DUE AMOUNT</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#6C3CE9', marginTop: '2px' }}>
                    {formatINR(loan.monthlyEMI)}
                  </div>
                </div>
              </div>

              {/* Lien info */}
              <div style={{ fontSize: '11.5px', color: '#5A5F74', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                <ShieldCheck size={14} color="#00B377" />
                <span>Pledged via: <strong>{loan.pledgedFundName}</strong></span>
              </div>

              {/* Repayment Progress */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#7E8398', marginBottom: '4px' }}>
                  <span>0 of {loan.tenureMonths} EMIs Paid</span>
                  <span>{formatINR(loan.totalAmountPayable)} Total</span>
                </div>
                <div style={{ height: '6px', background: '#F0EFF7', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '8%', height: '100%', background: '#6C3CE9' }} />
                </div>
              </div>

              {/* Pay early button */}
              <button
                className="card-view-btn"
                style={{ background: '#6C3CE9', color: '#FFF', padding: '10px' }}
                onClick={() => alert(`Auto-debit mandate is active. Your EMI of ${formatINR(loan.monthlyEMI)} will be auto-debited on ${loan.nextDueDate}.`)}
              >
                <span>Auto-Debit Active • Mandate Verified</span>
              </button>
            </div>
          ))}

          <button
            style={{
              padding: '12px',
              borderRadius: '999px',
              background: '#F0EFF7',
              color: '#6C3CE9',
              fontSize: '13px',
              fontWeight: 700,
              marginTop: '10px'
            }}
            onClick={() => {
              setActiveTab('shop');
              setShopSubTab('marketplace');
            }}
          >
            + Shop Another Product on 0% EMI
          </button>
        </div>
      )}
    </div>
  );
}
