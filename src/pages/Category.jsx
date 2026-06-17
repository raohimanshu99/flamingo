import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SlidersHorizontal, ArrowLeft, Check } from 'lucide-react'
import { GENDER_CATEGORIES } from '../data/products'
import { useProductsByCategory } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

// Sort options
const SORT_OPTIONS = [
  { value: 'default',     label: 'Recommended' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
]

export default function Category() {
  const { gender } = useParams()
  const genderData  = GENDER_CATEGORIES[gender]

  const [activeCategory, setActiveCategory] = useState(null)
  const [sortBy,         setSortBy]         = useState('default')
  const [filterOpen,     setFilterOpen]     = useState(false)

  // Use the first apiCategory if none selected, else the selected one
  const apiCat = activeCategory
    ? genderData?.categories.find(c => c.id === activeCategory)?.apiCategory
    : genderData?.categories[0]?.apiCategory

  const { data: products, loading } = useProductsByCategory(apiCat)

  if (!genderData) {
    return (
      <div className="pt-32 section text-center">
        <h2 className="section-title mb-4">Category Not Found</h2>
        <Link to="/" className="btn-brand">Go Home</Link>
      </div>
    )
  }

  // Sort products
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating')     return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
    return 0
  })

  return (
    <div className="pt-16 min-h-screen">
      {/* Gender Hero Banner */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <img
          src={genderData.image}
          alt={genderData.label}
          className="w-full h-full object-cover object-top"
          onError={e => { e.target.src = 'https://placehold.co/1400x400/18181c/71717a?text=' + genderData.label }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950/90 to-surface-950/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="section w-full">
            <Link to="/" className="inline-flex items-center gap-1.5 text-surface-400 hover:text-surface-100 text-sm mb-3 transition-colors">
              <ArrowLeft size={14} /> Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {genderData.label}'s
            </h1>
            <p className="text-surface-300 mt-1">
              {genderData.categories.length * 20}+ styles across {genderData.categories.length} categories
            </p>
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div className="bg-surface-900 border-b border-surface-700 sticky top-16 z-30">
        <div className="section py-0">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                !activeCategory
                  ? 'bg-brand-700 border-brand-700 text-white'
                  : 'border-surface-600 text-surface-300 hover:border-surface-500 hover:text-surface-100'
              }`}
            >
              All
            </button>
            {genderData.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-brand-700 border-brand-700 text-white'
                    : 'border-surface-600 text-surface-300 hover:border-surface-500 hover:text-surface-100'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-6 h-6 rounded-md object-cover bg-surface-700"
                  onError={e => { e.target.style.display = 'none' }}
                />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="section pt-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-surface-400 text-sm">
            {loading ? 'Loading...' : `${sorted.length} products`}
          </p>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-dark text-sm py-2 w-auto pr-8"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : sorted.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>

        {/* No products */}
        {!loading && sorted.length === 0 && (
          <div className="text-center py-24">
            <p className="text-surface-400 text-lg">No products found.</p>
            <p className="text-surface-500 text-sm mt-1">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  )
}