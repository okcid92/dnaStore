import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'
import { getCart, getCartTotal, clearCart } from '@/lib/cart'

export default function Commander() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    city: 'Ouagadougou',
    address: '',
    delivery_mode: 'livraison',
    payment_method: 'cash'
  })

  const cart = getCart()
  const total = getCartTotal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Créer la commande dans Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.customer_name,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          delivery_mode: formData.delivery_mode,
          total_amount: total,
          status: 'pending',
          payment_method: formData.payment_method
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // 2. Créer les items de commande
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        size: item.size,
        price_at_purchase: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // 3. Générer le message WhatsApp
      const message = generateWhatsAppMessage(order, cart, formData)
      const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

      // 4. Vider le panier
      clearCart()

      // 5. Rediriger vers WhatsApp
      window.open(whatsappUrl, '_blank')

      // 6. Rediriger vers page de confirmation
      router.push(`/commande-confirmee?id=${order.id}`)

    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const generateWhatsAppMessage = (order, cart, formData) => {
    let message = `🛍️ *NOUVELLE COMMANDE DNAStore*\n\n`
    message += `📋 *Commande #${order.id.slice(0, 8)}*\n\n`
    message += `👤 *Client:* ${formData.customer_name}\n`
    message += `📞 *Téléphone:* ${formData.phone}\n`
    message += `📍 *Ville:* ${formData.city}\n`
    
    if (formData.delivery_mode === 'livraison') {
      message += `🏠 *Adresse:* ${formData.address}\n`
    }
    
    message += `🚚 *Mode:* ${formData.delivery_mode === 'livraison' ? 'Livraison' : 'Retrait'}\n`
    message += `💰 *Paiement:* ${formData.payment_method === 'cash' ? 'À la livraison' : 'Mobile Money'}\n\n`
    
    message += `📦 *Articles:*\n`
    cart.forEach(item => {
      message += `• ${item.name} ${item.size ? `(Taille ${item.size})` : ''} x${item.quantity} - ${item.price * item.quantity} FCFA\n`
    })
    
    message += `\n💵 *TOTAL: ${total.toLocaleString()} FCFA*\n\n`
    message += `✅ Je confirme ma commande !`
    
    return message
  }

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <i className="fa-solid fa-shopping-cart text-6xl text-brand-muted mb-6 opacity-50"></i>
          <h1 className="text-2xl font-display font-bold text-brand-light mb-4">Votre panier est vide</h1>
          <button onClick={() => router.push('/produits')} className="liquid-button px-8 py-3 rounded-sm text-xs uppercase tracking-widest">
            Voir les produits
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-light mb-12 text-center">
          Finaliser ma commande
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulaire */}
          <div className="liquid-glass rounded-sm p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-brand-light mb-6 uppercase tracking-widest">
              Informations de livraison
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light focus:border-brand-blue outline-none transition-all"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                  Téléphone WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light focus:border-brand-blue outline-none transition-all"
                  placeholder="+226 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                  Ville *
                </label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light focus:border-brand-blue outline-none transition-all"
                >
                  <option value="Ouagadougou">Ouagadougou</option>
                  <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                  <option value="Autre">Autre ville</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                  Mode de livraison *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, delivery_mode: 'livraison' })}
                    className={`py-3 px-4 rounded-sm border-2 transition-all ${
                      formData.delivery_mode === 'livraison'
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                        : 'border-brand-border text-brand-muted hover:border-brand-light'
                    }`}
                  >
                    <i className="fa-solid fa-truck mr-2"></i>
                    Livraison
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, delivery_mode: 'retrait' })}
                    className={`py-3 px-4 rounded-sm border-2 transition-all ${
                      formData.delivery_mode === 'retrait'
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                        : 'border-brand-border text-brand-muted hover:border-brand-light'
                    }`}
                  >
                    <i className="fa-solid fa-store mr-2"></i>
                    Retrait
                  </button>
                </div>
              </div>

              {formData.delivery_mode === 'livraison' && (
                <div>
                  <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                    Adresse de livraison *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light focus:border-brand-blue outline-none transition-all"
                    rows="3"
                    placeholder="Ex: Quartier Cissin, Rue 12.34, Maison bleue"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">
                  Mode de paiement
                </label>
                <select
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                  className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light focus:border-brand-blue outline-none transition-all"
                >
                  <option value="cash">Paiement à la livraison</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full liquid-button py-4 rounded-sm font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Traitement...
                  </>
                ) : (
                  <>
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                    Confirmer et envoyer sur WhatsApp
                  </>
                )}
              </button>

              <p className="text-xs text-brand-muted text-center">
                En cliquant, votre commande sera enregistrée et vous serez redirigé vers WhatsApp pour confirmation.
              </p>
            </form>
          </div>

          {/* Récapitulatif */}
          <div className="liquid-glass rounded-sm p-6 md:p-8 h-fit">
            <h2 className="text-xl font-display font-bold text-brand-light mb-6 uppercase tracking-widest">
              Récapitulatif
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-brand-border">
                  <img src={item.image_url || item.images?.[0]} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-brand-light">{item.name}</h3>
                    {item.size && <p className="text-xs text-brand-muted">Taille: {item.size}</p>}
                    <p className="text-xs text-brand-muted">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-light">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t-2 border-brand-blue">
              <div className="flex justify-between text-brand-muted text-sm">
                <span>Sous-total</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-brand-muted text-sm">
                <span>Livraison</span>
                <span>Calculée après confirmation</span>
              </div>
              <div className="flex justify-between text-brand-light text-xl font-bold">
                <span>TOTAL</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
