import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft, Share } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface PaymentState {
  success: boolean;
  amount: string;
  recipient: string;
  description: string;
}

const PaymentConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedStablecoin } = useUserStore();
  const state = location.state as PaymentState;

  // Redirect if accessed directly without state
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { success, amount, recipient, description } = state;
  const transactionId = `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = new Date().toLocaleString();

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    alert(`Receipt shared for payment of ${amount} ${selectedStablecoin.symbol}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="text-center pb-2">
        <h1 className="text-2xl font-bold mb-2">Payment {success ? 'Successful' : 'Failed'}</h1>
      </section>

      <div className={`rounded-xl p-6 shadow-sm ${
        success 
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800' 
          : 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800'
      }`}>
        <div className="flex flex-col items-center mb-6">
          {success ? (
            <CheckCircle size={64} className="text-green-500 mb-2" />
          ) : (
            <XCircle size={64} className="text-red-500 mb-2" />
          )}
          <h2 className={`text-xl font-semibold ${
            success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {success ? 'Payment Complete' : 'Payment Failed'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-1">
            {success 
              ? 'Your payment has been processed successfully' 
              : 'There was an error processing your payment'}
          </p>
        </div>

        {success && (
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Amount</span>
              <span className="font-semibold">
                {amount} {selectedStablecoin.symbol}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Description</span>
              <span className="font-medium">{description}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Recipient</span>
              <span className="font-medium text-sm">
                {recipient.slice(0, 6)}...{recipient.slice(-4)}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
              <span className="font-medium text-sm">{transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Date & Time</span>
              <span className="font-medium">{timestamp}</span>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Home
          </Link>
          
          {success && (
            <button
              onClick={handleShare}
              className="flex-1 py-3 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              <Share size={18} />
              Share Receipt
            </button>
          )}
        </div>
      </div>

      {success && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Payment Complete</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Your digital receipt has been saved and can be found in your transaction history.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;