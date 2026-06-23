import { useCity } from '../context/CityContext';
import { X, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function CityPopup() {
  const { showPopup, closePopup, selectCity, selectedCity, cities } = useCity();

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Select Your City">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePopup} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-bounce-in">
        <div className="bg-gradient-to-r from-melado-maroon to-melado-red p-6 text-white relative">
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <img src="/images/Logo.jpg" alt="Melado" className="h-8 w-auto rounded" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Select Your City</h2>
          </div>
          <p className="text-white/80 text-sm font-body">Find the Melado nearest to you</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-4 space-y-2">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => selectCity(city.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                city.highlighted
                  ? 'border-melado-red bg-melado-pink/30 hover:bg-melado-pink/50'
                  : selectedCity?.id === city.id
                  ? 'border-melado-green bg-melado-green/10'
                  : 'border-gray-100 hover:border-melado-rose hover:bg-melado-pink-light/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-melado-maroon text-lg">{city.name}</h3>
                    {city.highlighted && (
                      <span className="bg-melado-red text-white text-xs font-heading font-bold px-2 py-0.5 rounded-full">
                        Main Branch
                      </span>
                    )}
                    {selectedCity?.id === city.id && !city.highlighted && (
                      <span className="bg-melado-green text-white text-xs font-heading font-bold px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  {city.address !== 'Coming Soon' ? (
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 text-sm text-melado-maroon/70">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <span className="font-body">{city.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-melado-maroon/70">
                        <Clock size={14} className="flex-shrink-0" />
                        <span className="font-body">{city.hours}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-melado-maroon/50 font-body italic">{city.address}</p>
                  )}
                </div>
                <ChevronRight size={20} className="text-melado-maroon/30 group-hover:text-melado-red transition-colors mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
