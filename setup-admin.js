// setup-admin.js - Complete Admin Panel Setup Script
const fs = require('fs');
const path = require('path');

// Create directory structure for admin panel
const directories = [
  'src/app',
  'src/app/admin',
  'src/app/admin/dashboard',
  'src/app/admin/orders',
  'src/app/admin/categories',
  'src/app/admin/menu-management',
  'src/app/admin/add-item',
  'src/app/admin/add-category',
  'src/app/admin/edit-item/[id]',
  'src/app/admin/edit-category/[id]',
  'src/app/admin/login',
  'src/components/admin',
  'src/lib',
  'public'
];

directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  }
});

// ==================== ENV FILE ====================
const envContent = `# API Configuration
NEXT_PUBLIC_API_URL=https://texas-api.vercel.app/api

# Admin Credentials (for reference)
NEXT_PUBLIC_ADMIN_EMAIL=admin@texasgrill.com
`;
fs.writeFileSync('.env.local', envContent);
console.log('✅ Created: .env.local');

// ==================== PACKAGE.JSON ====================
const packageContent = `{
  "name": "texas-grill-admin",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^10.16.4",
    "lucide-react": "^1.7.0",
    "next": "^15.1.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^3.8.1",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.39.4",
    "eslint-config-next": "16.2.1",
    "postcss": "^8.4.35"
  }
}`;
fs.writeFileSync('package.json', packageContent);
console.log('✅ Created: package.json');

// ==================== TAILWIND CONFIG ====================
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d8a43f',
        secondary: '#cc2b2b',
        dark: '#0a0a0a',
        darker: '#050505',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}`;
fs.writeFileSync('tailwind.config.js', tailwindConfig);
console.log('✅ Created: tailwind.config.js');

// ==================== POSTCSS CONFIG ====================
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
fs.writeFileSync('postcss.config.mjs', postcssConfig);
console.log('✅ Created: postcss.config.mjs');

// ==================== NEXT CONFIG ====================
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;`;
fs.writeFileSync('next.config.mjs', nextConfig);
console.log('✅ Created: next.config.mjs');

// ==================== VERCEL.JSON ====================
const vercelContent = `{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}`;
fs.writeFileSync('vercel.json', vercelContent);
console.log('✅ Created: vercel.json');

// ==================== GLOBALS.CSS ====================
const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@layer base {
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: 'Inter', system-ui, sans-serif;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cc2b2b;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d8a43f;
}

/* Animation Classes */
.animate-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glass Effect */
.glass {
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-card {
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.9), rgba(10, 10, 10, 0.9));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}`;
fs.writeFileSync('src/app/globals.css', globalsCSS);
console.log('✅ Created: src/app/globals.css');

// ==================== LAYOUT.JS ====================
const layoutContent = `import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Texas Grill Admin Panel",
  description: "Restaurant Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`;
fs.writeFileSync('src/app/layout.js', layoutContent);
console.log('✅ Created: src/app/layout.js');

// ==================== ADMIN LAYOUT ====================
const adminLayoutContent = `'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  LogOut, 
  Menu as MenuIcon,
  X,
  PlusCircle,
  LayoutGrid,
  Settings,
  Users,
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const isLoginPage = pathname === '/admin/login';
    
    if (!token && !isLoginPage) {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthorized && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { href: '/admin/categories', icon: <LayoutGrid size={20} />, label: 'Categories' },
    { href: '/admin/menu-management', icon: <UtensilsCrossed size={20} />, label: 'Menu Management' },
    { href: '/admin/add-item', icon: <PlusCircle size={20} />, label: 'Add Product' },
    { href: '/admin/add-category', icon: <PlusCircle size={20} />, label: 'Add Category' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-darker text-gray-100 flex">
      {/* Sidebar */}
      <aside className={\`bg-[#121212] border-r border-white/5 transition-all duration-300 z-50 fixed md:static inset-y-0 left-0 \${isSidebarOpen ? 'w-72' : 'w-20'}\`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">T</span>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                TEXAS GRILL
              </span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider ml-1">ADMIN</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-black text-lg">T</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-white/5 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 px-3 space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              href={item.href} 
              icon={item.icon} 
              label={item.label} 
              active={pathname === item.href} 
              isOpen={isSidebarOpen} 
            />
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className={\`w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-200 \${isSidebarOpen ? '' : 'justify-center'}\`}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#121212]/80 backdrop-blur-md sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-all">
            <MenuIcon size={20} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Master Administrator</p>
              <p className="text-xs text-gray-500">Super User • Full Access</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center font-black shadow-lg">
              A
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active, isOpen }) {
  return (
    <Link 
      href={href} 
      className={\`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group \${active ? 'bg-gradient-to-r from-secondary/20 to-secondary/5 border-l-2 border-secondary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}\`}
    >
      <span className={\`transition-colors \${active ? 'text-secondary' : 'text-gray-400 group-hover:text-white'}\`}>
        {icon}
      </span>
      {isOpen && <span className="font-medium text-sm">{label}</span>}
    </Link>
  );
}`;
fs.writeFileSync('src/app/admin/layout.js', adminLayoutContent);
console.log('✅ Created: src/app/admin/layout.js');

