// seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Court = require('../models/Court');
const Equipment = require('../models/Equipment');
const Coach = require('../models/Coach');
const PricingRule = require('../models/PricingRule');
const User = require('../models/User');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('.env MONGO_URI not set');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    Court.deleteMany(),
    Equipment.deleteMany(),
    Coach.deleteMany(),
    PricingRule.deleteMany(),
    User.deleteMany()
  ]);

  await Court.insertMany([
    { name: 'Court A', type: 'indoor', basePrice: 250 },
    { name: 'Court B', type: 'indoor', basePrice: 250 },
    { name: 'Court C', type: 'outdoor', basePrice: 180 },
    { name: 'Court D', type: 'outdoor', basePrice: 180 }
  ]);

  await Equipment.insertMany([
    { name: 'Racket', totalStock: 20, pricePerUnit: 5 },
    { name: 'Shoes', totalStock: 10, pricePerUnit: 30 }
  ]);

  await Coach.insertMany([
    { name: 'Coach John', hourlyRate: 150, isActive: true },
    { name: 'Coach Priya', hourlyRate: 200, isActive: true },
    { name: 'Coach Amit', hourlyRate: 180, isActive: true }
  ]);

  await PricingRule.insertMany([
    { name: 'Peak Hours 18-21', type: 'time_range', config: { startHour: 18, endHour: 21, multiplier: 1.3 }, isActive: true },
    { name: 'Weekend Surcharge', type: 'day_of_week', config: { days: [0,6], surcharge: 50 }, isActive: true },
    { name: 'Indoor Premium', type: 'court_type', config: { courtType: 'indoor', surcharge: 30 }, isActive: true }
  ]);

  const userHash = await bcrypt.hash('password', 10);
  const adminHash = await bcrypt.hash('password', 10);

  const user = await User.create({ name: 'Test User', email: 'test@example.com', passwordHash: userHash, role: 'user' });
  const admin = await User.create({ name: 'Admin User', email: 'admin@demo.com', passwordHash: adminHash, role: 'admin' });

  console.log('Seeding done.');
  console.log('Test user -> email: test@example.com, password: password');
  console.log('Admin user -> email: admin@demo.com, password: password');

  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });
