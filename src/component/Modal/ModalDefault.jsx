import React from 'react'

import Modal from '@mui/material/Modal';
import Header from '../Typography/Header';
import { HiOutlineX } from "react-icons/hi";

const ModalDefault = ({ title ,setToggle, toggle=false, size ,children }) => {
  return (
    <Modal 
        open={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >

        <div className='h-full w-full flex justify-center items-center'>

            <div className={` w-3/5 h-4/5 ${size} bg-white overflow-auto  rounded-md max-[1500px]:w-4/6 max-[1100px]:w-5/6`}>

                <div className='w-full flex flex-row justify-between items-center p-4 sticky top-0 bg-white border-b-2 border-gray-200 z-10'>

                    <Header>{title}</Header>

                    <span style={{ fontSize:22}} className='cursor-pointer' onClick={ () => setToggle(false) }><HiOutlineX/></span>

                </div>

                <br/>

                <div className='py-2'>
                    {children}
                </div>

            </div>

        </div>
      
    </Modal>
  )
}

export default ModalDefault
