import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../data/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart()

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const deliveryFee = totalPrice > 999 ? 0 : 99
  const finalTotal  = totalPrice + deliveryFee

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-surface-900 border-l border-surface-700 flex flex-col transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-700">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-400" />
            <h2 className="font-display font-bold text-surface-100">
              Your Bag
              {totalItems > 0 && (
                <span className="ml-2 badge badge-brand">{totalItems}</span>
              )}
            </h2>
          </div>
          <button onClick={closeCart} className="btn-ghost p-1.5 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-surface-800 flex items-center justify-center">
                <ShoppingBag size={32} className="text-surface-400" />
              </div>
              <p className="text-surface-400 font-medium">Your bag is empty</p>
              <p className="text-surface-400 text-sm">Add something you love!</p>
              <button onClick={closeCart} className="btn-brand mt-2">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3 card-dark p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-lg bg-surface-700 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-100 line-clamp-2 leading-snug">{item.title}</p>
                  <p className="text-xs text-surface-400 mt-1">Size: <span className="text-surface-200 font-semibold">{item.size}</span></p>
                  <p className="text-brand-400 font-bold mt-1">{formatINR(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-surface-800 rounded-lg p-1">
                      <button
                        onClick={() => item.qty === 1 ? removeItem(item.id, item.size) : updateQty(item.id, item.size, item.qty - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-brand-400 transition-colors"
                      >
                        {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-surface-100">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-brand-400 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-surface-400 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-surface-700 px-5 py-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-surface-300">
                <span>Subtotal</span>
                <span>{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-surface-300">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-400 font-medium' : ''}>
                  {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-surface-400">
                  Add {formatINR(999 - totalPrice)} more for free delivery
                </p>
              )}
              <div className="flex justify-between font-bold text-surface-100 text-base pt-2 border-t border-surface-700">
                <span>Total</span>
                <span className="text-brand-400">{formatINR(finalTotal)}</span>
              </div>
            </div>
            <button className="btn-brand w-full flex items-center justify-center gap-2">
              Checkout <ArrowRight size={16} />
            </button>
            <button onClick={closeCart} className="btn-outline w-full text-sm">
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}