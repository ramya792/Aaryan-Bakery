const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getStore, updateStore } = require('../db');
const { adminAuth, JWT_SECRET } = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple admin credentials for hackathon prototype (or configurable via ENV)
  const validEmail = process.env.ADMIN_EMAIL || 'admin@aaryanbakery.com';
  const validPassword = process.env.ADMIN_PASSWORD || 'aaryan@2026';

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  if (email.trim().toLowerCase() !== validEmail.toLowerCase() || password !== validPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please check your email and password.'
    });
  }

  const token = jwt.sign(
    { role: 'admin', email: validEmail, ownerName: 'K. Narendra' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Admin authentication successful.',
    token,
    user: {
      email: validEmail,
      role: 'admin',
      ownerName: 'K. Narendra'
    }
  });
});

// Protect all following routes with adminAuth
router.use(adminAuth);

// GET /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  const store = getStore();
  const products = store.products || [];
  const gallery = store.gallery || [];
  const orderEnquiries = store.orderEnquiries || [];
  const customCakeRequests = store.customCakeRequests || [];

  const stats = {
    totalProducts: products.length,
    publishedProducts: products.filter(p => p.isPublished !== false).length,
    galleryCount: gallery.length,
    totalEnquiries: orderEnquiries.length + customCakeRequests.length,
    newOrderEnquiries: orderEnquiries.filter(e => e.status === 'New').length,
    pendingCustomCakeRequests: customCakeRequests.filter(c => c.status === 'New').length,
    availableProducts: products.filter(p => p.isAvailable).length,
    egglessProductsCount: products.filter(p => p.isEggless).length
  };

  res.json({
    success: true,
    data: {
      stats,
      recentOrderEnquiries: orderEnquiries.slice(0, 5),
      recentCustomCakeRequests: customCakeRequests.slice(0, 5),
      recentProducts: products.slice(0, 5)
    }
  });
});

// --- PRODUCT MANAGEMENT ---
router.post('/products', (req, res) => {
  const { name, categoryId, categoryName, description, price, currency, unit, imageUrl, isEggless, isCustomizable, isAvailable, isPublished, displayOrder } = req.body;

  if (!name || !categoryId || price === undefined) {
    return res.status(400).json({ success: false, message: 'Name, category, and price are required.' });
  }

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId,
    categoryName: categoryName || 'Cakes',
    description: description || '',
    price: Number(price),
    currency: currency || '₹',
    unit: unit || 'per piece',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    cloudinaryPublicId: `bakery/${Date.now()}`,
    isEggless: Boolean(isEggless),
    isCustomizable: Boolean(isCustomizable),
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    displayOrder: displayOrder || 99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    products: [...(prev.products || []), newProduct]
  }));

  res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
});

router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const existing = (store.products || []).find(p => p.id === id);

  if (!existing) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updatedProduct = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    products: prev.products.map(p => p.id === id ? updatedProduct : p)
  }));

  res.json({ success: true, message: 'Product updated successfully', data: updatedProduct });
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  updateStore(prev => ({
    ...prev,
    products: (prev.products || []).filter(p => p.id !== id)
  }));
  res.json({ success: true, message: 'Product deleted successfully' });
});

// --- GALLERY MANAGEMENT ---
router.post('/gallery', (req, res) => {
  const { title, description, category, imageUrl, isFeatured, isPublished } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Title and Image URL are required' });
  }

  const newItem = {
    id: `gal-${Date.now()}`,
    title,
    description: description || '',
    category: category || 'Cakes',
    imageUrl,
    cloudinaryPublicId: `gallery/${Date.now()}`,
    isFeatured: Boolean(isFeatured),
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    displayOrder: 99,
    createdAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    gallery: [...(prev.gallery || []), newItem]
  }));

  res.status(201).json({ success: true, message: 'Gallery item added successfully', data: newItem });
});

router.put('/gallery/:id', (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const existing = (store.gallery || []).find(g => g.id === id);

  if (!existing) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }

  const updatedItem = { ...existing, ...req.body };
  updateStore(prev => ({
    ...prev,
    gallery: prev.gallery.map(g => g.id === id ? updatedItem : g)
  }));

  res.json({ success: true, message: 'Gallery item updated successfully', data: updatedItem });
});

