# 🚀 Guide de Déploiement DNA Store

## Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Projet Supabase configuré

---

## 📋 Étapes de Déploiement

### 1. Préparer le Repository GitHub

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - DNA Store"

# Créer un repository sur GitHub puis :
git remote add origin https://github.com/votre-username/dna-store.git
git branch -M main
git push -u origin main
```

---

### 2. Déployer sur Vercel

#### Option A : Via le site Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
NEXT_PUBLIC_WHATSAPP_NUMBER=+226XXXXXXXX
```

5. Cliquez sur "Deploy"

#### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER

# Déployer en production
vercel --prod
```

---

### 3. Configuration Post-Déploiement

#### Mettre à jour les URLs dans Supabase

1. Allez dans votre projet Supabase
2. Settings > Authentication > Site URL
3. Ajoutez votre URL Vercel : `https://votre-app.vercel.app`
4. Ajoutez aussi dans "Redirect URLs"

#### Mettre à jour sitemap.xml

Remplacez `https://votre-domaine.com` par votre URL Vercel dans :
- `public/sitemap.xml`
- `public/robots.txt`

---

### 4. Tests Post-Déploiement

- [ ] Vérifier que le site charge correctement
- [ ] Tester la navigation
- [ ] Tester l'ajout au panier
- [ ] Tester la commande WhatsApp
- [ ] Tester la connexion admin
- [ ] Tester le CRUD produits
- [ ] Tester sur mobile

---

### 5. Configuration du Domaine Personnalisé (Optionnel)

1. Dans Vercel, allez dans Settings > Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions Vercel
4. Attendez la propagation DNS (quelques heures)

---

## 🔄 Déploiement Continu

Chaque push sur la branche `main` déclenchera automatiquement un nouveau déploiement sur Vercel.

```bash
# Faire des modifications
git add .
git commit -m "Description des changements"
git push origin main
```

---

## 🐛 Dépannage

### Erreur de build

```bash
# Tester le build localement
npm run build
npm run start
```

### Variables d'environnement manquantes

Vérifiez dans Vercel > Settings > Environment Variables

### Erreur Supabase

Vérifiez que les URLs de redirection sont correctement configurées dans Supabase

---

## 📊 Monitoring

### Vercel Analytics

Activez Vercel Analytics pour suivre :
- Nombre de visiteurs
- Performance du site
- Erreurs

### Logs

Consultez les logs dans Vercel > Deployments > [Votre déploiement] > Logs

---

## 🔒 Sécurité

- ✅ HTTPS activé automatiquement par Vercel
- ✅ Variables d'environnement sécurisées
- ✅ Headers de sécurité configurés
- ✅ RLS activé sur Supabase

---

## 📈 Optimisations

### Performance

- Images optimisées avec Next.js Image
- CSS/JS minifiés automatiquement
- Compression gzip activée

### SEO

- Meta tags configurés
- Sitemap.xml présent
- Robots.txt configuré

---

## 🎉 Félicitations !

Votre site DNA Store est maintenant en ligne ! 🚀

**URL de production** : https://votre-app.vercel.app
**Admin** : https://votre-app.vercel.app/admin/login