// ==================== ADMIN ROOT PAGE ====================
const adminRootContent = `'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      <p className="text-gray-500 font-medium tracking-widest text-sm uppercase animate-pulse">
        Texas Console Initializing...
      </p>
    </div>
  );
}`;
fs.writeFileSync('src/app/admin/page.js', adminRootContent);
console.log('✅ Created: src/app/admin/page.js');

// ==================== LOGIN PAGE ====================
const loginPageContent = `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, Loader2, UtensilsCrossed } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/auth/login\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              <span className="text-secondary">ADMIN</span>
              <span className="text-white"> PORTAL</span>
            </h1>
            <p className="text-gray-500 text-sm">Texas Grill Restaurant Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm"
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="admin@texasgrill.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-primary text-white font-black rounded-2xl py-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Access Control Panel</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs">
              Secure Admin Access • Texas Grill Kohat
            </p>
            <p className="text-gray-700 text-[10px] mt-2">
              Default: admin@texasgrill.com / Admin@123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}`;
fs.writeFileSync('src/app/admin/login/page.js', loginPageContent);
console.log('✅ Created: src/app/admin/login/page.js');

// ==================== DASHBOARD PAGE ====================
const dashboardContent = `'use client';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
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
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/dashboard/stats\`, {
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Stats error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-secondary mb-4" size={48} />
        <p className="text-gray-400 font-medium">Loading Texas Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center p-8 bg-[#121212] rounded-3xl border border-red-500/20">
        <AlertTriangle className="text-red-500 mb-6" size={48} />
        <h2 className="text-2xl font-bold mb-4">Dashboard Sync Error</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">{error}</p>
        <button onClick={fetchStats} className="flex items-center gap-2 bg-secondary px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-all">
          <RefreshCcw size={20} />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  const statCards = [
    { icon: <DollarSign className="text-green-500" />, label: "Total Revenue", value: \`Rs. \${stats?.totalRevenue?.toLocaleString() || 0}\`, trend: "+12.5%", trendUp: true },
    { icon: <ShoppingBag className="text-blue-500" />, label: "Total Orders", value: stats?.totalOrders || 0, trend: "+8.3%", trendUp: true },
    { icon: <CheckCircle className="text-indigo-500" />, label: "Completed", value: stats?.orderStatusCounts?.find(s => s._id === 'delivered')?.count || 0, trend: "+5.2%", trendUp: true },
    { icon: <Utensils className="text-orange-500" />, label: "Menu Items", value: stats?.totalMenuItems || 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Restaurant Analytics</h1>
          <p className="text-gray-500 mt-1">Real-time overview of Texas Grill Kohat</p>
        </div>
        <button onClick={fetchStats} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 flex items-center gap-2 transition-all">
          <RefreshCcw size={16} />
          <span className="text-sm font-medium">Refresh Data</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#121212] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-secondary/20 transition-all"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              {card.trend && (
                <div className={\`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg \${card.trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}\`}>
                  {card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{card.trend}</span>
                </div>
              )}
            </div>
            <div className="mt-6 relative z-10">
              <p className="text-gray-500 text-sm font-medium">{card.label}</p>
              <h2 className="text-2xl font-bold mt-1 tracking-tight">{card.value}</h2>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <span>Sales Overview (Last 7 Days)</span>
            </h3>
          </div>
          <div className="h-[300px] w-full bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/10">
            <div className="text-center">
              <TrendingUp className="text-gray-600 mx-auto mb-2" size={32} />
              <p className="text-gray-500 text-sm">Revenue chart loading...</p>
              <p className="text-xs text-gray-600 mt-1">Mock: Rs. 1.2M peak this week</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-3xl p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Package size={18} className="text-secondary" />
            <span>Top Selling Items</span>
          </h3>
          <div className="space-y-4">
            {stats?.topItems?.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group p-3 hover:bg-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-gray-600 w-4">{idx + 1}</span>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.count} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary">Popular</p>
                </div>
              </div>
            ))}
            {(!stats?.topItems || stats?.topItems.length === 0) && (
              <p className="text-gray-600 italic text-sm py-4 text-center">No order data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span>Recent Activity</span>
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">New order received <span className="text-primary font-bold">#ORD{Math.floor(100000 + Math.random() * 900000)}</span></p>
                <p className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 60)} minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;
fs.writeFileSync('src/app/admin/dashboard/page.js', dashboardContent);
console.log('✅ Created: src/app/admin/dashboard/page.js');

// ==================== ORDERS PAGE ====================
const ordersContent = `'use client';
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  Search, 
  Loader2,
  AlertCircle,
  Package,
  CheckCircle,
  XCircle,
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
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/orders/admin/all\`, {
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
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
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/orders/\${orderId}/status\`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\` 
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
      order.customer?.phone?.includes(searchTerm) ||
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'confirmed': return <CheckCircle size={16} className="text-blue-500" />;
      case 'preparing': return <ChefHat size={16} className="text-orange-500" />;
      case 'ready': return <Package size={16} className="text-purple-500" />;
      case 'delivered': return <Truck size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
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
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-secondary mb-4" size={40} />
        <p className="text-gray-400 font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Orders Queue</h1>
          <p className="text-gray-500 mt-1">Manage incoming orders and delivery status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-[#121212] border border-white/5 rounded-2xl w-full md:w-80 focus:outline-none focus:border-secondary/30 transition-all"
            />
          </div>
          
          <div className="flex items-center bg-[#121212] p-1.5 border border-white/5 rounded-2xl gap-1">
            {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={\`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all \${filter === f ? 'bg-secondary text-white' : 'text-gray-500 hover:text-white'}\`}
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
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className="bg-[#121212] border border-white/5 rounded-2xl p-5 hover:border-secondary/20 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(order.status)}
                      <span className={\`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border \${getStatusColor(order.status)}\`}>
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
                      {order.items?.map(i => \`\${i.quantity}x \${i.name}\`).join(', ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-xl font-bold text-primary">Rs. {order.total?.toLocaleString()}</p>
                  </div>

                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none transition-all cursor-pointer hover:bg-white/10"
                  >
                    <option value="pending" className="bg-[#121212]">Pending</option>
                    <option value="confirmed" className="bg-[#121212]">Confirm</option>
                    <option value="preparing" className="bg-[#121212]">Preparing</option>
                    <option value="ready" className="bg-[#121212]">Ready</option>
                    <option value="delivered" className="bg-[#121212]">Delivered</option>
                    <option value="cancelled" className="bg-[#121212]">Cancel</option>
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
}`;
fs.writeFileSync('src/app/admin/orders/page.js', ordersContent);
console.log('✅ Created: src/app/admin/orders/page.js');

