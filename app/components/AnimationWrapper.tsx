'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0, 
        scale: isLoaded ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper

