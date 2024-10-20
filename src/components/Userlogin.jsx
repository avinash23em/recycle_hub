import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Leaf, ArrowRight, Users, TreePine, Recycle } from 'lucide-react';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayText, setDisplayText] = useState('');
  const navigate = useNavigate();

  const welcomeText = "Join our community of eco-warriors making a difference.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= welcomeText.length) {
        setDisplayText(welcomeText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setDisplayText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/user-home');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const floatingIcons = [
    { icon: Leaf, position: { top: '10%', left: '10%' }, delay: 0 },
    { icon: TreePine, position: { top: '20%', right: '15%' }, delay: 2 },
    { icon: Recycle, position: { bottom: '30%', left: '20%' }, delay: 1 },
    { icon: Users, position: { bottom: '20%', right: '10%' }, delay: 3 }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Original Gradient Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #1a4731, #05422c)'
      }} />

      {/* Original Floating Icons */}
      {floatingIcons.map(({ icon: Icon, position, delay }, index) => (
        <div
          key={index}
          className="absolute text-white/20"
          style={{
            ...position,
            animation: `float 6s infinite ${delay}s ease-in-out`
          }}
        >
          <Icon size={24} />
        </div>
      ))}

      {/* Main Login Container */}
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10 px-4">
        <div className="bg-gray-900/95 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700/50 transition-all duration-300">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Recycle className="text-green-400 w-12 h-12" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">RecycleHub</h1>
            <p className="text-sm text-green-400 h-8 flex items-center justify-center">
              {displayText}
              <span className="animate-pulse ml-1">|</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="group">
                <div className="flex items-center border-2 border-gray-700 rounded-lg p-3 transition-all duration-300 focus-within:border-green-500 hover:border-green-400 bg-gray-800/50">
                  <Mail className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full focus:outline-none text-gray-300 bg-transparent"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <div className="flex items-center border-2 border-gray-700 rounded-lg p-3 transition-all duration-300 focus-within:border-green-500 hover:border-green-400 bg-gray-800/50">
                  <Lock className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full focus:outline-none text-gray-300 bg-transparent"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-green-500 focus:ring-green-500 bg-gray-800"
                />
                <span className="text-sm text-gray-300">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 group"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 text-red-400 rounded-lg text-sm text-center border border-red-800">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Original CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 20px); }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;