# 🚀 Guide de démarrage DNA Store

## 1. Installation des dépendances

```bash
npm install
```

## 2. Configuration Supabase

### Créer un projet Supabase
1. Allez sur https://supabase.com
2. Créez un nouveau projet
3. Récupérez l'URL et les clés API

### Configurer .env.local
Remplissez le fichier `.env.local` avec vos clés :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
NEXT_PUBLIC_WHATSAPP_NUMBER=+226XXXXXXXX
```

### Créer les tables (SQL Editor dans Supabase)

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
  sizes TEXT[],
  colors TEXT[],
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

-- Table users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politiques products
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can insert products" ON products FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Only admins can update products" ON products FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Only admins can delete products" ON products FOR DELETE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Politiques orders
CREATE POLICY "Only admins can view orders" ON orders FOR SELECT USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Only admins can insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Only admins can update orders" ON orders FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Politiques users
CREATE POLICY "Only admins can view users" ON users FOR SELECT USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
```

### Créer un utilisateur admin

1. Dans Supabase Auth, créez un utilisateur
2. Récupérez son UUID
3. Ajoutez-le à la table users :

```sql
INSERT INTO users (id, email, role)
VALUES ('uuid-de-l-utilisateur', 'admin@dnastore.com', 'admin');
```

## 3. Lancer le projet

```bash
npm run dev
```

Ouvrez http://localhost:3000

## 4. Tester

- Frontend : http://localhost:3000
- Admin : http://localhost:3000/admin/login
