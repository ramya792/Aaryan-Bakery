import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Images, Plus, Trash2, Upload, RefreshCw, X, Eye, EyeOff } from 'lucide-react';

export default function AdminGallery() {
  const { getAuthHeaders } = useAdminAuth();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    isPublished: true
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        setGallery(data.data);
      }
    } catch (err) {
      console.error("Fetch gallery error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Authorization': getAuthHeaders().Authorization },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setForm(prev => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchGallery();
      }
    } catch (err) {
      console.error("Add gallery error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete photo from gallery?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) fetchGallery();
    } catch (err) {
      console.error("Delete photo error:", err);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Photo Gallery Management</h1>
          <p className="text-xs text-slate-500">Upload and manage real bakery photos using Cloudinary storage.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Upload New Photo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">Loading gallery...</div>
        ) : gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {item.category}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.description}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-colors"
                title="Delete photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">Upload Photo to Gallery</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Custom Wedding Cake"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option value="Cakes">Cakes</option>
                  <option value="Pizzas">Pizzas</option>
                  <option value="Puffs">Puffs</option>
                  <option value="Ice Creams">Ice Creams</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Upload File (Cloudinary)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                />
                {uploading && <p className="text-[10px] text-amber-600 font-semibold mt-1">Uploading to Cloudinary...</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Save Photo to Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
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
