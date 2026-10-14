import React from 'react'

const ScreenSize = ({ children }) => {
  return (
    <div className='w-screen h-screen'>
        <div className='mx-auto container'>
                {children}
        </div>        
    </div>
  )
}

export default ScreenSize
