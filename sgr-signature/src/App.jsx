import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from './i18n/LanguageContext'
import { society } from './data/society'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Stats from './sections/Stats'
import Schemes from './sections/Schemes'
import Progress from './sections/Progress'
import Leadership from './sections/Leadership'
import PresidentMessage from './sections/PresidentMessage'
import Contact from './sections/Contact'
import Footer from './components/Footer'

export default function App() {
  const { lang, tf } = useLanguage()
  const [ready, setReady] = useState(false)

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
      <SplashScreen onDone={() => setReady(true)} />
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
      <Hero ready={ready} />
      <main className={lang === 'kn' ? 'font-kannada' : ''}>
        {/* <Stats /> */}
        <About />
        <PresidentMessage />
        <Schemes />
        <Progress />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
