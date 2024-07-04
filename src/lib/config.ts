import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  sepolia,
  mainnet
} from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: 'I am human',
  projectId: projectId as string,
  chains: [
    sepolia,
    mainnet
  ],
  ssr: false, 
});