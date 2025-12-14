import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { addToCart } from '@/lib/cart'

export default function Home() {
  const [showToast, setShowToast] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 1000,
      easing: 'ease-out-cubic'
    })
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const products = [
    {
      id: 1,
      name: 'Street Runner',
      slug: 'street-runner',
      price: 7000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      badge: 'Stock limité',
      badgeColor: 'bg-brand-red',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Urban Force',
      slug: 'urban-force',
      price: 7000,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      badge: 'Best Seller',
      badgeColor: 'bg-brand-blue',
      rating: 5
    },
    {
      id: 3,
      name: 'Retro High OG',
      slug: 'retro-high-og',
      price: 7000,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      badge: 'Stock limité',
      badgeColor: 'bg-brand-red',
      rating: 4
    }
  ]

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
      <div className="ambient-light">
        <div className="blob top-0 left-0 w-96 h-96 animate-blob"></div>
        <div className="blob bottom-0 right-0 w-[600px] h-[600px] animate-blob animation-delay-2000" style={{ background: '#152642' }}></div>
        <div className="blob top-1/2 left-1/2 w-80 h-80 animate-blob animation-delay-4000"></div>
      </div>

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

          <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="break-inside-avoid liquid-glass group rounded-sm overflow-hidden hover:bg-brand-light/5 transition-all duration-500 mb-4" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                <div className={`absolute top-2 left-2 ${product.badgeColor} text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 z-10 shadow-lg shadow-${product.badgeColor.replace('bg-', '')}/20`}>{product.badge}</div>
                <div className="relative flex items-center justify-center bg-black/20">
                  <img src={product.image} alt={product.name} className="w-full object-cover transition-all duration-700 transform group-hover:scale-110 drop-shadow-2xl" />
                </div>
                <div className="p-4 border-t border-brand-border">
                  <div className="flex flex-col items-start mb-2">
                    <h3 className="text-xs font-bold text-brand-light uppercase tracking-wider mb-1">{product.name}</h3>
                    <div className="flex text-brand-blue text-[8px] gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-solid ${i < Math.floor(product.rating) ? 'fa-star' : (i < product.rating ? 'fa-star-half-stroke' : 'fa-regular fa-star')}`}></i>
                      ))}
                    </div>
                    <span className="text-xs font-light text-brand-light">{product.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex gap-2 mt-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                    <button onClick={() => handleAddToCart(product)} className="flex-1 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#26456f] transition-all shadow-md shadow-brand-blue/20">
                      Panier
                    </button>
                    <Link href={`/produits/${product.slug}`} className="px-3 py-2 border border-brand-border hover:border-brand-light text-brand-light transition-all flex items-center justify-center">
                      <i className="fa-regular fa-eye text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="#" className="inline-flex items-center text-brand-muted hover:text-brand-light transition-colors text-xs uppercase tracking-widest border-b border-brand-border pb-1 hover:border-brand-light">
              Voir toute la collection <i className="fa-solid fa-arrow-right ml-2 text-brand-blue"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 border-t border-brand-border relative">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-display font-light text-brand-light mb-12 text-center uppercase tracking-widest">Pourquoi <span className="font-bold text-brand-blue">Nous ?</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group p-6 rounded-sm border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col items-center text-center liquid-glass" data-aos="fade-up" data-aos-delay="0">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-check-circle text-2xl"></i>
                    </div>
                    <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Qualité vérifiée</h3>
                    <p className="text-brand-muted text-[10px] leading-relaxed font-light">Chaque paire est inspectée et sélectionnée avec soin.</p>
                </div>
                <div className="group p-6 rounded-sm border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col items-center text-center liquid-glass" data-aos="fade-up" data-aos-delay="100">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-fire text-2xl"></i>
                    </div>
                    <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Modèles actuels</h3>
                    <p className="text-brand-muted text-[10px] leading-relaxed font-light">Inspirés des dernières tendances street et urbaines.</p>
                </div>
                <div className="group p-6 rounded-sm border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col items-center text-center liquid-glass" data-aos="fade-up" data-aos-delay="200">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-tags text-2xl"></i>
                    </div>
                    <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Prix accessibles</h3>
                    <p className="text-brand-muted text-[10px] leading-relaxed font-light">Le meilleur rapport qualité/prix, accessible à tous.</p>
                </div>
                <div className="group p-6 rounded-sm border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col items-center text-center liquid-glass" data-aos="fade-up" data-aos-delay="300">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                    </div>
                    <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Support rapide</h3>
                    <p className="text-brand-muted text-[10px] leading-relaxed font-light">Réponse instantanée pour toutes vos questions.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Delivery & Payment */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="liquid-glass p-10 md:p-16 rounded-sm border border-brand-border">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2" data-aos="fade-right">
                        <h2 className="text-3xl font-display font-light text-brand-light mb-8">Livraison & <br/><span className="font-bold text-brand-blue">Paiement</span></h2>
                        <ul className="space-y-8">
                            <li className="flex items-start">
                                <div className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center flex-shrink-0 text-brand-blue bg-brand-blue/5">
                                    <i className="fa-solid fa-truck-fast text-sm"></i>
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-sm font-bold text-brand-light uppercase tracking-widest">Livraison Rapide</h4>
                                    <p className="text-brand-muted text-xs mt-1 font-light">À Ouagadougou et dans les grandes villes du Burkina.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center flex-shrink-0 text-brand-blue bg-brand-blue/5">
                                    <i className="fa-solid fa-hand-holding-dollar text-sm"></i>
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-sm font-bold text-brand-light uppercase tracking-widest">Paiement à la livraison</h4>
                                    <p className="text-brand-muted text-xs mt-1 font-light">Payez en cash uniquement à la réception.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center flex-shrink-0 text-brand-blue bg-brand-blue/5">
                                    <i className="fa-solid fa-lock text-sm"></i>
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-sm font-bold text-brand-light uppercase tracking-widest">Commande Sécurisée</h4>
                                    <p className="text-brand-muted text-xs mt-1 font-light">Simple, direct et sans aucun risque.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2" data-aos="fade-left">
                         <div className="relative">
                            <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full"></div>
                            <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Delivery" className="relative rounded-sm shadow-2xl border border-brand-border opacity-90 grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="reviews" className="py-24 border-t border-brand-border">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-display font-light text-brand-light mb-16 uppercase tracking-widest">Ils nous font <span className="font-bold text-brand-blue">confiance</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="liquid-glass p-8 rounded-sm" data-aos="flip-left">
                    <div className="flex text-brand-blue mb-6 justify-center gap-1 text-xs">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-brand-muted italic mb-6 font-light text-sm">"Bonne qualité, livraison rapide. Exactement comme sur la photo. Je valide fort !"</p>
                    <div className="text-xs font-bold text-brand-light uppercase tracking-widest">- Ismaël S.</div>
                </div>
                
                <div className="liquid-glass p-8 rounded-sm" data-aos="flip-left" data-aos-delay="100">
                    <div className="flex text-brand-blue mb-6 justify-center gap-1 text-xs">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-brand-muted italic mb-6 font-light text-sm">"Très satisfait, je recommande. Le service client sur WhatsApp est top."</p>
                    <div className="text-xs font-bold text-brand-light uppercase tracking-widest">- Fatou O.</div>
                </div>

                <div className="liquid-glass p-8 rounded-sm opacity-50 border-dashed border-brand-border" data-aos="flip-left" data-aos-delay="200">
                    <div className="h-full flex flex-col justify-center items-center">
                        <i className="fa-regular fa-comment-dots text-2xl text-brand-light mb-4"></i>
                        <p className="text-brand-muted text-xs font-light">Rejoins la communauté DNAStore.</p>
                    </div>
                </div>
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

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10" data-aos="zoom-in">
            <h2 className="text-4xl md:text-5xl font-display font-light text-brand-light mb-6">Trouver ta paire.</h2>
            <p className="text-sm text-brand-muted mb-12 uppercase tracking-widest">Exprime ton style. Affirme ton ADN.</p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link href="#collection" className="liquid-button bg-brand-light text-brand-base hover:bg-gray-200 px-10 py-4 font-bold text-xs uppercase tracking-widest rounded-sm border-none shadow-lg">
                    Commander
                </Link>
                <a href="https://wa.me/22600000000" className="px-10 py-4 border border-brand-border text-brand-light font-bold text-xs uppercase tracking-widest hover:border-brand-light transition-colors rounded-sm">
                    WhatsApp
                </a>
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
