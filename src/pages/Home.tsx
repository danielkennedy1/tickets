import { useWeb3 } from "../contexts/Web3Provider";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { Link } from "react-router-dom";
function Home() {
  const { walletInfo } = useWeb3();
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-36">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Crypto Event!</h1>
        <p className="text-lg text-center mb-4">Join us for an exciting event showcasing the latest developments in the crypto industry.</p>
        {walletInfo ? (
            <Link to="/buy-tickets" className="bg-primary text-white px-4 py-2 rounded-md mb-4">
              Buy Tickets
            </Link>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </>
  );
}
 export { Home };
