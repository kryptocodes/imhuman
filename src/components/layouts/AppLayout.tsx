import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Toaster } from 'sonner';
interface AppLayoutProps {
}

const AppLayout: FC<AppLayoutProps> = () => {

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


    return (
        <div className='relative min-h-screen flex flex-col w-full bg-brand text-white '>
            
            <div className=' flex-1 max-w-sm w-full mx-auto '>
                <Outlet />
            </div>
            <Toaster/>
        </div>
    )
}

export default AppLayout;