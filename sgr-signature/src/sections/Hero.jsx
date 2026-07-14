import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { society, headlineStats } from '../data/society'
import StatCounter from '../components/StatCounter'
import { formatINRCompact } from '../utils/format'
import heroVault from '../assets/hero-vault.png'

function useTypewriter(text, speed = 36, startDelay = 300, enabled = false) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) return
    setDisplayed('')
    setDone(false)
    let index = 0
    let interval

    const t0 = setTimeout(() => {
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
      clearTimeout(t0)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, enabled])

  return { displayed, done }
}

export default function Hero({ ready = false }) {
  const { t, tf, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const headlineText =
    lang === 'kn' ? 'ಬಾಳಿಗೆ ಬೆಳಕು' : 'Light of Life'
  const { displayed, done } = useTypewriter(headlineText, 36, 300, ready)

  const stats = [
    { value: headlineStats.workingCapital, format: formatINRCompact, label: lang === 'kn' ? 'ದುಡಿಯುವ ಬಂಡವಾಳ'  : 'Working Capital'   },
    { value: headlineStats.fixedDeposit,   format: formatINRCompact, label: lang === 'kn' ? 'ನಿಶ್ಚಿತ ಠೇವಣಿ'     : 'Fixed Deposits'    },
    { value: headlineStats.loans,          format: formatINRCompact, label: lang === 'kn' ? 'ಸಾಲ ಮತ್ತು ಮುಂಗಡ' : 'Loans & Advances'  },
    { value: headlineStats.profit,         format: formatINRCompact, label: lang === 'kn' ? 'ವಾರ್ಷಿಕ ಲಾಭ'      : 'Annual Profit'     },
  ]

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const headlineClasses = `font-display w-full select-none whitespace-pre-wrap text-6xl font-normal leading-[1.04] tracking-[-0.01em] text-[#0F172A] md:text-7xl lg:text-[84px] ${kn}`

  return (
    <section
      id="top"
      className="relative h-screen overflow-hidden bg-white selection:bg-[#EFF6FF] selection:text-[#0F172A]"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVault}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="h-full w-full object-cover object-left sm:object-center"
          draggable={false}
        />
        {/* mobile: strong white wash so text is always readable */}
        <div className="absolute inset-0 bg-white/80 sm:hidden" />
        {/* desktop: left-to-right fade revealing the vault on the right */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-white from-[20%] via-white/60 via-[30%] to-transparent to-[70%]" />
      </div>

      {/* ── Content ── */}
      {/* Content: sits in the visible area between navbar and scroll hint */}
      <div className="absolute inset-x-0 top-16 bottom-12 z-10 flex items-center sm:top-[72px]">
        <main className="w-full max-w-6xl pl-10 pr-5 sm:pl-10 sm:pr-8 lg:pl-20">
          <div className="max-w-xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className={`inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#1E3A5F] ${kn}`}>
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* ── Typewriter headline ──
                The invisible copy reserves the exact final height so nothing
                below shifts while characters are being typed in. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-8"
            >
              {/* height anchor — invisible, always full text */}
              <h1 className={`${headlineClasses} invisible`} aria-hidden="true">
                {headlineText}
              </h1>
              {/* typewriter overlay — absolutely positioned over the anchor */}
              <h1 className={`${headlineClasses} absolute inset-0`}>
                {displayed}
                {!done && (
                  <span className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-[#0F172A]" />
                )}
              </h1>
            </motion.div>

            {/* Everything below fades in after typing finishes */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              {/* Society name + subtitle */}
              <p className={`mb-6 font-display italic text-[15px] tracking-wide text-[#1E3A5F]/65 ${kn}`}>
                {tf(society.name)}
              </p>
              <p className={`mb-12 font-display text-xl font-normal leading-[1.7] text-[#475569] md:text-[22px] ${kn}`}>
                {t('hero.subtitle')}
              </p>

              {/* Business stats */}
              <p className={`mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#94A3B8] ${kn}`}>
                {lang === 'kn' ? 'ನಮ್ಮ ಬೆಳವಣಿಗೆ · 2024–25' : 'Our Business · FY 2024–25'}
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <p className={`text-2xl font-bold tracking-tight text-[#0F172A] sm:text-2xl ${kn}`}>
                      <StatCounter value={s.value} format={s.format} />
                    </p>
                    <span className="mt-2 mb-1.5 block h-px w-8 rounded-full bg-[#C8960C]/70" />
                    <p className={`text-xs font-medium text-[#94A3B8] ${kn}`}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <div className="mt-12 flex flex-wrap gap-3">
                <button
                  onClick={() => go('contact')}
                  className={`inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#162f4d] hover:shadow active:scale-95 ${kn}`}
                >
                  {t('cta.becomeMember')}
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-70">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => go('schemes')}
                  className={`inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 px-6 py-3 text-sm font-medium text-[#0F172A] backdrop-blur-sm transition-colors hover:bg-white ${kn}`}
                >
                  {t('cta.explore')}
                </button>
              </div>

              {/* Registration badge */}
              <div className="mt-8">
                <span className={`inline-flex items-center gap-2 text-xs text-[#94A3B8] ${kn}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A5F]" />
                  {t('hero.regBadge')}
                </span>
              </div>
            </motion.div>

          </div>
        </main>
      </div>

        {/* Scroll hint — absolute so it doesn't affect vertical centering */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8]">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-8 w-px bg-gradient-to-b from-[#1E3A5F]/40 to-transparent"
            />
          </div>
        </div>
    </section>
  )
}
