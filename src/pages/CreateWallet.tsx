import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Provider';

const CreateWallet: React.FC = () => {
  const { web3, walletInfo, setWalletInfo } = useWeb3();
  const [password, setPassword] = useState<string>('');
  const [downloading, setDownloading] = useState<boolean>(false);

  const generateWallet = () => {
    const newWallet = web3?.eth.accounts.create();
    if (newWallet) {
      setWalletInfo({ address: newWallet.address, privateKey: newWallet.privateKey });
    }
  };

  const downloadKeystore = async () => {
    if (!walletInfo || !password || !web3) return; // Do nothing if walletInfo, password, or web3 is not set

    setDownloading(true);
    const keystoreJson = await web3.eth.accounts.encrypt(walletInfo.privateKey, password);
    const blob = new Blob([JSON.stringify(keystoreJson)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `keystore-${walletInfo.address}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setDownloading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-36">
        <h1 className="text-4xl font-bold mb-4">Create a New Ethereum (Sepolia) Wallet</h1>
        {walletInfo ? (
          <div className="mt-4">
            <button
                className="bg-primary text-foreground py-1 px-2 rounded inline"
                onClick={() => {
                  setWalletInfo(undefined); 
                }}
                >
                Disconnect{""}
              </button>
              <p className='inline'> 
                {" "}your current wallet before creating a new one.
              </p>
            <p className="mb-2">
              <strong>Address:</strong> {walletInfo.address}
            </p>
            <input
              className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to encrypt your wallet"
            />
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                !password || downloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={downloadKeystore}
              disabled={!password || downloading}
            >
              {downloading ? 'Preparing Download...' : 'Download Keystore File'}
            </button>
          </div>
        ) : (
            <button
            className="bg-primary hover:bg-secondary text-foreground py-1 px-2 rounded"
            onClick={generateWallet}
            disabled={walletInfo !== undefined}
          >
            Generate Wallet
          </button>
        )}
      </div>
    </>
  );
};

export default CreateWallet;
