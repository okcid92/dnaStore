import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import ImageUpload from '@/components/admin/ImageUpload'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

export default function ModifierProduit() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    code: '',
    category: '',
    image_url: '',
    images: [],
    sizes: '',
    colors: ''
  })

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (data) {
      setForm({
        name: data.name,
        description: data.description || '',
        price: data.price,
        stock: data.stock,
        code: data.code,
        category: data.category || '',
        image_url: data.image_url || '',
        images: data.images || [],
        sizes: data.sizes ? data.sizes.join(', ') : '',
        colors: data.colors ? data.colors.join(', ') : ''
      })
    }
  }

  const handleImageUpload = (urls) => {
    setForm({ ...form, images: urls, image_url: urls[0] || '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').update({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category: form.category,
      image_url: form.images[0] || '',
      images: form.images,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : null,
      colors: form.colors ? form.colors.split(',').map(c => c.trim()) : null
    }).eq('id', id)

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      router.push('/admin/produits')
    }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="liquid-glass rounded-sm p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-widest text-brand-light">Modifier le produit</h1>
          <div className="liquid-glass px-3 py-2 rounded-sm">
            <span className="text-xs text-brand-muted uppercase tracking-widest">Code: </span>
            <span className="text-xs font-bold text-brand-light">{form.code}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl resize-none"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Prix (FCFA) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Stock *</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({...form, stock: e.target.value})}
                className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Catégorie</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              placeholder="Chaussures, Vêtements, Accessoires..."
              className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl placeholder-brand-muted/70"
            />
          </div>

          <ImageUpload onUpload={handleImageUpload} currentImages={form.images} />

          <div>
            <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Tailles (séparées par virgule)</label>
            <input
              type="text"
              value={form.sizes}
              onChange={(e) => setForm({...form, sizes: e.target.value})}
              placeholder="37, 38, 39, 40"
              className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl placeholder-brand-muted/70"
            />
          </div>

          <div>
            <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">Couleurs (séparées par virgule)</label>
            <input
              type="text"
              value={form.colors}
              onChange={(e) => setForm({...form, colors: e.target.value})}
              placeholder="Rouge, Bleu, Noir"
              className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl placeholder-brand-muted/70"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="submit" disabled={loading} className="liquid-button px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest disabled:opacity-50 flex-1 sm:flex-none">
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="liquid-button-outline px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest flex-1 sm:flex-none"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
