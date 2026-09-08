import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createLienForOrder } from '../services/portfolioService';
import { formatINR } from '../services/emiCalculator';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Check, 
  Receipt, 
  Layers 
} from 'lucide-react';

export default function PledgeCheckoutModal() {
  const { checkoutData, closeCheckout, handleOrderSuccess, setActiveTab } = useApp();

  if (!checkoutData) return null;

  return (
    <PledgeCheckoutContent
      checkoutData={checkoutData}
      closeCheckout={closeCheckout}
      handleOrderSuccess={handleOrderSuccess}
      setActiveTab={setActiveTab}
    />
  );
}

function PledgeCheckoutContent({ checkoutData, closeCheckout, handleOrderSuccess, setActiveTab }) {
  const { product, variant, emiPlan } = checkoutData;

  const [step, setStep] = useState(1); // 1: Review & MF Selection, 2: OTP Verification, 3: Success Confirmation
  const [selectedFundId, setSelectedFundId] = useState('fund-1');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const availableFunds = [
    {
      id: 'fund-1',
      name: 'Parag Parikh Flexi Cap Fund - Direct Growth',
      category: 'Equity - Flexi Cap',
      totalValue: 185000,
      availableLimit: 111000,
      rta: 'CAMS'
    },
    {
      id: 'fund-2',
      name: 'Nippon India Small Cap Fund - Direct Growth',
      category: 'Equity - Small Cap',
      totalValue: 140000,
      availableLimit: 77000,
      rta: 'KFintech'
    },
    {
      id: 'fund-3',
      name: 'Mirae Asset Large Cap Fund - Direct Growth',
      category: 'Equity - Large Cap',
      totalValue: 110000,
      availableLimit: 71500,
      rta: 'KFintech'
    }
  ];

  const handleConfirmFundAndProceed = () => {
    setStep(2);
    // Pre-populate simulated OTP for smooth testing
    setTimeout(() => {
      setOtp('739201');
    }, 400);
  };

  const handleVerifyOtpAndCreateLien = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const result = createLienForOrder({
        product,
        variant,
        emiPlan,
        selectedFundId
      });

      setOrderResult(result);
      setIsSubmitting(false);
      setStep(3);
    }, 1000);
  };

  const handleFinish = (targetTab = 'emi-dues') => {
    if (orderResult) {
      handleOrderSuccess(orderResult);
    }
    if (targetTab === 'emi-dues') {
      setActiveTab('emi-dues');
    }
    closeCheckout();
  };

  return (
    <div className="modal-overlay" onClick={closeCheckout}>
      <div className="bottom-sheet-modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '95%' }}>
        {/* Handle Bar */}
        <div className="sheet-handle-bar" />

        {/* Modal Header */}
        <div className="sheet-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#6C3CE9', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
              {step}
            </span>
            <span className="sheet-header-title">
              {step === 1 && 'Select Mutual Fund to Pledge'}
              {step === 2 && 'CAMS / KFintech OTP Verification'}
              {step === 3 && 'Order & Loan Confirmed!'}
            </span>
          </div>
          {step !== 3 && (
            <button className="sheet-close-btn" onClick={closeCheckout}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Scroll Body */}
        <div className="sheet-scroll-body" style={{ paddingBottom: '30px' }}>
          {/* STEP 1: Select Fund & Review Loan */}
          {step === 1 && (
            <div>
              {/* Product Mini Banner */}
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                background: '#F8F9FD',
                borderRadius: '12px',
                border: '1px solid #ECEEF6',
                marginBottom: '16px'
              }}>
                <img
                  src={variant.color.image}
                  alt={product.name}
                  style={{ width: '56px', height: '56px', objectFit: 'contain', background: '#FFF', borderRadius: '8px', padding: '4px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#131422' }}>{product.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#686E82' }}>{variant.color.name} • {variant.storage.label}</div>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#6C3CE9', marginTop: '2px' }}>
                    {formatINR(emiPlan.monthlyEMI)} / month for {emiPlan.tenureMonths} mos @ 0%
                  </div>
                </div>
              </div>

              {/* Collateral Requirement Notice */}
              <div style={{
                background: '#F1ECFE',
                border: '1px solid #E1D7FC',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '18px',
                display: 'flex',
                gap: '10px'
              }}>
                <ShieldCheck size={20} color="#6C3CE9" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '12px', color: '#2B146B', lineHeight: '1.45' }}>
                  <strong>Lien Amount Required: {formatINR(emiPlan.requiredCollateral)}</strong>
                  <p style={{ marginTop: '2px', color: '#4D2EB3' }}>
                    Select a fund from your CAMS/KFintech portfolio. Your units remain invested and keep growing with the market!
                  </p>
                </div>
              </div>

              {/* Fund Selector Radio List */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#131422', marginBottom: '10px' }}>
                  Choose Eligible Mutual Fund
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {availableFunds.map(fund => {
                    const isSelected = selectedFundId === fund.id;
                    return (
                      <div
                        key={fund.id}
                        onClick={() => setSelectedFundId(fund.id)}
                        style={{
                          border: isSelected ? '2px solid #6C3CE9' : '1px solid #ECEEF6',
                          background: isSelected ? '#FAF8FF' : '#FFFFFF',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isSelected ? '5px solid #6C3CE9' : '2px solid #C4C8D8',
                            background: '#FFF',
                            flexShrink: 0
                          }} />
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#131422', maxWidth: '220px', lineHeight: '1.3' }}>
                              {fund.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#7E8398', marginTop: '2px' }}>
                              {fund.category} • {fund.rta}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#131422' }}>
                            {formatINR(fund.totalValue)}
                          </div>
                          <div style={{ fontSize: '10px', color: '#00B377', fontWeight: 700 }}>
                            Eligible
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Proceed Button */}
              <button
                className="primary-pill-cta"
                style={{ width: '100%', maxWidth: '100%', padding: '14px' }}
                onClick={handleConfirmFundAndProceed}
              >
                <span>Authorize Digital Lien</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: OTP Verification via RTA */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F1ECFE',
                color: '#6C3CE9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Lock size={28} />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#131422', marginBottom: '6px' }}>
                Verify RTA Authorization
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686E82', marginBottom: '20px' }}>
                Enter the 6-digit OTP sent to your Aadhaar/MF registered mobile number <strong>+91 98****0195</strong> to mark lien on your Mutual Fund.
              </p>

              {/* OTP Input Box */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  style={{
                    width: '200px',
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: 800,
                    letterSpacing: '8px',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '2px solid #6C3CE9',
                    background: '#FAF8FF',
                    color: '#131422'
                  }}
                />
              </div>

              <div style={{ fontSize: '11.5px', color: '#6C3CE9', fontWeight: 600, marginBottom: '24px', cursor: 'pointer' }} onClick={() => setOtp('739201')}>
                Tap here to Auto-fill Demo OTP (739201)
              </div>

              <button
                className="primary-pill-cta"
                style={{ width: '100%', maxWidth: '100%', padding: '14px' }}
                disabled={isSubmitting || otp.length < 4}
                onClick={handleVerifyOtpAndCreateLien}
              >
                {isSubmitting ? 'Verifying & Creating Digital Lien...' : 'Confirm & Sanction 0% EMI'}
              </button>
            </div>
          )}

          {/* STEP 3: Order & Loan Sanction Success */}
          {step === 3 && orderResult && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#E8F8F2',
                color: '#00B377',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 8px 24px rgba(0, 179, 119, 0.25)'
              }}>
                <CheckCircle2 size={42} />
              </div>

              <span style={{
                background: '#E8F8F2',
                color: '#00B377',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Instant Loan Sanctioned
              </span>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#131422', marginTop: '8px', marginBottom: '4px' }}>
                Congratulations!
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686E82', marginBottom: '20px' }}>
                Your order for <strong>{product.name}</strong> is confirmed on 0% No-Cost EMI!
              </p>

              {/* Sanction Details Card */}
              <div style={{
                background: '#FAF8FF',
                border: '1px solid #ECE7FD',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'left',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #ECEEF6', fontSize: '12px' }}>
                  <span style={{ color: '#7A7F94' }}>Order Reference</span>
                  <strong style={{ color: '#131422' }}>{orderResult.orderId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6', fontSize: '12px' }}>
                  <span style={{ color: '#7A7F94' }}>Loan ID</span>
                  <strong style={{ color: '#6C3CE9' }}>{orderResult.loanId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6', fontSize: '12px' }}>
                  <span style={{ color: '#7A7F94' }}>Monthly Instalment</span>
                  <strong style={{ color: '#131422' }}>{formatINR(emiPlan.monthlyEMI)} / month</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ECEEF6', fontSize: '12px' }}>
                  <span style={{ color: '#7A7F94' }}>First EMI Due Date</span>
                  <strong style={{ color: '#00B377' }}>{orderResult.loan.nextDueDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#7A7F94' }}>Lien Marked On</span>
                  <strong style={{ color: '#131422', maxWidth: '160px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {orderResult.loan.pledgedFundName}
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  className="primary-pill-cta"
                  style={{ width: '100%', maxWidth: '100%', padding: '14px' }}
                  onClick={() => handleFinish('emi-dues')}
                >
                  <Receipt size={16} />
                  <span>View in EMI Dues</span>
                </button>

                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '999px',
                    background: '#FFFFFF',
                    border: '1px solid #ECEEF6',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#6C3CE9'
                  }}
                  onClick={() => handleFinish('shop')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
