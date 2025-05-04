import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { stablecoins } from '../constants/stablecoins';

const Settings: React.FC = () => {
  const { role, setRole, selectedStablecoin, setStablecoin } = useUserStore();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences
        </p>
      </section>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            Account
          </h2>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-1">
            <span className="font-medium">Current Mode</span>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Set your default user role
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setRole('passenger')}
              className={`py-2 px-4 rounded-lg text-center transition-colors ${
                role === 'passenger'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Passenger
            </button>
            <button
              onClick={() => setRole('driver')}
              className={`py-2 px-4 rounded-lg text-center transition-colors ${
                role === 'driver'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Driver
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            Currency
          </h2>
        </div>

        <div>
          {stablecoins.map((coin) => (
            <button
              key={coin.id}
              onClick={() => setStablecoin(coin)}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedStablecoin.id === coin.id
                  ? 'bg-gray-50 dark:bg-gray-700'
                  : ''
              } ${
                coin.id !== stablecoins[stablecoins.length - 1].id
                  ? 'border-b border-gray-200 dark:border-gray-700'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">{coin.icon}</div>
                <div>
                  <span className="font-medium">{coin.symbol}</span>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {coin.name}
                  </div>
                </div>
              </div>

              {selectedStablecoin.id === coin.id && (
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            Support
          </h2>
        </div>

        <div>
          <button className="w-full flex items-center justify-between p-4 text-left border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <span>Help Center</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 text-left border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <span>Contact Support</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700">
            <span>Privacy Policy</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>LocalPay v0.1.0</p>
        <p>© 2025 LocalPay. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Settings;