-- Ajouter les colonnes manquantes à la table orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address TEXT;

-- Mettre à jour les anciennes commandes avec des valeurs par défaut si nécessaire
UPDATE orders SET city = 'Non spécifiée' WHERE city IS NULL;
UPDATE orders SET address = 'Non spécifiée' WHERE address IS NULL;
