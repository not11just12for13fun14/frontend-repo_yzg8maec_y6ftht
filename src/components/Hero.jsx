import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[55vh] md:h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient lighting overlay for subtle orange glow (doesn't block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,140,0,0.25),transparent_40%)]" />

      {/* Copy overlay */}
      <div className="relative z-10 flex h-full items-end md:items-center">
        <div className="mx-auto md:mx-12 w-full md:max-w-xl p-6 md:p-0 text-white/90">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-white/60">Playful • Robotic • Friendly</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
            Meet your mini-robot guide
            <span className="block text-white/70 font-medium text-lg md:text-2xl">Black & white charm with a spark of orange</span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <a href="#chat" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(255,255,255,0.6)] hover:opacity-90 transition">Start chatting</a>
            <span className="text-white/60 text-sm">or press Enter</span>
          </div>
        </div>
      </div>
    </section>
  )
}
