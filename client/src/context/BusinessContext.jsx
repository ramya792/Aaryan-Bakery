import React, { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState({
    businessName: "Aaryan Bakery",
    brandName: "Sweet Studio — Aaryan Bakery",
    ownerName: "K. Narendra",
    phone: "9701969499",
    whatsapp: "919701969499",
    email: "contact@aaryanbakery.com",
    instagram: "@aaryanbakery_official",
    address: "Guraja Center, Mudinepalle / Mudinapalli Area",
    district: "Eluru District",
    state: "Andhra Pradesh",
    pinCode: "521325",
    openingTime: "09:00 AM",
    closingTime: "10:00 PM",
    weeklyHoliday: "No weekly holiday (Open all 7 days)",
    deliveryAvailable: true,
    deliveryNotice: "Local delivery is available. Please contact the bakery to confirm delivery availability for your specific location.",
    aboutText: "Welcome to Sweet Studio — Aaryan Bakery, owned by K. Narendra. Located at Mudinepalle, Eluru District, we take pride in crafting fresh cakes, delicious pizzas, savory puffs, premium Arun Ice Creams, and handcrafted customized theme cakes for all your special celebrations."
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resBiz, resCats, resProds, resGal, resFaqs] = await Promise.all([
        fetch('/api/business').then(r => r.ok ? r.json() : null),
        fetch('/api/categories').then(r => r.ok ? r.json() : null),
        fetch('/api/products').then(r => r.ok ? r.json() : null),
        fetch('/api/gallery').then(r => r.ok ? r.json() : null),
        fetch('/api/faqs').then(r => r.ok ? r.json() : null),
      ]);

      if (resBiz && resBiz.data) setBusiness(resBiz.data);
      if (resCats && resCats.data) setCategories(resCats.data);
      if (resProds && resProds.data) setProducts(resProds.data);
      if (resGal && resGal.data) setGallery(resGal.data);
      if (resFaqs && resFaqs.data) setFaqs(resFaqs.data);

    } catch (err) {
      console.warn("Using default client store state:", err);
      setError("Unable to connect to live server. Viewing cached bakery information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // WhatsApp formatted URL generator (Requirement 12)
  const generateWhatsAppLink = ({ customerName, productName, category, quantity, cakeWeight, requiredDate, deliveryLocation, message }) => {
    const text = `Hello Aaryan Bakery! I would like to place an enquiry:

👤 *Customer Name:* ${customerName || 'Customer'}
🎂 *Product / Item:* ${productName || 'Bakery Item'} ${category ? `(${category})` : ''}
📦 *Quantity / Weight:* ${cakeWeight || quantity || '1'}
📅 *Required Date:* ${requiredDate || 'As soon as possible'}
📍 *Delivery / Pickup:* ${deliveryLocation ? `Delivery to: ${deliveryLocation}` : 'Store Pickup'}
💬 *Additional Details:* ${message || 'None'}

Please confirm availability and pricing. Thank you!`;

    const cleanNumber = (business.whatsapp || '919701969499').replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const submitOrderEnquiry = async (formData) => {
    try {
      const res = await fetch('/api/order-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Submit order error:", err);
      return { success: false, message: 'Failed to connect to server. Please call 9701969499 directly.' };
    }
  };

  const submitCustomCakeRequest = async (formData) => {
    try {
      const res = await fetch('/api/custom-cake-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Submit custom cake error:", err);
      return { success: false, message: 'Failed to connect to server. Please call 9701969499 directly.' };
    }
  };

  return (
    <BusinessContext.Provider value={{
      business,
      categories,
      products,
      gallery,
      faqs,
      loading,
      error,
      refreshData: fetchData,
      generateWhatsAppLink,
      submitOrderEnquiry,
      submitCustomCakeRequest
    }}>
      {children}
    </BusinessContext.Provider>
  );
};
