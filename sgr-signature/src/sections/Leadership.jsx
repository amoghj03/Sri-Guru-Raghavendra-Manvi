import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { boardMembers, headOfficeStaff, branchStaff } from '../data/society'
import presidentPortrait from '../assets/president-portrait.jpg'
import vicePresidentPortrait from '../assets/vice-president-portrait.jpg'
import ceoPortrait from '../assets/ceo-portrait.jpg'

function initials(name) {
  const clean = name.replace(/^(Shri|Smt)\.?\s*/i, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase()
}

function StaffCard({ person, kn, showContact, photo }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-4">
      {photo ? (
        <img
          src={photo}
          alt={person.name}
          className="h-10 w-10 shrink-0 rounded-full border border-white/[0.15] object-cover object-top"
        />
      ) : (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-xs font-bold text-white/50">
          {initials(person.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{person.name}</p>
        <p className={`text-xs text-[#C8960C] ${kn}`}>{person.role}</p>
        <div className="mt-0.5 flex flex-wrap gap-x-3 text-[11px] text-white/30">
          {person.qualification && <span>{person.qualification}</span>}
          {showContact && person.phone && (
            <a href={`tel:${person.phone}`} className="hover:text-[#C8960C] transition-colors">
              {person.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Leadership() {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''

  const president = boardMembers.find((m) => /^President$/i.test(m.role))
  const vicePresident = boardMembers.find((m) => /Vice President/i.test(m.role))
  const directors = boardMembers.filter((m) => !/President/i.test(m.role))

  return (
    <section id="leadership" className="section-pad bg-[#0B1F3A]">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('nav.leadership')}
          title={t('leadership.boardHeading')}
          subtitle={t('leadership.boardSub')}
          dark
        />

        {/* President + Vice President */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {[president, vicePresident].filter(Boolean).map((m, i) => {
            const isPresident = /^President$/i.test(m.role)
            const photo = isPresident ? presidentPortrait : vicePresidentPortrait
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center gap-5 rounded-2xl border p-6 ${
                  isPresident
                    ? 'border-[#C8960C]/30 bg-[#C8960C]/[0.07]'
                    : 'border-white/[0.08] bg-white/[0.04]'
                }`}
              >
                <img
                  src={photo}
                  alt={m.name}
                  className={`h-16 w-16 shrink-0 rounded-2xl border object-cover object-top ${
                    isPresident ? 'border-[#C8960C]/40' : 'border-white/[0.15]'
                  }`}
                />
                <div>
                  <p className={`text-base font-semibold text-white ${kn}`}>{m.name}</p>
                  <p className={`mt-0.5 text-sm font-medium ${isPresident ? 'text-[#C8960C]' : 'text-white/50'} ${kn}`}>
                    {m.role}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Directors */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {directors.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-xs font-bold text-white/50">
                {initials(m.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{m.name}</p>
                <p className={`text-xs text-white/35 ${kn}`}>{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Staff */}
        <div className="mt-20">
          <h3 className={`font-display text-center text-3xl font-medium tracking-tight text-white sm:text-4xl ${kn}`}>
            {t('leadership.staffHeading')}
          </h3>
          <span className="mt-4 mx-auto block h-px w-12 rounded-full bg-[#C8960C]/60" />

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8] ${kn}`}>
                {t('leadership.headStaff')}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {headOfficeStaff.map((p, i) => (
                  <StaffCard
                    key={i}
                    person={p}
                    kn={kn}
                    showContact
                    photo={/Chief Executive Officer/i.test(p.role) ? ceoPortrait : undefined}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8] ${kn}`}>
                {t('leadership.branchStaff')}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {branchStaff.map((p, i) => (
                  <StaffCard key={i} person={p} kn={kn} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
