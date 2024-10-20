import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userType }) => {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={`/${userType}-home`} className="text-white text-xl font-bold">
          Recycle Hub
        </Link>
        <div className="space-x-4">
          <Link to={`/${userType}-profile`} className="text-white hover:text-green-200">
            Profile
          </Link>
          <Link to="/" className="text-white hover:text-green-200">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;