import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR, toINR } from '../data/products'
import toast from 'react-hot-toast'

export default function ProductCard({ product, className = '' }) {
  const { addItem } = useCart()
  const [wished,  setWished]  = useState(false)
  const [loading, setLoading] = useState(false)

  if (!product) return null

  const price       = toINR(product.price)
  const mrp         = Math.round(price * 1.35)
  const discount    = Math.round(((mrp - price) / mrp) * 100)
  const rating      = product.rating?.rate  ?? 4.2
  const ratingCount = product.rating?.count ?? 0

  function quickAddToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    setTimeout(() => {
      addItem({
        id:    product.id,
        title: product.title,
        price,
        image: product.image,
        size:  'M',
      })
      toast.success('Added to bag!', {
        style: {
          background: '#18181c',
          color: '#f4f4f5',
          border: '1px solid #3f3f4a',
          borderRadius: '12px',
        },
        iconTheme: { primary: '#c2410c', secondary: '#fff' },
      })
      setLoading(false)
    }, 300)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group relative flex flex-col card-dark overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="product-img-wrap bg-surface-700">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={e => { e.target.src = 'https://placehold.co/400x530/18181c/71717a?text=Image' }}
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Discount badge */}
        {discount > 10 && (
          <span className="absolute top-2.5 left-2.5 bg-surface-950/80 text-surface-200 text-[10px] font-medium px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWished(w => !w) }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wished
              ? 'bg-brand-600 text-white scale-110'
              : 'bg-surface-800/80 text-surface-300 opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add */}
        <button
          onClick={quickAddToCart}
          disabled={loading}
          className="absolute bottom-2.5 left-2.5 right-2.5 bg-surface-950/90 text-surface-100 font-medium text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-surface-900"
        >
          <ShoppingBag size={13} />
          {loading ? 'Adding...' : 'Quick add'}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-[11px] text-surface-400 uppercase tracking-wide">
          {product.category}
        </p>
        <p className="text-sm text-surface-200 line-clamp-2 leading-snug flex-1">
          {product.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={11} fill="currentColor" className="text-surface400" />
          <span className="text-[11px] text-surface-400">{rating.toFixed(1)} ({ratingCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-medium text-surface-100">{formatINR(price)}</span>
          {discount > 10 && (
            <span className="text-xs text-surface-400 line-through">{formatINR(mrp)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}