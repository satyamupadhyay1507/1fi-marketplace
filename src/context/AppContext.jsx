import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPortfolioData, createLienForOrder, resetPortfolio, fetchPortfolioFromDatabase } from '../services/portfolioService';
import { marketplaceApi } from '../services/marketplaceApi';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('shop'); // 'home' | 'shop' | 'emi-dues' | 'limit' | 'profile'
  const [shopSubTab, setShopSubTab] = useState('marketplace'); // 'top-brands' | 'nearby-stores' | 'marketplace'

  // Device & Display Mode: 'frame' (iPhone mockup) or 'responsive' (full web)
  const [displayMode, setDisplayMode] = useState('frame');

  // Portfolio & Active Loans State
  const [portfolio, setPortfolio] = useState(getPortfolioData());

  // Database Connection Status: { connected: boolean, message: string }
  const [dbStatus, setDbStatus] = useState({ connected: false, checking: true, message: 'Checking...' });

  // Modal States
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null); // { product, variant, emiPlan }
  const [toast, setToast] = useState(null);

  // Check database status and sync on initial load
  useEffect(() => {
    async function checkDb() {
      try {
        const status = await marketplaceApi.checkDatabaseStatus();
        setDbStatus({ ...status, checking: false });

        if (status.connected) {
          const syncResult = await fetchPortfolioFromDatabase();
          if (syncResult.success && syncResult.data) {
            setPortfolio(syncResult.data);
          }
        }
      } catch (err) {
        setDbStatus({ connected: false, checking: false, message: 'Offline / Local Demo' });
      }
    }
    checkDb();
  }, []);

  // Sync portfolio state changes
  const refreshPortfolio = async () => {
    const local = getPortfolioData();
    setPortfolio(local);
    if (dbStatus.connected) {
      const syncResult = await fetchPortfolioFromDatabase();
      if (syncResult.success && syncResult.data) {
        setPortfolio(syncResult.data);
      }
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
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

  const handleResetData = async () => {
    const fresh = await resetPortfolio();
    setPortfolio(fresh);
    showToast('Portfolio & order data reset to initial state');
  };

  const handleSeedDatabase = async () => {
    showToast('Initializing & seeding Neon Database...', 'info');
    try {
      const res = await marketplaceApi.initializeDatabase();
      if (res.success) {
        setDbStatus({ connected: true, checking: false, message: 'Neon Database Live' });
        await refreshPortfolio();
        showToast('Neon PostgreSQL tables seeded successfully!', 'success');
      } else {
        showToast(res.message || 'DATABASE_URL not set in Vercel environment.', 'error');
      }
    } catch (err) {
      showToast('Database init error: ' + err.message, 'error');
    }
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
        dbStatus,
        handleSeedDatabase,
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
