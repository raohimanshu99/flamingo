// ─── Category Config ────────────────────────────────────────────────────────
export const GENDER_CATEGORIES = {
  men: {
    label: 'Men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&q=80',
    categories: [
      { id: 'shirts',   label: 'Shirts',    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'jeans',    label: 'Jeans',     image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'jackets',  label: 'Jackets',   image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'tshirts',  label: 'T-Shirts',  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'trousers', label: 'Trousers',  image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'ethnic',   label: 'Ethnic',    image: 'https://images.unsplash.com/photo-1583394293214-f5c8395d3ae8?w=400&q=80', apiCategory: "men's clothing" },
    ],
  },
  women: {
    label: 'Women',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    categories: [
      { id: 'dresses',   label: 'Dresses',    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'tops',      label: 'Tops',       image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'sarees',    label: 'Sarees',     image: 'https://images.unsplash.com/photo-1583394293214-f5c8395d3ae8?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'jeans',     label: 'Jeans',      image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'coords',    label: 'Co-ords',    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'kurtis',    label: 'Kurtis',     image: 'https://images.unsplash.com/photo-1631233859262-0d8e43ea47b5?w=400&q=80', apiCategory: "women's clothing" },
    ],
  },
  kids: {
    label: 'Kids',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80',
    categories: [
      { id: 'boys',    label: 'Boys',       image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'girls',   label: 'Girls',      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80', apiCategory: "women's clothing" },
      { id: 'sets',    label: 'Sets',       image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80', apiCategory: "men's clothing" },
      { id: 'uniform', label: 'Uniform',    image: 'https://images.unsplash.com/photo-1604075792151-35ab3f63eb54?w=400&q=80', apiCategory: "men's clothing" },
    ],
  },
}

// ─── Sizes ──────────────────────────────────────────────────────────────────
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// ─── Fabric info seeded by product id ───────────────────────────────────────
const FABRICS = [
  { material: '100% Pure Cotton', care: 'Machine wash cold, tumble dry low', origin: 'Made in India' },
  { material: 'Cotton-Linen Blend (60/40)', care: 'Hand wash recommended, dry in shade', origin: 'Made in India' },
  { material: '95% Polyester, 5% Spandex', care: 'Machine wash cold, do not bleach', origin: 'Made in Bangladesh' },
  { material: 'Premium Rayon', care: 'Dry clean only', origin: 'Made in India' },
  { material: '100% Organic Cotton', care: 'Gentle machine wash, lay flat to dry', origin: 'Made in India' },
  { material: 'Denim — 98% Cotton, 2% Elastane', care: 'Wash inside out, cold water', origin: 'Made in India' },
  { material: 'Viscose Georgette', care: 'Hand wash or dry clean', origin: 'Made in India' },
  { material: 'Knitted Jersey Fabric', care: 'Machine wash warm, do not iron print', origin: 'Made in Vietnam' },
]

const SELLERS = [
  { name: 'Flamingo Official Store', rating: 4.8, reviews: 12430, since: '2019', verified: true },
  { name: 'StyleHouse India',        rating: 4.6, reviews: 8210,  since: '2020', verified: true },
  { name: 'Urban Drip Co.',          rating: 4.5, reviews: 5680,  since: '2021', verified: true },
  { name: 'Thread & Co.',            rating: 4.7, reviews: 9870,  since: '2018', verified: true },
  { name: 'Weave Republic',          rating: 4.4, reviews: 3120,  since: '2022', verified: false },
]

// Deterministically assign fabric/seller from product id
export function getFabricInfo(productId) {
  return FABRICS[productId % FABRICS.length]
}
export function getSellerInfo(productId) {
  return SELLERS[productId % SELLERS.length]
}

// ─── Convert FakeStoreAPI price (USD) → INR display ─────────────────────────
export function toINR(usdPrice) {
  const inr = Math.round(usdPrice * 83.5)
  // bump to realistic clothing price range
  return Math.max(inr, 499) + Math.floor(productNoise(usdPrice) * 500)
}

function productNoise(seed) {
  return ((Math.sin(seed * 127.1) + 1) / 2)
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Hero slides ─────────────────────────────────────────────────────────────
export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Summer Collection 2025',
    title: 'Style That\nStands Out',
    accent: 'Like A Flamingo',
    sub: 'Discover fashion that makes you unforgettable. Curated styles for every occasion.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    cta: 'Shop Women',
    ctaLink: '/category/women',
    color: 'from-brand-900/80',
  },
  {
    id: 2,
    tag: 'Men\'s Edit — Fresh Drops',
    title: 'Dress Bold,\nWear Confident',
    accent: 'The Men\'s Edit',
    sub: 'Premium menswear that speaks volumes. Shirts, jeans, jackets and more.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85',
    cta: 'Shop Men',
    ctaLink: '/category/men',
    color: 'from-surface-950/90',
  },
  {
    id: 3,
    tag: 'Kids Essentials',
    title: 'Tiny Humans,\nBig Style',
    accent: 'Kids Collection',
    sub: 'Comfortable, durable, adorable. Clothes your kids will actually want to wear.',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=1200&q=85',
    cta: 'Shop Kids',
    ctaLink: '/category/kids',
    color: 'from-surface-950/85',
  },
]

// ─── Trending tags for homepage ───────────────────────────────────────────────
export const TRENDING_TAGS = [
  'Linen Co-ords', 'Oversized Blazers', 'Floral Prints',
  'Baggy Denim', 'Pastel Tones', 'Ethnic Fusion', 'Monochrome Sets',
]

// ─── Ticker items ─────────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  '🚚  Free Delivery above ₹999',
  '🔥  Summer Sale — Up to 50% Off',
  '✨  Use code FLAMINGO10 for extra 10% off',
  '📦  Easy 30-Day Returns',
  '🆕  New Arrivals every Friday',
  '💳  0% EMI on orders above ₹2,999',
]