# Sweet Studio — Aaryan Bakery Food Ordering, Order Enquiry & AI Chatbot Platform

> **Developed for the X-Factor LevelX Phase 2 Hackathon**  
> **Business Name:** Aaryan Bakery (Sweet Studio)  
> **Owner:** K. Narendra  
> **Category:** Bakery, Cakes, Pizza, Puffs and Ice Creams  
> **Location:** Guraja Center, Mudinepalle / Mudinapalli Area, Eluru District, Andhra Pradesh - 521325  
> **Contact / WhatsApp:** 9701969499 (Intl format: `919701969499`)  
> **Opening Hours:** 09:00 AM – 10:00 PM (No weekly holiday)

---

## 📋 Executive Overview

**Sweet Studio — Aaryan Bakery** is a production-style, full-stack digital order enquiry, custom cake estimation, photo gallery, and AI Chatbot platform built specifically for local bakery business owner **K. Narendra**. 

Unlike basic landing page templates or static sites, this mini-product bridges customer ordering convenience with full administrative business management. Customers can browse real, verified product prices, explore customized cake options, submit structured order enquiries, connect directly via automated WhatsApp links, and interact with **Aaryan Assistant** — a grounded AI chatbot that answers strictly from verified database knowledge.

---

## 🚀 Key Features

### 🌐 Customer Public Website (13 Dedicated Pages)
1. **Home (`/`)**: Hero banner (*"Sweet Moments, Beautifully Baked."*), category showcase, database-driven popular products, custom cake promotion (*"Turn Your Ideas Into Cake"*), verified business highlights, gallery preview, and contact CTA.
2. **Menu (`/menu`)**: Live database menu with search bar, category tabs (Cakes, Pizzas, Puffs, Ice Creams), 100% Eggless filter toggle, and product enquiry modal.
3. **Cakes (`/cakes`)**: Filtered normal, cool, and eggless cakes.
4. **Pizzas (`/pizzas`)**: Oven-baked Chicken Pizza (₹150), Veg Pizza (₹120), Sweet Corn Pizza (₹130).
5. **Puffs (`/puffs`)**: Hot crispy Chicken Puff (₹30), Egg Puff (₹20), Curry Puff (₹15).
6. **Ice Creams (`/ice-creams`)**: Arun Ice Creams variety showcase with price notice: *"Contact bakery for current price"*.
7. **Custom Cakes (`/custom-cakes`)**: Dedicated page for Birthdays, Weddings, Engagements, Anniversaries, Kids Themes, Cartoon Themes, and Photo Cakes with an interactive enquiry form.
8. **Gallery (`/gallery`)**: Filterable photo gallery of bakery creations.
9. **About Us (`/about`)**: Bakery background, Owner K. Narendra's quality commitment, and Mudinepalle location context.
10. **Contact (`/contact`)**: Verified contact info, direct call button, WhatsApp button, opening hours card (9 AM - 10 PM), and contact form.
11. **Order Enquiry (`/order-enquiry`)**: General item enquiry form with unique auto-generated ID (`ENQ-xxxxxx`), Firestore/DB persistence, and WhatsApp auto-fill link.
12. **Privacy Policy (`/privacy-policy`)**: Customer data protection guidelines.
13. **Terms & Conditions (`/terms-and-conditions`)**: Order enquiry and service terms.

### 🤖 Grounded AI Chatbot ("Aaryan Assistant")
- Floating interactive chatbot available across public customer pages.
- Connected via backend REST endpoint `POST /api/chat`.
- **Strict Grounding Rule**: Operates using Retrieval-Augmented Generation (RAG) over verified Firestore/DB FAQs and product records.
- **Unverified Query Refusal**: If asked about unverified details (sugar-free cakes, midnight delivery, discount codes, specific recipes, allergy guarantees, payment apps), it strictly responds:
  > *"Sorry, I don't know that information yet. Please contact Aaryan Bakery directly at 9701969499."*

