import { useCity } from '../context/CityContext';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function VisitUs() {
  const { selectedCity } = useCity();

  const branches = [
    {
      name: 'Peshawar',
      address: 'B1, Old Jamrud Road, near Bitani Plaza, University Town, Peshawar',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-91-1234567',
      isMain: true,
    },
    {
      name: 'Islamabad',
      address: 'I-8 Markaz, Islamabad',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-51-1234567',
    },
    {
      name: 'Lahore - Model Town',
      address: 'Model Town Link Road, Lahore',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-42-1234567',
    },
    {
      name: 'Lahore - Garhi Shahu',
      address: '84 Allama Iqbal Road, Garhi Shahu, Lahore',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-42-7654321',
    },
    {
      name: 'Faisalabad',
      address: 'Pearl City, ChenOne Road, Samanabad, Faisalabad',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-41-1234567',
    },
    {
      name: 'Multan',
      address: 'A Block, Opposite Double Cheeze, Gulgasht Colony, Multan',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-61-1234567',
    },
    {
      name: 'Swat',
      address: 'Mingora, Swat',
      hours: '12:00 PM – 1:00 AM',
      phone: '+92-943-1234567',
    },
  ];

  return (
    <section id="visit" className="py-16 md:py-24 bg-melado-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Visit Us</h2>
          <p className="font-body text-melado-maroon/60 text-lg">
            Find your nearest Melado branch
          </p>
        </div>

        {selectedCity && selectedCity.address !== 'Coming Soon' && (
          <div className="bg-gradient-to-r from-melado-maroon to-melado-red rounded-2xl p-6 md:p-8 mb-12 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Navigation size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-1">{selectedCity.name} Branch</h3>
                <p className="text-white/80 font-body">{selectedCity.address}</p>
                <p className="text-white/60 font-body text-sm mt-1">Open: {selectedCity.hours}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className={`card-premium p-5 ${
                selectedCity?.name === branch.name ? 'ring-2 ring-melado-red' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  branch.isMain ? 'bg-melado-red' : 'bg-melado-pink'
                }`}>
                  <MapPin size={18} className={branch.isMain ? 'text-white' : 'text-melado-maroon'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-melado-maroon text-lg">
                    {branch.name}
                    {branch.isMain && (
                      <span className="ml-2 text-xs bg-melado-red text-white px-2 py-0.5 rounded-full">
                        Main
                      </span>
                    )}
                  </h3>
                  <p className="font-body text-melado-maroon/60 text-sm mt-1">{branch.address}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-melado-maroon/50 text-xs">
                      <Clock size={12} />
                      <span className="font-body">{branch.hours}</span>
                    </div>
                    {branch.phone && (
                      <div className="flex items-center gap-1.5 text-melado-maroon/50 text-xs">
                        <Phone size={12} />
                        <span className="font-body">{branch.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="aspect-video bg-melado-pink-light/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-melado-maroon/30 mx-auto mb-3" />
              <p className="font-heading font-bold text-melado-maroon/40 text-lg">Interactive Map</p>
              <p className="font-body text-melado-maroon/30 text-sm">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
