import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from './i18n/LanguageContext'
import { society, galleryApiUrl, newsApiUrl } from './data/society'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Schemes from './sections/Schemes'
import Progress from './sections/Progress'
import Leadership from './sections/Leadership'
import PresidentMessage from './sections/PresidentMessage'
import Calculator from './sections/Calculator'
import Gallery from './sections/Gallery'
import NewsNotices from './sections/NewsNotices'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function normalizeAlbums(data) {
  const raw = Array.isArray(data) ? data : (data.albums || [])
  return raw
    .map((item, i) => {
      const images = (item.photos || item.images || []).map((img) => ({
        id:    img.id,
        name:  img.name?.replace(/\.[^/.]+$/, '') ?? '',
        url:   img.full  || img.url,
        thumb: img.thumbnail || img.thumb,
      }))
      return {
        id:    item.id || String(i),
        name:  item.title || item.name,
        images,
        cover: images[0] ?? null,
        count: images.length,
      }
    })
    .filter((a) => a.count > 0)
}

export default function App() {
  const { lang, tf } = useLanguage()
  const [splashDone, setSplashDone] = useState(false)

  const [albums,        setAlbums]        = useState([])
  const [galleryStatus, setGalleryStatus] = useState(galleryApiUrl ? 'loading' : 'done')

  const [newsItems,    setNewsItems]    = useState([])
  const [progressData, setProgressData] = useState([])
  const [schemesData,  setSchemesData]  = useState(null)
  const [newsStatus,   setNewsStatus]   = useState(newsApiUrl ? 'loading' : 'done')

  // Fetch gallery
  useEffect(() => {
    if (!galleryApiUrl) return
    fetch(galleryApiUrl)
      .then((r) => r.json())
      .then((data) => { setAlbums(normalizeAlbums(data)); setGalleryStatus('done') })
      .catch(() => setGalleryStatus('error'))
  }, [])

  // Fetch news + progress from the same sheet API
  useEffect(() => {
    if (!newsApiUrl) return
    fetch(newsApiUrl)
      .then((r) => r.json())
      .then((data) => {
        // Support both old array format and new { news, progress } format
        if (Array.isArray(data)) {
          setNewsItems(data)
        } else {
          setNewsItems(Array.isArray(data.news)        ? data.news     : [])
          setProgressData(Array.isArray(data.progress) ? data.progress : [])
          if (data.schemes) setSchemesData(data.schemes)
        }
        setNewsStatus('done')
      })
      .catch(() => setNewsStatus('error'))
  }, [])

  // Splash clears when both APIs have responded
  const apiReady = galleryStatus !== 'loading' && newsStatus !== 'loading'

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: society.name.en,
    foundingDate: '2016-01-07',
    areaServed: 'Manvi & Lingasugur, Karnataka, India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baygwat Complex, Near MTM Talkies, Sindhanur Road',
      addressLocality: 'Manvi',
      postalCode: '584123',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    email: 'sgr900manvi@gmail.com',
    telephone: '+91-8538-220900',
  }

  return (
    <>
      <SplashScreen onDone={() => setSplashDone(true)} apiReady={apiReady} />
      <Helmet htmlAttributes={{ lang }}>
        <title>{tf(society.name)} · {tf(society.place)}</title>
        <meta
          name="description"
          content="A member-centric cooperative society offering fixed deposits, recurring plans, loans and trusted society in Manvi & Lingasugur since 2016."
        />
        <meta property="og:title" content={`${society.name.en} · Manvi`} />
        <meta
          property="og:description"
          content="Trusted cooperative society — deposits, loans and member-centric financial services since 2016."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#F5F5F5" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <Navbar />
      <Hero ready={splashDone} latestProgress={progressData[progressData.length - 1] ?? null} />
      <main className={lang === 'kn' ? 'font-kannada' : ''}>
        <About />
        <PresidentMessage />
        <Schemes schemes={schemesData} />
        <Progress metrics={progressData} />
        <Gallery albums={albums} status={galleryStatus} />
        <Calculator />
        <NewsNotices items={newsItems} status={newsStatus} />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
