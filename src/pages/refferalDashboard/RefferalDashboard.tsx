import LeaderboardsLayout from '@/components/layouts/LeaderboardsLayout';
import { useUser } from '@/lib/UserContext';
import axios from 'axios';
import { FC, useEffect, useState } from 'react'

interface RefferalDashboardProps {

}

const RefferalDashboard: FC<RefferalDashboardProps> = () => {

  const [referralData, setReferralData] = useState([])

  const user:any = useUser()


  useEffect(() => {
    // fetch leaderboard data
    fetchLeaderboardData()
  }
  ,[])


  const fetchLeaderboardData = async () => {
    const token = localStorage.getItem('token')
        if (!token) {
          console.log('No JWT token found in local storage.')
          return
        }
    try {
      const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/user/leaderboard/referral',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setReferralData(response.data)
      console.log(response.data, 'response.data')
    } catch (error) {
      console.error('Failed to fetch leaderboard data:', error)
    }

  }


  console.log(referralData, 'referralData');
  

  return (
    <LeaderboardsLayout>
      <div className=' max-w-sm mx-auto px-4 bg-white text-black min-h-screen ' >
        <div className="border rounded-3xl border-black/10 py-4 px-5 shadow-md ">
          <p className='font-bold text-brand' >Your Refferal Code</p>
          <div className=" flex justify-between items-center py-2">
            <p className=' text-4xl font-extrabold ' > {user?.referralCode} </p>
            <button className=' text-brand' > Copy Code </button>
          </div>
          <div className="flex justify-start items-center gap-2  ">
            <div className=" w-6 h-6 rounded-full bg-brand "></div>
            <div className=" w-6 h-6 rounded-full bg-brand "></div>
            <div className=" w-6 h-6 rounded-full bg-brand "></div>
            <div className=" w-6 h-6 rounded-full bg-brand "></div>
          </div>
        </div>
        <div className=" bg-[#f4f4f4] rounded-3xl mt-6 ">
          {
            referralData.map((data:any, i) => (
              <>
                <div className=" py-4 px-3 flex justify-between items-center ">
                  <p className=' font-semibold' >
                    {data?.walletAddress.substring(0, 3)}...{data?.walletAddress.substring(data?.walletAddress.length - 3)}
                  </p>
                  <p>{data.referrals.length}</p>
                </div>
                {
                  i !== referralData.length - 1 && <hr className=' border-black/10' />
                }
              </>
            ))
          }
        </div>
      </div>
    </LeaderboardsLayout>

  )
}

export default RefferalDashboard;