import '@testing-library/jest-dom';
import { renderWithWalletInfo } from '../test/testutils';
import { CheckBalance } from './CheckBalance';
import { WalletInfo } from '../contexts/Web3Provider';
import { getIsOrganiser, getIsUsher } from './CheckBalance';
import { ABI, ADDRESS } from '../assets/contract';
import Web3 from 'web3';

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


test("CheckBalance renders with patron wallet information", () => {
    // Given
    const { container } = renderWithWalletInfo(<CheckBalance />, patronWalletInfo);

    // Then
    expect(container).toContainHTML('Check My Balance');
});

test("getIsOrganiser returns true when the wallet address is the same as the organiser's", () => {
    // Given
    const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/e374c9fa97b845919613c8136a345bac'));
    const contract = new web3.eth.Contract(ABI, ADDRESS);

    // Then
    getIsOrganiser(contract, organiserWalletInfo).then((result) => {
        expect(result).toBe(true);
    });
});

test("getIsUsher returns true when the wallet address is the same as the usher's", () => {
    // Given
    const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/e374c9fa97b845919613c8136a345bac'));
    const contract = new web3.eth.Contract(ABI, ADDRESS);

    // Then
    getIsUsher(contract, usherWalletInfo).then((result) => {
        expect(result).toBe(true);
    });
});
