require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
const Section = require('./models/Section');

const seedData = [
  // ── New Arrivals ──
  { name: 'Hazelnut Shake', category: 'New Arrivals', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: true, isNew: true, order: 1 },
 

  // ── Boba Cup ──
  { name: 'Lychee Boba Cup', category: 'Boba Cup', description: 'Serves One. A Lychee Boba Cup is the combination of...', singlePrice: 360, image: '', available: true, featured: false, order: 10 },


  // ── Loaded Sundae ──
  { name: 'Brownie Explosion Loaded Sundae', category: 'Sundaes', description: 'Serves One. A culinary delight of House-made...', singlePrice: 620, image: '', available: true, featured: false, order: 14 },
  

  // ── Chillers ──
  { name: 'Watermelon Mint Chiller', category: 'Chillers', description: 'Serves One. A Watermelon Mint Chiller is a refreshing...', singlePrice: 340, image: '', available: true, featured: false, order: 21 },
  

  // ── Sundaes ──
  { name: 'Choco Fudge Sundae', category: 'Sundaes', description: 'Serves One. Our mouth watering combo of House-...', singlePrice: 560, image: '', available: true, featured: false, order: 27 },
 

  // ── Shakes ──
  { name: 'Hazelnut Shake', category: 'Shakes', description: 'Serves One. A thick & rich blend of milk, Vanilla soft..', singlePrice: 690, image: '', available: true, featured: false, order: 38 },
 

  // ── Super Cup ──
  { name: 'Super Caramel Biscotti Cup', category: 'Super Cup', description: 'Serves One. Our Superstar Cup filled with soft serve of...', singlePrice: 330, image: '', available: true, featured: false, order: 56 },
 
  // ── Desserts ──
  { name: 'Double Sauce Brownie with Vanill...', category: 'Desserts', description: 'Serves One. Our special lip smacking pleasure with...', singlePrice: 540, image: '', available: true, featured: false, order: 65 },
 

  // ── Kids Corner ──
  { name: 'Chocolate Top Kids Cup', category: 'Kids Corner', description: 'Serves One. Kids-sized served with soft serve of...', singlePrice: 320, image: '', available: true, featured: false, order: 80 },
 

  // ── Ice Cream Elite ──
  { name: 'Kulfa', category: 'Ice Cream Elite', description: 'Classic Kulfa ice cream - rich, creamy, traditional Pakistani flavor', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: true, order: 84 },
  
  // ── Ice Cream Premium ──
  { name: 'Oreo', category: 'Ice Cream Premium', description: 'Creamy vanilla ice cream with Oreo cookie chunks', singlePrice: 200, prices: { cup: 200, cone: 220, tub: 650 }, image: '', available: true, featured: true, order: 92 },
 

  // ── Popsicles ──
  { name: 'Strawberry Popsicle', category: 'Popsicles', description: 'Refreshing strawberry flavored popsicle', singlePrice: 120, image: '', available: true, featured: false, order: 100 },
 

  // ── Toppings ──
  { name: 'Chocolate Sauce', category: 'Toppings', description: 'Rich chocolate sauce drizzle', singlePrice: 30, image: '', available: true, featured: false, order: 105 },

];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/melado-by-guluna');
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(seedData);
    console.log(`Seeded ${seedData.length} products`);

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
