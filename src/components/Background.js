import { useEffect, useState } from 'react'

export default function Background() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-brand-base transition-colors duration-500">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100"></div>

      {/* Subtle Blobs for Depth (Optional, kept very subtle) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-brand-blue/5 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
    </div>
  )
}
