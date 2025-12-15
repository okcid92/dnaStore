import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function AdminProduits() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
      return
    }
    fetchProducts()
  }

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="liquid-glass rounded-sm p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-xl md:text-3xl font-display font-bold tracking-widest text-brand-light">Gestion des Produits</h1>
          <button
            onClick={() => router.push('/admin/produits/ajouter')}
            className="liquid-button px-4 md:px-6 py-2 md:py-3 rounded-sm font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <i className="fa-solid fa-plus"></i>
            Ajouter un produit
          </button>
        </div>

        <div className="relative mb-6">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl placeholder-brand-muted/70"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-brand-muted">
            <i className="fa-solid fa-box-open text-5xl mb-4 opacity-50"></i>
            <p className="text-xs uppercase tracking-widest">Aucun produit trouvé</p>
            <button
              onClick={() => router.push('/admin/produits/ajouter')}
              className="liquid-button px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest mt-6"
            >
              Ajouter votre premier produit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-brand-light/5">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest">Image</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest">Nom</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest hidden sm:table-cell">Code</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest hidden md:table-cell">Prix</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest">Stock</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-brand-light/5 transition-colors">
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div className="relative w-12 h-12 md:w-16 md:h-16 liquid-glass rounded-sm overflow-hidden">
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-muted">
                            <i className="fa-solid fa-image text-xs"></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 font-bold text-brand-light">{product.name}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-brand-muted hidden sm:table-cell">{product.code}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-brand-light hidden md:table-cell">{product.price} FCFA</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <span className={`px-2 md:px-3 py-1 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-widest ${
                        product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                        product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() => router.push(`/admin/produits/modifier/${product.id}`)}
                          className="liquid-button px-3 md:px-4 py-2 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                        >
                          <i className="fa-solid fa-pen md:mr-2"></i>
                          <span className="hidden md:inline">Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="liquid-button-outline px-3 md:px-4 py-2 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-widest text-red-400 border-red-400 hover:bg-red-500/10 whitespace-nowrap"
                        >
                          <i className="fa-solid fa-trash md:mr-2"></i>
                          <span className="hidden md:inline">Supprimer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
