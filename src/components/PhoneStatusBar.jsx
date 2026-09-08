import React, { useState, useEffect } from 'react';
import { Wifi, Signal } from 'lucide-react';

export default function PhoneStatusBar() {
  const [time, setTime] = useState('1:22');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      // Format as 12-hour or current time
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${formattedHours}:${formattedMinutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-status-bar">
      <div className="status-time">{time}</div>

      {/* Dynamic Island / Notch */}
      <div className="status-notch-island">
        <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
          1Fi
        </span>
        <div className="island-camera"></div>
      </div>

      <div className="status-icons">
        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.02em', opacity: 0.9 }}>5G</span>
        <Signal size={12} strokeWidth={2.5} />
        <Wifi size={12} strokeWidth={2.5} />
        <div className="battery-pill">
          <span>30</span>
        </div>
      </div>
    </div>
  );
}
