import React from 'react'
import Hero from './components/Hero'
import ChatUI from './components/ChatUI'

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-orange-400/30 selection:text-white">
      <Hero />
      <ChatUI />
      <footer className="px-6 md:px-12 py-10 text-center text-white/50 text-sm">
        Built with a friendly mini-robot vibe — black, white, and a spark of orange.
      </footer>
    </div>
  )
}

export default App
