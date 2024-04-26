import { useWeb3 } from '../contexts/Web3Provider';
import { useState } from 'react';
import { ABI, ADDRESS } from '../assets/contract';
import ConnectWalletButton from '../components/ConnectWalletButton';

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
        const encodedABI = contract.methods.refundTickets(numberOfTickets).encodeABI();
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
            <div className="flex flex-col items-center justify-center pt-36">
                {web3 && walletInfo ? (
                    <>
                        <form onSubmit={refundTickets} className="mt-4">
                            <h1 className="text-2xl font-bold">
                                Refund Tickets
                            </h1>
                            <p>
                                {walletInfo.address}
                            </p>
                            <input name="amount" type="number" placeholder="Number of tickets" className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4" />
                            <button type="submit" className="mt-2 px-4 py-2 bg-primary text-white rounded">
                                Refund
                            </button>
                        </form>
                        {loading && <h1 className="mt-4">Loading...</h1>}
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold mb-4">No Wallet Connected</h1>
                        <p className="mb-2">Connect your wallet to refund your tickets.</p>
                        <ConnectWalletButton />

                    </>
                )}
            </div>
        </>
    );
}
export { RefundTickets };
