-- ================================================
-- POLITIQUES STORAGE POUR LE BUCKET "images-produit"
-- ================================================
-- Exécuter ces commandes dans Supabase SQL Editor

-- IMPORTANT: Supprimer d'abord les anciennes politiques
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

-- 1. Lecture publique (tout le monde peut voir les images)
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images-produit');

-- 2. Upload pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images-produit' AND
  auth.role() = 'authenticated'
);

-- 3. Mise à jour pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images-produit' AND
  auth.role() = 'authenticated'
);

-- 4. Suppression pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images-produit' AND
  auth.role() = 'authenticated'
);

-- NOTE: Ces politiques permettent à tous les utilisateurs authentifiés
-- (y compris les admins) de gérer les images. C'est sécurisé car seuls
-- les admins peuvent se connecter au dashboard.
