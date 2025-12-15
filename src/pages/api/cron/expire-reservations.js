import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  try {
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const { data: expiredOrders } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'en attente')
      .lt('created_at', twentyFourHoursAgo.toISOString())

    if (expiredOrders && expiredOrders.length > 0) {
      for (const order of expiredOrders) {
        if (order.items) {
          for (const item of order.items) {
            await supabase
              .from('products')
              .update({ stock: supabase.raw(`stock + ${item.quantity}`) })
              .eq('id', item.id)
          }
        }

        await supabase
          .from('orders')
          .update({ status: 'annulée' })
          .eq('id', order.id)
      }
    }

    res.status(200).json({ success: true, expired: expiredOrders?.length || 0 })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
