import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { ABI, ADDRESS } from '../assets/contract';
import ErrorMessage from '../components/ErrorMessage';

const CheckBalance: React.FC = () => {
    const { web3, walletInfo } = useWeb3();

    enum Role {
        Usher = 'Usher',
        Organiser = 'Organiser',
        Patron = 'Patron',
    }

    // shshshsh
    const [loading, setLoading] = useState<boolean>(false);

    const [contract, setContract] = useState<any>(null);
    const [role, setRole] = useState<Role>(Role.Patron);

    const [ethBalance, setEthBalance] = useState<string>('');
    const [ticketBalance, setTicketBalance] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');
    const [patronAddress, setPatronAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    const getIsUsher = async (contract: any) => {
        await contract.methods.usher().call().then(
            (result: string) => {
                if (walletInfo!.address === result) {
                    setRole(Role.Usher);
                }
            }
        );
    }

    const getIsOrganiser = async (contract: any) => {
        await contract.methods.organiser().call().then(
            (result: string) => {
                if (walletInfo!.address === result) {
                    setRole(Role.Organiser);
                }
            }
        );
    }

    const getTotalSupply = async (contract: any) => {
        await contract.methods.totalSupply().call().then((result: number) => {
            setTotalSupply(result.toString());
        });
    }

    useEffect(() => {
        if (!walletInfo) return;
        if (web3) {
            const contract = new web3.eth.Contract(ABI, ADDRESS);
            setContract(contract);
            getIsUsher(contract);
            getIsOrganiser(contract);
        }
    }, [web3]);

    const checkEthBalance = async (walletAddress: string) => {
        try {
            setLoading(true);
            const balanceInWei = await web3!.eth.getBalance(walletAddress);
            setEthBalance(balanceInWei.toString());
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError((error as any).message);
        }
    };

    const getTicketsBalance = async (walletAddress: string) => {
        setLoading(true)
        await contract
            .methods
            .balanceOf(walletAddress)
            .call()
            .then((result: any) => {
                setTicketBalance(result.toString());
            }).catch((error: any) => {
                setError(error.message);
            });
        setLoading(false)
    }

    const getMyBalances = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await getTicketsBalance(walletInfo!.address);
        await checkEthBalance(walletInfo!.address);
    }

    const getPatronBalance = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPatronAddress((event.target as any).address.value.trim())
        getTicketsBalance((event.target as any).address.value.trim())
    }

    const getTicketSales = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        await getTotalSupply(contract)
        await getTicketsBalance(walletInfo!.address)
        setLoading(false)
    }

    const acceptTickets = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const address = (event.target as any).address.value.trim()
        const amount = parseInt((event.target as any).amount.value)
        const encodedABI = contract.methods.acceptTickets(address, amount).encodeABI();
        const tx = {
            from: walletInfo!.address,
            to: ADDRESS,
            data: encodedABI,
            gas: 2000000,
            gasPrice: await web3!.eth.getGasPrice(),
        };
        const signedTx = await web3!.eth.accounts.signTransaction(tx, walletInfo!.privateKey);
        setLoading(true)
        await web3!.eth.sendSignedTransaction(signedTx.rawTransaction || '').catch(
            (error) => { 
                setError((error as any).message) }
        );
        setLoading(false)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center pt-36">
                {error && ( <ErrorMessage error={error} /> )}
                {walletInfo ? (
                    <>
                        {role === Role.Patron ? (
                            <>
                                <h1 className="text-4xl font-bold mb-4">Check My Balance</h1>
                                <p className="mb-2">Wallet Address: {walletInfo.address}</p>
                                <form onSubmit={getMyBalances}>
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
                        ) : null}
                        {role === Role.Usher ? (
                            <>
                                <h1 className="text-4xl font-bold mb-4">Usher Panel</h1>
                                <h1 className="text-xl font-bold mb-4">Check address balance</h1>
                                <form onSubmit={getPatronBalance}>
                                    <input
                                        name="address"
                                        type="text"
                                        placeholder="Enter address"
                                        className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4 block w-fit-content"
                                    />
                                    <button
                                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Check Balance'}
                                    </button>
                                </form>
                                {ticketBalance && (
                                    <>
                                        <p>Ticket Balance of patron: {ticketBalance}</p>
                                        <p>Accept tickets</p>
                                        <form onSubmit={acceptTickets}>
                                            <input
                                                name="amount"
                                                type="number"
                                                placeholder="Number of tickets to accept"
                                                className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4"
                                            />
                                            <input
                                                name="address"
                                                type="hidden"
                                                value={patronAddress}
                                            />
                                            <button
                                                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? 'Loading...' : 'Accept Tickets'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </>
                        ) : null}
                        {role === Role.Organiser ? (
                            <>
                                <h1 className="text-4xl font-bold mb-4">Organiser Panel</h1>
                                <h1 className="text-xl font-bold mb-4">Check Ticket sales</h1>

                                <form onSubmit={getTicketSales}>
                                    <button
                                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                        disabled={loading}>
                                        {loading ? 'Loading...' : 'Check Ticket Sales'}
                                    </button>
                                </form>

                                {totalSupply && ticketBalance && (
                                    <>
                                        <p> You have sold {parseInt(totalSupply) - parseInt(ticketBalance)} of {totalSupply} tickets</p>
                                    </>
                                )}

                            </>
                        ) : null}
                    </>

                ) : (
                    <>
                        <h1 className="text-4xl font-bold mb-4">No Wallet Connected</h1>
                        <p className="mb-2">Connect your wallet to check your balance.</p>
                        <ConnectWalletButton />
                    </>
                )}
            </div>
        </>
    )
}

export { CheckBalance };
