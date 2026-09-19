const admin = require('firebase-admin');
const { getStore } = require('../db');

let firestoreDb = null;
let isFirestoreInitialized = false;

// Initialize Firebase Admin if environment variables are provided
function initFirestore() {
  if (isFirestoreInitialized) return firestoreDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      if (privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey
          })
        });
      }

      firestoreDb = admin.firestore();
      isFirestoreInitialized = true;
      console.log("[Firestore Service] Firebase Admin SDK successfully initialized.");
      return firestoreDb;
    } catch (err) {
      console.warn("[Firestore Service] Failed to initialize Firebase Admin SDK:", err.message);
      isFirestoreInitialized = false;
      return null;
    }
  } else {
    // Firestore not configured; will use verified local seed store
    isFirestoreInitialized = false;
    return null;
  }
}

/**
 * Retrieves verified business context for RAG Chatbot and public APIs.
 * 1. Tries to retrieve published information from Firestore collections.
 * 2. If Firestore is unavailable or unconfigured during local development, uses verified seed data.
 * 3. Logs which source is being used.
 */
async function getBusinessContext() {
  const db = initFirestore();
  const localStore = getStore();

  if (db) {
    try {
      console.log("[Firestore Service] Attempting to retrieve verified data from Firestore collections...");
      
      const [settingsSnap, productsSnap, faqsSnap, categoriesSnap] = await Promise.all([
        db.collection('businessSettings').doc('main').get().catch(() => null),
        db.collection('products').where('isPublished', '!=', false).get().catch(() => null),
        db.collection('chatbotKnowledge').where('isPublished', '!=', false).get().catch(() => null),
        db.collection('categories').where('published', '!=', false).get().catch(() => null)
      ]);

      const businessSettings = (settingsSnap && settingsSnap.exists) 
        ? settingsSnap.data() 
        : localStore.businessSettings;

      let products = [];
      if (productsSnap && !productsSnap.empty) {
        productsSnap.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
      } else {
        products = (localStore.products || []).filter(p => p.isPublished !== false);
      }

      let chatbotKnowledge = [];
      if (faqsSnap && !faqsSnap.empty) {
        faqsSnap.forEach(doc => chatbotKnowledge.push({ id: doc.id, ...doc.data() }));
      } else {
        chatbotKnowledge = (localStore.chatbotKnowledge || []).filter(f => f.isPublished !== false);
      }

      let categories = [];
      if (categoriesSnap && !categoriesSnap.empty) {
        categoriesSnap.forEach(doc => categories.push({ id: doc.id, ...doc.data() }));
      } else {
        categories = (localStore.categories || []).filter(c => c.published !== false);
      }

      console.log(`[Firestore Service] Successfully loaded ${products.length} products, ${chatbotKnowledge.length} FAQs, and business settings from Firestore/Hybrid.`);

      return {
        source: 'firestore',
        businessSettings,
        products,
        chatbotKnowledge,
        categories
      };
    } catch (err) {
      console.warn("[Firestore Service] Error querying Firestore, falling back to verified seed data:", err.message);
    }
  }

  // Fallback to verified local seed store
  console.log("[Firestore Service] Using verified local seed store (Firestore not configured or in offline mode).");
  return {
    source: 'verified_seed_store',
    businessSettings: localStore.businessSettings,
    products: (localStore.products || []).filter(p => p.isPublished !== false),
    chatbotKnowledge: (localStore.chatbotKnowledge || []).filter(f => f.isPublished !== false),
    categories: (localStore.categories || []).filter(c => c.published !== false)
  };
}

module.exports = {
  getBusinessContext,
  initFirestore
};
