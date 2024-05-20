import '@testing-library/jest-dom';
import NavBar from './NavBar';
import { renderWithDefaultContext, renderWithWalletInfo } from '../test/testutils';
import ConnectWalletButton from './ConnectWalletButton';

const mockWalletInfo = {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    privateKey: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
};

test("NavBar default renders with Connect Wallet button", () => {
    // Given
    const { container } = renderWithDefaultContext(<NavBar />);

    // Then
    expect(container).toContainHTML(renderWithDefaultContext(<ConnectWalletButton />).container.innerHTML);
});

test("NavBar renders with wallet info", () => {
    // Given
    const { container } = renderWithWalletInfo(<NavBar />, mockWalletInfo);

    // Then
    expect(container).toContainHTML('Wallet Address: ');
    expect(container).toContainHTML('0xC02aa');
    expect(container).toContainHTML('Disconnect');
});
