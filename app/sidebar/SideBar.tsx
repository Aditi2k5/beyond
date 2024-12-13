'use client'

import Link from 'next/link'
import { Home, MessageSquare,  Users, Menu, X, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarProps {
  activeSection: 'chatbot' | 'brain-model' | 'forum'
  setActiveSection: (section: 'chatbot' |  'forum') => void
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
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out md:block z-10`}
      >
        <div className="w-64 h-full bg-white/80 backdrop-blur-sm border-r border-white/20 shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-abril text-bbb-purple">BBB Portal</h2>
          </div>
          <nav className="p-4 space-y-2">
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-bbb-black/80 hover:text-bbb-purple rounded-xl hover:bg-bbb-yellow/30 transition-all duration-200 group"
            >
              <Home className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
              <span>Home</span>
            </Link>
            {['chatbot', 'forum','brain-model'].map((section) => (
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
                {section === 'chatbot' && <MessageSquare className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />}
                {section === 'forum' && <Users className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />}
                {section === 'brain-model' && <Brain className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />}
                <span className="capitalize">{section.replace('-', ' ')}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

