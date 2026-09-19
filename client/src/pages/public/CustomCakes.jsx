import React, { useState } from 'react';
import { Cake, Sparkles, Calendar, Clock, MapPin, Phone, User, MessageSquare, CheckCircle, Upload, ShieldCheck } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function CustomCakes() {
  const { business, generateWhatsAppLink, submitCustomCakeRequest } = useBusiness();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    occasion: 'Birthday',
    flavour: 'Vanilla / Vennela',
    weight: '1 kg',
    requiredDate: '',
    requiredTime: '',
    designDescription: '',
    referenceImageUrl: '',
    deliveryOrPickup: 'Pickup',
    deliveryLocation: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [error, setError] = useState('');

  const cakeCategories = [
    { title: 'Birthday Cakes', desc: 'Custom theme cakes for children and adults.', img: '/images/cakes/cake-1.jpg' },
    { title: 'Wedding Cakes', desc: 'Multi-tiered elegant cakes for grand weddings.', img: '/images/cakes/cake-6.jpg' },
    { title: 'Engagement Cakes', desc: 'Beautiful ring & floral design cakes.', img: '/images/cakes/cake-4.jpg' },
    { title: 'Anniversary Cakes', desc: 'Romantic celebration cakes for milestone years.', img: '/images/cakes/cake-2.jpg' },
    { title: 'Kids Theme Cakes', desc: 'Superhero, car, and toy theme cakes.', img: '/images/cakes/blue-car-birthday-cake.jpg' },
    { title: 'Cartoon Theme Cakes', desc: 'Chhota Bheem, Doraemon, Peppa Pig, Minnie Mouse.', img: '/images/cakes/minnie-mouse-cake.jpg' },
    { title: 'Photo Cakes', desc: 'Edible high-resolution photo print cakes.', img: '/images/cakes/butterfly-fashion-cake.jpg' },
    { title: 'Custom Shape Cakes', desc: 'Cocomelon, numbers, cars, and customized shapes.', img: '/images/cakes/cocomelon-theme-cake.jpg' },
    { title: 'Fresh Fruit Cakes', desc: 'Loaded with dragon fruit, grapes, cherries & kiwi.', img: '/images/cakes/fresh-fruit-cake.jpg' },
    { title: 'Rich Chocolate Cool', desc: 'Layered Belgian truffle & rich chocolate ganache.', img: '/images/cakes/chocolate-cool.jpg' },
    { title: 'Butterscotch Crunch', desc: 'Caramelized crunch praline with rich whipped cream.', img: '/images/cakes/butterscotch-cool.jpg' },
    { title: 'Classic Vennela Cake', desc: 'Light, fluffy pure vanilla sponge with delicate cream.', img: '/images/cakes/vanilla-cool.jpg' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.requiredDate) {
      setError('Please select the required date for the custom cake.');
      return;
    }

    setLoading(true);
    const res = await submitCustomCakeRequest(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setRequestId(res.requestId || `CC-${Date.now().toString().slice(-6)}`);
    } else {
      setError(res.message || 'Failed to submit enquiry. Please contact 9701969499.');
    }
  };

  const openWhatsAppDirect = () => {
    const text = `Hello Aaryan Bakery! I want to request a Custom Cake:

👤 *Customer Name:* ${formData.customerName || 'Customer'}
📱 *Phone:* ${formData.phone}
🎉 *Occasion:* ${formData.occasion}
🎂 *Flavour:* ${formData.flavour}
⚖️ *Weight:* ${formData.weight}
📅 *Required Date:* ${formData.requiredDate} ${formData.requiredTime ? `at ${formData.requiredTime}` : ''}
🎨 *Theme / Design Description:* ${formData.designDescription || 'Custom Theme'}
📍 *Delivery / Pickup:* ${formData.deliveryOrPickup === 'Delivery' ? `Delivery to: ${formData.deliveryLocation}` : 'Store Pickup (Mudinepalle)'}
💬 *Message:* ${formData.message || 'None'}

Please review and share price quote.`;

    const cleanNumber = (business.whatsapp || '919701969499').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> Customized Bakery Studio
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          Custom Theme & Celebration Cakes
        </h1>
        <p className="text-sm sm:text-base text-bakery-softBrown leading-relaxed">
          Request a customized cake for birthdays, weddings, engagements, anniversaries, cartoon themes, and photo cakes. Owned & prepared by <span className="font-semibold text-bakery-espresso">K. Narendra</span>.
        </p>
      </div>

      {/* Cake Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {cakeCategories.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                occasion: item.title.includes('Wedding') ? 'Wedding' :
                          item.title.includes('Engagement') ? 'Engagement' :
                          item.title.includes('Anniversary') ? 'Anniversary' :
                          item.title.includes('Kids') ? 'Kids Theme' :
                          item.title.includes('Cartoon') ? 'Cartoon Theme' :
                          item.title.includes('Photo') ? 'Photo Cake' : 'Birthday',
                designDescription: `I am interested in ${item.title} design (${item.desc})`
              }));
              const formEl = document.getElementById('custom-cake-form-card');
              if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl overflow-hidden border border-bakery-border shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/cakes/cake-1.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                <span className="text-[11px] font-bold text-white bg-bakery-terracotta/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  Click to Choose Design
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-black text-bakery-espresso text-xs sm:text-sm group-hover:text-bakery-terracotta transition-colors">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-bakery-softBrown line-clamp-2 mt-0.5">{item.desc}</p>
              </div>
              <span className="text-[10px] font-black text-bakery-terracotta mt-2 inline-flex items-center justify-center gap-1">
                Customize This <Sparkles className="w-3 h-3 text-bakery-gold" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Form Section */}
      <div id="custom-cake-form-card" className="bg-white rounded-3xl border border-bakery-border shadow-xl overflow-hidden max-w-3xl mx-auto">
        <div className="bg-bakery-espresso text-bakery-cream p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Cake className="w-6 h-6 text-bakery-gold" /> Custom Cake Request Form
          </h3>
          <p className="text-xs text-bakery-cream/75 mt-1">
            Fill in your cake requirements below. The bakery will review your request and contact you to confirm pricing.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-bakery-espresso">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-sm font-mono text-bakery-terracotta font-bold bg-bakery-cream px-4 py-1.5 rounded-full inline-block">
                Enquiry ID: {requestId}
              </p>
              <div className="bg-bakery-ivory p-4 rounded-2xl border border-bakery-border text-sm text-bakery-espresso max-w-md mx-auto leading-relaxed">
                <p className="font-semibold text-bakery-terracotta mb-1">Notice:</p>
                <p>Your enquiry has been submitted. The bakery will contact you for confirmation.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={openWhatsAppDirect}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Send Request via WhatsApp ({business.phone})
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-bakery-cream hover:bg-bakery-border text-bakery-espresso rounded-xl font-semibold text-sm"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* Personal Details */}
              <div>
                <h4 className="font-serif font-bold text-bakery-espresso text-base mb-3 border-b border-bakery-border pb-2">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Customer Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                      <input
                        type="text"
                        name="customerName"
                        required
                        placeholder="Your Full Name"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="10-digit Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cake Specifications */}
              <div>
                <h4 className="font-serif font-bold text-bakery-espresso text-base mb-3 border-b border-bakery-border pb-2">
                  2. Cake Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Occasion *
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    >
                      <option value="Birthday">Birthday</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Kids Theme">Kids Theme</option>
                      <option value="Cartoon Theme">Cartoon Theme</option>
                      <option value="Photo Cake">Photo Cake</option>
                      <option value="Other">Other Occasion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Cake Flavour
                    </label>
                    <select
                      name="flavour"
                      value={formData.flavour}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    >
                      <option value="Vanilla / Vennela">Vanilla / Vennela</option>
                      <option value="Butterscotch">Butterscotch</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Eggless Normal">Eggless Normal (100% Veg)</option>
                      <option value="Eggless Cool">Eggless Cool (100% Veg)</option>
                      <option value="Custom Flavour">Custom Flavour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Required Weight *
                    </label>
                    <select
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    >
                      <option value="1 kg">1 kg</option>
                      <option value="1.5 kg">1.5 kg</option>
                      <option value="2 kg">2 kg</option>
                      <option value="3 kg">3 kg</option>
                      <option value="5 kg+">5 kg or larger</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Required Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Required Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="date"
                      name="requiredDate"
                      required
                      value={formData.requiredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Preferred Delivery/Pickup Time (Optional)
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="time"
                      name="requiredTime"
                      value={formData.requiredTime}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Theme description */}
              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Theme or Design Description
                </label>
                <textarea
                  name="designDescription"
                  rows="3"
                  placeholder="Describe your design, colors, name text on cake (e.g. 'Blue frozen theme with Happy Birthday Aaryan')..."
                  value={formData.designDescription}
                  onChange={handleChange}
                  className="w-full p-3 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                ></textarea>
              </div>

              {/* Reference Image Link */}
              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Reference Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="referenceImageUrl"
                  placeholder="Paste Google Drive, Pinterest, or image link..."
                  value={formData.referenceImageUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                />
              </div>

              {/* Fulfilment Toggle */}
              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Delivery or Store Pickup
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryOrPickup: 'Pickup' })}
                    className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                      formData.deliveryOrPickup === 'Pickup'
                        ? 'bg-bakery-espresso text-bakery-cream border-bakery-espresso'
                        : 'bg-bakery-ivory text-bakery-espresso border-bakery-border'
                    }`}
                  >
                    Store Pickup (Guraja Center, Mudinepalle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryOrPickup: 'Delivery' })}
                    className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                      formData.deliveryOrPickup === 'Delivery'
                        ? 'bg-bakery-espresso text-bakery-cream border-bakery-espresso'
                        : 'bg-bakery-ivory text-bakery-espresso border-bakery-border'
                    }`}
                  >
                    Local Delivery
                  </button>
                </div>
              </div>

              {formData.deliveryOrPickup === 'Delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Delivery Address / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="text"
                      name="deliveryLocation"
                      placeholder="Village / Street / House address in Mudinepalle area"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-bakery-softBrown bg-bakery-cream p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Note: Submission does not automatically confirm order. The bakery will call or WhatsApp you for price and date confirmation.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-bakery-terracotta hover:bg-bakery-cherry text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Enquiry...' : 'Submit Custom Cake Enquiry'}
                </button>
                <button
                  type="button"
                  onClick={openWhatsAppDirect}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Send Request on WhatsApp
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}
