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
    <div>
      <h1>Create a New Ethereum (Sepolia) Wallet</h1>
      <button onClick={generateWallet} disabled={walletInfo != undefined} >Generate Wallet</button>
      {walletInfo && (
        <div>
          <p><strong>Address:</strong> {walletInfo.address}</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to encrypt your wallet"
          />
          <button onClick={downloadKeystore} disabled={!password || downloading}>
            {downloading ? 'Preparing Download...' : 'Download Keystore File'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
