import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { customer_name, customer_phone, customer_address, items, total_amount } = req.body

    // 1. Vérifier le stock
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single()

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Stock insuffisant pour ${item.name}. Disponible: ${product?.stock || 0}` 
        })
      }
    }

    // 2. Réserver le stock
    for (const item of items) {
      const { data: currentProduct } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single()

      await supabase
        .from('products')
        .update({ stock: currentProduct.stock - item.quantity })
        .eq('id', item.id)
    }

    // 3. Créer la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name,
        customer_phone,
        customer_address,
        items,
        total_amount,
        status: 'en attente'
      }])
      .select()
      .single()

    if (orderError) {
      console.error('Erreur Supabase:', orderError)
      throw orderError
    }

    return res.status(200).json({ order })
  } catch (error) {
    console.error('Erreur création commande:', error)
    return res.status(500).json({ error: error.message || 'Erreur serveur' })
  }
}
