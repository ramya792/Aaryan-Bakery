import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Phone, MessageSquare, MapPin, Clock, Truck, Mail, Send, User, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { business, generateWhatsAppLink } = useBusiness();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const url = generateWhatsAppLink({
      customerName: formData.name || 'Customer',
      productName: formData.subject,
      message: formData.message || 'Hello, I have a question about Aaryan Bakery.'
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest">Get In Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          Contact Aaryan Bakery
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          We are here to help you with cake orders, pizza & puff enquiries, delivery questions, and custom theme requests.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-bakery-border shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-bakery-espresso border-b border-bakery-border pb-3">
              Official Contact Details
            </h3>

            <div className="space-y-4 text-sm text-bakery-espresso">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bakery-cream text-bakery-terracotta flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-bakery-softBrown">Bakery Owner</p>
                  <p className="font-semibold">{business.ownerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bakery-cream text-bakery-terracotta flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-bakery-softBrown">Phone & WhatsApp</p>
                  <a href={`tel:${business.phone}`} className="font-semibold text-bakery-terracotta hover:underline">
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bakery-cream text-bakery-terracotta flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-bakery-softBrown">Opening Hours</p>
                  <p className="font-semibold">{business.openingTime} – {business.closingTime}</p>
                  <p className="text-xs text-bakery-softBrown">{business.weeklyHoliday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bakery-cream text-bakery-terracotta flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-bakery-softBrown">Bakery Location</p>
                  <p className="font-semibold">{business.address}</p>
                  <p className="text-xs text-bakery-softBrown">{business.district}, {business.state} - {business.pinCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bakery-cream text-bakery-terracotta flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-bakery-softBrown">Delivery Info</p>
                  <p className="text-xs text-bakery-espresso font-medium">{business.deliveryNotice}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-bakery-border">
              <a
                href={`tel:${business.phone}`}
                className="py-3 bg-bakery-terracotta hover:bg-bakery-cherry text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call Bakery
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </button>
            </div>

          </div>

          {/* Map Card Placeholder / Frame */}
          <div className="bg-white p-6 rounded-3xl border border-bakery-border shadow-sm space-y-3">
            <h4 className="font-serif font-bold text-bakery-espresso text-base flex items-center gap-2">
              <MapPin className="w-5 h-5 text-bakery-terracotta" /> Location Area
            </h4>
            <p className="text-xs text-bakery-softBrown">
              Guraja Center, Mudinepalle / Mudinapalli Area, Eluru District, Andhra Pradesh - 521325.
            </p>
            <div className="aspect-[16/9] rounded-2xl bg-bakery-cream overflow-hidden border border-bakery-border flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                alt="Mudinepalle Location Map"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-md text-center">
                <p className="font-serif font-bold text-xs text-bakery-espresso">Aaryan Bakery</p>
                <p className="text-[10px] text-bakery-terracotta font-semibold">Guraja Center, Mudinepalle</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-bakery-border shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-bakery-espresso mb-2">
            Send Us a Message
          </h3>
          <p className="text-xs text-bakery-softBrown mb-6">
            Have a question or custom cake enquiry? Send us a direct message below.
          </p>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-bakery-espresso">Message Received!</h4>
              <p className="text-sm text-bakery-softBrown max-w-sm mx-auto">
                Thank you for contacting Aaryan Bakery. Owner K. Narendra will reach out to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-bakery-espresso text-bakery-cream text-xs font-semibold rounded-xl hover:bg-bakery-terracotta"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                >
                  <option value="General Question">General Question</option>
                  <option value="Cake Order Enquiry">Cake Order Enquiry</option>
                  <option value="Custom Cake Design">Custom Cake Design</option>
                  <option value="Pizza or Puff Bulk Order">Pizza or Puff Bulk Order</option>
                  <option value="Arun Ice Cream Enquiry">Arun Ice Cream Enquiry</option>
                  <option value="Local Delivery Enquiry">Local Delivery Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Message Details *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can Aaryan Bakery help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-bakery-terracotta hover:bg-bakery-cherry text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Form Message
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
