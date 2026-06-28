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
    { icon: Phone, text: '+92 300 1234567', sub: 'Call us anytime' },
    { icon: Mail, text: 'hello@melado.com', sub: 'Drop us a message' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1A5C2E] to-[#0D3D1C] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3E8E54] via-[#2A793F] to-[#1A5C2E]" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <button onClick={handleEasterEgg} className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <img src="/images/Logo.jpg" alt="Melado" className="h-14 w-auto rounded-xl group-hover:brightness-110 transition-all duration-300" />
              </div>
            </button>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Premium dairy ice cream crafted with love by Guluna. Authentic flavors, real ingredients, unforgettable taste since 2024.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#3E8E54] hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#3E8E54] hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-white/50 text-sm hover:text-[#3E8E54] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={13} className="text-[#3E8E54]" />
                  </div>
                  <div>
                    <p className="font-body text-white text-sm">{item.text}</p>
                    <p className="font-body text-white/40 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}

              {selectedCity && (
                <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={13} className="text-[#3E8E54]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-white text-sm">{selectedCity.name}</p>
                    <p className="font-body text-white/40 text-xs leading-relaxed">{selectedCity.address}</p>
                    <button
                      onClick={changeCity}
                      className="font-body text-[#3E8E54] text-xs hover:text-[#2A793F] transition-colors mt-1 inline-block"
                    >
                      Change City
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Follow Us</h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-white/50 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#3E8E54] transition-colors" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-white/50 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#3E8E54] transition-colors" />
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@themelado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-white/50 text-sm hover:text-[#3E8E54] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#3E8E54] transition-colors" />
                TikTok
              </a>
            </div>

            <div className="mt-8">
              <p className="font-body text-white/40 text-xs mb-3">We Accept</p>
              <div className="flex gap-2">
                {['Visa', 'MC'].map(badge => (
                  <span key={badge} className="text-[10px] font-bold text-white/30 bg-white/5 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-14 pt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/30 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Melado by Guluna. All rights reserved. Made with{' '}
              <Heart size={10} className="inline text-[#3E8E54] fill-[#3E8E54] animate-pulse" /> in Peshawar.
            </p>

            <div className="flex items-center gap-4">
              <a href="#privacy" className="font-body text-white/30 text-xs hover:text-white/50 transition-colors">Privacy</a>
              <span className="text-white/10 text-xs">|</span>
              <a href="#terms" className="font-body text-white/30 text-xs hover:text-white/50 transition-colors">Terms</a>
              <span className="text-white/10 text-xs">|</span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#3E8E54] hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ml-2"
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
