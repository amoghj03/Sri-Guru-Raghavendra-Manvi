import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

// ── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
const fmtPct = (n) => n.toFixed(2) + '%'

// ── Bilingual labels ─────────────────────────────────────────────────────────
const labels = {
  emi:        { en: 'EMI Calculator',    kn: 'ಇಎಂಐ ಲೆಕ್ಕಾಚಾರ'         },
  fd:         { en: 'FD Calculator',     kn: 'ಎಫ್‌ಡಿ ಲೆಕ್ಕಾಚಾರ'        },
  rd:         { en: 'RD Calculator',     kn: 'ಆರ್‌ಡಿ ಲೆಕ್ಕಾಚಾರ'        },
  loanAmt:    { en: 'Loan Amount',       kn: 'ಸಾಲದ ಮೊತ್ತ'              },
  principal:  { en: 'Principal Amount',  kn: 'ಮೂಲ ಮೊತ್ತ'               },
  monthlyDep: { en: 'Monthly Deposit',   kn: 'ಮಾಸಿಕ ಠೇವಣಿ'             },
  rate:       { en: 'Interest Rate',     kn: 'ಬಡ್ಡಿ ದರ'                 },
  tenure:     { en: 'Tenure',            kn: 'ಅವಧಿ'                     },
  months:     { en: 'months',            kn: 'ತಿಂಗಳು'                   },
  years:      { en: 'years',             kn: 'ವರ್ಷ'                     },
  monthlyEmi: { en: 'Monthly EMI',       kn: 'ಮಾಸಿಕ ಇಎಂಐ'              },
  totalInt:   { en: 'Total Interest',    kn: 'ಒಟ್ಟು ಬಡ್ಡಿ'              },
  totalAmt:   { en: 'Total Amount',      kn: 'ಒಟ್ಟು ಮೊತ್ತ'             },
  maturity:   { en: 'Maturity Amount',   kn: 'ಮೆಚ್ಯೂರಿಟಿ ಮೊತ್ತ'        },
  intEarned:  { en: 'Interest Earned',   kn: 'ಬಡ್ಡಿ ಗಳಿಕೆ'              },
  totalDep:   { en: 'Total Deposited',   kn: 'ಒಟ್ಟು ಠೇವಣಿ'             },
  effYield:   { en: 'Effective Yield',   kn: 'ಪರಿಣಾಮಕಾರಿ ಆದಾಯ'         },
}

// ── Shared sub-components ────────────────────────────────────────────────────
function SliderRow({ label, value, display, min, max, step, onChange, kn }) {
  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between ${kn}`}>
        <span className="text-sm text-white/55">{label}</span>
        <span className="rounded-lg bg-[#C8960C]/15 px-3 py-0.5 text-sm font-semibold text-[#C8960C]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ accentColor: '#C8960C' }}
      />
      <div className="flex justify-between text-[10px] text-white/20">
        <span>{min.toLocaleString('en-IN')}</span>
        <span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  )
}

function ResultRow({ label, value, primary = false, kn }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-xs text-white/45 ${kn}`}>{label}</span>
      <span className={`font-bold text-[#C8960C] ${primary ? 'text-3xl' : 'text-xl'}`}>
        {value}
      </span>
    </div>
  )
}

function ProportionBar({ principalPct, interestPct, principalLabel, interestLabel, kn }) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex overflow-hidden rounded-full" style={{ height: 8 }}>
        <div
          className="transition-all duration-500"
          style={{ width: `${principalPct}%`, background: '#1E3A5F' }}
        />
        <div
          className="transition-all duration-500"
          style={{ width: `${interestPct}%`, background: '#C8960C' }}
        />
      </div>
      <div className={`flex gap-4 text-[11px] ${kn}`}>
        <span className="flex items-center gap-1.5 text-white/45">
          <span className="inline-block h-2 w-2 rounded-sm bg-[#1E3A5F]" />
          {principalLabel}
        </span>
        <span className="flex items-center gap-1.5 text-white/45">
          <span className="inline-block h-2 w-2 rounded-sm bg-[#C8960C]" />
          {interestLabel}
        </span>
      </div>
    </div>
  )
}

// ── EMI Tab ──────────────────────────────────────────────────────────────────
function EmiTab({ lang }) {
  const L = (k) => labels[k][lang] || labels[k].en
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate]           = useState(12)
  const [tenure, setTenure]       = useState(60)

  const r       = rate / 12 / 100
  const n       = tenure
  const emi     = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const total   = emi * n
  const interest = total - principal

  const principalPct = Math.round((principal / total) * 100)
  const interestPct  = 100 - principalPct

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      {/* Inputs */}
      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
        <SliderRow
          label={L('loanAmt')}
          value={principal}
          display={fmt(principal)}
          min={10000}
          max={5000000}
          step={10000}
          onChange={setPrincipal}
          kn={kn}
        />
        <SliderRow
          label={`${L('rate')} (%)`}
          value={rate}
          display={`${rate}%`}
          min={5}
          max={24}
          step={0.5}
          onChange={setRate}
          kn={kn}
        />
        <SliderRow
          label={`${L('tenure')} (${L('months')})`}
          value={tenure}
          display={`${tenure} ${L('months')}`}
          min={6}
          max={360}
          step={6}
          onChange={setTenure}
          kn={kn}
        />
      </div>

      {/* Results */}
      <div className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 lg:w-72">
        <div className="space-y-5">
          <ResultRow label={L('monthlyEmi')} value={fmt(emi)} primary kn={kn} />
          <div className="h-px bg-white/[0.06]" />
          <ResultRow label={L('totalInt')}   value={fmt(interest)} kn={kn} />
          <ResultRow label={L('totalAmt')}   value={fmt(total)}    kn={kn} />
        </div>
        <ProportionBar
          principalPct={principalPct}
          interestPct={interestPct}
          principalLabel={L('loanAmt')}
          interestLabel={L('totalInt')}
          kn={kn}
        />
      </div>
    </div>
  )
}

