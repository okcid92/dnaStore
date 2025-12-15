import { useState } from 'react'
import { uploadProductImage, deleteProductImage } from '@/lib/storage'
import Image from 'next/image'

export default function ImageUpload({ onUpload, currentImages = [] }) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState(currentImages)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (images.length >= 4) {
      alert('Maximum 4 images par produit')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop grande (max 5MB)')
      return
    }

    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      const newImages = [...images, url]
      setImages(newImages)
      onUpload(newImages)
    } catch (error) {
      alert('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (index) => {
    const imageToRemove = images[index]
    try {
      await deleteProductImage(imageToRemove)
      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
      onUpload(newImages)
    } catch (error) {
      console.error('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <label className="block font-bold text-xs text-brand-light uppercase tracking-widest mb-2">
        Images du produit ({images.length}/4)
      </label>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((img, index) => (
            <div key={index} className="relative w-full aspect-square liquid-glass rounded-sm overflow-hidden group">
              <Image src={img} alt={`Image ${index + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <i className="fa-solid fa-times text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < 4 && (
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="w-full px-4 py-3 liquid-glass border-2 border-brand-border rounded-sm text-brand-light focus:border-brand-blue outline-none transition-all backdrop-blur-xl file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-brand-blue file:text-white hover:file:bg-brand-blue/80 file:cursor-pointer"
        />
      )}

      {uploading && (
        <div className="flex items-center gap-2 mt-2 text-sm text-brand-blue">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-blue border-t-transparent"></div>
          <span className="text-xs">Upload en cours...</span>
        </div>
      )}

      <p className="text-xs text-brand-muted mt-2">
        Formats acceptés : JPG, PNG, WEBP (max 5MB) - Maximum 4 images
      </p>
    </div>
  )
}
