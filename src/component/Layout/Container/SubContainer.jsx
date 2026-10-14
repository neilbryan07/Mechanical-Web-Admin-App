import React from 'react'


const SubContainer = ({children , loader = true }) => {
  return (
    // <div className='xl:container h-full w-full overflow-y-auto overflow-x-hidden'>
    <div className='flex flex-auto flex-col overflow-auto h-full relative'>
      {children}
    </div>
  )
}

export default SubContainer
