import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import { ABI, ADDRESS } from '../assets/contract';
import ConnectWalletButton from '../components/ConnectWalletButton';

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
      setEthBalance(balanceInWei.toString());
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
        setTicketBalance(result.toString());
      });
  }

  const getBalances = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await getTicketsBalance();
    await checkEthBalance();
  }

  return (
    <div className="flex flex-col items-center justify-center pt-36">
      <h1 className="text-4xl font-bold mb-4">Check My Balance</h1>
      {walletInfo ? (
        <>
          <p className="mb-2">Wallet Address: {walletInfo.address}</p>
          <form onSubmit={getBalances}>
            <button
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={loading}>
              {loading ? 'Loading...' : 'Check Balance'}
            </button>
          </form>
          {ethBalance && (
        <>
          <p>Ethereum (Sepolia) Balance: {ethBalance} Wei</p>
          <p>Ticket Balance: {ticketBalance}</p>
        </>
      )}
        </>

      ) : (
        <>
          <p className="mb-2">Connect your wallet to check your balance.</p>
          <ConnectWalletButton />
        </>
      )}

    </div>
  );
};

export { CheckBalance };
