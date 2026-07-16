import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { progress } from '../data/society'
import { formatINRCompact } from '../utils/format'

const METRICS = [
  { key: 'capital', en: 'Working Capital',  kn: 'ದುಡಿಯುವ ಬಂಡವಾಳ' },
  { key: 'fd',      en: 'Fixed Deposits',   kn: 'ನಿಶ್ಚಿತ ಠೇವಣಿ'    },
  { key: 'loans',   en: 'Loans & Advances', kn: 'ಸಾಲ ಮತ್ತು ಮುಂಗಡ' },
  { key: 'share',   en: 'Share Capital',    kn: 'ಶೇರ್ ಬಂಡವಾಳ'     },
  { key: 'profit',  en: 'Net Profit',       kn: 'ನಿವ್ವಳ ಲಾಭ'      },
]

const W = 600
const H = 260
const PAD = { top: 40, right: 16, bottom: 44, left: 72 }
const IW = W - PAD.left - PAD.right
const IH = H - PAD.top - PAD.bottom

const SPRING = [0.22, 1.08, 0.36, 1]

export default function Progress({ metrics: apiMetrics }) {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const [active,  setActive]  = useState('profit')
  const [hovered, setHovered] = useState(null)

  // Use API data if available, fall back to hardcoded
  const progressData = (apiMetrics && apiMetrics.length > 0) ? apiMetrics : progress

  // Dynamic chart sizing based on actual row count
  const SLOTS  = progressData.length
  const SLOT_W = IW / SLOTS
  const BAR_W  = SLOT_W * 0.52
  const bx     = (i) => PAD.left + SLOT_W * i + (SLOT_W - BAR_W) / 2

  const latest = progressData[progressData.length - 1]
  const prev   = progressData[progressData.length - 2]

  const data    = progressData.map((p) => ({ year: p.year, value: p[active] }))
  const maxVal  = Math.max(...data.map((d) => d.value))

  const by = (v) => PAD.top + IH - (v / maxVal) * IH
  const bh = (v) => (v / maxVal) * IH

  const currentMetric = METRICS.find((m) => m.key === active)
  const label = (m) => (lang === 'kn' ? m.kn : m.en)

  const yoyPct = (((latest[active] - prev[active]) / prev[active]) * 100).toFixed(1)
  const yoyUp  = Number(yoyPct) >= 0

  const firstVal = data[0].value
  const lastVal  = data[data.length - 1].value
  const years    = progressData.length - 1
  const cagr     = years > 0 ? (((lastVal / firstVal) ** (1 / years) - 1) * 100).toFixed(1) : '0.0'

  const linePoints = data.map((d, i) => `${bx(i) + BAR_W / 2},${by(d.value)}`).join(' ')

  const handleMetricChange = (key) => {
    setHovered(null)
    setActive(key)
  }

  return (
    <section id="growth" className="section-pad bg-[#0B1F3A]">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('nav.progress')}
          title={t('progress.heading')}
          subtitle={t('progress.subheading')}
          dark
        />

        <div className="mt-14 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">

          {/* ── Metric selector ── */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 lg:w-[27%] lg:flex-col lg:overflow-visible lg:pb-0">
            {METRICS.map((m) => {
              const isSel = active === m.key
              const cur   = latest[m.key]
              const pre   = prev[m.key]
              const g     = (((cur - pre) / pre) * 100).toFixed(1)
              const up    = Number(g) >= 0

              return (
                <button
                  key={m.key}
                  onClick={() => handleMetricChange(m.key)}
                  className={`shrink-0 rounded-2xl border p-4 text-left transition-all duration-200 lg:w-full ${
                    isSel
                      ? 'border-[#C8960C]/30 bg-gradient-to-b from-[#1E3A5F]/60 to-[#0B1F3A]/50 shadow-[inset_0_0_0_1px_rgba(200,150,12,0.12),0_4px_20px_rgba(200,150,12,0.07)]'
                      : 'border-white/[0.06] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.05]'
                  }`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isSel ? 'text-[#C8960C]' : 'text-[#475569]'} ${kn}`}>
                    {label(m)}
                  </p>
                  <p className={`mt-1.5 text-[19px] font-bold leading-none ${isSel ? 'text-white' : 'text-white/35'}`}>
                    {formatINRCompact(cur)}
                  </p>
                  <p className={`mt-2 text-[11px] font-semibold ${up ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                    {up ? '▲' : '▼'} {Math.abs(Number(g))}%
                    <span className="ml-1 text-[9px] font-normal text-white/25">YoY</span>
                  </p>
                </button>
              )
            })}
          </div>

          {/* ── Chart panel ── */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">

            {/* Panel header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8] ${kn}`}>
                  {label(currentMetric)}
                </p>
                <p className="mt-0.5 text-[12px] text-white/25">FY {progressData[0].year} → {progressData[progressData.length - 1].year}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ${
                yoyUp
                  ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 ring-red-500/20'
              }`}>
                {yoyUp ? '▲' : '▼'} {Math.abs(Number(yoyPct))}%
                <span className="font-normal opacity-50">FY24→25</span>
              </span>
            </div>

            {/* SVG chart — width:100%/height:auto preserves aspect ratio without distortion */}
            <div className="px-4 pb-0 pt-3 sm:px-5">
              <AnimatePresence mode="wait">
                <motion.svg
                  key={active}
                  viewBox={`0 0 ${W} ${H}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  preserveAspectRatio="xMidYMid meet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  role="img"
                  aria-label={label(currentMetric)}
                >
                  <defs>
                    <linearGradient id="gBase" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#94A3B8" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0.04" />
                    </linearGradient>
                    <linearGradient id="gLatest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#D4A017" stopOpacity="0.95" />
                      <stop offset="50%"  stopColor="#B8780A" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="gHover" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#93C5FD" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>

                  {/* Baseline */}
                  <line
                    x1={PAD.left} x2={W - PAD.right}
                    y1={PAD.top + IH} y2={PAD.top + IH}
                    stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.1"
                  />

                  {/* Grid + Y labels */}
                  {[0.25, 0.5, 0.75, 1].map((frac) => {
                    const y = PAD.top + IH - frac * IH
                    return (
                      <g key={frac}>
                        <line
                          x1={PAD.left} x2={W - PAD.right}
                          y1={y} y2={y}
                          stroke="#FFFFFF"
                          strokeWidth="0.5"
                          strokeOpacity={frac === 1 ? 0.08 : 0.04}
                          strokeDasharray={frac < 1 ? '3 5' : '0'}
                        />
                        <text
                          x={PAD.left - 8} y={y}
                          textAnchor="end" dominantBaseline="middle"
                          fontSize="8.5" fill="#475569"
                        >
                          {formatINRCompact(frac * maxVal)}
                        </text>
                      </g>
                    )
                  })}

                  {/* Trend line */}
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#C8960C"
                    strokeWidth="1.2"
                    strokeOpacity="0.22"
                    strokeLinejoin="round"
                  />

                  {/* Bars, dots, labels */}
                  {data.map((d, i) => {
                    const isLast = i === data.length - 1
                    const isHov  = hovered === i
                    const x      = bx(i)
                    const cx     = x + BAR_W / 2
                    const barY   = by(d.value)
                    const barH   = Math.max(bh(d.value), 2)
                    const labelY = Math.max(barY - 14, PAD.top - 10)

                    return (
                      <g
                        key={d.year}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ cursor: 'default' }}
                      >
                        {/* Transparent hit area */}
                        <rect
                          x={x - 5} y={PAD.top}
                          width={BAR_W + 10} height={IH}
                          fill="transparent"
                        />

                        {/* Bar */}
                        <motion.rect
                          x={x} width={BAR_W} rx="3.5"
                          fill={isLast ? 'url(#gLatest)' : isHov ? 'url(#gHover)' : 'url(#gBase)'}
                          stroke={
                            isLast  ? 'rgba(212,160,23,0.45)'
                            : isHov ? 'rgba(147,197,253,0.3)'
                            :          'rgba(148,163,184,0.1)'
                          }
                          strokeWidth="0.75"
                          initial={{ height: 0, y: PAD.top + IH }}
                          animate={{ height: barH, y: barY }}
                          transition={{ duration: 0.65, delay: i * 0.055, ease: SPRING }}
                        />

                        {/* Dot on trend line */}
                        <motion.circle
                          cx={cx} cy={barY}
                          r={isLast ? 3.5 : 2.5}
                          fill={isLast ? '#C8960C' : isHov ? '#93C5FD' : '#475569'}
                          fillOpacity={isLast ? 1 : isHov ? 0.85 : 0.4}
                          stroke={isLast ? '#0B1F3A' : 'none'}
                          strokeWidth={isLast ? 1.5 : 0}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.055 + 0.45 }}
                        />

                        {/* Value label above bar */}
                        {(isLast || isHov) && (
                          <text
                            x={cx} y={labelY}
                            textAnchor="middle"
                            fontSize={isLast ? '9.5' : '9'}
                            fill={isLast ? '#D4A017' : '#93C5FD'}
                            fontWeight="700"
                          >
                            {formatINRCompact(d.value)}
                          </text>
                        )}

                        {/* X-axis label */}
                        <text
                          x={cx} y={H - 10}
                          textAnchor="middle"
                          fontSize="8.5"
                          fill={isLast ? '#C8960C' : isHov ? '#93C5FD' : '#475569'}
                          fontWeight={isLast || isHov ? '600' : '400'}
                        >
                          {d.year.slice(2)}
                        </text>
                      </g>
                    )
                  })}
                </motion.svg>
              </AnimatePresence>
            </div>

            {/* Bottom stat strip */}
            <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
              {[
                { label: `FY ${progressData[0].year}`, value: formatINRCompact(firstVal) },
                { label: `FY ${progressData[progressData.length - 1].year}`, value: formatINRCompact(lastVal), accent: true },
                { label: `${years}-Yr CAGR`, value: `${cagr}%` },
              ].map((stat) => (
                <div key={stat.label} className="py-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">{stat.label}</p>
                  <p className={`mt-1 text-[13px] font-bold ${stat.accent ? 'text-[#C8960C]' : 'text-white/55'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
