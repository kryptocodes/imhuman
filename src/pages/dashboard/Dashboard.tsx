import DashboardLayout from '@/components/layouts/DashboardLayout'
import TaskModal from './TaskModal'
import RewardModal from './RewardModal'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/lib/UserContext'
import SplashScreen from '@/components/SplashScreen'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {

  const navigate = useNavigate()

  const user: any = useUser()

  const [tasks, setTasks] = useState([])
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    // fetch tasks
    fetchTasks()
    // fetch rewards
    fetchRewards()
  }, [])

  console.log(user, 'user');

  console.log(tasks, 'tasks')
  console.log(rewards, 'rewards');


  const fetchTasks = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('No JWT token found in local storage.')
      return
    }

    try {
      const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/task', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setTasks(response.data)
      console.log(response.data, 'response.data')
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    }
  }

  const fetchRewards = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('No JWT token found in local storage.')
      return
    }

    try {
      const response = await axios.get('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/reward', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setRewards(response.data)
      console.log(response.data, 'response.data')
    } catch (error) {
      console.error('Failed to fetch rewards:', error)
    }
  }

  const isTaskCompleted = (taskId: string) => {
    return user?.tasks.filter((task: any) => task.taskId === taskId && task.completedAt !== null ).length > 0
  }


  if (!user) {
    <SplashScreen />
  }

  const rewardStatus = (reward: any) => {
    if (user?.rewardsClaim?.includes(reward.id)) {
      return 'Claimed'
    }
    if (user?.xp < reward?.expPoints) {
      return 'progress'
    } else if (user?.xp >= reward?.expPoints) {
      return 'Claim'
    }
  }

  const renderRewardButton = (reward: any) => {
    switch (rewardStatus(reward)) {
      case 'Claimed':
        return <button className='text-xs text-white bg-green-500 rounded-xl px-3 py-1' >Claimed</button>
      case 'progress':
        return <span className=" text-lg py-1 px-3 font-bold text-brand bg-white rounded-full ">
          {user?.xp} / {reward.expPoints} xp
        </span>
      case 'Claim':
        return <RewardModal reward={reward} />

      default:
        return <button className='text-xs text-white bg-brand rounded-xl px-3 py-1' >Claim</button>
    }
  }

  return (
    <DashboardLayout>
      <div className=" bg-white/15 border border-white rounded-xl p-3  ">
        <p className=' text-sm' >Your Referral Code</p>
        <div className="flex justify-between items-center mt-2 ">
          <p className=' text-2xl font-bold ' > {user?.referralCode} </p>
          <button className=' text-xs' > Copy Code </button>
        </div>
        <div className="flex gap-2 justify-center items-center mt-3">
          <button onClick={() => navigate('/referral-dashboard')} className='flex-1 bg-white hover:bg-white/80 transition-all duration-200 text-brand rounded-xl py-2 font-semibold text-xs'>
            Referral Dashboard
          </button>
          <button onClick={() => navigate('/leaderboard')} className='flex-1 bg-white hover:bg-white/80 transition-all duration-200 text-brand rounded-xl py-2 font-semibold text-xs'>
            Leaderboard
          </button>
        </div>
      </div>
      <div className=" mt-6">
        <h1 className=' text-3xl font-bold'>
          Complete Tasks to <span className='text-white/25'>Re</span>Claim your Rewards
        </h1>
        <p className='text-xs text-white/60 mt-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
        <div className="flex flex-col gap-4 mt-4 ">
          {
            tasks.map((task: any) => (
              <TaskModal task={task} isCompleted={isTaskCompleted(task.id)} />
            ))
          }
        </div>


        {
          rewards.map((reward: any) => (
            <div className=" mt-6 border-2 shadow-md rounded-3xl grid grid-cols-3 ">
              <div className=" col-span-2 p-3 flex flex-col justify-center items-start  ">
                <p className=' text-lg font-semibold mb-4 ' >
                  {/* Complete tasks to <br />  claim the <u>Human Detector</u> NFT */}
                  {
                    reward.description
                  }
                </p>
                {
                  renderRewardButton(reward)
                }
                {/* <RewardModal /> */}
              </div>
              <img src="/human.svg" alt="" />
            </div>
          ))
        }

        <div className=" mt-6 border-2 shadow-md rounded-3xl grid grid-cols-3 ">
          <div className=" col-span-2 p-3 flex flex-col justify-center  ">
            <p className=' text-lg font-semibold mb-4 ' >
              Complete tasks to <br />  claim the <u>Human Detector</u> NFT
            </p>
            <RewardModal reward={null} />
          </div>
          <img src="/human.svg" alt="" />
        </div>
        <div className=" mt-6 border-2 shadow-md rounded-3xl grid grid-cols-3 ">
          <img src="/human.svg" alt="" />
          <div className=" col-span-2 p-3 flex flex-col items-start justify-center  ">
            <p className=' text-xl  font-semibold mb-4 ' >
              Collect 100xp to <br />  Get Airdrop
            </p>
            {/* claim modal */}
            {/* <RewardModal /> */}
            {/* Progress */}
            <span className=" text-lg py-1 px-3 font-bold text-brand bg-white rounded-full ">
              75 / 100 xp
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard