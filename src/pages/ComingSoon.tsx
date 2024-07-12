
const ComingSoon = () => {
    return (
        <div className=' text-center flex relative flex-col h-screen justify-center items-center'>
      <div className="">
        <p className=' font-neueBit leading-none text-7xl  lg:text-[109.65px] translate-y-2 z-[100000]   ' >Please use a mobile device</p>
        <p className=' font-eiko text-6xl lg:text-[70.65px] leading-[165px] md:textBorder -translate-y-16 z-[1000]  '>For better experience</p>
        <img src="/human.svg" className=" hidden  lg:block absolute bottom-10 -right-10 z-0 animate-up-down " alt="" />
        <img src="/robots.svg" className=" hidden  lg:block absolute top-10 left-10 z-0 animate-up-down " alt="" />
        <img src="/petals2.svg" className=" hidden  lg:block absolute bottom-10 left-10 z-0 animate-up-down " alt="" />
        <img src="/petals1.svg" className=" hidden  lg:block absolute top-10 right-10 z-0 animate-up-down " alt="" />
      </div>
    </div>
    )
}

export default ComingSoon