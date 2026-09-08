import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPortfolioData, createLienForOrder, resetPortfolio } from '../services/portfolioService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('shop'); // 'home' | 'shop' | 'emi-dues' | 'limit' | 'profile'
  const [shopSubTab, setShopSubTab] = useState('marketplace'); // 'top-brands' | 'nearby-stores' | 'marketplace'

  // Device & Display Mode: 'frame' (iPhone mockup) or 'responsive' (full web)
  const [displayMode, setDisplayMode] = useState('frame');

  // Portfolio & Active Loans State
  const [portfolio, setPortfolio] = useState(getPortfolioData());

  // Modal States
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null); // { product, variant, emiPlan }
  const [toast, setToast] = useState(null);

  // Sync portfolio state changes
  const refreshPortfolio = () => {
    setPortfolio(getPortfolioData());
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Open Product Detail Modal
  const openProductDetail = (product) => {
    setSelectedProductModal(product);
  };

  const closeProductDetail = () => {
    setSelectedProductModal(null);
  };

  // Initiate Checkout & MF Lien flow
  const initiateCheckout = (product, variant, emiPlan) => {
    setCheckoutData({ product, variant, emiPlan });
  };

  const closeCheckout = () => {
    setCheckoutData(null);
  };

  // Complete Order & Lien Creation
  const handleOrderSuccess = (orderResult) => {
    refreshPortfolio();
    setCheckoutData(null);
    setSelectedProductModal(null);
    showToast(`Order Placed! 0% EMI created via ${orderResult.loan.pledgedFundName}`, 'success');
  };

  const handleResetData = () => {
    const fresh = resetPortfolio();
    setPortfolio(fresh);
    showToast('Demo data reset to initial state');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        shopSubTab,
        setShopSubTab,
        displayMode,
        setDisplayMode,
        portfolio,
        refreshPortfolio,
        selectedProductModal,
        openProductDetail,
        closeProductDetail,
        checkoutData,
        initiateCheckout,
        closeCheckout,
        handleOrderSuccess,
        handleResetData,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
