import { render } from '@testing-library/react';
import { Web3Provider, WalletInfo, Web3Context } from '../contexts/Web3Provider';
import { BrowserRouter } from 'react-router-dom'

export const renderWithDefaultContext = (component: JSX.Element) => {
    return render(
        <Web3Provider>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Web3Provider>
    );
}

export const renderWithWalletInfo = (component: JSX.Element, walletInfo: WalletInfo) => {
    return render(
        <Web3Context.Provider value={{ web3: undefined, isLoading: false, walletInfo, setWalletInfo: () => {}}}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Web3Context.Provider>
    );
}
