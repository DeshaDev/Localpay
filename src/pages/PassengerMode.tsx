import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Send } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface QRPaymentData {
  address: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
}

const PassengerMode: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, selectedStablecoin, sendPayment } = useUserStore();
  const [scanned, setScanned] = useState(false);
  const [paymentData, setPaymentData] = useState<QRPaymentData | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Force connect if not connected
  React.useEffect(() => {
    const { connect } = useUserStore.getState();
    if (!isConnected) {
      connect();
    }
  }, [isConnected]);

  const handleScan = () => {
    setError(null);
    // In a real app, this would use the device camera to scan a QR code
    // For this demo, we'll simulate a successful scan with mock data
    setTimeout(() => {
      const mockPaymentData: QRPaymentData = {
        address: `0x${Array.from({length: 40}, () => 
          Math.floor(Math.random() * 16).toString(16)).join('')}`,
        amount: Math.floor(Math.random() * 200) + 50, // Random amount between 50-250
        currency: selectedStablecoin.symbol,
        description: 'Transport fare from City Center to Westlands',
        timestamp: new Date().toISOString()
      };
      
      setPaymentData(mockPaymentData);
      setScanned(true);
    }, 1500);
  };

  const handleSendPayment = async () => {
    if (!paymentData) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const amount = customAmount || paymentData.amount.toString();
      
      // Send payment using the store's sendPayment function
      const success = await sendPayment(
        paymentData.address,
        amount,
        paymentData.description
      );
      
      if (success) {
        // Navigate to confirmation page
        navigate('/payment-confirmation', { 
          state: { 
            success: true,
            amount,
            recipient: paymentData.address,
            description: paymentData.description
          } 
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold mb-2">Passenger Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Scan the driver's QR code to make a payment
        </p>
      </section>

      {!scanned ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-6">
            <div className="flex flex-col items-center">
              <ScanLine size={64} className="text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Scan the driver's QR code to pay
              </p>
              <p className="text-sm text-gray-500">
                Align the QR code within the camera frame
              </p>
            </div>
          </div>
          
          <button
            onClick={handleScan}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
          >
            Scan QR Code
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm truncate">
                  {paymentData?.address}
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  {paymentData?.description}
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount ({selectedStablecoin.symbol})
              </label>
              
              {paymentData?.amount ? (
                <input
                  type="number"
                  id="amount"
                  value={customAmount || paymentData.amount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700"
                />
              ) : (
                <input
                  type="number"
                  id="amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700"
                  required
                />
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSendPayment}
            disabled={isProcessing || (!paymentData?.amount && !customAmount)}
            className={`w-full py-3 flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-lg font-medium transition-colors
              ${(isProcessing || (!paymentData?.amount && !customAmount)) 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:bg-emerald-600'}`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Payment
              </>
            )}
          </button>
        </div>
      )}
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-4">
        <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Safety Tip</h3>
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Always verify the payment details and recipient address before sending money. 
          Never share your private keys with anyone.
        </p>
      </div>
    </div>
  );
};

export default PassengerMode;