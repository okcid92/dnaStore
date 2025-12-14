# 🎨 Guide de Style - DNA Store (iOS 26 Liquid Glass)

## 🌟 Concept

Le design s'inspire du style **iOS 26 Liquid Glass** avec :
- Effets de verre (glassmorphism)
- Backdrop blur
- Dégradés subtils
- Ombres douces
- Coins arrondis (rounded-3xl)
- Transitions fluides

---

## 🎨 Classes CSS Principales

### Glass Effects

```css
.glass
/* Effet de verre standard */
bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl

.glass-dark
/* Effet de verre sombre */
bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-2xl

.card-glass
/* Carte avec effet de verre */
glass rounded-3xl p-6 hover:shadow-2xl transition-all hover:scale-[1.02]

.input-glass
/* Input avec effet de verre */
glass px-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500/50
```

### Boutons

```css
.btn-primary
/* Bouton principal avec dégradé bleu */
bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg

.btn-secondary
/* Bouton secondaire avec dégradé rouge */
bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg

.btn-outline
/* Bouton outline avec effet de verre */
glass border-2 rounded-2xl
```

### Dégradés de Texte

```css
bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
```

---

## 🎯 Utilisation

### Cartes
```jsx
<div className="card-glass">
  {/* Contenu */}
</div>
```

### Inputs
```jsx
<input className="input-glass" />
<textarea className="input-glass" />
<select className="input-glass" />
```

### Boutons
```jsx
<button className="btn-primary">Action</button>
<button className="btn-secondary">Danger</button>
<button className="btn-outline">Outline</button>
```

### Prix avec Dégradé
```jsx
<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  15000 FCFA
</span>
```

---

## 🌈 Palette de Couleurs

### Fond
- Dégradé : `from-gray-50 via-blue-50 to-purple-50`

### Primaires
- Bleu : `from-blue-500 to-blue-600`
- Rouge : `from-red-500 to-pink-600`
- Violet : `from-blue-600 to-purple-600`

### Glass
- Blanc : `bg-white/70`
- Noir : `bg-gray-900/70`
- Couleurs : `bg-blue-500/10`, `bg-red-500/20`

---

## ✨ Effets Spéciaux

### Hover
```css
hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
```

### Focus
```css
focus:ring-2 focus:ring-blue-500/50
```

### Backdrop Blur
```css
backdrop-blur-xl
backdrop-blur-sm
```

---

## 📱 Responsive

Tous les composants sont responsive avec :
- Mobile first
- Breakpoints Tailwind (sm, md, lg, xl)
- Grid adaptatif
- Padding/margin responsive

---

## 🎭 Animations

### Slide Up (Toast)
```css
animate-slide-up
```

### Transitions
```css
transition-all duration-300
```

---

## 💡 Bonnes Pratiques

1. **Toujours utiliser `card-glass`** pour les conteneurs
2. **Utiliser `input-glass`** pour tous les inputs
3. **Préférer les dégradés** pour les textes importants
4. **Arrondir les coins** : `rounded-2xl` ou `rounded-3xl`
5. **Ajouter du blur** : `backdrop-blur-xl`
6. **Ombres douces** : `shadow-lg` ou `shadow-2xl`

---

## 🚀 Exemples Complets

### Carte Produit
```jsx
<div className="card-glass overflow-hidden">
  <div className="glass rounded-2xl">
    <Image src={product.image} />
  </div>
  <div className="p-4">
    <h3>{product.name}</h3>
    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {product.price} FCFA
    </span>
  </div>
</div>
```

### Formulaire
```jsx
<form className="card-glass">
  <input className="input-glass" placeholder="Nom" />
  <input className="input-glass" placeholder="Email" />
  <button className="btn-primary w-full">Envoyer</button>
</form>
```

---

**Style iOS 26 Liquid Glass appliqué partout ! ✨**
