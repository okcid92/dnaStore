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
      <div className="pt-32 pb-16 min-h-screen relative overflow-hidden">


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
                  <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-3">Nom complet <span className="text-brand-blue">*</span></label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
                    <input
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm py-3.5 pl-12 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all placeholder-brand-muted/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-3">Email <span className="text-brand-blue">*</span></label>
                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
                        <input
                          type="email"
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          className="w-full bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm py-3.5 pl-12 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all placeholder-brand-muted/50"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-3">Téléphone <span className="text-brand-blue">*</span></label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"></i>
                        <input
                          type="tel"
                          placeholder="+226 XX XX XX XX"
                          value={form.phone}
                          onChange={(e) => setForm({...form, phone: e.target.value})}
                          className="w-full bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm py-3.5 pl-12 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all placeholder-brand-muted/50"
                          required
                        />
                      </div>
                    </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-light uppercase tracking-widest mb-3">Message <span className="text-brand-blue">*</span></label>
                  <div className="relative">
                    <i className="fa-solid fa-message absolute left-4 top-4 text-brand-muted"></i>
                    <textarea
                      placeholder="Comment pouvons-nous vous aider ?"
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full bg-white/5 backdrop-blur-xl border-2 border-brand-border rounded-sm py-3.5 pl-12 pr-4 text-brand-light text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all placeholder-brand-muted/50 min-h-[150px] resize-none"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="liquid-button w-full py-4 rounded-sm font-bold uppercase tracking-widest text-white flex items-center justify-center gap-3 text-sm shadow-lg">
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
