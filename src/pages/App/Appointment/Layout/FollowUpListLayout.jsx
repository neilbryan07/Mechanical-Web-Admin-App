import React, { useState } from 'react'

import Bold from '../../../../component/Typography/Bold';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import SubHeader from '../../../../component/Typography/SubHeader';
import TextInputs from '../../../../component/FormInput';
import Regular from '../../../../component/Typography/Regular';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { MdKeyboardArrowDown, MdStore } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { AiOutlineCreditCard, AiFillCar } from "react-icons/ai";
import { FaToolbox, FaRegCalendar } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";

import ModalAppointment from '../Modal/ModalAppointment';

import { getDate, DashboardIcons } from '../../../../contants';

import { HiPlus } from "react-icons/hi";

const FollowUpListLayout = ({ repairData }) => {

    const [stepper, setStepper] = useState(false);

    const combineDateTime = (dateData, timeData) => {

        const date = new Date(dateData);

        const [timeModify, modifier] = timeData?.split(' ');
        const [hours, minutes] = timeModify.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (minutes === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
        }

        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);

        const formattedDateTime = date.toLocaleString();
        return formattedDateTime;

    };

    return (
        <React.Fragment>

            <ModalAppointment setStepper={setStepper} stepper={stepper} workfile={repairData?.workfile?._id} />

            <div className='w-full flex flex-row items-center justify-between mb-5'>

                <div className='flex flex-row gap-4'>

                    <img src={DashboardIcons.EMPLOYEEFOLLOWUP} alt='icon' width={70} height={70} />
                    <img src={DashboardIcons.FLAGFOLLOWUP} alt='icon' width={30} height={30} />

                </div>
                {repairData?.workfile &&
                    <div onClick={() => setStepper(true)} className='bg-mainText py-2 px-3 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 max-[560px]:order-first max-[560px]:self-end' >
                        <span className='text-white text-bold text-lg'><FaRegCalendar /></span>
                        <Regular><span className='text-white ml-3 text-sm'>Set an Appointment</span></Regular>
                    </div>
                }

            </div>


            <Accordion>

                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><MdStore /></span>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><Bold>Shop Details</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        <div><TextDisplay>Shop Name</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.shop_name}</TextDisplay>
                        </div>

                        <div><TextDisplay>Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.shop_address}</TextDisplay>
                        </div>

                        <div><TextDisplay>Phone Number</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.shop_phone_number}</TextDisplay>
                        </div>

                        <div><TextDisplay>Email Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.shop_email_address}</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>

            <br />

            <Accordion>

                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><ImUsers /></span>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><Bold>Customer Contact Information</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        <div><TextDisplay>Check-in Date and Time</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            {/* <TextDisplay>{ getDate( combineDateTime( repairData?.drop_off_date ,  repairData?.drop_off_time ) ) }</TextDisplay> */}
                        </div>

                        <div><TextDisplay>Customer Full Name</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.customer?.full_name}</TextDisplay>
                        </div>

                        <div><TextDisplay>Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.customer?.address}</TextDisplay>
                        </div>

                        <div><TextDisplay>Phone Number</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.customer?.phone_number}</TextDisplay>
                        </div>

                        <div><TextDisplay>Email Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.customer?.email_address}</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>

            <br />

            <Accordion>

                <AccordionSummary aria-controls="panel2a-content" id="panel2a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><AiOutlineCreditCard /></span>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><Bold>Insurance Information</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        <div><TextDisplay>Claim Number</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.insurance_claim_number}</TextDisplay>
                        </div>

                        <div><TextDisplay>Customer Full Name</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.insurance_insured_fullname}</TextDisplay>
                        </div>

                        <div><TextDisplay>Adjuster Name</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.insurance_adjuster_full_name}</TextDisplay>
                        </div>

                        <div><TextDisplay>Phone Number</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.insurance_adjuster_phone_number}</TextDisplay>
                        </div>

                        <div><TextDisplay>Email Address</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.insurance_adjuster_email_address}</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>

            <br />

            <Accordion>

                <AccordionSummary aria-controls="panel3a-content" id="panel3a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><AiFillCar /></span>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><Bold>Vehicle Information</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        {/* Name */}

                        <div><TextDisplay>Year</TextDisplay></div>

                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_year}</TextDisplay>
                        </div>

                        <div><TextDisplay>VIN</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_vin}</TextDisplay>
                        </div>

                        <div><TextDisplay>Make</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_make}</TextDisplay>
                        </div>

                        <div><TextDisplay>Model</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_model}</TextDisplay>
                        </div>

                        <div><TextDisplay>Color</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_color}</TextDisplay>
                        </div>

                        <div><TextDisplay>Mileage</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.workfile?.vehicle_mileage}</TextDisplay>
                        </div>

                        <div><TextDisplay>Note for Estimator</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.note_for_estimator}</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>

            <br />

            <Accordion>

                <AccordionSummary aria-controls="panel4a-content" id="panel4a-header" expandIcon={<MdKeyboardArrowDown />}>
                    <div className='flex flex-row items-center gap-2'>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><FaToolbox /></span>
                        <span style={{ fontSize: 14 }} className='text-gray-800'><Bold>Repair Details</Bold></span>
                    </div>
                </AccordionSummary>

                <AccordionDetails>

                    <div class="grid grid-cols-2 gap-y-2 items-center">

                        <div><TextDisplay>Repair Description</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.repair_desciption}</TextDisplay>
                        </div>

                        <div><TextDisplay>Damage Level</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.damage_level}</TextDisplay>
                        </div>

                        <div><TextDisplay>Parts</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.parts?.join(', ')}</TextDisplay>
                        </div>

                        <div><TextDisplay>Amount of Conventional Repair</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.conventional_repair_amount}</TextDisplay>
                        </div>

                        <div><TextDisplay>Notes</TextDisplay></div>
                        <div className='flex flex-row items-center'>
                            <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                            <TextDisplay>{repairData?.notes}</TextDisplay>
                        </div>

                    </div>

                </AccordionDetails>

            </Accordion>


            <div className='w-full flex flex-row justify-between items-center mt-4'>

                <div className='flex flex-row items-center gap-2'>
                    <span style={{ fontSize: 14 }} className='text-green-500'><TbClipboardList /></span>
                    <span style={{ fontSize: 14 }} className='text-green-500'><Bold>Action Taken</Bold></span>
                </div>

            </div>

            <form className='w-full'>

                <div className='my-2'>
                    <span><SubHeader>Status</SubHeader></span>
                    <TextInputs placeholder={"Left a Message"} type={"text"} />
                </div>

                <div className='my-2'>
                    <span><SubHeader>Remarks</SubHeader></span>
                    <TextInputs placeholder={"Compose a remarks"} type={"text"} />
                </div>

            </form>

            <div className='w-full flex justify-end my-4'>
                <div className='flex flex-row items-center gap-10'>

                    <span className='text-gray-600 cursor-pointer'>
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

export default FollowUpListLayout
