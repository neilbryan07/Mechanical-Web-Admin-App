import React , { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";
import { LuPersonStanding } from "react-icons/lu";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';

const ViewUser = ({ ModalToggle , Toggle , userData }) => {
  
  const handleAccessManager = ( ) => {

    if ( userData.hasOwnProperty('estimator_details') ) 
        return userData?.estimator_details?.is_manager ? 'Manager' : 'Not Manager';
      
    return userData?.auditor_details?.is_manager ? 'Manager' : 'Not Manager';

  }

  const handleAccessLevel = () => {

    if ( userData.hasOwnProperty('auditor_details') ) {

      return  userData?.auditor_details?.access?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item }</span> <br/>
          </React.Fragment>

        )
       )

    } else if ( userData.hasOwnProperty('estimator_details')) {

      return  userData?.estimator_details?.level_type?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item }</span> <br/>
          </React.Fragment>

        )
       )

    }

  }

  const handleAuditor = () => {
    
    if ( userData.hasOwnProperty('auditor_details') ) {

      return  userData?.auditor_details?.auditors?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item?.first_name } { item?.last_name }</span> <br/>
          </React.Fragment>

        )
       )

    } else if ( userData.hasOwnProperty('estimator_details')) {

      return  userData?.estimator_details?.auditors?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item?.first_name } { item?.last_name }</span> <br/>
          </React.Fragment>

        )
       )

    }
  }

  const handleEstimator = () => {
    
    if ( userData.hasOwnProperty('auditor_details') ) {

      return  userData?.auditor_details?.estimators?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item?.first_name } { item?.last_name }</span> <br/>
          </React.Fragment>

        )
       )

    } else if ( userData.hasOwnProperty('estimator_details')) {

      return  userData?.estimator_details?.estimators?.map( ( item ) => 
        (
          <React.Fragment>
            <span className='text-tableTextColor'>{ item?.first_name } { item?.last_name }</span> <br/>
          </React.Fragment>

        )
       )

    }
  }

  return (
    <ModalDefault 
        title={"User Details"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[35%] h-[60%]'}
    >
      <div className='px-4 w-full flex flex-col gap-5'>
                      
        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-black'><FaUserCircle/></span>         
              <span style={{ fontSize:16}} className='text-black'><Bold>User Information</Bold></span>                 
            </div>
            
          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3 break-words'>

              <div>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Full Name</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ userData?.first_name } { userData?.last_name }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Email Address</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center w-full'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5 w-11/12'>{ userData?.email }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Mobile Number</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ userData?.mobile_number }</span>
              </div>
              

          </div>

        </Card>

                              
        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-black'><LuPersonStanding/></span>         
              <span style={{ fontSize:16}} className='text-black'><Bold>User Access</Bold></span>                 
            </div>
     
          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3'>

              <div>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Status</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-mainText font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-mainText ml-5'>Active</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>User Type</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ userData?.hasOwnProperty('estimator_details') ? 'Estimator' : 'Auditor' }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Access</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ handleAccessManager() }</span>
              </div>

              
              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>{ userData?.hasOwnProperty('auditor_details') ? "Access Level" : "Level Type"}</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ handleAccessLevel() }</span>
              </div>
   
              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Region</span>
                </TextDisplay>
              </div>
       
              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ userData?.hasOwnProperty('auditor_details') ? userData?.auditor_details?.region?.name : userData?.estimator_details?.region?.name }</span>
              </div>

              { userData?.hasOwnProperty('auditor_details') ?

                <React.Fragment>

                <div className='mt-2'>
                  <TextDisplay>
                      <span style={{ fontSize:16}}>Auditors</span>
                  </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                    <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                    <span style={{ fontSize:16}} className='text-black ml-5'>{ handleAuditor() }</span>
                </div>
                  
                </React.Fragment> : null
              
              }
  
              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Estimators</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ handleEstimator() }</span>
              </div>
            
          </div>

        </Card>
            
      </div>
    </ModalDefault>
   
  )
}

export default ViewUser
