# DNAStore - E-commerce Next.js

Bienvenue sur le dépôt de **DNAStore**, une plateforme e-commerce moderne avec design iOS 26 Liquid Glass.

## 🚀 Fonctionnalités

### Frontend Public
*   **Design iOS 26 Liquid Glass** : Effets vitreux, backdrop-blur, dégradés, animations fluides
*   **Header Auto-Hide** : Disparaît au scroll pour maximiser l'espace
*   **Catalogue Pinterest** : Affichage masonry responsive des produits
*   **Filtres & Recherche** : Recherche en temps réel et filtres par catégorie
*   **Panier Dynamique** : Gestion en temps réel avec localStorage et images
*   **Commande WhatsApp** : Processus simplifié avec message pré-rempli
*   **Réservation Stock** : Système de réservation 24h automatique
*   **Pages Légales** : Conditions d'utilisation et Confidentialité
*   **Configuration Centralisée** : Contacts modifiables via JSON
*   **Responsive** : Mobile, Tablette, Desktop optimisé

### Dashboard Admin
*   **Authentification** : Connexion sécurisée avec Supabase Auth
*   **Dashboard Amélioré** : Statistiques en temps réel avec graphiques
*   **Gestion Produits** : CRUD complet avec upload d'images (Supabase Storage)
*   **Gestion Commandes** : Liste, filtres, changement de statut direct
*   **Gestion Stock Automatique** : Réservation 24h et restitution auto
*   **Graphiques Ventes** : Évolution des ventes avec filtres (7j/30j/1an)
*   **Cron Jobs** : Expiration automatique des réservations

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
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.js
│   │   │   ├── EmptyState.js
│   │   │   ├── ImageUpload.js
│   │   │   ├── OrdersChart.js
│   │   │   ├── PageHeader.js
│   │   │   └── StatusBadge.js
│   │   ├── Background.js
│   │   ├── CartItem.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   └── Layout.js
│   ├── config/
│   │   ├── contacts.json (Configuration centralisée)
│   │   └── index.js (Helpers)
│   ├── lib/
│   │   ├── cart.js
│   │   ├── storage.js
│   │   ├── supabase.js
│   │   └── validation.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── commandes/index.js
│   │   │   ├── produits/
│   │   │   ├── dashboard.js
│   │   │   └── login.js
│   │   ├── api/cron/expire-reservations.js
│   │   ├── produit/[id].js
│   │   ├── index.js
│   │   ├── produits.js
│   │   ├── panier.js
│   │   ├── contact.js
│   │   ├── a-propos.js
│   │   ├── conditions.js
│   │   └── confidentialite.js
│   └── styles/
│       └── globals.css
├── vercel.json (Cron configuration)
├── .env.local
├── .gitignore
└── package.json
```

## 📚 Documentation

*   [SETUP.md](./SETUP.md) - Configuration Supabase (tables, RLS, storage)
*   [ROADMAP.md](./ROADMAP.md) - Plan de développement et fonctionnalités

## ⚙️ Configuration

### Contacts
Tous les contacts du site sont centralisés dans `src/config/contacts.json` :
```json
{
  "phone": "+226 00 00 00 00",
  "phoneRaw": "22600000000",
  "email": "contact@dnastore.bf",
  "social": { "facebook": "#", "instagram": "#" }
}
```
Modifiez ce fichier pour mettre à jour tous les contacts sur le site.

## 🎯 Pages Admin

### Accès
*   URL : `/admin/login`
*   Email : Configuré dans Supabase Auth
*   Rôle : `admin` dans la table `users`

### Fonctionnalités
*   **Dashboard** : Statistiques en temps réel + graphiques ventes
*   **Produits** : CRUD complet avec upload d'images
*   **Commandes** : Liste, filtres et changement de statut direct
*   **Gestion Stock** : Réservation automatique 24h

## 🔄 Système de Réservation

- Commande créée → Stock réservé pendant 24h
- Après 24h → Annulation auto + restitution stock
- Confirmée/Expédiée/Livrée → Stock définitivement déduit
- Annulée → Stock restitué immédiatement

## 🚀 Déploiement

### Vercel
```bash
vercel --prod
```

Le fichier `vercel.json` configure le cron job pour l'expiration des réservations (toutes les heures).

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour DNAStore - Burkina Faso**
