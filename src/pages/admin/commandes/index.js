import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'

export default function AdminCommandes() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  const handleStatusUpdate = async (id, newStatus) => {
    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)
    fetchOrders()
  }

  const filteredOrders = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter
    const matchSearch = o.product_code.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <AdminLayout>
      <div className="card-glass">
        <h1 className="text-3xl font-bold mb-6">Gestion des Commandes</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 input-glass"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-glass"
          >
            <option value="all">Toutes</option>
            <option value="en attente">En attente</option>
            <option value="traitée">Traitées</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-blue border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Code produit</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-3">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 font-bold">{order.product_code}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{order.message}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'en attente' ? 'glass bg-yellow-500/20 text-yellow-700' : 'glass bg-green-500/20 text-green-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order.status === 'en attente' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'traitée')}
                          className="text-green-600 hover:underline"
                        >
                          Marquer comme traitée
                        </button>
                      )}
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
