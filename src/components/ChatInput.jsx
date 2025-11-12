import React from 'react'
import { Send, Sparkles } from 'lucide-react'

const ChatInput = ({ value, onChange, onSend, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  return (
    <div className="relative">
      <div className="absolute -top-8 left-0 text-xs text-white/60 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
        Tip: Press Enter to send, Shift+Enter for a new line
      </div>
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 focus-within:border-orange-400/30 transition-colors shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Ask the mini bot anything..."
          className="w-full resize-none bg-transparent outline-none text-white placeholder-white/40 p-3 pr-14"
        />
        <button
          disabled={!value.trim() || loading}
          onClick={onSend}
          className="absolute right-3 bottom-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-400 hover:to-orange-600 transition-colors"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatInput
