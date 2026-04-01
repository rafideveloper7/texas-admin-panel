'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Loader2, 
  Package,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMenuManagementPage() {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const scrollRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const [itemsRes, catsRes] = await Promise.all([
        fetch(`${baseUrl}/menu?includeUnavailable=true`),
        fetch(`${baseUrl}/categories`)
      ]);
      const itemsData = await itemsRes.json();
      const catsData = await catsRes.json();
      setItems(itemsData.data || []);
      setCats(catsData.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/menu/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAvailability = async (id, currentAvailable) => {
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/menu/${id}/availability`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: !currentAvailable })
      });
      if (res.ok) {
        setItems(prev => prev.map(i => i._id === id ? { ...i, isAvailable: !currentAvailable } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check scroll position for showing/hiding scroll buttons
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScroll();
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [cats]);

  const filteredItems = items.filter(item => {
    const catId = typeof item.category === 'object' ? item.category?._id : item.category;
    const isCatMatch = selectedCat === 'all' || catId === selectedCat;
    const isSearchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isCatMatch && isSearchMatch;
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-primary tracking-widest mb-1">
            <span className="w-6 h-px bg-primary"></span>
            <span>INVENTORY PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add, update or remove menu items</p>
        </div>
        
        <Link href="/admin/add-item">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 active:scale-95 transition-all whitespace-nowrap">
            <Plus size={18} />
            <span>ADD NEW ITEM</span>
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#121212] border border-white/10 rounded-xl focus:outline-none focus:border-secondary/30 transition-all text-sm"
        />
      </div>

      {/* Scrollable Category Filters with Navigation Arrows */}
      <div className="relative categories-wrapper">
        {/* Left Scroll Button */}
        {showLeftScroll && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-md rounded-full p-1.5 border border-gray-700 shadow-lg hover:bg-secondary transition-all"
            style={{ transform: 'translateY(-50%)' }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        
        {/* Scrollable Categories Container */}
        <div 
          ref={scrollRef}
          className="category-scroll"
          style={{ 
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '10px',
            paddingBottom: '12px',
            scrollbarWidth: 'thin'
          }}
        >
          <button 
            onClick={() => setSelectedCat('all')}
            className={`category-btn ${selectedCat === 'all' ? 'category-btn-active' : ''}`}
          >
            ALL ITEMS
          </button>
          {cats.map(cat => (
            <button 
              key={cat._id}
              onClick={() => setSelectedCat(cat._id)}
              className={`category-btn ${selectedCat === cat._id ? 'category-btn-active' : ''}`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* Right Scroll Button */}
        {showRightScroll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-md rounded-full p-1.5 border border-gray-700 shadow-lg hover:bg-secondary transition-all"
            style={{ transform: 'translateY(-50%)' }}
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode='popLayout'>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                className="bg-[#121212] rounded-xl overflow-hidden border border-white/5 group hover:border-secondary/20 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image?.url || item.image || '/placeholder.jpg'} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => toggleAvailability(item._id, item.isAvailable)}
                      className={`p-1.5 rounded-lg backdrop-blur-md border ${
                        item.isAvailable 
                          ? 'bg-green-500/20 border-green-500/50 text-green-500' 
                          : 'bg-red-500/20 border-red-500/50 text-red-500'
                      }`}
                    >
                      {item.isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] font-black uppercase text-primary">
                    {cats.find(c => c._id === (typeof item.category === 'object' ? item.category?._id : item.category))?.name || 'Uncategorized'}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">Price</p>
                      <p className="text-base font-bold text-primary">Rs. {item.price}</p>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/admin/edit-item/${item._id}`}>
                        <button className="p-1.5 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-all">
                          <Edit3 size={14} className="text-blue-500" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => deleteItem(item._id)}
                        className="p-1.5 bg-white/5 rounded-lg hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full h-64 flex flex-col items-center justify-center bg-[#121212] rounded-2xl border border-dashed border-white/10">
              <Package className="text-gray-600 mb-3" size={40} />
              <h3 className="text-lg font-bold mb-1">No Items Found</h3>
              <p className="text-gray-500 text-sm mb-4">Try a different category or search term</p>
              <Link href="/admin/add-item">
                <button className="bg-secondary px-5 py-2 rounded-xl text-sm font-bold">Add Menu Item</button>
              </Link>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}