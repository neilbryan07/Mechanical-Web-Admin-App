import React from 'react'

const WeekDays = () => {
  return (
    <div className='w-full grid grid-cols-7 grid-rows-1'>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Sunday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Monday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Tuesday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Wednesday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Thursday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Friday</span>
        </div>

        <div className='w-full flex flex-col items-center'>
        <span className='text-sm text-black'>Saturday</span>
        </div>

    </div>
  )
}


export default WeekDays