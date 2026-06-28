import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';
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

export default function PopularItems() {
  const [items, setItems] = useState(fallbackItems);
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);
  const [totalDots, setTotalDots] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (!Array.isArray(data)) return;
        const featured = data.filter(item => item.featured).slice(0, 12);
        if (featured.length > 0) {
          setItems(featured.map(item => ({
            name: item.name,
            price: item.singlePrice || item.prices?.cup || 0,
            image: item.image || `https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop`,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const updateDots = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 180;
    const gap = 16;
    const visibleCards = Math.floor(el.offsetWidth / (cardWidth + gap));
    const dots = Math.max(1, Math.ceil(items.length / Math.max(visibleCards, 1)));
    setTotalDots(dots);

    const currentDot = Math.round(el.scrollLeft / (cardWidth + gap) / Math.max(visibleCards, 1));
    setActiveDot(Math.min(currentDot, dots - 1));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateDots();
    el.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', updateDots);
    return () => {
      el.removeEventListener('scroll', updateDots);
      window.removeEventListener('resize', updateDots);
    };
  }, [updateDots]);

  const scrollToDot = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 180;
    const gap = 16;
    const visibleCards = Math.floor(el.offsetWidth / (cardWidth + gap));
    el.scrollTo({
      left: index * visibleCards * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-melado-maroon text-3xl md:text-4xl">
            Popular Items
          </h2>
          <p className="font-body text-melado-maroon/60 text-sm mt-2">Most loved by our customers</p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
        >
          {items.map((item, i) => (
            <div
              key={item.name + i}
              className="flex-shrink-0 w-[150px] md:w-[180px] snap-start cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden bg-melado-pink-light/20 mb-3 transition-transform duration-300 group-hover:scale-105 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop';
                  }}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(item.name); }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
                  aria-label={isFavorite(item.name) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={14} className={isFavorite(item.name) ? 'fill-[#F8789C] text-[#F8789C]' : 'text-melado-maroon/40'} />
                </button>
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-sm leading-tight line-clamp-1">
                {item.name}
              </h3>
              <p className="font-body text-gray-900 font-semibold text-sm mt-1">
                Rs. {item.price}
              </p>
            </div>
          ))}
        </div>

        {totalDots > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToDot(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeDot === i
                    ? 'bg-melado-maroon w-6'
                    : 'bg-melado-maroon/20 hover:bg-melado-maroon/40'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
