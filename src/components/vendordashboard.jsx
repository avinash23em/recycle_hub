import React, { useState } from 'react';
import { Recycle, TreePine, Leaf, Box, Phone, LogOut } from 'lucide-react';

const VendorHome = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [cities] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const sampleItems = [
    {
      _id: '1',
      name: 'Recycled Plastic Bottles',
      description: 'Variety of recycled plastic bottles in different colors and sizes',
      category: 'Plastic',
      image: 'https://via.placeholder.com/300x200',
      createdAt: '2023-04-01',
      city: 'Delhi',
      contact_number: '1234567890'
    },
    {
      _id: '2',
      name: 'Upcycled Cardboard Furniture',
      description: 'Unique and eco-friendly cardboard furniture pieces',
      category: 'Furniture',
      image: 'https://via.placeholder.com/300x200',
      createdAt: '2023-03-15',
      city: 'Mumbai',
      contact_number: '0987654321'
    },
    // Add more sample items here
  ];

  const getFilteredAndSortedItems = () => {
    let filteredItems = sampleItems.filter(item =>
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
    localStorage.removeItem('token');
    window.location.href = '/vendor-login';
  };

  const handleContactUser = (itemId) => {
    // This is a placeholder. You can add your own logic here
    console.log('Contacting user for item:', itemId);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* ... (keep the existing animated background code) */}
      </div>

      <div className="container mx-auto p-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Recycle Hub</h1>
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="nameAsc">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFilteredAndSortedItems().map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-102 group">
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

      <style jsx global>
        {`
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
        `}
      </style>
    </div>
  );

  function handleCityChange(e) {
    setSelectedCity(e.target.value);
  }
};

export default VendorHome;