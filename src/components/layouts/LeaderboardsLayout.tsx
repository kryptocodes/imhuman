import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

interface LeaderboardsLayoutProps {
    children: React.ReactNode
}

const LeaderboardsLayout: FC<LeaderboardsLayoutProps> = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()

    console.log(location.pathname);
    

    // return (
    //     <SplashScreen/>
    // )
    return (
        <div className={`max-w-sm  ${location.pathname === '/referral-dashboard'?'bg-white ' : ''}  mx-auto flex flex-col min-h-screen`} >
            <div className={`p-4 `}>
                <ConnectButton showBalance={false} chainStatus={'icon'}  />
            </div>
            <div className=" p-[18px] mb-24  flex-1  ">
                {children}
            </div>
            <div className={`border-t  flex fixed z-20 bottom-0 right-0 left-0  pt-3 pb-7 ${location.pathname === '/referral-dashboard'?'bg-white ' : 'bg-brand'}  `}>
                <span className='mx-auto bg-white rounded-2xl px-[2px] pt-[2px] pb-[6px] w-[60%] ' >
                    <button onClick={()=>navigate('/')} className=' bg-brand text-white rounded-2xl text-xl font-bold  w-full py-3  ' >
                        Close
                    </button>
                </span>
            </div>
        </div>
    )
}

export default LeaderboardsLayout;