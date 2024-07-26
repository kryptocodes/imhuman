// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { publicKey, connected, disconnect } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      console.log(publicKey);
      handleConnect(`${publicKey}`);
    }
  }, [connected]);

  const handleConnect = async (walletAddress: string) => {
    if (!walletAddress) {
      toast("Connecting");
    }

    try {
      const verify = await verifyData(walletAddress);

      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", verify.token);
      } else {
        localStorage.removeItem("token");
        localStorage.setItem("token", verify.token);
      }

      if (verify.isFirstTime) {
        navigate("/referral-code");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast("Error Signing Message");
      disconnect();
    }
  };

  const verifyData = async (walletAddress: string) => {
    try {
      const response = await axios.post(
        "https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/auth/solana-verify",
        {
          walletAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      toast("Error Verifying Data");
    }
  };

  return (
    <div className=" text-center overflow-x-hidden flex flex-col h-screen items-center justify-center ">
      <div className="">
        <p className=" font-neueBit leading-none text-[64px]  translate-y-2 z-[100000] ">
          Ditch the Bots
        </p>
        <p className=" font-eiko text-6xl  textBorder leading-[57px] -translate-y-3  z-[1000] ">
          Embrace <br /> Humanity
        </p>
      </div>
      <div className="bg-[#fff0] rounded-2xl px-[2px] mt-11 pt-[2px] pb-[6px] ">
        <WalletMultiButton
          style={{
            background: "white",
            color: "#0000EE",
          }}
        />
      </div>
      <div className="relative w-full flex mt-16  justify-center items-center ">
        <img loading="eager" src="/human.svg" className=" w-[250px] " alt="" />
        <img
          loading="eager"
          src="/mobilePetal1.svg"
          className="absolute right-0 top-0"
          alt=""
        />
        <img
          loading="eager"
          src="/mobilePetal2.svg"
          className="absolute -left-10 -bottom-10"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
