import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';

const CheckBalance: React.FC = () => {
  const { web3, walletInfo } = useWeb3();
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkBalance = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!web3) {
      alert('Web3 is not initialized.');
      return;
    }
    if (!walletInfo) {
      alert('Connect your wallet first.');
      return;
    }
    try {
      setLoading(true);
      const balanceInWei = await web3.eth.getBalance(walletInfo.address);
      const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
      setBalance(balanceInEth);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setLoading(false);
      alert('Failed to fetch balance. Make sure the address is correct.');
    }
  };

  return (
    <div>
      <h1>Check My Balance</h1>
      <form onSubmit={checkBalance}>
       <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Check Balance'}
        </button>
      </form>
      {balance && (
        <p>Balance: {balance} ETH</p>
      )}
    </div>
  );
};

export { CheckBalance };
