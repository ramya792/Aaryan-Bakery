import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { ShoppingBag, Calendar, MapPin, User, Phone, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export default function OrderEnquiry() {
  const { business, products, generateWhatsAppLink, submitOrderEnquiry } = useBusiness();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    category: 'Cakes',
    productName: 'Vanilla / Vennela Normal Cake',
    quantity: '1',
    cakeWeight: '1 kg',
    requiredDate: '',
    deliveryOrPickup: 'Pickup',
    deliveryLocation: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    const res = await submitOrderEnquiry(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setEnquiryId(res.enquiryId || `ENQ-${Date.now().toString().slice(-6)}`);
    } else {
      setError(res.message || 'Failed to submit enquiry. Please call 9701969499 directly.');
    }
  };

  const openWhatsAppDirect = () => {
    const url = generateWhatsAppLink({
      customerName: formData.customerName,
      productName: formData.productName,
      category: formData.category,
      cakeWeight: formData.category === 'Cakes' ? formData.cakeWeight : formData.quantity,
      requiredDate: formData.requiredDate,
      deliveryLocation: formData.deliveryOrPickup === 'Delivery' ? formData.deliveryLocation : 'Store Pickup',
      message: formData.message
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest">Order Placement</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          General Order Enquiry Form
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Submit an order enquiry for cakes, pizzas, puffs, or Arun ice creams. Owner K. Narendra will confirm your order.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-bakery-border shadow-xl overflow-hidden max-w-2xl mx-auto">
        <div className="bg-bakery-espresso text-bakery-cream p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-bakery-gold" /> Order Enquiry Details
          </h3>
          <p className="text-xs text-bakery-cream/75 mt-1">
            Fill in your preferred bakery items and pickup/delivery date.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-bakery-espresso">
                Enquiry Submitted!
              </h3>
              <p className="text-sm font-mono text-bakery-terracotta font-bold bg-bakery-cream px-4 py-1.5 rounded-full inline-block">
                Enquiry ID: {enquiryId}
              </p>
              
              <div className="bg-bakery-ivory p-4 rounded-2xl border border-bakery-border text-sm text-bakery-espresso max-w-md mx-auto leading-relaxed">
                <p className="font-semibold text-bakery-terracotta mb-1">Confirmation Status:</p>
                <p>Your enquiry has been submitted. The bakery will contact you for confirmation.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={openWhatsAppDirect}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Bakery Directly ({business.phone})
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-bakery-cream hover:bg-bakery-border text-bakery-espresso rounded-xl font-semibold text-sm"
                >
                  New Order Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="text"
                      name="customerName"
                      required
                      placeholder="Full Name"
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
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Product Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Product Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Puffs">Puffs</option>
                    <option value="Ice Creams">Ice Creams</option>
                    <option value="General">General / Multiple Items</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Product / Item Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="E.g., Butterscotch Cool Cake, Chicken Pizza, etc."
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                  />
                </div>
              </div>

              {/* Quantity / Weight & Required Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.category === 'Cakes' ? (
                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Cake Weight
                    </label>
                    <select
                      name="cakeWeight"
                      value={formData.cakeWeight}
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
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Quantity (Pieces)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="date"
                      name="requiredDate"
                      value={formData.requiredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Fulfilment Toggle */}
              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Fulfilment Option
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
                    Store Pickup (Mudinepalle)
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
                      placeholder="Village / Street in Mudinepalle area"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Additional Instructions
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Eggless preference, special toppings, writing on cake, etc."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-bakery-ivory border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-bakery-softBrown bg-bakery-cream p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The customer will not be told an order is confirmed until the bakery confirms it.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-bakery-terracotta hover:bg-bakery-cherry text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Order Enquiry'}
                </button>
                <button
                  type="button"
                  onClick={openWhatsAppDirect}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Send on WhatsApp
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}
