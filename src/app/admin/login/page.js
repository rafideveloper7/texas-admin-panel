'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, Loader2, UtensilsCrossed, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const router = useRouter();

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('small');
      else if (width < 640) setScreenSize('mobile');
      else setScreenSize('desktop');
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    
    // Prevent browser autofill
    const emailInput = document.getElementById('admin-email');
    const passwordInput = document.getElementById('admin-password');
    if (emailInput) emailInput.setAttribute('autocomplete', 'off');
    if (passwordInput) passwordInput.setAttribute('autocomplete', 'new-password');
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/auth/login`, {
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

  const isSmallScreen = screenSize === 'small';

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-darker flex items-center justify-center p-3 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[360px] sm:max-w-md relative z-10"
      >
        <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-5 sm:mb-8">
            <div className={`${isSmallScreen ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-secondary/20`}>
              <UtensilsCrossed className={`${isSmallScreen ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8'} text-white`} />
            </div>
            <h1 className={`${isSmallScreen ? 'text-xl' : 'text-2xl sm:text-3xl'} font-black tracking-tight mb-1`}>
              <span className="text-secondary">ADMIN</span>
              <span className="text-white"> PORTAL</span>
            </h1>
            <p className="text-gray-500 text-[10px] sm:text-xs">Texas Grill Restaurant Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6" autoComplete="off">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-500 text-[11px] sm:text-xs"
                >
                  <AlertCircle size={14} />
                  <span className="flex-1">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                  <Mail size={isSmallScreen ? 14 : 16} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-9 pr-3 py-2.5 sm:py-3.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  placeholder="admin email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                  <Lock size={isSmallScreen ? 14 : 16} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-9 pr-9 py-2.5 sm:py-3.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={isSmallScreen ? 14 : 16} /> : <Eye size={isSmallScreen ? 14 : 16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-primary text-white font-black rounded-xl py-2.5 sm:py-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-secondary/20 text-sm"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Access Panel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}