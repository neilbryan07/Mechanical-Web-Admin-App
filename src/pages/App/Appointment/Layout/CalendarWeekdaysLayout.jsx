import React from 'react'

const CalendarWeekdaysLayout = ({ item , index , handleWeekData , selectedWeekDateIndex  }) => {

  return ( selectedWeekDateIndex === index ?

      (<div className='w-full flex flex-col border border-mainText border-2 px-3 bg-white py-2' onClick={ () =>  [handleWeekData( index )  ] }>
              <span className='text-sm text-black font-bold'>{ item?.day }</span>

              <div className='w-full my-5 flex flex-col justify-center items-center gap bg-mainText rounded'>
                <span className='text-sm text-white font-semibold'>{ item?.number_of_repairs } Schedule Repairs</span>
                <span className='text-xs text-white'>Total: ${ item?.total_for_the_day }</span>
              </div>

      </div> 
      )
    
    :

      (
        <div className='w-full flex flex-col border px-3 bg-white py-2 cursor-pointer' onClick={ () =>  [handleWeekData( index )  ] }>
            <span className='text-sm text-black font-bold'>{ item?.day }</span>

            <div className='w-full my-5 flex flex-col justify-center items-center gap'>
            <span className='text-sm text-black font-semibold'>{ item?.number_of_repairs } Schedule Repairs</span>
            <span className='text-xs text-black'>Total: ${ item?.total_for_the_day }</span>
            </div>

        </div>
      )

  )
}


export default CalendarWeekdaysLayout;
