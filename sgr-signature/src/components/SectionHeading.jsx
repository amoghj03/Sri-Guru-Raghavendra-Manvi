import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', dark = false }) {
  const { lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignment} gap-3`}
    >
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.25em] ${dark ? 'text-[#C8960C]' : 'text-[#1E3A5F]'} ${kn}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-[#0F172A]'} ${kn}`}>
        {title}
      </h2>
      <span className={`h-px w-12 rounded-full bg-[#C8960C]/${dark ? '55' : '70'}`} />
      {subtitle && (
        <p className={`max-w-2xl text-[15px] leading-relaxed ${dark ? 'text-white/50' : 'text-[#334155]'} ${kn}`}>{subtitle}</p>
      )}
    </motion.div>
  )
}
