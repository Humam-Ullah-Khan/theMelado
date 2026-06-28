import { useState } from 'react';
import { Instagram, Facebook, MapPin, Heart, ArrowUp, Phone, Clock, Mail } from 'lucide-react';
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

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#ourstory' },
    { label: 'Visit Us', href: '#visitus' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: Clock, text: '12:00 PM – 1:00 AM', sub: 'Open Daily' },
    { icon: Phone, text: '0334 4477997', sub: 'Call us anytime' },
    { icon: Mail, text: 'askmelado@gmail.com', sub: 'Email address' },
  ];

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <button onClick={handleEasterEgg} className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <img src="/images/Logo.jpg" alt="Melado" className="h-14 w-auto rounded-xl group-hover:brightness-110 transition-all duration-300" />
              </div>
            </button>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium dairy ice cream crafted with love by Guluna. Authentic flavors, real ingredients, unforgettable taste since 2024.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-[#3E8E54] hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-[#3E8E54] hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-gray-400 text-sm hover:text-[#3E8E54] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={13} className="text-[#3E8E54]" />
                  </div>
                  <div>
                    <p className="font-body text-gray-900 text-sm">{item.text}</p>
                    <p className="font-body text-gray-400 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}

              {selectedCity && (
                <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={13} className="text-[#3E8E54]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-gray-900 text-sm">{selectedCity.name}</p>
                    <p className="font-body text-gray-400 text-xs leading-relaxed">{selectedCity.address}</p>
                    <button
                      onClick={changeCity}
                      className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-[#F8789C]/30 bg-[#F8789C]/5 hover:bg-[#F8789C]/10 transition-colors group"
                    >
                      <MapPin size={14} className="text-[#F8789C]" />
                      <span className="text-[11px] font-semibold text-[#F8789C] uppercase tracking-wider">Change Location</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Follow Us</h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-gray-400 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#3E8E54] transition-colors" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-gray-400 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#3E8E54] transition-colors" />
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-gray-400 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#3E8E54] transition-colors" />
                TikTok
              </a>
            </div>


          </div>
        </div>

        <div className="relative mt-14 pt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-gray-400 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Melado by Guluna. All rights reserved. Made with{' '}
              <Heart size={10} className="inline text-[#3E8E54] fill-[#3E8E54] animate-pulse" /> in Peshawar.
            </p>

            <div className="flex items-center gap-4">
              <a href="#privacy" className="font-body text-gray-400 text-xs hover:text-gray-600 transition-colors">Privacy</a>
              <span className="text-gray-200 text-xs">|</span>
              <a href="#terms" className="font-body text-gray-400 text-xs hover:text-gray-600 transition-colors">Terms</a>
              <span className="text-gray-200 text-xs">|</span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-[#3E8E54] hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ml-2"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
