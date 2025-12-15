import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

export default function CommandeConfirmee() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchOrder()
    }
  }, [id])

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setOrder(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
        </div>
      </Layout>
    )
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <i className="fa-solid fa-exclamation-triangle text-6xl text-yellow-400 mb-6"></i>
          <h1 className="text-2xl font-display font-bold text-brand-light mb-4">Commande introuvable</h1>
          <button onClick={() => router.push('/')} className="liquid-button px-8 py-3 rounded-sm text-xs uppercase tracking-widest">
            Retour à l'accueil
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
            <i className="fa-solid fa-check text-4xl text-green-400"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-light mb-4">
            Commande confirmée !
          </h1>
          <p className="text-brand-muted text-sm">
            Votre commande a été enregistrée avec succès. Nous vous contacterons sur WhatsApp pour confirmer les détails.
          </p>
        </div>

        <div className="liquid-glass rounded-sm p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-brand-border">
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Numéro de commande</p>
              <p className="text-xl font-bold text-brand-light font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Statut</p>
              <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-sm">
                En attente
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-brand-muted text-sm">Client</span>
              <span className="text-brand-light font-bold text-sm">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted text-sm">Téléphone</span>
              <span className="text-brand-light font-bold text-sm">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted text-sm">Ville</span>
              <span className="text-brand-light font-bold text-sm">{order.city}</span>
            </div>
            {order.address && (
              <div className="flex justify-between">
                <span className="text-brand-muted text-sm">Adresse</span>
                <span className="text-brand-light font-bold text-sm text-right">{order.address}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-brand-muted text-sm">Mode de livraison</span>
              <span className="text-brand-light font-bold text-sm">
                {order.delivery_mode === 'livraison' ? 'Livraison' : 'Retrait en magasin'}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border">
            <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-4">Articles commandés</h3>
            <div className="space-y-3">
              {order.order_items?.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <img 
                    src={item.products?.image_url || item.products?.images?.[0]} 
                    alt={item.products?.name} 
                    className="w-12 h-12 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-brand-light">{item.products?.name}</p>
                    {item.size && <p className="text-xs text-brand-muted">Taille: {item.size}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-muted">x{item.quantity}</p>
                    <p className="text-sm font-bold text-brand-light">{(item.price_at_purchase * item.quantity).toLocaleString()} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t-2 border-brand-blue mt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-brand-light uppercase tracking-widest">Total</span>
              <span className="text-2xl font-bold text-brand-blue">{order.total_amount.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        <div className="liquid-glass rounded-sm p-6 mb-6 border-l-4 border-brand-blue">
          <div className="flex gap-4">
            <i className="fa-solid fa-info-circle text-brand-blue text-xl"></i>
            <div>
              <h3 className="text-sm font-bold text-brand-light mb-2">Prochaines étapes</h3>
              <ul className="text-xs text-brand-muted space-y-2">
                <li>✓ Votre commande a été enregistrée</li>
                <li>✓ Un message WhatsApp a été ouvert automatiquement</li>
                <li>• Envoyez le message pour confirmer votre commande</li>
                <li>• Nous vous contacterons pour finaliser les détails</li>
                <li>• Livraison sous 24h-72h selon votre localisation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 liquid-button-outline py-3 rounded-sm font-bold text-xs uppercase tracking-widest"
          >
            Retour à l'accueil
          </button>
          <button
            onClick={() => router.push('/produits')}
            className="flex-1 liquid-button py-3 rounded-sm font-bold text-xs uppercase tracking-widest"
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    </Layout>
  )
}
