import React from 'react';
import { GiftCard } from '../types';
import { useStore } from '../store/useStore';

interface GiftCardGridProps {
  cards: GiftCard[];
}

export default function GiftCardGrid({ cards }: GiftCardGridProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105">
          <div className="relative h-48">
            <img
              src={card.image}
              alt={card.brand}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {card.discount}% OFF
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {card.brand}
            </h3>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500">Face Value</p>
                <p className="text-lg font-bold">${card.value}</p>
              </div>
              <div>
                <p className="text-gray-500">Selling Price</p>
                <p className="text-lg font-bold text-indigo-600">
                  ${card.sellingPrice}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => addToCart({ ...card, quantity: 1 })}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
