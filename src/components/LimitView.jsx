import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/emiCalculator';
import { 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  PieChart, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export default function LimitView() {
  const { portfolio, setActiveTab, setShopSubTab, showToast } = useApp();
  const [isFetched, setIsFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const availableLimit = Math.max(0, portfolio.maxEligibleLimit - portfolio.usedLimit);

  const handleFetchPortfolio = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setIsFetched(true);
      showToast('Mutual Fund Portfolio fetched from CAMS & KFintech!', 'success');
    }, 1200);
  };

  return (
    <div className="limit-view-root">
      {!isFetched ? (
        /* Unfetched State: Exact reproduction of Reference Screenshot 2 */
        <div className="zero-state-view">
          {/* Padlock with Sparkles Illustration */}
          <div className="zero-state-illustration">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Radial Purple Glow */}
              <circle cx="90" cy="95" r="55" fill="#F1ECFE" />

              {/* Little Sparkles */}
              <polygon points="45,68 47,72 52,74 47,76 45,80 43,76 38,74 43,72" fill="#8B5CF6" />
              <polygon points="135,70 137,73 141,74 137,76 135,79 134,76 130,74 134,73" fill="#FBBF24" />

              {/* Shackle */}
              <path
                d="M68 85 V 65 C 68 50, 112 50, 112 65 V 85"
                stroke="#6C3CE9"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />

              {/* Padlock Body */}
              <rect x="58" y="80" width="64" height="54" rx="16" fill="#6C3CE9" filter="drop-shadow(0 8px 18px rgba(108, 60, 233, 0.35))" />

              {/* Keyhole */}
              <circle cx="90" cy="102" r="5" fill="#200B5B" />
              <polygon points="87,103 93,103 92,116 88,116" fill="#200B5B" />
            </svg>
          </div>

          <div className="zero-state-header-tag">CHECK ELIGIBILITY</div>

          <h2 className="zero-state-title">
            Shop on 0% interest backed by your Mutual Funds
          </h2>

          <button
            className="primary-pill-cta"
            onClick={handleFetchPortfolio}
            disabled={isFetching}
          >
            {isFetching ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={16} className="animate-spin" />
                <span>Connecting to CAMS / KFin...</span>
              </span>
            ) : (
              <span>Fetch my portfolio</span>
            )}
          </button>
        </div>
      ) : (
        /* Fetched Portfolio & Limit Dashboard */
        <div style={{ padding: '20px 16px' }}>
          <div style={{ padding: '0 4px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#00B377', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ✦ PORTFOLIO VERIFIED
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#131422' }}>
              Your 1Fi Credit Limit
            </h2>
          </div>

          {/* Credit Limit Hero Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1A0D52 0%, #35178C 100%)',
            borderRadius: '20px',
            padding: '20px',
            color: '#FFFFFF',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(53, 23, 140, 0.3)'
          }}>
            <div style={{ fontSize: '12px', color: '#D4C8FC', fontWeight: 600 }}>AVAILABLE SHOPPING LIMIT</div>
            <div style={{ fontSize: '32px', fontWeight: 800, margin: '6px 0 12px 0' }}>
              {formatINR(availableLimit)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#B9A7F5', display: 'block', fontSize: '10.5px' }}>Total MF Portfolio</span>
                <strong style={{ fontSize: '14px' }}>{formatINR(portfolio.totalPortfolioValue)}</strong>
              </div>
              <div>
                <span style={{ color: '#B9A7F5', display: 'block', fontSize: '10.5px' }}>Active Lien Marked</span>
                <strong style={{ fontSize: '14px', color: '#4ADE80' }}>{formatINR(portfolio.usedLimit)}</strong>
              </div>
            </div>
          </div>

          {/* Connected Mutual Funds List */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#131422', marginBottom: '10px' }}>
              Connected Mutual Fund Schemes ({portfolio.funds.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {portfolio.funds.map((f) => (
                <div key={f.id} style={{
                  background: '#FFF',
                  border: '1px solid #ECEEF6',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#131422', maxWidth: '220px' }}>
                      {f.schemeName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#7E8398', marginTop: '2px' }}>
                      {f.category} • {f.rta}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#131422' }}>
                      {formatINR(f.currentValue)}
                    </div>
                    {f.pledgedAmount > 0 && (
                      <div style={{ fontSize: '10px', color: '#6C3CE9', fontWeight: 700 }}>
                        Lien: {formatINR(f.pledgedAmount)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="primary-pill-cta"
            style={{ width: '100%', maxWidth: '100%' }}
            onClick={() => {
              setActiveTab('shop');
              setShopSubTab('marketplace');
            }}
          >
            <span>Shop on 1Fi Marketplace</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
