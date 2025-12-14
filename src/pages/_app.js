import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import Toast from '@/components/Toast'

export default function App({ Component, pageProps }) {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handleToast = (e) => {
      setToast(e.detail)
    }
    window.addEventListener('showToast', handleToast)
    return () => window.removeEventListener('showToast', handleToast)
  }, [])

  return (
    <>
      <Component {...pageProps} />
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  )
}
