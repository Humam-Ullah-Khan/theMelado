import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const popsicleItems = [
  { name: 'JAMUN', price: 150, image: '/images/Popsical1.jpg', color: 'bg-purple-100', btnGradient: 'from-purple-400 to-violet-400' },
  { name: 'Strawberry', price: 150, image: '/images/Popsical2.jpg', color: 'bg-pink-100', btnGradient: 'from-pink-400 to-rose-400' },
  { name: 'KIWI', price: 150, image: '/images/Popsical3.jpg', color: 'bg-[#D4EDDA]', btnGradient: 'from-[#8CD184] to-[#6FB868]' },
  { name: 'LEMON', price: 150, image: '/images/Popsical4.jpg', color: 'bg-yellow-100', btnGradient: 'from-yellow-400 to-amber-400' },
  { name: 'BELGIAN CHOCOLATE', price: 150, image: '/images/Popsical5.jpg', color: 'bg-stone-100', btnGradient: 'from-stone-500 to-stone-600' },
  { name: 'MINT', price: 150, image: '/images/Popsical6.jpg', color: 'bg-[#D4EDDA]', btnGradient: 'from-[#8CD184] to-[#6FB868]' },
  { name: 'MANGO', price: 150, image: '/images/Popsical7.jpg', color: 'bg-amber-100', btnGradient: 'from-amber-400 to-orange-400' },
  { name: 'ALOO BUKHARA', price: 150, image: '/images/Popsical8.jpg', color: 'bg-rose-100', btnGradient: 'from-rose-400 to-red-400' },
];

export default function Popsicles() {
  const { toggleFavorite, isFavorite } = useFavorites();

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
          {popsicleItems.map((item) => (
            <div
              key={item.name}
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
                Rs. {item.price}
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
