import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import CartItem from '@/components/CartItem'
import { getCart, getCartTotal, clearCart } from '@/lib/cart'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Panier() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [gettingLocation, setGettingLocation] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    city: 'Ouagadougou',
    address: '',
    latitude: null,
    longitude: null,
    delivery_mode: 'livraison'
  })

  const deliveryFee = formData.city === 'Ouagadougou' ? 500 : 0
  const subtotal = getCartTotal()
  const total = subtotal + deliveryFee

  useEffect(() => {
    setCart(getCart())
    
    // Listen for cart updates
    const handleStorage = () => setCart(getCart())
    window.addEventListener('storage', handleStorage)
    window.addEventListener('cartUpdated', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cartUpdated', handleStorage)
    }
  }, [])

  const handleUpdate = () => {
    setCart(getCart())
  }

  const getLocation = () => {
    setGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
          setFormData({ ...formData, address: locationUrl, latitude, longitude })
          setGettingLocation(false)
        },
        (error) => {
          alert('Impossible de récupérer votre position. Veuillez vérifier vos paramètres de localisation.')
          setGettingLocation(false)
        }
      )
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.')
      setGettingLocation(false)
    }
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Vérifier le stock disponible pour chaque produit
      for (const item of cart) {
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single()

        if (!product || product.stock < item.quantity) {
          alert(`Stock insuffisant pour ${item.name}. Disponible: ${product?.stock || 0}`)
          setLoading(false)
          return
        }
      }

      // 2. Réserver le stock (diminuer temporairement)
      for (const item of cart) {
        const { error: stockError } = await supabase.rpc('decrease_stock', {
          product_id: item.id,
          quantity: item.quantity
        })

        if (stockError) {
          // Si la fonction n'existe pas, utiliser une mise à jour directe
          await supabase
            .from('products')
            .update({ stock: supabase.raw(`stock - ${item.quantity}`) })
            .eq('id', item.id)
        }
      }

      // 3. Créer la commande dans Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.customer_name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            size: item.size,
            price: item.price
          })),
          total_amount: total
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // 4. Générer le message WhatsApp
      let message = `*COMMANDE #${order.id.slice(0, 8)}*\n\n`
      
      message += `*Client:* ${formData.customer_name}\n`
      message += `*Tel:* ${formData.phone}\n`
      message += `*Ville:* ${formData.city}\n`
      
      if (formData.delivery_mode === 'livraison') {
        message += `*Adresse:* ${formData.address}\n`
      }
      
      message += `\n*Articles:*\n`
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}`
        if (item.size) message += ` (${item.size})`
        message += ` x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} FCFA\n`
      })
      
      message += `\n*TOTAL: ${total.toLocaleString()} FCFA*`
      if (formData.delivery_mode === 'livraison' && deliveryFee > 0) {
        message += ` (dont ${deliveryFee} FCFA livraison)`
      }

      // 4. Vider le panier
      clearCart()

      // 5. Rediriger vers WhatsApp
      const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
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

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <i className="fa-solid fa-bag-shopping text-4xl text-brand-blue"></i>
          </div>
          <h1 className="text-3xl font-display font-light text-brand-light mb-4">Votre panier est vide</h1>
          <p className="text-brand-muted mb-8 font-light">Il semblerait que vous n'ayez pas encore trouvé votre bonheur.</p>
          <Link href="/#collection" className="liquid-button px-8 py-3 text-white rounded-sm text-xs font-bold uppercase tracking-widest">
            Découvrir la collection
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-display font-light text-brand-light mb-12 uppercase tracking-widest">Mon <span className="font-bold text-brand-blue">Panier</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem key={`${item.id}-${item.size}-${index}`} item={item} onUpdate={handleUpdate} />
              ))}
            </div>

            {/* Order Form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleOrder} className="liquid-glass p-8 rounded-sm sticky top-32">
                <h2 className="text-xl font-bold text-brand-light mb-8 uppercase tracking-widest border-b border-brand-border pb-4">Finaliser la commande</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3">Nom complet <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="Ex: Aicha Sow"
                      className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3.5 px-4 text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3">Téléphone WhatsApp <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-lg"></i>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+226 XX XX XX XX"
                        className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all placeholder-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3">Ville <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <i className="fa-solid fa-location-dot absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-blue text-sm"></i>
                      <select
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Ouagadougou" className="bg-brand-base text-white">Ouagadougou (Livraison 500 FCFA)</option>
                        <option value="Bobo-Dioulasso" className="bg-brand-base text-white">Bobo-Dioulasso (À vos frais)</option>
                        <option value="Autre" className="bg-brand-base text-white">Autre ville (À vos frais)</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 text-xs pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3">Mode de réception <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_mode: 'livraison' })}
                        className={`border-2 rounded-lg p-4 text-center transition-all ${formData.delivery_mode === 'livraison' ? 'border-brand-blue bg-brand-blue/20 text-white shadow-lg shadow-brand-blue/20' : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'}`}
                      >
                        <i className="fa-solid fa-truck-fast mb-2 block text-2xl"></i>
                        <span className="text-xs font-bold uppercase tracking-wider block">Livraison</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_mode: 'retrait' })}
                        className={`border-2 rounded-lg p-4 text-center transition-all ${formData.delivery_mode === 'retrait' ? 'border-brand-blue bg-brand-blue/20 text-white shadow-lg shadow-brand-blue/20' : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'}`}
                      >
                        <i className="fa-solid fa-store mb-2 block text-2xl"></i>
                        <span className="text-xs font-bold uppercase tracking-wider block">Retrait</span>
                      </button>
                    </div>
                  </div>

                  {formData.delivery_mode === 'livraison' && (
                    <div className="animate-fade-in">
                      <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3">Adresse de livraison <span className="text-red-400">*</span></label>
                      
                      {!formData.address ? (
                        <button
                          type="button"
                          onClick={getLocation}
                          disabled={gettingLocation}
                          className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-brand-blue hover:bg-white/15 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {gettingLocation ? (
                            <>
                              <i className="fa-solid fa-spinner fa-spin text-lg"></i>
                              <span className="text-sm uppercase tracking-widest">Récupération...</span>
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-location-crosshairs text-lg"></i>
                              <span className="text-sm uppercase tracking-widest">Partager ma position</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <i className="fa-solid fa-map-marker-alt text-green-400 text-xl mt-1"></i>
                              <div className="flex-1">
                                <p className="text-sm text-white font-bold mb-2">Position enregistrée</p>
                                <p className="text-xs text-white/60 mb-3">Lat: {formData.latitude?.toFixed(6)}, Long: {formData.longitude?.toFixed(6)}</p>
                                <a 
                                  href={formData.address} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs text-brand-blue hover:text-brand-blue/80 font-bold uppercase tracking-widest"
                                >
                                  <i className="fa-solid fa-external-link-alt"></i>
                                  Voir sur Google Maps
                                </a>
                              </div>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, address: '', latitude: null, longitude: null })}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <i className="fa-solid fa-times text-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t-2 border-white/10 pt-5 mt-5 space-y-3">
                    <div className="flex justify-between items-center text-white/80">
                      <span className="text-xs uppercase tracking-widest">Sous-total</span>
                      <span className="text-lg font-bold">{subtotal.toLocaleString()} FCFA</span>
                    </div>
                    {formData.delivery_mode === 'livraison' && (
                      <div className="flex justify-between items-center text-white/80">
                        <span className="text-xs uppercase tracking-widest">Livraison</span>
                        <span className="text-lg font-bold">{deliveryFee > 0 ? `${deliveryFee} FCFA` : 'À vos frais'}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-sm text-white uppercase tracking-widest font-bold">Total</span>
                      <span className="text-3xl font-bold text-white">{total.toLocaleString()} <span className="text-sm text-brand-blue">FCFA</span></span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || (formData.delivery_mode === 'livraison' && !formData.address)}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                        <span>Traitement...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                        <span>Confirmer sur WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-white/60 text-center">Vous serez redirigé vers WhatsApp pour finaliser</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