// ── FD Tab ───────────────────────────────────────────────────────────────────
function FdTab({ lang }) {
  const L = (k) => labels[k][lang] || labels[k].en
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate]           = useState(10.5)
  const [tenure, setTenure]       = useState(2)

  // Quarterly compounding: A = P × (1 + r/4)^(4n)
  const maturity  = principal * Math.pow(1 + rate / 400, 4 * tenure)
  const interest  = maturity - principal
  // Effective annual yield: (1 + r/4)^4 - 1
  const effYield  = (Math.pow(1 + rate / 400, 4) - 1) * 100

  const principalPct = Math.round((principal / maturity) * 100)
  const interestPct  = 100 - principalPct

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      {/* Inputs */}
      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
        <SliderRow
          label={L('principal')}
          value={principal}
          display={fmt(principal)}
          min={1000}
          max={5000000}
          step={1000}
          onChange={setPrincipal}
          kn={kn}
        />
        <SliderRow
          label={`${L('rate')} (%)`}
          value={rate}
          display={`${rate}%`}
          min={6}
          max={12}
          step={0.5}
          onChange={setRate}
          kn={kn}
        />
        <SliderRow
          label={`${L('tenure')} (${L('years')})`}
          value={tenure}
          display={`${tenure} ${L('years')}`}
          min={1}
          max={5}
          step={0.5}
          onChange={setTenure}
          kn={kn}
        />
      </div>

      {/* Results */}
      <div className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 lg:w-72">
        <div className="space-y-5">
          <ResultRow label={L('maturity')}  value={fmt(maturity)}       primary kn={kn} />
          <div className="h-px bg-white/[0.06]" />
          <ResultRow label={L('intEarned')} value={fmt(interest)}        kn={kn} />
          <ResultRow label={L('effYield')}  value={fmtPct(effYield)}     kn={kn} />
        </div>
        <ProportionBar
          principalPct={principalPct}
          interestPct={interestPct}
          principalLabel={L('principal')}
          interestLabel={L('intEarned')}
          kn={kn}
        />
      </div>
    </div>
  )
}

// ── RD Tab ───────────────────────────────────────────────────────────────────
function RdTab({ lang }) {
  const L = (k) => labels[k][lang] || labels[k].en
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const [deposit, setDeposit] = useState(2000)
  const [rate, setRate]       = useState(10.5)
  const [tenure, setTenure]   = useState(36)

  // Simple-interest RD formula:
  // M = P×n + P × (n×(n+1)/2) × (r/1200)
  const n         = tenure
  const totalDep  = deposit * n
  const interest  = deposit * ((n * (n + 1)) / 2) * (rate / 1200)
  const maturity  = totalDep + interest

  const principalPct = Math.round((totalDep / maturity) * 100)
  const interestPct  = 100 - principalPct

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      {/* Inputs */}
      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
        <SliderRow
          label={L('monthlyDep')}
          value={deposit}
          display={fmt(deposit)}
          min={500}
          max={100000}
          step={500}
          onChange={setDeposit}
          kn={kn}
        />
        <SliderRow
          label={`${L('rate')} (%)`}
          value={rate}
          display={`${rate}%`}
          min={6}
          max={12}
          step={0.5}
          onChange={setRate}
          kn={kn}
        />
        <SliderRow
          label={`${L('tenure')} (${L('months')})`}
          value={tenure}
          display={`${tenure} ${L('months')}`}
          min={6}
          max={120}
          step={6}
          onChange={setTenure}
          kn={kn}
        />
      </div>

      {/* Results */}
      <div className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 lg:w-72">
        <div className="space-y-5">
          <ResultRow label={L('maturity')}  value={fmt(maturity)}  primary kn={kn} />
          <div className="h-px bg-white/[0.06]" />
          <ResultRow label={L('totalDep')}  value={fmt(totalDep)}  kn={kn} />
          <ResultRow label={L('intEarned')} value={fmt(interest)}  kn={kn} />
        </div>
        <ProportionBar
          principalPct={principalPct}
          interestPct={interestPct}
          principalLabel={L('totalDep')}
          interestLabel={L('intEarned')}
          kn={kn}
        />
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
const TABS = ['emi', 'fd', 'rd']

export default function Calculator() {
  const { lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const L = (k) => labels[k][lang] || labels[k].en

  const [active, setActive] = useState('emi')

  const heading  = lang === 'kn' ? 'ಹಣಕಾಸು ಲೆಕ್ಕಾಚಾರಗಳು' : 'Financial Calculators'
  const eyebrow  = lang === 'kn' ? 'ಸಾಧನಗಳು' : 'Tools'

  return (
    <section id="calculators" className="section-pad bg-[#0B1F3A]">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={heading} dark />

        {/* Tab bar */}
        <div className="mt-10 flex gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1.5">
          {TABS.map((tab) => {
            const isActive = active === tab
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${kn} ${
                  isActive
                    ? 'text-[#0B1F3A]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="calc-tab-bg"
                    className="absolute inset-0 rounded-xl bg-[#C8960C]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{L(tab)}</span>
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {active === 'emi' && <EmiTab lang={lang} />}
              {active === 'fd'  && <FdTab  lang={lang} />}
              {active === 'rd'  && <RdTab  lang={lang} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
