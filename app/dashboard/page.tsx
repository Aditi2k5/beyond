'use client'

import { useState } from 'react'
import { Sidebar } from '../sidebar/SideBar'
import { ChatInterface } from '../chatbot/ChatInterface'
import { Forum } from '../forum/Forum'
import { motion } from 'framer-motion'
import InteractiveBrainModel from '@/app/brainmodel/interactiveBrain'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<'chatbot' | 'brain-model' | 'forum'>('chatbot')

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-bbb-yellow to-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto"
        >

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-4 md:p-8">
              {activeSection === 'chatbot' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-abril text-bbb-purple mb-3 md:mb-4">
                    Interactive Chatbot
                  </h2>
                  <p className="text-bbb-black/80 mb-6 leading-relaxed max-w-3xl">
                    Welcome to our AI-powered chatbot! Start a conversation to get personalized mental health support and guidance. Our chatbot is available 24/7 to provide you with instant responses, coping strategies, and resources tailored to your needs.
                  </p>
                  <ChatInterface />
                </motion.div>
              )}
              {activeSection === 'brain-model' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-abril text-bbb-purple mb-3 md:mb-4">
                    3D Brain Model
                  </h2>
                  <p className="text-bbb-black/80 mb-6 leading-relaxed max-w-3xl">
                    Explore the human brain in stunning 3D detail. Click and drag to rotate the model and learn about different brain regions and their functions.
                  </p>
                <InteractiveBrainModel />
                </motion.div>
              )}
              {activeSection === 'forum' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-abril text-bbb-purple mb-3 md:mb-4">
                    Support Forum
                  </h2>
                  <p className="text-bbb-black/80 mb-6 leading-relaxed max-w-3xl">
                    Welcome to our support forum. This is a safe space to share your experiences, ask questions, and connect with others who understand what you are going through. Whether you are dealing with a brain injury, disability, or supporting someone who is, you will find a community of understanding and support here.
                  </p>
                  <Forum />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

