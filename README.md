# 1Fi Marketplace Web App & Interactive Studio

A modern, high-performance web application and interactive studio preview for the **1Fi** ecosystem — enabling users to shop top brands and local merchant stores with credit lines backed by Mutual Fund pledges.

---

## 🌐 Live Deployment

- 🚀 **Live Demo**: [https://1fi-marketplace-six-vert.vercel.app](https://1fi-marketplace-six-vert.vercel.app)
- 🗄️ **Database**: [Neon Serverless PostgreSQL](https://neon.tech) (Live & Connected)
- ⚡ **Backend & Hosting**: [Vercel](https://vercel.com) Serverless Functions (`/api/*`)

---

## 🚀 Key Features

- 📱 **Dual View Modes**: Toggle seamlessly between realistic iPhone device frame and responsive full-width viewport.
- 🛍️ **E-Commerce & Merchant Discovery**:
  - **Marketplace Tab**: Curated electronics, premium gadgets, lifestyle items.
  - **Top Brands Tab**: Direct brand partners with zero-cost EMI offers.
  - **Nearby Stores Tab**: Geolocation-aware local merchant partners with instant voucher redemption.
- 💳 **Credit Line & MF Pledge Simulation**:
  - Live portfolio valuation and pledgeable units calculation.
  - Interactive credit limit utilization and instant pledge workflow.
- 📊 **EMI Calculator & Dues Management**:
  - Flexible tenure selection (3, 6, 9, 12, 18, 24 months) with transparent APR and fee breakdowns.
  - EMI dues tracking with upcoming payment schedules and one-click repayments.
- 🗄️ **Full-Stack Neon PostgreSQL Database**:
  - Serverless PostgreSQL tables: `products`, `portfolio`, `mutual_funds`, `loans`, and `orders`.
  - Zero-cold-start queries via `@neondatabase/serverless` connection pool.
  - Live database connection status indicator (`🟢 Neon DB: Connected`).
  - Seamless offline fallback for local development.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8
- **Backend / API**: Vercel Serverless Functions (Node.js)
- **Database**: Neon Serverless PostgreSQL
- **Styling**: Vanilla CSS Design Tokens & Micro-Interactions (Zero CSS Bloat)
- **Icons**: `lucide-react`
- **Linting**: Oxlint

---

## 🔌 API Endpoints

All endpoints are hosted as Vercel serverless functions backed by Neon PostgreSQL:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Fetch all products with search, category filtering, and price/rating sorting |
| `/api/products?id={id}` | `GET` | Fetch full specifications for a single product |
| `/api/portfolio` | `GET` | Retrieve user mutual fund holdings and available credit line |
| `/api/portfolio` | `POST` | Reset portfolio state and clear demo orders |
| `/api/loans` | `GET` | Retrieve list of active EMI loans and schedules |
| `/api/loans` | `POST` | Create order, establish mutual fund lien, and create active EMI loan |
| `/api/dues` | `POST` | Process EMI installment payment and restore available credit limit |
| `/api/init-db` | `GET` / `POST` | Verify DDL schema migrations and seed initial catalog & holdings |

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Local Setup
```bash
# Clone the repository
git clone https://github.com/satyamupadhyay1507/1fi-marketplace.git

# Navigate into directory
cd 1fi-marketplace

# Install dependencies
npm install

# (Optional) Add your Neon connection string in .env.local
cp .env.example .env.local

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
├── api/                    # Vercel Serverless Functions
│   ├── db.js               # Neon PostgreSQL connection pool
│   ├── dues.js             # EMI repayment handler
│   ├── init-db.js          # DDL schema migration & seed data
│   ├── loans.js            # Loan creation & MF lien pledge
│   ├── portfolio.js        # Portfolio valuation & limit calculations
│   └── products.js         # Product catalog queries & filtering
├── public/                 # Static public assets & icons
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
│   ├── data/               # Product catalog & mock datasets
│   ├── services/           # EMI calculator & portfolio business logic
│   ├── styles/             # Design tokens and modular stylesheets
│   ├── App.jsx             # Main application layout
│   └── main.jsx            # React root mount
├── vercel.json             # Vercel routing configuration
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is proprietary and confidential.
