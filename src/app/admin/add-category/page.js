'use client';
import { useState } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  ChevronLeft,
  AlignLeft,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAddCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      if (!token) {
        throw new Error('No authentication token. Please login again.');
      }
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('isActive', formData.isActive);
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      if (res.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/categories'), 2000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-sm font-medium">Back to Categories</span>
          </button>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-black">Create New Category</h1>
        <p className="text-gray-500 mt-2">Organize your menu items by category</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 aspect-square relative group hover:border-secondary/20 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center">
            {imagePreview ? (
              <>
                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" onClick={() => {setImagePreview(null); setImageFile(null);}} className="p-3 bg-red-500 rounded-full text-white hover:scale-110 transition-transform">
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-3 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-secondary/10 transition-all">
                  <ImageIcon className="text-gray-500 group-hover:text-secondary" size={32} />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest">Upload Icon</p>
                  <p className="text-gray-600 text-xs mt-1">Recommended 1:1 ratio</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-3xl p-8 space-y-6 relative overflow-hidden">
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
              >
                <CheckCircle className="text-green-500 mb-4" size={48} />
                <h3 className="text-2xl font-black mb-2">Category Created!</h3>
                <p className="text-gray-500">Redirecting to categories list...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Category Name *</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Appetizers, Main Course, Desserts" 
              value={formData.name}
              onChange={handleNameChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-secondary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-5 text-gray-500" size={18} />
              <textarea 
                rows="4" 
                placeholder="Describe what this category offers..." 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-secondary/50 transition-all resize-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-secondary to-primary text-white py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 hover:shadow-lg transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            <span>{loading ? 'Creating...' : 'Create Category'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}