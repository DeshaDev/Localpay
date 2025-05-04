import React from 'react';
import { Link } from 'react-router-dom';
import { Car, User, History, Settings, ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import WalletConnect from '../components/WalletConnect';

const Home: React.FC = () => {
  const { isConnected, role, balance, selectedStablecoin } = useUserStore();

  const menuItems = [
    {
      title: 'Driver Mode',
      description: 'Generate QR code to receive payments',
      icon: <Car size={24} className="text-emerald-500" />,
      path: '/driver',
      role: 'driver',
    },
    {
      title: 'Passenger Mode',
      description: 'Scan & pay for your ride',
      icon: <User size={24} className="text-blue-500" />,
      path: '/passenger',
      role: 'passenger',
    },
    {
      title: 'Transaction History',
      description: 'View your payment history',
      icon: <History size={24} className="text-purple-500" />,
      path: '/history',
      role: 'both',
    },
    {
      title: 'Settings',
      description: 'Currency & account preferences',
      icon: <Settings size={24} className="text-gray-500" />,
      path: '/settings',
      role: 'both',
    },
  ];

  const filteredMenu = menuItems.filter(
    item => item.role === 'both' || item.role === role
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Welcome to LocalPay</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fast, secure payments for local transportation
        </p>
      </section>

      {!isConnected ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-3">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your MiniPay wallet to start using LocalPay
          </p>
          <div className="flex justify-center">
            <WalletConnect />
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-md text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/80 font-medium">Your Balance</span>
              <span className="text-white/80">{selectedStablecoin.icon} {selectedStablecoin.symbol}</span>
            </div>
            <div className="text-3xl font-bold mb-2">{balance}</div>
            <div className="text-white/80">
              Current mode: <span className="capitalize">{role}</span>
            </div>
          </div>

          <nav>
            <ul className="space-y-3">
              {filteredMenu.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Home;