### 🔐 Private Admin Portal (`/admin/login` & `/admin/dashboard`)
- Completely unlinked from public customer navigation.
- Protected via backend JWT token authentication.
- **Dashboard Overview**: Key metrics (Total Products, Published Count, Enquiries, Pending Custom Cakes, Gallery Count), quick action shortcuts, and recent order enquiries table.
- **Product Management (CRUD)**: Create, Read, Update, Soft Delete products, modify prices, toggle eggless status, stock availability, and upload photos to Cloudinary.
- **Order Enquiry Manager**: Manage customer enquiries, update order status (*New, Contacted, Confirmed, Preparing, Completed, Cancelled*), and save private internal admin notes.
- **Gallery Manager**: Cloudinary image uploads, metadata management, and category tagging.
- **Business Information Manager**: Update central business phone, hours, location, delivery notice, and owner details.
- **Chatbot Knowledge Base Manager**: Add, edit, publish/unpublish, and delete FAQ question-answer pairs for the AI chatbot.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js (v18), Vite (v6), Tailwind CSS (v3), Lucide React Icons, React Router DOM (v6) |
| **Backend** | Node.js, Express.js REST API, JSONWebToken (JWT), Multer, CORS, dotenv |
| **Database** | Firebase Firestore / Firebase Admin SDK (with JSON persistence fallback) |
| **Media Storage** | Cloudinary SDK (for product & gallery images) |
| **AI Engine** | OpenAI API (`gpt-3.5-turbo`) + Custom RAG Grounding Guard |

---

## 📊 Database Schema (Firestore Collections)

```
├── businessSettings (doc: main)
│   ├── businessName, ownerName, phone, whatsapp, address, district, state, pinCode
│   ├── openingTime, closingTime, weeklyHoliday, deliveryAvailable, deliveryNotice
├── categories (collection)
│   ├── id, name, slug, description, imageUrl, published, displayOrder
├── products (collection)
│   ├── id, name, categoryId, categoryName, description, price, currency, unit
│   ├── imageUrl, cloudinaryPublicId, isEggless, isCustomizable, isAvailable, isPublished
├── gallery (collection)
│   ├── id, title, description, category, imageUrl, cloudinaryPublicId, isPublished
├── orderEnquiries (collection)
│   ├── id (ENQ-xxxxxx), customerName, phone, email, productName, category, quantity
│   ├── cakeWeight, requiredDate, deliveryOrPickup, deliveryLocation, message, status, adminNotes
├── customCakeRequests (collection)
│   ├── id (CC-xxxxxx), customerName, phone, occasion, flavour, weight, requiredDate
│   ├── designDescription, referenceImageUrl, status, adminNotes
└── chatbotKnowledge (collection)
    ├── id, question, answer, category, keywords, isPublished
```

---

## 💻 Local Setup & Running Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Installation
Clone or navigate to the project directory and install root, server, and client dependencies:

```bash
# Install root concurrency tools
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env` in the root folder or set backend environment variables in `server/.env`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_jwt_key_aaryan_bakery_2026
ADMIN_EMAIL=admin@aaryanbakery.com
ADMIN_PASSWORD=aaryan@2026

# Optional Integrations
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Start Application
To run both backend API server and frontend Vite development server concurrently:

```bash
npm run dev
```

- **Public Website:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api`
- **Private Admin Login:** `http://localhost:3000/admin/login`

---

## 🔑 Admin Portal Credentials (Prototype)

- **Admin Login Route:** `/admin/login`
- **Default Email:** `admin@aaryanbakery.com`
- **Default Password:** `aaryan@2026`

---

## 🧪 Testing Scenarios

### AI Chatbot Grounding Verification

#### 1. Verified Queries (High Confidence Grounded Response)
- *"What are your opening hours?"* → Returns: *"Aaryan Bakery is open every day from 09:00 AM to 10:00 PM with no weekly holiday."*
- *"Do you have eggless cakes?"* → Returns verified eggless pricing (Normal ₹350/kg, Cool ₹550/kg).
- *"What are the pizza prices?"* → Returns Chicken Pizza (₹150), Veg Pizza (₹120), Sweet Corn Pizza (₹130).

#### 2. Unverified Queries (Mandatory Fallback)
- *"Do you offer sugar-free cakes for diabetics?"*
- *"What is today's discount code?"*
- *"Do you provide midnight delivery?"*
- **Bot Response:**
  > *"Sorry, I don't know that information yet. Please contact Aaryan Bakery directly at 9701969499."*

---

## 🚢 Deployment Configuration

### Frontend (Vercel)
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Backend (Render / Railway)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Environment Variables:** Set `PORT`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `OPENAI_API_KEY`, `CLOUDINARY_*`.

---

## 📜 Research Source Documentation
All business details (Owner K. Narendra, address at Mudinepalle, phone 9701969499, cake prices ₹270–₹550/kg, pizza prices ₹120–₹150, puff prices ₹15–₹30, Arun Ice Creams) were verified directly from official business input provided for the X-Factor LevelX Phase 2 hackathon.
