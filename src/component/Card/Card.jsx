import React from 'react'

const Card = ({ children, props }) => {
  return (
    <div className={`${props} bg-white rounded-lg p-4 border border-gray-200`}>
      {children}
    </div>
  )
}

export default Card
