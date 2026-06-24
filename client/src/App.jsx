import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import FlavorMarquee from './components/FlavorMarquee';
import MenuSection from './components/MenuSection';
import WhyUs from './components/WhyUs';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import CityPopup from './components/CityPopup';
import Admin from './pages/Admin';

function HomePage() {
  return (
    <>
      <Navbar />
      <CityPopup />
      <Hero />
      <CategoryCarousel />
      <FlavorMarquee />
      <MenuSection />
      <WhyUs />
      <VisitUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </CityProvider>
    </ErrorBoundary>
  );
}

export default App;
