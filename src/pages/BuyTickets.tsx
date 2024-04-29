import { ABI, ADDRESS } from '../assets/contract';
import { useWeb3 } from '../contexts/Web3Provider';
import { useState } from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';
import ErrorMessage from '../components/ErrorMessage';

function BuyTickets() {
    const { web3, walletInfo } = useWeb3();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const buyTickets = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!web3) {
            setError('Web3 is not initialized.');
            return;
        }
        if (!walletInfo) {
            setError('Connect your wallet first.');
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
        const signedTx = await web3.eth.accounts.signTransaction(tx, walletInfo.privateKey);
        setLoading(true);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '')
        .catch((error) => {
            setError((error as any).message);
        });
        alert('Tickets bought successfully!');
        setLoading(false);
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center pt-36">
                {error && <ErrorMessage error={error} />}
                {web3 && walletInfo ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">
                            Ticket price: 100 Wei
                        </h1>
                        <form onSubmit={buyTickets} className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold mb-4">
                                Buy Tickets
                            </h1>
                            <input name="amount" type="number" placeholder="Number of tickets" className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4" />
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                                Buy
                            </button>
                        </form>
                        {loading && <h1 className="text-xl font-bold mt-4">Loading...</h1>}
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold mb-4">No Wallet Connected</h1>
                        <p className="mb-2">Connect your wallet to buy tickets.</p>
                        <ConnectWalletButton />
                    </>
                )}
            </div>
        </>
    )
}
export { BuyTickets };
