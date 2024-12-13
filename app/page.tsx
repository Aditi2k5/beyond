'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FeatureCards } from '../components/FeatureCards'
import { BackgroundPattern } from '../components/BackgroundPattern'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-bbb-yellow to-white">
      <BackgroundPattern />
      <main className="container relative mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-7xl font-abril mb-6 tracking-tight leading-tight text-bbb-black">
            We are not broken,
            <br />
            we are beyond
          </h1>
          <h2 className="text-6xl md:text-7xl font-edu-australia mb-12 text-bbb-purple">
            Beyond Broken Brains
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-bbb-purple text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-bbb-purple/25 transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <FeatureCards
            title="Interactive Chatbot"
            description="Engage with our AI-powered chatbot for personalized mental health support and guidance. Our chatbot is available 24/7 to provide you with instant responses, coping strategies, and resources tailored to your needs."
            icon="💬"
          />
          <FeatureCards
            title="3D Brain Model"
            description="Explore the human brain in stunning 3D detail and learn about different brain regions and functions. Interact with our model to understand the complexities of the brain and how it relates to mental health."
            icon="🧠"
          />
        </div>
      </main>
    </div>
  )
}
