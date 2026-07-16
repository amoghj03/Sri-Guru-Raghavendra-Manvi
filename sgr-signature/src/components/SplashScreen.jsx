import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sgrLogo from '../assets/SGR_MANVI.png'

export default function SplashScreen({ onDone, apiReady }) {
  const [visible,     setVisible]     = useState(true)
  const [minTimeDone, setMinTimeDone] = useState(false)

  // Minimum display time so the splash doesn't flash away instantly
  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  // Dismiss once both conditions are met
  useEffect(() => {
    if (minTimeDone && apiReady) {
      const t = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(t)
    }
  }, [minTimeDone, apiReady])

  // Safety: dismiss after 4s max regardless of API state
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const done = minTimeDone && apiReady

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
            src={sgrLogo}
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
              animate={{ width: done ? '100%' : '70%' }}
              transition={{
                duration: done ? 0.3 : 2.0,
                ease: done ? 'easeOut' : 'easeInOut',
              }}
              initial={{ width: '0%' }}
              className="h-full rounded-full bg-[#1E3A5F]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
