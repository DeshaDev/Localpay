import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const TransactionHistory: React.FC = () => {
  const { transactions, walletAddress } = useUserStore();
  
  // Generate some mock transactions if there are none
  const allTransactions = transactions.length > 0 ? transactions : [
    {
      id: 'tx-1',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      amount: '75.00',
      stablecoin: { symbol: 'cKES', icon: '🇰🇪', color: '#EF4444' },
      sender: walletAddress,
      recipient: '0x1234567890abcdef1234567890abcdef12345678',
      status: 'completed',
      description: 'Transport fare to Central Business District'
    },
    {
      id: 'tx-2',
      date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      amount: '120.00',
      stablecoin: { symbol: 'cKES', icon: '🇰🇪', color: '#EF4444' },
      sender: '0xabcdef1234567890abcdef1234567890abcdef12',
      recipient: walletAddress,
      status: 'completed',
      description: 'Transport fare payment received'
    },
    {
      id: 'tx-3',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      amount: '50.00',
      stablecoin: { symbol: 'cKES', icon: '🇰🇪', color: '#EF4444' },
      sender: walletAddress,
      recipient: '0x2345678901abcdef2345678901abcdef23456789',
      status: 'completed',
      description: 'Short distance ride'
    }
  ];

  const groupTransactionsByDate = () => {
    const grouped = new Map();
    
    allTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const dateStr = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!grouped.has(dateStr)) {
        grouped.set(dateStr, []);
      }
      
      grouped.get(dateStr).push(transaction);
    });
    
    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate();
  const sortedDates = Array.from(groupedTransactions.keys()).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold mb-2">Transaction History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your payment history and receipts
        </p>
      </section>

      {allTransactions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            No transactions yet
          </p>
          <p className="text-sm text-gray-500">
            Your payment history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map(date => (
            <div key={date}>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {date}
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {groupedTransactions.get(date).map((transaction, index) => {
                  const isOutgoing = transaction.sender === walletAddress;
                  const isLastItem = index === groupedTransactions.get(date).length - 1;
                  
                  return (
                    <div 
                      key={transaction.id}
                      className={`p-4 flex items-center justify-between ${!isLastItem ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isOutgoing 
                            ? 'bg-red-100 dark:bg-red-900/20' 
                            : 'bg-green-100 dark:bg-green-900/20'
                        }`}>
                          {isOutgoing ? (
                            <ArrowUpRight size={20} className="text-red-500" />
                          ) : (
                            <ArrowDownLeft size={20} className="text-green-500" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium">
                            {isOutgoing ? 'Sent' : 'Received'}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`font-semibold ${isOutgoing ? 'text-red-500' : 'text-green-500'}`}>
                            {isOutgoing ? '-' : '+'}{transaction.amount} {transaction.stablecoin.symbol}
                          </p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;