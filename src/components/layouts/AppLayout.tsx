import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
interface AppLayoutProps {
}

const AppLayout: FC<AppLayoutProps> = () => {

    const account = useAccount()
    const navigate = useNavigate()

    useEffect(() => {
        if (!account.isConnected) {
            navigate('/login')
        }
    }
        , [account.status])


    return (
        <div className='relative min-h-screen flex flex-col w-full bg-brand text-white '>
            
            <div className=' flex-1 max-w-sm w-full mx-auto '>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;