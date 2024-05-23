import '@testing-library/jest-dom';
import { renderWithWalletInfo } from '../test/testutils';
import { CheckBalance } from './CheckBalance';
import { WalletInfo } from '../contexts/Web3Provider';
import { waitFor } from '@testing-library/react';

const organiserWalletInfo: WalletInfo = {
    address: "0x00c84CD906eB9f221aE02c8da025ffFDeBc2fa23",
    privateKey: "whateveryouwant"
};

const patronWalletInfo: WalletInfo = {
    address: "0xF1a22F0dE6Eb3F6b68015f2e0799a3E674c244B0",
    privateKey: "anyway"
};

const usherWalletInfo: WalletInfo = {
    address: "0x7D888F2D0809673B8c668f6C2Bb584c56573bA64",
    privateKey: "NeverGonnaGiveYouUpNeverGonnaLetYouDown"
};


test("CheckBalance renders with organiser role-based access", async () => {
    // Given
    const { container } = renderWithWalletInfo(<CheckBalance />, organiserWalletInfo);

    // Then
    await waitFor( () => {
            expect(container).toContainHTML('Organiser Panel');
    }, {timeout: 3000})
});
test("CheckBalance renders with patron role-based access", () => {
    // Given
    const { container } = renderWithWalletInfo(<CheckBalance />, patronWalletInfo);

    // Then
    expect(container).toContainHTML('Check My Balance');
});
test("CheckBalance renders with usherrole-based access", async () => {
    // Given
    const { container } = renderWithWalletInfo(<CheckBalance />, usherWalletInfo);

    // Then
    await waitFor( () => {
            expect(container).toContainHTML('Organiser Panel');
    }, {timeout: 3000})
});
