# 🧬 DNA Store

![DNA Store Logo](./Geminlogo%20(1).png)

**DNA Store** est une plateforme e-commerce moderne développée avec Next.js (Page Router), Tailwind CSS et Supabase. Elle permet aux clients de parcourir des produits, de passer des commandes via WhatsApp, et offre un espace d'administration complet pour gérer les produits et les commandes.

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [Base de données](#-base-de-données)
- [Sécurité](#-sécurité)
- [Déploiement](#-déploiement)
- [Utilisation](#-utilisation)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## ✨ Fonctionnalités

### Frontend Public (Sans compte utilisateur)

- **Page d'accueil** : Présentation du logo DNA Store et mise en avant des produits
- **Catalogue produits** (`/produits`) : Liste complète des produits disponibles
- **Fiche produit** (`/produit/[id]`) :
  - Affichage détaillé (nom, description, prix, image)
  - Ajout au panier (stockage localStorage)
  - Commande directe via WhatsApp
- **Panier** (`/panier`) :
  - Gestion des quantités
  - Suppression d'articles
  - Calcul du total
  - Formulaire de commande :
    - Numéro de téléphone
    - Localisation (Ouaga ou ailleurs)
    - Mode de livraison (Livraison/Retrait)
  - Commande groupée via WhatsApp

### Espace Admin Sécurisé

- **Authentification** (`/admin/login`) :
  - Connexion sécurisée via Supabase Auth
  - Protection par middleware Next.js
- **Dashboard** (`/admin/dashboard`) :
  - **CRUD Produits** : Création, modification, suppression
  - **Gestion des commandes** :
    - Liste complète avec recherche par code
    - Mise à jour du statut (en attente → traitée)
  - Interface intuitive et responsive

### Design & UX

- **Responsive Design** : Optimisé pour mobile, tablette et desktop
- **Palette de couleurs** :
  - 🖤 Noir : Structure et élégance
  - 🔵 Bleu : Confiance et professionnalisme
  - 🔴 Rouge : Accents et call-to-action
- **Navigation** :
  - Header avec logo et icône panier
  - Menu burger sur mobile
- **Accessibilité** : Boutons clairs et navigation intuitive

---

## 🛠 Technologies utilisées

| Technologie | Usage |
|------------|-------|
| **Next.js 14** | Framework React (Page Router) |
| **Tailwind CSS** | Styling et design responsive |
| **Supabase** | Backend (BaaS), authentification, base de données PostgreSQL |
| **TypeScript** | Typage statique (optionnel) |
| **React** | Bibliothèque UI |
| **localStorage** | Gestion du panier côté client |

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.x
- **npm** ou **yarn** ou **pnpm**
- Un compte **Supabase** (gratuit)
- Un compte **Vercel** (pour le déploiement)

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/dna-store.git
cd dna-store
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+226XXXXXXXX

# Admin (optionnel, pour limite de tentatives)
ADMIN_LOGIN_MAX_ATTEMPTS=5
```

### 4. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ Configuration

### Configuration Supabase

#### 1. Créer les tables

Exécutez les requêtes SQL suivantes dans l'éditeur SQL de Supabase :

```sql
-- Table products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  code TEXT UNIQUE NOT NULL,
  category TEXT,
  sizes TEXT[], -- Array de tailles (ex: ['37','38','39','40'])
  colors TEXT[], -- Array de couleurs (ex: ['Rouge','Bleu','Noir'])
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_code TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'en attente' CHECK (status IN ('en attente', 'traitée')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table users (pour les admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Configurer Row Level Security (RLS)

```sql
-- Activer RLS sur les tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politique pour products (lecture publique, écriture admin uniquement)
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Politique pour orders (lecture/écriture admin uniquement)
CREATE POLICY "Only admins can view orders" ON orders
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Only admins can insert orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Only admins can update orders" ON orders
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Politique pour users (lecture admin uniquement)
CREATE POLICY "Only admins can view users" ON users
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );
```

#### 3. Créer un utilisateur admin

Dans Supabase Auth, créez un utilisateur puis ajoutez-le à la table `users` :

```sql
INSERT INTO users (id, email, role)
VALUES ('uuid-de-l-utilisateur-auth', 'admin@dnastore.com', 'admin');
```

---

## 📁 Structure du projet

```
dna-store/
├── public/
│   ├── Geminlogo (1).png      # Logo DNA Store
│   └── ...
├── src/
│   ├── pages/
│   │   ├── index.js           # Page d'accueil
│   │   ├── produits.js        # Liste des produits
│   │   ├── produit/
│   │   │   └── [id].js        # Fiche produit
│   │   ├── panier.js          # Page panier
│   │   ├── admin/
│   │   │   ├── login.js       # Connexion admin
│   │   │   └── dashboard.js   # Dashboard admin
│   │   ├── _app.js            # Configuration globale
│   │   └── _document.js       # Document HTML personnalisé
│   ├── components/
│   │   ├── Header.js          # En-tête avec logo et panier
│   │   ├── ProductCard.js     # Carte produit
│   │   ├── CartItem.js        # Item du panier
│   │   └── ...
│   ├── lib/
│   │   ├── supabase.js        # Client Supabase
│   │   └── cart.js            # Utilitaires panier (localStorage)
│   ├── middleware.js          # Protection routes admin
│   └── styles/
│       └── globals.css        # Styles globaux + Tailwind
├── .env.local                 # Variables d'environnement (non versionné)
├── .env.example               # Exemple de variables d'environnement
├── next.config.js             # Configuration Next.js
├── tailwind.config.js         # Configuration Tailwind
├── package.json
└── README.md
```

---

## 🗄 Base de données

### Schéma des tables

#### Table `products`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique généré automatiquement (clé primaire) |
| `name` | TEXT | Nom du produit (ex. "Chemise en coton") |
| `description` | TEXT | Détails du produit (matière, taille, caractéristiques) |
| `price` | DECIMAL | Prix du produit (en FCFA ou autre devise) |
| `stock` | INTEGER | Quantité disponible en stock |
| `image_url` | TEXT | URL de l'image du produit (hébergée sur Supabase Storage) |
| `code` | TEXT | Code unique du produit (ex: DN1234) utilisé pour les commandes WhatsApp |
| `category` | TEXT | Catégorie (ex. "Vêtements", "Chaussures") |
| `sizes` | TEXT[] | Liste des tailles disponibles (ex: ["37","38","39","40"]) |
| `colors` | TEXT[] | Liste des couleurs disponibles (ex: ["Rouge","Bleu","Noir"]) |
| `created_at` | TIMESTAMP | Date d'ajout du produit |

#### Table `orders`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (PK) |
| `product_code` | TEXT | Code du produit commandé |
| `message` | TEXT | Message WhatsApp généré |
| `status` | TEXT | Statut (`en attente`, `traitée`) |
| `created_at` | TIMESTAMP | Date de commande |

#### Table `users`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (PK) |
| `email` | TEXT | Email de l'admin |
| `role` | TEXT | Rôle (`admin`) |
| `created_at` | TIMESTAMP | Date de création |

---

## 🔒 Sécurité

### Mesures implémentées

1. **Authentification Supabase** :
   - Gestion sécurisée des sessions
   - Cookies `HttpOnly`, `Secure`, `SameSite`

2. **Middleware Next.js** :
   - Protection automatique des routes `/admin/*`
   - Redirection vers `/admin/login` si non authentifié

3. **Row Level Security (RLS)** :
   - Seuls les admins peuvent modifier les données
   - Lecture publique limitée aux produits

4. **Content Security Policy (CSP)** :
   - Protection contre XSS
   - Configuration dans `next.config.js`

5. **Limite de tentatives de login** :
   - Protection contre les attaques par force brute
   - Configurable via variable d'environnement

6. **Validation des données** :
   - Côté client et serveur
   - Sanitisation des inputs

---

## 🌐 Déploiement

### Déploiement sur Vercel

1. **Connecter le repository GitHub** :
   - Créez un repository sur GitHub
   - Poussez votre code :
     ```bash
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```

2. **Déployer sur Vercel** :
   - Connectez-vous sur [vercel.com](https://vercel.com)
   - Importez votre repository
   - Configurez les variables d'environnement :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`

3. **Déployer** :
   - Vercel détecte automatiquement Next.js
   - Le déploiement se fait automatiquement

### Configuration post-déploiement

- Vérifiez que les variables d'environnement sont correctes
- Testez l'authentification admin
- Vérifiez les politiques RLS sur Supabase

---

## 📖 Utilisation

### Pour les clients

1. **Parcourir les produits** :
   - Visitez `/produits` pour voir le catalogue
   - Cliquez sur un produit pour voir les détails

2. **Ajouter au panier** :
   - Sur la fiche produit, cliquez sur "Ajouter au panier"
   - Le panier est sauvegardé localement

3. **Passer commande** :
   - Accédez à `/panier`
   - Remplissez le formulaire (téléphone, localisation, mode de livraison)
   - Cliquez sur "Commander via WhatsApp"
   - Validez la commande sur WhatsApp

### Pour les administrateurs

1. **Se connecter** :
   - Accédez à `/admin/login`
   - Entrez vos identifiants Supabase

2. **Gérer les produits** :
   - Ajoutez, modifiez ou supprimez des produits
   - Mettez à jour les stocks et les prix

3. **Gérer les commandes** :
   - Consultez la liste des commandes
   - Recherchez par code produit
   - Mettez à jour le statut (en attente → traitée)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 📞 Contact

**DNA Store** - [contact@dnastore.com](mailto:contact@dnastore.com)

Lien du projet : [https://github.com/votre-username/dna-store](https://github.com/votre-username/dna-store)

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

---

**Développé avec ❤️ pour DNA Store**
