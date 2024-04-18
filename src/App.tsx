import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CreateWallet } from './pages/CreateWallet'
import { CheckBalance } from './pages/CheckBalance'
import { BuyTickets } from './pages/BuyTickets'
import { TransferTickets } from './pages/TransferTickets'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
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
   </>
  )
}

export default App
