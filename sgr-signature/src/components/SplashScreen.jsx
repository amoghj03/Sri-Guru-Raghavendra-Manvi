import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo */}
          <motion.img
            src="/SGR_MANVI.png"
            alt="SGR Sahakari Sangha Manvi"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-40 w-auto object-contain"
          />

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-center"
          >
            <p className="text-[30px] font-semibold tracking-wide text-[#0F172A]">
              Sri Guru Raghavendra
            </p>
            <p className="mt-1 text-[15px] tracking-[0.12em] text-[#1E3A5F]">
              Pattina Souharda Sahakari Sangha Niyamit
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-[#E2E8F0]">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
              className="h-full rounded-full bg-[#1E3A5F]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
