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
        const keystore = JSON.parse(event.target?.result as string)
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
    <div className="flex flex-col items-center justify-center pt-36">
      <h1 className="text-3xl font-bold">Connect Wallet</h1>
    </div>
    <form onSubmit={loadKeystore} className="flex flex-col items-center mt-8">
      <input id="password" type="password" placeholder="Enter wallet password"  className="border bg-background text-foreground border-gray-300 rounded-md px-4 py-2 mb-4" />
      <input id="keystore" type="file" placeholder="Upload Keystore" accept=".json" className="mb-4 inline keystore-upload" />
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md">Connect</button>
    </form>
  </>
)
}
export default ConnectWallet;
