import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { fixedDepositRates, seniorCitizenBonus, recurringPlans, specialSchemes } from '../data/society'

export default function Schemes({ schemes }) {
  const { t, tf, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  // Use API data if available, fall back to hardcoded
  const fdRates     = schemes?.fd?.length      ? schemes.fd      : fixedDepositRates
  const rdPlans     = schemes?.rd?.length      ? schemes.rd      : recurringPlans
  const specials    = schemes?.special?.length  ? schemes.special : specialSchemes
  const seniorBonus = schemes?.bonus            ?? seniorCitizenBonus

  return (
    <section id="schemes" className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('nav.schemes')}
          title={t('schemes.heading')}
          subtitle={t('schemes.subheading')}
        />

        <div className="mt-14 space-y-10">
          {/* Fixed Deposit rates */}
          <div>
            <h3 className={`font-display mb-5 text-2xl font-medium text-[#0F172A] ${kn}`}>{t('schemes.fdTitle')}</h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {fdRates.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-4 py-6 text-center"
                >
                  <span className="text-3xl font-bold tracking-tight text-[#C8960C]">{r.rate}</span>
                  <span className="mt-2 block h-px w-8 rounded-full bg-[#E2E8F0]" />
                  <span className={`mt-2 text-xs leading-snug text-[#64748B] ${kn}`}>{tf(r.duration)}</span>
                </motion.div>
              ))}
            </div>
            <p className={`mt-3 text-[11px] text-[#94A3B8] ${kn}`}>★ {tf(seniorBonus)}</p>
          </div>

          {/* Recurring / Investment plans */}
          <div>
            <h3 className={`font-display mb-5 text-2xl font-medium text-[#0F172A] ${kn}`}>{t('schemes.rdTitle')}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {rdPlans.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white px-5 py-6"
                >
                  <span className="text-xl font-bold text-[#0F172A]">{p.invest}</span>
                  <span className={`mt-1 text-xs text-[#94A3B8] ${kn}`}>{tf(p.duration)}</span>
                  <span className="my-4 block h-px w-full bg-[#E2E8F0]" />
                  <span className={`text-[11px] uppercase tracking-wider text-[#94A3B8] ${kn}`}>{t('schemes.maturity')}</span>
                  <span className="mt-1 text-base font-bold text-[#C8960C]">{p.maturity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Special schemes */}
        <div className="mt-12">
          <p className={`text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#1E3A5F] ${kn}`}>
            {t('schemes.specialTitle')}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {specials.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border-2 border-[#C8960C] bg-gradient-to-br from-[#fffbf0] to-white p-7"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#C8960C]/8 blur-2xl" />
                <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8960C]/10 text-lg font-extrabold text-[#C8960C]">
                  {i === 0 ? '2×' : '3×'}
                </div>
                <span className="text-2xl text-[#C8960C]">{i === 0 ? '⊚' : '⊛'}</span>
                <h4 className={`mt-3 text-2xl font-bold text-[#0F172A] ${kn}`}>{tf(s.name)}</h4>
                <p className={`mt-1 text-sm font-medium text-[#334155] ${kn}`}>{tf(s.period)}</p>
                <p className={`mt-3 text-sm text-[#64748B] ${kn}`}>{tf(s.note)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
