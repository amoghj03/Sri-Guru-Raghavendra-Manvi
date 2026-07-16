import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { society, headlineStats } from '../data/society'
import StatCounter from '../components/StatCounter'
import { formatINRCompact } from '../utils/format'
import heroRayaru from '../assets/hero-rayaru-immersive-v4.jpg'

export default function Hero({ ready = false, latestProgress }) {
  const { t, tf, lang } = useLanguage()
  const isKannada = lang === 'kn'
  const kn = isKannada ? 'font-kannada' : ''

  const headlineLead = lang === 'kn' ? 'ಶ್ರೀ ಗುರು' : 'SRI GURU'
  const headlineAccent = lang === 'kn' ? 'ರಾಘವೇಂದ್ರ' : 'RAGHAVENDRA'

  // Use live API data if available, fall back to hardcoded
  const src = latestProgress ?? headlineStats
  const live = {
    workingCapital: latestProgress ? latestProgress.capital : headlineStats.workingCapital,
    fixedDeposit:   latestProgress ? latestProgress.fd      : headlineStats.fixedDeposit,
    loans:          latestProgress ? latestProgress.loans   : headlineStats.loans,
    profit:         latestProgress ? latestProgress.profit  : headlineStats.profit,
  }

  const stats = [
    { value: live.workingCapital, format: formatINRCompact, label: lang === 'kn' ? 'ದುಡಿಯುವ ಬಂಡವಾಳ'  : 'Working Capital'   },
    { value: live.fixedDeposit,   format: formatINRCompact, label: lang === 'kn' ? 'ನಿಶ್ಚಿತ ಠೇವಣಿ'     : 'Fixed Deposits'    },
    { value: live.loans,          format: formatINRCompact, label: lang === 'kn' ? 'ಸಾಲ ಮತ್ತು ಮುಂಗಡ' : 'Loans & Advances'  },
    { value: live.profit,         format: formatINRCompact, label: lang === 'kn' ? 'ವಾರ್ಷಿಕ ಲಾಭ'      : 'Annual Profit'     },
  ]

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="top"
      className="relative h-screen overflow-hidden bg-white selection:bg-[#EFF6FF] selection:text-[#0F172A]"
    >
      {/* ── Brand background: quiet copy space + heritage-inspired geometry ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroRayaru}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full object-cover object-[64%_center] sm:object-[90%_center]"
          draggable={false}
        />
        {/* Warm, translucent washes preserve the artwork while protecting copy contrast. */}
        <div className="absolute inset-0 bg-[#FFFDF8]/85 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#FFFDF8]/60 from-[0%] via-[#FFFDF8]/15 via-[44%] to-transparent to-[68%] sm:block" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FFFDF8]/45 to-transparent" />
      </div>

      {/* ── Content ── */}
      {/* Content: sits in the visible area between navbar and scroll hint */}
      <div className="absolute inset-x-0 top-16 bottom-12 z-10 flex items-center sm:top-[72px]">
        <main className="w-full max-w-6xl pl-10 pr-5 sm:pl-10 sm:pr-8 lg:pl-20">
          <div className="max-w-[590px]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-9 bg-[#C8960C]" aria-hidden="true" />
              <span className={isKannada
                ? 'inline-block font-kannada text-[12px] font-semibold leading-relaxed tracking-normal text-[#1E3A5F]/80 sm:text-[13px]'
                : 'inline-block text-[10px] font-semibold uppercase tracking-[0.32em] text-[#1E3A5F]/80 sm:text-[11px]'}>
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* Primary brand signature */}
            <h1
              className={`mb-5 w-full select-none ${kn}`}
              aria-label={`${headlineLead} ${headlineAccent}`}
            >
              <span className={isKannada ? 'block overflow-visible pb-1' : 'block overflow-hidden pb-1'}>
                <motion.span
                  initial={{ opacity: 0, y: '100%' }}
                  animate={ready ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
                  transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={isKannada
                    ? 'block font-kannada text-[28px] font-semibold leading-[1.2] tracking-normal text-[#A66F08] sm:text-[32px] md:text-[34px]'
                    : 'block font-luxury text-[25px] font-medium leading-none tracking-[0.22em] text-[#A66F08] sm:text-[30px] md:text-[34px]'}
                >
                  {headlineLead}
                </motion.span>
              </span>
              <span className={isKannada ? 'mt-0 block overflow-visible pb-1' : 'mt-2 block overflow-hidden pb-2'}>
                <motion.span
                  initial={{ opacity: 0, y: '100%' }}
                  animate={ready ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
                  transition={{ duration: 0.78, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={isKannada
                    ? 'block font-kannada text-[46px] font-semibold leading-[1.1] tracking-normal text-[#0F172A] sm:text-[56px] md:text-[62px] lg:text-[68px]'
                    : 'block font-luxury text-[46px] font-medium leading-[0.9] tracking-[-0.055em] text-[#0F172A] sm:text-[58px] md:text-[64px] lg:text-[70px]'}
                >
                  {headlineAccent}
                </motion.span>
              </span>
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 block h-px w-24 origin-left bg-gradient-to-r from-[#C8960C] to-[#C8960C]/0"
                aria-hidden="true"
              />
            </h1>

            {/* Supporting content follows the brand-signature reveal. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Society name + subtitle */}
              <p className={isKannada
                ? 'mb-3 font-kannada text-[12px] font-medium leading-relaxed tracking-normal text-[#1E3A5F]/60 sm:text-[13px]'
                : 'mb-3 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#1E3A5F]/55 sm:text-[11px]'}>
                {tf(society.name)}
              </p>
              <p className={isKannada
                ? 'mb-7 max-w-[540px] font-kannada text-[21px] font-medium leading-[1.58] tracking-normal text-[#334155] sm:text-[23px] md:text-[24px]'
                : 'mb-7 max-w-[520px] font-display text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-[#334155] sm:text-[23px] md:text-[25px]'}>
                {t('hero.subtitle')}
              </p>

              {/* Business stats */}
              <p className={isKannada
                ? 'mb-4 font-kannada text-[11px] font-semibold leading-relaxed tracking-normal text-[#64748B] sm:text-[12px]'
                : 'mb-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#64748B] sm:text-[10px]'}>
                {lang === 'kn' ? 'ನಮ್ಮ ಬೆಳವಣಿಗೆ · 2024–25' : 'Our Business · FY 2024–25'}
              </p>

              <div className="grid grid-cols-2 gap-y-5 border-y border-[#1E3A5F]/10 bg-white/10 py-4 backdrop-blur-[2px] sm:grid-cols-4 sm:gap-y-0">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, delay: 0.72 + i * 0.07 }}
                    className={`${i % 2 === 1 ? 'border-l border-[#1E3A5F]/10 pl-5' : ''} ${i > 0 ? 'sm:border-l sm:border-[#1E3A5F]/10 sm:pl-5' : ''}`}
                  >
                    <p className={isKannada
                      ? 'font-sans text-[26px] font-semibold leading-none tracking-normal text-[#0F172A] sm:text-[25px]'
                      : 'font-luxury text-[27px] font-semibold leading-none tracking-[-0.035em] text-[#0F172A] sm:text-[25px]'}>
                      <StatCounter value={s.value} format={s.format} />
                    </p>
                    <p className={isKannada
                      ? 'mt-2 font-kannada text-[10px] font-medium leading-relaxed tracking-normal text-[#64748B] sm:text-[9px] lg:text-[10px]'
                      : 'mt-2 text-[9px] font-medium uppercase leading-snug tracking-[0.08em] text-[#64748B] sm:text-[8px] lg:text-[9px]'}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => go('contact')}
                  className={`group inline-flex items-center gap-3 rounded-full bg-[#1E3A5F] px-6 py-3.5 text-[13px] font-semibold ${isKannada ? 'font-kannada tracking-normal' : 'tracking-wide'} text-white shadow-[0_10px_30px_rgba(30,58,95,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#162f4d] hover:shadow-[0_14px_36px_rgba(30,58,95,0.24)] active:scale-95`}
                >
                  {t('cta.becomeMember')}
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-70 transition-transform group-hover:translate-x-0.5">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => go('schemes')}
                  className={`inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/15 bg-white/55 px-6 py-3.5 text-[13px] font-semibold ${isKannada ? 'font-kannada tracking-normal' : 'tracking-wide'} text-[#0F172A] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#C8960C]/45 hover:bg-white/85`}
                >
                  {t('cta.explore')}
                </button>
              </div>

              {/* Registration badge */}
              <div className="mt-5">
                <span className={`inline-flex items-center gap-2 text-[10px] font-medium ${isKannada ? 'font-kannada tracking-normal' : 'uppercase tracking-[0.12em]'} text-[#64748B]`}>
                  <span className="grid h-4 w-4 place-items-center rounded-full border border-[#C8960C]/35 bg-white/60">
                    <span className="h-1 w-1 rounded-full bg-[#C8960C]" />
                  </span>
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
