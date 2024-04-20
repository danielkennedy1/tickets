import { useWeb3 } from '../contexts/Web3Provider'

const ConnectWallet = () => {
    const { web3, setWalletInfo } = useWeb3();

    const loadKeystore = async (event: React.FormEvent) => {
    event.preventDefault()
    const password = (document.getElementById('password') as HTMLInputElement).value
    const keystore = (document.getElementById('keystore') as HTMLInputElement).files?.[0]

    if (!keystore) {
      alert('Please select a keystore file')
      return
    }

    if (!web3) {
      alert('Web3 is not loaded')
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        if (event.target?.result === null) {
          throw new Error('Failed to read file')
        }
        const keystore = JSON.parse(event.target.result as string)
        const wallet = await web3.eth.accounts.decrypt(keystore, password);
        setWalletInfo(wallet)
      } catch (error: any) {
        alert(error.message)
      }
    }
    reader.readAsText(keystore)

  }
return (
  <>
    <div>
      <h1>Connect Wallet</h1>
    </div>
    <form onSubmit={loadKeystore}>
      <input id="password" type="password" placeholder="Enter wallet password" />
      <label htmlFor="keystore">Upload keystore file:</label>
      <input id="keystore" type="file" placeholder="Upload keystore file" accept=".json"/>
      <button type="submit">Connect</button>
    </form>
  </>
)
}
export default ConnectWallet;
