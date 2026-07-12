import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLanguage } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[#E2E8F0] p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-full px-3 py-1 transition-colors ${
          lang === 'en' ? 'bg-[#1E3A5F] text-white' : 'text-[#334155] hover:text-[#0F172A]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('kn')}
        aria-pressed={lang === 'kn'}
        className={`font-kannada rounded-full px-3 py-1 transition-colors ${
          lang === 'kn' ? 'bg-[#1E3A5F] text-white' : 'text-[#334155] hover:text-[#0F172A]'
        }`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  )
}
