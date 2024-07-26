import { useUser } from "@/lib/UserContext";

import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const user: any = useUser();

  const { connected, connecting } = useWallet();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!connecting && (!connected || !token)) {
        navigate("/login");
      }
    }, 1000); // wait for 1 second

    return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
  }, [connected, connecting, token, navigate]);

  // return (
  //     <SplashScreen/>
  // )
  return (
    <div className=" max-w-sm mx-auto min-h-screen">
      <div className="p-4 flex gap-2 justify-between items-center">
        <div className="bg-white rounded-xl py-1 px-2 text-brand font-bold ">
          {user?.xp ?? "--"} XP
        </div>
        <WalletMultiButton
          style={{
            background: "#ffffff00",
            color: "white",
          }}
        />
      </div>
      <div className=" p-[18px] mb-52    ">{children}</div>
      <img
        src="/petalsBgAlt.svg"
        className="absolute object-contain bottom-0"
        alt=""
      />
    </div>
  );
};

export default DashboardLayout;
