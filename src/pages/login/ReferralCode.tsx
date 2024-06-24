import { FC } from 'react'
import { Link } from 'react-router-dom';

interface ReferralCodeProps {

}

const ReferralCode: FC<ReferralCodeProps> = ({ }) => {
    return (
        <div className=' max-w-sm mx-auto text-black bg-white h-screen' >
            <div className="flex h-full flex-col justify-center items-center w-[80%] mx-auto">
                <h1 className=' text-brand text-3xl font-bold ' >Enter Referral Code</h1>
                <p className=' text-black/60 text-xs' >Earn 25 xp if you have a code as a user</p>
                <input type="text" className=' rounded-xl border-2 border-brand py-2 px-6 mt-9 w-full' placeholder='03GF6X' />
                <button className='mt-4 py-2 px-6 bg-brand hover:bg-brand/80 transition-all duration-200 text-white text-semibold rounded-xl w-full ' >Submit</button>
                <Link to={'/'} className=' cursor-pointer text-brand hover:text-brand/80 transition-all duration-200 mt-24 font-semibold '>
                    Skip
                </Link>
            </div>
        </div>
    )
}

export default ReferralCode;