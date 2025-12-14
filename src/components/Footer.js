import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-brand-light/10 text-xs">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div>
                    <Link href="/" className="text-lg font-bold tracking-widest text-brand-light uppercase mb-6 block">
                        DNA<span className="text-brand-blue">Store</span>
                    </Link>
                    <p className="text-gray-500 max-w-xs font-light">
                        Redéfinir le standard du streetwear au Burkina Faso.
                    </p>
                </div>
                
                <div className="flex gap-12 text-gray-500 font-light uppercase tracking-widest">
                    <div className="flex flex-col gap-4">
                        <Link href="/#collection" className="hover:text-brand-light transition-colors">Collection</Link>
                        <Link href="/a-propos" className="hover:text-brand-light transition-colors">À propos</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link href="#" className="hover:text-brand-light transition-colors">Livraison</Link>
                        <Link href="/contact" className="hover:text-brand-light transition-colors">Contact</Link>
                    </div>
                </div>

                <div className="text-right text-gray-500 font-light">
                    <p className="mb-2">Ouagadougou, BF</p>
                    <p>+226 00 00 00 00</p>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-brand-light/5 text-center text-gray-600 font-light uppercase tracking-widest text-[10px]">
                &copy; {new Date().getFullYear()} DNAStore. Tous droits réservés.
            </div>
        </div>
    </footer>
  )
}
