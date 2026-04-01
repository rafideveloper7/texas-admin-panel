'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  ChevronLeft,
  DollarSign,
  AlignLeft,
  LayoutGrid,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/categories`);
        const data = await res.json();
        setCats(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('isAvailable', formData.isAvailable);
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(`${baseUrl}/menu`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/menu-management'), 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Link href="/admin/menu-management">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-sm font-medium">Back to Menu</span>
          </button>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-black">Add New Menu Item</h1>
        <p className="text-gray-500 mt-2">Create a delicious new dish for your customers</p>
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
                  <p className="font-bold text-xs uppercase tracking-widest">Upload Image</p>
                  <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-white/5 rounded-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Tips</h3>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>• Use high-quality images (1:1 ratio recommended)</li>
              <li>• Keep names concise and descriptive</li>
              <li>• Set competitive pricing based on market</li>
            </ul>
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
                <h3 className="text-2xl font-black mb-2">Item Added!</h3>
                <p className="text-gray-500">Redirecting to menu management...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Item Name *</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Texas Special Burger" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-secondary/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Price (PKR) *</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  type="number" 
                  placeholder="0" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-secondary/50 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Category *</label>
              <div className="relative">
                <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-secondary/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#121212]">Select Category</option>
                  {cats.map(cat => (
                    <option key={cat._id} value={cat._id} className="bg-[#121212]">{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Description *</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-5 text-gray-500" size={18} />
              <textarea 
                required
                rows="4" 
                placeholder="Describe the dish, ingredients, and why customers will love it..." 
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
            <span>{loading ? 'Adding Item...' : 'Add Menu Item'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}