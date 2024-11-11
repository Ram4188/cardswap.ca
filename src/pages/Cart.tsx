import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CartItem } from '../types';

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const navigate = useNavigate();

  const updateQuantity = useStore((state) => ({
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
  }));

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity.removeFromCart(item.id);
    } else {
      updateQuantity.addToCart({ ...item, quantity: newQuantity });
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm mb-4"
              >
                <img
                  src={item.image}
                  alt={item.brand}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.brand}</h3>
                  <p className="text-gray-600">Face Value: ${item.value}</p>
                  <p className="text-indigo-600 font-semibold">
                    ${item.sellingPrice}
                  </p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <p className="font-semibold">
                    ${(item.sellingPrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}