// ==================== CATEGORIES PAGE ====================
const categoriesContent = `'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Loader2, 
  LayoutGrid,
  CheckCircle,
  XCircle,
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
      const res = await fetch(\`\${baseUrl}/categories?includeInactive=true\`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category? Associated items will be orphaned.')) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/categories/\${id}\`, {
        method: 'DELETE',
        headers: { 'Authorization': \`Bearer \${token}\` }
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
    <div className="space-y-8 animate-in fade-in duration-700">
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
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(idx * 0.05, 0.3) }}
              className="bg-[#121212] rounded-3xl border border-white/5 p-6 group hover:border-secondary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden group-hover:bg-secondary/10 transition-colors">
                  {cat.image?.url ? (
                    <img src={cat.image.url} className="w-full h-full object-cover" alt={cat.name} />
                  ) : (
                    <LayoutGrid className="text-gray-500 group-hover:text-secondary" size={24} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={\`/admin/edit-category/\${cat._id}\`}>
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
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{cat.description || 'No description'}</p>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={\`w-2 h-2 rounded-full \${cat.isActive !== false ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}\`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {cat.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <Link href={\`/menu?category=\${cat.slug}\`}>
                    <button className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest group/btn">
                      <span>View Items</span>
                      <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
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
}`;
fs.writeFileSync('src/app/admin/categories/page.js', categoriesContent);
console.log('✅ Created: src/app/admin/categories/page.js');

