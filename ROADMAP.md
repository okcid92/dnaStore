# 🗺️ Roadmap DNAStore

Ce document trace la feuille de route pour le développement et l'évolution de la plateforme DNAStore.

## ✅ Terminé (Phase 1 : Refonte UI & MVP)

- [x] **Refonte complète du Design System**
    - [x] Intégration de la charte graphique "Liquid Glass" (Dark/Light mode).
    - [x] Configuration Tailwind CSS avancée (couleurs, polices, animations).
    - [x] Installation et configuration de AOS (Animate On Scroll).
- [x] **Page d'Accueil**
    - [x] Hero section immersive avec animations.
    - [x] Grille produits "Pinterest-style" sur mobile.
    - [x] Sections : Pourquoi nous, Livraison, Avis, FAQ.
- [x] **Navigation & Layout**
    - [x] Header responsive avec menu burger et effet verre.
    - [x] Footer complet.
- [x] **Page Produit**
    - [x] Route dynamique `/produits/[slug]`.
    - [x] Galerie d'images interactive.
    - [x] Sélecteur de taille et détails produits.
- [x] **Panier & Commande**
    - [x] Page panier redesignée.
    - [x] Logique de panier (localStorage).
    - [x] Intégration commande WhatsApp.
- [x] **Page Contact**
    - [x] Formulaire de contact redesigné.

## 🚧 En Cours (Phase 2 : Backend & Données)

- [ ] **Intégration Supabase**
    - [ ] Création des tables SQL (Produits, Catégories, Commandes).
    - [ ] Connexion du client Supabase dans Next.js.
    - [ ] Remplacement des données mockées par les données réelles.
- [ ] **Gestion des Stocks**
    - [ ] Affichage dynamique du stock.
    - [ ] Gestion des ruptures de stock.

## 📅 Futur (Phase 3 : Fonctionnalités Avancées)

- [ ] **Authentification Utilisateur**
    - [ ] Connexion/Inscription (Email, Google).
    - [ ] Historique des commandes.
    - [ ] Liste de souhaits (Wishlist).
- [ ] **Tableau de Bord Admin**
    - [ ] Interface pour ajouter/modifier des produits.
    - [ ] Suivi des commandes.
- [ ] **Recherche & Filtres**
    - [ ] Barre de recherche avancée.
    - [ ] Filtres par prix, taille, couleur.
- [ ] **SEO & Performance**
    - [ ] Optimisation des métadonnées pour chaque produit.
    - [ ] Génération de Sitemap dynamique.
    - [ ] Optimisation des images (Next/Image).

## 💡 Idées pour plus tard

- [ ] Blog / Actualités Streetwear.
- [ ] Programme de fidélité.
- [ ] Intégration paiement mobile (Orange Money, Moov Money) via API.
