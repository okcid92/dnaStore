import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'

export default function AdminCommandes() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
      return
    }
    fetchOrders()
  }

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  const handleStatusUpdate = async (id, newStatus) => {
    const order = orders.find(o => o.id === id)
    const oldStatus = order.status

    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (order.items) {
      for (const item of order.items) {
        if (oldStatus === 'en attente' && newStatus === 'annulée') {
          await supabase
            .from('products')
            .update({ stock: supabase.raw(`stock + ${item.quantity}`) })
            .eq('id', item.id)
        }
      }
    }

    fetchOrders()
  }

  const filteredOrders = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter
    const matchSearch = o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
                        o.customer_phone?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <AdminLayout>
      <div className="liquid-glass rounded-sm p-8">
        <h1 className="text-3xl font-display font-bold tracking-widest text-brand-light mb-8">Gestion des Commandes</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
            <input
              type="text"
              placeholder="Rechercher par nom ou téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl placeholder-brand-muted/70"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl font-bold text-xs uppercase tracking-widest"
          >
            <option value="all">Toutes</option>
            <option value="en attente">En attente</option>
            <option value="confirmée">Confirmées</option>
            <option value="expédiée">Expédiées</option>
            <option value="livrée">Livrées</option>
            <option value="annulée">Annulées</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-brand-muted">
            <i className="fa-solid fa-shopping-cart text-5xl mb-4 opacity-50"></i>
            <p className="text-xs uppercase tracking-widest">Aucune commande trouvée</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-light/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Téléphone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-brand-muted uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-brand-light/5 transition-colors">
                    <td className="px-6 py-4 text-brand-muted">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-light">{order.customer_name}</td>
                    <td className="px-6 py-4 text-brand-light">{order.customer_phone}</td>
                    <td className="px-6 py-4 text-brand-light">{order.total_amount} FCFA</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${
                        order.status === 'en attente' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'confirmée' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'expédiée' ? 'bg-purple-500/20 text-purple-400' :
                        order.status === 'livrée' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="px-3 py-2 liquid-glass border border-brand-border rounded-sm text-brand-light text-xs font-bold uppercase tracking-widest outline-none"
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
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
