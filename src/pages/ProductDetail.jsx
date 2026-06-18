import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShoppingBag, Heart, Share2, Star, Check, ChevronDown, ChevronUp,
  Truck, RefreshCw, Shield, ArrowLeft, Copy,
} from 'lucide-react'
import { useProduct, useProductsByCategory } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import {
  SIZES, getFabricInfo, getSellerInfo, formatINR, toINR,
} from '../data/products'
import toast from 'react-hot-toast'

const TOAST_STYLE = {
  style: {
    background: '#18181c',
    color: '#f4f4f5',
    border: '1px solid #3f3f4a',
    borderRadius: '12px',
  },
  iconTheme: { primary: '#c2410c', secondary: '#fff' },
}

// ─── Size Selector ─────────────────────────────────────────────────────────────
function SizeSelector({ selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-surface-200">Select Size</p>
        <button className="text-xs text-brand-400 hover:text-brand-300 underline underline-offset-2">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {SIZES.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`w-14 h-10 rounded-xl border text-sm font-semibold transition-all duration-150 ${
              selected === size
                ? 'bg-brand-700 border-brand-700 text-white shadow-brand-sm'
                : 'border-surface-600 text-surface-300 hover:border-brand-700 hover:text-brand-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Share Modal ───────────────────────────────────────────────────────────────
function ShareModal({ product, onClose }) {
  const url = window.location.href

  function copy() {
    navigator.clipboard.writeText(url)
    toast.success('Link copied!', TOAST_STYLE)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm card-dark p-6 rounded-2xl animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-display font-bold text-surface-100 mb-1">Share this product</h3>
        <p className="text-surface-400 text-sm mb-4 line-clamp-1">{product.title}</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={copy}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-700 hover:bg-surface-600 transition-colors text-left"
          >
            <Copy size={16} className="text-surface-300" />
            <span className="text-sm text-surface-200">Copy link</span>
          </button>
          <button
            onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out ' + product.title + ' on Flamingo!')}`, '_blank'); onClose() }}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-700 hover:bg-surface-600 transition-colors text-left"
          >
            <span className="text-[#1d9bf0] font-bold text-sm w-4">𝕏</span>
            <span className="text-sm text-surface-200">Share on X / Twitter</span>
          </button>
          <button
            onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); onClose() }}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-700 hover:bg-surface-600 transition-colors text-left"
          >
            <span className="text-[#1877f2] font-bold text-sm w-4">f</span>
            <span className="text-sm text-surface-200">Share on Facebook</span>
          </button>
        </div>

        <button onClick={onClose} className="w-full btn-outline mt-3 text-sm py-2.5">
          Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-surface-700">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-surface-100 text-sm">{title}</span>
        {open ? <ChevronUp size={16} className="text-surface-400" /> : <ChevronDown size={16} className="text-surface-400" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-surface-400 leading-relaxed space-y-2 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Product Detail Page ───────────────────────────────────────────────────────
export default function ProductDetail() {
  const { id }       = useParams()
  const { data: product, loading, error } = useProduct(id)
  const { addItem }  = useCart()

  const [size,      setSize]      = useState('M')
  const [wished,    setWished]    = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [added,     setAdded]     = useState(false)

  const fabric = getFabricInfo(Number(id))
  const seller = getSellerInfo(Number(id))

  // Related products
  const { data: related, loading: relatedLoading } = useProductsByCategory(
    product?.category ?? null
  )

  if (loading) return (
    <div className="pt-24 section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="skeleton aspect-[4/5] rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-6 w-3/4 rounded-xl" />
          <div className="skeleton h-10 w-full rounded-xl" />
          <div className="skeleton h-6 w-1/3 rounded-xl" />
          <div className="skeleton h-20 w-full rounded-xl" />
          <div className="skeleton h-14 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )

  if (error || !product) return (
    <div className="pt-32 section text-center">
      <p className="section-title mb-4">Product not found</p>
      <Link to="/" className="btn-brand">Go Home</Link>
    </div>
  )

  const price    = toINR(product.price)
  const mrp      = Math.round(price * 1.35)
  const discount = Math.round(((mrp - price) / mrp) * 100)
  const rating   = product.rating?.rate  ?? 4.2
  const reviews  = product.rating?.count ?? 0

  function handleAddToCart() {
    addItem({ id: product.id, title: product.title, price, image: product.image, size })
    setAdded(true)
    toast.success(`Added to bag! (Size ${size})`, TOAST_STYLE)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem({ id: product.id, title: product.title, price, image: product.image, size })
    toast.success('Proceeding to checkout...', TOAST_STYLE)
    // In a real app: navigate('/checkout')
  }

  const otherProducts = related.filter(p => p.id !== product.id).slice(0, 6)

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="section">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
            <Link to="/" className="hover:text-surface-300 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category?.includes('women') ? 'women' : 'men'}`}
              className="hover:text-surface-300 capitalize transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-surface-300 truncate max-w-[200px]">{product.title}</span>
          </nav>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ── Left: Images ── */}
            <div className="space-y-3">
              <div className="product-img-wrap aspect-[4/5] rounded-2xl overflow-hidden bg-surface-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                  onError={e => { e.target.src = 'https://placehold.co/600x800/18181c/71717a?text=Image' }}
                />
              </div>
              {/* Thumbnail strip (same image, different zoom in real app) */}
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square rounded-xl bg-surface-800 overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-600 transition-colors">
                    <img src={product.image} alt="" className="w-full h-full object-contain p-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Info ── */}
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <p className="section-label capitalize">{product.category}</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-100 leading-snug mt-1">
                  {product.title}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-surface-800 border border-surface-600 rounded-xl px-3 py-1.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={13}
                      className={i <= Math.round(rating) ? 'text-gold-500 fill-gold-500' : 'text-surface-600 fill-surface-600'} />
                  ))}
                  <span className="text-sm font-bold text-surface-200 ml-1">{rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-surface-400">{reviews.toLocaleString()} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-surface-100">{formatINR(price)}</span>
                <span className="text-lg text-surface-400 line-through">{formatINR(mrp)}</span>
                <span className="badge badge-brand text-sm">{discount}% OFF</span>
              </div>
              <p className="text-xs text-surface-400 -mt-4">Inclusive of all taxes</p>

              {/* Size */}
              <SizeSelector selected={size} onSelect={setSize} />

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all duration-200 border ${
                    added
                      ? 'bg-green-700/20 border-green-600 text-green-400'
                      : 'border-surface-500 text-surface-100 hover:bg-surface-800 hover:border-surface-400'
                  }`}
                >
                  {added ? <><Check size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Bag</>}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-brand py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setWished(w => !w); toast(wished ? 'Removed from wishlist' : 'Added to wishlist!', { ...TOAST_STYLE, icon: wished ? '💔' : '❤️' }) }}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-xl border ${
                    wished
                      ? 'border-brand-700 text-brand-400 bg-brand-900/20'
                      : 'border-surface-600 text-surface-400 hover:text-brand-400 hover:border-brand-700'
                  }`}
                >
                  <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
                  {wished ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-2 text-sm font-medium border border-surface-600 text-surface-400 hover:text-surface-200 hover:border-surface-500 px-4 py-2 rounded-xl transition-colors"
                >
                  <Share2 size={15} /> Share
                </button>
              </div>

              {/* Delivery info */}
              <div className="card-dark p-4 space-y-3 rounded-2xl">
                {[
                  { icon: Truck,    text: 'Free delivery on orders above ₹999' },
                  { icon: RefreshCw,text: 'Easy 30-day returns & exchanges' },
                  { icon: Shield,   text: '100% authentic products, quality guaranteed' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-surface-300">
                    <Icon size={15} className="text-brand-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Accordions — Product Details */}
              <div className="border-t border-surface-700 -mx-1">
                <Accordion title="Product Details" defaultOpen>
                  <p>{product.description}</p>
                </Accordion>
                <Accordion title="Material & Care">
                  <p><span className="text-surface-200 font-medium">Material:</span> {fabric.material}</p>
                  <p><span className="text-surface-200 font-medium">Care:</span> {fabric.care}</p>
                  <p><span className="text-surface-200 font-medium">Origin:</span> {fabric.origin}</p>
                </Accordion>
                <Accordion title="Seller Information">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-surface-200 font-medium">{seller.name}</p>
                      <p>Selling since {seller.since}</p>
                      <p>{seller.reviews.toLocaleString()} ratings</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Star size={12} fill="#f59e0b" className="text-gold-500" />
                        <span className="font-bold text-surface-200">{seller.rating}</span>
                      </div>
                      {seller.verified && (
                        <span className="badge badge-brand flex items-center gap-1 w-fit ml-auto">
                          <Check size={10} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>

          {/* ── Related Products ── */}
          {otherProducts.length > 0 && (
            <div className="mt-20">
              <div className="mb-8">
                <p className="section-label">You Might Also Like</p>
                <h2 className="section-title">Related Products</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {relatedLoading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : otherProducts.map(p => <ProductCard key={p.id} product={p} />)
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {shareOpen && <ShareModal product={product} onClose={() => setShareOpen(false)} />}
    </>
  )
}