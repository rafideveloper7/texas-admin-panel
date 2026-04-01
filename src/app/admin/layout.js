'use client';
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
  LayoutGrid
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    { href: '/admin/menu-management', icon: <UtensilsCrossed size={20} />, label: 'Menu' },
    { href: '/admin/add-item', icon: <PlusCircle size={20} />, label: 'Add Item' },
    { href: '/admin/add-category', icon: <PlusCircle size={20} />, label: 'Add Category' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-darker text-gray-100">
      {/* Mobile Bottom Navigation - FIXED VISIBILITY */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 z-50 shadow-lg">
          <div className="flex justify-around items-center py-2 px-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all min-w-[70px] ${
                  pathname === item.href 
                    ? 'text-secondary bg-secondary/10' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all min-w-[70px]"
            >
              <LogOut size={20} />
              <span className="text-[10px] font-medium whitespace-nowrap">Exit</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Menu (More menu) */}
      {isMobile && isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-[100]"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed bottom-20 left-4 right-4 bg-[#121212] border border-gray-800 rounded-2xl z-[101] max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-[#121212]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">TG</span>
                </div>
                <span className="text-sm font-bold">More Options</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-2">
              <div className="mt-2 pt-2 border-t border-gray-800">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#121212] border-r border-gray-800 overflow-y-auto">
          <div className="p-5 flex items-center gap-2 border-b border-gray-800">
            <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">TG</span>
            </div>
            <div>
              <span className="text-sm font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Texas Grill
              </span>
              <p className="text-[10px] text-gray-500">Admin Panel</p>
            </div>
          </div>

          <nav className="mt-6 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  pathname === item.href 
                    ? 'bg-secondary/20 text-secondary border-l-2 border-secondary' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-800">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <div className={!isMobile ? "ml-64" : ""}>
        <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            {isMobile ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">TG</span>
                </div>
                <span className="text-sm font-bold">Texas Grill Admin</span>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex items-center gap-3">
              <div className="text-right hidden xs:block">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">Super User</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center font-black">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - with proper padding for bottom nav */}
        <main className="p-4 pb-28 md:pb-6 overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
}