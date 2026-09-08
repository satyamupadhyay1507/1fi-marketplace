import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import StudioControlBar from './components/StudioControlBar';
import PhoneStatusBar from './components/PhoneStatusBar';
import ShopPage from './components/ShopPage';
import EMIDuesView from './components/EMIDuesView';
import LimitView from './components/LimitView';
import ProfileView from './components/ProfileView';
import HomeView from './components/HomeView';
import BottomNav from './components/BottomNav';
import ProductDetailModal from './components/ProductDetailModal';
import PledgeCheckoutModal from './components/PledgeCheckoutModal';
import { CheckCircle, AlertCircle } from 'lucide-react';
import './styles/index.css';

function MainAppContent() {
  const { activeTab, displayMode, toast } = useApp();

  return (
    <div className="app-viewport-wrapper">
      {/* Top Studio Control Bar */}
      <StudioControlBar />

      {/* Mobile Device Frame or Responsive Full Width */}
      <div className={`mobile-device-container ${displayMode === 'responsive' ? 'responsive-mode' : ''}`}>
        {/* Realistic Status Bar */}
        <PhoneStatusBar />

        {/* Scrollable Main Screen */}
        <main className="app-screen-scroll">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'shop' && <ShopPage />}
          {activeTab === 'emi-dues' && <EMIDuesView />}
          {activeTab === 'limit' && <LimitView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav />

        {/* Dynamic Modals */}
        <ProductDetailModal />
        <PledgeCheckoutModal />
      </div>

      {/* Global Toast Notification */}
      {toast && (
        <div className="app-toast-box">
          {toast.type === 'success' ? (
            <CheckCircle size={16} color="#00B377" />
          ) : (
            <AlertCircle size={16} color="#E63946" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
