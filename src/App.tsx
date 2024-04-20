import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Web3Provider } from './contexts/Web3Provider'

import { Home } from './pages/Home'
import CreateWallet from './pages/CreateWallet'
import { CheckBalance } from './pages/CheckBalance'
import { BuyTickets } from './pages/BuyTickets'
import { TransferTickets } from './pages/TransferTickets'
import NavBar from './components/NavBar'

import './App.css'

function App() {
  return (
    <>
      <Web3Provider>
        <BrowserRouter>
         <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-wallet" element={<CreateWallet/>} />
            <Route path="/check-balance" element={<CheckBalance/>} />
            <Route path="/buy-tickets" element={<BuyTickets/>} />
            <Route path="/transfer-tickets" element={<TransferTickets/>} />
          </Routes>
        </BrowserRouter>
      </Web3Provider>
   </>
  )
}

export default App
