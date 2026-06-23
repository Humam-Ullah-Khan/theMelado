import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';

const categoryBanners = {
  'New Arrivals': { class: 'cat-new-arrivals', emoji: '🆕' },
  'Ice Cream Elite': { class: 'cat-ice-cream-elite', emoji: '👑' },
  'Ice Cream Premium': { class: 'cat-ice-cream-premium', emoji: '⭐' },
  'Shakes': { class: 'cat-shakes', emoji: '🥤' },
  'Popsicles': { class: 'cat-popsicles', emoji: '🍦' },
  'Toppings': { class: 'cat-toppings', emoji: '🍫' },
  'Sundaes': { class: 'cat-sundaes', emoji: '🍨' },
  'Boba Cup': { class: 'cat-boba-cup', emoji: '🧋' },
  'Chillers': { class: 'cat-chillers', emoji: '🧊' },
  'Desserts': { class: 'cat-desserts', emoji: '🍰' },
  'Kids Corner': { class: 'cat-kids-corner', emoji: '👶' },
  'Super Cup': { class: 'cat-super-cup', emoji: '🏆' },
};

const categoryOrder = [
  'New Arrivals',
  'Ice Cream Elite',
  'Ice Cream Premium',
  'Shakes',
  'Sundaes',
  'Boba Cup',
  'Chillers',
  'Super Cup',
  'Desserts',
  'Kids Corner',
  'Popsicles',
  'Toppings',
];

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
      const uniqueCats = [...new Set(data.map(item => item.category))];
      const sorted = categoryOrder.filter(c => uniqueCats.includes(c));
      uniqueCats.forEach(c => { if (!sorted.includes(c)) sorted.push(c); });
      setCategories(sorted);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const groupedByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filteredItems.filter(item => item.category === cat);
    return acc;
  }, {});

  if (loading) {
    return (
      <section id="menu" className="py-16 bg-melado-pink">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse-soft">
            <div className="w-48 h-8 bg-melado-pink-dark/20 rounded mx-auto mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-72" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-12 bg-melado-pink">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-3">Our Menu</h2>
          <p className="font-body text-melado-maroon/60 text-lg">Premium dairy treats for every craving</p>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter size={16} className="text-melado-maroon/50 flex-shrink-0" />
          <button
            onClick={() => setActiveCategory('All')}
            className={`font-heading font-semibold text-sm px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-melado-maroon text-white shadow-md'
                : 'bg-white text-melado-maroon hover:bg-melado-pink-dark/20'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-heading font-semibold text-sm px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-melado-maroon text-white shadow-md'
                  : 'bg-white text-melado-maroon hover:bg-melado-pink-dark/20'
              }`}
            >
              {categoryBanners[cat]?.emoji} {cat}
            </button>
          ))}
        </div>

        {activeCategory === 'All' ? (
          categories.map(cat => {
            const items = groupedByCategory[cat];
            if (!items || items.length === 0) return null;
            return (
              <div key={cat} className="mb-12">
                <div className={`${categoryBanners[cat]?.class || 'bg-melado-red'} rounded-2xl mb-6 py-10 md:py-14 px-6 text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-10 w-20 h-20 bg-white rounded-full blur-xl" />
                    <div className="absolute bottom-2 left-10 w-16 h-16 bg-white rounded-full blur-xl" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider text-shadow-lg relative z-10">
                    {cat}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {items.map(item => (
                    <ProductCard key={item._id || item.name} item={item} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className={`${categoryBanners[activeCategory]?.class || 'bg-melado-red'} rounded-2xl mb-6 py-10 md:py-14 px-6 text-center`}>
              <h3 className="font-heading font-bold text-white text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider text-shadow-lg">
                {activeCategory}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {filteredItems.map(item => (
                <ProductCard key={item._id || item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
