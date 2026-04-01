'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Loader2, 
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/categories?includeInactive=true`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category?')) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-primary tracking-widest mb-2">
            <span className="w-8 h-px bg-primary"></span>
            <span>Menu Architecture</span>
          </div>
          <h1 className="text-3xl font-black">Categories</h1>
          <p className="text-gray-500 mt-1">Organize your menu items by category</p>
        </div>
        
        <Link href="/admin/add-category">
          <button className="flex items-center gap-3 bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-secondary/20 active:scale-95 transition-all">
            <Plus size={20} />
            <span>New Category</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121212] rounded-3xl border border-white/5 p-6 group hover:border-secondary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                  {cat.image?.url ? (
                    <img src={cat.image.url} className="w-full h-full object-cover" alt={cat.name} />
                  ) : (
                    <LayoutGrid className="text-gray-500" size={24} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/edit-category/${cat._id}`}>
                    <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all">
                      <Edit3 size={18} />
                    </button>
                  </Link>
                  <button 
                    onClick={() => deleteCategory(cat._id)}
                    disabled={deletingId === cat._id}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50"
                  >
                    {deletingId === cat._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-3">slug: {cat.slug}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{cat.description || 'No description'}</p>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cat.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {cat.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <Link href={`/menu?category=${cat.slug}`}>
                    <button className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest">
                      <span>View Items</span>
                      <ChevronRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {categories.length === 0 && (
        <div className="h-96 flex flex-col items-center justify-center bg-[#121212] rounded-3xl border border-dashed border-white/10">
          <LayoutGrid className="text-gray-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">No Categories Yet</h3>
          <p className="text-gray-500 mb-6">Create your first category to organize your menu</p>
          <Link href="/admin/add-category">
            <button className="bg-secondary px-6 py-3 rounded-xl font-bold">Create Category</button>
          </Link>
        </div>
      )}
    </div>
  );
}