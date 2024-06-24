import React, { FC } from 'react'

interface SplashScreenProps {
  
}

const SplashScreen: FC<SplashScreenProps> = ({  }) => {
  return (
    <div className=' max-w-sm mx-auto overflow-hidden flex justify-center items-center h-screen  ' >
      <img src="/splash.svg" alt="" />
    </div>
  )
}

export default SplashScreen;