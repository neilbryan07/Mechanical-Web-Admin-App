import React, { useState } from 'react';

import Regular from '../../../../component/Typography/Regular'

import { MdKeyboardArrowDown } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { AiOutlineCreditCard, } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";

import { MdInfo , MdStore , MdAttachMoney  } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { FaRegEye , FaLock  } from "react-icons/fa";

import { useParams } from 'react-router-dom';


import { getDate } from '../../../../contants';

import Bold from "../../../../component/Typography/Bold"
import TextDisplay from '../../../../component/Typography/TextDisplay'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import EditOtherInformation from '../modal/EditOtherInformation';

import ViewScopeData from '../modal/ViewScopeData'

import ModalAppointment from '../../Appointment/Modal/ModalAppointment';

import { GradientTableRow } from '../../../../contants/StaticData';

import { APIServices } from '../../../../hooks/fetchAPI';

import { ToastContainer, toast } from 'react-toastify';

const rows = [

    { id : 1 , scope_sheets : 'Supplement 1' , uploaded_date : 'February 26, 2024 8:30 AM' , admin : 'Mike Doe'}, 
    { id : 1 , scope_sheets : 'Supplement 2' , uploaded_date : 'February 26, 2024 8:30 AM' , admin : 'Mike Doe'}, 
   
]


