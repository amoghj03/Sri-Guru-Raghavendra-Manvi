import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import presidentPortrait from '../assets/president-portrait.jpg'
import ceoPortrait from '../assets/ceo-portrait.jpg'

function LeaderCard({ portrait, nameKey, roleKey, quoteKey, sinceKey, delay }) {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className="relative flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.04] px-8 py-9"
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-6 select-none font-serif text-[7rem] leading-none text-[#C8960C]/[0.09]"
      >
        "
      </span>

      {/* Profile row */}
      <div className="flex items-center gap-5">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full ring-2 ring-[#C8960C]/50 ring-offset-2 ring-offset-[#0B1F3A]">
          <img
            src={portrait}
            alt={t(nameKey)}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div>
          <p className={`text-[15px] font-semibold leading-snug text-white ${kn}`}>{t(nameKey)}</p>
          <p className={`mt-0.5 text-xs font-medium text-[#C8960C] ${kn}`}>{t(roleKey)}</p>
          <p className={`mt-1 text-[11px] text-white/25 ${kn}`}>{t(sinceKey)}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-white/[0.07]" />

      {/* Quote */}
      <p className={`text-[15px] leading-[1.9] text-white/60 ${kn}`}>{t(quoteKey)}</p>
    </motion.div>
  )
}

export default function PresidentMessage() {
  const { t } = useLanguage()

  return (
    <section id="president" className="section-pad bg-[#0B1F3A]">
      <div className="container-x">
        <SectionHeading eyebrow={t('president.eyebrow')} title={t('president.heading')} dark />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <LeaderCard
            portrait={presidentPortrait}
            nameKey="president.name"
            roleKey="president.role"
            quoteKey="president.quote"
            sinceKey="president.since"
            delay={0}
          />
          <LeaderCard
            portrait={ceoPortrait}
            nameKey="ceo.name"
            roleKey="ceo.role"
            quoteKey="ceo.quote"
            sinceKey="ceo.since"
            delay={0.12}
          />
        </div>
      </div>
    </section>
  )
}
