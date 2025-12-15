// Test de connexion Supabase
// Exécuter avec: node test-auth.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ebdgcivgoliqxltfucmd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZGdjaXZnb2xpcXhsdGZ1Y21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzcxMjAsImV4cCI6MjA4MTMxMzEyMH0.dDfvQVzwsfej6Olz-Q6RcLK4QBeqJceoFVpfzwMnxzw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testAuth() {
  console.log('🔍 Test de connexion Supabase...\n');
  
  const email = 'dickoalou04@gmail.com'; // Changez avec votre email
  const password = 'mon926732dna'; // Changez avec votre mot de passe
  
  console.log(`Email: ${email}`);
  console.log(`URL: ${SUPABASE_URL}\n`);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Code:', error.status);
  } else {
    console.log('✅ Connexion réussie!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
  }
}

testAuth();
