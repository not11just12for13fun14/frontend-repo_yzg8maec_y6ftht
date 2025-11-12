import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, Mic, Paperclip } from 'lucide-react'

const systemBubbles = [
  'Hello! I am Nova, your mini-robot guide.',
  'Ask me anything. I love ideas, jokes, and tiny epiphanies.',
  "Tip: Press '/' to focus the chat instantly.",
]

function Bubble({ from, children, i }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ y: 8, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.03 }}
      className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="mt-1 grid place-items-center h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/15 text-white">
          <Bot size={16} />
        </div>
      )}
      <div
        className={`${isBot ? 'bg-white/10 text-white/90 ring-white/15' : 'bg-white text-black ring-black/5'} max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ring-1 backdrop-blur`}
      >
        {children}
      </div>
      {!isBot && (
        <div className="mt-1 grid place-items-center h-8 w-8 rounded-full bg-white text-black ring-1 ring-black/10">
          <User size={16} />
        </div>
      )}
    </motion.div>
  )
}

export default function ChatUI() {
  const [messages, setMessages] = useState(() => systemBubbles.map((t) => ({ from: 'bot', text: t })))
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Enter' && (document.activeElement !== inputRef.current)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text }])
    setThinking(true)

    // Fake assistant reply for now (no backend needed). Replace with API call later.
    setTimeout(() => {
      const reply = playfulReply(text)
      setMessages((m) => [...m, { from: 'bot', text: reply }])
      setThinking(false)
    }, 700)
  }

  return (
    <section id="chat" className="relative w-full">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
        <div className="-mt-24 md:-mt-32" />
        <div className="rounded-3xl bg-gradient-to-b from-black to-zinc-950 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 text-white/70 text-xs border-b border-white/10 bg-white/5 backdrop-blur">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Nova is online — be curious.
            <Sparkles size={14} className="ml-auto" />
          </div>
          <div ref={listRef} className="h-[52vh] md:h-[58vh] overflow-y-auto px-4 py-5 space-y-3 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <Bubble key={i} from={m.from} i={i}>{m.text}</Bubble>
              ))}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                  <div className="mt-1 grid place-items-center h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/15 text-white">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/10 text-white/90 ring-white/15 max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ring-1 backdrop-blur">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:120ms]" />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:240ms]" />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="border-t border-white/10 bg-white/5 backdrop-blur px-3 py-2">
            <div className="flex items-end gap-2">
              <button className="hidden md:inline-flex h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15">
                <Mic size={18} />
              </button>
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') send()
                  }}
                  rows={1}
                  placeholder="Send a message..."
                  className="min-h-[44px] max-h-32 w-full resize-none rounded-2xl bg-white text-black placeholder-black/40 pr-12 py-2 px-3 text-sm shadow-inner focus:outline-none"
                />
                <button onClick={send} className="absolute bottom-2 right-2 grid place-items-center h-8 w-8 rounded-xl bg-black text-white ring-1 ring-black/10 hover:bg-zinc-900">
                  <Send size={16} />
                </button>
              </div>
              <button className="hidden md:inline-flex h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15">
                <Paperclip size={18} />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] text-white/50">We do not store chats. Press Ctrl/⌘ + Enter to send.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function playfulReply(text) {
  const starters = [
    "Curiosity module engaged:",
    "Beep boop! Here's a thought:",
    "Spark acquired:",
    "Micro-wisdom drop:",
  ]
  const emojis = ['✨','🤖','🧡','🛰️','🧠','💡']
  const s = starters[Math.floor(Math.random()*starters.length)]
  const e = emojis[Math.floor(Math.random()*emojis.length)]
  return `${s} ${mirror(text)} ${e}`
}

function mirror(input) {
  if (input.length < 3) return `you said "${input}"`
  const parts = input.split(/\s+/)
  if (parts.length === 1) return `let's talk about ${input}`
  const head = parts.slice(0, Math.ceil(parts.length/2)).join(' ')
  const tail = parts.slice(Math.ceil(parts.length/2)).join(' ')
  return `about ${head} — and also ${tail}?`
}
