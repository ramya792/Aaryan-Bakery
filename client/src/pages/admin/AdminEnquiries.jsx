import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { MessageSquare, Phone, RefreshCw, CheckCircle, Clock, Trash2, Edit3, Filter } from 'lucide-react';

export default function AdminEnquiries() {
  const { getAuthHeaders } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('orderEnquiries');
  const [orderEnquiries, setOrderEnquiries] = useState([]);
  const [customCakeRequests, setCustomCakeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  // Editing status state
  const [editingItem, setEditingItem] = useState(null);
  const [newStatus, setNewStatus] = useState('New');
  const [adminNotes, setAdminNotes] = useState('');

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/enquiries', {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrderEnquiries(data.data.orderEnquiries || []);
        setCustomCakeRequests(data.data.customCakeRequests || []);
      }
    } catch (err) {
      console.error("Fetch enquiries error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${editingItem.id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        setEditingItem(null);
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const currentList = activeTab === 'orderEnquiries' ? orderEnquiries : customCakeRequests;

  const filteredList = currentList.filter(item => {
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Order & Custom Cake Enquiries</h1>
          <p className="text-xs text-slate-500">Manage incoming customer requests, update status, and add private admin notes.</p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Tabs and Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('orderEnquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orderEnquiries' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            General Order Enquiries ({orderEnquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('customCakeRequests')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'customCakeRequests' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Custom Theme Cake Requests ({customCakeRequests.length})
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                <th className="p-3.5">ID & Customer</th>
                <th className="p-3.5">Item / Occasion</th>
                <th className="p-3.5">Date & Fulfilment</th>
                <th className="p-3.5">Customer Message</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Loading enquiries...</td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">No enquiries found.</td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-slate-900">{item.id}</div>
                      <div className="font-semibold text-slate-900">{item.customerName}</div>
                      <div className="text-[11px] text-slate-500">{item.phone}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">
                        {item.productName || item.occasion || 'Custom Order'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.cakeWeight ? `Weight: ${item.cakeWeight}` : item.quantity ? `Qty: ${item.quantity}` : ''}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{item.requiredDate || 'Asap'}</div>
                      <div className="text-[10px] text-slate-500">
                        {item.deliveryOrPickup === 'Delivery' ? `Delivery to: ${item.deliveryLocation || 'Mudinepalle'}` : 'Store Pickup'}
                      </div>
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <p className="text-slate-700 line-clamp-2">{item.message || item.designDescription || 'No special instructions.'}</p>
                      {item.adminNotes && (
                        <p className="text-[10px] text-amber-700 font-semibold bg-amber-50 p-1 rounded mt-1">
                          Note: {item.adminNotes}
                        </p>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'New' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        item.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'Completed' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status || 'New'}
                      </span>
                    </td>

                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setNewStatus(item.status || 'New');
                          setAdminNotes(item.adminNotes || '');
                        }}
                        className="px-2.5 py-1 bg-slate-900 text-white rounded text-[11px] font-semibold hover:bg-amber-500 hover:text-slate-950 transition-colors"
                      >
                        Update Status
                      </button>
                      <a
                        href={`https://wa.me/91${item.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 inline-block"
                      >
                        WhatsApp
                      </a>
                      <button
                        onClick={() => handleDeleteEnquiry(item.id)}
                        className="p-1 text-rose-500 hover:text-rose-700"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Update Enquiry Status ({editingItem.id})
            </h3>
            
            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Internal Admin Notes (Private)
                </label>
                <textarea
                  rows="3"
                  placeholder="Private note for bakery owner (e.g. 'Advance received ₹200 on PhonePe')..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
                ></textarea>
                <span className="text-[10px] text-slate-400">Notes are private and never visible to customers or chatbot.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Save Status Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
