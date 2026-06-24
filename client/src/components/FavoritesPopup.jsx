import { X, Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const fallbackItems = [
  { name: 'Hazelnut Shake', price: 690, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop' },
  { name: 'Kulfa', price: 200, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' },
  { name: 'Pistachio Kunafa Cake', price: 840, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop' },
  { name: 'Lotus Bliss', price: 240, image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=400&fit=crop' },
  { name: 'Chocolate Shake', price: 660, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop' },
  { name: 'Watermelon Mint', price: 340, image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=400&fit=crop' },
  { name: 'Matilda Cake', price: 560, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop' },
  { name: 'Oreo', price: 200, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' },
  { name: 'Mango Mania', price: 200, image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=400&fit=crop' },
  { name: 'Strawberry Cheesecake', price: 220, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop' },
  { name: 'Brownie Sundae', price: 620, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' },
  { name: 'Pistachio', price: 220, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' },
];

export default function FavoritesPopup({ open, onClose }) {
  const { favorites, toggleFavorite } = useFavorites();

  if (!open) return null;

  const favItems = favorites.map(name => {
    const found = fallbackItems.find(item => item.name === name);
    return found || { name, price: 0, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop' };
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Favorites">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[460px] max-h-[80vh] flex flex-col overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#F8789C] fill-[#F8789C]" />
            <h2 className="font-heading font-bold text-xl text-melado-maroon">My Favorites</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#F8789C] hover:bg-[#F8789C]/80 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {favItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={40} className="text-melado-maroon/10 mx-auto mb-3" />
              <p className="font-body text-melado-maroon/40 text-sm">No favorites yet</p>
              <p className="font-body text-melado-maroon/30 text-xs mt-1">Tap the heart icon on items to add them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favItems.map((item, i) => (
                <div key={item.name + i} className="flex items-center gap-3 p-3 rounded-xl bg-melado-pink-light/20 hover:bg-melado-pink-light/30 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-melado-maroon text-sm truncate">{item.name}</h3>
                    <p className="font-body text-gray-900 font-semibold text-sm">Rs. {item.price}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.name)}
                    className="p-2 rounded-full hover:bg-melado-pink/30 transition-colors flex-shrink-0"
                    aria-label="Remove from favorites"
                  >
                    <Heart size={16} className="fill-[#F8789C] text-[#F8789C]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {favItems.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <a
              href="https://www.instagram.com/themelado"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-bold text-sm text-white bg-[#F8789C] hover:bg-[#F8789C]/90 flex items-center justify-center gap-2 py-3 rounded-xl transition-all shadow-md"
            >
              <ShoppingBag size={16} />
              ORDER NOW
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
