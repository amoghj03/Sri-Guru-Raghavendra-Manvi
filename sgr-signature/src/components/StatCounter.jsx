import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

// Animated number counter that runs once when scrolled into view.
export default function StatCounter({ value, format }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(format ? format(0) : '0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(format ? format(latest) : Math.round(latest).toString()),
    })
    return () => controls.stop()
  }, [inView, value, mv, format])

  return <span ref={ref}>{display}</span>
}
