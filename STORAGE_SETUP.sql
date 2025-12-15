-- ================================================
-- SUPABASE STORAGE SETUP - DNA Store
-- ================================================

-- 1. Créer le bucket "products" (via Dashboard)
-- Aller dans Storage > New bucket
-- Nom: products
-- Public: OUI (cocher la case)

-- 2. Politiques RLS pour le bucket

-- Politique 1: Lecture publique
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Politique 2: Upload admin uniquement
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);

-- Politique 3: Mise à jour admin uniquement
CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);

-- Politique 4: Suppression admin uniquement
CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);

-- ================================================
-- VÉRIFICATION
-- ================================================

-- Vérifier que le bucket existe
SELECT * FROM storage.buckets WHERE name = 'products';

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'objects';

-- ================================================
-- TEST
-- ================================================

-- Tester l'URL publique (remplacer [project-id] et [filename])
-- https://[project-id].supabase.co/storage/v1/object/public/products/[filename]
