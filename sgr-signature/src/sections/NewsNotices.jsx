import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'
import { newsAndNotices, newsApiUrl } from '../data/society'

const FILTERS = ['all', 'news', 'notice']

function formatDate(iso, lang) {
  const d = new Date(iso)
  return d.toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function NewsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function NoticeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function Modal({ item, lang, t, onClose }) {
  const isNotice = item.type === 'notice'
  const kn = lang === 'kn' ? 'font-kannada' : ''

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        <div className={`h-1.5 w-full ${isNotice ? 'bg-[#C8960C]' : 'bg-[#1E3A5F]'}`} />

        <div className="p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
              isNotice ? 'bg-[#FEF3C7] text-[#A66F08]' : 'bg-[#EFF6FF] text-[#1E3A5F]'
            } ${kn}`}>
              {isNotice ? <NoticeIcon /> : <NewsIcon />}
              {t(`news.badge_${item.type}`)}
            </span>
            <time className={`text-[11px] text-[#94A3B8] ${kn}`}>
              {formatDate(item.date, lang)}
            </time>
          </div>

          <h2 className={`text-[17px] font-semibold leading-snug text-[#0F172A] ${kn}`}>
            {item.title[lang] || item.title.en}
          </h2>

          <div className="my-4 h-px bg-[#F1F5F9]" />

          <p className={`max-h-[40vh] overflow-y-auto text-sm leading-relaxed text-[#475569] ${kn}`}>
            {item.body[lang] || item.body.en}
          </p>

          {item.doc_link && (
            <a
              href={item.doc_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 text-sm font-semibold text-[#1E3A5F] transition-colors hover:bg-[#EFF6FF] ${kn}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              View / Download Attachment
            </a>
          )}

          <button
            onClick={onClose}
            className={`mt-3 w-full rounded-xl bg-[#0F172A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F] ${kn}`}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Card({ item, lang, t, onOpen }) {
  const isNotice = item.type === 'notice'
  const kn = lang === 'kn' ? 'font-kannada' : ''

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.09)] transition-shadow duration-300"
    >
      <div className={`h-1 w-full ${isNotice ? 'bg-[#C8960C]' : 'bg-[#1E3A5F]'}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
            isNotice ? 'bg-[#FEF3C7] text-[#A66F08]' : 'bg-[#EFF6FF] text-[#1E3A5F]'
          } ${kn}`}>
            {isNotice ? <NoticeIcon /> : <NewsIcon />}
            {t(`news.badge_${item.type}`)}
          </span>
          <time className={`text-[11px] text-[#94A3B8] ${kn}`}>
            {formatDate(item.date, lang)}
          </time>
        </div>

        <h3 className={`flex-1 text-[15px] font-semibold leading-snug text-[#0F172A] ${kn}`}>
          {item.title[lang] || item.title.en}
        </h3>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => onOpen(item)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition-all ${
              isNotice
                ? 'bg-[#FEF3C7] text-[#A66F08] hover:bg-[#FDE68A]'
                : 'bg-[#EFF6FF] text-[#1E3A5F] hover:bg-[#DBEAFE]'
            } ${kn}`}
          >
            {t('news.readMore')}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {item.doc_link && (
            <a
              href={item.doc_link}
              target="_blank"
              rel="noopener noreferrer"
              title="Download attachment"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] transition-colors hover:border-[#1E3A5F] hover:text-[#1E3A5F]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
      <div className="h-1 w-full bg-[#E2E8F0]" />
      <div className="p-6 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-16 rounded-full bg-[#E2E8F0]" />
          <div className="h-4 w-20 rounded bg-[#E2E8F0]" />
        </div>
        <div className="h-4 w-full rounded bg-[#E2E8F0]" />
        <div className="h-4 w-3/4 rounded bg-[#E2E8F0]" />
        <div className="mt-4 h-8 w-24 rounded-lg bg-[#E2E8F0]" />
      </div>
    </div>
  )
}

export default function NewsNotices({ items: apiItems, status = 'done' }) {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  // If API is configured, use only API data. Otherwise fall back to hardcoded.
  const allItems = newsApiUrl ? (apiItems || []) : newsAndNotices

  const filtered = filter === 'all'
    ? allItems
    : allItems.filter((n) => n.type === filter)

  const filterLabel = { all: t('news.all'), news: t('news.badge_news'), notice: t('news.badge_notice') }

  return (
    <section id="news" className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('news.eyebrow')}
          title={t('news.heading')}
          subtitle={t('news.subheading')}
        />

        {/* Filter tabs */}
        <div className="mt-10 flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${kn} ${
                filter === f
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {filterLabel[f]}
              {f !== 'all' && status === 'done' && (
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  filter === f ? 'bg-white/20 text-white' : 'bg-white text-[#64748B]'
                }`}>
                  {allItems.filter((n) => n.type === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {status === 'loading' && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Cards grid */}
        {status !== 'loading' && (
          <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <Card key={item.id} item={item} lang={lang} t={t} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {status !== 'loading' && filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 py-10 text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#CBD5E1]">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className={`text-sm font-medium text-[#94A3B8] ${kn}`}>
              No news or notices available yet. Check back soon.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <Modal item={selected} lang={lang} t={t} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