router.delete('/gallery/:id', (req, res) => {
  const { id } = req.params;
  updateStore(prev => ({
    ...prev,
    gallery: (prev.gallery || []).filter(g => g.id !== id)
  }));
  res.json({ success: true, message: 'Gallery item deleted successfully' });
});

// --- ORDER ENQUIRIES MANAGEMENT ---
router.get('/enquiries', (req, res) => {
  const store = getStore();
  res.json({
    success: true,
    data: {
      orderEnquiries: store.orderEnquiries || [],
      customCakeRequests: store.customCakeRequests || []
    }
  });
});

router.put('/enquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const validStatuses = ['New', 'Contacted', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value.' });
  }

  const store = getStore();
  let foundInOrders = (store.orderEnquiries || []).some(e => e.id === id);

  if (foundInOrders) {
    updateStore(prev => ({
      ...prev,
      orderEnquiries: prev.orderEnquiries.map(e => e.id === id ? {
        ...e,
        ...(status ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
        updatedAt: new Date().toISOString()
      } : e)
    }));
    return res.json({ success: true, message: 'Order enquiry status updated.' });
  }

  let foundInCustom = (store.customCakeRequests || []).some(c => c.id === id);
  if (foundInCustom) {
    updateStore(prev => ({
      ...prev,
      customCakeRequests: prev.customCakeRequests.map(c => c.id === id ? {
        ...c,
        ...(status ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
        updatedAt: new Date().toISOString()
      } : c)
    }));
    return res.json({ success: true, message: 'Custom cake request status updated.' });
  }

  res.status(404).json({ success: false, message: 'Enquiry not found.' });
});

router.delete('/enquiries/:id', (req, res) => {
  const { id } = req.params;
  updateStore(prev => ({
    ...prev,
    orderEnquiries: (prev.orderEnquiries || []).filter(e => e.id !== id),
    customCakeRequests: (prev.customCakeRequests || []).filter(c => c.id !== id)
  }));
  res.json({ success: true, message: 'Enquiry deleted successfully.' });
});

// --- BUSINESS INFORMATION MANAGEMENT ---
router.get('/business', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.businessSettings });
});

router.put('/business', (req, res) => {
  updateStore(prev => ({
    ...prev,
    businessSettings: {
      ...prev.businessSettings,
      ...req.body,
      updatedAt: new Date().toISOString()
    }
  }));
  res.json({ success: true, message: 'Business settings updated successfully.', data: getStore().businessSettings });
});

// --- CHATBOT KNOWLEDGE MANAGEMENT ---
router.get('/chatbot-knowledge', (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.chatbotKnowledge || [] });
});

router.post('/chatbot-knowledge', (req, res) => {
  const { question, answer, category, keywords, isPublished } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ success: false, message: 'Question and answer are required.' });
  }

  const newFaq = {
    id: `faq-${Date.now()}`,
    question,
    answer,
    category: category || 'General',
    keywords: Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(k => k.trim()) : []),
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    chatbotKnowledge: [...(prev.chatbotKnowledge || []), newFaq]
  }));

  res.status(201).json({ success: true, message: 'FAQ added to chatbot knowledge base.', data: newFaq });
});

router.put('/chatbot-knowledge/:id', (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const existing = (store.chatbotKnowledge || []).find(f => f.id === id);

  if (!existing) {
    return res.status(404).json({ success: false, message: 'FAQ entry not found.' });
  }

  const updatedFaq = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    chatbotKnowledge: prev.chatbotKnowledge.map(f => f.id === id ? updatedFaq : f)
  }));

  res.json({ success: true, message: 'FAQ updated successfully.', data: updatedFaq });
});

router.delete('/chatbot-knowledge/:id', (req, res) => {
  const { id } = req.params;
  updateStore(prev => ({
    ...prev,
    chatbotKnowledge: (prev.chatbotKnowledge || []).filter(f => f.id !== id)
  }));
  res.json({ success: true, message: 'FAQ deleted from chatbot knowledge base.' });
});

module.exports = router;
