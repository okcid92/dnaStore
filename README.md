# DNAStore - E-commerce Next.js

Bienvenue sur le dépôt de **DNAStore**, une plateforme e-commerce moderne avec design iOS 26 Liquid Glass.

## 🚀 Fonctionnalités

### Frontend Public
*   **Design iOS 26 Liquid Glass** : Effets vitreux, backdrop-blur, dégradés, animations fluides
*   **Catalogue Interactif** : Produits avec images, filtres, recherche
*   **Panier Dynamique** : Gestion en temps réel avec localStorage
*   **Commande WhatsApp** : Processus simplifié avec message pré-rempli
*   **Pages** : Accueil, Produits, Panier, Contact, À propos
*   **Responsive** : Mobile, Tablette, Desktop

### Dashboard Admin
*   **Authentification** : Connexion sécurisée avec Supabase Auth
*   **Dashboard** : Statistiques en temps réel (produits, commandes, en attente)
*   **Gestion Produits** : CRUD complet avec upload d'images (Supabase Storage)
*   **Gestion Commandes** : Liste, filtres, mise à jour des statuts
*   **Composants Réutilisables** : StatusBadge, PageHeader, EmptyState, ImageUpload

## 🛠 Technologies

*   **Framework** : [Next.js](https://nextjs.org/) 14 (Page Router)
*   **Styling** : [Tailwind CSS](https://tailwindcss.com/) (iOS 26 Liquid Glass)
*   **Base de données** : [Supabase](https://supabase.com/) (PostgreSQL)
*   **Storage** : Supabase Storage (images produits)
*   **Auth** : Supabase Auth (admin)
*   **Icônes** : [FontAwesome](https://fontawesome.com/)

## 📦 Installation

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-username/dnastore.git
    cd dnastore
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Configurer l'environnement** :
    Créez un fichier `.env.local` à la racine :
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
    SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
    NEXT_PUBLIC_WHATSAPP_NUMBER=+226XXXXXXXX
    ```

4.  **Configurer Supabase** :
    Voir [SETUP.md](./SETUP.md) pour créer les tables et configurer le storage

5.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

6.  **Ouvrir le navigateur** :
    *   Frontend : [http://localhost:3000](http://localhost:3000)
    *   Admin : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📂 Structure du Projet

```
DNAstore/
├── public/
│   ├── Geminlogo (1).png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.js
│   │   │   ├── EmptyState.js
│   │   │   ├── ImageUpload.js
│   │   │   ├── PageHeader.js
│   │   │   └── StatusBadge.js
│   │   ├── CartItem.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── Loading.js
│   │   ├── ProductCard.js
│   │   └── Toast.js
│   ├── lib/
│   │   ├── cart.js
│   │   ├── storage.js
│   │   ├── supabase.js
│   │   └── validation.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── commandes/
│   │   │   │   └── index.js
│   │   │   ├── produits/
│   │   │   │   ├── modifier/
│   │   │   │   │   └── [id].js
│   │   │   │   ├── ajouter.js
│   │   │   │   └── index.js
│   │   │   ├── dashboard.js
│   │   │   └── login.js
│   │   ├── produit/
│   │   │   └── [id].js
│   │   ├── index.js
│   │   ├── produits.js
│   │   ├── panier.js
│   │   ├── contact.js
│   │   ├── a-propos.js
│   │   ├── 404.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── _error.js
│   └── styles/
│       └── globals.css
├── .env.local
├── .env.example
├── .gitignore
├── jsconfig.json
├── middleware.js
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## 📚 Documentation

*   [SETUP.md](./SETUP.md) - Configuration Supabase (tables, RLS, storage)
*   [ROADMAP.md](./ROADMAP.md) - Plan de développement
*   [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Guide du style iOS 26 Liquid Glass
*   [REFACTORING.md](./REFACTORING.md) - Optimisations effectuées
*   [COHERENCE.md](./COHERENCE.md) - Corrections de cohérence
*   [SUPABASE_STORAGE_GUIDE.md](./SUPABASE_STORAGE_GUIDE.md) - Configuration du storage

## 🎯 Pages Admin

### Accès
*   URL : `/admin/login`
*   Email : Configuré dans Supabase Auth
*   Rôle : `admin` dans la table `users`

### Fonctionnalités
*   **Dashboard** : Statistiques en temps réel
*   **Produits** : CRUD complet avec upload d'images
*   **Commandes** : Liste et gestion des statuts

## 🚀 Déploiement

Voir [DEPLOY.md](./DEPLOY.md) pour déployer sur Vercel.

## 📄 Licence

Ce projet est sous licence MIT.
