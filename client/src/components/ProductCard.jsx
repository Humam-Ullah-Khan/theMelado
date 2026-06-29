import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductCard({ item, onSelect }) {
  const image = item.image;
  const price = item.singlePrice || item.prices?.cup || 0;
  const hasMultiplePrices = item.prices && (item.prices.cup || item.prices.cone || item.prices.tub);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden bg-melado-pink-light/30" onClick={() => onSelect?.(item)}>
        <img
          src={image}
          alt={item.name}
          className="product-image cursor-pointer"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
          }}
        />
        {item.isNew && (
          <span className="absolute top-3 left-3 bg-melado-green text-white text-xs font-heading font-bold px-2.5 py-1 rounded-full shadow-md pointer-events-none">
            NEW
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-melado-rose hover:bg-white hover:text-melado-red transition-all shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col cursor-pointer" onClick={() => onSelect?.(item)}>
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
                <span className="price-ribbon pointer-events-none">Rs. {item.prices.cup}</span>
              )}
              {item.prices.cone > 0 && (
                <span className="price-ribbon pointer-events-none">Cone: Rs. {item.prices.cone}</span>
              )}
              {item.prices.tub > 0 && (
                <span className="price-ribbon pointer-events-none">Tub: Rs. {item.prices.tub}</span>
              )}
            </div>
          ) : (
            <div className="mb-3">
              <span className="price-ribbon pointer-events-none">Rs. {price}</span>
            </div>
          )}

          <a
            href="https://www.instagram.com/themelado"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-melado-red text-white font-heading font-bold text-sm py-2.5 px-4 rounded-xl hover:bg-melado-red-dark transition-all shadow-md hover:shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingBag size={14} />
            Add To Cart
          </a>
        </div>
      </div>
    </div>
  );
}