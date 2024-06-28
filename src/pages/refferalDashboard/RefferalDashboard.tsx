import  { FC } from 'react'

interface RefferalDashboardProps {

}

const RefferalDashboard: FC<RefferalDashboardProps> = () => {
  return (
    <div className=' max-w-sm mx-auto px-4 bg-white text-black min-h-screen ' >
      <div className="border rounded-3xl border-black/10 py-4 px-5 shadow-md ">
        <p className='font-bold text-brand' >Your Refferal Code</p>
        <div className=" flex justify-between items-center py-2">
          <p className=' text-4xl font-extrabold ' > 03GF6X </p>
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
          Array.from({ length: 5 }).map((_, i) => (
            <>
              <div className=" py-4 px-3 flex justify-between items-center ">
                <p className=' font-semibold' >
                  0xa...EfG
                </p>
                <p>23</p>
              </div>
              {
                i !== 4 && <hr className=' border-black/10' />
              }
            </>
          ))
        }
      </div>
    </div>
  )
}

export default RefferalDashboard;