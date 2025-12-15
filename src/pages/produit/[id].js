import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { addToCart } from '@/lib/cart'

export default function ProduitDetail({ product, relatedProducts = [] }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const images = product?.images || (product?.image_url ? [product.image_url] : [])

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 md:py-32 text-center">
          <i className="fa-solid fa-box-open text-4xl md:text-6xl text-brand-muted mb-4 md:mb-6 opacity-50"></i>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-light mb-4 tracking-widest">Produit non trouvé</h1>
          <button onClick={() => router.push('/produits')} className="liquid-button px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest">
            Retour aux produits
          </button>
        </div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    router.push('/panier')
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-16">
        <button onClick={() => router.back()} className="mb-4 md:mb-8 text-brand-blue hover:text-brand-blue/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
          <i className="fa-solid fa-arrow-left"></i> Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square liquid-glass rounded-sm overflow-hidden mb-4">
              {images.length > 0 ? (
                <img src={images[currentImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-brand-muted">
                  <i className="fa-solid fa-image text-6xl opacity-50"></i>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative aspect-square liquid-glass rounded-sm overflow-hidden transition-all ${
                      currentImage === index ? 'ring-2 ring-brand-blue' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="liquid-glass rounded-sm p-4 md:p-8">
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-4xl font-display font-bold text-brand-light mb-2 md:mb-3 tracking-wider">{product.name}</h1>
              {product.description && (
                <p className="text-brand-muted text-sm leading-relaxed">{product.description}</p>
              )}
            </div>

            <div className="flex items-baseline gap-2 md:gap-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-brand-border">
              <span className="text-3xl md:text-4xl font-display font-bold text-brand-light">{product.price.toLocaleString()}</span>
              <span className="text-brand-muted text-xs md:text-sm uppercase tracking-widest">FCFA</span>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4 md:mb-6">
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Taille</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedSize === size 
                          ? 'bg-brand-blue text-white shadow-lg' 
                          : 'liquid-glass text-brand-light hover:bg-brand-light/5'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-4 md:mb-6">
                <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Couleur</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedColor === color 
                          ? 'bg-brand-blue text-white shadow-lg' 
                          : 'liquid-glass text-brand-light hover:bg-brand-light/5'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6 md:mb-8">
              <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2 md:mb-3">Quantité</label>
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 liquid-glass rounded-sm font-bold text-brand-light hover:bg-brand-light/5 transition-all"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="text-xl md:text-2xl font-display font-bold text-brand-light min-w-[2.5rem] md:min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 liquid-glass rounded-sm font-bold text-brand-light hover:bg-brand-light/5 transition-all"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
              <p className="text-xs text-brand-muted mt-2">{product.stock} en stock</p>
            </div>

            {product.stock === 0 ? (
              <div className="liquid-glass bg-red-500/10 text-red-400 px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-center">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                Rupture de stock
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={handleBuyNow} 
                  className="liquid-button w-full py-4 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-bolt"></i>
                  Acheter maintenant
                </button>
                <button 
                  onClick={handleAddToCart} 
                  className="liquid-button-outline w-full py-4 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus"></i>
                  Ajouter au panier
                </button>
              </div>
            )}

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-brand-border flex items-center justify-between text-[10px] md:text-xs text-brand-muted">
              <span className="uppercase tracking-widest">Code : {product.code}</span>
              {product.category && (
                <span className="uppercase tracking-widest">{product.category}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Autres produits */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-24 border-t border-brand-border mt-8 md:mt-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-xl md:text-3xl font-display font-light text-brand-light mb-6 md:mb-12 text-center">
              Autres <span className="font-bold text-brand-blue">Produits</span>
            </h2>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {relatedProducts.map((prod, index) => (
                <div key={prod.id} className="break-inside-avoid liquid-glass group rounded-sm overflow-hidden hover:bg-brand-light/5 transition-all duration-500 mb-4">
                  {prod.stock <= 3 && prod.stock > 0 && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 z-10 shadow-lg">Stock limité</div>
                  )}
                  {prod.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 z-10 shadow-lg">Épuisé</div>
                  )}
                  <div className="relative flex items-center justify-center bg-black/20">
                    <img 
                      src={prod.image_url || prod.images?.[0] || '/placeholder.png'} 
                      alt={prod.name} 
                      className="w-full object-cover transition-all duration-700 transform group-hover:scale-110 drop-shadow-2xl" 
                    />
                  </div>
                  <div className="p-4 border-t border-brand-border">
                    <div className="flex flex-col items-start mb-2">
                      <h3 className="text-xs font-bold text-brand-light uppercase tracking-wider mb-1">{prod.name}</h3>
                      <span className="text-xs font-light text-brand-light">{prod.price.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex gap-2 mt-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                      <button 
                        onClick={() => {
                          addToCart(prod)
                          setShowToast(true)
                          setTimeout(() => setShowToast(false), 3000)
                        }} 
                        disabled={prod.stock === 0} 
                        className="flex-1 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#26456f] transition-all shadow-md shadow-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Panier
                      </button>
                      <a 
                        href={`/produit/${prod.id}`} 
                        className="px-3 py-2 border border-brand-border hover:border-brand-light text-brand-light transition-all flex items-center justify-center"
                      >
                        <i className="fa-regular fa-eye text-xs"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 liquid-glass px-4 md:px-6 py-3 md:py-4 rounded-sm shadow-2xl z-50 flex items-center gap-2 md:gap-3 border border-brand-border animate-slide-up">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs font-bold text-brand-light uppercase tracking-widest">Ajouté au panier</span>
        </div>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  // Charger 10 autres produits aléatoires (excluant le produit actuel)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .neq('id', params.id)
    .limit(10)

  // Mélanger aléatoirement
  const shuffled = relatedProducts?.sort(() => Math.random() - 0.5) || []

  return { 
    props: { 
      product: product || null,
      relatedProducts: shuffled
    } 
  }
}
