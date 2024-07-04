import { FC } from 'react'
import { Outlet } from 'react-router-dom';
interface AppLayoutProps {
}

const AppLayout: FC<AppLayoutProps> = () => {
    return (
        <div className='relative min-h-screen flex flex-col w-full bg-brand text-white '>
            <div className=' flex-1 max-w-sm w-full mx-auto '>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;