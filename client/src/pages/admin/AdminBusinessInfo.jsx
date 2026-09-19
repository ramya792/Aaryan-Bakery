import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Building2, Save, RefreshCw, CheckCircle, Clock, Phone, MapPin, Truck } from 'lucide-react';

export default function AdminBusinessInfo() {
  const { getAuthHeaders } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [form, setForm] = useState({
    businessName: 'Aaryan Bakery',
    brandName: 'Sweet Studio — Aaryan Bakery',
    ownerName: 'K. Narendra',
    phone: '9701969499',
    whatsapp: '919701969499',
    email: 'contact@aaryanbakery.com',
    instagram: '@aaryanbakery_official',
    address: 'Guraja Center, Mudinepalle / Mudinapalli Area',
    district: 'Eluru District',
    state: 'Andhra Pradesh',
    pinCode: '521325',
    openingTime: '09:00 AM',
    closingTime: '10:00 PM',
    weeklyHoliday: 'No weekly holiday (Open all 7 days)',
    deliveryAvailable: true,
    deliveryNotice: 'Local delivery is available. Please contact the bakery at 9701969499 to confirm delivery availability for your specific location.'
  });

  const fetchBusinessInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/business');
      const data = await res.json();
      if (data.success && data.data) {
        setForm(data.data);
      }
    } catch (err) {
      console.error("Fetch business info error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/admin/business', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Business information updated successfully! Changes are live on website & chatbot.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error("Update business info error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Business Information Settings</h1>
          <p className="text-xs text-slate-500">Centralized database source of truth for public contact details and AI chatbot.</p>
        </div>
        <button
          onClick={fetchBusinessInfo}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reload
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
        
        {/* Basic Details */}
        <div>
          <h3 className="font-serif font-bold text-slate-900 text-base mb-3 border-b pb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" /> Business & Owner Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Owner Name</label>
              <input
                type="text"
                required
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div>
          <h3 className="font-serif font-bold text-slate-900 text-base mb-3 border-b pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-500" /> Phones & Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Number (Intl Format)</label>
              <input
                type="text"
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div>
          <h3 className="font-serif font-bold text-slate-900 text-base mb-3 border-b pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Opening Hours & Weekly Holiday
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Opening Time</label>
              <input
                type="text"
                value={form.openingTime}
                onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Closing Time</label>
              <input
                type="text"
                value={form.closingTime}
                onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weekly Holiday</label>
              <input
                type="text"
                value={form.weeklyHoliday}
                onChange={(e) => setForm({ ...form, weeklyHoliday: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-serif font-bold text-slate-900 text-base mb-3 border-b pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" /> Location Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Address / Center</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">District / State</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Delivery Notice */}
        <div>
          <h3 className="font-serif font-bold text-slate-900 text-base mb-3 border-b pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-500" /> Local Delivery Policy Notice
          </h3>
          <textarea
            rows="2"
            value={form.deliveryNotice}
            onChange={(e) => setForm({ ...form, deliveryNotice: e.target.value })}
            className="w-full p-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Update Business Settings'}
        </button>

      </form>

    </div>
  );
}