// ==================== MENU MANAGEMENT PAGE ====================
const menuManagementContent = `'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Package,
  Utensils
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMenuManagementPage() {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const [itemsRes, catsRes] = await Promise.all([
        fetch(\`\${baseUrl}/menu?includeUnavailable=true\`),
        fetch(\`\${baseUrl}/categories?includeInactive=true\`)
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
      const res = await fetch(\`\${baseUrl}/menu/\${id}\`, {
        method: 'DELETE',
        headers: { 'Authorization': \`Bearer \${token}\` }
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
      const res = await fetch(\`\${baseUrl}/menu/\${id}/availability\`, {
        method: 'PUT',
        headers: { 
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: !currentAvailable })
      });
      const data = await res.json();
      if (data.success) {
        setItems(prev => prev.map(i => i._id === id ? { ...i, isAvailable: !currentAvailable } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-primary tracking-widest mb-2">
            <span className="w-8 h-px bg-primary"></span>
            <span>Inventory Portal</span>
          </div>
          <h1 className="text-3xl font-black">Menu Management</h1>
          <p className="text-gray-500 mt-1">Add, update or remove menu items</p>
        </div>
        
        <Link href="/admin/add-item">
          <button className="flex items-center gap-3 bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-secondary/20 active:scale-95 transition-all">
            <Plus size={20} />
            <span>Add New Item</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3 bg-[#121212] border border-white/5 rounded-2xl w-full focus:outline-none focus:border-secondary/30 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button 
            onClick={() => setSelectedCat('all')}
            className={\`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all \${selectedCat === 'all' ? 'bg-secondary text-white' : 'bg-white/5 text-gray-500 hover:text-white'}\`}
          >
            All Items
          </button>
          {cats.map(cat => (
            <button 
              key={cat._id}
              onClick={() => setSelectedCat(cat._id)}
              className={\`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap \${selectedCat === cat._id ? 'bg-secondary text-white' : 'bg-white/5 text-gray-500 hover:text-white'}\`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item, idx) => (
            <motion.div 
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(idx * 0.03, 0.5) }}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 group hover:border-secondary/20 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image?.url || item.image || '/placeholder.jpg'} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => toggleAvailability(item._id, item.isAvailable)}
                    className={\`p-2 rounded-xl backdrop-blur-md border \${item.isAvailable ? 'bg-green-500/20 border-green-500/50 text-green-500' : 'bg-red-500/20 border-red-500/50 text-red-500'}\`}
                  >
                    {item.isAvailable ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black uppercase text-primary">
                  {cats.find(c => c._id === (typeof item.category === 'object' ? item.category?._id : item.category))?.name || 'Uncategorized'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="text-xl font-bold text-primary">Rs. {item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={\`/admin/edit-item/\${item._id}\`}>
                      <button className="p-2 bg-white/5 rounded-xl hover:bg-blue-500/20 transition-all">
                        <Edit3 size={16} className="text-blue-500" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteItem(item._id)}
                      className="p-2 bg-white/5 rounded-xl hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="h-96 flex flex-col items-center justify-center bg-[#121212] rounded-3xl border border-dashed border-white/10">
          <Package className="text-gray-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">No Items Found</h3>
          <p className="text-gray-500 mb-6">Add your first menu item to get started</p>
          <Link href="/admin/add-item">
            <button className="bg-secondary px-6 py-3 rounded-xl font-bold">Add Menu Item</button>
          </Link>
        </div>
      )}
    </div>
  );
}`;
fs.writeFileSync('src/app/admin/menu-management/page.js', menuManagementContent);
console.log('✅ Created: src/app/admin/menu-management/page.js');

