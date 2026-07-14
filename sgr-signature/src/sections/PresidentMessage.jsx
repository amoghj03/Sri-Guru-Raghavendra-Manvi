import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { boardMembers } from '../data/society'
import presidentPortrait from '../assets/president-portrait.jpg'

function initials(name) {
  const clean = name.replace(/^(Shri|Smt)\.?\s*/i, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase()
}

export default function PresidentMessage() {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const president = boardMembers.find((m) => /President/i.test(m.role))

  return (
    <section id="president" className="section-pad bg-[#0F172A]">
      <div className="container-x">
        <SectionHeading eyebrow={t('president.eyebrow')} title={t('president.heading')} dark />

        <div className="mt-14 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-12">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xs shrink-0 lg:w-72 lg:max-w-none"
          >
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/[0.08]">
              {/* Fallback gradient + initials shown behind image (visible if image missing) */}
              <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#1E3A5F] to-[#0B1F3A]">
                <span className="text-5xl font-bold text-[#C8960C]/40">
                  {president ? initials(president.name) : 'CE'}
                </span>
              </div>
              <img
                src={presidentPortrait}
                alt={t('president.name')}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              {/* Bottom name plate */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[#C8960C]/20 bg-[#FFFDF8]/95 px-6 py-4 shadow-[0_-12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                <p className={`text-sm font-semibold leading-snug text-[#0F172A] ${kn}`}>{t('president.name')}</p>
                <p className={`mt-1 text-xs font-semibold text-[#A66F08] ${kn}`}>{t('president.role')}</p>
              </div>
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex flex-1 flex-col justify-center rounded-3xl border border-white/[0.08] bg-white/[0.05] px-8 py-10 sm:px-12 sm:py-12"
          >
            {/* Decorative quote mark */}
            <span
              aria-hidden="true"
              className="absolute -top-4 left-10 select-none text-8xl font-serif leading-none text-[#C8960C]/25"
            >
              "
            </span>

            <blockquote>
              <p className={`text-[17px] leading-[1.85] text-white/70 ${kn}`}>
                {t('president.quote')}
              </p>
            </blockquote>

            <div className="my-8 h-px w-16 bg-[#C8960C]/40" />

            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 rounded-full bg-[#C8960C]/50" />
              <p className={`text-xs text-white/30 ${kn}`}>{t('president.since')}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
