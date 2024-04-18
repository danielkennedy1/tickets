import { Link } from 'react-router-dom';

function NavBar() {
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
      </ul>
    </nav>
  )
}

export default NavBar;
