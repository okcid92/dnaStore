-- Script complet pour la table orders avec toutes les colonnes nécessaires

-- Option 1 : Ajouter les colonnes manquantes (si la table existe déjà)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_mode TEXT DEFAULT 'livraison';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Mettre à jour les anciennes commandes avec des valeurs par défaut si nécessaire
UPDATE orders SET customer_name = 'Non spécifié' WHERE customer_name IS NULL;
UPDATE orders SET phone = 'Non spécifié' WHERE phone IS NULL;
UPDATE orders SET city = 'Non spécifiée' WHERE city IS NULL;
UPDATE orders SET address = 'Non spécifiée' WHERE address IS NULL;
UPDATE orders SET delivery_mode = 'livraison' WHERE delivery_mode IS NULL;
UPDATE orders SET total_amount = 0 WHERE total_amount IS NULL;
UPDATE orders SET status = 'pending' WHERE status IS NULL;

-- ============================================
-- Option 2 : Recréer complètement la table (ATTENTION : supprime les données existantes)
-- Décommentez les lignes ci-dessous UNIQUEMENT si vous voulez repartir de zéro
-- ============================================

-- DROP TABLE IF EXISTS orders CASCADE;

-- CREATE TABLE orders (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   customer_name TEXT NOT NULL,
--   phone TEXT NOT NULL,
--   city TEXT NOT NULL,
--   address TEXT,
--   delivery_mode TEXT DEFAULT 'livraison',
--   total_amount NUMERIC NOT NULL DEFAULT 0,
--   status TEXT DEFAULT 'pending',
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Activer RLS (Row Level Security)
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- -- Politique pour permettre la lecture à tous
-- CREATE POLICY "Allow public read access" ON orders
--   FOR SELECT
--   USING (true);

-- -- Politique pour permettre l'insertion à tous
-- CREATE POLICY "Allow public insert access" ON orders
--   FOR INSERT
--   WITH CHECK (true);

-- -- Politique pour permettre la mise à jour aux admins uniquement
-- CREATE POLICY "Allow admin update access" ON orders
--   FOR UPDATE
--   USING (auth.role() = 'authenticated');
