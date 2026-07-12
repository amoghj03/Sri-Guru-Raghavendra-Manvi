import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop']
const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other']

/* ------------------------------------------------------------------ *
 * useTypewriter — iteratively builds a string slice by slice.
 * Returns { displayed: string, done: boolean }
 * ------------------------------------------------------------------ */
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let index = 0
    let interval

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

/* ------------------------------------------------------------------ *
 * BackgroundVideo — desktop mouse scrubbing + mobile autoplay
 * ------------------------------------------------------------------ */
function BackgroundVideo() {
  const videoRef = useRef(null)

  /* Desktop mouse scrubbing */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX = null
    let targetTime = 0

    const handleSeeked = () => {
      /* Bind seeked to chain frame-to-frame seeking smoothly */
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime
      }
    }

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return
      if (!video.duration || Number.isNaN(video.duration)) return

      const currentX = e.clientX
      if (prevX === null) {
        prevX = currentX
        return
      }

      const delta = currentX - prevX
      prevX = currentX

      targetTime += (delta / window.innerWidth) * 0.8 * video.duration
      targetTime = Math.min(Math.max(targetTime, 0), video.duration)

      video.currentTime = targetTime
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  /* Mobile autoplay */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (window.innerWidth < 1024) {
      video.autoplay = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }, [])

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src={VIDEO_SRC}
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * MainframeNavbar
 * ------------------------------------------------------------------ */
function MainframeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex flex-row text-[23px] text-black">
          {NAV_LINKS.map((link, i) => (
            <span key={link} className="flex flex-row">
              <a href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </span>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#"
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
        >
          <span
            className={`w-6 h-[2px] bg-black block transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black block transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black block transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-center gap-8 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl text-black hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ *
 * ContactHero — root export
 * ------------------------------------------------------------------ */
export default function ContactHero() {
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!")
  const [services, setServices] = useState([])

  const toggleService = (option) =>
    setServices((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option],
    )

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <BackgroundVideo />
      <MainframeNavbar />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          {/* Headline with typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br /> drop us a message and
              we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-medium tracking-tight mb-2">
              What sort of service?
            </h2>
            <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>

            <div className="flex flex-wrap gap-3">
              {SERVICE_OPTIONS.map((option) => {
                const active = services.includes(option)
                return (
                  <motion.button
                    key={option}
                    type="button"
                    onClick={() => toggleService(option)}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-200 ${
                      active
                        ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                        : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                    }`}
                  >
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="inline-flex"
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {option}
                  </motion.button>
                )
              })}
            </div>

            {/* Contingent feedback status banner */}
            <div className="mt-6">
              <AnimatePresence mode="wait">
                {services.length === 0 ? (
                  <motion.p
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="italic text-xs text-neutral-500"
                  >
                    Please click to select services above.
                  </motion.p>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FAFBF9] border border-[#EEF0ED] rounded-2xl px-5 py-4">
                      <p className="text-sm text-neutral-700">
                        Ready to inquire about:{' '}
                        <span className="font-medium text-neutral-900">
                          {services.join(', ')}
                        </span>
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold tracking-wide hover:opacity-70 transition-opacity shrink-0"
                      >
                        Let&apos;s Go
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
