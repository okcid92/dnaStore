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
      // Créer la commande via l'API
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Erreur lors de la commande')
        setLoading(false)
        return
      }

      const order = data.order

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

      // 5. Vider le panier
      clearCart()

      // 6. Rediriger vers WhatsApp
      const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      // 7. Rediriger vers page d'accueil
      router.push('/')

    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
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
      <div className="pt-20 md:pt-32 pb-8 md:pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-2xl md:text-4xl font-display font-light text-brand-light mb-6 md:mb-12 uppercase tracking-widest">Mon <span className="font-bold text-brand-blue">Panier</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {cart.map((item, index) => (
                <CartItem key={`${item.id}-${item.size}-${index}`} item={item} onUpdate={handleUpdate} />
              ))}
            </div>

            {/* Order Form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleOrder} className="liquid-glass p-4 md:p-8 rounded-sm lg:sticky lg:top-32">
                <h2 className="text-base md:text-xl font-bold text-brand-light mb-4 md:mb-8 uppercase tracking-widest border-b border-brand-border pb-3 md:pb-4">Finaliser la commande</h2>

                <div className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Nom complet <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="Ex: Aicha Sow"
                      className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3 md:py-3.5 px-3 md:px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all placeholder-brand-muted/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Téléphone WhatsApp <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-lg"></i>
                      <input
                        type="tel"
                        name="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+226 XX XX XX XX"
                        className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3 md:py-3.5 pl-10 md:pl-12 pr-3 md:pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all placeholder-brand-muted/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Ville <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <i className="fa-solid fa-location-dot absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-blue text-sm"></i>
                      <select
                        name="city"
                        autoComplete="address-level2"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg py-3 md:py-3.5 pl-10 md:pl-12 pr-3 md:pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/15 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Ouagadougou" className="bg-brand-base text-brand-light">Ouagadougou (Livraison 500 FCFA)</option>
                        <option value="Bobo-Dioulasso" className="bg-brand-base text-brand-light">Bobo-Dioulasso (À vos frais)</option>
                        <option value="Autre" className="bg-brand-base text-brand-light">Autre ville (À vos frais)</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-muted text-xs pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Mode de réception <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_mode: 'livraison' })}
                        className={`border-2 rounded-lg p-3 md:p-4 text-center transition-all ${formData.delivery_mode === 'livraison' ? 'border-brand-blue bg-brand-blue/20 text-brand-light shadow-lg shadow-brand-blue/20' : 'border-brand-border text-brand-muted hover:border-brand-blue/40 hover:text-brand-light'}`}
                      >
                        <i className="fa-solid fa-truck-fast mb-1 md:mb-2 block text-xl md:text-2xl"></i>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider block">Livraison</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_mode: 'retrait' })}
                        className={`border-2 rounded-lg p-3 md:p-4 text-center transition-all ${formData.delivery_mode === 'retrait' ? 'border-brand-blue bg-brand-blue/20 text-brand-light shadow-lg shadow-brand-blue/20' : 'border-brand-border text-brand-muted hover:border-brand-blue/40 hover:text-brand-light'}`}
                      >
                        <i className="fa-solid fa-store mb-1 md:mb-2 block text-xl md:text-2xl"></i>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider block">Retrait</span>
                      </button>
                    </div>
                  </div>

                  {formData.delivery_mode === 'livraison' && (
                    <div className="animate-fade-in">
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Adresse de livraison <span className="text-red-400">*</span></label>
                      
                      {!formData.address ? (
                        <button
                          type="button"
                          onClick={getLocation}
                          disabled={gettingLocation}
                          className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-brand-blue hover:bg-white/15 text-brand-light font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50"
                        >
                          {gettingLocation ? (
                            <>
                              <i className="fa-solid fa-spinner fa-spin text-base md:text-lg"></i>
                              <span className="text-xs md:text-sm uppercase tracking-widest">Récupération...</span>
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-location-crosshairs text-base md:text-lg"></i>
                              <span className="text-xs md:text-sm uppercase tracking-widest">Partager ma position</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <i className="fa-solid fa-map-marker-alt text-green-400 text-xl mt-1"></i>
                              <div className="flex-1">
                                <p className="text-sm text-brand-light font-bold mb-2">Position enregistrée</p>
                                <p className="text-xs text-brand-muted mb-3">Lat: {formData.latitude?.toFixed(6)}, Long: {formData.longitude?.toFixed(6)}</p>
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

                  <div className="border-t-2 border-brand-border pt-4 md:pt-5 mt-4 md:mt-5 space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center text-brand-light">
                      <span className="text-[10px] md:text-xs uppercase tracking-widest">Sous-total</span>
                      <span className="text-base md:text-lg font-bold">{subtotal.toLocaleString()} FCFA</span>
                    </div>
                    {formData.delivery_mode === 'livraison' && (
                      <div className="flex justify-between items-center text-brand-light">
                        <span className="text-[10px] md:text-xs uppercase tracking-widest">Livraison</span>
                        <span className="text-base md:text-lg font-bold">{deliveryFee > 0 ? `${deliveryFee} FCFA` : 'À vos frais'}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-brand-border">
                      <span className="text-xs md:text-sm text-brand-light uppercase tracking-widest font-bold">Total</span>
                      <span className="text-2xl md:text-3xl font-bold text-brand-light">{total.toLocaleString()} <span className="text-xs md:text-sm text-brand-blue">FCFA</span></span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || (formData.delivery_mode === 'livraison' && !formData.address)}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 md:gap-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin text-lg md:text-xl"></i>
                        <span>Traitement...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-brands fa-whatsapp text-xl md:text-2xl"></i>
                        <span>Confirmer sur WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[9px] md:text-[10px] text-brand-muted text-center">Vous serez redirigé vers WhatsApp pour finaliser</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
