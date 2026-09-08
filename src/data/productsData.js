/**
 * 1Fi Marketplace Mock Product Catalog
 * Rich dataset with multiple categories, variants (color, storage/specs),
 * authentic pricing, discounts, and real specifications.
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: 'Sparkles' },
  { id: 'smartphones', label: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', label: 'Laptops & Tablets', icon: 'Laptop' },
  { id: 'audio', label: 'Audio & Music', icon: 'Headphones' },
  { id: 'wearables', label: 'Smartwatches', icon: 'Watch' },
  { id: 'appliances', label: 'Smart Home', icon: 'Home' },
];

export const PRODUCTS_DATA = [
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
    highlights: [
      'A18 Pro chip with 6-core GPU',
      'Super Retina XDR OLED display with ProMotion 120Hz',
      'Grade 5 Titanium with textured matte-glass back',
      '48MP Fusion Camera with 5x Telephoto zoom',
      'All-day battery life up to 33 hours video playback'
    ],
    variants: {
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
    },
    defaultColor: 'desert',
    defaultStorage: '256gb',
    specs: {
      'Display': '6.9-inch Super Retina XDR display with ProMotion',
      'Processor': 'A18 Pro chip, 16-core Neural Engine',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Battery': 'Up to 33 hours video playback, MagSafe wireless',
      'Security': 'Face ID, Emergency SOS via satellite',
      'Warranty': '1 Year Apple Official Warranty'
    }
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
    highlights: [
      'Galaxy AI: Circle to Search, Live Translate, Note Assist',
      'Titanium frame with Corning Gorilla Armor glass',
      '200MP Pro-grade camera with 100x Space Zoom',
      'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Built-in S Pen stylus included in chassis'
    ],
    variants: {
      colors: [
        { id: 'gray', name: 'Titanium Gray', hex: '#636569', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
        { id: 'black', name: 'Titanium Black', hex: '#212224', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80' },
        { id: 'violet', name: 'Titanium Violet', hex: '#4B3F68', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '256gb', label: '12GB | 256 GB', price: 129999, mrp: 134999 },
        { id: '512gb', label: '12GB | 512 GB', price: 139999, mrp: 144999 }
      ]
    },
    defaultColor: 'gray',
    defaultStorage: '256gb',
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X, 1-120Hz, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 Mobile Platform for Galaxy',
      'Camera': '200MP Main + 50MP 5x + 12MP Ultra Wide + 10MP 3x',
      'Battery': '5000 mAh, 45W Fast Charging, Wireless PowerShare',
      'Warranty': '1 Year Samsung India Manufacturer Warranty'
    }
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
    highlights: [
      'Apple M3 Pro chip (11-core CPU, 14-core GPU)',
      '14.2-inch Liquid Retina XDR display with 1600 nits peak brightness',
      '18GB unified high-bandwidth memory',
      '18 hours of continuous battery endurance',
      'Studio-quality three-mic array and six-speaker sound system'
    ],
    variants: {
      colors: [
        { id: 'space-black', name: 'Space Black', hex: '#1E2022', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Silver', hex: '#D7D8DC', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '512gb', label: '18GB | 512GB SSD', price: 199900, mrp: 219900 },
        { id: '1tb', label: '18GB | 1TB SSD', price: 239900, mrp: 259900 }
      ]
    },
    defaultColor: 'space-black',
    defaultStorage: '512gb',
    specs: {
      'Display': '14.2" Liquid Retina XDR, 3024x1964, ProMotion 120Hz',
      'Chip': 'Apple M3 Pro, 11-core CPU, 14-core GPU, Hardware Ray Tracing',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3',
      'Keyboard': 'Backlit Magic Keyboard with Touch ID',
      'Warranty': '1 Year Apple Limited Warranty with AppleCare option'
    }
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
    highlights: [
      'Two processors and 8 microphones for unmatched ANC',
      'Auto NC Optimizer dynamically tailors ambient noise reduction',
      'Up to 30 hours battery life with quick charging (3 min = 3 hrs)',
      'Crystal-clear hands-free calling with 4 beamforming mics',
      'Multipoint connection pairs two Bluetooth devices simultaneously'
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Matte Black', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Platinum Silver', hex: '#DCDAD5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
        { id: 'blue', name: 'Midnight Blue', hex: '#1E2B3E', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'standard', label: 'Standard Edition', price: 29990, mrp: 34990 }
      ]
    },
    defaultColor: 'black',
    defaultStorage: 'standard',
    specs: {
      'Driver Unit': '30mm, Carbon fiber composite dome',
      'Battery': '30 hrs (NC ON), 40 hrs (NC OFF), USB-PD fast charge',
      'Frequency Response': '4 Hz - 40,000 Hz with LDAC support',
      'Weight': '250g ultra-lightweight soft fit leather',
      'Warranty': '1 Year Sony India Warranty'
    }
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
    highlights: [
      'Almost 10% thinner than Series 9 with wide-angle OLED display',
      'Advanced health: ECG, blood oxygen, temperature sensing, sleep apnea',
      'Depth gauge and water temperature sensor for aquatic adventures',
      'Crash Detection, Fall Detection, and Emergency SOS',
      'Fastest charging ever: 0 to 80% in 30 minutes'
    ],
    variants: {
      colors: [
        { id: 'jet-black', name: 'Jet Black Aluminium', hex: '#161616', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
        { id: 'rose-gold', name: 'Rose Gold', hex: '#ECC4B4', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80' },
        { id: 'silver', name: 'Silver Aluminium', hex: '#DCDFE4', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '42mm', label: '42mm GPS+Cellular', price: 46900, mrp: 49900 },
        { id: '46mm', label: '46mm GPS+Cellular', price: 49900, mrp: 53900 }
      ]
    },
    defaultColor: 'jet-black',
    defaultStorage: '46mm',
    specs: {
      'Display': 'Wide-angle OLED Always-On Retina, up to 2000 nits',
      'Processor': 'S10 SiP with 64-bit dual-core processor, 4-core Neural Engine',
      'Water Resistance': '50 meters swimproof, WR50 certified',
      'Battery': 'Up to 18 hours regular, 36 hours low power mode',
      'Warranty': '1 Year Apple Official Warranty'
    }
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
    highlights: [
      'Apple M2 chip with 8-core CPU and 10-core GPU',
      '11-inch Liquid Retina display with P3 wide color and True Tone',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Supports Apple Pencil Pro and Magic Keyboard',
      'All-day battery life with USB-C connector'
    ],
    variants: {
      colors: [
        { id: 'space-grey', name: 'Space Grey', hex: '#595B5E', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80' },
        { id: 'blue', name: 'Blue', hex: '#88A2B6', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80' },
        { id: 'starlight', name: 'Starlight', hex: '#E2DCD1', image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: '128gb', label: '128 GB Wi-Fi', price: 59900, mrp: 64900 },
        { id: '256gb', label: '256 GB Wi-Fi', price: 69900, mrp: 74900 }
      ]
    },
    defaultColor: 'space-grey',
    defaultStorage: '128gb',
    specs: {
      'Display': '11-inch LED-backlit Multi-Touch display with IPS technology',
      'Processor': 'Apple M2 chip, 8GB RAM',
      'Camera': '12MP Wide back camera, 4K video recording at 24/25/30/60 fps',
      'Speakers': 'Landscape stereo speakers with spatial audio',
      'Warranty': '1 Year Apple India Warranty'
    }
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
    highlights: [
      'Laser Fluffy cleaner head illuminates invisible dust on hard floors',
      'Piezo sensor continuously calculates particle count and size',
      'Powerful Dyson Hyperdymium motor spins up to 125,000rpm',
      'Up to 60 minutes run time with fade-free suction',
      'Single-button power control for easy, comfortable cleaning'
    ],
    variants: {
      colors: [
        { id: 'yellow-nickel', name: 'Yellow / Nickel', hex: '#F2C94C', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80' },
        { id: 'prussian-blue', name: 'Prussian Blue / Copper', hex: '#1B365D', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'total-clean', label: 'Total Clean (7 Accessories)', price: 52900, mrp: 65900 }
      ]
    },
    defaultColor: 'prussian-blue',
    defaultStorage: 'total-clean',
    specs: {
      'Suction Power': '150 Air Watts in Boost mode',
      'Bin Volume': '0.35 Liters with hygienic point-and-shoot emptying',
      'Run Time': '60 minutes in Eco mode',
      'Weight': '2.2 kg ultra-light ergonomic chassis',
      'Warranty': '2 Year Dyson Official Manufacturer Warranty'
    }
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
    highlights: [
      'Apple-designed H2 headphone chip pushes audio performance',
      'Up to 2x more Active Noise Cancellation than 1st generation',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Dust, sweat, and water resistant (IP54) for earphones and case',
      'Up to 6 hours listening time with ANC enabled (30 hrs with case)'
    ],
    variants: {
      colors: [
        { id: 'white', name: 'Gloss White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80' }
      ],
      storage: [
        { id: 'usb-c', label: 'USB-C MagSafe Edition', price: 21900, mrp: 24900 }
      ]
    },
    defaultColor: 'white',
    defaultStorage: 'usb-c',
    specs: {
      'Audio': 'Custom high-excursion Apple driver, Custom HDR amplifier',
      'Chip': 'Apple H2 headphone chip, Apple U1 chip in case',
      'Sensors': 'Dual beamforming microphones, Inward-facing microphone',
      'Charging': 'USB-C, MagSafe, Apple Watch charger, Qi-certified chargers',
      'Warranty': '1 Year Apple Official Warranty'
    }
  }
];
