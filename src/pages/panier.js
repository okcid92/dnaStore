import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import CartItem from '@/components/CartItem'
import { getCart, getCartTotal, clearCart } from '@/lib/cart'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Panier() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [phone, setPhone] = useState('')
  const [isOuaga, setIsOuaga] = useState(true)
  const [deliveryMode, setDeliveryMode] = useState('livraison')
  const [address, setAddress] = useState('')

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

  const handleOrder = () => {
    if (!phone || phone.length < 8) {
      alert('Veuillez entrer un numéro de téléphone valide')
      return
    }

    if (deliveryMode === 'livraison' && !address) {
      alert('Veuillez entrer votre adresse de livraison')
      return
    }

    let message = 'Bonjour, je veux commander :\n\n'
    cart.forEach(item => {
      message += `- ${item.name} (code: ${item.id})\n`
      if (item.size) message += `  Taille: ${item.size}\n`
      if (item.color) message += `  Couleur: ${item.color}\n`
      message += `  Quantité: ${item.quantity}\n`
      message += `  Prix: ${item.price * item.quantity} FCFA\n\n`
    })

    message += `Total : ${getCartTotal().toLocaleString()} FCFA\n\n`
    message += `Téléphone : ${phone}\n`
    message += `Localisation : ${isOuaga ? 'Ouagadougou' : 'Autre'}\n`
    message += `Mode : ${deliveryMode === 'livraison' ? 'Livraison' : 'Retrait'}\n`
    if (deliveryMode === 'livraison') {
      message += `Adresse : ${address}\n`
    }

    const url = `https://wa.me/22600000000?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    
    clearCart()
    setCart([])
    // alert('Commande envoyée ! Nous vous contacterons bientôt.') // Optional: rely on WhatsApp opening
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
      <div className="pt-32 pb-16 min-h-screen bg-brand-base">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-display font-light text-brand-light mb-12 uppercase tracking-widest">Mon <span className="font-bold text-brand-blue">Panier</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem key={`${item.id}-${item.size}-${index}`} item={item} onUpdate={handleUpdate} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="liquid-glass p-8 rounded-sm sticky top-32">
                <h2 className="text-xl font-bold text-brand-light mb-8 uppercase tracking-widest border-b border-brand-border pb-4">Résumé de la commande</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Téléphone <span className="text-brand-red">*</span></label>
                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted text-xs"></i>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+226 XX XX XX XX"
                        className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 pl-10 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 border border-brand-border rounded-sm flex items-center justify-center transition-colors ${isOuaga ? 'bg-brand-blue border-brand-blue' : 'bg-transparent'}`}>
                        {isOuaga && <i className="fa-solid fa-check text-white text-xs"></i>}
                      </div>
                      <input
                        type="checkbox"
                        checked={isOuaga}
                        onChange={(e) => setIsOuaga(e.target.checked)}
                        className="hidden"
                      />
                      <span className="text-sm text-brand-muted group-hover:text-brand-light transition-colors font-light">Je suis à Ouagadougou</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Mode de réception <span className="text-brand-red">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`cursor-pointer border rounded-sm p-3 text-center transition-all ${deliveryMode === 'livraison' ? 'border-brand-blue bg-brand-blue/10 text-brand-light' : 'border-brand-border text-brand-muted hover:border-brand-muted'}`}>
                        <input
                          type="radio"
                          value="livraison"
                          checked={deliveryMode === 'livraison'}
                          onChange={(e) => setDeliveryMode(e.target.value)}
                          className="hidden"
                        />
                        <i className="fa-solid fa-truck-fast mb-2 block text-lg"></i>
                        <span className="text-xs font-bold uppercase tracking-wider">Livraison</span>
                      </label>
                      <label className={`cursor-pointer border rounded-sm p-3 text-center transition-all ${deliveryMode === 'retrait' ? 'border-brand-blue bg-brand-blue/10 text-brand-light' : 'border-brand-border text-brand-muted hover:border-brand-muted'}`}>
                        <input
                          type="radio"
                          value="retrait"
                          checked={deliveryMode === 'retrait'}
                          onChange={(e) => setDeliveryMode(e.target.value)}
                          className="hidden"
                        />
                        <i className="fa-solid fa-store mb-2 block text-lg"></i>
                        <span className="text-xs font-bold uppercase tracking-wider">Retrait</span>
                      </label>
                    </div>
                  </div>

                  {deliveryMode === 'livraison' && (
                    <div className="animate-fade-in">
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Adresse de livraison <span className="text-brand-red">*</span></label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Quartier, point de repère..."
                        className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50 min-h-[80px]"
                        required
                      />
                    </div>
                  )}

                  <div className="border-t border-brand-border pt-6 mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-brand-muted uppercase tracking-widest">Total</span>
                      <span className="text-3xl font-light text-brand-light">{getCartTotal().toLocaleString()} <span className="text-sm font-bold text-brand-blue">FCFA</span></span>
                    </div>
                    <p className="text-[10px] text-brand-muted font-light text-right mb-6">Taxes et frais de livraison inclus (si applicable)</p>
                  </div>

                  <button onClick={handleOrder} className="w-full py-4 bg-brand-light text-brand-base font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3 rounded-sm">
                    <i className="fa-brands fa-whatsapp text-xl"></i> Commander
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
