import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Store, 
  Receipt, 
  TrendingUp, 
  User 
} from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'emi-dues', label: 'EMI Dues', icon: Receipt },
    { id: 'limit', label: 'Limit', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="app-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            className={`nav-item-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
          >
            {isActive && <span className="nav-active-bar" />}
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
