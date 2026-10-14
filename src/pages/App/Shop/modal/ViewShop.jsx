import React , { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";
import { MdInfo , MdStore , MdAttachMoney  } from "react-icons/md";
import { LuPersonStanding } from "react-icons/lu";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';

const ViewShop = ({ ModalToggle , Toggle , shopData }) => {

  return (
    <ModalDefault 
        title={"Shop Details"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[35%] h-[60%]'}
    >
      <div className='px-4 w-full flex flex-col gap-5'>
                      
        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-black'><MdStore/></span>         
              <span style={{ fontSize:16}} className='text-black'><Bold>Shop Information</Bold></span>                 
            </div>
            
          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3'>

              <div>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Shop Name</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.name }</span>
              </div>
              
              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Shop Address</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.address }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>City</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.city }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>State</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.state }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Zip Code</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.zip_code }</span>
              </div>


              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Email Address</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.email }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Phone Number</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.contact_number }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>EIN Number</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.ein_number }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Region</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.region?.name }</span>
              </div>
              
          </div>

        </Card>

        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-black'><MdStore/></span>         
              <span style={{ fontSize:16}} className='text-black'><Bold>Shop Contact</Bold></span>                 
            </div>
            
          </div>

        { shopData?.contact?.map( ( row , index ) => (

            <div className='w-full px-4 grid grid-cols-2 mt-3 border rounded p-2 break-words' key={ index }>

                <div>
                    <TextDisplay>
                        <span style={{ fontSize:16}}>Name</span>
                    </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                    <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                    <span style={{ fontSize:16}} className='text-black ml-5'>{row?.contact_name }</span>
                </div>

                <div>
                    <TextDisplay>
                        <span style={{ fontSize:16}}>Email</span>
                    </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                    <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                    <span style={{ fontSize:16}} className='text-black ml-5 w-11/12'>{row?.email }</span>
                </div>

                <div>
                    <TextDisplay>
                        <span style={{ fontSize:16}}>Phone Number</span>
                    </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                    <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                    <span style={{ fontSize:16}} className='text-black ml-5'>{row?.phone_number }</span>
                </div>

            </div>

        ))}

        </Card>   

        <Card>

          <div className='w-full flex flex-row items-center justify-between'>
            
            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize:18}} className='text-black'><MdStore/></span>         
              <span style={{ fontSize:16}} className='text-black'><Bold>Shop Pricing</Bold></span>                 
            </div>
            
          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3'>

              <div>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Body Labor Rate</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.body_labor_rate }</span>
              </div>
              
              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Mechanical Labor Rate</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.mechanical_labor_rate }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Paint Labor Rate</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.paint_labor_rate }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Paint Material Rate</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.paint_material_rate }</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                    <span style={{ fontSize:16}}>Shop Rent</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                  <span style={{ fontSize:16}} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize:16}} className='text-black ml-5'>{ shopData?.shop_rent }</span>
              </div>

            
          </div>

        </Card>
         
      </div>
    </ModalDefault>
   
  )
}

export default ViewShop
