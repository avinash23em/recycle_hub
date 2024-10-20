import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Recycle, Users, TreePine, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Leaf, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const missionText = "Together, let's create a cleaner, greener future through sustainable recycling practices and community engagement.";

  const environmentalFacts = [
    {
      title: "Our Impact",
      content: "Through our platform, we've facilitated the recycling of over 10,000 tons of materials, equivalent to saving 170,000 trees and 70 million gallons of water.",
      icon: <Leaf className="text-green-400 mb-4" size={32} />
    },
    {
      title: "Community Growth",
      content: "Join our thriving community of 50,000+ eco-warriors who are making a difference every day. Our members have initiated over 1,000 local recycling projects.",
      icon: <Users className="text-green-400 mb-4" size={32} />
    },
    {
      title: "Local Success Stories",
      content: "Our neighborhood programs have helped establish 200+ recycling points and reduced local landfill waste by 30% in just one year.",
      icon: <MapPin className="text-green-400 mb-4" size={32} />
    },
    {
      title: "Educational Impact",
      content: "We've reached 10,000+ students through our workshops, creating the next generation of environmental stewards. 95% of participants started recycling regularly.",
      icon: <TreePine className="text-green-400 mb-4" size={32} />
    },
    {
      title: "Future Vision",
      content: "By 2025, we're expanding to 50 new cities, aiming to divert 1 million tons of waste from landfills and reduce carbon emissions by 2 million tons.",
      icon: <Recycle className="text-green-400 mb-4" size={32} />
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (target === 'home') {
      scrollToTop();
    } else if (target === 'about') {
      scrollToSection(aboutRef);
    } else if (target === 'contact') {
      scrollToSection(contactRef);
    }
  };

  const handleServiceClick = (type) => {
    if (type === 'recycling' || type === 'impact') {
      navigate('/user-login');
    } else if (type === 'community') {
      navigate('/vendor-login');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'overlay';
    document.body.style.backgroundColor = '#1a4731';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    let index = 0;
    let typingInterval;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < missionText.length) {
          setDisplayText(missionText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    };

    startTyping();
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollPosition = window.scrollY;
      setScrollPosition(newScrollPosition);

      const boxes = document.querySelectorAll('.fact-box');
      const newVisibleBoxes = Array.from(boxes).map(box => {
        const rect = box.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.75;
      });
      setVisibleBoxes(newVisibleBoxes);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen" style={{
      background: 'linear-gradient(180deg, #1a4731 0%, #2d5a5a 50%, #1e3a57 100%)',
      backgroundAttachment: 'fixed',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-white font-bold text-xl">
              RecycleHub
            </a>
            <div className="flex space-x-6">
              <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-white hover:text-green-400 transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-white hover:text-green-400 transition-colors">About</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-white hover:text-green-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center sticky top-0 z-10 pt-16">
        <div 
          className="text-center space-y-8 px-4"
          style={{
            opacity: Math.max(0, 1 - scrollPosition / 500),
          }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-12">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
              RecycleHub
            </span>
          </h1>

          <p className="text-2xl text-green-400 font-semibold mt-16 px-4 md:px-20">{displayText}</p>

          <div className="mt-8 text-sm text-white/80">
            <p className="mb-1">Scroll to explore</p>
            <ChevronDown className="mx-auto animate-bounce" size={20} />
          </div>
        </div>
      </div>

      {/* Scrolling Facts */}
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-32">
          {environmentalFacts.map((fact, index) => (
            <div 
              key={index}
              className={`fact-box transform transition-all duration-1000 ease-out
                ${visibleBoxes[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}
                ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
              style={{ 
                maxWidth: '80%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '2rem',
                fontFamily: 'Georgia, serif',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-start">
                {fact.icon}
                <div>
                  <h3 className="text-2xl text-green-400 font-bold mb-4">{fact.title}</h3>
                  <p className="text-lg text-white leading-relaxed">{fact.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer Section */}
      <div ref={aboutRef} className="container mx-auto px-4 py-20" id="about">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Recycle className="text-green-400 mx-auto mb-6" size={48} />, 
              title: "Easy Recycling", 
              content: "Connect with local vendors effortlessly through our streamlined platform.",
              type: "recycling"
            },
            { 
              icon: <Users className="text-green-400 mx-auto mb-6" size={48} />, 
              title: "Community Events", 
              content: "Join local cleanup drives and workshops with our eco-conscious network.",
              type: "community"
            },
            { 
              icon: <TreePine className="text-green-400 mx-auto mb-6" size={48} />, 
              title: "Impact Tracking", 
              content: "Monitor your environmental contribution with our advanced analytics.",
              type: "impact"
            }
          ].map((item, index) => (
            <div 
              key={index}
              onClick={() => handleServiceClick(item.type)}
              className="bg-black/20 backdrop-blur-md rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/10 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.icon}
              <h3 className="text-2xl font-bold text-green-400 mb-4 text-center font-sans">{item.title}</h3>
              <p className="text-white/90 text-center font-light mb-8">{item.content}</p>
              <div className="flex items-center justify-center text-green-400 hover:text-green-300 transition-colors group">
                Learn More 
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={16} />
              </div>
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10 transition-opacity duration-300 pointer-events-none rounded-xl
                ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-20 bg-black/20" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Join Our Community</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/user-login"
              className="group bg-gradient-to-br from-green-400 to-green-600 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-96 relative"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">User Login</h3>
                <p className="text-white/90">Start your recycling journey today!</p>
                <ArrowRight className="absolute bottom-4 right-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              to="/vendor-login"
              className="group bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-96 relative"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Vendor Login</h3>
                <p className="text-white/90">Connect with eco-conscious users!</p>
                <ArrowRight className="absolute bottom-4 right-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">About Us</h3>
              <p className="text-green-100">
                RecycleHub is dedicated to promoting responsible recycling and environmental action through innovative technology and community engagement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-green-100 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-green-100 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-green-100 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="text-green-100 hover:text-white transition-colors flex items-center">
                  <Mail className="inline-block mr-2" size={16} /> info@recyclehub.com
                </li>
                <li className="text-green-100 hover:text-white transition-colors flex items-center">
                  <Phone className="inline-block mr-2" size={16} /> +1 234 567 890
                </li>
                <li className="text-green-100 hover:text-white transition-colors flex items-center">
                  <MapPin className="inline-block mr-2" size={16} /> 123 Green Street, Eco City
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex space-x-4 text-green-100">
                <a href="#" className="hover:text-white transition-colors transform hover:scale-110">
                  <Facebook className="cursor-pointer" size={24} />
                </a>
                <a href="#" className="hover:text-white transition-colors transform hover:scale-110">
                  <Twitter className="cursor-pointer" size={24} />
                </a>
                <a href="#" className="hover:text-white transition-colors transform hover:scale-110">
                  <Instagram className="cursor-pointer" size={24} />
                </a>
                <a href="#" className="hover:text-white transition-colors transform hover:scale-110">
                  <Linkedin className="cursor-pointer" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-center text-green-100">
              <p>&copy; 2024 RecycleHub. All rights reserved.</p>
              <p className="mt-2 text-sm text-green-200">
                Committed to environmental sustainability and community engagement
              </p>
            </div>
            
            {/* Additional Footer Links */}
            <div className="mt-6 flex justify-center space-x-6 text-sm text-green-200">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add animation keyframes for the gradient text
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    animation: gradient 6s ease infinite;
    background-size: 200% 200%;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.5);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 197, 94, 0.7);
  }

  /* Smooth Scroll Behavior */
  html {
    scroll-behavior: smooth;
  }
`;
document.head.appendChild(style);

export default LandingPage;