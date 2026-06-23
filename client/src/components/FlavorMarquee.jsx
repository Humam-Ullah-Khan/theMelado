import { IceCream } from 'lucide-react';

const flavors = [
  'Strawberry', 'Mango Mania', 'Oreo', 'Kulfa', 'Lotus Bliss',
  'Vanilla', 'Chocolate', 'Pistachio', 'Butterscotch', 'Cookie & Cream',
  'Mint Choco Chip', 'Coffee Crunch', 'Malai Kulfa', 'Pistachio Kulfa',
  'Strawberry Cheesecake', 'Mango Tango', 'Hazelnut', 'Blueberry Cheesecake',
  'Mocha Fudge', 'Java Break'
];

export default function FlavorMarquee() {
  const doubledFlavors = [...flavors, ...flavors];

  return (
    <div className="bg-melado-maroon py-4 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-melado-maroon to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-melado-maroon to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubledFlavors.map((flavor, i) => (
          <span key={i} className="flex items-center gap-3 mx-6 flex-shrink-0">
            <IceCream size={16} className="text-melado-rose" />
            <span className="font-heading font-bold text-white/90 text-sm tracking-wide">
              {flavor}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
