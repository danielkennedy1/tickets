import React, { createContext, useContext, useState, useEffect } from 'react';
import { Web3 } from 'web3';

type WalletInfo = {
  address: string;
  privateKey: string;
};

type Web3ContextType = {
  web3?: Web3;
  isLoading: boolean;
  walletInfo?: WalletInfo;
  setWalletInfo: (walletInfo: WalletInfo) => void;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3>();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | undefined>(undefined);

  useEffect(() => {
    const loadWeb3 = async () => {
      const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/e374c9fa97b845919613c8136a345bac'
      );
      setWeb3(new Web3(provider));
    };
    loadWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, isLoading: !web3, walletInfo, setWalletInfo }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
