-- ================================================
-- SCHEMA NETTOYÉ - DNA Store
-- ================================================
-- Ce script nettoie et corrige le schéma de la base de données
-- Supprime les données de test et aligne avec l'app réelle

-- ================================================
-- 1. SUPPRESSION DES ANCIENNES TABLES (si elles existent)
-- ================================================

DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ================================================
-- 2. EXTENSION UUID
-- ================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 3. TABLE USERS (Admins)
-- ================================================

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politiques (utiliser auth.role() pour éviter la récursion)
CREATE POLICY "Authenticated users can view users"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- ================================================
-- 4. TABLE PRODUCTS
-- ================================================

-- Créer une séquence pour les codes produits
CREATE SEQUENCE IF NOT EXISTS product_code_seq START 1000;

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  images TEXT[] CHECK (array_length(images, 1) <= 4),
  code TEXT UNIQUE,
  category TEXT,
  sizes TEXT[],
  colors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Politiques
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- ================================================
-- 5. TABLE ORDERS
-- ================================================

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  items JSONB NOT NULL,
  status TEXT DEFAULT 'en attente' CHECK (status IN ('en attente', 'confirmée', 'expédiée', 'livrée', 'annulée')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Politiques
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Public can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');

-- ================================================
-- 6. FONCTION TRIGGER pour updated_at
-- ================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 7. FONCTION TRIGGER pour auth.users
-- ================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger automatique
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- 8. FONCTION TRIGGER pour générer le code produit
-- ================================================

CREATE OR REPLACE FUNCTION public.generate_product_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.code IS NULL OR NEW.code = '' THEN
    NEW.code := 'DNA-' || LPAD(nextval('product_code_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_product_code ON public.products;
CREATE TRIGGER set_product_code
  BEFORE INSERT ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_product_code();

-- ================================================
-- 9. VÉRIFICATIONS
-- ================================================

-- Vérifier les tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Vérifier les politiques
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- ================================================
-- FIN DU SCRIPT
-- ================================================

-- NOTES:
-- 1. Ce script supprime TOUTES les données existantes
-- 2. Les politiques Storage doivent être configurées séparément (voir SUPABASE_STORAGE_GUIDE.md)
-- 3. Créer un bucket 'products' dans Supabase Storage avec politique publique en lecture
-- 4. Ajouter un utilisateur admin manuellement:
--    a) Créer l'utilisateur dans Supabase Auth
--    b) Insérer dans public.users:
--       INSERT INTO public.users (id, email, role)
--       VALUES ('uuid-from-auth-users', 'admin@dnastore.com', 'admin');
-- 5. Les commandes sont créées via WhatsApp (frontend public)
-- 6. Le panier utilise localStorage côté client
