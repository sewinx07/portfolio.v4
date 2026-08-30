import { HashRouter, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import PriceSection from './components/PriceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import AllProjectsPage from './components/AllProjectsPage'
import ProjectDetailPage from './components/ProjectDetailPage'
import AdminPage from './components/AdminPage'
import NotFoundPage from './components/NotFoundPage'

function HomePage() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <PriceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
