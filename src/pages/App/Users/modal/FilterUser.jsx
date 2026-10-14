import React , { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';
import Header from '../../../../component/Typography/Header';

import { APIServices } from '../../../../hooks/fetchAPI';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const FilterUser = ({ ModalToggle , Toggle , handleFilter }) => {

  const [ userType , setUserType ] = useState(null);
  const [ accessType , setAccessType ] = useState(null);

  const options = [
    // { value: 0, label: 'Super' },
    // { value: 1, label: 'Corporate ' },
    // { value: 2, label: 'Admin' },
    // { value: 3, label: 'Technician' },
    // { value: 4, label: 'RNI' },
    { value: 5, label: 'Estimator' },
    { value: 6, label: 'Auditor' }
  ]

  const optionsAccess = [
    { value: 'CCC', label: 'CCC' },
    { value: 'Mitchell', label: 'Mitchell' },
  ]

    const handleChange = (event) => {
      setUserType(event.target.value);
    }

    const handleChangeAccess = (event) => {
      setAccessType(event.target.value);
    }

    const handleFilterSelected = () => {
      handleFilter( userType , accessType );
      setAccessType(null);
      setUserType(null);
      ModalToggle(false)
    }

  return (
    <ModalDefault 
        title={"Filter By :"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[35%] h-[55%]'}
    >
      <div className='px-4 w-full flex flex-col gap-5'>


        <span className='text-black text-md font-semibold'>User Type</span>
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select One</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userType}
                    label="Select One"
                    onChange={handleChange}
                >

                    { options.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

        </FormControl>

        <span className='text-black text-md font-semibold'>Access Type</span>
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select One</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accessType}
                    label="Select One"
                    onChange={handleChangeAccess}
                >

                    { optionsAccess.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

        </FormControl>

        <div onClick={ () => handleFilterSelected() } className='w-full flex flex-col items-center justify-center bg-mainText py-3 rounded hover:bg-green-700 cursor-pointer'>
          <span className='text-white font-md text-md'>Apply</span>
        </div>
                                     
      </div>
    </ModalDefault>
   
  )
}

export default FilterUser
