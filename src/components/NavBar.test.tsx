import '@testing-library/jest-dom';
import NavBar from './NavBar';
import { renderWithContext } from '../test/testutils';
import ConnectWalletButton from './ConnectWalletButton';

test("NavBar default renders with Connect Wallet button", () => {
    const { container } = renderWithContext(<NavBar />);
    expect(container).toContainHTML(renderWithContext(<ConnectWalletButton />).container.innerHTML);
});
