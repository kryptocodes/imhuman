import { useUser } from '@/lib/UserContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {

    const user:any = useUser()

    const account = useAccount()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    console.log(token, 'token');
    
    useEffect(() => {
        if (!account.isConnected || !token) {
            navigate('/login')
        }
    }
        , [account.status])

    // return (
    //     <SplashScreen/>
    // )
    return (
        <div className=' max-w-sm mx-auto min-h-screen' >
            <div className="p-4 flex gap-2 justify-end items-center">
                <div className="bg-white rounded-xl py-1 px-2 text-brand font-bold ">
                    {user?.xp ?? '--'} XP
                </div>
                <ConnectButton showBalance={false} chainStatus={'icon'}  />
            </div>
            <div className=" p-[18px] mb-52    ">
                {children}
            </div>
            <img src="/petalsBgAlt.svg" className='absolute object-contain bottom-0' alt="" />
        </div>
    )
}

export default DashboardLayout;