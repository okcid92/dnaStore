import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import Background from '@/components/Background'
import { useState } from 'react'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
    { href: '/admin/produits', label: 'Produits', icon: 'fa-box' },
    { href: '/admin/commandes', label: 'Commandes', icon: 'fa-shopping-cart' },
  ]

  return (
    <div className="min-h-screen relative">
      <Background />
      
      <nav className="liquid-glass-strong sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="flex items-center gap-2 md:gap-3 group">
            <i className="fa-solid fa-dna text-brand-blue text-2xl md:text-3xl transition-transform group-hover:scale-110"></i>
            <span className="text-lg md:text-xl font-display font-bold tracking-widest uppercase">DNA<span className="text-brand-blue font-light">Admin</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="liquid-button-outline px-3 py-2 md:px-4 md:py-2 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <i className="fa-solid fa-right-from-bracket md:mr-2"></i>
              <span className="hidden md:inline">Déconnexion</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden liquid-button-outline px-3 py-2 rounded-sm"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-40 bg-brand-base/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-4 rounded-sm transition-all font-bold text-xs uppercase tracking-widest ${
                  router.pathname === item.href || router.pathname.includes(item.href)
                    ? 'bg-brand-blue text-white shadow-lg'
                    : 'liquid-glass text-brand-light/70 hover:text-brand-light'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 liquid-glass rounded-sm p-4 h-fit sticky top-24">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-bold text-xs uppercase tracking-widest ${
                    router.pathname === item.href || router.pathname.includes(item.href)
                      ? 'bg-brand-blue text-white shadow-lg'
                      : 'hover:bg-brand-light/5 text-brand-light/70 hover:text-brand-light'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-5`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
