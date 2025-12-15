# ✅ Politique Déjà Existante - Solution

## ⚠️ Erreur
```
policy "Public Access" for table "objects" already exists
```

## 🔧 Solution

### Option 1 : Supprimer et Recréer

```sql
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

-- Recréer avec des noms uniques
CREATE POLICY "products_public_access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

CREATE POLICY "products_admin_upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);

CREATE POLICY "products_admin_delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);
```

---

### Option 2 : Utiliser l'Interface Supabase

1. **Storage** → **products** → **Policies**
2. Vérifier si les politiques existent déjà
3. Si oui, **ne rien faire** (c'est déjà configuré !)
4. Si non, cliquer sur **New policy** et créer manuellement

---

### Option 3 : Vérifier les Politiques Existantes

```sql
-- Voir toutes les politiques du bucket products
SELECT 
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND qual LIKE '%products%';
```

Si vous voyez des politiques pour le bucket "products", **c'est déjà configuré** ✅

---

## ✅ Test Rapide

### Tester si ça fonctionne :

1. Aller sur `/admin/produits/ajouter`
2. Sélectionner une image
3. Si l'upload fonctionne → **Tout est OK !**
4. Si erreur → Vérifier les politiques

---

## 🎯 Résumé

**Si l'erreur apparaît :** Les politiques existent déjà, c'est normal !

**Action :** Tester l'upload directement, ça devrait fonctionner.

**Si ça ne fonctionne pas :** Utiliser l'Option 1 pour recréer avec des noms uniques.
