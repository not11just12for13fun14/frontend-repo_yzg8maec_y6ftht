import React from 'react'
import { Bot, User } from 'lucide-react'

const ChatMessage = ({ role = 'assistant', content = '', thinking = false }) => {
  const isUser = role === 'user'
  return (
    <div className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse text-right' : ''}`}>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 border ${isUser ? 'bg-white border-white/20' : 'bg-black border-white/10'} shadow-sm`}> 
        {isUser ? <User className="h-5 w-5 text-black" /> : <Bot className="h-5 w-5 text-white" />}
      </div>
      <div className={`max-w-[78%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl p-4 ${isUser ? 'bg-white/80 text-black border border-black/10' : 'bg-white/5 text-white backdrop-blur-xl border border-white/10'} shadow-lg`}> 
        {thinking ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce [animation-delay:0ms]" />
            <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce [animation-delay:140ms]" />
            <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce [animation-delay:280ms]" />
          </div>
        ) : (
          <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
