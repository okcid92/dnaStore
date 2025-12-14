# DNAStore - E-commerce Next.js

Bienvenue sur le dépôt de **DNAStore**, une plateforme e-commerce moderne spécialisée dans la vente de sneakers et vêtements streetwear au Burkina Faso.

![DNAStore Preview](https://via.placeholder.com/800x400?text=DNAStore+Preview)

## 🚀 Fonctionnalités

*   **Design Premium & Moderne** : Interface utilisateur soignée avec effets "Liquid Glass", animations fluides (AOS) et mode sombre/clair.
*   **Catalogue Interactif** : Présentation des produits avec galerie d'images, badges (Nouveau, Stock limité) et notes.
*   **Panier Dynamique** : Gestion du panier en temps réel (ajout, suppression, modification des quantités) avec persistance locale.
*   **Commande via WhatsApp** : Processus de commande simplifié redirigeant vers WhatsApp avec un message pré-rempli contenant les détails de la commande.
*   **Pages Détaillées** :
    *   **Accueil** : Hero section immersive, collections, témoignages, FAQ.
    *   **Produit** : Page détail avec zoom image, sélection de taille et infos logistiques.
    *   **Panier** : Récapitulatif clair et formulaire de commande.
    *   **Contact** : Informations de contact et formulaire rapide.
*   **Responsive Design** : Optimisé pour tous les écrans (Mobile, Tablette, Desktop).

## 🛠 Technologies

*   **Framework** : [Next.js](https://nextjs.org/) (React)
*   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
*   **Icônes** : [FontAwesome](https://fontawesome.com/)
*   **Animations** : [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
*   **Base de données (Future)** : Supabase (Schéma SQL prêt)

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
    Créez un fichier `.env.local` à la racine et ajoutez votre numéro WhatsApp :
    ```env
    NEXT_PUBLIC_WHATSAPP_NUMBER=22600000000
    ```

4.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

5.  **Ouvrir le navigateur** :
    Rendez-vous sur [http://localhost:3000](http://localhost:3000).

## 📂 Structure du Projet

```
dnastore/
├── public/             # Images et fichiers statiques
├── src/
│   ├── components/     # Composants réutilisables (Header, Footer, CartItem...)
│   ├── lib/            # Logique métier (cart.js, supabase.js...)
│   ├── pages/          # Routes de l'application
│   │   ├── index.js    # Page d'accueil
│   │   ├── panier.js   # Page panier
│   │   ├── contact.js  # Page contact
│   │   └── produits/   # Pages produits dynamiques
│   └── styles/         # Styles globaux (Tailwind, CSS variables)
├── tailwind.config.js  # Configuration Tailwind
└── package.json        # Dépendances
```

## 🔮 Roadmap

Voir le fichier [ROADMAP.md](./ROADMAP.md) pour les futures évolutions.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.
