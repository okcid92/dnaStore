# 🚀 Guide Rapide - Supabase Storage

## 📋 Étapes à Suivre

### 1️⃣ Dans Supabase Dashboard

1. **Storage** → **New bucket**
2. Nom : `products`
3. ✅ Cocher **Public bucket**
4. **Create bucket**

---

### 2️⃣ Configurer les Politiques

Dans l'onglet **Policies** du bucket :

#### Lecture publique
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );
```

#### Upload admin
```sql
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);
```

#### Suppression admin
```sql
CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);
```

---

### 3️⃣ Fichiers Créés

✅ `src/lib/storage.js` - Helper upload/delete
✅ `src/components/admin/ImageUpload.js` - Composant upload
✅ Intégré dans `/admin/produits/ajouter`

---

### 4️⃣ Tester

1. Aller sur `/admin/produits/ajouter`
2. Sélectionner une image
3. Attendre l'upload
4. Voir le message "✓ Image uploadée"
5. Soumettre le formulaire

---

### 5️⃣ Vérifier

**Dans Supabase :**
- Storage → products → Voir les images

**URL générée :**
```
https://[project-id].supabase.co/storage/v1/object/public/products/[filename]
```

---

## ✅ Checklist

- [ ] Bucket "products" créé
- [ ] Bucket public activé
- [ ] 3 politiques ajoutées
- [ ] Test d'upload réussi

---

**C'est prêt ! 🎉**
