import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from './LanguageToggle'
import sgrLogo from '../assets/SGR_MANVI.png'

const links = [
  { id: 'about',      key: 'nav.about'      },
  { id: 'schemes',    key: 'nav.schemes'    },
  { id: 'growth',     key: 'nav.progress'   },
  { id: 'gallery',    key: 'nav.gallery'    },
  { id: 'news',       key: 'nav.news'       },
  { id: 'leadership', key: 'nav.leadership' },
  { id: 'contact',    key: 'nav.contact'    },
]

export default function Navbar() {
  const { t, lang }                   = useLanguage()
  const [scrolled, setScrolled]       = useState(false)
  const [open,     setOpen]           = useState(false)
  const [active,   setActive]         = useState(null)
  const kn = lang === 'kn' ? 'font-kannada' : ''

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      if (window.scrollY < window.innerHeight * 0.5) setActive(null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const ob = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' },
      )
      ob.observe(el)
      observers.push(ob)
    })
    return () => observers.forEach((ob) => ob.disconnect())
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!e.target.closest('[data-navbar]')) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      data-navbar
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5F5F5]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.07)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex h-16 w-full items-center gap-2 px-4 sm:h-[72px] sm:px-8 lg:px-14">

        {/* ── Left: logo + name (shrinks gracefully) ── */}
        <button
          onClick={() => go('top')}
          className="group flex min-w-0 flex-1 items-center gap-2 select-none md:flex-none"
          aria-label="Go to top"
        >
          <img
            src={sgrLogo}
            alt="SGR Sahakari Sangha Manvi"
            className="h-10 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 sm:h-[48px] lg:h-[52px]"
            draggable={false}
          />
          <span className="min-w-0 overflow-hidden leading-snug text-left">
            <span className={`block truncate text-[12px] font-semibold tracking-wide text-[#0F172A] sm:text-[13px] lg:text-[14px] ${kn}`}>
              {lang === 'kn' ? 'ಶ್ರೀ ಗುರು ರಾಘವೇಂದ್ರ' : 'Sri Guru Raghavendra'}
            </span>
            <span className="block truncate text-[8.5px] tracking-[0.06em] text-[#1E3A5F] sm:text-[9.5px] sm:tracking-[0.09em] lg:text-[10px] lg:tracking-[0.1em]">
              Pattina Souharda Sahakari Sangha Niyamit
            </span>
          </span>
        </button>

        {/* ── Center: nav links (desktop only) ── */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 md:flex" aria-label="Main navigation">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors duration-150 lg:px-4 lg:text-[14px] ${kn} ${
                  isActive ? 'text-[#1E3A5F]' : 'text-[#0F172A] hover:text-[#1E3A5F]'
                }`}
              >
                {t(l.key)}
                <span
                  className="absolute bottom-1.5 left-3 right-3 h-[1.5px] rounded-full bg-[#C8960C] transition-all duration-200 lg:left-4 lg:right-4"
                  style={{
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            )
          })}
        </nav>

        {/* ── Right: desktop controls ── */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <LanguageToggle />
          <button
            onClick={() => go('contact')}
            className={`inline-flex items-center gap-1.5 rounded-full bg-[#1E3A5F] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#162f4d] active:scale-95 lg:px-6 lg:text-[14px] ${kn}`}
          >
            {t('cta.becomeMember')}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-70">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Right: mobile controls ── */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full border border-[#E2E8F0] bg-white/90 backdrop-blur-sm transition-colors hover:bg-white"
          >
            <span className={`absolute h-[1.5px] w-[14px] rounded-full bg-[#0F172A] transition-all duration-250 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute h-[1.5px] w-[14px] rounded-full bg-[#0F172A] transition-all duration-250 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`absolute h-[1.5px] w-[14px] rounded-full bg-[#0F172A] transition-all duration-250 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-[#E2E8F0] bg-[#F5F5F5] md:hidden"
          >
            <div className="w-full px-6 pb-5 pt-3 sm:px-10">
              <div className="flex flex-col gap-0.5">
                {links.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => go(l.id)}
                    className={`flex w-full items-center rounded-xl px-4 py-3.5 text-left text-[15px] font-medium text-[#0F172A] transition-colors hover:bg-black/5 ${kn} ${
                      active === l.id ? 'bg-black/5' : ''
                    }`}
                  >
                    <span className={`mr-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${active === l.id ? 'bg-[#0F172A]' : 'bg-[#D4D8D4]'}`} />
                    {t(l.key)}
                  </motion.button>
                ))}
              </div>

              <div className="my-3 h-px bg-[#E2E8F0]" />

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.04 }}
                onClick={() => go('contact')}
                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#162f4d] ${kn}`}
              >
                {t('cta.becomeMember')}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-70">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
