import { motion } from 'framer-motion'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCards({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="relative backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20 transition-all duration-300"
    >
      <div className="flex items-start space-x-6">
        <div className="text-5xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-bbb-purple to-purple-500 bg-clip-text text-transparent mb-3">
            {title}
          </h3>
          <p className="text-bbb-black/80 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-bbb-purple/5 to-purple-500/5 rounded-2xl pointer-events-none" />
    </motion.div>
  )
}

