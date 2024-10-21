import React, { useState, useEffect } from 'react';
import { Recycle, TreePine, Leaf, Box, Phone, LogOut } from 'lucide-react';
import axios from 'axios';

const VendorHome = () => {
  const [items, setItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setNotification({ type: 'error', message: 'Failed to fetch items' });
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = items.filter(item =>
      (selectedCity === '' || item.city === selectedCity) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (sortBy) {
      case 'newest':
        return filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return filteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'nameAsc':
        return filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return filteredItems.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredItems;
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example: clear token from localStorage, redirect to login page
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleContactUser = async (itemId) => {
    try {
      // This is a placeholder. You might want to implement this differently
      // depending on your backend structure and requirements
      await axios.post(`/api/contact/${itemId}`);
      setNotification({ type: 'success', message: 'Contact request sent successfully' });
    } catch (error) {
      console.error('Error contacting user:', error);
      setNotification({ type: 'error', message: 'Failed to send contact request' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* ... (keep the existing animated background code) */}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform
            ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} 
            text-white animate-fadeIn`}
        >
          {notification.message}
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          {/* ... (keep the existing header and search/filter controls) */}

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFilteredAndSortedItems().map((item) => (
              <div key={item._id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-102 group">
                {item.image && <img src={item.image} alt={item.name} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.description || 'No description provided'}</p>
                  <p className="text-sm text-gray-500">Listed: {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">City: {item.city}</p>
                  <p className="text-sm text-gray-500">Phone: {item.contact_number}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => handleContactUser(item._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                      Contact User
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .animate-float {
          animation: float 15s infinite;
        }

        .scale-102 {
          transform: scale(1.02);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VendorHome;