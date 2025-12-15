import { supabase } from './supabase'

export const uploadProductImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
      .from('images-produit')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('images-produit')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteProductImage = async (imageUrl) => {
  try {
    const path = imageUrl.split('/images-produit/')[1]
    
    const { error } = await supabase.storage
      .from('images-produit')
      .remove([path])

    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}
