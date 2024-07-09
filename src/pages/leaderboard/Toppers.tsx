
interface ToppersProps {
    place: number
    data: any
}

const Toppers = ({ place, data }: ToppersProps) => {
    console.log(place);
    console.log(data, 'top');


    return (
        <div className={` ${place == 3 ? ' translate-y-8 ' : ' translate-y-0 '}  rounded-2xl border-2 `}>
            <div className=" p-3 flex flex-col justify-center items-center  ">
                <div className=" w-9 h-9 rounded-full bg-white overflow-hidden ">
                    <img src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data?.walletAddress}`} alt="" className="w-9 h-9" />
                </div>
                <p className="text-center text-xs pt-1 " >
                    {data?.walletAddress?.substring(0, 4)}....{data?.walletAddress?.substring(data?.walletAddress.length - 4)}
                </p>
            </div>
            <div className="bg-white rounded-b-xl w-full text-brand text-center py-2">
                {data?.xp || 0} XP
            </div>
        </div>
    )
}

export default Toppers