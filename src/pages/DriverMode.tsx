import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const DriverMode: React.FC = () => {
  const { isConnected, walletAddress, selectedStablecoin } = useUserStore();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [refreshQR, setRefreshQR] = useState(0);

  // Force connect if not connected
  useEffect(() => {
    const { connect } = useUserStore.getState();
    if (!isConnected) {
      connect();
    }
  }, [isConnected]);

  const paymentData = JSON.stringify({
    address: walletAddress,
    amount: amount ? parseFloat(amount) : '',
    currency: selectedStablecoin.symbol,
    description: description || 'Transport fare',
    timestamp: new Date().toISOString(),
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const refreshQRCode = () => {
    setRefreshQR(prev => prev + 1);
  };

  const quickAmounts = ['50', '100', '150', '200', '300', '500'];

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold mb-2">Driver Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate a QR code for passengers to scan and pay you
        </p>
      </section>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fare Amount ({selectedStablecoin.symbol})
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className={`px-3 py-1.5 rounded-lg text-sm 
                  ${amount === quickAmount 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {quickAmount}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., City Center to Airport"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg mb-4">
            <QRCode 
              value={paymentData}
              size={200}
              key={refreshQR}
            />
          </div>

          <div className="flex gap-2 mb-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Data
                </>
              )}
            </button>

            <button
              onClick={refreshQRCode}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Have passengers scan this code to pay you {amount ? `${amount} ${selectedStablecoin.symbol}` : 'directly'}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Pro Tip</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Set the amount beforehand to make payment faster for your passengers.
          For variable fares, you can leave the amount empty.
        </p>
      </div>
    </div>
  );
};

export default DriverMode;