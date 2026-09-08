# 1Fi Marketplace Web App & Interactive Studio

A modern, high-performance web experience and interactive studio preview for the **1Fi** ecosystem — enabling users to shop top brands and local merchant stores with credit lines backed by Mutual Fund pledges.

---

## 🚀 Key Features

- 📱 **Dual View Modes**: Toggle seamlessly between realistic iPhone device frame and responsive desktop viewport.
- 🛍️ **E-Commerce & Merchant Discovery**:
  - **Marketplace Tab**: Curated electronics, premium gadgets, lifestyle items.
  - **Top Brands Tab**: Direct brand partners with zero-cost EMI offers.
  - **Nearby Stores Tab**: Geolocation-aware local merchant partners with instant voucher redemption.
- 💳 **Credit Line & MF Pledge Simulation**:
  - Live portfolio valuation and pledgeable units calculation.
  - Interactive credit limit utilization and instant pledge workflow.
- 📊 **EMI Calculator & Dues Management**:
  - Flexible tenure selection (3, 6, 9, 12 months) with transparent APR and fee breakdowns.
  - EMI dues tracking with upcoming payment schedules and one-click repayments.
- ⚡ **Cutting-Edge Tech Stack**:
  - React 19 + Vite 8
  - Modern CSS token system with responsive glassmorphism and micro-interactions
  - Lucide React icon suite

---

## 🛠️ Tech Stack

- **Framework**: React 19 (JavaScript)
- **Bundler / Dev Server**: Vite 8
- **Styling**: Vanilla CSS Design Tokens & Component Styles
- **Icons**: `lucide-react`
- **Linting**: Oxlint

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/satyamupadhyay1507/1fi-marketplace.git

# Navigate into directory
cd 1fi-marketplace

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
1fi-marketplace/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and SVG assets
│   ├── components/         # Reusable UI components & screen views
│   │   ├── BottomNav.jsx
│   │   ├── EMIDuesView.jsx
│   │   ├── HomeView.jsx
│   │   ├── LimitView.jsx
│   │   ├── MarketplaceTab.jsx
│   │   ├── NearbyStoresTab.jsx
│   │   ├── PhoneStatusBar.jsx
│   │   ├── PledgeCheckoutModal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
│   │   ├── ProfileView.jsx
│   │   ├── SegmentedTabs.jsx
│   │   ├── ShopPage.jsx
│   │   ├── StudioControlBar.jsx
│   │   ├── TopBanner.jsx
│   │   └── TopBrandsTab.jsx
│   ├── context/            # Global AppContext & state management
│   ├── data/               # Product catalog & mock portfolio datasets
│   ├── services/           # EMI calculator & portfolio business logic
│   ├── styles/             # Design tokens and modular stylesheets
│   ├── App.jsx             # Main application layout
│   └── main.jsx            # React root mount
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is proprietary and confidential.
