import { useState } from 'react';
import { Instagram, Facebook, MapPin, Heart, ArrowUp } from 'lucide-react';
import { useCity } from '../context/CityContext';

export default function Footer() {
  const { selectedCity, changeCity } = useCity();
  const [easterEgg, setEasterEgg] = useState(0);

  const handleEasterEgg = () => {
    setEasterEgg(prev => prev + 1);
    if (easterEgg >= 4) {
      alert('🍦 You found Guluna\'s secret! Made with love since day one. 💕');
      setEasterEgg(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-melado-maroon text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <button onClick={handleEasterEgg} className="flex items-center gap-2 mb-4 group">
              <img src="/images/Logo.jpg" alt="Melado" className="h-9 w-auto rounded group-hover:brightness-110 transition-all" />
              <span className="font-display text-2xl text-white">Melado</span>
            </button>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              Premium dairy ice cream crafted with love by Guluna. Authentic flavors, real ingredients, unforgettable taste.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/themelado" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-melado-rose transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Menu', 'Our Story', 'Visit Us'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="font-body text-white/60 text-sm hover:text-melado-pink transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              {selectedCity && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-melado-pink mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-white/60 text-sm">{selectedCity.name}</p>
                    <p className="font-body text-white/40 text-xs">{selectedCity.address}</p>
                  </div>
                </div>
              )}
              <button
                onClick={changeCity}
                className="font-body text-melado-pink text-sm hover:text-melado-rose transition-colors underline"
              >
                Change City
              </button>
              <p className="font-body text-white/60 text-sm">
                Open: {selectedCity?.hours || '12:00 PM – 1:00 AM'}
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Melado by Guluna. All rights reserved. Made with{' '}
            <Heart size={10} className="inline text-melado-rose fill-melado-rose" /> in Peshawar.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-melado-red transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
