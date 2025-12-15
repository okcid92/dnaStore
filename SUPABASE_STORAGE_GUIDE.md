# 📦 Guide Supabase Storage - DNA Store

## 🎯 Objectif
Configurer le stockage d'images pour les produits sur Supabase.

---

## 📋 Étape 1 : Créer le Bucket

### Dans Supabase Dashboard

1. **Aller dans Storage**
   - Cliquez sur "Storage" dans le menu latéral
   - Cliquez sur "New bucket"

2. **Créer le bucket "products"**
   ```
   Nom du bucket : products
   Public bucket : ✅ OUI (cochez la case)
   ```

3. **Cliquez sur "Create bucket"**

---

## 🔒 Étape 2 : Configurer les Politiques RLS

### Dans l'onglet "Policies" du bucket

#### Politique 1 : Lecture publique
```sql
-- Nom : Public Access
-- Opération : SELECT
-- Policy definition :
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );
```

#### Politique 2 : Upload admin uniquement
```sql
-- Nom : Admin Upload
-- Opération : INSERT
-- Policy definition :
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);
```

#### Politique 3 : Suppression admin uniquement
```sql
-- Nom : Admin Delete
-- Opération : DELETE
-- Policy definition :
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

## 💻 Étape 3 : Code d'Upload

### Créer le helper `lib/storage.js`

```javascript
import { supabase } from './supabase'

export const uploadProductImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteProductImage = async (imageUrl) => {
  try {
    const path = imageUrl.split('/products/')[1]
    
    const { error } = await supabase.storage
      .from('products')
      .remove([path])

    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}
```

---

## 🎨 Étape 4 : Composant Upload

### Créer `components/admin/ImageUpload.js`

```javascript
import { useState } from 'react'
import { uploadProductImage } from '@/lib/storage'

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Preview
    setPreview(URL.createObjectURL(file))

    // Upload
    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      onUpload(url)
    } catch (error) {
      alert('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block font-bold mb-2">Image du produit</label>
      
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-2xl" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="input-glass"
      />

      {uploading && (
        <p className="text-sm text-blue-600 mt-2">Upload en cours...</p>
      )}
    </div>
  )
}
```

---

## 🔧 Étape 5 : Intégrer dans le Formulaire

### Modifier `admin/produits/ajouter.js`

```javascript
import ImageUpload from '@/components/admin/ImageUpload'

export default function AjouterProduit() {
  const [form, setForm] = useState({
    // ... autres champs
    image_url: ''
  })

  const handleImageUpload = (url) => {
    setForm({ ...form, image_url: url })
  }

  return (
    <AdminLayout>
      <div className="card-glass">
        <form onSubmit={handleSubmit}>
          {/* Autres champs */}
          
          <ImageUpload onUpload={handleImageUpload} />
          
          {form.image_url && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Image uploadée
            </p>
          )}

          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
```

---

## 📝 Étape 6 : Tester

### Test d'Upload

1. **Aller sur** `/admin/produits/ajouter`
2. **Sélectionner une image**
3. **Attendre l'upload**
4. **Vérifier** que l'URL est générée
5. **Soumettre le formulaire**

### Vérifier dans Supabase

1. **Storage > products**
2. **Voir les fichiers uploadés**
3. **Cliquer sur un fichier**
4. **Copier l'URL publique**

---

## 🎯 URLs Générées

### Format
```
https://[project-id].supabase.co/storage/v1/object/public/products/[filename]
```

### Exemple
```
https://abcdefgh.supabase.co/storage/v1/object/public/products/0.123456.jpg
```

---

## ⚠️ Limites

### Taille des fichiers
- **Max par défaut :** 50 MB
- **Recommandé :** < 5 MB pour les images

### Formats acceptés
- ✅ JPG, JPEG
- ✅ PNG
- ✅ WEBP
- ✅ GIF

---

## 🔄 Optimisation (Optionnel)

### Compression avant upload

```javascript
const compressImage = async (file) => {
  // Utiliser une lib comme 'browser-image-compression'
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920
  }
  return await imageCompression(file, options)
}
```

---

## 📊 Checklist

- [ ] Bucket "products" créé
- [ ] Bucket configuré en public
- [ ] Politiques RLS ajoutées
- [ ] Fichier `lib/storage.js` créé
- [ ] Composant `ImageUpload` créé
- [ ] Intégré dans le formulaire
- [ ] Test d'upload réussi
- [ ] Images visibles sur le site

---

## 🆘 Dépannage

### Erreur "Policy violation"
→ Vérifier que l'utilisateur est admin dans la table `users`

### Erreur "Bucket not found"
→ Vérifier le nom du bucket (doit être "products")

### Image ne s'affiche pas
→ Vérifier que le bucket est public

### Upload lent
→ Compresser les images avant upload

---

**Storage configuré ! 📦✨**
