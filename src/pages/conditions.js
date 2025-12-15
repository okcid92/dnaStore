import Layout from '@/components/Layout'
import { CONTACTS } from '@/config'

export default function Conditions() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto liquid-glass rounded-sm p-8 md:p-12">
          <h1 className="text-4xl font-display font-bold text-brand-light mb-8 uppercase tracking-widest">
            Conditions <span className="text-brand-blue">d'utilisation</span>
          </h1>

          <div className="space-y-8 text-brand-muted leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">1. Acceptation des conditions</h2>
              <p>En accédant et en utilisant DNAStore, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">2. Utilisation du site</h2>
              <p>Vous vous engagez à utiliser notre site uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits d'autrui ou qui ne restreint ou n'empêche pas l'utilisation du site par un tiers.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">3. Commandes et paiements</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Toutes les commandes sont soumises à disponibilité des produits</li>
                <li>Les prix sont affichés en FCFA et peuvent être modifiés sans préavis</li>
                <li>Le paiement s'effectue via WhatsApp après confirmation de la commande</li>
                <li>Une commande est considérée comme confirmée après validation par notre équipe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">4. Livraison</h2>
              <p>Les délais de livraison sont donnés à titre indicatif. DNAStore s'efforce de respecter ces délais mais ne peut être tenu responsable des retards indépendants de sa volonté.</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Livraison à Ouagadougou : 500 FCFA</li>
                <li>Autres villes : Nous contacter</li>
                <li>Délai moyen : 24-48h à Ouagadougou</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">5. Réservation de stock</h2>
              <p>Lorsque vous passez une commande, les articles sont réservés pendant 24 heures. Passé ce délai sans confirmation, la commande sera automatiquement annulée et le stock restitué.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">6. Propriété intellectuelle</h2>
              <p>Tous les contenus présents sur DNAStore (textes, images, logos, vidéos) sont protégés par les droits de propriété intellectuelle et appartiennent à DNAStore ou à ses partenaires.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">7. Limitation de responsabilité</h2>
              <p>DNAStore ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité de l'utiliser.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">8. Modification des conditions</h2>
              <p>DNAStore se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-light mb-4 uppercase tracking-wider">9. Contact</h2>
              <p>Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter :</p>
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
