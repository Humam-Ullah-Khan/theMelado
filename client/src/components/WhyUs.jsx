import { Milk, Sun, Moon, Heart } from 'lucide-react';

const reasons = [
  {
    icon: Milk,
    title: 'Real Dairy',
    description: 'Made with 100% real dairy milk — no compromises, no shortcuts. Every scoop is pure and creamy.',
    color: 'bg-melado-green',
    textColor: 'text-melado-green',
  },
  {
    icon: Sun,
    title: 'Fresh Daily',
    description: 'Prepared fresh every day in small batches. You always get the best quality and taste.',
    color: 'bg-melado-terracotta',
    textColor: 'text-melado-terracotta',
  },
  {
    icon: Moon,
    title: 'Open Late',
    description: 'Craving ice cream at midnight? We\'re open till 1 AM. Because the best things happen late.',
    color: 'bg-melado-maroon',
    textColor: 'text-melado-maroon',
  },
  {
    icon: Heart,
    title: 'Family Owned',
    description: 'Born from Guluna\'s love for quality treats. A family business with heart in every flavor.',
    color: 'bg-melado-rose',
    textColor: 'text-melado-rose',
  },
];

export default function WhyUs() {
  return (
    <section id="story" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Why Choose Melado</h2>
          <p className="font-body text-melado-maroon/60 text-lg max-w-xl mx-auto">
            Guluna&apos;s promise of quality, tradition, and love in every bite
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="card-premium p-6 text-center group hover:bg-melado-pink-light/20">
              <div className={`w-16 h-16 ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon size={28} className="text-white" />
              </div>
              <h3 className="font-heading font-bold text-melado-maroon text-xl mb-2">
                {reason.title}
              </h3>
              <p className="font-body text-melado-maroon/60 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
