import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import PopularItems from './components/PopularItems';
import Popsicles from './components/Popsicles';
import IceCreams from './components/IceCreams';
import FlavorMarquee from './components/FlavorMarquee';
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
      <PopularItems />
      <Popsicles />
      <IceCreams />
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
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Router>
        </CityProvider>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

export default App;
