import React , { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';
import Header from '../../../../component/Typography/Header';

import { APIServices } from '../../../../hooks/fetchAPI';

const DeleteStorm = ({ ModalToggle , Toggle , userData }) => {

    const handleDeleteUser = async () => {
        
        const res = await APIServices.deleted({ url: `/stormlocation/one/${ userData?._id }` })

        if (res.status === 200) {
    
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        }
    }

  return (
    <ModalDefault 
        title={"Delete this selected Storm Location?"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[25%] h-[180px]'}
    >
      <div className='px-4 w-full flex flex-col gap-5'>
                      
        <div className='w-full flex justify-end pb-3'>
          <div className='flex flex-row items-center gap-10'>
            
            <span className='text-gray-600 cursor-pointer' onClick={ () => ModalToggle(false) }>
              <Header>Cancel</Header>
            </span>

            <div onClick={ () => handleDeleteUser() } className='flex items-center justify-center py-3 px-20 bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-800 hover:transition duration-300'>
              <Header>Delete</Header>
            </div> 

          </div>
        </div>

                           
      </div>
    </ModalDefault>
   
  )
}

export default DeleteStorm
