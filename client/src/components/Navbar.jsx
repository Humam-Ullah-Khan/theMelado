import { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

export default function Navbar() {
  const { selectedCity, changeCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '#menu' },
    { name: 'Flavors', href: '#', hasDropdown: true },
    { name: 'Story', href: '#story' },
    { name: 'Locations', href: '#visit' },
    { name: 'Contact Us', href: '#visit' },
  ];

  return (
    <>
      <div className="bg-melado-maroon text-white text-[11px] font-heading font-bold tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Crafted Daily
          </span>
          <span>Premium Dairy Ice Cream by Guluna</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Crafted Daily
          </span>
        </div>
      </div>

      <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            <a href="#home" className="flex items-center flex-shrink-0">
              <img src="/images/Logo.jpg" alt="Melado" className="h-12 w-auto rounded" />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-heading font-semibold px-4 py-2 text-sm text-melado-maroon hover:text-melado-red transition-colors duration-200 flex items-center gap-1"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className="opacity-50" />}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">

              <button className="text-melado-maroon hover:text-melado-red transition-colors p-1" aria-label="Search">
                <Search size={20} strokeWidth={2} />
              </button>

              <button className="font-heading font-bold text-sm text-melado-maroon border-2 border-melado-maroon px-6 py-2.5 rounded-full hover:bg-melado-maroon hover:text-white transition-all duration-200 flex items-center gap-2 ml-1">
                ORDER NOW
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-melado-maroon"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-heading font-semibold text-melado-maroon px-4 py-3 rounded-xl hover:bg-melado-pink/20 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-bold text-sm text-melado-maroon border-2 border-melado-maroon flex items-center justify-center gap-2 w-full py-3 rounded-xl hover:bg-melado-maroon hover:text-white transition-all"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
