import { create } from 'zustand';
import { Stablecoin, getDefaultStablecoin } from '../constants/stablecoins';
import { createPublicClient, http, parseEther, formatEther, encodeFunctionData } from 'viem';
import { celoAlfajores } from 'viem/chains';

// Initialize public client for read operations
const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http('https://alfajores-forno.celo-testnet.org')
});

// Token ABI for ERC20 operations
const tokenABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  }
];

interface Transaction {
  id: string;
  date: Date;
  amount: string;
  stablecoin: Stablecoin;
  sender: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

export type UserRole = 'passenger' | 'driver';

interface UserState {
  isConnected: boolean;
  walletAddress: string;
  balance: string;
  role: UserRole;
  selectedStablecoin: Stablecoin;
  transactions: Transaction[];
  connect: () => Promise<void>;
  disconnect: () => void;
  setRole: (role: UserRole) => void;
  setStablecoin: (stablecoin: Stablecoin) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  sendPayment: (recipient: string, amount: string, description?: string) => Promise<boolean>;
  updateBalance: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  isConnected: false,
  walletAddress: '',
  balance: '0',
  role: 'passenger',
  selectedStablecoin: getDefaultStablecoin(),
  transactions: [],
  
  connect: async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install a Web3 wallet like MiniPay');
      }

      // Request account access
      let accounts;
      try {
        accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
      } catch (error: any) {
        if (error.code === 4001) {
          throw new Error('Please connect your wallet to continue');
        }
        throw error;
      }
      
      const address = accounts[0];
      
      // Request network switch to Celo Alfajores
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaef3' }], // 44787 in hex
        });
      } catch (switchError: any) {
        // Handle user rejection
        if (switchError.code === 4001) {
          throw new Error('Please switch to the Celo Alfajores network to continue');
        }
        
        // If the network doesn't exist, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaef3',
                chainName: 'Celo Alfajores Testnet',
                nativeCurrency: {
                  name: 'Alfajores Celo',
                  symbol: 'A-CELO',
                  decimals: 18
                },
                rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
                blockExplorerUrls: ['https://alfajores.celoscan.io']
              }]
            });
          } catch (addError: any) {
            if (addError.code === 4001) {
              throw new Error('Please add and switch to the Celo Alfajores network to continue');
            }
            throw addError;
          }
        } else {
          throw switchError;
        }
      }
      
      set({ 
        isConnected: true, 
        walletAddress: address,
      });

      // Update balance after connecting
      await get().updateBalance();
    } catch (error: any) {
      set({ 
        isConnected: false, 
        walletAddress: '',
        balance: '0'
      });
      throw error;
    }
  },

  disconnect: () => {
    set({ 
      isConnected: false, 
      walletAddress: '',
      balance: '0'
    });
  },

  setRole: (role) => set({ role }),
  
  setStablecoin: async (stablecoin) => {
    set({ selectedStablecoin: stablecoin });
    await get().updateBalance();
  },

  addTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      date: new Date()
    };
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions]
    }));
  },

  updateBalance: async () => {
    try {
      const { walletAddress, selectedStablecoin } = get();
      if (!walletAddress) return;

      // Get token balance using Viem
      try {
        const balance = await publicClient.readContract({
          address: selectedStablecoin.address,
          abi: tokenABI,
          functionName: 'balanceOf',
          args: [walletAddress as `0x${string}`]
        });
        
        // Only update balance if we got a valid response
        if (balance !== undefined && balance !== null) {
          set({ balance: formatEther(balance) });
        } else {
          console.warn('Contract returned no data for balance');
          set({ balance: '0' });
        }
      } catch (contractError) {
        console.warn('Failed to read contract balance:', contractError);
        set({ balance: '0' });
      }
    } catch (error) {
      console.error('Failed to update balance:', error);
      set({ balance: '0' });
    }
  },

  sendPayment: async (recipient: string, amount: string, description?: string) => {
    try {
      const { selectedStablecoin, walletAddress, addTransaction, updateBalance } = get();
      
      if (!walletAddress || !recipient) {
        throw new Error('Invalid sender or recipient address');
      }

      // Create the transaction data for token transfer
      const data = encodeFunctionData({
        abi: tokenABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, parseEther(amount)]
      });

      // Send the transaction
      try {
        const tx = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: walletAddress,
            to: selectedStablecoin.address,
            data
          }]
        });
        
        // Wait for transaction confirmation
        await publicClient.waitForTransactionReceipt({ hash: tx });
        
        // Add transaction to history
        addTransaction({
          amount,
          stablecoin: selectedStablecoin,
          sender: walletAddress,
          recipient,
          status: 'completed',
          description: description || 'Payment sent'
        });
        
        // Update balance after successful payment
        await updateBalance();
        
        return true;
      } catch (txError: any) {
        // Handle user rejection of transaction
        if (txError.code === 4001) {
          throw new Error('Transaction was cancelled');
        }
        throw txError;
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      
      // Add failed transaction to history
      get().addTransaction({
        amount,
        stablecoin: get().selectedStablecoin,
        sender: get().walletAddress,
        recipient,
        status: 'failed',
        description: error.message || 'Payment failed'
      });
      
      throw error;
    }
  }
}));