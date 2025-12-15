import Layout from '@/components/Layout'
import Link from 'next/link'

export default function APropos() {
  return (
    <Layout hideFooter={true}>
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <i className="fa-solid fa-dna text-brand-blue text-5xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-brand-light mb-4 uppercase tracking-widest">
              À propos de <span className="font-bold text-brand-blue">DNAStore</span>
            </h1>
            <p className="text-brand-muted font-light max-w-2xl mx-auto">Redéfinir le standard du streetwear au Burkina Faso</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Notre Histoire */}
            <div className="liquid-glass rounded-sm p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-light text-brand-light mb-6 uppercase tracking-widest">
                Notre <span className="font-bold text-brand-blue">Histoire</span>
              </h2>
              <p className="text-brand-muted leading-relaxed mb-4">
                DNAStore est né d'une passion : rendre le streetwear premium accessible à tous au Burkina Faso. Nous croyons que chaque personne mérite d'exprimer son style unique sans compromis sur la qualité.
              </p>
              <p className="text-brand-muted leading-relaxed">
                Depuis nos débuts, nous nous engageons à offrir une sélection soigneusement curriée de produits qui allient style, confort et authenticité. Chaque pièce raconte une histoire, la vôtre.
              </p>
            </div>

            {/* Nos Valeurs */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-light text-brand-light mb-8 text-center uppercase tracking-widest">
                Nos <span className="font-bold text-brand-blue">Valeurs</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="liquid-glass p-8 rounded-sm text-center group hover:border-brand-blue/50 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-gem text-3xl"></i>
                  </div>
                  <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-3">Qualité Premium</h3>
                  <p className="text-brand-muted text-xs leading-relaxed">Chaque produit est sélectionné avec soin pour garantir votre satisfaction</p>
                </div>
                <div className="liquid-glass p-8 rounded-sm text-center group hover:border-brand-blue/50 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-shield-heart text-3xl"></i>
                  </div>
                  <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-3">Confiance</h3>
                  <p className="text-brand-muted text-xs leading-relaxed">Transparence totale et service client dédié à votre écoute</p>
                </div>
                <div className="liquid-glass p-8 rounded-sm text-center group hover:border-brand-blue/50 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-bolt text-3xl"></i>
                  </div>
                  <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-3">Rapidité</h3>
                  <p className="text-brand-muted text-xs leading-relaxed">Livraison express et réponses instantanées sur WhatsApp</p>
                </div>
              </div>
            </div>

            {/* Pourquoi Nous */}
            <div className="liquid-glass rounded-sm p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-light text-brand-light mb-8 uppercase tracking-widest">
                Pourquoi <span className="font-bold text-brand-blue">DNAStore</span> ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Collection Exclusive</h4>
                    <p className="text-brand-muted text-xs">Produits uniques et tendances du moment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Commande Simplifiée</h4>
                    <p className="text-brand-muted text-xs">Process fluide via WhatsApp en quelques clics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Livraison Rapide</h4>
                    <p className="text-brand-muted text-xs">24-48h à Ouagadougou et grandes villes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Paiement Sécurisé</h4>
                    <p className="text-brand-muted text-xs">Cash à la livraison, zéro risque</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Prix Transparents</h4>
                    <p className="text-brand-muted text-xs">Meilleur rapport qualité/prix garanti</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-brand-blue text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-light mb-1">Support 7j/7</h4>
                    <p className="text-brand-muted text-xs">Réponses rapides et conseils personnalisés</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Infos - Footer Intégré */}
            <div className="liquid-glass rounded-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Brand */}
                <div>
                  <Link href="/" className="flex items-center gap-2 mb-6 group">
                    <i className="fa-solid fa-dna text-brand-blue text-3xl transition-transform group-hover:scale-110"></i>
                    <span className="text-xl font-display font-bold tracking-widest uppercase text-brand-light">
                      DNA<span className="text-brand-blue font-light">Store</span>
                    </span>
                  </Link>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">
                    Redéfinir le standard du streetwear au Burkina Faso avec style et authenticité.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>

                {/* Navigation */}
                <div>
                  <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-6">Navigation</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/produits" className="text-brand-muted hover:text-brand-light transition-colors">Produits</Link></li>
                    <li><Link href="/#why-us" className="text-brand-muted hover:text-brand-light transition-colors">Philosophie</Link></li>
                    <li><Link href="/#faq" className="text-brand-muted hover:text-brand-light transition-colors">FAQ</Link></li>
                    <li><Link href="/panier" className="text-brand-muted hover:text-brand-light transition-colors">Mon Panier</Link></li>
                  </ul>
                </div>

                {/* Informations */}
                <div>
                  <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-6">Informations</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/a-propos" className="text-brand-muted hover:text-brand-light transition-colors">À propos</Link></li>
                    <li><Link href="/contact" className="text-brand-muted hover:text-brand-light transition-colors">Contact</Link></li>
                    <li><Link href="/conditions" className="text-brand-muted hover:text-brand-light transition-colors">Conditions</Link></li>
                    <li><Link href="/confidentialite" className="text-brand-muted hover:text-brand-light transition-colors">Confidentialité</Link></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-6">Contact</h3>
                  <ul className="space-y-4 text-sm text-brand-muted">
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-location-dot text-brand-blue mt-1"></i>
                      <span>Ouagadougou, Burkina Faso</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-phone text-brand-blue"></i>
                      <a href="tel:+22600000000" className="hover:text-brand-light transition-colors">+226 00 00 00 00</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-envelope text-brand-blue"></i>
                      <a href="mailto:contact@dnastore.bf" className="hover:text-brand-light transition-colors">contact@dnastore.bf</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-brand-border">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                  <p className="text-xs text-brand-muted uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} DNAStore. Tous droits réservés.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/produits" className="liquid-button px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest text-white">
                      Découvrir la collection
                    </a>
                    <a href="/contact" className="liquid-button-outline px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest">
                      Nous contacter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
