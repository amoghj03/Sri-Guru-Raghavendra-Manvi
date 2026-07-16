import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { offices, officeHours } from '../data/society'

export default function Contact() {
  const { t, tf, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const [selected, setSelected] = useState(offices[0])

  const { lat, lng } = selected.coords
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&output=embed&z=17`

  return (
    <section id="contact" className="flex min-h-screen flex-col bg-[#F8FAFC] lg:h-screen lg:min-h-0">
      <div className="container-x flex h-full flex-1 flex-col py-12 lg:py-14">

        {/* Heading */}
        <div className="mb-8 shrink-0">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] text-[#94A3B8] ${kn}`}>
            {t('nav.contact')}
          </p>
          <h2 className={`font-display mt-1.5 text-3xl font-medium tracking-tight text-[#0F172A] ${kn}`}>
            {t('contact.heading')}
          </h2>
          <p className={`mt-1.5 text-[13px] leading-relaxed text-[#64748B] ${kn}`}>
            {t('contact.subheading')}
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-6">

          {/* ── Left: office cards + hours ───────────────────────── */}
          <div className="flex flex-col gap-4 lg:w-[340px] xl:w-[380px] shrink-0">

            {offices.map((o) => {
              const active = selected.id === o.id
              return (
                <button
                  key={o.id}
                  onClick={() => setSelected(o)}
                  className={`flex-1 w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 ${
                    active
                      ? 'border-[#1E3A5F] bg-[#1E3A5F] shadow-md'
                      : 'border-[#E2E8F0] bg-white hover:border-[#1E3A5F]/20 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      active ? 'bg-white/10' : 'bg-[#F1F5F9]'
                    }`}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                          fill={active ? '#C8960C' : '#1E3A5F'}
                        />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                        active ? 'text-[#C8960C]' : 'text-[#94A3B8]'
                      } ${kn}`}>
                        {tf(o.type)}
                      </p>
                      <p className={`mt-0.5 text-[15px] font-semibold ${active ? 'text-white' : 'text-[#0F172A]'} ${kn}`}>
                        {tf(o.city)}
                      </p>
                      <p className={`mt-2 text-xs leading-relaxed ${active ? 'text-white/65' : 'text-[#64748B]'} ${kn}`}>
                        {tf(o.address)}
                      </p>
                      {o.phone && (
                        <p className={`mt-1.5 text-xs font-medium ${active ? 'text-white/80' : 'text-[#334155]'} ${kn}`}>
                          {o.phone}
                        </p>
                      )}
                      {o.email && (
                        <p className={`mt-0.5 text-xs ${active ? 'text-white/50' : 'text-[#94A3B8]'} ${kn}`}>
                          {o.email}
                        </p>
                      )}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${o.coords.lat},${o.coords.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                          active ? 'text-[#C8960C] hover:text-[#A66F08]' : 'text-[#1E3A5F] hover:text-[#163254]'
                        } ${kn}`}
                      >
                        {t('cta.getDirections')}
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Office hours */}
            <div className="mt-auto rounded-xl border border-[#E2E8F0] bg-white px-5 py-4">
              <div className="mb-2 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#1E3A5F" strokeWidth="1.5" />
                  <path d="M12 7v5l3 3" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8] ${kn}`}>
                  {t('contact.hours')}
                </span>
              </div>
              <p className={`text-[13px] text-[#334155] ${kn}`}>
                {tf(officeHours.days)} · {tf(officeHours.morning)}
              </p>
              <p className={`text-[13px] text-[#334155] ${kn}`}>{tf(officeHours.evening)}</p>
              <p className={`mt-1 text-xs text-[#94A3B8] ${kn}`}>{tf(officeHours.holiday)}</p>
            </div>
          </div>

          {/* ── Right: map ─────────────────────────────────────────── */}
          <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-3xl border border-[#E2E8F0] shadow-sm lg:min-h-0">
            <motion.iframe
              key={selected.id}
              src={mapSrc}
              title={`Map — ${tf(selected.city)}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 h-full w-full"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
