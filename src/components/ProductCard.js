import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link href={`/produit/${product.id}`} className="group">
      <div className="card-glass overflow-hidden">
        <div className="relative h-64 bg-gray-100">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Pas d'image
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <span className="glass bg-red-500/90 text-white px-4 py-2 rounded-2xl font-bold shadow-xl">
                Rupture de stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{product.price} FCFA</span>
            <span className="text-sm text-gray-500">Code: {product.code}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
