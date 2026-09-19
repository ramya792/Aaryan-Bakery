const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const { getBusinessContext } = require('../services/firestore');

const FALLBACK_RESPONSE = "Sorry, I don't know that information yet. Please contact Aaryan Bakery directly at 9701969499.";

// Initialize OpenAI client if API key is provided
const getOpenAIClient = () => {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().startsWith('sk-')) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY.trim() });
  }
  return null;
};

router.post('/', async (req, res) => {
  const requestStartTime = Date.now();
  
  try {
    const { message } = req.body;
    
    // 1. Validate Input
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        answer: FALLBACK_RESPONSE,
        response: FALLBACK_RESPONSE,
        message: 'A valid message string is required.'
      });
    }

    const userQuestion = message.trim();
    const query = userQuestion.toLowerCase();

    // 2. Safe Backend Debug Logging (API Request Received)
    console.log(`\n==================================================`);
    console.log(`[Chat API] Request received: "${userQuestion}"`);
    console.log(`[Chat API] Timestamp: ${new Date().toISOString()}`);

    // 3. Retrieve Verified Business Context (RAG context from Firestore / Verified Local Seed Store)
    const contextData = await getBusinessContext();
    const { businessSettings, products = [], chatbotKnowledge = [], categories = [], source } = contextData;

    const firestoreSucceeded = source === 'firestore';
    console.log(`[Chat API] Context Data Source: ${source} (Firestore Succeeded: ${firestoreSucceeded})`);

    // Published filter
    const publishedProducts = products.filter(p => p.isPublished !== false);
    const publishedFaqs = chatbotKnowledge.filter(f => f.isPublished !== false);

    const totalRetrievedDocs = publishedProducts.length + publishedFaqs.length + categories.length + (businessSettings ? 1 : 0);
    const productNames = publishedProducts.map(p => p.name);

    console.log(`[Chat API] Number of retrieved documents: ${totalRetrievedDocs}`);
    console.log(`[Chat API] Retrieved products (${publishedProducts.length}): ${productNames.slice(0, 8).join(', ')}${productNames.length > 8 ? '...' : ''}`);

    if (totalRetrievedDocs === 0) {
      console.warn(`[Chat API] WARNING: No verified business context was retrieved.`);
    }

    // 4. Construct Verified Grounded Context for AI
    const verifiedContext = `
VERIFIED BUSINESS INFORMATION:
- Business Name: ${businessSettings?.businessName || 'Aaryan Bakery'}
- Brand Name: ${businessSettings?.brandName || 'Sweet Studio — Aaryan Bakery'}
- Owner Name: ${businessSettings?.ownerName || 'K. Narendra'}
- Phone / WhatsApp: ${businessSettings?.phone || '9701969499'}
- Location / Address: ${businessSettings?.address || 'Guraja Center, Mudinepalle'}, ${businessSettings?.district || 'Eluru District'}, ${businessSettings?.state || 'Andhra Pradesh'} - ${businessSettings?.pinCode || '521325'}
- Opening Hours: ${businessSettings?.openingTime || '09:00 AM'} to ${businessSettings?.closingTime || '10:00 PM'} (Open every day, no weekly holiday)
- Delivery Service: ${businessSettings?.deliveryNotice || 'Local delivery is available in Mudinepalle area. Please call 9701969499.'}
- About: ${businessSettings?.aboutText || 'Freshly prepared cakes, pizzas, puffs, and Arun Ice Creams.'}

VERIFIED BAKERY PRODUCTS & PRICES:
${publishedProducts.map(p => {
  const priceStr = p.price > 0 ? `${p.currency || '₹'}${p.price} ${p.unit}` : p.unit;
  return `- ${p.name} (${p.categoryName}): ${priceStr}. Status: ${p.isAvailable ? 'Available' : 'Unavailable'}. ${p.isEggless ? '100% Eggless (Vegetarian).' : ''} ${p.description || ''}`;
}).join('\n')}

VERIFIED PUBLISHED KNOWLEDGE & FAQS:
${publishedFaqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
`;

    // 5. Unverified Guard Triggers: Immediately reject queries asking for unverified or private data
    const unverifiedTriggers = [
      'sugar free', 'sugar-free', 'diabetic', 'discount', 'coupon', 'offer code', 'promo',
      'midnight delivery', 'international', 'ingredients', 'recipe', 'allergy', 'allergic',
      'nut free', 'gluten free', 'payment app', 'gpay', 'paytm', 'phonepe', 'bhim',
      'delivery charge', 'exact delivery cost', 'awards', 'rating', 'star rating',
      'admin password', 'secret key', 'private token', 'enquiry records', 'customer list'
    ];

    const isUnverified = unverifiedTriggers.some(trigger => query.includes(trigger));
    if (isUnverified) {
      console.log(`[Chat API] Query matched unverified guard. Returning approved fallback response.`);
      console.log(`[Chat API] API Response Status: 200 (Source: unverified_guard, Duration: ${Date.now() - requestStartTime}ms)`);
      console.log(`==================================================\n`);
      return res.json({
        success: true,
        answer: FALLBACK_RESPONSE,
        response: FALLBACK_RESPONSE,
        source: 'unverified_guard'
      });
    }

    // 6. Check with OpenAI if configured
    const openai = getOpenAIClient();
    if (openai) {
      try {
        const systemPrompt = `You are Aaryan Assistant, the official information assistant for Aaryan Bakery.

Answer only using the verified business context provided to you below.
Do not invent prices, products, offers, ingredients, delivery charges, delivery areas, preparation times, availability, discounts, reviews or payment methods.

If the answer is not present in the supplied context, respond exactly:
${FALLBACK_RESPONSE}

If a user asks about allergies, ingredients or medical dietary requirements and the information is not available, tell the user to contact the bakery directly at 9701969499.

Do not confirm an order.
Do not claim an order has been accepted.
Do not guess.
Keep answers concise, polite and useful.

Verified Business Context:
${verifiedContext}`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuestion }
          ],
          temperature: 0.1,
          max_tokens: 220
        });

        const reply = completion.choices[0]?.message?.content?.trim();
        if (reply && !reply.includes("I cannot find") && !reply.includes("as an AI")) {
          console.log(`[Chat API] OpenAI Request: Succeeded (Answer generated)`);
          console.log(`[Chat API] API Response Status: 200 (Source: openai, Duration: ${Date.now() - requestStartTime}ms)`);
          console.log(`==================================================\n`);
          return res.json({
            success: true,
            answer: reply,
            response: reply,
            source: 'openai'
          });
        }
      } catch (openAiErr) {
        console.warn(`[Chat API] OpenAI API error/unreachable: ${openAiErr.message}. Executing deterministic grounded knowledge engine.`);
      }
    } else {
      console.log(`[Chat API] OpenAI not configured with sk- key. Using deterministic grounded knowledge engine.`);
    }

    // 7. Deterministic Grounded Knowledge Engine (Exact & Semantic Matcher for all Verified Questions)

    // A. Specific Cake Price queries
    if (query.includes('chocolate normal cake')) {
      const p = publishedProducts.find(x => x.name.toLowerCase().includes('chocolate normal'));
      const priceText = p ? `${p.currency}${p.price} ${p.unit}` : '₹320 per kg';
      const answer = `Chocolate normal cake is ${priceText}.`;
      console.log(`[Chat API] Deterministic match: Chocolate Normal Cake`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    if (query.includes('chocolate cool cake')) {
      const p = publishedProducts.find(x => x.name.toLowerCase().includes('chocolate cool'));
      const priceText = p ? `${p.currency}${p.price} ${p.unit}` : '₹500 per kg';
      const answer = `Chocolate cool cake is ${priceText}.`;
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    if (query.includes('vanilla normal') || query.includes('vennela normal')) {
      const answer = `Vanilla/Vennela normal cake is ₹270 per kg.`;
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    if (query.includes('vanilla cool') || query.includes('vennela cool')) {
      const answer = `Vanilla/Vennela cool cake is ₹450 per kg.`;
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    if (query.includes('butterscotch normal')) {
      const answer = `Butterscotch normal cake is ₹300 per kg.`;
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    if (query.includes('butterscotch cool')) {
      const answer = `Butterscotch cool cake is ₹500 per kg.`;
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // B. Eggless Cakes
    if (query.includes('eggless') || query.includes('vegetarian cake') || query.includes('pure veg cake')) {
      const answer = `Yes. Eggless normal cakes are ₹350 per kg and eggless cool cakes are ₹550 per kg.`;
      console.log(`[Chat API] Deterministic match: Eggless Cakes`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // C. Cake Prices (General query: "What are the cake prices?", "cake rates", "cake cost", "cake flavours")
    if (
      query.includes('cake price') || 
      query.includes('cake prices') || 
      query.includes('cake cost') || 
      query.includes('cake rate') || 
      query.includes('cakes price') ||
      query.includes('price of cake') ||
      query.includes('prices of cake') ||
      query.includes('cake menu') ||
      (query.includes('what cakes') && !query.includes('custom'))
    ) {
      const answer = `Here are our verified cake prices per kg:\n\n` +
        `• Vanilla/Vennela Normal Cake: ₹270 per kg\n` +
        `• Vanilla/Vennela Cool Cake: ₹450 per kg\n` +
        `• Butterscotch Normal Cake: ₹300 per kg\n` +
        `• Butterscotch Cool Cake: ₹500 per kg\n` +
        `• Chocolate Normal Cake: ₹320 per kg\n` +
        `• Chocolate Cool Cake: ₹500 per kg\n` +
        `• Eggless Normal Cake: ₹350 per kg\n` +
        `• Eggless Cool Cake: ₹550 per kg`;
      console.log(`[Chat API] Deterministic match: Cake Prices List`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // D. Pizzas ("What pizzas are available?", "pizza prices", "pizza rates")
    if (query.includes('pizza')) {
      const answer = `Our verified pizza menu & prices:\n\n` +
        `• Chicken Pizza: ₹150\n` +
        `• Vegetable Pizza: ₹120\n` +
        `• Sweet Corn Pizza: ₹130`;
      console.log(`[Chat API] Deterministic match: Pizza Prices`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // E. Puffs ("What are the puff prices?", "puffs", "puff items")
    if (query.includes('puff')) {
      const answer = `Our verified puff prices:\n\n` +
        `• Chicken Puff: ₹30\n` +
        `• Egg Puff: ₹20\n` +
        `• Curry Puff: ₹15`;
      console.log(`[Chat API] Deterministic match: Puff Prices`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // F. Ice Creams ("ice cream", "arun ice cream")
    if (query.includes('ice cream') || query.includes('icecream') || query.includes('arun')) {
      const answer = `Arun Ice Creams are available in a variety of flavours and packs. Please contact the bakery at 9701969499 for current price and flavour availability.`;
      console.log(`[Chat API] Deterministic match: Ice Creams`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // G. Opening hours / Timings
    if (query.includes('opening') || query.includes('hour') || query.includes('timing') || query.includes('open') || query.includes('close') || query.includes('holiday')) {
      const answer = `Aaryan Bakery is open from 9:00 AM to 10:00 PM every day with no weekly holiday.`;
      console.log(`[Chat API] Deterministic match: Opening Hours`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // H. Location / Address
    if (query.includes('location') || query.includes('where') || query.includes('address') || query.includes('mudinepalle') || query.includes('eluru')) {
      const answer = `Aaryan Bakery is located at ${businessSettings?.address || 'Guraja Center, Mudinepalle'}, ${businessSettings?.district || 'Eluru District'}, ${businessSettings?.state || 'Andhra Pradesh'} - ${businessSettings?.pinCode || '521325'}. Owner: ${businessSettings?.ownerName || 'K. Narendra'}.`;
      console.log(`[Chat API] Deterministic match: Location`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // I. Custom / Customized Cakes
    if (query.includes('custom') || query.includes('customized') || query.includes('photo cake') || query.includes('theme cake') || query.includes('birthday cake') || query.includes('wedding cake')) {
      const answer = `Yes, customized cakes are available for occasions such as birthdays, weddings and engagements. You can submit a custom cake request on our website or WhatsApp owner K. Narendra directly at 9701969499.`;
      console.log(`[Chat API] Deterministic match: Custom Cakes`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // J. Delivery
    if (query.includes('delivery') || query.includes('deliver') || query.includes('home delivery')) {
      const answer = `Local delivery is available in Mudinepalle area. Please contact the bakery at 9701969499 to confirm delivery availability for your specific location.`;
      console.log(`[Chat API] Deterministic match: Delivery`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // K. Contact / Owner / Phone
    if (query.includes('phone') || query.includes('contact') || query.includes('whatsapp') || query.includes('narendra') || query.includes('owner') || query.includes('call') || query.includes('order')) {
      const answer = `You can reach owner K. Narendra at Aaryan Bakery by phone or WhatsApp at 9701969499, or submit an enquiry directly through our website.`;
      console.log(`[Chat API] Deterministic match: Contact`);
      return res.json({ success: true, answer, response: answer, source: 'knowledge_engine' });
    }

    // L. Check published FAQs keyword matches
    for (const faq of publishedFaqs) {
      const qText = faq.question.toLowerCase();
      const keywords = faq.keywords || [];
      const matchesKw = keywords.some(k => query.includes(k.toLowerCase()));
      if (matchesKw || query.includes(qText) || qText.includes(query)) {
        console.log(`[Chat API] Deterministic match: FAQ (${faq.question})`);
        return res.json({
          success: true,
          answer: faq.answer,
          response: faq.answer,
          source: 'knowledge_faq'
        });
      }
    }

    // 8. Strict Fallback for any unknown query
    console.log(`[Chat API] Query not found in verified knowledge context. Returning approved fallback response.`);
    console.log(`[Chat API] API Response Status: 200 (Source: strict_fallback, Duration: ${Date.now() - requestStartTime}ms)`);
    console.log(`==================================================\n`);

    return res.json({
      success: true,
      answer: FALLBACK_RESPONSE,
      response: FALLBACK_RESPONSE,
      source: 'strict_fallback'
    });

  } catch (err) {
    console.error(`[Chat API] Unhandled error:`, err);
    return res.status(500).json({
      success: false,
      answer: FALLBACK_RESPONSE,
      response: FALLBACK_RESPONSE,
      source: 'error_fallback'
    });
  }
});

module.exports = router;
