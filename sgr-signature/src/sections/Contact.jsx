import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { offices } from '../data/society'

export default function Contact() {
  const { t, tf, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const headEmail = offices[0].email

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Membership Enquiry — Website')
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`)
    window.location.href = `mailto:${headEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('nav.contact')}
          title={t('contact.heading')}
          subtitle={t('contact.subheading')}
        />

        <div className="mt-14 flex flex-col gap-6">
          {/* Office cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {offices.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]"
              >
                {/* Card header */}
                <div className="border-b border-[#E2E8F0] px-7 py-5">
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8] ${kn}`}>
                    {tf(o.type)}
                  </span>
                  <h3 className={`font-display mt-1 text-3xl font-medium tracking-tight text-[#0F172A] ${kn}`}>{tf(o.city)}</h3>
                  <span className="mt-3 block h-[2px] w-8 rounded-full bg-[#C8960C]" />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-5 px-7 py-6">
                  {/* Address */}
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9]">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#1E3A5F"/>
                      </svg>
                    </div>
                    <p className={`text-sm leading-relaxed text-[#475569] ${kn}`}>{tf(o.address)}</p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9]">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4Zm1.5.75 4.5 3 4.5-3" stroke="#1E3A5F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <a href={`mailto:${o.email}`} className={`text-sm font-medium text-[#1E3A5F] hover:text-[#163254] transition-colors ${kn}`}>
                      {o.email}
                    </a>
                  </div>

                  {/* Phone */}
                  {o.phone && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <a href={`tel:${o.phone.replace(/\s/g, '')}`} className={`text-sm font-medium text-[#334155] hover:text-[#0F172A] transition-colors ${kn}`}>
                        {o.phone}
                      </a>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto border-t border-[#F1F5F9] pt-5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-2.5 text-sm font-medium text-[#1E3A5F] transition-all hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] ${kn}`}
                    >
                      {t('cta.getDirections')}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]"
          >
            <h3 className={`font-display text-3xl font-medium tracking-tight text-[#0F172A] ${kn}`}>{t('contact.formTitle')}</h3>
            <span className="mt-3 mb-6 block h-[2px] w-8 rounded-full bg-[#C8960C]" />

            {sent ? (
              <p className={`rounded-xl border border-[#1E3A5F]/15 bg-[#F0F7FF] p-4 text-sm text-[#1E3A5F] ${kn}`}>
                ✓ {t('contact.sent')}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { key: 'name',  label: t('contact.name'),       type: 'text', required: true },
                    { key: 'phone', label: t('contact.phoneField'), type: 'tel',  required: true },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] ${kn}`}>
                        {label}
                      </label>
                      <input
                        required={required}
                        type={type}
                        value={form[key]}
                        onChange={update(key)}
                        className={`w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none placeholder:text-[#CBD5E1] transition-colors focus:border-[#1E3A5F]/40 focus:bg-white ${kn}`}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] ${kn}`}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={`w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none placeholder:text-[#CBD5E1] transition-colors focus:border-[#1E3A5F]/40 focus:bg-white ${kn}`}
                  />
                </div>
                <button
                  type="submit"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#163254] active:scale-[0.99] ${kn}`}
                >
                  {t('contact.send')}
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-70">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
