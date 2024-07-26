import React from "react";
// import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
// import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";
// import { wagmiConfig } from "./config";
import { SolanaWalletProvider } from "../components/WalletContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SolanaWalletProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SolanaWalletProvider>
  );
};

export default Providers;
