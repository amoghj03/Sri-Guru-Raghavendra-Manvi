import { useLanguage } from '../i18n/LanguageContext'
import { society, offices, officeHours } from '../data/society'
import sgrLogo from '../assets/SGR_MANVI.png'

const navLinks = [
  { id: 'about',      key: 'nav.about'      },
  { id: 'schemes',    key: 'nav.schemes'    },
  { id: 'growth',     key: 'nav.progress'   },
  { id: 'leadership', key: 'nav.leadership' },
  { id: 'contact',    key: 'nav.contact'    },
]

export default function Footer() {
  const { t, tf, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const year = new Date().getFullYear()

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="border-t border-white/[0.06] bg-[#0B1F3A]">
      {/* Main footer content */}
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.6fr_1fr_1.6fr]">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={sgrLogo}
              alt="SGR Sahakari Sangha"
              className="h-12 w-auto rounded-lg bg-white object-contain p-1"
            />
            <span className={`text-[15px] font-semibold text-white/90 ${kn}`}>
              {tf(society.shortName)}
            </span>
          </div>
          <p className={`mt-4 max-w-xs text-sm leading-relaxed text-white/45 ${kn}`}>
            {t('footer.tagline')}
          </p>
          <p className={`mt-3 text-xs text-white/25 ${kn}`}>{tf(society.registration)}</p>
        </div>

        {/* Quick links */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#C8960C] ${kn}`}>
            {t('footer.quickLinks')}
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`text-sm text-white/50 transition-colors hover:text-white/90 ${kn}`}
                >
                  {t(l.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#C8960C] ${kn}`}>
            {t('footer.offices')}
          </p>
          <ul className="mt-4 space-y-5">
            {offices.map((o) => (
              <li key={o.id} className="text-sm">
                <p className={`font-semibold text-white/85 ${kn}`}>
                  {tf(o.type)} — {tf(o.city)}
                </p>
                <p className={`mt-1 leading-relaxed text-white/45 ${kn}`}>{tf(o.address)}</p>
                <p className="mt-1">
                  <a href={`mailto:${o.email}`} className="text-[#C8960C] transition-colors hover:text-[#D4A214]">
                    {o.email}
                  </a>
                </p>
                {o.phone && (
                  <p>
                    <a
                      href={`tel:${o.phone.replace(/\s/g, '')}`}
                      className="text-white/50 transition-colors hover:text-white/85"
                    >
                      {o.phone}
                    </a>
                  </p>
                )}
                <p className={`mt-1.5 text-white/40 ${kn}`}>
                  {tf(officeHours.days)}: {tf(officeHours.morning)}, {tf(officeHours.evening)}
                </p>
                <p className={`text-[11px] text-white/25 ${kn}`}>{tf(officeHours.holiday)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p className={kn}>
            © {year} {tf(society.name)}. {t('footer.rights')}
          </p>
          <p className={`max-w-xl md:text-right ${kn}`}>
            Created by <span className="font-semibold text-[#C8960C]">Goloka Innovations</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
