import React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { BrowserRouter } from 'react-router-dom';
import {config} from './config';

interface ProvidersProps {
    children: React.ReactNode
}

const Providers = ({children}:ProvidersProps) => {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                            {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </BrowserRouter>
    )
}

export default Providers