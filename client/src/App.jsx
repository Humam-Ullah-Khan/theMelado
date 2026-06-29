import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import PopularItems from './components/PopularItems';
import DynamicSections from './components/DynamicSections';
import VideoSection from './components/VideoSection';
import FlavorMarquee from './components/FlavorMarquee';
import Footer from './components/Footer';
import CityPopup from './components/CityPopup';
import Admin from './pages/Admin';

function HomePageContent() {
  const { ready } = useLoading();

  return (
    <>
      <LoadingScreen ready={ready} />
      <Navbar />
      <CityPopup />
      <Hero />
      <CategoryCarousel />
      <PopularItems />
      <DynamicSections />
      <VideoSection />
      <FlavorMarquee />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <CityProvider>
          <LoadingProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePageContent />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Router>
          </LoadingProvider>
        </CityProvider>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

export default App;
