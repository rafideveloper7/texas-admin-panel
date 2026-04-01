'use client';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Loader2,
  RefreshCcw,
  ArrowUpRight,
  Utensils,
  Users,
  Clock,
  CheckCircle,
  Package,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No authentication token');
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-secondary mb-3" size={32} />
        <p className="text-gray-400 text-sm">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 max-w-sm text-center">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button 
            onClick={fetchStats} 
            className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
          >
            <RefreshCcw size={16} />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  // All stats data - will be visible on all devices
  const statsCards = [
    { 
      icon: <DollarSign size={20} className="text-green-500" />, 
      label: "Total Revenue", 
      value: `Rs. ${stats?.totalRevenue?.toLocaleString() || '0'}`,
      trend: "+12.5%",
      bgClass: "bg-green-500/10"
    },
    { 
      icon: <ShoppingBag size={20} className="text-blue-500" />, 
      label: "Total Orders", 
      value: stats?.totalOrders?.toLocaleString() || '0',
      trend: "+8.3%",
      bgClass: "bg-blue-500/10"
    },
    { 
      icon: <CheckCircle size={20} className="text-emerald-500" />, 
      label: "Completed Orders", 
      value: stats?.orderStatusCounts?.find(s => s._id === 'delivered')?.count?.toLocaleString() || '0',
      trend: "+5.2%",
      bgClass: "bg-emerald-500/10"
    },
    { 
      icon: <Utensils size={20} className="text-orange-500" />, 
      label: "Menu Items", 
      value: stats?.totalMenuItems?.toLocaleString() || '0',
      trend: null,
      bgClass: "bg-orange-500/10"
    },
    { 
      icon: <Users size={20} className="text-purple-500" />, 
      label: "Total Customers", 
      value: stats?.totalUsers?.toLocaleString() || '0',
      trend: "+5.2%",
      bgClass: "bg-purple-500/10"
    },
    { 
      icon: <Clock size={20} className="text-yellow-500" />, 
      label: "Pending Orders", 
      value: stats?.pendingOrders?.toLocaleString() || '0',
      trend: "-2.1%",
      bgClass: "bg-yellow-500/10"
    },
    { 
      icon: <Calendar size={20} className="text-pink-500" />, 
      label: "Today's Reservations", 
      value: stats?.todayReservations?.toLocaleString() || '0',
      trend: null,
      bgClass: "bg-pink-500/10"
    },
    { 
      icon: <Package size={20} className="text-cyan-500" />, 
      label: "Active Orders", 
      value: stats?.orderStatusCounts?.filter(s => ['pending', 'confirmed', 'preparing'].includes(s._id))?.reduce((sum, s) => sum + s.count, 0)?.toLocaleString() || '0',
      trend: null,
      bgClass: "bg-cyan-500/10"
    }
  ];

  // Split into two rows for better mobile display
  const firstRowCards = statsCards.slice(0, 4);
  const secondRowCards = statsCards.slice(4, 8);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-black">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Texas Grill Analytics</p>
        </div>
        <button 
          onClick={fetchStats} 
          className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-sm"
        >
          <RefreshCcw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Grid - Two rows of 2 cards on mobile */}
      <div className="space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-3">
          {firstRowCards.map((card, idx) => (
            <div key={idx} className="bg-[#121212] border border-white/5 rounded-xl p-4 hover:border-secondary/20 transition">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 ${card.bgClass} rounded-xl`}>
                  {card.icon}
                </div>
                {card.trend && (
                  <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} />
                    {card.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{card.label}</p>
                <p className="text-xl font-bold text-white break-words">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-3">
          {secondRowCards.map((card, idx) => (
            <div key={idx} className="bg-[#121212] border border-white/5 rounded-xl p-4 hover:border-secondary/20 transition">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 ${card.bgClass} rounded-xl`}>
                  {card.icon}
                </div>
                {card.trend && (
                  <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} />
                    {card.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{card.label}</p>
                <p className="text-xl font-bold text-white break-words">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-6 bg-[#121212] border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="font-bold text-base">Recent Orders</h3>
        </div>
        
        <div className="space-y-2">
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            stats.recentOrders.slice(0, 4).map((order, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{order.customer?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-500">#{order.orderNumber || order._id?.slice(-6)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <p className="font-bold text-primary text-sm">Rs. {order.total?.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Package size={32} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500">No recent orders</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase">Avg Order Value</p>
          <p className="text-xl font-bold text-primary mt-1">
            Rs. {stats?.totalRevenue && stats?.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : '0'}
          </p>
        </div>
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase">Completion Rate</p>
          <p className="text-xl font-bold text-primary mt-1">
            {stats?.orderStatusCounts?.find(s => s._id === 'delivered')?.count && stats?.totalOrders 
              ? Math.round((stats.orderStatusCounts.find(s => s._id === 'delivered').count / stats.totalOrders) * 100)
              : '0'}%
          </p>
        </div>
      </div>

      {/* Quick Actions for Mobile */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
        <a href="/admin/orders" className="bg-secondary/10 border border-secondary/20 rounded-xl p-3 text-center">
          <ShoppingBag size={20} className="text-secondary mx-auto mb-1" />
          <p className="text-xs font-medium">View Orders</p>
        </a>
        <a href="/admin/menu-management" className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
          <Utensils size={20} className="text-primary mx-auto mb-1" />
          <p className="text-xs font-medium">Manage Menu</p>
        </a>
      </div>
    </div>
  );
}