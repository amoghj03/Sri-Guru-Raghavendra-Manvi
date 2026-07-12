import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const pillars = t('about.pillars')

  return (
    <section id="about" className="section-pad bg-[#F8FAFC]">
      <div className="container-x">
        <SectionHeading eyebrow={t('nav.about')} title={t('about.heading')} />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className={`text-lg leading-[1.85] text-[#334155] ${kn}`}>{t('about.body1')}</p>
            <p className={`text-lg leading-[1.85] text-[#334155] ${kn}`}>{t('about.body2')}</p>
          </motion.div>

          {/* Pillars */}
          <div className="flex flex-col gap-4">
            <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#94A3B8] ${kn}`}>
              {t('about.pillarsTitle')}
            </p>
            {Array.isArray(pillars) &&
              pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex items-start gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)]"
                >
                  <span className="mt-[5px] block h-5 w-[3px] shrink-0 rounded-full bg-[#C8960C]" />
                  <div>
                    <h4 className={`text-[15px] font-semibold text-[#0F172A] ${kn}`}>{p.title}</h4>
                    <p className={`mt-1.5 text-sm leading-relaxed text-[#64748B] ${kn}`}>{p.text}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
