import { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesPopup from './FavoritesPopup';
import { Menu, X, Search, ArrowRight, MapPin, Instagram, Facebook, Heart, IceCream2, BookOpen, MapPinned, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Shop', href: '#menu', icon: IceCream2 },
  { name: 'Flavors', href: '#menu', icon: IceCream2 },
  { name: 'Story', href: '#story', icon: BookOpen },
  { name: 'Locations', href: '#visit', icon: MapPinned },
  { name: 'Contact Us', href: '#visit', icon: Phone },
];

export default function Navbar() {
  const { selectedCity, changeCity } = useCity();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-[#F8789C] text-white text-[11px] font-heading font-bold tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-2">
          <span>Premium Dairy Ice Cream by Guluna</span>
        </div>
      </div>

      <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

            <a href="#home" className="flex-shrink-0">
              <img src="/images/Logo.jpg" alt="Melado" className="h-8 sm:h-10 w-auto rounded" />
            </a>

            <div className="flex-1 min-w-0 max-w-md">
              <div className="flex items-center border-2 border-[#45AFC6] rounded-full bg-white">
                <div className="pl-3 sm:pl-4 flex-shrink-0">
                  <Search size={16} className="text-[#45AFC6]" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 min-w-0 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-body text-melado-maroon placeholder:text-melado-maroon/30 focus:outline-none bg-transparent"
                />
                <button className="bg-[#45AFC6] hover:bg-[#45AFC6] transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 m-0.5 rounded-full">
                  <ArrowRight size={14} className="text-white" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setFavOpen(true)} className="p-1.5 sm:p-2 text-[#45AFC6] hover:text-melado-red transition-colors relative" aria-label="Favorites">
                <Heart size={22} className={favorites.length > 0 ? 'fill-[#F8789C] text-[#F8789C]' : ''} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F8789C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="p-1.5 sm:p-2 text-[#45AFC6] hover:text-melado-red transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[90] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

          <div className={`absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <img src="/images/Logo.jpg" alt="Melado" className="h-9 w-auto rounded" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 bg-melado-pink hover:bg-melado-rose rounded-full flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <X size={16} className="text-melado-maroon" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="flex items-center gap-3 font-heading font-semibold text-melado-maroon px-4 py-3 rounded-xl hover:bg-melado-pink/20 transition-colors group"
                  >
                    <link.icon size={18} className="text-[#45AFC6] group-hover:text-[#F8789C] transition-colors" />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4 space-y-3">
                {selectedCity && (
                  <button
                    onClick={() => { changeCity(); setMenuOpen(false); }}
                    className="flex items-center gap-3 text-sm font-body w-full px-4 py-3 rounded-xl border-2 border-[#F8789C]/30 bg-[#F8789C]/5 hover:bg-[#F8789C]/10 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-[#F8789C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F8789C]/20 transition-colors">
                      <MapPin size={16} className="text-[#F8789C]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-[#F8789C] uppercase tracking-wider">Change Location</p>
                      <p className="text-sm font-medium text-melado-maroon">{selectedCity.name}</p>
                    </div>
                  </button>
                )}

                <a
                  href="https://www.instagram.com/themelado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-melado-maroon/60 font-body w-full px-4 py-2 rounded-xl hover:bg-melado-pink/20 transition-colors"
                >
                  <Instagram size={14} className="text-melado-rose" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/themelado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-melado-maroon/60 font-body w-full px-4 py-2 rounded-xl hover:bg-melado-pink/20 transition-colors"
                >
                  <Facebook size={14} className="text-melado-rose" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <a
                href="https://www.instagram.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-bold text-sm text-white bg-[#45AFC6] hover:bg-[#45AFC6] flex items-center justify-center gap-2 py-3 rounded-xl transition-all shadow-md"
              >
                ORDER NOW
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      <FavoritesPopup open={favOpen} onClose={() => setFavOpen(false)} />
    </>
  );
}
