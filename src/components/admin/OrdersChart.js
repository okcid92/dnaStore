import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function OrdersChart() {
  const [chartData, setChartData] = useState([])
  const [period, setPeriod] = useState('week') // week, month, year

  useEffect(() => {
    fetchChartData()
  }, [period])

  const fetchChartData = async () => {
    try {
      const now = new Date()
      let startDate = new Date()

      // Calculer la date de début selon la période
      if (period === 'week') {
        startDate.setDate(now.getDate() - 7)
      } else if (period === 'month') {
        startDate.setMonth(now.getMonth() - 1)
      } else if (period === 'year') {
        startDate.setFullYear(now.getFullYear() - 1)
      }

      const { data } = await supabase
        .from('orders')
        .select('created_at, total_amount, status')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true })

      // Grouper par jour
      const grouped = {}
      data?.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString('fr-FR')
        if (!grouped[date]) {
          grouped[date] = { count: 0, revenue: 0, confirmed: 0, pending: 0, cancelled: 0 }
        }
        grouped[date].count++
        
        // Revenus uniquement pour les commandes confirmées, expédiées ou livrées
        if (['confirmée', 'expédiée', 'livrée'].includes(order.status)) {
          grouped[date].revenue += parseFloat(order.total_amount) || 0
          grouped[date].confirmed++
        } else if (order.status === 'en attente') {
          grouped[date].pending++
        } else if (order.status === 'annulée') {
          grouped[date].cancelled++
        }
      })

      const chartArray = Object.entries(grouped).map(([date, stats]) => ({
        date,
        ...stats
      }))

      setChartData(chartArray)
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1)
  const maxCount = Math.max(...chartData.map(d => d.count), 1)
  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = chartData.reduce((sum, d) => sum + d.count, 0)
  const totalConfirmed = chartData.reduce((sum, d) => sum + d.confirmed, 0)
  const totalPending = chartData.reduce((sum, d) => sum + d.pending, 0)
  const avgOrderValue = totalConfirmed > 0 ? totalRevenue / totalConfirmed : 0

  return (
    <div className="liquid-glass rounded-sm p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-display font-bold tracking-widest text-brand-light">
          Évolution des Ventes
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
              period === 'week'
                ? 'bg-brand-blue text-white'
                : 'bg-brand-light/5 text-brand-muted hover:text-brand-light'
            }`}
          >
            7j
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
              period === 'month'
                ? 'bg-brand-blue text-white'
                : 'bg-brand-light/5 text-brand-muted hover:text-brand-light'
            }`}
          >
            30j
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
              period === 'year'
                ? 'bg-brand-blue text-white'
                : 'bg-brand-light/5 text-brand-muted hover:text-brand-light'
            }`}
          >
            1an
          </button>
        </div>
      </div>

      {/* Statistiques résumées */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-brand-light/5 rounded-sm p-4">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Total Revenus</p>
            <p className="text-lg font-bold text-green-400">{totalRevenue.toLocaleString('fr-FR')} FCFA</p>
          </div>
          <div className="bg-brand-light/5 rounded-sm p-4">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Commandes</p>
            <p className="text-lg font-bold text-brand-light">{totalOrders}</p>
          </div>
          <div className="bg-brand-light/5 rounded-sm p-4">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Taux Succès</p>
            <p className="text-lg font-bold text-blue-400">{totalOrders > 0 ? Math.round((totalConfirmed / totalOrders) * 100) : 0}%</p>
          </div>
          <div className="bg-brand-light/5 rounded-sm p-4">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Panier Moyen</p>
            <p className="text-lg font-bold text-purple-400">{Math.round(avgOrderValue).toLocaleString('fr-FR')} FCFA</p>
          </div>
        </div>
      )}

      {chartData.length === 0 ? (
        <div className="text-center py-12 text-brand-muted">
          <i className="fa-solid fa-chart-line text-4xl mb-4 opacity-50"></i>
          <p className="text-xs uppercase tracking-widest">Aucune donnée pour cette période</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Graphique des revenus */}
          <div>
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
              Revenus (FCFA)
            </h3>
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-brand-muted w-20 flex-shrink-0">
                    {item.date.split('/').slice(0, 2).join('/')}
                  </span>
                  <div className="flex-1 h-8 bg-brand-light/5 rounded-sm overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-brand-blue to-blue-400 transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                    >
                      {item.revenue > maxRevenue * 0.3 && (
                        <span className="text-xs font-bold text-white">
                          {item.revenue.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.revenue <= maxRevenue * 0.3 && (
                    <span className="text-xs font-bold text-brand-light w-24 text-right">
                      {item.revenue.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Graphique du nombre de commandes avec détails */}
          <div>
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
              Nombre de Commandes par Statut
            </h3>
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-brand-muted w-20 flex-shrink-0">
                      {item.date.split('/').slice(0, 2).join('/')}
                    </span>
                    <div className="flex-1 h-8 bg-brand-light/5 rounded-sm overflow-hidden relative flex">
                      {item.confirmed > 0 && (
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 flex items-center justify-center"
                          style={{ width: `${(item.confirmed / maxCount) * 100}%` }}
                          title={`${item.confirmed} confirmée(s)`}
                        >
                          {item.confirmed > maxCount * 0.15 && (
                            <span className="text-xs font-bold text-white">{item.confirmed}</span>
                          )}
                        </div>
                      )}
                      {item.pending > 0 && (
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 flex items-center justify-center"
                          style={{ width: `${(item.pending / maxCount) * 100}%` }}
                          title={`${item.pending} en attente`}
                        >
                          {item.pending > maxCount * 0.15 && (
                            <span className="text-xs font-bold text-white">{item.pending}</span>
                          )}
                        </div>
                      )}
                      {item.cancelled > 0 && (
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500 flex items-center justify-center"
                          style={{ width: `${(item.cancelled / maxCount) * 100}%` }}
                          title={`${item.cancelled} annulée(s)`}
                        >
                          {item.cancelled > maxCount * 0.15 && (
                            <span className="text-xs font-bold text-white">{item.cancelled}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-brand-light w-16 text-right">
                      {item.count} total
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-brand-muted">Confirmées</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-brand-muted">En attente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-brand-muted">Annulées</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
