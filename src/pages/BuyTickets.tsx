import { ABI, ADDRESS } from '../assets/contract';
import { useWeb3 } from '../contexts/Web3Provider';
import { Link } from "react-router-dom";
import { useState } from 'react';

function BuyTickets() {
  const { web3, walletInfo } = useWeb3();
  const [loading, setLoading] = useState(false);

  const buyTickets = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!web3) {
      alert('Web3 is not initialized.');
      return;
    }
    if (!walletInfo) {
      alert('Connect your wallet first.');
      return;
    }
    const contract = new web3.eth.Contract(ABI as any, ADDRESS);
    const numberOfTickets = parseInt(event.currentTarget.amount.value);
    const value = numberOfTickets * 100; // 100 Wei per ticket hardcoded
    const encodedABI = contract.methods.buyTickets(walletInfo.address, numberOfTickets).encodeABI();
    const tx = {
      from: walletInfo.address,
      to: ADDRESS,
      data: encodedABI,
      value: value,
      gas: 2000000,
      gasPrice: await web3.eth.getGasPrice(),
    };
    console.log(tx)
    const signedTx = await web3.eth.accounts.signTransaction(tx, walletInfo.privateKey);
    setLoading(true);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
    setLoading(false);
    alert('Tickets bought successfully!');
  }
  return (
    <>
      {web3 && walletInfo ? (
        <>
          <h1>
            Ticket price: 100 Wei
          </h1>
          <form onSubmit={buyTickets}>
            <h1>
              Buy Tickets
            </h1>
            <input name="amount" type="number" placeholder="Number of tickets" />
            <button type="submit">
              Buy
            </button>
          </form>
          {loading && <h1>Loading...</h1>}
        </>
      ) : (
      <>
        <h1>
          No Wallet Connected
        </h1>
        <button>
          <Link to="/connect-wallet">Connect Wallet</Link>
        </button>
      </>
      )}
    </>
  )
}
export { BuyTickets };
