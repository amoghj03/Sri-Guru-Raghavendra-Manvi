import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

/* ── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const { t } = useLanguage()
  const img = images[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />

      <button onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
        aria-label={t('gallery.close')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>

      <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80">
        {index + 1} / {images.length}
      </span>

      <button onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={index === 0}
        className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 disabled:opacity-20 transition-colors"
        aria-label={t('gallery.prev')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <button onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={index === images.length - 1}
        className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 disabled:opacity-20 transition-colors"
        aria-label={t('gallery.next')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 mx-16 flex max-h-[85vh] max-w-4xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.url} alt={img.name}
            className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl" />
          {img.name && (
            <p className="mt-3 text-center text-sm font-medium text-white/70">{img.name}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Album Modal ──────────────────────────────────────────── */
function AlbumModal({ album, onClose, lang }) {
  const { t } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const [lightbox, setLightbox] = useState(null)
  const prev = useCallback(() => setLightbox((i) => Math.max(0, i - 1)), [])
  const next = useCallback(() => setLightbox((i) => Math.min(album.images.length - 1, i + 1)), [album.images.length])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && lightbox === null) onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, lightbox])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-5xl flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        style={{ maxHeight: '92dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-[#E2E8F0] px-5 py-4 sm:px-7">
          <div className="flex-1 min-w-0">
            <h3 className={`truncate text-base font-semibold text-[#0F172A] sm:text-lg ${kn}`}>{album.name}</h3>
            <p className={`text-xs text-[#94A3B8] ${kn}`}>{album.count} {t('gallery.photos')}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0] hover:text-[#0F172A]"
            aria-label={t('gallery.close')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable image grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
            {album.images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i % 16) * 0.03 }}
                className="mb-3 break-inside-avoid"
              >
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-xl bg-[#E2E8F0] focus:outline-none"
                >
                  <ImgWithSpinner
                    src={img.thumb}
                    alt={img.name}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 opacity-0 transition-all duration-300 group-hover:bg-[#0F172A]/35 group-hover:opacity-100">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox (above album modal) */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={album.images}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Image with spinner ───────────────────────────────────── */
function ImgWithSpinner({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <span className="relative block">
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center bg-[#E2E8F0]">
          <svg className="animate-spin text-[#1E3A5F]/40" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}

/* ── Skeleton ─────────────────────────────────────────────── */
function AlbumSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="aspect-[4/3] bg-[#E2E8F0]" />
          <div className="mt-3 h-4 w-2/3 rounded bg-[#E2E8F0]" />
          <div className="mt-2 h-3 w-1/3 rounded bg-[#E2E8F0]" />
        </div>
      ))}
    </div>
  )
}

/* ── Album Card ───────────────────────────────────────────── */
function AlbumCard({ album, onClick, index }) {
  const { t } = useLanguage()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
    >
      <button
        onClick={() => onClick(album)}
        className="group w-full text-left focus:outline-none"
      >
        <div className="overflow-hidden rounded-2xl bg-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            {album.cover ? (
              <ImgWithSpinner
                src={album.cover.thumb}
                alt={album.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#CBD5E1]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#94A3B8]">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              {album.count}
            </span>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-3">
            <p className="font-semibold text-[#0F172A] truncate">{album.name}</p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">{album.count} {t('gallery.photos')}</p>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

/* ── Main ─────────────────────────────────────────────────── */
export default function Gallery({ albums = [], status = 'loading' }) {
  const { t, lang } = useLanguage()
  const kn = lang === 'kn' ? 'font-kannada' : ''
  const [activeAlbum, setActiveAlbum] = useState(null)

  return (
    <section id="gallery" className="section-pad bg-[#F8FAFC]">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('gallery.eyebrow')}
          title={t('gallery.heading')}
          subtitle={t('gallery.subheading')}
        />

        <div className="mt-12">
          {status === 'loading' && (
            <div>
              <div className="flex flex-col items-center gap-3 py-10">
                <svg className="animate-spin text-[#1E3A5F]" width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className={`text-sm font-medium text-[#64748B] ${kn}`}>{t('gallery.loading')}</p>
              </div>
              <AlbumSkeleton />
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#CBD5E1]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className={`text-sm text-[#94A3B8] ${kn}`}>{t('gallery.error')}</p>
            </div>
          )}

          {status === 'done' && albums.length === 0 && (
            <p className={`py-16 text-center text-sm text-[#94A3B8] ${kn}`}>{t('gallery.empty')}</p>
          )}

          {status === 'done' && albums.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album, i) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  index={i}
                  onClick={setActiveAlbum}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Album modal */}
      <AnimatePresence>
        {activeAlbum && (
          <AlbumModal
            album={activeAlbum}
            lang={lang}
            onClose={() => setActiveAlbum(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
