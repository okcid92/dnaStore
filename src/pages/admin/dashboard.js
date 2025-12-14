import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({ products: 0, pending: 0, completed: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchStats()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    }
  }

  const fetchStats = async () => {
    const [products, orders] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('orders').select('status')
    ])

    setStats({
      products: products.count || 0,
      pending: orders.data?.filter(o => o.status === 'en attente').length || 0,
      completed: orders.data?.filter(o => o.status === 'traitée').length || 0
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-blue border-t-transparent"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="card-glass">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass bg-blue-500/10 p-6 rounded-3xl">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold text-blue-600">{stats.products}</div>
            <div className="text-gray-600">Produits</div>
          </div>

          <div className="glass bg-yellow-500/10 p-6 rounded-3xl">
            <div className="text-4xl mb-2">⏳</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-gray-600">Commandes en attente</div>
          </div>

          <div className="glass bg-green-500/10 p-6 rounded-3xl">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-gray-600">Commandes traitées</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/admin/produits')}
            className="btn-primary"
          >
            Gérer les produits
          </button>
          <button
            onClick={() => router.push('/admin/commandes')}
            className="btn-secondary"
          >
            Voir les commandes
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
