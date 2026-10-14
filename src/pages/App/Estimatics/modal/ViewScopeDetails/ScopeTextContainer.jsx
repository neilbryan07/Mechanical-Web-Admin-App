import React from 'react'

const ScopeTextContainer = ({ title, value, isPercent = false, isHours = false }) => {
  return (
    <>
      {/* <div className='w-full flex flex-row'>

        <div className='w-8/12'>
          <span style={{ fontSize: 12 }} className='text-gray-700 font-semibold'>{title}</span>
        </div>

        <div className='w-4/12'>
          <span style={{ fontSize: 12 }} className='text-secondaryText font-semibold'>: {value} {isPercent ? '%' : null} {isHours ? [parseFloat(value) > 1 ? 'hrs' : 'hr'] : null}</span>
        </div>

      </div> */}

      <div class="flex">
        <div class="flex-1">
          <span
            style={{ fontSize: 12 }}
            className='text-gray-700 font-semibold'
          >
            {title}
          </span>
        </div>
        
        <div class="flex-1">
          <span
            style={{ fontSize: 12 }}
            className='text-secondaryText font-semibold'
          >: {value} { isPercent && value ? '%' : null} { value & isHours ? [parseFloat(value) > 1 ? 'hrs' : 'hr'] : null}
          </span>
        </div>
      </div>
    </>
  )
}

export default ScopeTextContainer
