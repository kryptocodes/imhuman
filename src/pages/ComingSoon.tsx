
const ComingSoon = () => {
    return (
        <div className=' text-center flex relative flex-col h-screen justify-center items-center'>
      <div className="">
        <p className=' font-neueBit leading-none text-9xl  md:text-[189.65px] translate-y-2 z-[100000]   ' >Coming</p>
        <p className=' font-eiko text-6xl md:text-[150.65px] leading-[165px] md:textBorder -translate-y-16 z-[1000]  '>Soon</p>
        <img src="/human.svg" className=" hidden  lg:block absolute bottom-10 -right-10 z-0 animate-up-down " alt="" />
        <img src="/robots.svg" className=" hidden  lg:block absolute top-10 left-10 z-0 animate-up-down " alt="" />
        <img src="/petals2.svg" className=" hidden  lg:block absolute bottom-10 left-10 z-0 animate-up-down " alt="" />
        <img src="/petals1.svg" className=" hidden  lg:block absolute top-10 right-10 z-0 animate-up-down " alt="" />
      </div>
    </div>
    )
}

export default ComingSoon