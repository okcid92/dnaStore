import Header from './Header'
import Footer from './Footer'
import Background from './Background'

export default function Layout({ children, hideFooter = false }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Background />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}