const AccordionExample = ({ CustomerData }) => {

    const { id } = useParams();
    
    const [ modal , setModal ] = useState(false);
    const [ viewScopeSheet , setViewScopeSheet ] = useState(false);
    const [ techScopeData , setTechScopeData ] = useState([])
    const [ modalAppoint , setModalAppoint ] = useState(false);

    const handleScopeTechSheet = async ( data ) => {

        const res = await APIServices.put({ url: `/workfile/v2/tech-scope-sheet/web/viewed/${id}/${data?._id}` })
        setTechScopeData( data )
        setViewScopeSheet(true)
        
    }

    const handleCopy = (id) => {

        const textToCopy  = document.getElementById(id);
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        notify();
       
    }

    const handleColorGradient = ( data ) => {

        if ( CustomerData?.work_status === 'Completed' || CustomerData?.work_status === 'Ready to Audit' || data?.sheet_name === 'Initial Scope' ) {
            return "rgba(255, 255, 255, 0.2)";
        }

        const propertiesToCheck = [
          'tech_sheet_left_fender',
          'tech_sheet_right_fender',
          'tech_sheet_left_front_door',
          'tech_sheet_right_front_door',
          'tech_sheet_wind_shield',
          'tech_sheet_left_rail',
          'tech_sheet_right_rail',
          'tech_sheet_roof',
          'tech_sheet_left_rear_door',
          'tech_sheet_right_rear_door',
          'tech_sheet_left_fuel_door',
          'tech_sheet_right_fuel_door',
          'tech_sheet_left_quarter_box',
          'tech_sheet_right_quarter_box',
          'tech_sheet_left_cab_cnr',
          'tech_sheet_right_cab_cnr'
        ];
      
        const hasNonEmptyProperty = propertiesToCheck.some(property => {
          const value = data?.[property];
          return value?.note !== '' || value?.photo?.length > 0;
        });

        return hasNonEmptyProperty ? "rgba(160, 32, 240, 0.2)" : "rgba(255, 255, 255, 0.2)";

      }

      
    const dollarFormat = ( a  = 0 , b = 0 ) => {
        let data = a + b;
        return  data?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }

    const notify = () => toast("Successfully Copied");

  return (
    <>
        <EditOtherInformation ModalToggle={setModal} Toggle={modal} CustomerData={CustomerData} />
        <ViewScopeData getCustomer={ techScopeData } ModalToggle={setViewScopeSheet} Toggle={viewScopeSheet}/>
        
        <ToastContainer position="bottom-right" autoClose={1000}/>
        <ModalAppointment setStepper={ setModalAppoint } stepper={ modalAppoint } workfile = { CustomerData?._id }/>

        {/* <ViewScopeData getCustomer={ CustomerData } ModalToggle={setViewScopeSheet} Toggle={viewScopeSheet}/> */}
        <Accordion>

        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
            <div className='flex flex-row items-center gap-2'>
                <span style={{ fontSize:18}} className='text-black'><MdStore/></span>
                <span style={{ fontSize:18}} className='text-black'><Bold>Shop Details</Bold></span>
            </div>
        </AccordionSummary>

        <AccordionDetails>

            <div className='flex flex-row items-center justify-between w-full'>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Shop name</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.shop_name}</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Address</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.shop_address}</Bold></span>
                    </div>
                    
                    <TextDisplay>
                        <span style={{ fontSize:18}}>Phone Number</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.shop_phone_number}</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Email Address</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <p style={{ fontSize:18}} className='text-black break-all'><Bold>{CustomerData?.shop_email_address}</Bold></p>
                    </div>

                </div>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                    {/* <TextDisplay>
                        <span style={{ fontSize:18}}>VIN / Plate</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>4Y1SL65848Z411439 / PGD 4582</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Vehicle</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>2020 TESLA MODEL-X</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Color</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>(929)221-9113</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18 , display: 'none'}}>Color</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center'>
                        <span style={{ fontSize:18,}} className='invisible mr-2 font-extrabold text-black '>:</span>
                        <span style={{ fontSize:18}} className='invisible text-black '><Bold>(929)221-9113</Bold></span>
                    </div> */}

                </div>

            </div>

        </AccordionDetails>

        </Accordion>

        <br/>

    <Accordion>

        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>

            {/* <div className='flex flex-row items-center gap-2'>
                <span style={{ fontSize:18}} className='text-black'><ImUsers/></span>
                <span style={{ fontSize:18}} className='text-black'><Bold>Customer Details</Bold></span>
            </div> */}

            <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize:18}} className='text-black'><ImUsers/></span>
                    <span style={{ fontSize:18}} className='text-black'><Bold>Customer Details</Bold></span>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize:18}} className='text-black'><FaCar/></span>
                    <span style={{ fontSize:18}} className='text-black'><Bold>Vehicle Details</Bold></span>
                </div>

            </div>


        </AccordionSummary>

        <AccordionDetails>

            <div className='w-full flex flex-row justify-between items-center max-[1075px]:flex-col'>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full h-full">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Customer Full Name</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold> { CustomerData?.customer?.full_name } </Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Address</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.customer?.address}</Bold></span>
                    </div>
                    
                    <TextDisplay>
                        <span style={{ fontSize:18}}>Phone Number</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.customer?.phone_number}</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Email Address</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <p style={{ fontSize:18}} className='w-full text-black break-all'><Bold>{ CustomerData?.customer?.email_address }</Bold></p>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18 , display: 'none'}}>Color</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18,}} className='invisible mr-2 font-extrabold text-black '>:</span>
                        <span style={{ fontSize:18}} className='invisible text-black '><Bold>(929)221-9113</Bold></span>
                    </div>

                </div>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>VIN</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='flex flex-row gap-3 text-black'>
                            <Bold>
                                <span id='customer_vehicle_vin'>{CustomerData?.vehicle_vin}</span>
                            </Bold>
                            <span className='cursor-pointer' onClick={()=> handleCopy('customer_vehicle_vin')}><FiCopy/> </span>
                            
                        </span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Year</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ CustomerData?.vehicle_year }</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Make</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ CustomerData?.vehicle_make }</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Model</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.vehicle_model}</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Color</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.vehicle_color}</Bold></span>
                    </div>

                    

                </div>

            </div>

        </AccordionDetails>

    </Accordion>

    <br/>

    <Accordion>

        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
            <div className='flex flex-row items-center gap-2'>
                <span style={{ fontSize:18}} className='text-black'><AiOutlineCreditCard/></span>
                <span style={{ fontSize:18}} className='text-black'><Bold>Insurance Information</Bold></span>
            </div>
        </AccordionSummary>

        <AccordionDetails>

            <div className='w-full flex flex-row justify-between items-center max-[1075px]:flex-col'>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Insurance Company</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.insurance?.provider }</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Claim Number</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        
                        <span style={{ fontSize:18}} className='flex flex-row gap-3 text-black'>
                            <Bold>
                                <span id='customer_claim_number'>{CustomerData?.insurance_claim_number }</span>
                            </Bold>
                            <span className='cursor-pointer' onClick={()=> handleCopy('customer_claim_number')}><FiCopy/> </span>
                            
                        </span>
                    </div>
                    
                    <TextDisplay>
                        <span style={{ fontSize:18}}>Deductible</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.insurance_deductible }</Bold></span>
                    </div>

                </div>

                <div class="grid grid-cols-2 gap-y-2 items-center w-full">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Adjuster</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.insurance_adjuster_full_name }</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Policy Number</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.insurance_policy_number }</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18 , display: 'none'}}>x</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18,}} className='invisible mr-2 font-extrabold text-black '>:</span>
                        <span style={{ fontSize:18}} className='invisible text-black '><Bold>x</Bold></span>
                    </div>

                </div>

            </div>

        </AccordionDetails>

        </Accordion>

        <br/>

        <Accordion>

        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
            <div className='flex flex-row items-center gap-2'>
                <span style={{ fontSize:18}} className='text-black'><MdInfo/></span>
                <span style={{ fontSize:18}} className='text-black'><Bold>Other Information</Bold></span>
            </div>
        </AccordionSummary>

        <AccordionDetails>

            <div className='w-full flex flex-row justify-between items-center max-[1075px]:flex-col'>

                <div class="grid grid-cols-2 gap-y-2 items-center w-2/4">

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Assignment Uploaded</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ getDate( CustomerData?.other_detail_date_time_upload ) }</Bold></span>
                        {/* <span style={{ fontSize:18}} className='text-black'><Bold>April 26, 2023 - 8:00 AM</Bold></span> */}
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Repair Date</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ getDate( CustomerData?.other_detail_repair_date ) }</Bold></span>
                        {/* <span style={{ fontSize:18}} className='text-black'><Bold>April 26, 2023 - 8:00 AM</Bold></span> */}
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Direction to Pay</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ CustomerData?.dtp?.signature?.length > 0 ? "Yes" : "No" }</Bold></span>
                    </div>
                    
                    <TextDisplay>
                        <span style={{ fontSize:18}}>Possible T/L</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.other_detail_possible_tl}</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Threshold Percent</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>{CustomerData?.other_info_threshold_percent}%</Bold></span>
                    </div>

                    <TextDisplay>
                        <span style={{ fontSize:18}}>Initial Estimate</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        {/* <span style={{ fontSize:18}} className='text-black'><Bold>$ {CustomerData?.other_detail_initial_estimate?.toLocaleString()}</Bold></span> */}
                        <span style={{ fontSize:18}} className='text-black'><Bold>{ dollarFormat(CustomerData?.other_detail_initial_estimate)}</Bold></span>
                        
                    </div>

                    { CustomerData?.supplement_files.map ( (item , key) => ( 

                        <React.Fragment>

                            <TextDisplay>
                                <span style={{ fontSize:18}}>Supplement { key + 1 }</span>
                            </TextDisplay>

                            <div className='flex flex-row items-center w-11/12'>
                                <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                                <span style={{ fontSize:18}} className='text-black'><Bold>${ item?.supplement_amount?.toLocaleString() }</Bold></span>
                            </div>

                        </React.Fragment>

                     ))}

                    {/* { CustomerData?.supplement_file?.length ? 

                    <React.Fragment>

                        <TextDisplay>
                            <span style={{ fontSize:18}}>Supplement</span>
                        </TextDisplay>

                        <div className='flex flex-row items-center w-11/12'>
                            <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                            <span style={{ fontSize:18}} className='text-black'><Bold>{ CustomerData?.supplement_file?.length ? CustomerData?.supplement_file?.length : null }</Bold></span>
                        </div>

                    </React.Fragment> : 

                    <React.Fragment>

                        <TextDisplay>
                            <span style={{ fontSize:18 , display: 'none'}}>x</span>
                        </TextDisplay>

                        <div className='flex flex-row items-center'>
                            <span style={{ fontSize:18,}} className='invisible mr-2 font-extrabold text-black '>:</span>
                            <span style={{ fontSize:18}} className='invisible text-black '><Bold>x</Bold></span>
                        </div>

                    </React.Fragment> } */}


                    {/* <TextDisplay>
                        <span style={{ fontSize:18}}>Supplement Total</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>$0</Bold></span>
                    </div> */}

                    {/* <TextDisplay>
                        <span style={{ fontSize:18}}>Estimate Total</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center w-11/12'>
                        <span style={{ fontSize:18,}} className='mr-2 font-extrabold text-black'>:</span>
                        <span style={{ fontSize:18}} className='text-black'><Bold>-</Bold></span>
                    </div> */}

                    <TextDisplay>
                        <span style={{ fontSize:18 , display: 'none'}}>x</span>
                    </TextDisplay>

                    <div className='flex flex-row items-center'>
                        <span style={{ fontSize:18,}} className='invisible mr-2 font-extrabold text-black '>:</span>
                        <span style={{ fontSize:18}} className='invisible text-black '><Bold>x</Bold></span>
                    </div>

                </div>

                

            </div>

            <div className='flex flex-row items-center justify-end w-full gap-2'>

                <div onClick={ () => setModalAppoint( true ) } className='bg-mainText py-2 px-3 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 max-[560px]:order-first max-[560px]:self-end'>
                    <span className='text-lg text-white text-bold'><HiPlus/></span>
                    <Regular><span className='ml-3 text-sm text-white'>Add Repair Calendar</span></Regular>
                </div>

                <div onClick={ () => setModal(true) } className='flex flex-row items-center px-3 py-2 border-2 rounded-md cursor-pointer gap'>
                    <span className='text-lg text-black text-bold'><BsFillPencilFill/></span>
                    {/* <TextDisplay>
                        <span style={{ fontSize:18}}>Edit</span>
                    </TextDisplay> */}
                    <Regular><span className='ml-3 text-sm text-black'>Edit</span></Regular>
                </div>
            
            </div>

        </AccordionDetails>

        </Accordion>
        <br/>

        <Accordion>

        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
            <div className='flex flex-row items-center gap-2'>
                <span style={{ fontSize:18}} className='text-black'><MdAttachMoney/></span>
                <span style={{ fontSize:18}} className='text-black'><Bold>Scope Sheet Details</Bold></span>
            </div>
        </AccordionSummary>

        <AccordionDetails>

            <div className='w-full flex flex-row justify-between items-center max-[1075px]:flex-col'>

            <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell><span className='font-bold text-black'>Scope Sheet Title</span></TableCell>
                    <TableCell><span className='font-bold text-black'>Upload Date and Time</span></TableCell>
                    <TableCell><span className='font-bold text-black'>Administered By</span></TableCell>
                    <TableCell align="center"><span className='font-bold text-black'>Action</span></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>

                {/* <TableRow>
                    <TableCell>Initial Estimate</TableCell>
                    <TableCell>{ getDate( CustomerData?.customer?.createdAt ) }</TableCell>
                    <TableCell>{ CustomerData?.customer?.full_name }</TableCell>
                    <TableCell>

                        <div className='flex flex-col items-center w-full'>

                            <div onClick={ ()=> setViewScopeSheet(true) }  className='w-[150px] flex flex-row gap-3 items-center justify-center py-2 px-5 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                                <Regular>View</Regular>
                                <FaRegEye/>
                            </div> 

                        </div>

                    </TableCell>
                </TableRow> */}

                { CustomerData?.tech_scope_sheet?.filter((row) => row?.is_completed === true)?.map((row) => (
                    <GradientTableRow key={row?._id} colorGradient={ handleColorGradient(row)  }>
                    <TableCell >{row?.sheet_name}</TableCell>
                    <TableCell>{ getDate( row?.timestamp ) }</TableCell>
                    <TableCell>{ row?.administered_by?.first_name } {row?.administered_by?.last_name }</TableCell>
                    <TableCell>
                     
                        <div className='flex flex-col items-center w-full'>

                            <div onClick={ ()=> handleScopeTechSheet(row) }  className='w-[150px] flex flex-row gap-3 items-center justify-center py-2 px-5 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                                <Regular>View</Regular>
                                { row?.is_web_viewed ? <FaLock/> : <FaRegEye/> }
                            </div> 

                        </div>

                    </TableCell>
                    </GradientTableRow>
                ))}


                </TableBody>
            </Table>
            </TableContainer>

            </div>

        </AccordionDetails>

        </Accordion>

    </>
  )
}

export default AccordionExample
