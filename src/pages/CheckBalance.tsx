import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import { ABI, ADDRESS } from '../assets/contract';

const CheckBalance: React.FC = () => {
  const { web3, walletInfo } = useWeb3();
  const [ethBalance, setEthBalance] = useState<string>('');
  const [ticketBalance, setTicketBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkEthBalance = async () => {
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
      setEthBalance(balanceInEth);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setLoading(false);
      alert('Failed to fetch balance. Make sure the address is correct.');
    }
  };

  const getTicketsBalance = async () => {
    if (!web3) {
      alert('Web3 is not initialized.');
      return;
    }

    const contract = new web3.eth.Contract(ABI as any, ADDRESS);
    await contract
      .methods
      .balanceOf(walletInfo?.address)
      .call()
      .then((result: bigint) => {
        console.log(result.toString());
        setTicketBalance(result.toString());
    });
  }

  const getBalances = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await getTicketsBalance();
    await checkEthBalance();
  }

  return (
    <div>
      <h1>Check My Balance</h1>
      <form onSubmit={getBalances}>
       <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Check Balance'}
        </button>
      </form>
      {ethBalance && (
        <>
          <p>Ethereum Balance: {ethBalance} ETH</p>
          <p>Ticket Balance: {ticketBalance}</p>
        </>
      )}
    </div>
  );
};

export { CheckBalance };
