import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const VendorProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cities] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);

  useEffect(() => {
    
    const vendorData = JSON.parse(localStorage.getItem('vendorData')) || {};
    setCompanyName(vendorData.companyName || '');
    setEmail(vendorData.email || '');
    setPhone(vendorData.phone || '');
    setAddress(vendorData.address || '');
    setCity(vendorData.city || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd save this to the backend
    const vendorData = { companyName, email, phone, address, city };
    localStorage.setItem('vendorData', JSON.stringify(vendorData));
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="vendor" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Vendor Profile</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;