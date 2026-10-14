import React from 'react'
import Bold from '../Typography/Bold'

const MainButton = ({ text , handleButton = null }) => {
  return (
    <button onClick={ () => handleButton() } className={`w-full px-10 py-3 bg-mainText rounded-full text-center text-white hover:bg-green-600 hover:transition duration-300`}>
      <Bold>{text}</Bold>
    </button>
  )
}

export default MainButton
