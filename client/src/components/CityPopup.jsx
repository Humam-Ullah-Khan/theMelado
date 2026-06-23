import { useState } from 'react';
import { useCity } from '../context/CityContext';
import { X } from 'lucide-react';

export default function CityPopup() {
  const { showPopup, closePopup, selectCity, selectedCity, cities } = useCity();
  const [tempCity, setTempCity] = useState(selectedCity?.id || '');

  if (!showPopup) return null;

  const handleSelect = () => {
    if (tempCity) {
      selectCity(tempCity);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Select Your City">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closePopup} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[460px] p-8 animate-fade-in">

        <button
          onClick={closePopup}
          className="absolute top-4 right-4 w-8 h-8 bg-[#F8789C] hover:bg-[#F8789C]/80 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-melado-maroon" />
        </button>

        <div className="text-center mb-5">
          <img src="/images/Logo.jpg" alt="Melado" className="h-16 w-auto rounded-xl mx-auto mb-4" />
          <h2 className="font-heading font-bold text-xl text-[#F8789C]">Select your order type</h2>
        </div>

        <p className="text-center text-sm text-melado-maroon/60 font-body font-medium mb-5">Please select your location</p>

        <div className="mb-4">
          <div className="border-2 border-[#45AFC6] rounded-2xl overflow-hidden">
            <div className="max-h-[180px] overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ddd transparent' }}>
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setTempCity(city.id)}
                  className={`w-full text-left px-6 py-4 font-body text-base transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                    tempCity === city.id
                      ? 'bg-[#F8789C] text-white font-semibold'
                      : 'text-melado-maroon/80 hover:bg-[#F8789C] hover:text-white'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-melado-maroon/50 font-body mt-3">Select City / Region</p>
        </div>



        <button
          onClick={handleSelect}
          disabled={!tempCity}
          className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 ${
            tempCity
              ? 'bg-[#F8789C] hover:bg-[#F8789C]/90 text-white shadow-lg hover:shadow-xl cursor-pointer'
              : 'bg-melado-pink text-melado-maroon/30 cursor-not-allowed'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
}
