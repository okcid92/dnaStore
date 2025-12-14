import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page non trouvée</p>
        <button onClick={() => router.push('/')} className="btn-primary">
          Retour à l'accueil
        </button>
      </div>
    </Layout>
  )
}
