import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateWallet from '../pages/CreateWallet';
import { Web3Provider } from '../contexts/Web3Provider';

const renderWithContext = (component: JSX.Element) => {
    return render(
        <Web3Provider>
            {component}
        </Web3Provider>
    );
}

test('CreateWallet generates wallet and displays wallet address', async () => {
    // Given
    const { container } = renderWithContext(<CreateWallet />);
    const walletRegex = /0x[a-fA-F0-9]{40}/;

    // When
    fireEvent.click(screen.getByText('Generate Wallet'));

    // Then
    expect(screen.getByText(/Address:/i)).toBeInTheDocument();
    expect(container.innerHTML).toMatch(walletRegex);
});
