import { useWeb3 } from '../contexts/Web3Provider'
import React, { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage';

const ConnectWallet = () => {
    const { web3, walletInfo, setWalletInfo } = useWeb3();
    const [showPrivateKey, setShowPrivateKey] = useState(false)
    const [error, setError] = useState('')

    const loadKeystore = async (event: React.FormEvent) => {
        event.preventDefault()
        const password = (document.getElementById('password') as HTMLInputElement).value
        const keystore = (document.getElementById('keystore') as HTMLInputElement).files?.[0]

        if (!keystore) {
            setError('Please select a file')
            return
        }

        if (!web3) {
            setError('Web3 is not initialized')
            return
        }

        const reader = new FileReader()
        reader.onload = async (event) => {
            try {
                if (event.target?.result === null) {
                    throw new Error('Failed to read file')
                }
                const keystore = JSON.parse(event.target?.result as string)
                const wallet = await web3.eth.accounts.decrypt(keystore, password);
                setWalletInfo(wallet)
            } catch (error: any) {
                setError(error.message)
            }
        }
        reader.readAsText(keystore)

    }
    return (
        <>
            {
                walletInfo ? (
                    <>
                        {error && <ErrorMessage error={error} />}
                        <div className="flex flex-col items-center justify-center pt-36 w-screen">
                            <h1 className="text-3xl font-bold">Connected Wallet</h1>
                            <p className="mt-4 w-screen text-center">
                                <strong>Address:</strong> {walletInfo.address}
                                <br />
                                <span onMouseEnter={() => setShowPrivateKey(true)} onMouseLeave={() => setShowPrivateKey(false)}>
                                    <strong>Private Key:</strong> {showPrivateKey ? walletInfo.privateKey : "•".repeat(walletInfo.privateKey.length)}
                                </span>
                            </p>
                            <button
                                className="bg-primary text-white py-2 px-4 rounded-md mt-4"
                                onClick={() => setWalletInfo(undefined)}
                            >
                                Disconnect
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center pt-36">
                            <h1 className="text-3xl font-bold">Connect Wallet</h1>
                        </div>
                        <form onSubmit={loadKeystore} className="flex flex-col items-center mt-8 w-screen">
                            <input id="keystore" type="file" placeholder="Upload Keystore" accept=".json" className="mb-4 inline keystore-upload" />
                            <input id="password" type="password" placeholder="Enter wallet password" className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4" />
                            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md">Connect</button>
                        </form>
                    </>
                )
            }
        </>
    )
}
export default ConnectWallet;
