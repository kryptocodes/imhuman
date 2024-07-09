import React from 'react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { BrowserRouter } from 'react-router-dom';
import { wagmiConfig} from './config';

interface ProvidersProps {
    children: React.ReactNode
}

const Providers = ({children}:ProvidersProps) => {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider theme={darkTheme({
                        accentColor: '#001AFF',
                        accentColorForeground: '#FFFF',
                    })} >
                            {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </BrowserRouter>
    )
}

export default Providers