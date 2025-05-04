# LocalPay - Decentralized Transport Payments on Celo

LocalPay is a decentralized application (dApp) built on the Celo blockchain that revolutionizes how people pay for local transportation in emerging markets. By leveraging Celo's fast, low-cost transactions and Mento's stable currencies, LocalPay provides a secure and efficient payment solution for both drivers and passengers.

## Features

- 🚗 **Driver Mode**: Generate QR codes to receive payments in Mento stablecoins
- 👤 **Passenger Mode**: Scan QR codes to make instant payments
- 💱 **Multi-Currency Support**: Support for all Mento stablecoins (cUSD, cEUR, cREAL)
- 📱 **MiniPay Integration**: Seamless integration with MiniPay wallet
- 📃 **Digital Receipts**: Instant transaction confirmations and history
- 🌙 **Dark Mode**: Optimized for all lighting conditions
- ⚡ **Fast Transactions**: Powered by Celo's ultra-fast block times
- 💰 **Low Fees**: Minimal transaction costs on Celo network
- 🔒 **Secure**: Built on Celo's proof-of-stake blockchain
- 📊 **Driver Registry**: Smart contract-based driver verification
- 💳 **Multiple Payment Options**: Support for various Mento stablecoins
- 📱 **Mobile-First Design**: Optimized for smartphone users

## How It Works

### For Drivers
1. **Registration**
   - Connect MiniPay wallet to LocalPay
   - Register as a driver through the smart contract
   - Get verified on the Celo blockchain

2. **Receiving Payments**
   - Generate QR codes with payment details
   - Choose preferred Mento stablecoin
   - Receive instant payments on Celo
   - View real-time transaction history

### For Passengers
1. **Setup**
   - Connect MiniPay wallet
   - Select preferred Mento stablecoin
   - Ensure sufficient balance

2. **Making Payments**
   - Scan driver's QR code
   - Verify payment details
   - Confirm transaction
   - Receive digital receipt

## Smart Contract Architecture

LocalPay uses a secure smart contract system on Celo:

1. **LocalPayRegistry.sol**
   - Driver registration and verification
   - Supported token management
   - Trip recording and statistics
   - Payment verification

2. **Token Integration**
   - Direct integration with Mento stablecoins
   - Support for cUSD, cEUR, and cREAL
   - Secure token transfers
   - Real-time balance updates

## Tech Stack

- **Blockchain**: Celo Network
  - Ultra-fast transactions
  - Low gas fees
  - Proof-of-stake consensus
  - Mobile-first infrastructure

- **Smart Contracts**: Solidity
  - OpenZeppelin standards
  - Mento Protocol integration
  - Secure payment handling

- **Frontend**:
  - React + Vite
  - TypeScript
  - TailwindCSS
  - Zustand for state
  - Viem for blockchain interactions

- **Wallet Integration**:
  - MiniPay
  - Web3 providers
  - Celo wallet support

## Supported Stablecoins

All official Mento stablecoins on Celo:

- **cUSD** (Celo Dollar)
  - Primary stablecoin
  - Global usage
  - 1:1 USD peg

- **cEUR** (Celo Euro)
  - European markets
  - 1:1 EUR peg

- **cREAL** (Celo Real)
  - Brazilian market
  - 1:1 BRL peg

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/local-pay-app.git
cd local-pay-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Connect your MiniPay wallet and switch to Celo Alfajores network

## Security Features

- **Smart Contract Security**:
  - OpenZeppelin standards
  - Role-based access control
  - Secure token handling
  - Automated driver verification

- **Transaction Security**:
  - Celo blockchain verification
  - Multi-signature support
  - Real-time transaction monitoring
  - Fraud prevention mechanisms

- **User Security**:
  - Non-custodial wallet integration
  - Secure QR code generation
  - Transaction amount verification
  - Payment confirmation system

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

MIT

## Support

- [Telegram Community](https://t.me/localpayapp)
- [GitHub Issues](https://github.com/yourusername/local-pay-app/issues)
- [Documentation](https://docs.localpay.app)