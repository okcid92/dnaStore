  import { useState } from 'react'
import { useRouter } from 'next/router'
import Background from '@/components/Background'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <Background />
      
      <div className="liquid-glass p-10 rounded-sm max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-light tracking-widest mb-2">
            DNA<span className="text-brand-blue">ADMIN</span>
          </h1>
          <p className="text-xs text-brand-muted uppercase tracking-widest">Accès réservé</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-all backdrop-blur-xl placeholder-brand-muted/70"
              placeholder="admin@dnastore.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full liquid-glass border-2 border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-all backdrop-blur-xl placeholder-brand-muted/70"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red px-4 py-3 rounded-sm text-xs font-bold uppercase tracking-wide text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-blue/80 transition-all shadow-lg rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
