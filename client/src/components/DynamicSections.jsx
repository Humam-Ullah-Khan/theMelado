import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLoading } from '../context/LoadingContext';

const COLOR_MAP = [
  { color: 'bg-purple-100', btn: 'from-purple-400 to-violet-400' },
  { color: 'bg-pink-100', btn: 'from-pink-400 to-rose-400' },
  { color: 'bg-[#D4EDDA]', btn: 'from-[#8CD184] to-[#6FB868]' },
  { color: 'bg-yellow-100', btn: 'from-yellow-400 to-amber-400' },
  { color: 'bg-stone-100', btn: 'from-stone-500 to-stone-600' },
  { color: 'bg-amber-100', btn: 'from-amber-400 to-orange-400' },
  { color: 'bg-rose-100', btn: 'from-rose-400 to-red-400' },
];

export default function DynamicSections() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [sections, setSections] = useState([]);
  const [sectionItems, setSectionItems] = useState({});
  const { register, done } = useLoading();
  const pendingRef = useRef(0);

  useEffect(() => {
    register('sections');
    fetch('/api/sections')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (!Array.isArray(data)) { setSections([]); return; }
        const filtered = data.filter(s => s.type !== 'hero');
        setSections(filtered);
        pendingRef.current = filtered.length;
        if (filtered.length === 0) { done('sections'); }
        filtered.forEach(s => fetchItemsForSection(s.heading));
      })
      .catch(() => { done('sections'); });
  }, []);

  function fetchItemsForSection(category) {
    fetch(`/api/menu?category=${encodeURIComponent(category)}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (!Array.isArray(data)) return;
        setSectionItems(prev => ({
          ...prev,
          [category]: data.filter(item => item.available !== false),
        }));
      })
      .catch(() => {})
      .finally(() => {
        pendingRef.current -= 1;
        if (pendingRef.current <= 0) done('sections');
      });
  }

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, sIdx) => {
        const items = sectionItems[section.heading];
        if (!items || items.length === 0) return null;

        return (
          <section key={section._id} className={`py-10 md:py-14 ${sIdx % 2 === 0 ? 'bg-white' : 'bg-[#FFF8F0]'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-melado-maroon text-3xl md:text-4xl">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="font-body text-melado-maroon/60 text-sm mt-2">{section.subheading}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {items.map((item, i) => {
                  const c = COLOR_MAP[i % COLOR_MAP.length];
                  return (
                    <div
                      key={item._id}
                      className={`${c.color} rounded-3xl flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg`}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden mb-3 flex items-center justify-center bg-white/50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-2xl"
                          loading="lazy"
                        />
                      </div>

                      <h3 className="font-heading font-bold text-melado-maroon text-sm leading-tight mb-1 uppercase px-4">
                        {item.name}
                      </h3>

                      <span className="font-heading font-bold text-melado-maroon text-sm mb-3 px-4">
                        Rs. {item.singlePrice || item.prices?.cup || 0}
                      </span>

                      <button
                        onClick={() => toggleFavorite(item.name)}
                        className={`bg-gradient-to-r ${c.btn} text-white font-heading font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md mx-4 mb-4`}
                      >
                        <Heart size={12} className={isFavorite(item.name) ? 'fill-white' : ''} />
                        {isFavorite(item.name) ? 'Added to Favorite' : 'Add to Favorite'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
