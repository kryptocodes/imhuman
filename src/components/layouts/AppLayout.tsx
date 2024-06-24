import { FC } from 'react'
import { Outlet } from 'react-router-dom';
interface AppLayoutProps {
}

const AppLayout: FC<AppLayoutProps> = () => {
    return (
        <div className='relative min-h-screen flex flex-col w-full bg-brand text-white '>
            <div className=' flex-1 max-w-[1440px] lg:w-[85%] w-full mx-auto '>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;