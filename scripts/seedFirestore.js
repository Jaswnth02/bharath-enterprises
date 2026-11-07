import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env variables manually in Node
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

const envConfig = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      envConfig[key.trim()] = values.join('=').trim();
    }
  });
}

const firebaseConfig = {
  apiKey: envConfig.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: envConfig.VITE_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.VITE_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.length < 10) {
  console.error('\n❌ Firebase credentials missing in .env!');
  console.log('Please open .env and provide your Firebase project credentials:');
  console.log('  VITE_FIREBASE_API_KEY=...');
  console.log('  VITE_FIREBASE_AUTH_DOMAIN=...');
  console.log('  VITE_FIREBASE_PROJECT_ID=...');
  console.log('  VITE_FIREBASE_STORAGE_BUCKET=...');
  console.log('  VITE_FIREBASE_MESSAGING_SENDER_ID=...');
  console.log('  VITE_FIREBASE_APP_ID=...\n');
  process.exit(1);
}

import {
  initialCategories,
  initialProducts,
  initialServices,
  initialProjects,
  initialGallery,
  initialWebsiteSettings,
} from '../src/firebase/seedData.js';

async function seed() {
  console.log(`\n🚀 Connecting to Firebase project: [${firebaseConfig.projectId}]...`);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    // 1. Seed Website Settings
    console.log('📦 Seeding websiteSettings/general...');
    await setDoc(doc(db, 'websiteSettings', 'general'), {
      ...initialWebsiteSettings,
      updatedAt: new Date().toISOString(),
    });

    // 2. Seed Services (5 poster services)
    console.log('📦 Seeding services...');
    for (const srv of initialServices) {
      await setDoc(doc(db, 'services', srv.serviceId), {
        ...srv,
        createdAt: new Date().toISOString(),
      });
    }

    // 3. Seed Categories
    console.log('📦 Seeding categories...');
    for (const cat of initialCategories) {
      await setDoc(doc(db, 'categories', cat.categoryId), cat);
    }

    // 4. Seed Products
    console.log('📦 Seeding products...');
    for (const prod of initialProducts) {
      await setDoc(doc(db, 'products', prod.productId), prod);
    }

    // 5. Seed Projects
    console.log('📦 Seeding projects...');
    for (const proj of initialProjects) {
      await setDoc(doc(db, 'projects', proj.projectId), proj);
    }

    // 6. Seed Gallery
    console.log('📦 Seeding gallery...');
    for (const gal of initialGallery) {
      await setDoc(doc(db, 'gallery', gal.imageId), gal);
    }

    console.log('\n✅ Cloud Firestore database seeded successfully with Bharath Enterprises business data!');
    console.log('Your website will now read live from Cloud Firestore.\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
