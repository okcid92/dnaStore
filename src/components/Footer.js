import Link from 'next/link'
import { CONTACTS } from '@/config'

export default function Footer() {
  return (
    <footer className="relative mt-12 md:mt-24 border-t border-brand-border">
      <div className="liquid-glass backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6 group">
                <i className="fa-solid fa-dna text-brand-blue text-3xl transition-transform group-hover:scale-110"></i>
                <span className="text-xl font-display font-bold tracking-widest uppercase text-brand-light">
                  DNA<span className="text-brand-blue font-light">Store</span>
                </span>
              </Link>
              <p className="text-brand-muted text-sm leading-relaxed mb-4 md:mb-6">
                Redéfinir le standard du streetwear au Burkina Faso avec style et authenticité.
              </p>
              <div className="flex gap-3 mb-6 md:mb-0">
                <a href={CONTACTS.social.facebook} className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href={CONTACTS.social.instagram} className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href={CONTACTS.social.whatsapp} className="w-10 h-10 liquid-glass rounded-sm flex items-center justify-center text-brand-muted hover:text-brand-blue hover:border-brand-blue border border-brand-border transition-all">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-3 md:mb-6">Navigation</h3>
              <ul className="space-y-2 md:space-y-3 text-sm mb-6 md:mb-0">
                <li><Link href="/#collection" className="text-brand-muted hover:text-brand-light transition-colors">Collection</Link></li>
                <li><Link href="/#why-us" className="text-brand-muted hover:text-brand-light transition-colors">Philosophie</Link></li>
                <li><Link href="/#reviews" className="text-brand-muted hover:text-brand-light transition-colors">Avis Clients</Link></li>
                <li><Link href="/#faq" className="text-brand-muted hover:text-brand-light transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Informations */}
            <div>
              <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-3 md:mb-6">Informations</h3>
              <ul className="space-y-2 md:space-y-3 text-sm mb-6 md:mb-0">
                <li><Link href="/a-propos" className="text-brand-muted hover:text-brand-light transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="text-brand-muted hover:text-brand-light transition-colors">Contact</Link></li>
                <li><Link href="/panier" className="text-brand-muted hover:text-brand-light transition-colors">Mon Panier</Link></li>
                <li><Link href="/produits" className="text-brand-muted hover:text-brand-light transition-colors">Nos Produits</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold text-brand-light uppercase tracking-widest mb-3 md:mb-6">Contact</h3>
              <ul className="space-y-3 md:space-y-4 text-sm text-brand-muted">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-brand-blue mt-1"></i>
                  <span>{CONTACTS.address.full}</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-brand-blue"></i>
                  <a href={`tel:${CONTACTS.phoneRaw}`} className="hover:text-brand-light transition-colors">{CONTACTS.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-brand-blue"></i>
                  <a href={`mailto:${CONTACTS.email}`} className="hover:text-brand-light transition-colors">{CONTACTS.email}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 md:pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs text-brand-muted uppercase tracking-widest text-center md:text-left">
              &copy; {new Date().getFullYear()} DNAStore. Tous droits réservés.
            </p>
            <div className="flex gap-4 md:gap-6 text-xs text-brand-muted uppercase tracking-widest">
              <Link href="/conditions" className="hover:text-brand-light transition-colors">Conditions</Link>
              <Link href="/confidentialite" className="hover:text-brand-light transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
