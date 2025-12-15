-- Fonction pour annuler automatiquement les commandes en attente après 48h
-- et restituer le stock

-- 1. Créer une fonction pour annuler les commandes expirées
CREATE OR REPLACE FUNCTION cancel_expired_orders()
RETURNS void AS $$
DECLARE
  expired_order RECORD;
  order_item JSONB;
BEGIN
  -- Trouver toutes les commandes en attente depuis plus de 48h
  FOR expired_order IN 
    SELECT * FROM orders 
    WHERE status = 'en attente' 
    AND created_at < NOW() - INTERVAL '48 hours'
  LOOP
    -- Restituer le stock pour chaque article
    FOR order_item IN SELECT * FROM jsonb_array_elements(expired_order.items)
    LOOP
      UPDATE products 
      SET stock = stock + (order_item->>'quantity')::INTEGER
      WHERE id = (order_item->>'id')::INTEGER;
    END LOOP;
    
    -- Mettre à jour le statut de la commande
    UPDATE orders 
    SET status = 'annulée' 
    WHERE id = expired_order.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 2. Créer une extension pour les tâches planifiées (si pas déjà activée)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 3. Planifier l'exécution toutes les heures
-- SELECT cron.schedule('cancel-expired-orders', '0 * * * *', 'SELECT cancel_expired_orders();');

-- Note: pg_cron n'est pas disponible sur tous les plans Supabase
-- Alternative: Appeler cette fonction manuellement ou via un webhook externe
