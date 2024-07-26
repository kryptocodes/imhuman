import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from "sonner";
import ComingSoon from "@/pages/ComingSoon";
interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = () => {
  //   const navigate = useNavigate();
  //   const token = localStorage.getItem("token");

  // useEffect(() => {
  //     if (!account.isConnected || !token) {
  //         navigate('/login')
  //     }
  // }
  //     , [account.status])

  return (
    <div className="relative min-h-screen flex flex-col w-full bg-brand text-white ">
      <div className="hidden md:block overflow-hidden">
        <ComingSoon />
      </div>

      <div className=" block md:hidden flex-1 max-w-sm w-full mx-auto ">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;
