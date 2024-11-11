import React from 'react';
import { GiftCard } from '../types';
import GiftCardGrid from './GiftCardGrid';

interface TabContentProps {
  type: 'buy' | 'sell' | 'swap';
}

const SAMPLE_BUY_CARDS: GiftCard[] = [
  {
    id: '1',
    brand: 'Tim Hortons',
    value: 50,
    sellingPrice: 45,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1630341000541-e6f8ea206b8e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    brand: 'Canadian Tire',
    value: 100,
    sellingPrice: 90,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=400',
  },
];

const SAMPLE_SELL_CARDS: GiftCard[] = [
  {
    id: '3',
    brand: 'Hudson\'s Bay',
    value: 200,
    sellingPrice: 170,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=400',
  },
];

const SAMPLE_SWAP_CARDS: GiftCard[] = [
  {
    id: '4',
    brand: 'Walmart',
    value: 150,
    sellingPrice: 135,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400',
  },
];

export default function TabContent({ type }: TabContentProps) {
  const getContent = () => {
    switch (type) {
      case 'buy':
        return {
          title: 'Buy Gift Cards',
          description: 'Save money on your favorite brands with discounted gift cards',
          cards: SAMPLE_BUY_CARDS,
        };
      case 'sell':
        return {
          title: 'Sell Gift Cards',
          description: 'Turn your unused gift cards into cash',
          cards: SAMPLE_SELL_CARDS,
        };
      case 'swap':
        return {
          title: 'Swap Gift Cards',
          description: 'Exchange your gift cards for ones you\'ll actually use',
          cards: SAMPLE_SWAP_CARDS,
        };
    }
  };

  const content = getContent();

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
        <p className="text-lg text-gray-600">{content.description}</p>
      </div>
      <GiftCardGrid cards={content.cards} />
    </div>
  );
}