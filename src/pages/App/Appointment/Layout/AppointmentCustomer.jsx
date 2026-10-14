import React from 'react'

import Bold from '../../../../component/Typography/Bold';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import SubHeader from '../../../../component/Typography/SubHeader';
import TextInputs from '../../../../component/FormInput';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { MdKeyboardArrowDown } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { AiOutlineCreditCard, AiFillCar } from "react-icons/ai";
import { FaToolbox } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";

const AppointmentCustomer = ({ handleModal }) => {
  return (
    <React.Fragment>

        <Accordion>

            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize:14}} className='text-gray-800'><ImUsers/></span>
                    <span style={{ fontSize:14}} className='text-gray-800'><Bold>Customer Contact Information</Bold></span>
                </div>
            </AccordionSummary>

            <AccordionDetails>

                <div class="grid grid-cols-2 gap-y-2 items-center">

                    <div><TextDisplay>Check-in Date and Time</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>April 04, 2023 - 3:30 PM</TextDisplay>
                    </div>

                    <div><TextDisplay>Customer Full Name</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>Fitzgerald Grant</TextDisplay>
                    </div>

                    <div><TextDisplay>Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>Any St., Anywhere City, 0001</TextDisplay>
                    </div>

                    <div><TextDisplay>Phone Number</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>(303)-221-9113</TextDisplay>
                    </div>

                    <div><TextDisplay>Email Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>Fggrant@gmail.com</TextDisplay>
                    </div>

                </div>
            
            </AccordionDetails>

        </Accordion>

        <br/>

        <Accordion>

            <AccordionSummary aria-controls="panel2a-content" id="panel2a-header" expandIcon={<MdKeyboardArrowDown />}>
                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize:14}} className='text-gray-800'><AiOutlineCreditCard/></span>
                    <span style={{ fontSize:14}} className='text-gray-800'><Bold>Insurance Information</Bold></span>
                </div>
            </AccordionSummary>

            <AccordionDetails>

                <div class="grid grid-cols-2 gap-y-2 items-center">

                    <div><TextDisplay>Claim Number</TextDisplay></div>
                    <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>ABCDE12345</TextDisplay>
                    </div>

                    <div><TextDisplay>Customer Full Name</TextDisplay></div>
                    <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>Fitzgerald Grant</TextDisplay>
                    </div>

                    <div><TextDisplay>Adjuster Name</TextDisplay></div>
                    <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>Will Johnson</TextDisplay>
                    </div>

                    <div><TextDisplay>Phone Number</TextDisplay></div>
                    <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>(303)-1-202-555-0135</TextDisplay>
                    </div>

                    <div><TextDisplay>Email Address</TextDisplay></div>
                    <div className='flex flex-row items-center'>
                        <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                        <TextDisplay>N/A</TextDisplay>
                    </div>

                </div>
            
            </AccordionDetails>

        </Accordion>

        <br/>

        <Accordion>

              <AccordionSummary aria-controls="panel3a-content" id="panel3a-header" expandIcon={<MdKeyboardArrowDown />}>
                <div className='flex flex-row items-center gap-2'>
                  <span style={{ fontSize:14}} className='text-gray-800'><AiFillCar/></span>
                  <span style={{ fontSize:14}} className='text-gray-800'><Bold>Vehicle Information</Bold></span>
                </div>
              </AccordionSummary>

              <AccordionDetails>

                <div class="grid grid-cols-2 gap-y-2 items-center">

                  {/* Name */}

                  <div><TextDisplay>Year</TextDisplay></div>

                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>2019</TextDisplay>
                  </div>

                  <div><TextDisplay>VIN</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>12-3-45678-9-01-234567</TextDisplay>
                  </div>

                  <div><TextDisplay>Make</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>Toyota</TextDisplay>
                  </div>

                  <div><TextDisplay>Modal</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>Vios</TextDisplay>
                  </div>

                  <div><TextDisplay>Color</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>Silver</TextDisplay>
                  </div>

                  <div><TextDisplay>Mileage</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>12000</TextDisplay>
                  </div>

                  <div><TextDisplay>Note for Estimator</TextDisplay></div>
                  <div className='flex flex-row items-center'>
                    <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                    <TextDisplay>N/A</TextDisplay>
                  </div>

                </div>

              </AccordionDetails>

            </Accordion>

            <br/>

            <Accordion>

                <AccordionSummary aria-controls="panel4a-content" id="panel4a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize:14}} className='text-gray-800'><FaToolbox/></span>
                        <span style={{ fontSize:14}} className='text-gray-800'><Bold>Repair Details</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        <div><TextDisplay>Repair Description</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>2019</TextDisplay>
                        </div>

                        <div><TextDisplay>Damage Level</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>Heavy</TextDisplay>
                        </div>

                        <div><TextDisplay>Parts</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>Moldings, Roof, Other Panel R&R</TextDisplay>
                        </div>

                        <div><TextDisplay>Amount of Conventional Repair</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>Small</TextDisplay>
                        </div>

                        <div><TextDisplay>Notes</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>N/A</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>

            <div className='w-full flex flex-row justify-between items-center mt-4'>

                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize:14}} className='text-green-500'><TbClipboardList/></span>
                    <span style={{ fontSize:14}} className='text-green-500'><Bold>Action Taken</Bold></span>
                </div>

            </div>

            <form className='w-full'>

                <div className='my-2'>
                    <span><SubHeader>Status</SubHeader></span>        
                    <TextInputs placeholder={"Left a Message"} type={"text"}/>
                </div>

                <div className='my-2'>
                    <span><SubHeader>Remarks</SubHeader></span>                            
                    <TextInputs placeholder={"Compose a remarks"} type={"text"}/>
                </div>

            </form>

            <div className='w-full flex justify-end my-4'>
                <div className='flex flex-row items-center gap-10'>
                    
                    <span className='text-gray-600 cursor-pointer' onClick={ handleModal }>
                        <Bold>Cancel</Bold>
                    </span>

                    <div className='flex items-center justify-center py-2 px-14 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                        <Bold>Save</Bold>
                    </div>

                </div>
            </div>

    </React.Fragment>
  )
}

export default AppointmentCustomer
