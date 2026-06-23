import { Heart, ShoppingBag } from 'lucide-react';

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

export default function ProductCard({ item }) {
  const image = item.image || placeholderImages[item.category] || 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
  const price = item.singlePrice || item.prices?.cup || 0;
  const hasMultiplePrices = item.prices && (item.prices.cup || item.prices.cone || item.prices.tub);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden bg-melado-pink-light/30">
        <img
          src={image}
          alt={item.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
          }}
        />
        {item.isNew && (
          <span className="absolute top-3 left-3 bg-melado-green text-white text-xs font-heading font-bold px-2.5 py-1 rounded-full shadow-md">
            NEW
          </span>
        )}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-melado-rose hover:bg-white hover:text-melado-red transition-all shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-melado-maroon text-base mb-1 line-clamp-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="font-body text-melado-maroon/60 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {item.description}
          </p>
        )}

        <div className="mt-auto">
          {hasMultiplePrices ? (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.prices.cup > 0 && (
                <span className="price-ribbon">Rs. {item.prices.cup}</span>
              )}
              {item.prices.cone > 0 && (
                <span className="price-ribbon">Cone: Rs. {item.prices.cone}</span>
              )}
              {item.prices.tub > 0 && (
                <span className="price-ribbon">Tub: Rs. {item.prices.tub}</span>
              )}
            </div>
          ) : (
            <div className="mb-3">
              <span className="price-ribbon">Rs. {price}</span>
            </div>
          )}

          <a
            href="https://instagram.com/meladobyguluna"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-melado-red text-white font-heading font-bold text-sm py-2.5 px-4 rounded-xl hover:bg-melado-red-dark transition-all shadow-md hover:shadow-lg"
          >
            <ShoppingBag size={14} />
            Add To Cart
          </a>
        </div>
      </div>
    </div>
  );
}
