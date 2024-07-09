import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAccount, useSignMessage } from "wagmi"
import axios from 'axios'

const Login = () => {
  const {signMessageAsync} = useSignMessage()
  const account = useAccount()
  // redirect using react router dom if account is present
  const navigate = useNavigate()

  console.log(account.isConnected);
  

  useEffect(() => {
    if (account.isConnected) {
      handleConnect(account.address as string)
      toast('Connected Successfully')
      // navigate('/')
    }
  }
  , [account.status])


  const generateNonce = async (walletAddress:string) => {
    try {
      const response = await axios.post('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/auth/generate-nonce', {
        walletAddress: walletAddress
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnect = async ( walletAddress:string ) =>{
    const nonceData:{nonce:string,id:any} = await generateNonce(walletAddress);

    const message = await signMessageAsync({message:nonceData.nonce});

    const verify = await verifyData(nonceData.id,message)

    
    if(!localStorage.getItem('token')){
      localStorage.setItem('token',verify.token)
    } else {
      localStorage.removeItem('token')
      localStorage.setItem('token',verify.token)
    }

    if(verify.isFirstTime){
      navigate('/referral-code')
    } else {
      navigate('/')
    }

    
    // console.log(signature, 'signature');
    
  }

  const verifyData = async (id:any,signature:any) => {
    try {
      const response = await axios.post('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/auth/verify', {
        id,
        signature
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=' text-center overflow-x-hidden flex flex-col h-screen items-center justify-center '>
      <div className="">
        <p className=' font-neueBit leading-none text-[64px]  translate-y-2 z-[100000] ' >Ditch the Bots</p>
        <p className=' font-eiko text-6xl  textBorder leading-[57px] -translate-y-3  z-[1000] '>Embrace <br /> Humanity</p>
      </div>
      <div className="bg-white rounded-2xl px-[2px] mt-11 pt-[2px] pb-[6px] ">
        {/* <button className=" text-brand border-2 font-bold py-2 px-9 rounded-2xl border-brand" >
          Connect Wallet
        </button> */}
        <ConnectButton/>
      </div>
      <div className="relative w-full flex mt-16  justify-center items-center ">
        <img loading="eager" src="/human.svg" className=" w-[250px] " alt="" />
        <img loading="eager" src="/mobilePetal1.svg" className="absolute right-0 top-0" alt="" />
        <img loading="eager" src="/mobilePetal2.svg" className="absolute -left-10 -bottom-10" alt="" />
      </div>
    </div>
  )
}

export default Login