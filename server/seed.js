require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const Admin = require('./models/Admin');
const Section = require('./models/Section');

const seedData = [
  // ── New Arrivals ──
  { name: 'Hazelnut Shake', category: 'New Arrivals', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: true, isNew: true, order: 1 },
  { name: 'Watermelon Mint', category: 'New Arrivals', description: 'Serves One. A Watermelon Mint Chiller is a refreshing..', singlePrice: 340, image: '', available: true, featured: true, isNew: true, order: 2 },
  { name: 'Orange Mango Twist', category: 'New Arrivals', description: 'Serves One. An Orange Mango Twist Chiller is a..', singlePrice: 340, image: '', available: true, featured: true, isNew: true, order: 3 },
  { name: 'Hazelnut Sundae', category: 'New Arrivals', description: 'Serves One. Our mouth watering combo of House-..', singlePrice: 560, image: '', available: true, featured: true, isNew: true, order: 4 },
  { name: 'Pink Guava', category: 'New Arrivals', description: 'Serves One. A Pink guava is refreshing, vibrant..', singlePrice: 340, image: '', available: true, featured: true, isNew: true, order: 5 },
  { name: 'Pistachio Kunafa Cake', category: 'New Arrivals', description: 'Serves One. A Pistachio Kunafa Cake is a dessert..', singlePrice: 840, image: '', available: true, featured: true, isNew: true, order: 6 },
  { name: 'Loaded Pistachio Kunafa Cake', category: 'New Arrivals', description: 'Serves One. A Loaded Pistachio Kunafa Cake is a..', singlePrice: 820, image: '', available: true, featured: true, isNew: true, order: 7 },
  { name: 'Matilda Cake', category: 'New Arrivals', description: 'Serves One. The best Matilda chocolate cake you will ever..', singlePrice: 560, image: '', available: true, featured: true, isNew: true, order: 8 },
  { name: 'Matilda With Vanilla Base', category: 'New Arrivals', description: 'Serves One. The best Matilda chocolate cake you will ever..', singlePrice: 690, image: '', available: true, featured: true, isNew: true, order: 9 },

  // ── Boba Cup ──
  { name: 'Lychee Boba Cup', category: 'Boba Cup', description: 'Serves One. A Lychee Boba Cup is the combination of...', singlePrice: 360, image: '', available: true, featured: false, order: 10 },
  { name: 'Strawberry Boba Cup', category: 'Boba Cup', description: 'Serves One. A Strawberry Boba Cup typically feature...', singlePrice: 360, image: '', available: true, featured: false, order: 11 },
  { name: 'Blueberry Boba Cup', category: 'Boba Cup', description: 'Serves One. Blueberry boba cups typically contain smal...', singlePrice: 380, image: '', available: true, featured: false, order: 12 },
  { name: 'Mango Boba Cup', category: 'Boba Cup', description: 'Serves One. A mango boba cup features our creamy...', singlePrice: 380, image: '', available: true, featured: false, order: 13 },

  // ── Loaded Sundae ──
  { name: 'Brownie Explosion Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 14 },
  { name: 'Chocolate Cornetto Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 15 },
  { name: 'Cookie Monster Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 16 },
  { name: 'Strawberry Cornetto Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 17 },
  { name: 'Super Sonic Super Fudge Loaded...', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 18 },
  { name: 'Cookie & Cream Fudge Loaded...', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 19 },
  { name: 'Chunky M&M\'s Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 20 },

  // ── Chillers ──
  { name: 'Watermelon Mint Chiller', category: 'Chillers', description: 'Serves One. A Watermelon Mint Chiller is a refreshing...', singlePrice: 340, image: '', available: true, featured: false, order: 21 },
  { name: 'Orange Mango Twist Chiller', category: 'Chillers', description: 'Serves One. An Orange Mango Twist Chiller is a...', singlePrice: 340, image: '', available: true, featured: false, order: 22 },
  { name: 'Pink Guava Chiller', category: 'Chillers', description: 'Serves One. A Pink guava is refreshing, vibrant...', singlePrice: 340, image: '', available: true, featured: false, order: 23 },
  { name: 'Blue Ocean', category: 'Chillers', description: 'Serves One. Blue Ocean is a popular fizzy drink known fo...', singlePrice: 340, image: '', available: true, featured: false, order: 24 },
  { name: 'Lemon Soda', category: 'Chillers', description: 'Serves One. Lemon soda is a carbonated beverage mad...', singlePrice: 240, image: '', available: true, featured: false, order: 25 },
  { name: 'Green Apple', category: 'Chillers', description: 'Serves One. A Green Apple is a carbonated soft drink wit...', singlePrice: 340, image: '', available: true, featured: false, order: 26 },

  // ── Sundaes ──
  { name: 'Choco Fudge Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House-...', singlePrice: 560, image: '', available: true, featured: false, order: 27 },
  { name: 'Hazelnut Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House-...', singlePrice: 560, image: '', available: true, featured: false, order: 28 },
  { name: 'Blueberry Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 29 },
  { name: 'Caramel Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 30 },
  { name: 'Lotus Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 620, image: '', available: true, featured: false, order: 31 },
  { name: 'Peanut Butter Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 32 },
  { name: 'Pistachio Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 620, image: '', available: true, featured: false, order: 33 },
  { name: 'Special Nutty Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 34 },
  { name: 'Strawberry Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 35 },
  { name: 'Vanilla Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 36 },
  { name: 'Mango Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House...', singlePrice: 560, image: '', available: true, featured: false, order: 37 },

  // ── Shakes ──
  { name: 'Hazelnut Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 38 },
  { name: 'Mocha Fudge Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 39 },
  { name: 'Blueberry Cheesecake Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 720, image: '', available: true, featured: false, order: 40 },
  { name: 'Blueberry Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 41 },
  { name: 'Caramel Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 42 },
  { name: 'Chocolate Shake', category: 'Shakes', description: 'Serves One. A smooth & luxurious blend of milk and..', singlePrice: 660, image: '', available: true, featured: false, order: 43 },
  { name: 'Chocolate Xtreme Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 44 },
  { name: 'Java Break Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 45 },
  { name: 'Lotus Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 760, image: '', available: true, featured: false, order: 46 },
  { name: 'Mint Shake', category: 'Shakes', description: 'Serves One. A smooth & luxurious blend of milk,..', singlePrice: 690, image: '', available: true, featured: false, order: 47 },
  { name: 'Peanut Butter Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 48 },
  { name: 'Strawberry Cheesecake Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 720, image: '', available: true, featured: false, order: 49 },
  { name: 'Strawberry Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft...', singlePrice: 690, image: '', available: true, featured: false, order: 50 },
  { name: 'Vanilla Shake', category: 'Shakes', description: 'Serves One. A smooth & luxurious blend of milk and..', singlePrice: 660, image: '', available: true, featured: false, order: 51 },
  { name: 'Pistachio Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 760, image: '', available: true, featured: false, order: 52 },
  { name: 'Mint Choco Chip Shake', category: 'Shakes', description: 'Serves One. A smooth & luxurious blend of milk,..', singlePrice: 690, image: '', available: true, featured: false, order: 53 },
  { name: 'Lotus Cheesecake Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 760, image: '', available: true, featured: false, order: 54 },
  { name: 'Choco Vanilla Shake', category: 'Shakes', description: 'Serves One. A smooth & luxurious blend of milk,..', singlePrice: 660, image: '', available: true, featured: false, order: 55 },

  // ── Super Cup ──
  { name: 'Super Caramel Biscotti Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 330, image: '', available: true, featured: false, order: 56 },
  { name: 'Super Brownie Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 310, image: '', available: true, featured: false, order: 57 },
  { name: 'Super Cookie Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 310, image: '', available: true, featured: false, order: 58 },
  { name: 'Super Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 240, image: '', available: true, featured: false, order: 59 },
  { name: 'Super Dip Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 330, image: '', available: true, featured: false, order: 60 },
  { name: 'Super Nutty Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 310, image: '', available: true, featured: false, order: 61 },
  { name: 'Super Pista Badam Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 330, image: '', available: true, featured: false, order: 62 },
  { name: 'Super Cornetto Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 310, image: '', available: true, featured: false, order: 63 },
  { name: 'Super Cookie & Cream Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 310, image: '', available: true, featured: false, order: 64 },

  // ── Desserts ──
  { name: 'Double Sauce Brownie with Vanill...', category: 'Desserts', description: 'Serves One. Our special lip smacking pleasure with...', singlePrice: 540, image: '', available: true, featured: false, order: 65 },
  { name: 'Brownie', category: 'Desserts', description: 'Serves One. Enjoy a chewy and fudgy brownie. Make a...', singlePrice: 340, image: '', available: true, featured: false, order: 66 },
  { name: 'Triple Fudge Brownie with Vanill...', category: 'Desserts', description: 'Serves One. Our special lip smacking pleasure with...', singlePrice: 570, image: '', available: true, featured: false, order: 67 },
  { name: 'Cheesecake with Topping', category: 'Desserts', description: 'Serves One. Made with heart, cheesecake slice wit...', singlePrice: 560, image: '', available: true, featured: false, order: 68 },
  { name: 'Cheesecake Slice', category: 'Desserts', description: 'Serves One. Rich and creamy, with a perfectly...', singlePrice: 540, image: '', available: true, featured: false, order: 69 },
  { name: 'Cookie with Vanilla Base', category: 'Desserts', description: 'Serves One. Our special lip smacking pleasure with...', singlePrice: 480, image: '', available: true, featured: false, order: 70 },
  { name: 'Cookie', category: 'Desserts', description: 'Serves One. Cookie desserts are sweet, baked treats...', singlePrice: 320, image: '', available: true, featured: false, order: 71 },
  { name: 'Molten Lava Cake', category: 'Desserts', description: 'Serves One. A decadent chocolate cake with a...', singlePrice: 440, image: '', available: true, featured: false, order: 72 },
  { name: 'Molten Lava with Vanilla Base', category: 'Desserts', description: 'Serves One. Our Rockstar consisting deliciously rich...', singlePrice: 610, image: '', available: true, featured: false, order: 73 },
  { name: 'Super Sonic Super Fudge Sundae', category: 'Desserts', description: 'Serves One. A culinary delight of House-...', singlePrice: 780, image: '', available: true, featured: false, order: 74 },
  { name: 'Brownie with Vanilla Base', category: 'Desserts', description: 'Serves One. Comes with soft and chewy brownie with...', singlePrice: 490, image: '', available: true, featured: false, order: 75 },
  { name: 'Pistachio Kunafa Cake', category: 'Desserts', description: 'Serves One. A Pistachio Kunafa Cake is a dessert...', singlePrice: 840, image: '', available: true, featured: false, order: 76 },
  { name: 'Loaded Pistachio Kunafa Cake', category: 'Desserts', description: 'Serves One. A Loaded Pistachio Kunafa Cake is a...', singlePrice: 820, image: '', available: true, featured: false, order: 77 },
  { name: 'Matilda Cake', category: 'Desserts', description: 'Serves One. The best Matilda chocolate cake you will ever...', singlePrice: 560, image: '', available: true, featured: false, order: 78 },
  { name: 'Matilda With Vanilla Base', category: 'Desserts', description: 'Serves One. The best Matilda chocolate cake you will ever...', singlePrice: 690, image: '', available: true, featured: false, order: 79 },

  // ── Kids Corner ──
  { name: 'Chocolate Top Kids Cup', category: 'Kids Corner', description: 'Serves One. Kids-sized served with soft serve of...', singlePrice: 320, image: '', available: true, featured: false, order: 80 },
  { name: 'Sprinkle Kids Cup', category: 'Kids Corner', description: 'Serves One. Kids-sized served with soft serve of...', singlePrice: 280, image: '', available: true, featured: false, order: 81 },
  { name: 'Bunty Kids Cup', category: 'Kids Corner', description: 'Serves One. Kids-sized served with soft serve of...', singlePrice: 280, image: '', available: true, featured: false, order: 82 },
  { name: 'Strawberry Top Kids Cup', category: 'Kids Corner', description: 'Serves One. Kids-sized served with soft serve of...', singlePrice: 320, image: '', available: true, featured: false, order: 83 },

  // ── Ice Cream Elite ──
  { name: 'Kulfa', category: 'Ice Cream Elite', description: 'Classic Kulfa ice cream - rich, creamy, traditional Pakistani flavor', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: true, order: 84 },
  { name: 'Malai Kulfa', category: 'Ice Cream Elite', description: 'Creamy Malai Kulfa with cardamom and pistachio', singlePrice: 220, prices: { cup: 220, cone: 240, tub: 700 }, image: '', available: true, featured: true, order: 85 },
  { name: 'Pistachio Kulfa', category: 'Ice Cream Elite', description: 'Premium Kulfa loaded with real pistachios', singlePrice: 240, prices: { cup: 240, cone: 260, tub: 750 }, image: '', available: true, featured: true, order: 86 },
  { name: 'Strawberry', category: 'Ice Cream Elite', description: 'Fresh strawberry ice cream with real fruit pieces', singlePrice: 180, prices: { cup: 180, cone: 200, tub: 580 }, image: '', available: true, featured: false, order: 87 },
  { name: 'Mango Mania', category: 'Ice Cream Elite', description: 'Tropical mango flavored premium ice cream', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: true, order: 88 },
  { name: 'Vanilla', category: 'Ice Cream Elite', description: 'Classic Madagascar vanilla bean ice cream', singlePrice: 160, prices: { cup: 160, cone: 180, tub: 520 }, image: '', available: true, featured: false, order: 89 },
  { name: 'Chocolate', category: 'Ice Cream Elite', description: 'Rich Belgian chocolate ice cream', singlePrice: 180, prices: { cup: 180, cone: 200, tub: 580 }, image: '', available: true, featured: false, order: 90 },
  { name: 'Pistachio', category: 'Ice Cream Elite', description: 'Premium pistachio ice cream with real nuts', singlePrice: 220, prices: { cup: 220, cone: 240, tub: 700 }, image: '', available: true, featured: true, order: 91 },

  // ── Ice Cream Premium ──
  { name: 'Oreo', category: 'Ice Cream Premium', description: 'Creamy vanilla ice cream with Oreo cookie chunks', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: true, order: 92 },
  { name: 'Lotus Bliss', category: 'Ice Cream Premium', description: 'Biscoff Lotus spread swirled in creamy ice cream', singlePrice: 240, prices: { cup: 240, cone: 260, tub: 750 }, image: '', available: true, featured: true, order: 93 },
  { name: 'Butterscotch', category: 'Ice Cream Premium', description: 'Crunchy butterscotch with caramel swirl', singlePrice: 180, prices: { cup: 180, cone: 200, tub: 580 }, image: '', available: true, featured: false, order: 94 },
  { name: 'Cookie & Cream', category: 'Ice Cream Premium', description: 'Cookies and cream classic flavor', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: false, order: 95 },
  { name: 'Mango Tango', category: 'Ice Cream Premium', description: 'Mango ice cream with tangy mango swirl', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: false, order: 96 },
  { name: 'Strawberry Cheesecake', category: 'Ice Cream Premium', description: 'Strawberry flavored ice cream with cheesecake bites', singlePrice: 220, prices: { cup: 220, cone: 240, tub: 700 }, image: '', available: true, featured: true, order: 97 },
  { name: 'Coffee Crunch', category: 'Ice Cream Premium', description: 'Coffee flavored ice cream with chocolate crunch', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: false, order: 98 },
  { name: 'Mint Choco Chip', category: 'Ice Cream Premium', description: 'Refreshing mint ice cream with dark chocolate chips', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: false, order: 99 },

  // ── Popsicles ──
  { name: 'Strawberry Popsicle', category: 'Popsicles', description: 'Refreshing strawberry flavored popsicle', singlePrice: 120, image: '', available: true, featured: false, order: 100 },
  { name: 'Mango Popsicle', category: 'Popsicles', description: 'Tropical mango flavored ice pop', singlePrice: 120, image: '', available: true, featured: false, order: 101 },
  { name: 'Orange Popsicle', category: 'Popsicles', description: 'Fresh orange juice popsicle', singlePrice: 120, image: '', available: true, featured: false, order: 102 },
  { name: 'Cola Popsicle', category: 'Popsicles', description: 'Cool cola flavored ice pop', singlePrice: 100, image: '', available: true, featured: false, order: 103 },
  { name: 'Double Popsicle', category: 'Popsicles', description: 'Two-in-one flavor popsicle', singlePrice: 150, image: '', available: true, featured: false, order: 104 },

  // ── Toppings ──
  { name: 'Chocolate Sauce', category: 'Toppings', description: 'Rich chocolate sauce drizzle', singlePrice: 30, image: '', available: true, featured: false, order: 105 },
  { name: 'Strawberry Sauce', category: 'Toppings', description: 'Sweet strawberry sauce', singlePrice: 30, image: '', available: true, featured: false, order: 106 },
  { name: 'Caramel Sauce', category: 'Toppings', description: 'Buttery caramel sauce', singlePrice: 30, image: '', available: true, featured: false, order: 107 },
  { name: 'Whipped Cream', category: 'Toppings', description: 'Fresh whipped cream', singlePrice: 20, image: '', available: true, featured: false, order: 108 },
  { name: 'Sprinkles', category: 'Toppings', description: 'Colorful rainbow sprinkles', singlePrice: 20, image: '', available: true, featured: false, order: 109 },
  { name: 'Crushed Nuts', category: 'Toppings', description: 'Roasted crushed mixed nuts', singlePrice: 40, image: '', available: true, featured: false, order: 110 },
  { name: 'Oreo Crumbs', category: 'Toppings', description: 'Crushed Oreo cookie crumbs', singlePrice: 30, image: '', available: true, featured: false, order: 111 },
  { name: 'Cherry', category: 'Toppings', description: 'Maraschino cherry on top', singlePrice: 20, image: '', available: true, featured: false, order: 112 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/melado');
    console.log('MongoDB connected for seeding');

    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    await MenuItem.insertMany(seedData);
    console.log(`Seeded ${seedData.length} menu items`);

    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({ username: 'admin', password: process.env.ADMIN_PASSWORD || 'melado2024' });
      console.log('Admin user created (admin / melado2024)');
    } else {
      console.log('Admin user already exists');
    }

    const sectionCount = await Section.countDocuments();
    if (sectionCount === 0) {
      const allCats = [...new Set(seedData.map(i => i.category))];
      const sections = allCats.map((cat, i) => ({ heading: cat, subheading: '', type: 'category', order: i }));
      await Section.insertMany(sections);
      console.log(`${sections.length} sections seeded`);
    } else {
      console.log('Sections already exist');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
