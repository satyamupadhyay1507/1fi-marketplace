import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/emiCalculator';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  ShoppingBag,
  CreditCard
} from 'lucide-react';

export default function HomeView() {
  const { portfolio, setActiveTab, setShopSubTab } = useApp();
  const availableLimit = Math.max(0, portfolio.maxEligibleLimit - portfolio.usedLimit);

  return (
    <div style={{ padding: '20px 16px' }}>
      {/* Welcome Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#7E8398', fontWeight: 600 }}>Hello, {portfolio.investorName} 👋</span>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#131422' }}>Welcome to 1Fi</h2>
        </div>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: '#6C3CE9',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '14px'
        }}>
          SU
        </div>
      </div>

      {/* Hero Credit Card Widget */}
      <div style={{
        background: 'linear-gradient(135deg, #160B49 0%, #35178C 60%, #5E2BE9 100%)',
        borderRadius: '22px',
        padding: '22px',
        color: '#FFFFFF',
        marginBottom: '20px',
        position: 'relative',
        boxShadow: '0 10px 28px rgba(108, 60, 233, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: '#D4C8FC' }}>
            MUTUAL FUND BACKED LIMIT
          </span>
          <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
            0% INTEREST
          </span>
        </div>

        <div style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 16px 0' }}>
          {formatINR(availableLimit)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#B9A7F5', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
          <span>Total Portfolio: <strong>{formatINR(portfolio.totalPortfolioValue)}</strong></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <ShieldCheck size={13} color="#4ADE80" />
            <span>SEBI Regulated</span>
          </span>
        </div>
      </div>

      {/* Quick CTA to New Marketplace */}
      <div
        onClick={() => {
          setActiveTab('shop');
          setShopSubTab('marketplace');
        }}
        style={{
          background: '#FAF8FF',
          border: '1.5px solid #E1D7FC',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6C3CE9 0%, #8C5BF8 100%)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#131422' }}>
              Explore 1Fi Marketplace
            </div>
            <div style={{ fontSize: '11.5px', color: '#686E82' }}>
              iPhone 16 Pro, M3 MacBooks, Sony & more on 0% EMI
            </div>
          </div>
        </div>

        <ArrowRight size={18} color="#6C3CE9" />
      </div>

      {/* Key Benefits Grid */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#131422', marginBottom: '10px' }}>
          Why shop with 1Fi?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ background: '#FFF', border: '1px solid #ECEEF6', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>⚡</div>
            <strong style={{ fontSize: '12.5px', color: '#131422', display: 'block' }}>Zero Interest (0%)</strong>
            <span style={{ fontSize: '11px', color: '#7E8398' }}>No-cost EMIs up to 24 months</span>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #ECEEF6', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>📈</div>
            <strong style={{ fontSize: '12.5px', color: '#131422', display: 'block' }}>Compounding Stays</strong>
            <span style={{ fontSize: '11px', color: '#7E8398' }}>Mutual funds keep growing</span>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #ECEEF6', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>🛡️</div>
            <strong style={{ fontSize: '12.5px', color: '#131422', display: 'block' }}>No Credit Score</strong>
            <span style={{ fontSize: '11px', color: '#7E8398' }}>No hard CIBIL credit hits</span>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #ECEEF6', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>🎯</div>
            <strong style={{ fontSize: '12.5px', color: '#131422', display: 'block' }}>Instant Approval</strong>
            <span style={{ fontSize: '11px', color: '#7E8398' }}>100% digital paperless KYC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
