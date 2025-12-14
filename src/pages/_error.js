import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function Error({ statusCode }) {
  const router = useRouter()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">{statusCode || '404'}</h1>
        <p className="text-2xl text-gray-600 mb-8">
          {statusCode === 404
            ? 'Page non trouvée'
            : 'Une erreur est survenue'}
        </p>
        <button onClick={() => router.push('/')} className="btn-primary">
          Retour à l'accueil
        </button>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
