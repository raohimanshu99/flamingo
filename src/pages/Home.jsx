import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAllProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import {
  HERO_SLIDES, GENDER_CATEGORIES, TICKER_ITEMS, TRENDING_TAGS,
} from '../data/products'

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="border-b border-surface-800 bg-surface-950 py-2.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-xs text-surface-400">
            {item.replace(/^[^\s]+\s/, '')}
            <span className="text-surface-700">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  function go(next) { setCurrent(next) }
  function prev() { go((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) }
  function next() { go((current + 1) % HERO_SLIDES.length) }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = HERO_SLIDES[current]

  return (
    <section className="relative w-full h-[78vh] min-h-[520px] max-h-[760px] overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-top"
            onError={e => { e.target.src = 'https://placehold.co/1400x900/18181c/71717a?text=Flamingo' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-end pb-16">
        <div className="section w-full pb-0">
          <div className="max-w-lg" key={current}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.08] tracking-tight">
              {slide.accent}
            </h1>
            <p className="text-surface-300 text-base mt-3 mb-7 max-w-sm leading-relaxed">
              {slide.sub}
            </p>
            <Link to={slide.ctaLink} className="inline-flex items-center gap-2 bg-white text-surface-950 text-sm font-semibold px-6 py-3 rounded-full hover:bg-surface-200 transition-colors duration-150">
              {slide.cta} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 bottom-16 z-20 w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:border-white/50 hover:text-white transition-colors duration-150"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute left-16 bottom-16 z-20 w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:border-white/50 hover:text-white transition-colors duration-150"
      >
        <ChevronRight size={16} />
      </button>

      <div className="absolute right-5 bottom-[4.6rem] z-20 text-white/50 text-xs font-medium tracking-wide">
        {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>
    </section>
  )
}

function GenderSection() {
  return (
    <div className="section">
      <h2 className="font-display text-2xl font-medium text-surface-100 mb-6">Shop by category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.entries(GENDER_CATEGORIES).map(([key, g]) => (
          <Link
            key={key}
            to={`/category/${key}`}
            className="group relative overflow-hidden rounded-xl aspect-[4/5] sm:aspect-[3/4] block"
          >
            <img
              src={g.image}
              alt={g.label}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              onError={e => { e.target.src = 'https://placehold.co/600x800/18181c/71717a?text=' + g.label }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950/85 via-surface-950/0 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-display text-xl font-medium text-white">{g.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function TrendingTags() {
  return (
    <div className="section pt-0">
      <div className="flex items-center justify-between border-t border-surface-800 pt-8">
        <p className="text-xs text-surface-400 uppercase tracking-wider flex-shrink-0 mr-8">Trending</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {TRENDING_TAGS.map(tag => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="text-sm text-surface-400 hover:text-surface-100 transition-colors duration-150"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrustLine() {
  const items = [
    'Free delivery above ₹999',
    '30-day returns',
    'Secure payments',
    'Delivered in 2–5 days',
  ]
  return (
    <div className="border-y border-surface-800">
      <div className="section py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 justify-center sm:justify-between text-xs text-surface-400">
          {items.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturedProducts({ products, loading }) {
  return (
    <div className="section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-medium text-surface-100">New arrivals</h2>
        <Link to="/category/women" className="text-sm text-surface-400 hover:text-surface-100 transition-colors duration-150 flex items-center gap-1.5">
          View all <ArrowRight size={13} />
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

export default function Home() {
  const { data: products, loading } = useAllProducts()

  return (
    <div className="pt-16">
      <Hero />
      <Ticker />
      <TrustLine />
      <GenderSection />
      <TrendingTags />
      <FeaturedProducts products={products} loading={loading} />
    </div>
  )
}