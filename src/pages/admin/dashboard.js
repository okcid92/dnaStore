import AdminLayout from '@/components/admin/AdminLayout'
import StatusBadge from '@/components/admin/StatusBadge'
import OrdersChart from '@/components/admin/OrdersChart'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pending: 0,
    revenue: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Récupérer les produits
      const { count: productsCount } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })

      // Récupérer toutes les commandes
      const { data: allOrders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      // Récupérer les 5 dernières commandes pour l'affichage
      const recentOrdersData = allOrders?.slice(0, 5) || []

      // Calculer les statistiques
      const totalOrders = allOrders?.length || 0
      const pendingOrders = allOrders?.filter(o => o.status === 'en attente').length || 0
      const totalRevenue = allOrders?.filter(o => ['confirmée', 'expédiée', 'livrée'].includes(o.status)).reduce((sum, order) => {
        const amount = parseFloat(order.total_amount) || 0
        return sum + amount
      }, 0) || 0

      setStats({
        products: productsCount || 0,
        orders: totalOrders,
        pending: pendingOrders,
        revenue: Math.round(totalRevenue)
      })

      setRecentOrders(recentOrdersData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    const order = recentOrders.find(o => o.id === id)
    const oldStatus = order.status

    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (order.items && oldStatus === 'en attente' && newStatus === 'annulée') {
      for (const item of order.items) {
        await supabase
          .from('products')
          .update({ stock: supabase.raw(`stock + ${item.quantity}`) })
          .eq('id', item.id)
      }
    }

    fetchData()
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-blue border-t-transparent"></div>
        </div>
      </AdminLayout>
    )
  }
  const statsData = [
    { title: 'Produits', value: stats.products, icon: 'fa-box', color: 'text-brand-blue' },
    { title: 'Commandes', value: stats.orders, icon: 'fa-shopping-bag', color: 'text-green-400' },
    { title: 'En attente', value: stats.pending, icon: 'fa-clock', color: 'text-yellow-400' },
    { title: 'Revenus', value: `${stats.revenue.toLocaleString('fr-FR')} FCFA`, icon: 'fa-wallet', color: 'text-purple-400' },
  ]

  return (
    <AdminLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="liquid-glass rounded-sm p-4 md:p-6 relative overflow-hidden group hover:scale-105 transition-transform">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-2">
              <div className="flex-1">
                <p className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest mb-1 md:mb-2">{stat.title}</p>
                <h3 className="text-xl md:text-3xl font-display font-bold text-brand-light">{stat.value}</h3>
              </div>
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-sm liquid-glass flex items-center justify-center ${stat.color}`}>
                <i className={`fa-solid ${stat.icon} text-sm md:text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="liquid-glass rounded-sm overflow-hidden mt-6 md:mt-8">
        <div className="p-4 md:p-6 border-b border-brand-border flex justify-between items-center">
          <h2 className="text-base md:text-xl font-display font-bold tracking-widest text-brand-light">Commandes Récentes</h2>
          <button onClick={() => router.push('/admin/commandes')} className="text-[10px] md:text-xs text-brand-blue hover:text-brand-blue/80 font-bold uppercase tracking-widest">Voir tout →</button>
        </div>
        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="p-12 text-center text-brand-muted">
              <i className="fa-solid fa-inbox text-4xl mb-4 opacity-50"></i>
              <p className="text-xs uppercase tracking-widest">Aucune commande récente</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-brand-light/5 text-[10px] md:text-xs uppercase font-bold text-brand-muted">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 tracking-widest">Client</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 tracking-widest hidden md:table-cell">Montant</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 tracking-widest">Statut</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 tracking-widest hidden sm:table-cell">Date</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-light/5 transition-colors">
                    <td className="px-3 md:px-6 py-3 md:py-4 font-bold text-brand-light">{order.customer_name}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-brand-light hidden md:table-cell">{parseFloat(order.total_amount || 0).toLocaleString('fr-FR')} FCFA</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-brand-muted hidden sm:table-cell">{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="px-2 md:px-3 py-1 md:py-2 liquid-glass border border-brand-border rounded-sm text-brand-light text-[10px] md:text-xs font-bold uppercase tracking-widest outline-none"
                      >
                        <option value="en attente">En attente</option>
                        <option value="confirmée">Confirmée</option>
                        <option value="expédiée">Expédiée</option>
                        <option value="livrée">Livrée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Graphique des ventes */}
      <div className="mt-6 md:mt-8">
        <OrdersChart />
      </div>
    </AdminLayout>
  )
}
