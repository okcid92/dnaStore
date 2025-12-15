import Layout from '@/components/Layout'
import { CONTACTS } from '@/config'

export default function Confidentialite() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto liquid-glass rounded-sm p-8 md:p-12">
          <h1 className="text-4xl font-display font-bold text-brand-light mb-8 uppercase tracking-widest">
            Politique de <span className="text-brand-blue">Confidentialité</span>
          </h1>

          <div className="space-y-8 text-brand-muted leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">1. Introduction</h2>
              <p>DNAStore s'engage à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">2. Données collectées</h2>
              <p>Nous collectons les informations suivantes lors de vos commandes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Nom complet</li>
                <li>Numéro de téléphone WhatsApp</li>
                <li>Adresse de livraison</li>
                <li>Ville</li>
                <li>Informations de commande (produits, quantités, montants)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">3. Utilisation des données</h2>
              <p>Vos données personnelles sont utilisées uniquement pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Traiter et livrer vos commandes</li>
                <li>Vous contacter concernant votre commande via WhatsApp</li>
                <li>Améliorer nos services</li>
                <li>Gérer notre relation client</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">4. Stockage des données</h2>
              <p>Vos données sont stockées de manière sécurisée sur des serveurs protégés (Supabase). Nous conservons vos informations uniquement le temps nécessaire pour remplir les finalités décrites dans cette politique.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">5. Partage des données</h2>
              <p>DNAStore ne vend, ne loue ni ne partage vos données personnelles avec des tiers, sauf :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Pour le traitement de votre commande (livraison)</li>
                <li>Si requis par la loi</li>
                <li>Avec votre consentement explicite</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">6. Cookies et technologies similaires</h2>
              <p>Notre site utilise le stockage local (localStorage) pour gérer votre panier d'achat. Aucun cookie de suivi publicitaire n'est utilisé.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">7. Vos droits</h2>
              <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit de suppression de vos données</li>
                <li>Droit d'opposition au traitement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
              <p className="mt-3">Pour exercer ces droits, contactez-nous à : contact@dnastore.bf</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">8. Sécurité</h2>
              <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">9. Données de navigation</h2>
              <p>Nous collectons automatiquement certaines informations techniques lors de votre visite :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Durée de visite</li>
              </ul>
              <p className="mt-3">Ces données sont utilisées uniquement pour améliorer l'expérience utilisateur et la sécurité du site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">10. Modifications de la politique</h2>
              <p>DNAStore se réserve le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">11. Contact</h2>
              <p>Pour toute question concernant cette politique de confidentialité ou vos données personnelles :</p>
              <ul className="list-none space-y-2 ml-4 mt-3">
                <li><i className="fa-solid fa-envelope text-brand-blue mr-2"></i> {CONTACTS.email}</li>
                <li><i className="fa-solid fa-phone text-brand-blue mr-2"></i> {CONTACTS.phone}</li>
                <li><i className="fa-solid fa-location-dot text-brand-blue mr-2"></i> {CONTACTS.address.full}</li>
              </ul>
            </section>

            <div className="pt-8 border-t border-brand-border text-sm text-brand-muted">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
