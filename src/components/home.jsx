import React, { useState, useEffect } from 'react';
import { Recycle, TreePine, Leaf, Box, LogOut } from 'lucide-react';

const UserHome = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [itemCategory, setItemCategory] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [number,setnumber]=useState(null);
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'form'

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const categories = [
    'Paper', 'Plastic', 'Glass', 'Metal', 'Electronics', 
    'Furniture', 'Clothing', 'Books', 'Others'
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear local storage, redirect to login page, etc.
    window.location.href = '/login'; // or use your routing method
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    setNotification({ type: 'success', message: 'Item deleted successfully' });
  };

  const markAsRecycled = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: 'recycled' } : item
    ));
    setNotification({ type: 'success', message: 'Item marked as recycled' });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: itemName,
      description: itemDescription,
      category: itemCategory,
      city: selectedCity,
      image: imagePreview,
      contact_number:number,
      createdAt: new Date().toISOString(),
      status: 'available'
    };
    setItems([newItem, ...items]);
    setNotification({ type: 'success', message: 'Item added successfully' });
    // Reset form fields
    setItemName('');
    setItemDescription('');
    setItemCategory('');
    setSelectedCity('');
    setImagePreview(null);
    setnumber(null);
    setActiveTab('items');
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
              {i % 4 === 0 && <Recycle size={24} className="text-green-600" />}
              {i % 4 === 1 && <TreePine size={24} className="text-green-600" />}
              {i % 4 === 2 && <Leaf size={24} className="text-green-600" />}
              {i % 4 === 3 && <Box size={24} className="text-green-600" />}
            </div>
          ))}
        </div>
      </div>
      
      {/* Notification Toast - Added animation classes */}
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Recycle className="mr-2" /> Recycle Hub
            </h1>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('items')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'items' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  View Items
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'form' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  List New Item
                </button>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Rest of your existing code remains the same */}
          {activeTab === 'items' ? (
            <>
              {/* Search and Sort Controls */}
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
                      <p className="text-sm text-gray-500 mb-2">Contact: {item.contact_number}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          className={`px-3 py-1 rounded-full transition-colors ${
                            item.status === 'recycled'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                          }`}
                          onClick={() => markAsRecycled(item.id)}
                        >
                          {item.status === 'available' ? 'Mark as Recycled' : 'Recycled ✓'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Form section remains the same */}
              <form onSubmit={handleItemSubmit} className="space-y-4">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    id="itemDescription"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    id="itemCategory"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    id="itemImage"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
                  )}
                </div>
                <div>
  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
  <input
    type="tel"
    id="phoneNumber"
    value={number}
    onChange={(e) => setnumber(e.target.value)}
    className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
    required
    placeholder="Enter your phone number"
  />
 </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  List Item
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 15s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .scale-102 {
          transform scale(1.02);
        }

        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fadeOut {
          animation: fadeOut 3s forwards;
        }
      `}</style>
    </div>
  );
};

export default UserHome;