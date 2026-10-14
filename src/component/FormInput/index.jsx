import React from 'react'
import { ShadePlaceHolder } from '../../styles'

const TextInputs = ({ placeholder, type, min , onChange = null , FormValidation = false , FormText = null  }) => {

  return (
      <React.Fragment>
        <input onChange={onChange} placeholder={placeholder} min={min} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border-[${ShadePlaceHolder}] py-3 px-4 my-2 `} type={type} />
        
        { FormValidation ? <span className='text-red-500 text-sm'>Missing {FormText} Field</span> : null }
        
      </React.Fragment>
    )
}

export default TextInputs
