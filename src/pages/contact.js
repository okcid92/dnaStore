import { useState } from 'react'
import Layout from '@/components/Layout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Bonjour,\n\nNom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\n\nMessage:\n${form.message}`
    const url = `https://wa.me/22600000000?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <Layout>
      <div className="pt-32 pb-16 min-h-screen bg-brand-base relative overflow-hidden">
        {/* Ambient Background */}
        <div className="ambient-light">
           <div className="blob top-1/4 right-0 w-96 h-96 animate-blob opacity-20"></div>
           <div className="blob bottom-0 left-0 w-[500px] h-[500px] animate-blob animation-delay-2000 opacity-20" style={{ background: '#152642' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-display font-light text-brand-light mb-4 uppercase tracking-widest">Contactez <span className="font-bold text-brand-blue">Nous</span></h1>
            <p className="text-brand-muted font-light max-w-2xl mx-auto">Une question ? Un besoin spécifique ? Notre équipe est à votre écoute pour vous accompagner.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info Section */}
            <div className="space-y-6" data-aos="fade-right">
               <div className="liquid-glass p-8 rounded-sm flex items-start gap-6 group hover:border-brand-blue/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-2">Email</h3>
                    <p className="text-brand-muted font-light text-sm">contact@dnastore.com</p>
                    <p className="text-brand-muted font-light text-sm">support@dnastore.com</p>
                  </div>
               </div>

               <div className="liquid-glass p-8 rounded-sm flex items-start gap-6 group hover:border-brand-blue/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-2">WhatsApp</h3>
                    <p className="text-brand-muted font-light text-sm">+226 00 00 00 00</p>
                    <p className="text-[10px] text-brand-blue mt-2 uppercase tracking-widest font-bold">Réponse instantanée</p>
                  </div>
               </div>

               <div className="liquid-glass p-8 rounded-sm flex items-start gap-6 group hover:border-brand-blue/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-location-dot text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-2">Adresse</h3>
                    <p className="text-brand-muted font-light text-sm">Ouagadougou, Burkina Faso</p>
                    <p className="text-brand-muted font-light text-sm">Zone 1, Avenue Kadiogo</p>
                  </div>
               </div>

               <div className="liquid-glass p-8 rounded-sm flex items-start gap-6 group hover:border-brand-blue/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-clock text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-2">Horaires</h3>
                    <p className="text-brand-muted font-light text-sm">Lundi - Samedi : 08h00 - 18h00</p>
                    <p className="text-brand-muted font-light text-sm">Dimanche : Fermé</p>
                  </div>
               </div>
            </div>

            {/* Form Section */}
            <div className="liquid-glass p-10 rounded-sm" data-aos="fade-left">
              <h2 className="text-xl font-bold text-brand-light mb-8 uppercase tracking-widest border-b border-brand-border pb-4">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Téléphone</label>
                      <input
                        type="tel"
                        placeholder="+226..."
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50"
                        required
                      />
                    </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-brand-base/50 border border-brand-border rounded-sm py-3 px-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-brand-muted/50 min-h-[150px]"
                    required
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-brand-light text-brand-base font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3 rounded-sm">
                  <i className="fa-brands fa-whatsapp text-xl"></i> Envoyer via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
