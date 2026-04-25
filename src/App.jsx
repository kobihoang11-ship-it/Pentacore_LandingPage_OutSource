import LoadingScreen   from './components/LoadingScreen'
import Header          from './components/Header'
import HeroSection     from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import ProductionSection from './components/ProductionSection'
import ProjectsSection from './components/ProjectsSection'
import ShortsSection   from './components/ShortsSection'
import StudioSection   from './components/StudioSection'
import CTAFooter       from './components/CTAFooter'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ShortsSection />
        <StudioSection />
        <CTAFooter />
      </main>
    </>
  )
}
