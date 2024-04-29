import { useWeb3 } from '../contexts/Web3Provider';
import { useState } from 'react';
import { ABI, ADDRESS } from '../assets/contract';
import ConnectWalletButton from '../components/ConnectWalletButton';
import ErrorMessage from '../components/ErrorMessage';

function RefundTickets() {
    const { web3, walletInfo } = useWeb3();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const refundTickets = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!web3) {
            setError('Web3 is not initialized.');
            return;
        }
        if (!walletInfo) {
            setError('Connect your wallet first.');
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
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '').then(
            (receipt) => {
                alert('Tickets refunded successfully.');
                console.log(receipt);
            }
        ).catch((error) => {
            setError((error as any).message);
        });
        setLoading(false);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center pt-36">
            {error && <ErrorMessage error={error} />}
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
