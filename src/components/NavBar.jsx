import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingBag, Search, Heart, Menu, X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { label: 'Men',   href: '/category/men'   },
  { label: 'Women', href: '/category/women' },
  { label: 'Kids',  href: '/category/kids'  },
]

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [query,       setQuery]       = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      {/* Main Nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-950/95 backdrop-blur-xl border-b border-surface-700 shadow-xl'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-display text-xl font-medium text-surface-100 tracking-tight">
              Flamingo
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="px-4 py-2 rounded-lg text-sm text-surface-300 hover:text-surface-100 hover:bg-surface-800 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(o => !o)}
              className="btn-ghost p-2 rounded-xl"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button className="btn-ghost p-2 rounded-xl hidden sm:flex" aria-label="Wishlist">
              <Heart size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative btn-ghost p-2 rounded-xl"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-brand-600 text-white text-[9px] font-semibold rounded-full flex items-center justify-center px-1">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="btn-ghost p-2 rounded-xl md:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar — slides down */}
        <div className={`overflow-hidden transition-all duration-300 border-t border-surface-700 ${
          searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        } bg-surface-900`}>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-3 flex gap-2">
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="Search clothes, brands, categories..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="input-dark flex-1 text-sm"
            />
            <button type="submit" className="btn-brand px-5 py-2.5 text-sm">
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-surface-900 border-t border-surface-700 px-4 py-4 flex flex-col gap-1 animate-fade-in">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-surface-200 font-medium hover:bg-surface-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}