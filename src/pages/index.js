import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { addToCart } from '@/lib/cart'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [showToast, setShowToast] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 1000,
      easing: 'ease-out-cubic'
    })
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)
      
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Erreur chargement produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const faqItems = [
    {
      question: "Les chaussures sont-elles neuves ?",
      answer: "Oui, toutes nos chaussures sont neuves, dans leur boîte d'origine et jamais portées."
    },
    {
      question: "Puis-je payer à la livraison ?",
      answer: "Absolument. Pour assurer votre confiance, le paiement à la livraison est disponible sur Ouagadougou et certaines zones."
    },
    {
      question: "Délais de livraison ?",
      answer: "Nos délais sont généralement compris entre 24h et 72h selon votre localisation."
    }
  ]

  return (
    <Layout>
      {/* Ambient Background */}


      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10" data-aos="fade-up" data-aos-duration="1500">
          <span className="inline-block py-2 px-4 mb-6 border border-brand-border rounded-full liquid-glass text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
            Collection 2025
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-light text-brand-light leading-tight mb-8 text-glow">
            Ton ADN. <br/><span className="font-bold text-brand-light">Ton Style.</span>
          </h1>
          <p className="text-base md:text-lg text-brand-muted mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Style. Confort. Tendance. Livraison rapide partout au Burkina.
            L'élégance urbaine redéfinie.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="#collection" className="liquid-button px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-sm">
              Voir la collection
            </Link>
            <a href="https://wa.me/22600000000" className="liquid-button-outline px-10 py-4 rounded-sm text-xs uppercase tracking-widest font-bold">
              Commander via WhatsApp
            </a>
          </div>
        </div>
        
        {/* Scroll Line */}
        <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-border"></div>
      </header>

      {/* Products Section */}
      <section id="collection" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-brand-border pb-6" data-aos="fade-up">
            <h2 className="text-3xl font-display font-light text-brand-light">Sélection <span className="font-bold text-brand-blue">Premium</span></h2>
            <div className="hidden md:block w-24 h-1 bg-brand-blue rounded-full"></div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-brand-muted">
              <i className="fa-solid fa-box-open text-5xl mb-4 opacity-50"></i>
              <p className="text-xs uppercase tracking-widest">Aucun produit disponible</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
              {products.map((product, index) => (
                <div key={product.id} className="break-inside-avoid liquid-glass group rounded-sm overflow-hidden hover:bg-brand-light/5 transition-all duration-500 mb-4" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                  {product.stock <= 3 && product.stock > 0 && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 z-10 shadow-lg">Stock limité</div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 z-10 shadow-lg">Épuisé</div>
                  )}
                  <div className="relative flex items-center justify-center bg-black/20">
                    <img src={product.image_url || product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full object-cover transition-all duration-700 transform group-hover:scale-110 drop-shadow-2xl" />
                  </div>
                  <div className="p-4 border-t border-brand-border">
                    <div className="flex flex-col items-start mb-2">
                      <h3 className="text-xs font-bold text-brand-light uppercase tracking-wider mb-1">{product.name}</h3>
                      <span className="text-xs font-light text-brand-light">{product.price.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex gap-2 mt-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                      <button onClick={() => handleAddToCart(product)} disabled={product.stock === 0} className="flex-1 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#26456f] transition-all shadow-md shadow-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        Panier
                      </button>
                      <Link href={`/produit/${product.id}`} className="px-3 py-2 border border-brand-border hover:border-brand-light text-brand-light transition-all flex items-center justify-center">
                        <i className="fa-regular fa-eye text-xs"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/produits" className="inline-flex items-center text-brand-muted hover:text-brand-light transition-colors text-xs uppercase tracking-widest border-b border-brand-border pb-1 hover:border-brand-light">
              Voir toute la collection <i className="fa-solid fa-arrow-right ml-2 text-brand-blue"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-us" className="py-16 border-t border-brand-border relative">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-display font-light text-brand-light mb-12 text-center uppercase tracking-widest">Pourquoi <span className="font-bold text-brand-blue">DNAStore</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <FeatureCard 
                  icon="fa-check-circle" 
                  title="Qualité vérifiée" 
                  shortText="Chaque paire est inspectée et sélectionnée avec soin."
                  fullText="Nous inspectons minutieusement chaque produit avant expédition. Contrôle qualité rigoureux pour garantir votre satisfaction totale."
                  delay="0"
                />
                <FeatureCard 
                  icon="fa-fire" 
                  title="Modèles actuels" 
                  shortText="Inspirés des dernières tendances street et urbaines."
                  fullText="Collection mise à jour régulièrement avec les dernières tendances. Styles authentiques pour affirmer votre personnalité."
                  delay="100"
                />
                <FeatureCard 
                  icon="fa-tags" 
                  title="Prix accessibles" 
                  shortText="Le meilleur rapport qualité/prix, accessible à tous."
                  fullText="Qualité premium sans compromettre votre budget. Des prix justes et transparents pour tous nos clients."
                  delay="200"
                />
                <FeatureCard 
                  icon="fa-whatsapp" 
                  iconBrand
                  title="Support rapide" 
                  shortText="Réponse instantanée pour toutes vos questions."
                  fullText="Équipe disponible 7j/7 sur WhatsApp. Réponses rapides et conseils personnalisés pour vous accompagner."
                  delay="300"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon="fa-truck-fast" 
                  title="Livraison Rapide" 
                  shortText="24-48h à Ouagadougou"
                  fullText="Livraison express dans toute la capitale. Service étendu aux grandes villes du Burkina Faso avec suivi de commande."
                  delay="400"
                />
                <FeatureCard 
                  icon="fa-hand-holding-dollar" 
                  title="Paiement à la livraison" 
                  shortText="Cash à la réception"
                  fullText="Payez uniquement à la réception de votre commande. Aucun paiement en ligne requis, sécurité maximale."
                  delay="500"
                />
                <FeatureCard 
                  icon="fa-lock" 
                  title="100% Sécurisé" 
                  shortText="Sans risque"
                  fullText="Transactions sécurisées et confidentielles. Satisfaction garantie ou remboursement sous conditions."
                  delay="600"
                />
            </div>
        </div>
      </section>



      {/* Community */}
      <section className="py-24 relative overflow-hidden bg-brand-light/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl font-display font-light text-brand-light mb-8">Rejoins <span className="font-bold text-brand-blue">DNAStore</span></h2>
            <div className="flex flex-wrap justify-center gap-8 text-brand-muted mb-12 text-xs font-medium uppercase tracking-widest">
                <span className="flex items-center"><i className="fa-solid fa-check text-brand-blue mr-2"></i> Nouveautés</span>
                <span className="flex items-center"><i className="fa-solid fa-check text-brand-blue mr-2"></i> Exclusivités</span>
                <span className="flex items-center"><i className="fa-solid fa-check text-brand-blue mr-2"></i> Drops limités</span>
            </div>
            <div className="flex justify-center gap-6">
                <a href="#" className="liquid-button px-8 py-3 text-white rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <a href="#" className="liquid-button-outline px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-brands fa-instagram"></i> Instagram
                </a>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-brand-border bg-brand-base">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-display font-light text-center text-brand-light mb-12 uppercase tracking-widest">Questions <span className="font-bold text-brand-blue">Fréquentes</span></h2>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
        </div>
      </section>



      {/* Toast */}
      <div className={`fixed bottom-6 right-6 bg-brand-light text-brand-base px-8 py-4 shadow-2xl transform transition-transform duration-500 z-50 flex items-center gap-4 border border-gray-200 ${showToast ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className="w-2 h-2 bg-brand-red rounded-full red-dot-pulse"></div>
        <div>
            <h4 className="font-bold text-sm uppercase tracking-wider">Ajouté au panier</h4>
        </div>
      </div>

      {/* Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-[#1C1C1E]/95 backdrop-blur-md z-50 flex justify-center items-center p-4" onClick={(e) => e.target === e.currentTarget && setModalProduct(null)}>
            <div className="liquid-glass border border-brand-border w-full max-w-lg p-10 relative">
                <button onClick={() => setModalProduct(null)} className="absolute top-6 right-6 text-brand-muted hover:text-brand-light transition-colors">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
                <h3 className="text-3xl font-display text-brand-light mb-2">{modalProduct.name}</h3>
                <div className="h-px w-12 bg-brand-blue mb-6"></div>
                <p className="text-brand-muted font-light leading-relaxed mb-8">
                    Ce modèle incarne l'esthétique minimaliste moderne. Disponible immédiatement pour une livraison sécurisée.
                </p>
                <a href="https://wa.me/22600000000" className="block w-full py-4 bg-brand-light text-brand-base font-bold text-center uppercase tracking-widest hover:bg-gray-200 transition-colors text-xs shadow-lg">
                    Commander sur WhatsApp
                </a>
            </div>
        </div>
      )}
    </Layout>
  )
}

function FeatureCard({ icon, iconBrand, title, shortText, fullText, delay }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group p-6 rounded-sm border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col items-center text-center liquid-glass relative" data-aos="fade-up" data-aos-delay={delay}>
      <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full mb-4 text-brand-blue group-hover:scale-110 transition-transform">
        <i className={`${iconBrand ? 'fa-brands' : 'fa-solid'} ${icon} text-2xl md:text-3xl`}></i>
      </div>
      <h3 className="text-xs md:text-sm font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">{title}</h3>
      
      {/* Desktop: hover to show full text */}
      <div className="hidden md:block">
        <p className="text-brand-muted text-sm leading-relaxed font-light group-hover:hidden">{shortText}</p>
        <p className="text-brand-muted text-sm leading-relaxed font-light hidden group-hover:block">{fullText}</p>
      </div>
      
      {/* Mobile: button to toggle */}
      <div className="md:hidden">
        <p className="text-brand-muted text-[10px] leading-relaxed font-light mb-3">{isExpanded ? fullText : shortText}</p>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs hover:bg-brand-blue/30 transition-colors"
        >
          <i className={`fa-solid ${isExpanded ? 'fa-minus' : 'fa-plus'}`}></i>
        </button>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="liquid-glass rounded-sm overflow-hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-6 text-left hover:bg-brand-light/5 flex justify-between items-center transition-colors">
            <span className="text-sm font-bold text-brand-light uppercase tracking-widest">{question}</span>
            <i className={`fa-solid fa-chevron-down text-brand-muted transition-transform text-xs ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>
        <div className={`px-8 py-6 text-brand-muted border-t border-brand-border text-xs font-light leading-relaxed ${isOpen ? 'block' : 'hidden'}`}>
            {answer}
        </div>
    </div>
  )
}
