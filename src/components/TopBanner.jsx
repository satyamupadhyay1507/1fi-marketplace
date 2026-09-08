import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="shop-hero-banner">
      <div className="banner-glow-circle" />

      {/* Pill Badge */}
      <div className="banner-tag-pill">
        <Sparkles size={12} color="#FFD700" />
        <span>NO-COST EMIs</span>
      </div>

      {/* Headline */}
      <h1 className="banner-title">
        Shop today,<br />
        Pay later using<br />
        Mutual funds.
      </h1>

      {/* Subtitle */}
      <p className="banner-subtitle">
        No credit score required. No interest.<br />
        Backed by your investments.
      </p>

      {/* Rich 3D Composition Graphic */}
      <div className="banner-3d-graphic-wrapper">
        <svg className="banner-graphic-svg" viewBox="0 0 360 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#F5B318" />
              <stop offset="100%" stopColor="#D98A07" />
            </linearGradient>
            <linearGradient id="bagGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFC837" />
              <stop offset="100%" stopColor="#E99200" />
            </linearGradient>
            <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A1E9E" />
              <stop offset="100%" stopColor="#834BF8" />
            </linearGradient>
            <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.3" floodColor="#000" />
            </filter>
          </defs>

          {/* Golden Confetti Particles */}
          <circle cx="45" cy="20" r="3" fill="#FFDF73" opacity="0.8" />
          <polygon points="120,12 125,18 118,22" fill="#FFB703" opacity="0.75" />
          <polygon points="210,15 218,17 214,24" fill="#FFDF73" opacity="0.9" />
          <circle cx="310" cy="18" r="2.5" fill="#FFC837" opacity="0.8" />
          <rect x="290" y="35" width="8" height="4" rx="1" transform="rotate(35 290 35)" fill="#FFB703" opacity="0.8" />
          <rect x="70" y="40" width="7" height="3.5" rx="1" transform="rotate(-25 70 40)" fill="#FFDF73" opacity="0.7" />

          {/* Floating Gold Ribbon Streamer */}
          <path d="M15 85 C 40 40, 90 100, 140 60 C 180 30, 220 70, 260 45" stroke="url(#goldRibbon)" strokeWidth="4" strokeLinecap="round" opacity="0.7" fill="none" />
          <path d="M260 45 C 290 30, 325 50, 350 35" stroke="url(#goldRibbon)" strokeWidth="3" strokeLinecap="round" opacity="0.6" fill="none" />

          {/* Shopping Bag */}
          <g transform="translate(230, 30)" filter="url(#cardShadow)">
            <rect x="15" y="24" width="70" height="62" rx="6" fill="url(#bagGradient)" />
            <path d="M35 24 V 12 C 35 6, 65 6, 65 12 V 24" stroke="#FFF5D6" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* 1Fi emblem on bag */}
            <circle cx="50" cy="55" r="14" fill="rgba(255,255,255,0.25)" />
            <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="sans-serif">1Fi</text>
          </g>

          {/* Sleek Laptop Behind */}
          <g transform="translate(180, 10)" filter="url(#cardShadow)">
            <rect x="10" y="10" width="82" height="52" rx="4" fill="#1C1C22" stroke="#4A4A58" strokeWidth="1.5" />
            <rect x="13" y="13" width="76" height="46" rx="2" fill="url(#laptopScreen)" />
            <path d="M2" y="62 L 100 62 L 96 66 L 6 66 Z" fill="#2E2E38" />
            {/* Screen shine */}
            <path d="M13 13 L 50 13 L 30 59 L 13 59 Z" fill="rgba(255,255,255,0.12)" />
          </g>

          {/* Sports Car Graphic */}
          <g transform="translate(85, 35)" filter="url(#cardShadow)">
            {/* Red Car Body */}
            <path d="M10 42 C 15 30, 30 20, 50 18 L 85 18 C 105 18, 120 28, 128 42 L 135 44 C 138 45, 140 48, 139 52 L 136 58 C 134 60, 131 62, 128 62 L 8 62 C 4 62, 2 58, 4 54 Z" fill="#E62E2E" />
            {/* Roof & Windshield */}
            <path d="M32 24 L 46 12 L 82 12 L 98 24 Z" fill="#111827" />
            <path d="M48 14 L 78 14 L 74 22 L 40 22 Z" fill="#38BDF8" opacity="0.6" />
            {/* Wheels */}
            <circle cx="34" cy="62" r="11" fill="#18181B" stroke="#71717A" strokeWidth="2.5" />
            <circle cx="34" cy="62" r="4" fill="#A1A1AA" />
            <circle cx="108" cy="62" r="11" fill="#18181B" stroke="#71717A" strokeWidth="2.5" />
            <circle cx="108" cy="62" r="4" fill="#A1A1AA" />
            {/* Headlights */}
            <polygon points="132,46 137,48 135,52 130,50" fill="#FEF08A" />
          </g>

          {/* High-tech Smartphone */}
          <g transform="translate(150, 20)" filter="url(#cardShadow)">
            <rect x="0" y="0" width="34" height="66" rx="7" fill="#09090B" stroke="#7C3AED" strokeWidth="1.5" />
            <rect x="2" y="2" width="30" height="62" rx="5" fill="#2E1065" />
            <circle cx="17" cy="6" r="1.5" fill="#4C1D95" />
            <path d="M2 18 C 10 18, 14 30, 32 30" stroke="#A855F7" strokeWidth="1.5" fill="none" />
            <circle cx="17" cy="45" r="7" fill="#9333EA" opacity="0.4" />
          </g>
        </svg>
      </div>
    </div>
  );
}
