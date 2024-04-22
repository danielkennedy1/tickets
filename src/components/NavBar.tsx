import { Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Provider';
import ConnectWalletButton from './ConnectWalletButton';

function NavBar() {
  const { walletInfo, setWalletInfo } = useWeb3();
  return (
    <nav className="top-0 mx-11">
      <ul className="flex flex-row items-center justify-between py-6">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/create-wallet" className="nav-link">Create Wallet</Link>
        </li>
        <li>
          <Link to="/check-balance" className="nav-link">Check Balance</Link>
        </li>
        <li>
          <Link to="/buy-tickets" className="nav-link">Buy Tickets</Link>
        </li>
        <li>
          <Link to="/refund-tickets" className="nav-link">Refund Tickets</Link>
        </li>
        <li>
        {walletInfo ?
          ( 
            <>
                <p className="text-foreground inline">Wallet Address: {walletInfo.address.substring(0, 10)}... </p>
              <button
                className="bg-primary text-foreground py-1 px-2 rounded"
                onClick={() => {
                  setWalletInfo(undefined); 
                }}
                >
                Disconnect
              </button>
            </>
          ) :
          (
            <ConnectWalletButton />
          )
        }
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
