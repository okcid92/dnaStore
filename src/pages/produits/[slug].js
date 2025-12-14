import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { addToCart } from '@/lib/cart'

// Mock Data based on SQL Schema
const MOCK_PRODUCT = {
  id: 1,
  name: "Street Runner 2025",
  slug: "street-runner-2025",
  price: 7000,
  old_price: 10000,
  stock: 15,
  status: 'in_stock',
  short_description: "L'alliance parfaite entre confort et style urbain. Idéale pour le quotidien.",
  description: `
    Découvrez la Street Runner 2025, la paire qui redéfinit les standards du streetwear. 
    Conçue avec des matériaux respirants et une semelle ergonomique, elle offre un confort inégalé tout au long de la journée.
    
    Caractéristiques :
    - Tige en mesh respirant
    - Semelle amortissante
    - Design minimaliste et futuriste
    - Disponible en plusieurs coloris
  `,
  gender: 'Unisexe',
  style: 'Street',
  main_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ],
  sizes: [40, 41, 42, 43, 44],
  badge: "Nouveau",
  delivery_delay: "24h–72h",
  delivery_zone: "Ouaga & Provinces",
  rating: 4.8,
  reviews_count: 124
}

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (slug) {
      // Simulate API call
      setTimeout(() => {
        setProduct(MOCK_PRODUCT)
        setSelectedSize(MOCK_PRODUCT.sizes[0])
      }, 500)
    }
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({ ...product, size: selectedSize })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen bg-brand-base">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="text-xs text-brand-muted mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-light">Accueil</Link> / 
            <Link href="/produits" className="hover:text-brand-light ml-1">Collection</Link> / 
            <span className="text-brand-blue ml-1 font-bold">{product.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Gallery Section */}
            <div className="lg:w-3/5">
              <div className="liquid-glass rounded-sm overflow-hidden mb-4 relative group">
                 <div className={`absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-10 shadow-lg`}>
                    {product.badge}
                 </div>
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-[400px] md:h-[600px] object-contain bg-black/5 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`liquid-glass rounded-sm overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-brand-blue opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-2/5">
              <div className="sticky top-32">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-light mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-brand-blue text-xs">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid ${i < Math.floor(product.rating) ? 'fa-star' : 'fa-star-half-stroke'}`}></i>
                    ))}
                  </div>
                  <span className="text-xs text-brand-muted">({product.reviews_count} avis)</span>
                  <span className="text-xs text-brand-blue font-bold uppercase tracking-widest px-2 py-1 bg-brand-blue/10 rounded-sm">
                    {product.status === 'in_stock' ? 'En Stock' : 'Rupture'}
                  </span>
                </div>

                <div className="flex items-end gap-4 mb-8 border-b border-brand-border pb-8">
                  <span className="text-4xl font-light text-brand-light">{product.price.toLocaleString()} FCFA</span>
                  {product.old_price && (
                    <span className="text-lg text-brand-muted line-through mb-1">{product.old_price.toLocaleString()} FCFA</span>
                  )}
                </div>

                <p className="text-brand-muted leading-relaxed mb-8 font-light">
                  {product.short_description}
                </p>

                {/* Size Selector */}
                <div className="mb-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs font-bold text-brand-light uppercase tracking-widest">Taille</span>
                    <button className="text-xs text-brand-blue underline">Guide des tailles</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center rounded-sm border transition-all text-sm font-bold ${
                          selectedSize === size 
                            ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                            : 'border-brand-border text-brand-muted hover:border-brand-light hover:text-brand-light'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 mb-8">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-brand-light text-brand-base font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <i className="fa-solid fa-bag-shopping"></i> Ajouter au panier
                  </button>
                  <a 
                    href={`https://wa.me/22600000000?text=Je veux commander ${product.name} en taille ${selectedSize}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 border border-brand-border text-brand-light font-bold uppercase tracking-widest hover:border-brand-light transition-all flex items-center justify-center gap-3"
                  >
                    <i className="fa-brands fa-whatsapp text-xl"></i> Commander sur WhatsApp
                  </a>
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-2 gap-4 text-xs text-brand-muted">
                  <div className="flex items-center gap-3 p-4 liquid-glass rounded-sm">
                    <i className="fa-solid fa-truck-fast text-brand-blue text-lg"></i>
                    <div>
                      <span className="block font-bold text-brand-light">Livraison</span>
                      <span>{product.delivery_delay}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 liquid-glass rounded-sm">
                    <i className="fa-solid fa-shield-halved text-brand-blue text-lg"></i>
                    <div>
                      <span className="block font-bold text-brand-light">Garantie</span>
                      <span>Authenticité 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Details */}
          <div className="mt-24 border-t border-brand-border pt-16">
             <h2 className="text-2xl font-display font-light text-brand-light mb-8 uppercase tracking-widest">Détails du <span className="font-bold text-brand-blue">Produit</span></h2>
             <div className="grid md:grid-cols-2 gap-12">
                <div className="prose prose-invert max-w-none text-brand-muted font-light">
                    <p className="whitespace-pre-line">{product.description}</p>
                </div>
                <div className="liquid-glass p-8 rounded-sm">
                    <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-6">Caractéristiques</h3>
                    <ul className="space-y-4 text-sm text-brand-muted font-light">
                        <li className="flex justify-between border-b border-brand-border pb-2">
                            <span>Genre</span>
                            <span className="text-brand-light">{product.gender}</span>
                        </li>
                        <li className="flex justify-between border-b border-brand-border pb-2">
                            <span>Style</span>
                            <span className="text-brand-light">{product.style}</span>
                        </li>
                        <li className="flex justify-between border-b border-brand-border pb-2">
                            <span>Zone de livraison</span>
                            <span className="text-brand-light">{product.delivery_zone}</span>
                        </li>
                        <li className="flex justify-between border-b border-brand-border pb-2">
                            <span>SKU</span>
                            <span className="text-brand-light">DNA-{product.id}-2025</span>
                        </li>
                    </ul>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`fixed bottom-6 right-6 bg-brand-light text-brand-base px-8 py-4 shadow-2xl transform transition-transform duration-500 z-50 flex items-center gap-4 border border-gray-200 ${showToast ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className="w-2 h-2 bg-brand-red rounded-full red-dot-pulse"></div>
        <div>
            <h4 className="font-bold text-sm uppercase tracking-wider">Ajouté au panier</h4>
            <p className="text-xs text-gray-600">Taille: {selectedSize}</p>
        </div>
      </div>
    </Layout>
  )
}
