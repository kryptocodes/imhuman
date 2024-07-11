//import { getComethConnectWallet } from "@cometh/connect-sdk-viem";
// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   getDefaultConfig,
//   getDefaultWallets,
// } from '@rainbow-me/rainbowkit';
// import {
//   mainnet
// } from 'wagmi/chains';

// const API_KEY = import.meta.env.VITE_COMETH_API_KEY;

// const comethConnect = getComethConnectWallet({ apiKey: API_KEY });
// const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// const { wallets } = getDefaultWallets({
//   appName: 'I am human',
//   projectId: projectId as string,
// });

// console.log(wallets, 'wallets');

// let tempWallets = wallets;
// const filteredWallets = wallets[0].wallets.filter(wallet => wallet.name !== 'metaMaskWallet');
// tempWallets[0].wallets = filteredWallets;

// console.log(tempWallets, 'filteredWallets');



// export default getDefaultConfig({
//   appName: 'I am human',
//   projectId: projectId as string,
//   chains: [
//     mainnet
//   ],
//   ssr: false,
//   wallets: tempWallets
// });


import '@rainbow-me/rainbowkit/styles.css';
import {
connectorsForWallets,
} from '@rainbow-me/rainbowkit'; 
import {
  createConfig,
  http,
} from 'wagmi';
import { mainnet } from "viem/chains";

import {
  walletConnectWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [walletConnectWallet,metaMaskWallet],
    },
  ],
  {
    appName: 'I am human',
    projectId: projectId as string,
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
