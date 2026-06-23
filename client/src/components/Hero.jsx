import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="px-4 md:px-6 lg:px-8 pt-4 md:pt-6 pb-4 md:pb-6">
      <div className="relative bg-[#F8E0EB] min-h-[400px] md:min-h-[480px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-sm">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 bottom-0" style={{
            background: 'radial-gradient(ellipse at 70% 50%, rgba(232,50,42,0.08) 0%, transparent 60%)',
          }} />
        </div>

        <svg className="absolute top-16 right-20 opacity-10 hidden lg:block" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="4" fill="#6C3439" />
          <circle cx="8" cy="10" r="3" fill="#6C3439" />
          <circle cx="32" cy="8" r="2.5" fill="#6C3439" />
          <circle cx="12" cy="32" r="2" fill="#6C3439" />
          <circle cx="34" cy="30" r="3.5" fill="#6C3439" />
        </svg>
        <svg className="absolute bottom-24 left-16 opacity-10 hidden lg:block" width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="3" fill="#6C3439" />
          <circle cx="5" cy="8" r="2" fill="#6C3439" />
          <circle cx="25" cy="6" r="2.5" fill="#6C3439" />
          <circle cx="8" cy="24" r="2" fill="#6C3439" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full py-8 md:py-12">

            <div className="order-2 lg:order-1">
              <h1 className="font-heading font-extrabold text-[#F8789C] leading-[0.9] mb-6" style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                WebkitTextStroke: '2px rgba(248,120,156,0.25)',
                textShadow: '4px 4px 0px rgba(248,120,156,0.15)',
              }}>
                THE BEST<br />
                ICE CREAM<br />
                IN THE COUNTRY!
              </h1>

              <p className="font-body text-[#45AFC6] text-base md:text-lg max-w-md mb-8 leading-relaxed font-medium">
                100% Organic &bull; Premium Dairy Ice Cream<br />
                Taste the difference
              </p>

              <a href="#menu" className="inline-flex items-center gap-3 bg-[#45AFC6] hover:bg-[#45AFC6] text-white font-heading font-bold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                VIEW MENU
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/images/Gulunu1.jpg"
                    alt="Melado Premium Ice Cream"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-melado-red text-white font-heading font-bold text-xs px-4 py-2 rounded-full shadow-lg rotate-[-6deg]">
                  100% Real Dairy
                </div>
                <div className="absolute -top-3 -right-3 bg-melado-green text-melado-maroon font-heading font-bold text-xs px-4 py-2 rounded-full shadow-lg rotate-[6deg]">
                  Fresh Daily
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
