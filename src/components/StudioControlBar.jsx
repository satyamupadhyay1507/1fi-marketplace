import React from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, Monitor, RotateCcw, Database, CheckCircle2 } from 'lucide-react';

export default function StudioControlBar() {
  const { displayMode, setDisplayMode, handleResetData, dbStatus, handleSeedDatabase } = useApp();

  return (
    <header className="studio-control-bar">
      <div className="studio-brand">
        <span>1Fi Marketplace</span>
        <span className="studio-brand-badge">SDE ASSIGNMENT</span>
        
        {/* Database Status Indicator */}
        <button
          className={`db-status-pill ${dbStatus.connected ? 'connected' : 'disconnected'}`}
          onClick={handleSeedDatabase}
          title={dbStatus.connected ? 'Connected to Neon PostgreSQL (Click to re-verify/seed)' : 'Click to initialize & seed Neon Database'}
        >
          <Database size={12} />
          <span>{dbStatus.connected ? 'Neon DB: Connected' : 'DB: Demo Store'}</span>
        </button>
      </div>

      <div className="studio-actions">
        {/* Device Viewport Mode Switcher */}
        <button
          className={`mode-toggle-btn ${displayMode === 'frame' ? 'active' : ''}`}
          onClick={() => setDisplayMode('frame')}
          title="Mobile iPhone Shell"
        >
          <Smartphone size={14} />
          <span>Mobile App View</span>
        </button>

        <button
          className={`mode-toggle-btn ${displayMode === 'responsive' ? 'active' : ''}`}
          onClick={() => setDisplayMode('responsive')}
          title="Full Responsive View"
        >
          <Monitor size={14} />
          <span>Full Width View</span>
        </button>

        {/* Reset Demo Data Button */}
        <button
          className="reset-btn"
          onClick={handleResetData}
          title="Reset sample orders and clear cache"
        >
          <RotateCcw size={13} />
          <span>Reset Demo</span>
        </button>
      </div>
    </header>
  );
}
