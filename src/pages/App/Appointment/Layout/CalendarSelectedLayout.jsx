import React from 'react'

const CalendarSelectedLayout = ({ day }) => {
  return (
    <div className='w-full flex flex-col border border-mainText border-2 px-3 bg-white py-2'>
            <span className='text-sm text-black font-bold'>{day}</span>

            <div className='w-full my-5 flex flex-col justify-center items-center gap bg-mainText rounded'>
              <span className='text-sm text-white font-semibold'>23 Schedule Repairs</span>
              <span className='text-xs text-white'>Total: $120,000.00</span>
            </div>

    </div> 
  )
}

export default CalendarSelectedLayout;
