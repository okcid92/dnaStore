import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import ImageUpload from '@/components/admin/ImageUpload'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

export default function AjouterProduit() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
    images: [],
    sizes: '',
    colors: ''
  })

  const handleImageUpload = (urls) => {
    setForm({ ...form, images: urls, image_url: urls[0] || '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').insert({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category: form.category,
      image_url: form.images[0] || '',
      images: form.images,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : null,
      colors: form.colors ? form.colors.split(',').map(c => c.trim()) : null
    })

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      router.push('/admin/produits')
    }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="liquid-glass rounded-sm p-8">
        <h1 className="text-3xl font-display font-bold tracking-widest text-brand-light mb-8">Ajouter un produit</h1>

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

          <div className="grid grid-cols-2 gap-4">
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
            <p className="text-xs text-brand-muted mt-2">
              <i className="fa-solid fa-info-circle mr-1"></i>
              Le code produit sera généré automatiquement (ex: DNA-001000)
            </p>
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

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading || form.images.length === 0} className="liquid-button px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest disabled:opacity-50">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="liquid-button-outline px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
