import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return window.localStorage.getItem('sgr-lang') || 'en'
  })

  const setLanguage = useCallback((next) => {
    setLang(next)
    try {
      window.localStorage.setItem('sgr-lang', next)
    } catch {
      /* ignore storage errors */
    }
  }, [])

  const toggle = useCallback(() => {
    setLanguage(lang === 'en' ? 'kn' : 'en')
  }, [lang, setLanguage])

  // t() reads a dotted key path from the active translation table.
  const t = useCallback(
    (path) => {
      const parts = path.split('.')
      let node = translations[lang]
      for (const part of parts) {
        if (node == null) return path
        node = node[part]
      }
      return node == null ? path : node
    },
    [lang]
  )

  // tf() picks the active language from a {en, kn} field object.
  const tf = useCallback((field) => (field && field[lang]) || (field && field.en) || '', [lang])

  const value = useMemo(
    () => ({ lang, setLanguage, toggle, t, tf }),
    [lang, setLanguage, toggle, t, tf]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
