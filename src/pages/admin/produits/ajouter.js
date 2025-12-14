import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
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
    code: '',
    category: '',
    image_url: '',
    sizes: '',
    colors: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').insert({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      code: form.code,
      category: form.category,
      image_url: form.image_url,
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
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Ajouter un produit</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">Prix (FCFA) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Stock *</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({...form, stock: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">Code produit *</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({...form, code: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Catégorie</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">URL de l'image</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({...form, image_url: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Tailles (séparées par virgule)</label>
            <input
              type="text"
              value={form.sizes}
              onChange={(e) => setForm({...form, sizes: e.target.value})}
              placeholder="37, 38, 39, 40"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Couleurs (séparées par virgule)</label>
            <input
              type="text"
              value={form.colors}
              onChange={(e) => setForm({...form, colors: e.target.value})}
              placeholder="Rouge, Bleu, Noir"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-blue outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
