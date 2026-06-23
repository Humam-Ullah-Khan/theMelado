import { createContext, useContext, useState, useEffect } from 'react';
import cities from '../data/cities';

const CityContext = createContext();

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem('melado-city');
    if (saved) {
      return cities.find(c => c.id === saved) || cities[0];
    }
    return null;
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!selectedCity) {
      setShowPopup(true);
    }
  }, []);

  const selectCity = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    if (city) {
      setSelectedCity(city);
      localStorage.setItem('melado-city', cityId);
      setShowPopup(false);
    }
  };

  const changeCity = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    if (selectedCity) {
      setShowPopup(false);
    }
  };

  return (
    <CityContext.Provider value={{ selectedCity, selectCity, changeCity, showPopup, closePopup, cities }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
