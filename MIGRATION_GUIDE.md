# 🔄 Guide de Migration - DNA Store

## ⚠️ ATTENTION

Ce script va **SUPPRIMER TOUTES LES DONNÉES** existantes et recréer les tables.

**Sauvegardez vos données avant de continuer !**

---

## 📋 Différences entre Ancien et Nouveau Schéma

### ❌ Ancien Schéma (schema.sql)

```sql
-- Tables complexes non utilisées
- profiles (avec auth.users)
- order_items (relation complexe)
- Champs non utilisés: slug, gender, style, rating, reviews_count
- Seed data de test
```

### ✅ Nouveau Schéma (SCHEMA_CLEAN.sql)

```sql
-- Tables simplifiées alignées avec l'app
- users (simple, role admin uniquement)
- products (champs utilisés dans l'app)
- orders (simple, product_code + message)
- Pas de seed data
```

---

## 🔧 Changements Principaux

### Table `users` (au lieu de `profiles`)
```sql
-- Avant
profiles (id, email, role: 'user'|'admin')

-- Après
users (id, email, role: 'admin' uniquement)
```

### Table `products`
```sql
-- Supprimé
- slug
- old_price
- short_description
- gender, style
- main_image (remplacé par image_url)
- images[] (une seule image suffit)
- badge
- delivery_delay, delivery_zone
- rating, reviews_count

-- Gardé
- id, name, description, price, stock
- image_url (au lieu de main_image)
- code (unique)
- category
- sizes[], colors[]
```

### Table `orders`
```sql
-- Avant
orders (customer_name, phone, city, address, delivery_mode, total_amount, payment_method)
order_items (relation avec products)

-- Après
orders (product_code, message, status)
// Simple, juste pour tracking WhatsApp
```

---

## 🚀 Étapes de Migration

### 1. Sauvegarder les Données (Important !)

```sql
-- Exporter les produits existants
SELECT * FROM products;

-- Exporter les commandes existantes
SELECT * FROM orders;
```

### 2. Exécuter le Script de Nettoyage

Dans Supabase SQL Editor :

```sql
-- Copier-coller le contenu de SCHEMA_CLEAN.sql
-- Exécuter
```

### 3. Vérifier les Tables

```sql
-- Vérifier que les tables sont créées
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Résultat attendu:
-- users
-- products
-- orders
```

### 4. Créer un Utilisateur Admin

```sql
-- Méthode 1: Via Supabase Auth Dashboard
-- 1. Authentication > Users > Add user
-- 2. Email: admin@dnastore.com
-- 3. Password: votre_mot_de_passe
-- 4. Copier l'UUID généré

-- Méthode 2: Ajouter manuellement dans users
INSERT INTO public.users (id, email, role)
VALUES ('uuid-de-l-utilisateur', 'admin@dnastore.com', 'admin');
```

### 5. Configurer le Storage

```bash
# Dans Supabase Dashboard
Storage > New bucket
Nom: products
Public: ✅ OUI
```

Les politiques storage sont déjà dans le script.

### 6. Tester

1. **Login Admin**
   - `/admin/login`
   - Email: admin@dnastore.com
   - Password: votre_mot_de_passe

2. **Ajouter un Produit**
   - `/admin/produits/ajouter`
   - Remplir le formulaire
   - Upload une image
   - Soumettre

3. **Vérifier**
   ```sql
   SELECT * FROM products;
   ```

---

## 🔍 Vérifications Post-Migration

### Tables
```sql
-- Doit retourner 3 tables
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Politiques RLS
```sql
-- Doit retourner les politiques
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Storage
```sql
-- Vérifier le bucket
SELECT * FROM storage.buckets WHERE name = 'products';

-- Vérifier les politiques storage
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

---

## 🐛 Dépannage

### Erreur: "relation already exists"
```sql
-- Supprimer manuellement
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

### Erreur: "policy already exists"
```sql
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public can view products" ON products;
-- Puis réexécuter le script
```

### Erreur: "permission denied"
```sql
-- Vérifier que vous êtes connecté en tant que propriétaire
-- Ou utiliser le service_role_key
```

---

## 📊 Comparaison des Données

### Avant Migration
```
products: X produits (avec champs non utilisés)
orders: Y commandes (structure complexe)
profiles: Z utilisateurs
```

### Après Migration
```
products: 0 produits (à réimporter)
orders: 0 commandes (historique perdu)
users: 1 admin (à créer)
```

---

## ⚡ Migration Rapide (Sans Sauvegarde)

Si vous n'avez pas de données importantes :

```sql
-- 1. Copier tout SCHEMA_CLEAN.sql
-- 2. Coller dans SQL Editor
-- 3. Exécuter
-- 4. Créer un admin
-- 5. Tester
```

---

## ✅ Checklist

- [ ] Données sauvegardées (si nécessaire)
- [ ] Script SCHEMA_CLEAN.sql exécuté
- [ ] Tables créées (users, products, orders)
- [ ] Politiques RLS actives
- [ ] Bucket "products" créé
- [ ] Politiques storage actives
- [ ] Utilisateur admin créé
- [ ] Test de login réussi
- [ ] Test d'ajout de produit réussi
- [ ] Upload d'image fonctionnel

---

## 🎯 Résultat Final

**Base de données propre et alignée avec l'application !**

- ✅ Tables simplifiées
- ✅ Champs utilisés uniquement
- ✅ Pas de données de test
- ✅ Politiques RLS correctes
- ✅ Storage configuré
- ✅ Prêt pour la production

---

**Migration terminée ! 🚀**
