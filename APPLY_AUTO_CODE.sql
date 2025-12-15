-- ================================================
-- SCRIPT POUR ACTIVER LA GÉNÉRATION AUTOMATIQUE DU CODE PRODUIT
-- ================================================
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Créer la séquence pour les codes produits
CREATE SEQUENCE IF NOT EXISTS product_code_seq START 1000;

-- 2. Modifier la colonne code pour la rendre optionnelle
ALTER TABLE public.products ALTER COLUMN code DROP NOT NULL;

-- 3. Créer la fonction de génération de code
CREATE OR REPLACE FUNCTION public.generate_product_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.code IS NULL OR NEW.code = '' THEN
    NEW.code := 'DNA-' || LPAD(nextval('product_code_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Créer le trigger
DROP TRIGGER IF EXISTS set_product_code ON public.products;
CREATE TRIGGER set_product_code
  BEFORE INSERT ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_product_code();

-- 5. Vérifier que tout fonctionne
SELECT 
  'Séquence créée' as status,
  last_value as next_code
FROM product_code_seq;

-- Test: Insérer un produit sans code pour vérifier
-- INSERT INTO public.products (name, price, stock) 
-- VALUES ('Test Auto Code', 1000, 10);
-- SELECT code FROM public.products WHERE name = 'Test Auto Code';
-- DELETE FROM public.products WHERE name = 'Test Auto Code';

-- ================================================
-- FIN DU SCRIPT
-- ================================================
