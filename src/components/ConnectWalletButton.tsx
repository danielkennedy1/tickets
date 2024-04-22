import { Link } from 'react-router-dom';

const ConnectWalletButton = () => {
    return (
        <button className="bg-primary hover:bg-secondary text-foreground py-1 px-2 rounded">
          <Link to="/connect-wallet">Connect Wallet</Link>
        </button>
    )
}
export default ConnectWalletButton;