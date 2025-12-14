import Layout from '@/components/Layout'
import Image from 'next/image'

export default function APropos() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Image 
              src="/Geminlogo (1).png" 
              alt="DNA Store" 
              width={150} 
              height={150}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">À propos de DNA Store</h1>
            <p className="text-xl text-gray-600">Votre boutique en ligne de confiance</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
              <p className="text-gray-600 leading-relaxed">
                DNA Store est née de la passion de rendre le shopping en ligne accessible à tous. 
                Nous nous engageons à offrir des produits de qualité avec un service client exceptionnel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Faciliter l'accès aux produits de qualité pour tous nos clients, avec une expérience 
                d'achat simple et sécurisée via WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-glass text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-bold mb-2">Qualité</h3>
                  <p className="text-gray-600 text-sm">Produits soigneusement sélectionnés</p>
                </div>
                <div className="card-glass text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-bold mb-2">Confiance</h3>
                  <p className="text-gray-600 text-sm">Service client à votre écoute</p>
                </div>
                <div className="card-glass text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold mb-2">Rapidité</h3>
                  <p className="text-gray-600 text-sm">Livraison rapide et efficace</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Pourquoi Nous Choisir ?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary-blue mr-3">✓</span>
                  <span className="text-gray-600">Large sélection de produits de qualité</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-blue mr-3">✓</span>
                  <span className="text-gray-600">Commande facile via WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-blue mr-3">✓</span>
                  <span className="text-gray-600">Livraison rapide à Ouagadougou et ailleurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-blue mr-3">✓</span>
                  <span className="text-gray-600">Service client réactif et professionnel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-blue mr-3">✓</span>
                  <span className="text-gray-600">Prix compétitifs et transparents</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
