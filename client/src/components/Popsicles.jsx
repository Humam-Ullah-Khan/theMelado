import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const COLOR_MAP = {
  purple: { color: 'bg-purple-100', btnGradient: 'from-purple-400 to-violet-400' },
  pink: { color: 'bg-pink-100', btnGradient: 'from-pink-400 to-rose-400' },
  green: { color: 'bg-[#D4EDDA]', btnGradient: 'from-[#8CD184] to-[#6FB868]' },
  yellow: { color: 'bg-yellow-100', btnGradient: 'from-yellow-400 to-amber-400' },
  stone: { color: 'bg-stone-100', btnGradient: 'from-stone-500 to-stone-600' },
  amber: { color: 'bg-amber-100', btnGradient: 'from-amber-400 to-orange-400' },
  rose: { color: 'bg-rose-100', btnGradient: 'from-rose-400 to-red-400' },
};

const COLOR_KEYS = Object.keys(COLOR_MAP);

function getColorForItem(index) {
  return COLOR_MAP[COLOR_KEYS[index % COLOR_KEYS.length]];
}

export default function Popsicles() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/menu?category=Popsicles')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setItems(data.map((item, i) => ({
            ...item,
            ...getColorForItem(i)
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-melado-maroon text-3xl md:text-4xl">
            Popsicles
          </h2>
          <p className="font-body text-melado-maroon/60 text-sm mt-2">Refreshing treats on a stick</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {items.map((item, index) => (
            <div
              key={item._id || item.name}
              className={`${item.color} rounded-3xl flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg`}
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
                Rs. {item.singlePrice || item.price || 0}
              </span>

              <button
                onClick={() => toggleFavorite(item.name)}
                className={`bg-gradient-to-r ${item.btnGradient} text-white font-heading font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md mx-4 mb-4`}
              >
                <Heart size={12} className={isFavorite(item.name) ? 'fill-white' : ''} />
                {isFavorite(item.name) ? 'Added to Favorite' : 'Add to Favorite'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
