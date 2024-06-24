import DashboardLayout from '@/components/layouts/DashboardLayout'
import TaskModal from './TaskModal'
import RewardModal from './RewardModal'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className=" bg-white/15 border border-white rounded-xl p-3  ">
        <p className=' text-sm' >Your Referral Code</p>
        <div className="flex justify-between items-center mt-2 ">
          <p className=' text-2xl font-bold ' > 03GF6X </p>
          <button className=' text-xs' > Copy Code </button>
        </div>
        <div className="flex gap-2 justify-center items-center mt-3">
          <button className='flex-1 bg-white text-brand rounded-xl py-2 font-semibold text-xs'>
            Referral Dashboard
          </button>
          <button className='flex-1 bg-white text-brand rounded-xl py-2 font-semibold text-xs'>
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
            Array.from({ length: 5 }).map((_, i) => (
              <TaskModal />
            ))
          }
        </div>
        <div className=" mt-6 border-2 rounded-3xl grid grid-cols-3 ">
          <div className=" col-span-2 p-3 flex flex-col justify-center  ">
            <p className=' text-lg font-semibold mb-4 ' >
            Complete tasks to <br />  claim the <u>Human Detector</u> NFT
            </p>
            <RewardModal />
          </div>
          <img src="/human.svg" alt="" />
        </div>
        <div className=" mt-6 border-2 rounded-3xl p-4">
          <div className=""></div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard