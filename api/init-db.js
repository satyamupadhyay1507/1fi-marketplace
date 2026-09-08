import { query, isDatabaseConfigured } from './db.js';

const SEED_PRODUCTS = [
  {
    id: 'prod-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    rating: 4.9,
    reviewCount: 3840,
    badge: 'Trending #1',
    isNoCostEmi: true,
    maxTenureMonths: 24,
    description: 'Forged in titanium with the ground-breaking A18 Pro chip, Camera Control, 48MP Fusion camera system, and industry-leading battery life.',
    highlights: JSON.stringify([
      'A18 Pro chip with 6-core GPU',
      'Super Retina XDR OLED display with ProMotion 120Hz',
      'Grade 5 Titanium with textured matte-glass back',
      '48MP Fusion Camera with 5x Telephoto zoom',
      'All-day battery life up to 33 hours video playback'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'desert', name: 'Desert Titanium', hex: '#D4B895', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
        { id: 'natural', name: 'Natural Titanium', hex: '#8B8782', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80' },
        { id: 'black', name: 'Black Titanium', hex: '#2A292B', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
        { id: 'white', name: 'White Titanium', hex: '#E3E4E5', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '256gb', label: '256 GB', price: 144900, mrp: 154900 },
        { id: '512gb', label: '512 GB', price: 164900, mrp: 174900 },
        { id: '1tb', label: '1 TB', price: 184900, mrp: 194900 }
      ]
    }),
    defaultColor: 'desert',
    defaultStorage: '256gb',
    specs: JSON.stringify({
      'Display': '6.9-inch Super Retina XDR display with ProMotion',
      'Processor': 'A18 Pro chip, 16-core Neural Engine',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Battery': 'Up to 33 hours video playback, MagSafe wireless',
      'Security': 'Face ID, Emergency SOS via satellite',
      'Warranty': '1 Year Apple Official Warranty'
    })
  },
  {
    id: 'prod-samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'smartphones',
    rating: 4.8,
    reviewCount: 2910,
    badge: 'Galaxy AI Inside',
    isNoCostEmi: true,
    maxTenureMonths: 24,
    description: 'Meet Galaxy S24 Ultra with Galaxy AI, Titanium exterior, built-in S Pen, and 200MP Quad Telephoto camera with Nightography zoom.',
    highlights: JSON.stringify([
      'Galaxy AI: Circle to Search, Live Translate, Note Assist',
      'Titanium frame with Corning Gorilla Armor glass',
      '200MP Pro-grade camera with 100x Space Zoom',
      'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Built-in S Pen stylus included in chassis'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'gray', name: 'Titanium Gray', hex: '#636569', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
        { id: 'black', name: 'Titanium Black', hex: '#212224', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80' },
        { id: 'violet', name: 'Titanium Violet', hex: '#4B3F68', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '256gb', label: '12GB | 256 GB', price: 129999, mrp: 134999 },
        { id: '512gb', label: '12GB | 512 GB', price: 139999, mrp: 144999 }
      ]
    }),
    defaultColor: 'gray',
    defaultStorage: '256gb',
    specs: JSON.stringify({
      'Display': '6.8-inch Dynamic AMOLED 2X, 1-120Hz, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 Mobile Platform for Galaxy',
      'Camera': '200MP Main + 50MP 5x + 12MP Ultra Wide + 10MP 3x',
      'Battery': '5000 mAh, 45W Fast Charging, Wireless PowerShare',
      'Warranty': '1 Year Samsung India Manufacturer Warranty'
    })
  },
  {
    id: 'prod-macbook-pro-m3',
    name: 'Apple MacBook Pro 14" M3 Pro',
    brand: 'Apple',
    category: 'laptops',
    rating: 4.9,
    reviewCount: 1420,
    badge: 'Pro Powerhouse',
    isNoCostEmi: true,
    maxTenureMonths: 24,
    description: 'Mind-blowing performance with the M3 Pro chip. Up to 18 hours battery life, Liquid Retina XDR display, and stunning Space Black finish.',
    highlights: JSON.stringify([
      'Apple M3 Pro chip (11-core CPU, 14-core GPU)',
      '14.2-inch Liquid Retina XDR display with 1600 nits peak brightness',
      '18GB unified high-bandwidth memory',
      '18 hours of continuous battery endurance',
      'Studio-quality three-mic array and six-speaker sound system'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'space-black', name: 'Space Black', hex: '#1E2022', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Silver', hex: '#D7D8DC', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '512gb', label: '18GB | 512GB SSD', price: 199900, mrp: 219900 },
        { id: '1tb', label: '18GB | 1TB SSD', price: 239900, mrp: 259900 }
      ]
    }),
    defaultColor: 'space-black',
    defaultStorage: '512gb',
    specs: JSON.stringify({
      'Display': '14.2" Liquid Retina XDR, 3024x1964, ProMotion 120Hz',
      'Chip': 'Apple M3 Pro, 11-core CPU, 14-core GPU, Hardware Ray Tracing',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3',
      'Keyboard': 'Backlit Magic Keyboard with Touch ID',
      'Warranty': '1 Year Apple Limited Warranty with AppleCare option'
    })
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 ANC Headphones',
    brand: 'Sony',
    category: 'audio',
    rating: 4.8,
    reviewCount: 4120,
    badge: 'Industry Best ANC',
    isNoCostEmi: true,
    maxTenureMonths: 18,
    description: 'Industry-leading noise cancellation powered by two processors and 8 microphones. Exceptional sound quality and ultra-comfortable lightweight design.',
    highlights: JSON.stringify([
      'Two processors and 8 microphones for unmatched ANC',
      'Auto NC Optimizer dynamically tailors ambient noise reduction',
      'Up to 30 hours battery life with quick charging (3 min = 3 hrs)',
      'Crystal-clear hands-free calling with 4 beamforming mics',
      'Multipoint connection pairs two Bluetooth devices simultaneously'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'black', name: 'Matte Black', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Platinum Silver', hex: '#DCDAD5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
        { id: 'blue', name: 'Midnight Blue', hex: '#1E2B3E', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'standard', label: 'Standard Edition', price: 29990, mrp: 34990 }
      ]
    }),
    defaultColor: 'black',
    defaultStorage: 'standard',
    specs: JSON.stringify({
      'Driver Unit': '30mm, Carbon fiber composite dome',
      'Battery': '30 hrs (NC ON), 40 hrs (NC OFF), USB-PD fast charge',
      'Frequency Response': '4 Hz - 40,000 Hz with LDAC support',
      'Weight': '250g ultra-lightweight soft fit leather',
      'Warranty': '1 Year Sony India Warranty'
    })
  },
  {
    id: 'prod-apple-watch-s10',
    name: 'Apple Watch Series 10 (GPS + Cellular)',
    brand: 'Apple',
    category: 'wearables',
    rating: 4.8,
    reviewCount: 1650,
    badge: 'New Launch',
    isNoCostEmi: true,
    maxTenureMonths: 18,
    description: 'Thinnest Apple Watch ever with our biggest display. Fast charge to 80% in about 30 minutes, sleep apnea notifications, and advanced fitness insights.',
    highlights: JSON.stringify([
      'Almost 10% thinner than Series 9 with wide-angle OLED display',
      'Advanced health: ECG, blood oxygen, temperature sensing, sleep apnea',
      'Depth gauge and water temperature sensor for aquatic adventures',
      'Crash Detection, Fall Detection, and Emergency SOS',
      'Fastest charging ever: 0 to 80% in 30 minutes'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'jet-black', name: 'Jet Black Aluminium', hex: '#161616', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
        { id: 'rose-gold', name: 'Rose Gold', hex: '#ECC4B4', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Silver Aluminium', hex: '#DCDFE4', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '42mm', label: '42mm GPS+Cellular', price: 46900, mrp: 49900 },
        { id: '46mm', label: '46mm GPS+Cellular', price: 49900, mrp: 53900 }
      ]
    }),
    defaultColor: 'jet-black',
    defaultStorage: '46mm',
    specs: JSON.stringify({
      'Display': 'Wide-angle OLED Always-On Retina, up to 2000 nits',
      'Processor': 'S10 SiP with 64-bit dual-core processor, 4-core Neural Engine',
      'Water Resistance': '50 meters swimproof, WR50 certified',
      'Battery': 'Up to 18 hours regular, 36 hours low power mode',
      'Warranty': '1 Year Apple Official Warranty'
    })
  },
  {
    id: 'prod-ipad-air-m2',
    name: 'Apple iPad Air 11" M2 Liquid Retina',
    brand: 'Apple',
    category: 'laptops',
    rating: 4.9,
    reviewCount: 2200,
    badge: 'Popular for Creatives',
    isNoCostEmi: true,
    maxTenureMonths: 18,
    description: 'Fresh Air. Fast Apple M2 chip, gorgeous Liquid Retina display, landscape front camera with Center Stage, and superfast Wi-Fi 6E.',
    highlights: JSON.stringify([
      'Apple M2 chip with 8-core CPU and 10-core GPU',
      '11-inch Liquid Retina display with P3 wide color and True Tone',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Supports Apple Pencil Pro and Magic Keyboard',
      'All-day battery life with USB-C connector'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'space-grey', name: 'Space Grey', hex: '#595B5E', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80' },
        { id: 'blue', name: 'Blue', hex: '#88A2B6', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80' },
        { id: 'starlight', name: 'Starlight', hex: '#E2DCD1', image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '128gb', label: '128 GB Wi-Fi', price: 59900, mrp: 64900 },
        { id: '256gb', label: '256 GB Wi-Fi', price: 69900, mrp: 74900 }
      ]
    }),
    defaultColor: 'space-grey',
    defaultStorage: '128gb',
    specs: JSON.stringify({
      'Display': '11-inch LED-backlit Multi-Touch display with IPS technology',
      'Processor': 'Apple M2 chip, 8GB RAM',
      'Camera': '12MP Wide back camera, 4K video recording at 24/25/30/60 fps',
      'Speakers': 'Landscape stereo speakers with spatial audio',
      'Warranty': '1 Year Apple India Warranty'
    })
  },
  {
    id: 'prod-dyson-v12',
    name: 'Dyson V12 Detect Slim Total Clean',
    brand: 'Dyson',
    category: 'appliances',
    rating: 4.7,
    reviewCount: 980,
    badge: 'Zero Interest EMI',
    isNoCostEmi: true,
    maxTenureMonths: 12,
    description: 'Dyson\'s most lightweight intelligent cordless vacuum. Laser reveals microscopic dust, piezo sensor sizes and counts particles automatically.',
    highlights: JSON.stringify([
      'Laser Fluffy cleaner head illuminates invisible dust on hard floors',
      'Piezo sensor continuously calculates particle count and size',
      'Powerful Dyson Hyperdymium motor spins up to 125,000rpm',
      'Up to 60 minutes run time with fade-free suction',
      'Single-button power control for easy, comfortable cleaning'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'yellow-nickel', name: 'Yellow / Nickel', hex: '#F2C94C', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80' },
        { id: 'prussian-blue', name: 'Prussian Blue / Copper', hex: '#1B365D', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'total-clean', label: 'Total Clean (7 Accessories)', price: 52900, mrp: 65900 }
      ]
    }),
    defaultColor: 'prussian-blue',
    defaultStorage: 'total-clean',
    specs: JSON.stringify({
      'Suction Power': '150 Air Watts in Boost mode',
      'Bin Volume': '0.35 Liters with hygienic point-and-shoot emptying',
      'Run Time': '60 minutes in Eco mode',
      'Weight': '2.2 kg ultra-light ergonomic chassis',
      'Warranty': '2 Year Dyson Official Manufacturer Warranty'
    })
  },
  {
    id: 'prod-airpods-pro-2',
    name: 'Apple AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'audio',
    rating: 4.9,
    reviewCount: 5310,
    badge: 'Top Pick',
    isNoCostEmi: true,
    maxTenureMonths: 12,
    description: 'Pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.',
    highlights: JSON.stringify([
      'Apple-designed H2 headphone chip pushes audio performance',
      'Up to 2x more Active Noise Cancellation than 1st generation',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Dust, sweat, and water resistant (IP54) for earphones and case',
      'Up to 6 hours listening time with ANC enabled (30 hrs with case)'
    ]),
    variants: JSON.stringify({
      colors: [
        { id: 'white', name: 'Gloss White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'usb-c', label: 'USB-C MagSafe Edition', price: 21900, mrp: 24900 }
      ]
    }),
    defaultColor: 'white',
    defaultStorage: 'usb-c',
    specs: JSON.stringify({
      'Audio': 'Custom high-excursion Apple driver, Custom HDR amplifier',
      'Chip': 'Apple H2 headphone chip, Apple U1 chip in case',
      'Sensors': 'Dual beamforming microphones, Inward-facing microphone',
      'Charging': 'USB-C, MagSafe, Apple Watch charger, Qi-certified chargers',
      'Warranty': '1 Year Apple Official Warranty'
    })
  }
];

