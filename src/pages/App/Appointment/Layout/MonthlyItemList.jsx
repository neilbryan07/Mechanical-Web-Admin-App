import React, { useState , useEffect } from 'react'

import Header from '../../../../component/Typography/Header'
import SubHeader from '../../../../component/Typography/SubHeader'
import Regular from '../../../../component/Typography/Regular'

import { useLocation } from 'react-router-dom';

import { pageRoutes } from '../../../../contants'
import { statusWorkLoads } from '../../../../contants/StaticData';

import { HiPlus } from "react-icons/hi";
import { BsChevronRight, BsChevronLeft , BsChevronDown  } from "react-icons/bs";

import ModalAppointment from '../Modal/ModalAppointment';

import ModalDefault from '../../../../component/Modal/ModalDefault';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const MonthlyItemList = ({ get35DaysGrid }) => {

    let monthFormat = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ];
    let yearFormat = [ 2020 , 2021 , 2022, 2023 , 2024, 2025 , 2026 , 2027 , 2028 ,2029 , 2030 ];

    let location = useLocation();

    const [ stepper , setStepper] = useState(false);

    const [ dateDisplay , setDateDisplay ] = useState('');

    const [ toggleModal , setToggleModal ] = useState(false);
    
    const [ monthModal , setMonthModal ] = useState(null);
    const [ yearModal , setYearModal ] = useState(null)

    useEffect(() => {

        const date = new Date();

        const month = date.getMonth();

        // Get the current year
        const year = date.getFullYear();

        setDateDisplay( `${monthFormat[month]} ${date.getFullYear()}` )

        get35DaysGrid( date.getFullYear() , monthFormat?.indexOf(monthFormat[month]) );

    },[]);

    const handleChange = (e) => {
        setMonthModal( e.target.value  )
    }

    
    const handleChangeYear = (e) => {
        setYearModal( e.target.value  )
    }

    const handleFilter = () => {
        setToggleModal(false)
        setDateDisplay( `${monthModal} ${yearModal}` )
        get35DaysGrid( yearModal , monthFormat?.indexOf(monthModal) );
    }

  return (
    <React.Fragment>

    <ModalDefault 
        title={"Select Month and Year"}
        toggle={ toggleModal }
        setToggle={ setToggleModal }
        size={'h-[340px] w-[400px]'}
    >

        <div className='w-full p-4 flex flex-col'>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ monthModal }
                label="Month"
                onChange={handleChange}
            >
                { monthFormat?.map( ( row , index ) => ( 
                    <MenuItem key = { index } value={row}>{row}</MenuItem>
                ))}

            </Select>
            </FormControl>

            <br/>

            
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ yearModal }
                label="Year"
                onChange={handleChangeYear}
            >
                { yearFormat?.map( ( row , index ) => ( 
                    <MenuItem key = { index } value={row}>{row}</MenuItem>
                ))}

            </Select>
            </FormControl>

            <div className='w-full flex flex-row items-center justify-end gap-2 mt-5'>

                <div className='flex flex-col items-center border border-gray-300 px-3 py-2 rounded cursor-pointer' onClick={ () => setToggleModal(false) }>
                    <span className='text-black text-sm'>Close</span>
                </div>

                <div className='flex flex-col items-center bg-green-500 px-3 py-2 rounded cursor-pointer' onClick={ () => handleFilter() }>
                    <span className='text-white text-sm'>Filter</span>
                </div>
            
            </div>

        </div>

    </ModalDefault>

    <div className='w-full flex flex-row justify-between items-center max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3'>

        <div className='flex flex-row'>

            <div className='gap-2 flex flex-row items-center'>
                <BsChevronLeft/>

                    <div className='flex flex-row gap-2 items-center cursor-pointer' onClick={ () => setToggleModal( true ) }>
                        <span className='text-mainText font-bold'>{ dateDisplay }</span>
                        <span className='text-mainText'><BsChevronDown/></span>
                    </div>

                <BsChevronRight/> 
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
  

        {/* <div className='bg-mainText py-2 px-3 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 max-[560px]:order-first max-[560px]:self-end' onClick={ () => setStepper(true) }>
            <span className='text-white text-bold text-lg'><HiPlus/></span>
            <Regular><span className='text-white ml-3 text-sm'>Add New Assignment</span></Regular>
        </div> */}
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

export default MonthlyItemList
