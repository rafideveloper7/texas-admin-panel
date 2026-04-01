'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Save, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle 
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminEditItemPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const [itemRes, catsRes] = await Promise.all([
        fetch(`${baseUrl}/menu/${id}`),
        fetch(`${baseUrl}/categories`)
      ]);
      const itemData = await itemRes.json();
      const catsData = await catsRes.json();
      
      const item = itemData.data;
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: typeof item.category === 'object' ? item.category._id : item.category,
        isAvailable: item.isAvailable !== false
      });
      setImagePreview(item.image?.url || item.image);
      setCats(catsData.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
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

      const res = await fetch(`${baseUrl}/menu/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/menu-management'), 2000);
      }
    } catch (err) {
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Link href="/admin/menu-management">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-sm font-medium">Back to Menu</span>
          </button>
        </Link>
        <h1 className="text-2xl font-black">Edit: {formData.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 aspect-square relative group hover:border-secondary/20 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center">
            {imagePreview ? (
              <>
                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
                    <ImageIcon size={20} />
                    <input type="file" className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }} />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-3 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center">
                  <ImageIcon className="text-gray-500" size={32} />
                </div>
                <p className="text-xs">Upload New Image</p>
                <input type="file" className="hidden" onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }} />
              </label>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-3xl p-8 space-y-6 relative overflow-hidden">
          <AnimatePresence>
            {success && (
              <motion.div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">
                <CheckCircle className="text-green-500 mb-4" size={48} />
                <h3 className="text-2xl font-black">Updated!</h3>
                <p className="text-gray-500">Changes saved successfully</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-xs font-black uppercase text-primary">Item Name</label>
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 mt-1 focus:outline-none focus:border-secondary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-primary">Price (PKR)</label>
              <input 
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 mt-1 focus:outline-none focus:border-secondary/50"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-primary">Category</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 mt-1 focus:outline-none focus:border-secondary/50"
              >
                {cats.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-primary">Description</label>
            <textarea 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 mt-1 focus:outline-none focus:border-secondary/50 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-secondary to-primary text-white py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button 
              type="button"
              onClick={() => router.back()}
              className="px-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}