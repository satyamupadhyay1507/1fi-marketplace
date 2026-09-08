import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/emiCalculator';
import { 
  User, 
  Package, 
  PiggyBank, 
  Users, 
  HelpCircle, 
  Shield, 
  FileText, 
  LogOut, 
  ChevronRight, 
  X,
  CheckCircle2
} from 'lucide-react';

export default function ProfileView() {
  const { portfolio, setActiveTab, setShopSubTab } = useApp();
  const [modalType, setModalType] = useState(null); // 'purchases' | 'pledge' | 'profile' | null

  const activeLoans = portfolio.activeLoans || [];

  return (
    <div className="profile-screen-container">
      {/* Masked User Phone at Top */}
      <div style={{ padding: '0 4px 14px 4px', textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#131422' }}>
          {portfolio.phoneMasked}
        </div>
        <div style={{ fontSize: '11px', color: '#7E8398' }}>
          KYC Verified Investor • PAN {portfolio.panMasked}
        </div>
      </div>

      <div className="profile-section-heading">QUICK ACTIONS</div>

      {/* Profile Actions Card (Matching Screenshot 3) */}
      <div className="profile-menu-card">
        {/* Profile details */}
        <div className="profile-menu-row" onClick={() => setModalType('profile')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <User size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Profile details</span>
              <span className="profile-item-subtitle">Name, contact and KYC info</span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>

        {/* Purchases */}
        <div className="profile-menu-row" onClick={() => setModalType('purchases')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <Package size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Purchases</span>
              <span className="profile-item-subtitle">
                {activeLoans.length > 0 ? `${activeLoans.length} active order(s)` : 'Orders, invoices and loan status'}
              </span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>

        {/* Pledge history */}
        <div className="profile-menu-row" onClick={() => setModalType('pledge')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <PiggyBank size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Pledge history</span>
              <span className="profile-item-subtitle">Funds you pledged or released</span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>

        {/* Invite friends */}
        <div className="profile-menu-row" onClick={() => alert('Invite link copied! Share with friends to earn ₹500 on their first 1Fi purchase.')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <Users size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Invite friends</span>
              <span className="profile-item-subtitle">Share the app, earn rewards</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-reward">EARN ₹500</span>
            <ChevronRight size={16} color="#9AA0B6" />
          </div>
        </div>

        {/* Support & FAQs */}
        <div className="profile-menu-row" onClick={() => alert('1Fi Support: Available 24x7 at support@1fi.in or call 1800-1FI-LOAN')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <HelpCircle size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Support & FAQs</span>
              <span className="profile-item-subtitle">Find answers or contact us</span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>

        {/* Privacy policy */}
        <div className="profile-menu-row" onClick={() => alert('Privacy Policy: 1Fi complies with RBI and SEBI data guidelines for Mutual Fund lien management.')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <Shield size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Privacy policy</span>
              <span className="profile-item-subtitle">How we handle your data</span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>

        {/* Terms & conditions */}
        <div className="profile-menu-row" onClick={() => alert('Terms & Conditions: No-cost EMI powered by partner NBFCs with zero foreclosure fees.')}>
          <div className="profile-item-left">
            <div className="profile-icon-box">
              <FileText size={18} />
            </div>
            <div className="profile-item-texts">
              <span className="profile-item-title">Terms & conditions</span>
              <span className="profile-item-subtitle">Rules governing your use</span>
            </div>
          </div>
          <ChevronRight size={16} color="#9AA0B6" />
        </div>
      </div>

      {/* Log out Button */}
      <button className="logout-card-btn" onClick={() => alert('Logged out. You can sign in anytime with your phone number.')}>
        <LogOut size={16} />
        <span>Log out</span>
      </button>

      {/* Footer Branding */}
      <div className="profile-footer-credit">
        Made with 💜 by 1Fi
      </div>

      {/* Sub-modals for Profile, Purchases, and Pledge History */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="bottom-sheet-modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '80%' }}>
            <div className="sheet-handle-bar" />
            <div className="sheet-header-row">
              <span className="sheet-header-title">
                {modalType === 'purchases' && 'Your Purchases & Orders'}
                {modalType === 'pledge' && 'Mutual Fund Pledge History'}
                {modalType === 'profile' && 'KYC & Profile Details'}
              </span>
              <button className="sheet-close-btn" onClick={() => setModalType(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="sheet-scroll-body">
              {modalType === 'purchases' && (
                <div>
                  {activeLoans.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                      <p style={{ color: '#686E82', fontSize: '13px' }}>No orders yet. Shop on 1Fi Marketplace to buy items on 0% EMI!</p>
                      <button
                        className="primary-pill-cta"
                        style={{ marginTop: '14px', fontSize: '12.5px', padding: '10px 20px' }}
                        onClick={() => {
                          setModalType(null);
                          setActiveTab('shop');
                          setShopSubTab('marketplace');
                        }}
                      >
                        Explore Marketplace
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activeLoans.map((loan) => (
                        <div key={loan.loanId} style={{ background: '#F8F9FD', padding: '14px', borderRadius: '12px', border: '1px solid #ECEEF6' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '13px', color: '#131422' }}>{loan.productName}</strong>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#00B377', background: '#E8F8F2', padding: '2px 6px', borderRadius: '4px' }}>
                              CONFIRMED
                            </span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#686E82' }}>{loan.variantDetails}</div>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#6C3CE9', marginTop: '6px' }}>
                            {formatINR(loan.monthlyEMI)}/mo • {loan.tenureMonths} Months
                          </div>
                          <div style={{ fontSize: '11px', color: '#7E8398', marginTop: '4px' }}>
                            Order: {loan.orderId} • Pledged: {loan.pledgedFundName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {modalType === 'pledge' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '12.5px', color: '#686E82', marginBottom: '6px' }}>
                    Mutual Fund liens created via CAMS / KFintech. These units remain invested and earn market returns.
                  </p>
                  {portfolio.funds.map((f) => (
                    <div key={f.id} style={{ background: '#F8F9FD', padding: '12px', borderRadius: '10px', border: '1px solid #ECEEF6' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#131422' }}>{f.schemeName}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11.5px' }}>
                        <span style={{ color: '#7E8398' }}>Current Value: {formatINR(f.currentValue)}</span>
                        <span style={{ color: f.pledgedAmount > 0 ? '#6C3CE9' : '#00B377', fontWeight: 700 }}>
                          {f.pledgedAmount > 0 ? `Lien: ${formatINR(f.pledgedAmount)}` : 'Available to Pledge'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6' }}>
                    <span style={{ color: '#7E8398' }}>Full Name</span>
                    <strong style={{ color: '#131422' }}>{portfolio.investorName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6' }}>
                    <span style={{ color: '#7E8398' }}>Phone</span>
                    <strong style={{ color: '#131422' }}>{portfolio.phoneMasked}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6' }}>
                    <span style={{ color: '#7E8398' }}>PAN Number</span>
                    <strong style={{ color: '#131422' }}>{portfolio.panMasked}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#7E8398' }}>KYC Status</span>
                    <strong style={{ color: '#00B377' }}>Verified (SEBI Compliant)</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
