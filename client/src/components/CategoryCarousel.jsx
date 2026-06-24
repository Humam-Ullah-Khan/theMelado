const categories = [
  { name: 'Deals', image: '/images/Category1-nobg.png' },
  { name: 'Swirls', image: '/images/Category2-nobg.png' },
  { name: 'Fudge Meets Swirl', image: '/images/Category3-nobg.png' },
  { name: 'Sundaes', image: '/images/Category4-nobg.png' },
  { name: 'Twisters', image: '/images/Category5-nobg.png' },
  { name: 'Shakes', image: '/images/Category6-nobg.png' },
  { name: 'Chillers', image: '/images/Category7-nobg.png' },
  { name: 'Mocktails', image: '/images/Category8-nobg.png' },
  { name: 'Specials', image: '/images/Category9-nobg.png' },
];

export default function CategoryCarousel() {
  return (
    <section className="py-4 md:py-6 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 relative">

        <div
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex-shrink-0 snap-start cursor-pointer group text-center"
            >
              <div className="bg-[#F8789C] rounded-full flex items-center justify-center w-[80px] h-[80px] md:w-[130px] md:h-[130px]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="font-heading font-bold text-[10px] md:text-sm text-melado-maroon mt-2 leading-tight whitespace-nowrap">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
