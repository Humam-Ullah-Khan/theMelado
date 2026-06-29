import { X, ShoppingBag, Tag, CheckCircle, Clock } from 'lucide-react';

const placeholderImages = {
  'Ice Cream Elite': 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=400&fit=crop',
  'Ice Cream Premium': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  'Shakes': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
  'Popsicles': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=400&fit=crop',
  'Sundaes': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  'Boba Cup': 'https://images.unsplash.com/photo-1558857563-b371037e2e69?w=400&h=400&fit=crop',
  'Chillers': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=400&fit=crop',
  'Desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
  'Kids Corner': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
  'Super Cup': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=400&fit=crop',
  'New Arrivals': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
  'Toppings': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
};

export default function ProductPopup({ item, open, onClose }) {
  if (!open || !item) return null;

  const image = item.image || placeholderImages[item.category] || 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
  const hasMultiplePrices = item.prices && (item.prices.cup || item.prices.cone || item.prices.tub);
  const price = item.singlePrice || item.prices?.cup || 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-colors z-10 shadow-md"
          aria-label="Close"
        >
          <X size={16} className="text-melado-maroon" />
        </button>

        <div className="relative bg-melado-pink-light/30">
          <img
            src={image}
            alt={item.name}
            className="w-full h-64 sm:h-72 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
            }}
          />
          {item.isNew && (
            <span className="absolute top-4 left-4 bg-melado-green text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full shadow-md">
              NEW
            </span>
          )}
          {!item.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-melado-maroon font-heading font-bold text-sm px-4 py-2 rounded-full">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-body text-white bg-[#45AFC6] px-2.5 py-1 rounded-full">
              {item.category}
            </span>
            {item.featured && (
              <span className="text-xs font-body text-white bg-[#F8789C] px-2.5 py-1 rounded-full flex items-center gap-1">
                <Tag size={10} />
                Featured
              </span>
            )}
          </div>

          <h2 className="font-heading font-bold text-2xl text-melado-maroon mb-3">{item.name}</h2>

          <p className="font-body text-melado-maroon/60 text-sm leading-relaxed mb-5">
            {item.description || 'No description available.'}
          </p>

          <div className="bg-melado-pink-light/20 rounded-2xl p-5 mb-5">
            <p className="font-heading font-semibold text-melado-maroon text-sm mb-3 flex items-center gap-2">
              <Tag size={14} className="text-[#F8789C]" />
              Pricing
            </p>
            {hasMultiplePrices ? (
              <div className="grid grid-cols-3 gap-3">
                {item.prices.cup > 0 && (
                  <div className="text-center bg-white rounded-xl p-3">
                    <p className="font-body text-melado-maroon/50 text-xs mb-1">Cup</p>
                    <p className="font-heading font-bold text-lg text-melado-red">Rs. {item.prices.cup}</p>
                  </div>
                )}
                {item.prices.cone > 0 && (
                  <div className="text-center bg-white rounded-xl p-3">
                    <p className="font-body text-melado-maroon/50 text-xs mb-1">Cone</p>
                    <p className="font-heading font-bold text-lg text-melado-red">Rs. {item.prices.cone}</p>
                  </div>
                )}
                {item.prices.tub > 0 && (
                  <div className="text-center bg-white rounded-xl p-3">
                    <p className="font-body text-melado-maroon/50 text-xs mb-1">Tub</p>
                    <p className="font-heading font-bold text-lg text-melado-red">Rs. {item.prices.tub}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="inline-block bg-white rounded-xl px-6 py-3">
                <span className="font-heading font-bold text-2xl text-melado-red">Rs. {price}</span>
              </div>
            )}
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="mb-5">
              <p className="font-body text-melado-maroon/50 text-xs mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-body text-melado-maroon bg-gray-100 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-xs font-body text-melado-maroon/40">
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className={item.available ? 'text-green-500' : 'text-red-400'} />
              {item.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <a
            href="https://www.instagram.com/themelado"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full font-heading font-bold text-sm text-white bg-melado-red hover:bg-melado-red-dark flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <ShoppingBag size={16} />
            Order on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}