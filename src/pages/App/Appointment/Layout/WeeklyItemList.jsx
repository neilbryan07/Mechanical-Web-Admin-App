import React, { useState } from 'react'

import Header from '../../../../component/Typography/Header'
import SubHeader from '../../../../component/Typography/SubHeader'
import Regular from '../../../../component/Typography/Regular'

import { useLocation } from 'react-router-dom';

import { pageRoutes } from '../../../../contants'
import { statusWorkLoads } from '../../../../contants/StaticData';

import { HiPlus } from "react-icons/hi";
import { BsChevronRight, BsChevronLeft , BsChevronDown  } from "react-icons/bs";

import ModalAppointment from '../Modal/ModalAppointment';

const WeeklyItemList = ({ weeklyDate = null , handleNextWeek , handlePreviousWeek }) => {

let location = useLocation();

const [ stepper , setStepper] = useState(false);

  return (
    <React.Fragment>

    <div className='w-full flex flex-row justify-between items-center max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3'>

        <div className='flex flex-row'>

            <div className='gap-2 flex flex-row items-center'>

                <div className='cursor-pointer' onClick={ () => handlePreviousWeek() } >
                    <BsChevronLeft/>
                </div>
     
                    <React.Fragment>

                        <div className='flex flex-row gap-2 items-center'>
                            <span className='text-mainText font-bold'>{ weeklyDate?.[0] } - { weeklyDate?.[6] }</span>
                        </div>
            
                    </React.Fragment>

                <div className='cursor-pointer' onClick={ () => handleNextWeek() } >
                    <BsChevronRight/>
                </div>
    
            </div> 

            <div className='flex flex-row gap-7 ml-7'>
                <SubHeader><a href={ pageRoutes.APPOINTMENT } className={`cursor-pointer ${location?.pathname === pageRoutes.APPOINTMENT ? 'border-b-2 border-mainText' : null}`}>List</a></SubHeader>
                <SubHeader><a href={ pageRoutes.WEEKLYAPPOINTMENT } className={`cursor-pointer ${location?.pathname === pageRoutes.WEEKLYAPPOINTMENT ? 'border-b-2 border-mainText' : null}`}>Weekly</a></SubHeader>
                <SubHeader><a href={ pageRoutes.MONTHLYAPPOINTMENT } className={`cursor-pointer ${location?.pathname === pageRoutes.MONTHLYAPPOINTMENT ? 'border-b-2 border-mainText' : null}`}>Monthly</a></SubHeader>
            </div>


        </div>

       
            <div className='flex flex-row gap-4 visible max-[1500px]:hidden'>

                { statusWorkLoads.map( ( item, key ) => (
                    <div className='flex flex-row items-center gap-2' key={key}>
                        <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: item.color }}></div>
                        <span className='text-xs font-medium'>{item.name}</span>
                    </div>
                ))}

            </div>
  

        <div className='bg-mainText py-2 px-3 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 max-[560px]:order-first max-[560px]:self-end' onClick={ () => setStepper(true) }>
            <span className='text-white text-bold text-lg'><HiPlus/></span>
            <Regular><span className='text-white ml-3 text-sm'>Add New Assignment</span></Regular>
        </div>
    </div>

            <div className='w-full mt-3 flex items-center justify-center max-[1500px]:visible min-[1500px]:hidden'>

                <div class="grid grid-cols-5 gap-3 max-[990px]:grid-cols-3">
                  { statusWorkLoads.map( ( item, key ) => (
                    <div className='flex flex-row items-center gap-2' key={key}>
                        <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: item.color }}></div>
                        <span className='text-xs font-medium'>{item.name}</span>
                    </div>
                  ))}
                </div>
            
            </div>
    

        <br/>

    </React.Fragment>
  )
}

export default WeeklyItemList
