'use client'

import Link from 'next/link'
import { Home, MessageSquare, Users, Menu, X, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarProps {
  activeSection: 'chatbot' | 'brain-model' | 'forum'
  setActiveSection: (section: 'chatbot' | 'forum') => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-md z-20 flex items-center px-4">
        <button
          className="p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-abril text-bbb-purple ml-4">BBB Portal</h2>
      </div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 right-0 transform ${
          isMobileMenuOpen ? 'translate-y-16' : '-translate-y-full'
        } md:translate-y-0 md:relative md:block transition duration-200 ease-in-out z-10`}
      >
        <div className="md:w-64 w-full h-screen md:h-full bg-white/80 backdrop-blur-sm md:border-r border-white/20 shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-white/20 hidden md:block">
            <h2 className="text-2xl font-abril text-bbb-purple">BBB Portal</h2>
          </div>
          <nav className="p-4 space-y-2">
            {['chatbot', 'forum', 'brain-model'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section as 'chatbot' | 'forum')
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 w-full ${
                  activeSection === section
                    ? 'bg-bbb-yellow/50 text-bbb-purple'
                    : 'text-bbb-black/80 hover:text-bbb-purple hover:bg-bbb-yellow/30'
                } group`}
              >
                {section === 'chatbot' && (
                  <MessageSquare className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                )}
                {section === 'forum' && (
                  <Users className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                )}
                {section === 'brain-model' && (
                  <Brain className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                )}
                <span className="capitalize">{section.replace('-', ' ')}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}