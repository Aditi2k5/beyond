'use client'

import { useState } from 'react'
import { Send, MessageSquare, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface MedicalExplanation {
  term: string;
  simple_explanation: string;
  signs: string[];
  care_tips: string[];
  when_to_consult: string;
  conversational_tone: string[];
}

export function ChatInterface() {
  const [message, setMessage] = useState('')
  const [explanation, setExplanation] = useState<MedicalExplanation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMedicalExplanation = async (term: string) => {
    setIsLoading(true)
    setError(null)
    setExplanation(null)

    try {
      const response = await fetch(`/api/chat?term=${term}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch medical explanation');
      }

      const data: MedicalExplanation = await response.json();
      setExplanation(data);
    } catch (err) {
      setError('Unable to retrieve medical explanation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      fetchMedicalExplanation(message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg min-h-[500px] md:min-h-[600px] flex flex-col"
    >
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        {/* Initial greeting */}
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bbb-purple/10 flex items-center justify-center mt-1">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-bbb-purple" />
          </div>
          <div className="bg-bbb-yellow/20 rounded-2xl rounded-tl-none p-3 md:p-4 max-w-[calc(100%-3rem)] md:max-w-md">
            <p className="text-sm md:text-base text-bbb-black/90 leading-relaxed">
              Hello! How can I help you today? Enter a medical term to get a detailed explanation.
            </p>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bbb-purple/10 flex items-center justify-center mt-1">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-bbb-purple" />
            </div>
            <div className="flex items-center gap-2 bg-bbb-yellow/20 rounded-2xl rounded-tl-none p-3 md:p-4">
              <Loader2 className="w-5 h-5 animate-spin text-bbb-purple" />
              <p className="text-sm md:text-base text-bbb-black/90">
                Fetching explanation for "{message}"...
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500/10 flex items-center justify-center mt-1">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            </div>
            <div className="bg-red-500/20 rounded-2xl rounded-tl-none p-3 md:p-4 max-w-[calc(100%-3rem)] md:max-w-md">
              <p className="text-sm md:text-base text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Medical Explanation */}
        {explanation && (
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bbb-purple/10 flex items-center justify-center mt-1">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-bbb-purple" />
            </div>
            <div className="bg-bbb-yellow/20 rounded-2xl rounded-tl-none p-3 md:p-4 max-w-[calc(100%-3rem)] md:max-w-md">
              <h3 className="font-bold text-bbb-purple mb-2 capitalize">{explanation.term}</h3>
              <p className="text-sm md:text-base text-bbb-black/90 mb-3">
                {explanation.simple_explanation}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-bbb-purple/80">Signs:</h4>
                <ul className="list-disc list-inside text-sm md:text-base">
                  {explanation.signs.map((sign, index) => (
                    <li key={index} className="text-bbb-black/80">{sign}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-bbb-purple/80 mt-2">Care Tips:</h4>
                <ul className="list-disc list-inside text-sm md:text-base">
                  {explanation.care_tips.map((tip, index) => (
                    <li key={index} className="text-bbb-black/80">{tip}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-bbb-purple/80 mt-2">When to Consult:</h4>
                <p className="text-sm md:text-base text-bbb-black/90">
                  {explanation.when_to_consult}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-3 md:p-4">
        <form className="flex gap-2 md:gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a medical term..."
            className="flex-1 px-3 md:px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bbb-purple/20 transition-all duration-200 text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-3 md:px-4 py-2 bg-bbb-purple text-white rounded-xl hover:bg-bbb-purple/90 transition-colors duration-200 flex items-center gap-2 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                Send
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  )
}