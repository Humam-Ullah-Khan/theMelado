import { useState } from 'react';
import { useCity } from '../context/CityContext';
import { X, ChevronDown, MapPin } from 'lucide-react';

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
          className="absolute top-4 right-4 w-8 h-8 bg-melado-pink hover:bg-melado-rose rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-melado-maroon" />
        </button>

        <div className="text-center mb-5">
          <img src="/images/Logo.jpg" alt="Melado" className="h-16 w-auto rounded-xl mx-auto mb-4 shadow-md" />
          <h2 className="font-heading font-bold text-xl text-melado-maroon">Select your order type</h2>
        </div>

        <div className="flex justify-center mb-5">
          <span className="bg-melado-red text-white font-heading font-bold text-sm px-8 py-2.5 rounded-full shadow-md">
            Delivery
          </span>
        </div>

        <p className="text-center text-sm text-melado-maroon/60 font-body font-medium mb-5">Please select your location</p>

        <div className="mb-4">
          <label className="font-body text-sm font-semibold text-melado-maroon mb-2 block">
            Select City / Region <span className="text-melado-red">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <MapPin size={16} className="text-melado-rose" />
            </div>
            <select
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              className="w-full appearance-none border-2 border-melado-pink rounded-xl pl-10 pr-10 py-3 font-body text-sm text-melado-maroon focus:outline-none focus:border-melado-rose transition-colors bg-melado-pink-light/20"
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-melado-rose pointer-events-none" />
          </div>
        </div>

        <div className="mb-6">
          <label className="font-body text-sm font-semibold text-melado-maroon mb-2 block">
            Select Area / Sub Region
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <MapPin size={16} className="text-melado-pink-dark" />
            </div>
            <select
              className="w-full appearance-none border-2 border-melado-pink/50 rounded-xl pl-10 pr-10 py-3 font-body text-sm text-melado-maroon/40 focus:outline-none focus:border-melado-rose transition-colors bg-melado-pink-light/20 disabled:opacity-50"
              disabled={!tempCity}
            >
              <option value="">Choose an area</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-melado-pink-dark pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleSelect}
          disabled={!tempCity}
          className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 ${
            tempCity
              ? 'bg-melado-red hover:bg-melado-red-dark text-white shadow-lg hover:shadow-xl cursor-pointer'
              : 'bg-melado-pink text-melado-maroon/30 cursor-not-allowed'
          }`}
        >
          Select
        </button>
      </div>
    </div>
  );
}
