import { useState, useEffect } from 'react';

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/carousel-categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-4 md:py-6 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex-shrink-0 snap-start cursor-pointer group text-center"
            >
              <div className="bg-[#F8789C] rounded-full flex items-center justify-center w-[80px] h-[80px] md:w-[130px] md:h-[130px]">
                <img
                  src={cat.image}
                  alt={cat.heading}
                  className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="font-heading font-bold text-[10px] md:text-sm text-melado-maroon mt-2 leading-tight whitespace-nowrap">
                {cat.heading}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
