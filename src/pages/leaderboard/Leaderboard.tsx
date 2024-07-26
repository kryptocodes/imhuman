import LeaderboardsLayout from "@/components/layouts/LeaderboardsLayout";
import Toppers from "./Toppers";

import { useEffect, useState } from "react";
import axios from "axios";
import SplashScreen from "@/components/SplashScreen";
import { useWallet } from "@solana/wallet-adapter-react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const account = useAccount();
  const { connected, publicKey } = useWallet();
  const [account, setaccount] = useState<{ address: string }>({ address: "" });

  useEffect(() => {
    if (connected) {
      // fetch leaderboard data
      setaccount({ address: `${publicKey}` });
      fetchLeaderboardData();
    }
  }, [connected]);

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/user/leaderboard"
      );
      setLeaderboardData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  console.log(leaderboardData, "leaderboardData");

  if (isLoading) return <SplashScreen />;

  return (
    <LeaderboardsLayout>
      <div className="">
        <h2 className=" text-2xl font-bold text-center">Leaderboard</h2>
        <p className=" text-center text-xs font-semibold ">
          Top 10 people in the leaderboard get 50$.
        </p>
      </div>
      <div className=" mt-6 flex justify-center mr-2 gap-2  ">
        <Toppers place={3} data={leaderboardData[1]} />
        <Toppers place={1} data={leaderboardData[0]} />
        <Toppers place={3} data={leaderboardData[2]} />
      </div>
      <img src="/leaders.svg" className=" pt-2 " alt="" />

      <div className=" flex flex-col gap-2 mt-4">
        {leaderboardData?.map((data: any, i) => {
          if (i < 3) return;
          return (
            <div
              className={` rounded-2xl flex justify-between items-center ${
                data?.walletAddress === account.address
                  ? "bg-brand text-white"
                  : "bg-white text-brand"
              }  border-2 py-4 px-3 `}
              key={i}
            >
              <div className="flex gap-2">
                <div className=" rounded-full text-brand bg-[#ebeafd] flex items-center text-xs font-bold px-4 ">
                  {i + 1}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={` ${
                      data?.walletAddress === account.address
                        ? "bg-white"
                        : "bg-brand"
                    } rounded-full w-8 h-8 overflow-hidden `}
                  >
                    <img
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data?.walletAddress}`}
                      alt=""
                      className="w-8 h-8"
                    />
                  </div>
                  <p
                    className={` ${
                      data?.walletAddress === account.address
                        ? "text-white"
                        : "text-black"
                    } font-bold  `}
                  >
                    {data?.walletAddress?.substring(0, 4)}....
                    {data?.walletAddress?.substring(
                      data?.walletAddress.length - 4
                    )}
                  </p>
                </div>
              </div>
              <p className="font-bold">{data?.xp} XP</p>
            </div>
          );
        })}
      </div>
    </LeaderboardsLayout>
  );
};

export default Leaderboard;
