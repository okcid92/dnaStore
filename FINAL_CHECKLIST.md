# ✅ Checklist Finale - DNA Store

## 📦 Avant de Commencer

- [ ] Node.js installé (version 18+)
- [ ] npm ou yarn installé
- [ ] Compte Supabase créé
- [ ] Compte Vercel créé (pour déploiement)

---

## 🔧 Configuration Initiale

### 1. Installation des Dépendances

```bash
cd DNAstore
npm install
```

### 2. Configuration Supabase

- [ ] Créer un projet sur supabase.com
- [ ] Copier l'URL du projet
- [ ] Copier la clé `anon/public`
- [ ] Copier la clé `service_role`
- [ ] Exécuter les scripts SQL (voir SETUP.md)
- [ ] Créer un utilisateur admin dans Auth
- [ ] Ajouter l'utilisateur dans la table `users`

### 3. Variables d'Environnement

Remplir `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_WHATSAPP_NUMBER=+226XXXXXXXX
```

---

## 🧪 Tests Locaux

### 1. Lancer le Serveur

```bash
npm run dev
```

Ouvrir http://localhost:3000

### 2. Tester les Fonctionnalités

#### Frontend Public
- [ ] Page d'accueil s'affiche correctement
- [ ] Logo DNA Store visible
- [ ] Navigation fonctionne
- [ ] Page produits affiche la liste (vide au début)
- [ ] Recherche fonctionne
- [ ] Filtres fonctionnent
- [ ] Panier affiche "vide" au début
- [ ] Compteur panier dans le header

#### Admin
- [ ] Accès à /admin/login
- [ ] Connexion avec email/mot de passe
- [ ] Redirection vers dashboard après connexion
- [ ] Dashboard affiche les statistiques (0 au début)
- [ ] Accès à la gestion des produits
- [ ] Formulaire d'ajout de produit fonctionne
- [ ] Ajout d'un produit de test
- [ ] Modification du produit
- [ ] Suppression du produit
- [ ] Accès à la gestion des commandes
- [ ] Déconnexion fonctionne

#### Workflow Complet
- [ ] Ajouter un produit via admin
- [ ] Voir le produit sur /produits
- [ ] Cliquer sur le produit
- [ ] Sélectionner taille/couleur (si configuré)
- [ ] Ajouter au panier
- [ ] Voir le compteur panier s'incrémenter
- [ ] Aller sur /panier
- [ ] Modifier la quantité
- [ ] Remplir le formulaire de commande
- [ ] Cliquer sur "Commander via WhatsApp"
- [ ] Vérifier que WhatsApp s'ouvre avec le bon message

---

## 📱 Tests Responsive

- [ ] Tester sur mobile (Chrome DevTools)
- [ ] Menu burger fonctionne
- [ ] Toutes les pages sont lisibles
- [ ] Boutons cliquables
- [ ] Formulaires utilisables

---

## 🔒 Tests de Sécurité

- [ ] Impossible d'accéder à /admin/dashboard sans connexion
- [ ] Redirection vers /admin/login si non connecté
- [ ] Déconnexion fonctionne
- [ ] RLS empêche la modification directe en BDD

---

## 🚀 Déploiement

### 1. Préparer le Code

- [ ] Supprimer les console.log
- [ ] Vérifier qu'il n'y a pas d'erreurs
- [ ] Tester le build

```bash
npm run build
npm run start
```

### 2. GitHub

- [ ] Créer un repository
- [ ] Push le code

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/dna-store.git
git push -u origin main
```

### 3. Vercel

- [ ] Connecter le repository
- [ ] Configurer les variables d'environnement
- [ ] Déployer
- [ ] Tester le site en production

### 4. Post-Déploiement

- [ ] Mettre à jour les URLs dans Supabase
- [ ] Tester toutes les fonctionnalités en production
- [ ] Vérifier WhatsApp fonctionne
- [ ] Vérifier l'admin fonctionne

---

## 📊 Données de Test

### Produit de Test

```
Nom: Chemise Bleue
Description: Belle chemise en coton
Prix: 15000
Stock: 10
Code: DN001
Catégorie: Vêtements
Tailles: 38, 40, 42
Couleurs: Bleu, Blanc
```

### Commande de Test

```
Téléphone: +226 70 00 00 00
Localisation: Ouagadougou
Mode: Livraison
Adresse: Secteur 15, Rue 12.34
```

---

## 🎯 Critères de Succès

### Fonctionnel
- ✅ Les clients peuvent voir les produits
- ✅ Les clients peuvent ajouter au panier
- ✅ Les clients peuvent commander via WhatsApp
- ✅ Les admins peuvent se connecter
- ✅ Les admins peuvent gérer les produits
- ✅ Les admins peuvent voir les commandes

### Technique
- ✅ Le site est responsive
- ✅ Pas d'erreurs console
- ✅ Le site charge rapidement
- ✅ Les images s'affichent
- ✅ La navigation est fluide

### Sécurité
- ✅ Les routes admin sont protégées
- ✅ RLS configuré
- ✅ Variables d'environnement sécurisées
- ✅ HTTPS activé (en production)

---

## 🐛 Problèmes Courants

### Le site ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreur Supabase
- Vérifier les clés dans .env.local
- Vérifier que les tables existent
- Vérifier que RLS est configuré

### Images ne s'affichent pas
- Vérifier l'URL de l'image
- Vérifier la configuration dans next.config.js

### WhatsApp ne s'ouvre pas
- Vérifier le numéro dans .env.local
- Vérifier le format : +226XXXXXXXX

---

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifier les logs dans la console
2. Vérifier les logs Vercel (en production)
3. Vérifier les logs Supabase
4. Consulter la documentation :
   - [Next.js](https://nextjs.org/docs)
   - [Supabase](https://supabase.com/docs)
   - [Tailwind](https://tailwindcss.com/docs)

---

## 🎉 Projet Terminé !

Une fois tous les tests passés, votre site DNA Store est prêt à être utilisé ! 🚀

**Bon courage ! 💪**
