import React, { useState, useEffect } from 'react';
import { Recycle, TreePine, Leaf, Box, Phone } from 'lucide-react';

const VendorHome = () => {
  const [items, setItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {i % 5 === 0 && <Recycle size={24} className="text-green-600" />}
              {i % 5 === 1 && <TreePine size={24} className="text-green-600" />}
              {i % 5 === 2 && <Leaf size={24} className="text-green-600" />}
              {i % 5 === 3 && <Box size={24} className="text-green-600" />}
              {i % 5 === 4 && <Phone size={24} className="text-green-600" />}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Recycle className="mr-2" /> Vendor Dashboard
            </h1>
          </div>

          {/* Search, Sort, and Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFilteredAndSortedItems().map((item) => (
              <div key={item.id} 
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
                  <p className="text-sm text-gray-500">Phone: {item.phoneNumber}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
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
      `}</style>
    </div>
  );
};

export default VendorHome;
