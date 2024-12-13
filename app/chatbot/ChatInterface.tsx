'use client'

import { useState } from 'react'
import { Send, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export function ChatInterface() {
  const [message, setMessage] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg min-h-[300px] md:min-h-[400px] flex flex-col"
    >
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bbb-purple/10 flex items-center justify-center mt-1">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-bbb-purple" />
          </div>
          <div className="bg-bbb-yellow/20 rounded-2xl rounded-tl-none p-3 md:p-4 max-w-[calc(100%-3rem)] md:max-w-md">
            <p className="text-sm md:text-base text-bbb-black/90 leading-relaxed">Hello! How can I help you today? Feel free to share your thoughts or ask any questions about mental health.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 p-3 md:p-4">
        <form className="flex gap-2 md:gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 md:px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bbb-purple/20 transition-all duration-200 text-sm md:text-base"
          />
          <button
            type="submit"
            className="px-3 md:px-4 py-2 bg-bbb-purple text-white rounded-xl hover:bg-bbb-purple/90 transition-colors duration-200 flex items-center gap-2 text-sm md:text-base"
          >
            Send
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  )
}

