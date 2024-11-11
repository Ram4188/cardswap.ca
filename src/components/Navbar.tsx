import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Gift, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">GiftSwap.ca</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-indigo-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <User className="h-6 w-6" />
              <span className="text-sm">
                {user ? user.name || 'Account' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}