const SEED_FUNDS = [
  {
    id: 'fund-1',
    user_id: 'user-default',
    scheme_name: 'Parag Parikh Flexi Cap Fund - Direct Growth',
    category: 'Equity - Flexi Cap',
    isin: 'INF879O01019',
    current_value: 185000,
    nav: 82.45,
    units: 2243.78,
    pledgeable_ratio: 0.60,
    pledged_amount: 0,
    rta: 'CAMS'
  },
  {
    id: 'fund-2',
    user_id: 'user-default',
    scheme_name: 'Nippon India Small Cap Fund - Direct Growth',
    category: 'Equity - Small Cap',
    isin: 'INF204K01XF1',
    current_value: 140000,
    nav: 164.20,
    units: 852.61,
    pledgeable_ratio: 0.55,
    pledged_amount: 0,
    rta: 'KFintech'
  },
  {
    id: 'fund-3',
    user_id: 'user-default',
    scheme_name: 'Mirae Asset Large Cap Fund - Direct Growth',
    category: 'Equity - Large Cap',
    isin: 'INF769K01168',
    current_value: 110000,
    nav: 112.50,
    units: 977.77,
    pledgeable_ratio: 0.65,
    pledged_amount: 0,
    rta: 'KFintech'
  },
  {
    id: 'fund-4',
    user_id: 'user-default',
    scheme_name: 'HDFC Mid-Cap Opportunities Fund - Growth',
    category: 'Equity - Mid Cap',
    isin: 'INF179K01BE2',
    current_value: 50000,
    nav: 178.60,
    units: 279.95,
    pledgeable_ratio: 0.60,
    pledged_amount: 0,
    rta: 'CAMS'
  }
];

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!isDatabaseConfigured()) {
    return res.status(200).json({
      success: false,
      configured: false,
      message: 'DATABASE_URL or POSTGRES_URL is not configured yet. App is operating in Demo Mode.'
    });
  }

  try {
    // 1. Create tables
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        rating NUMERIC(3, 2) DEFAULT 4.5,
        review_count INT DEFAULT 0,
        badge VARCHAR(100),
        is_no_cost_emi BOOLEAN DEFAULT TRUE,
        max_tenure_months INT DEFAULT 24,
        description TEXT,
        highlights JSONB DEFAULT '[]',
        variants JSONB NOT NULL,
        default_color VARCHAR(50),
        default_storage VARCHAR(50),
        specs JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS portfolio (
        user_id VARCHAR(100) PRIMARY KEY,
        investor_name VARCHAR(255) NOT NULL,
        pan_masked VARCHAR(50) NOT NULL,
        phone_masked VARCHAR(50) NOT NULL,
        total_portfolio_value NUMERIC(12, 2) NOT NULL,
        max_eligible_limit NUMERIC(12, 2) NOT NULL,
        used_limit NUMERIC(12, 2) DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS mutual_funds (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        scheme_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        isin VARCHAR(50) NOT NULL,
        current_value NUMERIC(12, 2) NOT NULL,
        nav NUMERIC(10, 4) NOT NULL,
        units NUMERIC(12, 4) NOT NULL,
        pledgeable_ratio NUMERIC(4, 2) NOT NULL,
        pledged_amount NUMERIC(12, 2) DEFAULT 0,
        rta VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS loans (
        loan_id VARCHAR(100) PRIMARY KEY,
        order_id VARCHAR(100) NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_image TEXT,
        variant_details VARCHAR(255),
        principal NUMERIC(12, 2) NOT NULL,
        tenure_months INT NOT NULL,
        monthly_emi NUMERIC(12, 2) NOT NULL,
        total_amount_payable NUMERIC(12, 2) NOT NULL,
        pledged_fund_name VARCHAR(255) NOT NULL,
        pledged_collateral_value NUMERIC(12, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        next_due_amount NUMERIC(12, 2) NOT NULL,
        next_due_date VARCHAR(50),
        emis_remaining INT NOT NULL,
        schedule JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        order_id VARCHAR(100) PRIMARY KEY,
        loan_id VARCHAR(100),
        user_id VARCHAR(100) NOT NULL,
        product_id VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        amount NUMERIC(12, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'CONFIRMED',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Check if products exist; seed if empty
    const { rows: prodRows } = await query('SELECT COUNT(*) as count FROM products');
    let seededProducts = 0;
    if (parseInt(prodRows[0].count, 10) === 0) {
      for (const p of SEED_PRODUCTS) {
        await query(`
          INSERT INTO products (
            id, name, brand, category, rating, review_count, badge, 
            is_no_cost_emi, max_tenure_months, description, highlights, 
            variants, default_color, default_storage, specs
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (id) DO NOTHING
        `, [
          p.id, p.name, p.brand, p.category, p.rating, p.reviewCount, p.badge,
          p.isNoCostEmi, p.maxTenureMonths, p.description, p.highlights,
          p.variants, p.defaultColor, p.defaultStorage, p.specs
        ]);
        seededProducts++;
      }
    }

    // 3. Check if portfolio exists; seed if empty
    const { rows: portRows } = await query('SELECT COUNT(*) as count FROM portfolio WHERE user_id = $1', ['user-default']);
    let seededPortfolio = false;
    if (parseInt(portRows[0].count, 10) === 0) {
      await query(`
        INSERT INTO portfolio (
          user_id, investor_name, pan_masked, phone_masked, total_portfolio_value, max_eligible_limit, used_limit
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (user_id) DO NOTHING
      `, ['user-default', 'Satyam Upadhyay', 'ABCDE****F', '+91 98****0195', 485000, 290000, 0]);

      for (const f of SEED_FUNDS) {
        await query(`
          INSERT INTO mutual_funds (
            id, user_id, scheme_name, category, isin, current_value, nav, units, pledgeable_ratio, pledged_amount, rta
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO NOTHING
        `, [f.id, f.user_id, f.scheme_name, f.category, f.isin, f.current_value, f.nav, f.units, f.pledgeable_ratio, f.pledged_amount, f.rta]);
      }
      seededPortfolio = true;
    }

    return res.status(200).json({
      success: true,
      configured: true,
      database: 'Neon PostgreSQL',
      message: 'Neon PostgreSQL tables verified and seeded successfully!',
      stats: {
        productsCount: seededProducts || parseInt(prodRows[0].count, 10),
        seededInitialPortfolio: seededPortfolio
      }
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
