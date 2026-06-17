import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-surface-950 text-surface-100">
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/"                  element={<Home />} />
              <Route path="/category/:gender"  element={<Category />} />
              <Route path="/product/:id"       element={<ProductDetail />} />
              {/* fallback */}
              <Route path="*" element={
                <div className="pt-40 text-center section">
                  <h1 className="section-title mb-4">404 — Page Not Found</h1>
                  <a href="/" className="btn-brand inline-block">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </CartProvider>
    </BrowserRouter>
  )
}