import React, { useState } from 'react';
import TabContent from '../components/TabContent';

type TabType = 'buy' | 'sell' | 'swap';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('buy');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'buy', label: 'Buy Cards' },
    { id: 'sell', label: 'Sell Cards' },
    { id: 'swap', label: 'Swap Cards' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Save on Your Favorite Canadian Brands
        </h1>
        <p className="text-lg text-gray-600">
          Buy and sell gift cards securely with Canada's trusted exchange platform
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-center space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <TabContent type={activeTab} />
    </div>
  );
}
