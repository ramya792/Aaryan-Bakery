const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { getStore, updateStore } = require('../db');

// GET /api/business
router.get('/business', (req, res) => {
  const store = getStore();
  res.json({
    success: true,
    data: store.businessSettings
  });
});

// GET /api/categories
router.get('/categories', (req, res) => {
  const store = getStore();
  const categories = (store.categories || [])
    .filter(c => c.published !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  res.json({
    success: true,
    data: categories
  });
});

// GET /api/products
router.get('/products', (req, res) => {
  const store = getStore();
  const { category, search, eggless } = req.query;

  let products = (store.products || []).filter(p => p.isPublished !== false);

  if (category && category !== 'All') {
    products = products.filter(p => p.categoryId === category || p.categoryName.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  }

  if (eggless === 'true') {
    products = products.filter(p => p.isEggless === true);
  }

  products.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  res.json({
    success: true,
    data: products
  });
});

// GET /api/products/:id
router.get('/products/:id', (req, res) => {
  const store = getStore();
  const product = (store.products || []).find(p => p.id === req.params.id || p.slug === req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: product
  });
});

// GET /api/gallery
router.get('/gallery', (req, res) => {
  const store = getStore();
  const gallery = (store.gallery || [])
    .filter(g => g.isPublished !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  res.json({
    success: true,
    data: gallery
  });
});

// GET /api/faqs
router.get('/faqs', (req, res) => {
  const store = getStore();
  const faqs = (store.chatbotKnowledge || [])
    .filter(f => f.isPublished !== false);

  res.json({
    success: true,
    data: faqs
  });
});

// POST /api/order-enquiries
router.post('/order-enquiries', (req, res) => {
  const { customerName, phone, email, productId, productName, category, quantity, cakeWeight, requiredDate, deliveryOrPickup, deliveryLocation, message } = req.body;

  if (!customerName || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Customer name and phone number are required.'
    });
  }

  const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`;
  const newEnquiry = {
    id: enquiryId,
    customerName,
    phone,
    email: email || '',
    productId: productId || '',
    productName: productName || 'General Item',
    category: category || 'General',
    quantity: quantity || 1,
    cakeWeight: cakeWeight || '',
    requiredDate: requiredDate || '',
    deliveryOrPickup: deliveryOrPickup || 'Pickup',
    deliveryLocation: deliveryLocation || '',
    message: message || '',
    status: 'New',
    adminNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    orderEnquiries: [newEnquiry, ...(prev.orderEnquiries || [])]
  }));

  res.status(201).json({
    success: true,
    message: 'Order enquiry submitted successfully. The bakery will contact you for confirmation.',
    enquiryId: enquiryId,
    data: newEnquiry
  });
});

// POST /api/custom-cake-requests
router.post('/custom-cake-requests', (req, res) => {
  const { customerName, phone, email, occasion, flavour, weight, requiredDate, requiredTime, designDescription, referenceImageUrl, deliveryOrPickup, deliveryLocation, message } = req.body;

  if (!customerName || !phone || !requiredDate) {
    return res.status(400).json({
      success: false,
      message: 'Customer name, phone number, and required date are required.'
    });
  }

  const requestId = `CC-${Date.now().toString().slice(-6)}`;
  const newRequest = {
    id: requestId,
    customerName,
    phone,
    email: email || '',
    occasion: occasion || 'Birthday',
    flavour: flavour || 'Vanilla',
    weight: weight || '1 kg',
    requiredDate,
    requiredTime: requiredTime || '',
    designDescription: designDescription || '',
    referenceImageUrl: referenceImageUrl || '',
    deliveryOrPickup: deliveryOrPickup || 'Pickup',
    deliveryLocation: deliveryLocation || '',
    message: message || '',
    status: 'New',
    adminNotes: '',
    createdAt: new Date().toISOString()
  };

  updateStore(prev => ({
    ...prev,
    customCakeRequests: [newRequest, ...(prev.customCakeRequests || [])]
  }));

  res.status(201).json({
    success: true,
    message: 'Custom cake enquiry submitted successfully. The bakery will contact you for confirmation.',
    requestId: requestId,
    data: newRequest
  });
});

module.exports = router;
