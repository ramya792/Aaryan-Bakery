import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { HelpCircle, Plus, Edit, Trash2, RefreshCw, X, ShieldAlert } from 'lucide-react';

export default function AdminChatbotKnowledge() {
  const { getAuthHeaders } = useAdminAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    question: '',
    answer: '',
    category: 'Cakes',
    keywords: '',
    isPublished: true
  };

  const [form, setForm] = useState(initialForm);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/chatbot-knowledge', {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setFaqs(data.data || []);
      }
    } catch (err) {
      console.error("Fetch faqs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      keywords: Array.isArray(faq.keywords) ? faq.keywords.join(', ') : faq.keywords || '',
      isPublished: faq.isPublished !== false
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    try {
      const url = editingId ? `/api/admin/chatbot-knowledge/${editingId}` : '/api/admin/chatbot-knowledge';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchFaqs();
      }
    } catch (err) {
      console.error("Save FAQ error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ from AI Chatbot Knowledge Base?")) return;
    try {
      const res = await fetch(`/api/admin/chatbot-knowledge/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) fetchFaqs();
    } catch (err) {
      console.error("Delete FAQ error:", err);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">AI Chatbot Knowledge Base</h1>
          <p className="text-xs text-slate-500">Manage verified FAQs. "Aaryan Assistant" chatbot strictly answers using these entries only.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add FAQ Entry
        </button>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Chatbot Strict Grounding Rule:</p>
          <p className="text-[11px] text-amber-800">
            If a customer asks a question not covered by the published entries in this table or database products, the chatbot will strictly say: <span className="font-semibold italic">"Sorry, I don't know that information yet. Please contact Aaryan Bakery directly at 9701969499."</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Question</th>
                <th className="p-3.5">Verified Answer</th>
                <th className="p-3.5">Keywords</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">Loading knowledge base...</td>
                </tr>
              ) : faqs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">No FAQ entries found.</td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-semibold text-slate-900">{faq.category}</td>
                    <td className="p-3.5 font-bold text-slate-900">{faq.question}</td>
                    <td className="p-3.5 max-w-sm text-slate-700">{faq.answer}</td>
                    <td className="p-3.5 text-[10px] text-slate-500 font-mono">
                      {Array.isArray(faq.keywords) ? faq.keywords.join(', ') : faq.keywords}
                    </td>
                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(faq)}
                        className="p-1.5 bg-slate-100 hover:bg-amber-500 text-slate-700 hover:text-slate-950 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg"
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingId ? 'Edit FAQ Entry' : 'Add FAQ to Knowledge Base'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="E.g., Cakes, Timing, Location, Delivery"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Question *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., What are the cake prices?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verified Answer *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Provide the exact verified answer for the chatbot..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Keywords (Comma separated)</label>
                <input
                  type="text"
                  placeholder="cake, price, vanilla, cost, per kg"
                  value={form.keywords}
                  onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Save FAQ Entry
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
