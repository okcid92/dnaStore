import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <nav className="glass-dark text-white p-4 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DNA Store Admin</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <aside className="w-64 card-glass h-fit sticky top-8">
            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className={`block px-4 py-2 rounded-2xl transition-all ${router.pathname === '/admin/dashboard' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'hover:bg-white/50'}`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/produits"
                className={`block px-4 py-2 rounded-2xl transition-all ${router.pathname.includes('/admin/produits') ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'hover:bg-white/50'}`}
              >
                Produits
              </Link>
              <Link
                href="/admin/commandes"
                className={`block px-4 py-2 rounded-2xl transition-all ${router.pathname === '/admin/commandes' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'hover:bg-white/50'}`}
              >
                Commandes
              </Link>
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