// ==================== ADD ITEM PAGE ====================
const addItemContent = `'use client';
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
        const res = await fetch(\`\${baseUrl}/categories\`);
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

      const res = await fetch(\`\${baseUrl}/menu\`, {
        method: 'POST',
        headers: { 'Authorization': \`Bearer \${token}\` },
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
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
}`;
fs.writeFileSync('src/app/admin/add-item/page.js', addItemContent);
console.log('✅ Created: src/app/admin/add-item/page.js');

// ==================== ADD CATEGORY PAGE ====================
const addCategoryContent = `'use client';
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
    
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('isActive', formData.isActive);
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(\`\${baseUrl}/categories\`, {
        method: 'POST',
        headers: { 'Authorization': \`Bearer \${token}\` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/categories'), 2000);
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
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
}`;
fs.writeFileSync('src/app/admin/add-category/page.js', addCategoryContent);
console.log('✅ Created: src/app/admin/add-category/page.js');

// ==================== EDIT ITEM PAGE ====================
const editItemContent = `'use client';
import { useState, useEffect, use } from 'react';
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminEditItemPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
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
        fetch(\`\${baseUrl}/menu/\${params.id}\`),
        fetch(\`\${baseUrl}/categories\`)
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

  useEffect(() => { fetchData(); }, [params.id]);

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

      const res = await fetch(\`\${baseUrl}/menu/\${params.id}\`, {
        method: 'PUT',
        headers: { 'Authorization': \`Bearer \${token}\` },
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
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
}`;
fs.writeFileSync('src/app/admin/edit-item/[id]/page.js', editItemContent);
console.log('✅ Created: src/app/admin/edit-item/[id]/page.js');

// ==================== EDIT CATEGORY PAGE ====================
const editCategoryContent = `'use client';
import { useState, useEffect, use } from 'react';
import { 
  ChevronLeft, 
  Save, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminEditCategoryPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true
  });

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(\`\${baseUrl}/categories?includeInactive=true\`);
      const data = await res.json();
      const category = data.data.find(c => c._id === params.id);
      
      if (category) {
        setFormData({
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          isActive: category.isActive !== false
        });
        setImagePreview(category.image?.url || category.image);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [params.id]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\\w-]+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('isActive', formData.isActive);
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(\`\${baseUrl}/categories/\${params.id}\`, {
        method: 'PUT',
        headers: { 'Authorization': \`Bearer \${token}\` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/categories'), 2000);
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-sm font-medium">Back to Categories</span>
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
                <p className="text-xs">Upload Category Image</p>
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
                <p className="text-gray-500">Category changes saved</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-xs font-black uppercase text-primary">Category Name</label>
            <input 
              required
              value={formData.name}
              onChange={handleNameChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 mt-1 focus:outline-none focus:border-secondary/50"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-primary">Slug (Auto-generated)</label>
            <input 
              readOnly
              value={formData.slug}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 mt-1 text-gray-500 font-mono text-sm"
            />
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
}`;
fs.writeFileSync('src/app/admin/edit-category/[id]/page.js', editCategoryContent);
console.log('✅ Created: src/app/admin/edit-category/[id]/page.js');

console.log('\n🎉 Admin Panel Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Run "npm install" to install dependencies');
console.log('2. Run "npm run dev" to start the admin panel');
console.log('3. Access at http://localhost:3000/admin');
console.log('4. Login with: admin@texasgrill.com / Admin@123');
console.log('\n🔗 API URL configured: https://texas-api.vercel.app/api');