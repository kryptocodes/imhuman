
const Login = () => {
  return (
    <div className=' text-center overflow-x-hidden flex flex-col h-screen items-center justify-center '>
      <div className="">
        <p className=' font-neueBit leading-none text-[64px]  translate-y-2 z-[100000] ' >Ditch the Bots</p>
        <p className=' font-eiko text-6xl  textBorder leading-[57px] -translate-y-3  z-[1000] '>Embrace <br /> Humanity</p>
      </div>
      <div className="bg-white rounded-2xl px-[2px] mt-11 pt-[2px] pb-[6px] ">
        <button className=" text-brand border-2 font-bold py-2 px-9 rounded-2xl border-brand" >
          Connect Wallet
        </button>
      </div>
      <div className="relative w-full flex mt-16  justify-center items-center ">
        <img src="/human.svg" className=" w-[250px] " alt="" />
        <img src="/mobilePetal1.svg" className="absolute right-0 top-0" alt="" />
        <img src="/mobilePetal2.svg" className="absolute -left-10 -bottom-10" alt="" />
      </div>
    </div>
  )
}

export default Login