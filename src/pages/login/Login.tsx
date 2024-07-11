import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAccount, useSignMessage, useDisconnect } from "wagmi"
import axios from 'axios'

const Login = () => {
  const { signMessageAsync } = useSignMessage()
  const account = useAccount()
  // redirect using react router dom if account is present
  const navigate = useNavigate()


  const { disconnect } = useDisconnect()


  useEffect(() => {
    if (account.isConnected) {
      toast('Connected Successfully')
      // navigate('/')
    }
  }
    , [account.status])


  const generateNonce = async (walletAddress: string) => {
    try {
      const response = await axios.post('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/auth/generate-nonce', {
        walletAddress: walletAddress
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      toast('Error Generating Nonce')
    }
  };

  const handleConnect = async (walletAddress: string) => {
    if (!walletAddress) {
      toast('Connecting')
    }
    const nonceData: { nonce: string, id: string } = await generateNonce(walletAddress);

    try {
      const message = await signMessageAsync({ message: nonceData.nonce });
      const verify = await verifyData(nonceData.id, message)

      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', verify.token)
      } else {
        localStorage.removeItem('token')
        localStorage.setItem('token', verify.token)
      }

      if (verify.isFirstTime) {
        navigate('/referral-code')
      } else {
        navigate('/')
      }
    } catch (error) {
      toast('Error Signing Message')
      disconnect()
    }


  }

  const verifyData = async (id: string, signature: string) => {
    try {
      const response = await axios.post('https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/auth/verify', {
        id,
        signature
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      toast('Error Verifying Data')
    }
  }

  return (
    <div className=' text-center overflow-x-hidden flex flex-col h-screen items-center justify-center '>
      <div className="">
        <p className=' font-neueBit leading-none text-[64px]  translate-y-2 z-[100000] ' >Ditch the Bots</p>
        <p className=' font-eiko text-6xl  textBorder leading-[57px] -translate-y-3  z-[1000] '>Embrace <br /> Humanity</p>
      </div>
      <div

        className="bg-white rounded-2xl px-[2px] mt-11 pt-[2px] pb-[6px] ">
        {account?.isConnected ?
          <button
            onClick={() => handleConnect(account?.address as string)}
            className=" text-brand border-2 font-bold py-2 px-9 rounded-2xl border-brand" >
            Verify
          </button> :
          <ConnectButton />
        }

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