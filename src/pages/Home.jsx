import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Zap, RefreshCw, Shield, Truck } from 'lucide-react'
import { useAllProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import {
  HERO_SLIDES, GENDER_CATEGORIES, TICKER_ITEMS, TRENDING_TAGS,
} from '../data/products'

// ─── Ticker ──────────────────────────────────────────────────────────────────
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bg-brand-700 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-10 text-sm font-semibold text-white">
            {item}
            <span className="text-brand-300">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1)
  const timerRef = useRef(null)

  function go(next) {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }
  function prev() { go((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) }
  function next() { go((current + 1) % HERO_SLIDES.length) }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1)
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = HERO_SLIDES[current]

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-top"
            onError={e => { e.target.src = 'https://placehold.co/1400x900/18181c/71717a?text=Flamingo' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-950/90 via-surface-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="section w-full">
          <div className="max-w-xl animate-fade-up" key={current}>
            <span className="badge badge-brand mb-4 inline-block">{slide.tag}</span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight whitespace-pre-line mb-3">
              {slide.title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-400 mb-4">{slide.accent}</p>
            <p className="text-surface-300 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              {slide.sub}
            </p>
            <div className="flex items-center gap-3">
              <Link to={slide.ctaLink} className="btn-brand flex items-center gap-2 text-base px-8 py-3.5 rounded-2xl">
                {slide.cta} <ArrowRight size={18} />
              </Link>
              <button className="btn-outline text-base px-6 py-3.5 rounded-2xl">
                Explore All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl bg-surface-800/80 border border-surface-600 text-surface-200 flex items-center justify-center hover:bg-surface-700 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl bg-surface-800/80 border border-surface-600 text-surface-200 flex items-center justify-center hover:bg-surface-700 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-brand-500' : 'w-1.5 bg-surface-500 hover:bg-surface-400'
            }`}
          />
        ))}
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-surface-950/60 backdrop-blur-md border-t border-surface-700/50">
        <div className="section py-4 flex items-center justify-around gap-4">
          {[
            { val: '12K+',  label: 'Products' },
            { val: '98%',   label: 'Happy Customers' },
            { val: '50+',   label: 'Brands' },
            { val: '2-Day', label: 'Delivery' },
          ].map(s => (
            <div key={s.label} className="text-center hidden sm:block">
              <p className="font-display font-bold text-brand-400 text-lg">{s.val}</p>
              <p className="text-surface-400 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gender Section ───────────────────────────────────────────────────────────
function GenderSection() {
  return (
    <div className="section">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label">Shop By</p>
          <h2 className="section-title">Find Your Style</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(GENDER_CATEGORIES).map(([key, g]) => (
          <Link
            key={key}
            to={`/category/${key}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[3/4] block"
          >
            <img
              src={g.image}
              alt={g.label}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              onError={e => { e.target.src = 'https://placehold.co/600x800/18181c/71717a?text=' + g.label }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-3xl font-bold text-white mb-1">{g.label}</h3>
              <p className="text-surface-300 text-sm mb-4">{g.categories.length * 20}+ Styles</p>
              <span className="inline-flex items-center gap-2 bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Shop Now <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Trending Tags ────────────────────────────────────────────────────────────
function TrendingTags() {
  return (
    <div className="section pt-0">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-brand-500" />
        <p className="text-sm font-semibold text-surface-300">Trending Right Now</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRENDING_TAGS.map(tag => (
          <Link
            key={tag}
            to={`/search?q=${encodeURIComponent(tag)}`}
            className="px-4 py-2 rounded-xl bg-surface-800 border border-surface-600 text-sm font-medium text-surface-300 hover:bg-surface-700 hover:text-brand-400 hover:border-brand-700 transition-all duration-200"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  const items = [
    { icon: Truck,      title: 'Free Delivery',   desc: 'On orders above ₹999' },
    { icon: RefreshCw,  title: 'Easy Returns',    desc: '30-day hassle-free returns' },
    { icon: Shield,     title: 'Secure Payments', desc: 'UPI, Cards, Netbanking' },
    { icon: Zap,        title: 'Fast Shipping',   desc: 'Delivered in 2–5 days' },
  ]
  return (
    <div className="bg-surface-900 border-y border-surface-700">
      <div className="section py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-900/50 border border-brand-800/50 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-brand-400" />
              </div>
              <div>
                <p className="font-semibold text-surface-100 text-sm">{title}</p>
                <p className="text-surface-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Products Grid ────────────────────────────────────────────────────────────
function FeaturedProducts({ products, loading }) {
  return (
    <div className="section">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label">Fresh Drops</p>
          <h2 className="section-title">New Arrivals</h2>
        </div>
        <Link to="/category/women" className="btn-outline text-sm py-2 px-5 hidden sm:flex items-center gap-2">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : products.slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { data: products, loading } = useAllProducts()

  return (
    <div className="pt-16">
      <Hero />
      <Ticker />
      <TrustBadges />
      <GenderSection />
      <TrendingTags />
      <FeaturedProducts products={products} loading={loading} />
    </div>
  )
}