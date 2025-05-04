import React from 'react';
import { Wallet } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const WalletConnect: React.FC = () => {
  const { isConnected, connect, disconnect, walletAddress } = useUserStore();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-full transition-colors"
    >
      <Wallet size={18} />
      <span>
        {isConnected 
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : 'Connect Wallet'}
      </span>
    </button>
  );
};

export default WalletConnect;