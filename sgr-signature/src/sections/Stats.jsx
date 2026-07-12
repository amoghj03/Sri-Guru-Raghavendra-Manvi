import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import StatCounter from '../components/StatCounter'
import { headlineStats } from '../data/society'
import { formatINRCompact } from '../utils/format'

export default function Stats() {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const items = [
    { label: t('stats.workingCapital'), value: headlineStats.workingCapital, format: formatINRCompact },
    { label: t('stats.fixedDeposit'),   value: headlineStats.fixedDeposit,   format: formatINRCompact },
    { label: t('stats.loans'),          value: headlineStats.loans,          format: formatINRCompact },
    { label: t('stats.profit'),         value: headlineStats.profit,         format: formatINRCompact },
    { label: t('stats.branches'),       value: headlineStats.branches,       format: (n) => Math.round(n).toString() },
    { label: t('stats.years'),          value: headlineStats.yearsServing,   format: (n) => `${Math.round(n)}+` },
  ]

  return (
    <div className="bg-[#0B1F3A]">
      <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-white/[0.06]">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="bg-white/[0.03] px-4 py-7 text-center"
          >
            <div className={`text-lg font-semibold tracking-tight text-[#C8960C] leading-none ${kn}`}>
              <StatCounter value={it.value} format={it.format} />
            </div>
            <span className="mt-2 mb-1.5 mx-auto block h-px w-6 rounded-full bg-white/20" />
            <p className={`text-[10px] uppercase tracking-[0.14em] text-white/35 ${kn}`}>
              {it.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
