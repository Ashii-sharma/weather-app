import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from "./Loading.json"

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ height: 500, width: 500, backgroundColor: 'black' }}
      />
    </div>
  )
}

export default Loader