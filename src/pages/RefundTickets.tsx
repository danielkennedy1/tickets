import { useWeb3 } from '../contexts/Web3Provider';
import { useState } from 'react';
import { ABI, ADDRESS } from '../assets/contract';
import { Link } from "react-router-dom";

function RefundTickets() {
  const { web3, walletInfo } = useWeb3();
  const [loading, setLoading] = useState(false);

  const refundTickets = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!web3) {
      alert('Web3 is not initialized.');
      return;
    }
    if (!walletInfo) {
      alert('Connect your wallet first.');
      return;
    }
    const contract = new web3.eth.Contract(ABI, ADDRESS);
    const numberOfTickets = parseInt(event.currentTarget.amount.value);
    const encodedABI = contract.methods.refundTicket(numberOfTickets).encodeABI(); // FIXME: renamed refundTicket to refundTickets in contract
    const tx = {
      from: walletInfo.address,
      to: ADDRESS,
      data: encodedABI,
      gas: 2000000,
      gasPrice: await web3.eth.getGasPrice(),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, walletInfo.privateKey);
    setLoading(true);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
    setLoading(false);
    alert('Tickets refunded successfully!');
  }

  return (
    <>
      {web3 && walletInfo ? (
        <>
          <h1>
            Ticket price: 100 Wei
          </h1>
          <form onSubmit={refundTickets}>
            <h1>
              Refund Tickets
            </h1>
            <input name="amount" type="number" placeholder="Number of tickets" />
            <button type="submit">
             Refund 
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
  );
}
export { RefundTickets };
