# Ticketing DApp
## Daniel Kennedy 22340017
## CS4455 - Ethical Hacking and security

## Running instructions
(Requires Node.js and npm installed)

Install dependencies
```bash
npm install
```

Run the development server
```bash
npm run dev
```

## Src folder structure
```bash
src/
│   App.tsx
│   main.tsx
│
├───assets
│       contract.ts # Stores ABI and Address of contract
│
├───components
│       ErrorMessage.tsx       
│       NavBar.test.tsx # Test wallet connection state awareness of navbar
│       NavBar.tsx # Top of screen across site, common to all pages
│
├───contexts
│       Web3Provider.tsx # Context provider for web3 instance and wallet details
│
├───pages
│       BuyTickets.tsx # Page for buying tickets
│       CheckBalance.test.tsx # Test for CheckBalance page (+ Role-based access unit tests)
│       CheckBalance.tsx # Patron: check balance, Organiser: check distribution, Usher: accept tickets
│       ConnectWallet.tsx # Page for connecting wallet from keystore file
│       CreateWallet.test.tsx # Test for CreateWallet page
│       CreateWallet.tsx # Page for creating wallet
│       Home.tsx # Home page
│       NotFound.tsx # 404 page
│       RefundTickets.tsx # Page for refunding tickets back to organiser
│
└───test
        testutils.tsx # Utility functions for testing (State and context injection (instead of mocking))
```
