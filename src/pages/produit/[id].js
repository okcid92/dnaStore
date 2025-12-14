import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { addToCart } from '@/lib/cart'

export default function ProduitDetail({ product }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Produit non trouvé</h1>
          <button onClick={() => router.push('/produits')} className="btn-primary">
            Retour aux produits
          </button>
        </div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showToast', { 
        detail: { message: 'Produit ajouté au panier !', type: 'success' } 
      })
      window.dispatchEvent(event)
    }
  }

  const handleWhatsAppOrder = () => {
    const message = `Bonjour, je veux commander :\n- ${product.name} (code: ${product.code})\n${selectedSize ? `Taille: ${selectedSize}\n` : ''}${selectedColor ? `Couleur: ${selectedColor}\n` : ''}Quantité: ${quantity}\nPrix: ${product.price * quantity} FCFA`
    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="mb-6 text-primary-blue hover:underline">
          ← Retour
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 md:h-[600px] glass rounded-3xl overflow-hidden">
            {product.image_url ? (
              <Image src={product.image_url} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Pas d'image
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">{product.price} FCFA</div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block font-bold mb-2">Taille :</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-2xl transition-all ${selectedSize === size ? 'glass bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'glass'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block font-bold mb-2">Couleur :</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-2xl transition-all ${selectedColor === color ? 'glass bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'glass'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block font-bold mb-2">Quantité :</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 glass rounded-2xl font-bold hover:bg-white/90 transition-all"
                >
                  -
                </button>
                <span className="text-xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 glass rounded-2xl font-bold hover:bg-white/90 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {product.stock === 0 ? (
              <div className="glass bg-red-500/20 text-red-700 px-4 py-3 rounded-2xl font-bold">
                Rupture de stock
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button onClick={handleAddToCart} className="btn-primary w-full">
                  Ajouter au panier
                </button>
                <button onClick={handleWhatsAppOrder} className="btn-secondary w-full">
                  Commander via WhatsApp
                </button>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              Code produit : {product.code}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  return { props: { product: data || null } }
}
