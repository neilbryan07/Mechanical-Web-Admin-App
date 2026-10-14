import React , { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';
import Header from '../../../../component/Typography/Header';

import { APIServices } from '../../../../hooks/fetchAPI';

const DeleteUser = ({ ModalToggle , Toggle , userData }) => {

    const handleDeleteUser = async () => {
        
        const res = await APIServices.deleted({ url: `/user/one/${ userData?._id }` })

        if (res.status === 200) {
    
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        }
    }

  return (
    <ModalDefault 
        title={"Delete this selected User?"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[35%] min-[35%] max-h-[55%]'}
    >
      <div className='px-4 w-full flex flex-col gap-5'>
                      
        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-tertiaryText'><FaUserCircle/></span>         
              <span style={{ fontSize:16}} className='text-tertiaryText'><Bold>User Information</Bold></span>                 
            </div>

          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3'>

              <div>
                <TextDisplay>
                    <span style={{ fontSize:16}} className='text-tertiaryText'>Full Name</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-tertiaryText font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-tertiaryText ml-5'>{ userData?.first_name } { userData?.last_name }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}} className='text-tertiaryText'>Email Address</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row'>
                  <span style={{ fontSize:16}} className='text-tertiaryText font-extrabold mr-2'>:</span>
                  <p style={{ fontSize:16}} className='text-tertiaryText ml-5 break-all'>{ userData?.email }</p>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}} className='text-tertiaryText'>Mobile Number</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-tertiaryText font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-tertiaryText ml-5'>{ userData?.mobile_number }</span>
              </div>
              

          </div>

        </Card>

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

export default DeleteUser
