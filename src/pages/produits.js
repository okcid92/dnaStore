import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { addToCart } from '@/lib/cart'

export default function Produits() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    return matchSearch && matchCategory
  })

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  const handleAddToCart = (product) => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <Layout>
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-light text-brand-light mb-4 uppercase tracking-widest">
              Notre <span className="font-bold text-brand-blue">Collection</span>
            </h1>
            <p className="text-brand-muted font-light max-w-2xl mx-auto">Découvrez notre sélection exclusive de streetwear premium</p>
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm py-3.5 pl-12 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all placeholder-brand-muted/50"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3.5 bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all font-bold uppercase tracking-widest"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-brand-base text-white">
                  {cat === 'all' ? 'Toutes' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <i className="fa-solid fa-box-open text-6xl text-brand-muted mb-6 opacity-50"></i>
              <p className="text-brand-muted text-sm uppercase tracking-widest">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="break-inside-avoid liquid-glass group rounded-sm overflow-hidden hover:bg-brand-light/5 transition-all duration-500 mb-4">
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
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 liquid-glass px-6 py-4 rounded-sm shadow-2xl z-50 flex items-center gap-3 border border-brand-border animate-slide-up">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs font-bold text-brand-light uppercase tracking-widest">Ajouté au panier</span>
        </div>
      )}
    </Layout>
  )
}
