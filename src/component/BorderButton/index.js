import React from 'react'

const BorderButton = ({ text }) => {
  return (
    <button className={`w-full px-10 py-3 border border-gray-800 rounded-full text-center`}>
      {text}
    </button>
  )
}

export default BorderButton
