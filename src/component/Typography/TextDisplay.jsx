import React from 'react'

const TextDisplay = ({ children,text, color, props }) => {
  return (
    <h1 className={`${props} font-robotoFont font-normal text-sm leading-5`}>{children}</h1>
  )
}

export default TextDisplay;
