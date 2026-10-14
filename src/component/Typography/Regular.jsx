import React from 'react'

const Regular = ({children, props }) => {
  return (
    <h1 className={`${props} font-interFont font-normal leading-5`}>{children}</h1>
  )
}

export default Regular
