import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Package, MessageSquare, Images, Plus, Sparkles, AlertCircle, CheckCircle, RefreshCw, ArrowUpRight } from 'lucide-react';

export default function AdminOverview() {
  const { getAuthHeaders } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard', {
        headers: getAuthHeaders()
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
        <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
        <span>Loading Admin Overview...</span>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentOrderEnquiries || [];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Admin Dashboard Overview</h1>
          <p className="text-xs text-slate-500">Welcome back, K. Narendra. Real-time bakery statistics.</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Products</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{stats.totalProducts || 0}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">{stats.publishedProducts || 0} Published</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">New Enquiries</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{stats.newOrderEnquiries || 0}</h3>
            <span className="text-[11px] text-slate-500">{stats.totalEnquiries || 0} Total Received</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Pending Custom Cakes</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{stats.pendingCustomCakeRequests || 0}</h3>
            <span className="text-[11px] text-purple-700 font-semibold">Theme Requests</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Images className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Gallery Photos</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{stats.galleryCount || 0}</h3>
            <span className="text-[11px] text-slate-500">Cloudinary Uploads</span>
          </div>
        </div>

      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
        <h3 className="font-serif text-lg font-bold mb-4">Admin Quick Action Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <RouterLink
            to="/admin/dashboard/products"
            className="p-3 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </RouterLink>

          <RouterLink
            to="/admin/dashboard/gallery"
            className="p-3 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Images className="w-4 h-4" /> Upload Bakery Photo
          </RouterLink>

          <RouterLink
            to="/admin/dashboard/enquiries"
            className="p-3 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4" /> View Order Enquiries
          </RouterLink>

          <RouterLink
            to="/admin/dashboard/business"
            className="p-3 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Edit Business Info
          </RouterLink>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-serif font-bold text-slate-900 text-lg">Recent Order Enquiries</h3>
          <RouterLink
            to="/admin/dashboard/enquiries"
            className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1"
          >
            Manage All Enquiries <ArrowUpRight className="w-4 h-4" />
          </RouterLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                <th className="p-3.5">Enquiry ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Required Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-slate-400">
                    No order enquiries received yet.
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{enq.id}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{enq.customerName}</div>
                      <div className="text-[11px] text-slate-500">{enq.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-900">{enq.productName}</span>
                      <span className="block text-[10px] text-slate-500">{enq.category}</span>
                    </td>
                    <td className="p-3.5">{enq.requiredDate || 'N/A'}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        enq.status === 'New' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        enq.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <a
                        href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 inline-block"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
