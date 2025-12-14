import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCartCount } from '@/lib/cart'

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    // Cart Logic
    setCartCount(getCartCount())
    const handleStorage = () => setCartCount(getCartCount())
    window.addEventListener('storage', handleStorage)
    window.addEventListener('cartUpdated', handleStorage)
    
    // Scroll Logic
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cartUpdated', handleStorage)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
    document.body.classList.toggle('light-mode')
  }

  return (
    <nav 
      className={`fixed w-full z-50 liquid-glass-strong transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`} 
      id="navbar"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-display font-bold tracking-widest text-brand-light flex items-center gap-2 uppercase">
          <i className="fa-solid fa-dna text-brand-blue text-2xl"></i>
          DNA<span className="text-brand-blue font-light">Store</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-medium uppercase tracking-widest text-brand-muted hover:text-brand-light transition-colors">
          <Link href="/#collection" className="hover:text-brand-light transition-colors">Collection</Link>
          <Link href="/#why-us" className="hover:text-brand-light transition-colors">Philosophie</Link>
          <Link href="/#reviews" className="hover:text-brand-light transition-colors">Avis</Link>
          <Link href="/#faq" className="hover:text-brand-light transition-colors">FAQ</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="text-brand-muted hover:text-brand-blue transition-colors focus:outline-none transform hover:rotate-12 transition-transform duration-300"
          >
            <i className={`fa-solid ${isLightMode ? 'fa-moon' : 'fa-sun'} text-lg`}></i>
          </button>

          <div className="relative cursor-pointer group">
            <Link href="/panier">
              <i className="fa-solid fa-bag-shopping text-lg text-brand-muted group-hover:text-brand-light transition-colors"></i>
              <span 
                className={`absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center transform transition-transform duration-300 ${
                  cartCount > 0 ? 'scale-100' : 'scale-0'
                }`}
              >
                {cartCount}
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)} 
            className="md:hidden focus:outline-none text-brand-light"
          >
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-base/95 backdrop-blur-xl z-[60] transform transition-transform duration-500 md:hidden flex flex-col justify-center items-center space-y-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={() => setMenuOpen(false)} 
          className="absolute top-8 right-8 text-2xl text-brand-muted hover:text-brand-light"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <Link href="/#collection" onClick={() => setMenuOpen(false)} className="mobile-link text-2xl font-light text-brand-light tracking-widest">Collection</Link>
        <Link href="/#why-us" onClick={() => setMenuOpen(false)} className="mobile-link text-2xl font-light text-brand-light tracking-widest">Philosophie</Link>
        <Link href="/#reviews" onClick={() => setMenuOpen(false)} className="mobile-link text-2xl font-light text-brand-light tracking-widest">Avis</Link>
        <Link href="/#faq" onClick={() => setMenuOpen(false)} className="mobile-link text-2xl font-light text-brand-light tracking-widest">FAQ</Link>
        
        <button 
          onClick={toggleTheme} 
          className="text-brand-light flex items-center gap-2 border border-brand-border px-6 py-2 rounded-full"
        >
          <i className={`fa-solid ${isLightMode ? 'fa-moon' : 'fa-sun'}`}></i> <span>Changer Mode</span>
        </button>
        
        <a 
          href="https://wa.me/22600000000" 
          className="px-8 py-3 bg-brand-blue text-white rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest text-sm shadow-lg shadow-brand-blue/20"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  )
}
