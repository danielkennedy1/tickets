import { Link } from 'react-router-dom';
import {useWeb3 } from '../contexts/Web3Provider';

function NavBar() {
  const { walletInfo, setWalletInfo} = useWeb3();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-wallet">Create Wallet</Link>
        </li>
        <li>
          <Link to="/check-balance">Check Balance</Link>
        </li>
        <li>
          <Link to="/buy-tickets">Buy Tickets</Link>
        </li>
        <li>
          <Link to="/transfer-tickets">Transfer Tickets</Link>
        </li>
        {walletInfo && (
          <li>
            <p>Wallet Address: {walletInfo.address} </p>
            <button
              onClick={() => {
                setWalletInfo(undefined);
              }}

            >
              Disconnect
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar;
