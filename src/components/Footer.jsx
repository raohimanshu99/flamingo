import { Link } from 'react-router-dom'

const SOCIAL = [
  { label: 'Instagram', symbol: '📸', href: '#' },
  { label: 'X',        symbol: '𝕏',  href: '#' },
  { label: 'YouTube',  symbol: '▶',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-surface-800 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="font-display text-lg font-medium text-surface-100">
              Flamingo
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs">
              Fashion that makes you stand out. Curated styles for men, women & kids, delivered to your door.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href}
                  className="w-9 h-9 rounded-xl bg-surface-800 flex items-center justify-center text-surface-400 hover:text-brand-400 hover:bg-surface-700 transition-colors text-sm font-bold">
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-surface-100 text-sm">Shop</h4>
            <ul className="space-y-2.5">
              {['Men', 'Women', 'Kids'].map(item => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-surface-400 hover:text-brand-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-semibold text-surface-100 text-sm">Help</h4>
            <ul className="space-y-2.5">
              {['Track Order', 'Returns & Exchanges', 'Size Guide', 'FAQs', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-surface-100 text-sm">Stay in the loop</h4>
            <p className="text-sm text-surface-400">Get early access to new drops and exclusive deals.</p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="input-dark text-sm"
              />
              <button type="submit" className="btn-brand text-sm py-2.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-700 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-surface-400">© 2025 Flamingo. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="text-xs text-surface-400 hover:text-surface-300 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}