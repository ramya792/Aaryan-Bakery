import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle, Calendar, MapPin, User, Phone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function EnquiryModal({ product, onClose }) {
  const { business, generateWhatsAppLink, submitOrderEnquiry } = useBusiness();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    quantity: '1',
    cakeWeight: product?.unit?.includes('kg') ? '1 kg' : '',
    requiredDate: '',
    deliveryOrPickup: 'Pickup',
    deliveryLocation: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');
  const [error, setError] = useState('');

  if (!product) return null;

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
    const payload = {
      ...formData,
      productId: product.id,
      productName: product.name,
      category: product.categoryName
    };

    const res = await submitOrderEnquiry(payload);
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
      productName: product.name,
      category: product.categoryName,
      cakeWeight: formData.cakeWeight || formData.quantity,
      requiredDate: formData.requiredDate,
      deliveryLocation: formData.deliveryOrPickup === 'Delivery' ? formData.deliveryLocation : 'Store Pickup',
      message: formData.message
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-bakery-ivory rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-bakery-border relative">
        
        {/* Header */}
        <div className="bg-bakery-espresso text-bakery-cream p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bakery-terracotta flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Order Enquiry</h3>
              <p className="text-xs text-bakery-cream/75">Aaryan Bakery • Owner: K. Narendra</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-bakery-cream/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-bakery-espresso mb-2">
                Enquiry Submitted!
              </h4>
              <p className="text-sm font-mono text-bakery-terracotta font-semibold bg-bakery-cream py-1 px-3 rounded-full inline-block mb-3">
                ID: {enquiryId}
              </p>
              <p className="text-sm text-bakery-softBrown mb-6 leading-relaxed">
                Your enquiry for <span className="font-semibold text-bakery-espresso">{product.name}</span> has been received. The bakery will contact you shortly to confirm details.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={openWhatsAppDirect}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Continue on WhatsApp ({business.phone})
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-bakery-cream hover:bg-bakery-border text-bakery-espresso rounded-xl text-sm font-semibold transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Card Summary */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-bakery-border">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-bakery-espresso text-base">{product.name}</h4>
                  <p className="text-xs text-bakery-terracotta font-semibold">
                    {product.price > 0 ? `${product.currency}${product.price} ${product.unit}` : product.unit}
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Weight or Quantity & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.unit.includes('kg') ? (
                  <div>
                    <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                      Cake Weight
                    </label>
                    <select
                      name="cakeWeight"
                      value={formData.cakeWeight}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
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
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Required Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="date"
                      name="requiredDate"
                      value={formData.requiredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup / Delivery toggle */}
              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Fulfilment Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryOrPickup: 'Pickup' })}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      formData.deliveryOrPickup === 'Pickup'
                        ? 'bg-bakery-espresso text-bakery-cream border-bakery-espresso'
                        : 'bg-white text-bakery-espresso border-bakery-border'
                    }`}
                  >
                    Store Pickup (Mudinepalle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryOrPickup: 'Delivery' })}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      formData.deliveryOrPickup === 'Delivery'
                        ? 'bg-bakery-espresso text-bakery-cream border-bakery-espresso'
                        : 'bg-white text-bakery-espresso border-bakery-border'
                    }`}
                  >
                    Local Delivery
                  </button>
                </div>
              </div>

              {formData.deliveryOrPickup === 'Delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                    Delivery Location / Area
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
                    <input
                      type="text"
                      name="deliveryLocation"
                      placeholder="Village / Street / Landmark in Mudinepalle area"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-bakery-espresso mb-1">
                  Customization or Instructions
                </label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="E.g., Write 'Happy Birthday Aaryan' on cake, eggless requirement, etc."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-bakery-border rounded-xl text-sm text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                ></textarea>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-bakery-softBrown">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your order is not charged online. The bakery will confirm price & availability.</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-bakery-terracotta hover:bg-bakery-cherry text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
                <button
                  type="button"
                  onClick={openWhatsAppDirect}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
