import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
  mainnet
} from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const { wallets } = getDefaultWallets({
  appName: 'I am human',
  projectId: projectId as string,
});

console.log(wallets, 'wallets');

let tempWallets = wallets;
const filteredWallets = wallets[0].wallets.filter(wallet => wallet.name !== 'metaMaskWallet');
tempWallets[0].wallets = filteredWallets;

console.log(tempWallets, 'filteredWallets');



export default getDefaultConfig({
  appName: 'I am human',
  projectId: projectId as string,
  chains: [
    mainnet
  ],
  ssr: false,
  wallets: tempWallets
});