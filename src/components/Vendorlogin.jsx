import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store, Recycle, Package, Truck, TreePine, Leaf } from 'lucide-react';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayText, setDisplayText] = useState('');
  const navigate = useNavigate();

  const welcomeText = "Welcome back, Sustainability Partner!";

  useEffect(() => {
    let index = 0;
    let typingInterval;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < welcomeText.length) {
          setDisplayText(welcomeText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    };

    startTyping();
    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/vendor-home');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const floatingIcons = useMemo(() => [
    { icon: <Store size={24} />, left: '10%', top: '20%', delay: '0s', duration: '15s' },
    { icon: <Recycle size={24} />, left: '70%', top: '10%', delay: '2s', duration: '18s' },
    { icon: <Package size={24} />, left: '40%', top: '80%', delay: '4s', duration: '20s' },
    { icon: <Truck size={24} />, left: '80%', top: '60%', delay: '1s', duration: '17s' },
    { icon: <TreePine size={24} />, left: '20%', top: '40%', delay: '3s', duration: '19s' },
    { icon: <Leaf size={24} />, left: '60%', top: '30%', delay: '5s', duration: '16s' },
  ], []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Gradient Background - Changed to purple/indigo theme */}
      <div className="fixed inset-0 z-0" style={{
        background: 'linear-gradient(180deg, #2e1065, #4c1d95, #6d28d9)'
      }} />

      {/* Floating Icons Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className="absolute text-purple-400/10 animate-float"
            style={{
              left: icon.left,
              top: icon.top,
              animationDelay: icon.delay,
              animationDuration: icon.duration
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-purple-700/50 p-8 shadow-2xl">
          {/* Logo Section */}
          <div className="text-center space-y-4 mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center relative">
              <Store className="text-purple-400 z-10" size={40} />
              <Recycle className="text-purple-400/30 absolute animate-spin-slow" size={50} />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Vendor Portal
            </h2>
            <p className="text-purple-400 text-sm h-6">{displayText}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-800 text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 group-hover:border-purple-400/50"
                  placeholder="Business Email"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 group-hover:border-purple-400/50"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500/50 bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300 hover:text-white transition-colors">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center justify-center">
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Sign in to Portal
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-float {
          animation: float 15s infinite;
        }
      `}</style>
    </div>
  );
};

export default VendorLogin;