'use client';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2,
  AlertCircle,
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChefHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Token:', token ? 'Present' : 'Missing'); // Debug log
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/orders/admin/all`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Orders fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = 
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone?.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'confirmed': return <CheckCircle size={16} className="text-blue-500" />;
      case 'preparing': return <ChefHat size={16} className="text-orange-500" />;
      case 'ready': return <Package size={16} className="text-purple-500" />;
      case 'delivered': return <Truck size={16} className="text-green-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      preparing: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      ready: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center p-8 bg-[#121212] rounded-3xl">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchOrders} className="flex items-center gap-2 bg-secondary px-6 py-2 rounded-xl">
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Orders Queue</h1>
          <p className="text-gray-500 mt-1">Manage incoming orders and delivery status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-[#121212] border border-white/5 rounded-2xl w-full md:w-80 focus:outline-none focus:border-secondary/30"
            />
          </div>
          
          <div className="flex items-center bg-[#121212] p-1.5 border border-white/5 rounded-2xl gap-1">
            {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-secondary text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, idx) => (
              <motion.div 
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121212] border border-white/5 rounded-2xl p-5 hover:border-secondary/20 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(order.status)}
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">#{order.orderNumber || order._id.slice(-6).toUpperCase()}</p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg">{order.customer?.name}</h3>
                    <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                    {order.customer?.address && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">{order.customer.address}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{order.items?.length} items</p>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {order.items?.slice(0, 2).map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      {order.items?.length > 2 && '...'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-xl font-bold text-primary">Rs. {order.total?.toLocaleString()}</p>
                  </div>

                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none cursor-pointer hover:bg-white/10"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirm</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-[#121212] rounded-3xl border border-dashed border-white/10">
              <AlertCircle className="text-gray-600 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No orders found</p>
              <p className="text-gray-600 text-sm mt-1">Try changing your filters</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}