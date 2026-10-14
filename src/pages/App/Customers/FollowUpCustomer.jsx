import React, { useState} from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'
import SubHeader from '../../../component/Typography/SubHeader'
import TextInputs from '../../../component/FormInput'

import Card from "../../../component/Card/Card"

import { HiPlus } from "react-icons/hi";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { AiFillFlag, AiOutlineCreditCard, AiFillCar } from "react-icons/ai";
import { FaCalendarDay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { FaToolbox } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";

import { DashboardIcons, pageRoutes, ProgressIcon } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

import ModalDefault from '../../../component/Modal/ModalDefault';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const rows = [
  { id : 1 , name : 'Jake Ballard', schedule : 'April 4, 2023 - 3:30 PM', status : 'Left a Message' },
  { id : 2 , name : 'Fitzgerald Grant', schedule : 'April 4, 2023 - 3:30 PM', status : 'Add to Repair Calendar' },
  { id : 3 , name : 'Olivia Pope', schedule : 'April 4, 2023 - 3:30 PM', status : 'Called No Answer' },
  { id : 4 , name : 'Huck Munoz', schedule : 'April 4, 2023 - 3:30 PM', status : 'Repairing Somewhere Else' },
  { id : 5 , name : 'Quin Perkins', schedule : 'April 4, 2023 - 3:30 PM', status : 'Not Interested' },
  { id : 6 , name : 'Mellie Grant', schedule : 'April 4, 2023 - 3:30 PM', status : 'Track Payment' },
  { id : 7 , name : 'Abby Whelan',  schedule : 'April 4, 2023 - 3:30 PM', status : 'Contacted Insurance' },
  { id : 8 , name : 'David Rosen', schedule : 'April 4, 2023 - 3:30 PM', status : 'Left a Message' },
  { id : 9 , name : 'Susan Ross', schedule : 'April 4, 2023 - 3:30 PM', status : 'Add to Repair Calendar' },
  { id : 10 , name : 'Bonnie WinterBottom', schedule : 'April 4, 2023 - 3:30 PM', status : 'Called No Answer' },
];


const columns = [
  { id: 'id', label: '#', minWidth: 100 },
  { id: 'name', label: 'Customer Name', minWidth: 200 },
  { id: 'schedule', label: 'Check-In Date and Time', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 300 },
];

const columnsModal = [
  { id: 'date', label: 'Date and Time', minWidth: 200 },
  { id: 'activity', label: 'Activity', minWidth: 250 },
  { id: 'admin', label: 'Administered By', minWidth: 250 },
  { id: 'remark', label: 'Remarks', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 250 },
];


const historyRows = [
  { date : 'April 4, 2023 - 8:00 AM', activity : 'PDR Repair Complete', admin : 'Mike Doe', remark : 'N/A', status : 'Vehicle Checked-In' },
  { date : 'April 4, 2023 - 8:00 AM', activity : 'Repair is in progress', admin : 'Mike Doe', remark : 'System Generated', status : 'Repair In-Progress' },
  { date : 'April 4, 2023 - 8:00 AM', activity : 'Vehicle Check In', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Vehicle Checked-In' },
  { date : 'April 5, 2023 - 8:00 AM', activity : 'Customer Drop-Off', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Dropped-Off' },
  { date : 'April 4, 2023 - 5:20 PM', activity : 'Schedule for Repair', admin : 'Mike Doe', remark : 'Schedule Date is April 5, 2023- 8:00 AM', status : 'Schedule for Repair' },
  { date : 'April 4, 2023 - 5:20 PM', activity : 'Follow-Up Customer', admin : 'Jane Doe', remark : 'Added to Repair Calendar', status : 'Follow-up Customer' },
  { date : 'April 4, 2023 - 5:11 PM', activity : 'Estimate has been sent', admin : 'Johnathan Doe', remark : 'Needs to undergo PDR', status : 'Inspected' },
  { date : 'April 4, 2023 - 5:10 PM', activity : 'Estimate Created', admin : 'Johnathan Doe', remark : '$500 for PDR', status : 'Estimate Created' },
  { date : 'April 4, 2023 - 5:00 PM', activity : 'Inspected', admin : 'Johnathan Doe', remark : 'Needs to undergo PDR', status : 'Inspected' },
  { date : 'April 4, 2023 - 3:33 PM', activity : 'Schedule for Inspection', admin : 'John Doe', remark : 'Found a dent in the rear portion of the car', status : 'For Inspection' },
  { date : 'April 4, 2023 - 3:33 PM', activity : 'Customer Check-In', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Checked-In' }
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 23,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#D2ECD8',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#D2ECD8',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#D2ECD8',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#D2ECD8',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <img src={ ProgressIcon.ProgressCustomerIcon} alt='icon' width={32} height={32}/>,
    2: <img src={ ProgressIcon.ProgressSearchIcon} alt='icon' width={32} height={32}/>,
    3: <img src={ ProgressIcon.ProgressCalculatorIcon} alt='icon' width={32} height={32}/>,
    4: <img src={ ProgressIcon.ProgressRepairIcon} alt='icon' width={32} height={32}/>,
    5: <img src={ ProgressIcon.ProgressDropOffIcon} alt='icon' width={32} height={32}/>,
    6: <img src={ ProgressIcon.ProgressCarIcon} alt='icon' width={32} height={32}/>,
    7: <img src={ ProgressIcon.ProgressCaseIcon} alt='icon' width={32} height={32}/>,
    8: <img src={ ProgressIcon.ProgressCheckIcon} alt='icon' width={32} height={32}/>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['1. Customer Check In', '2. Vehicle Inspection', '3. Estimate has been sent', '4. Repair Scheduled', '5. Drop off Date', '6. Vehicle Check-In', '7. Repair Started', '8. Repair Completed'];

const FollowUpCustomer = () => {

  const [ customerModal , setCustomerModal ] = useState(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SubContainer>

        <ModalDefault 
          title={"Customer Information"}
          toggle={customerModal}
          setToggle={setCustomerModal}
          // size={ value === 1 ? 'w-4/6' : 'w-3/6 h-full'}
        >
          <div className='px-4'>

          <Tabs
            onChange={handleChange}
            value={value}
            aria-label="Tabs where selection follows focus"
            selectionFollowsFocus
          >
            <Tab label="Customer Details" {...a11yProps(0)} />
            <Tab label="Transaction History" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>

            <div className='w-full flex flex-row justify-between'>

              <div className='flex flex-row gap-3 items-center'>
                <img src={DashboardIcons.EMPLOYEE} alt='icon' width={62} height={54}/>
                <span className='text-mainText p-1 border border-mainText rounded-full' style={{ fontSize:11}}><AiFillFlag/></span>
              </div>

              <div className='bg-mainText gap-2 py-2 px-4 rounded-md flex flex-row items-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
                <span className='text-white text-bold'><FaCalendarDay/></span>
                <Regular><span className='text-white'>Set an Appointment</span></Regular>
              </div>
              
            </div>

            <br/>

            <Accordion>

              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<MdKeyboardArrowDown />}>
                <div className='flex flex-row items-center gap-2'>
                  <span style={{ fontSize:14}} className='text-gray-800'><ImUsers/></span>
                  <span style={{ fontSize:14}} className='text-gray-800'><Bold>Customer Contact Information</Bold></span>
                </div>
              </AccordionSummary>

              <AccordionDetails>

                <div class="grid grid-cols-2 gap-y-2 items-center">

                  {/* Name */}

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
                    <TextDisplay>(303) 221-9113</TextDisplay>
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

                  {/* Name */}

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
                    <TextDisplay>(303) +1-202-555-0135</TextDisplay>
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

                  {/* Name */}

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
                  
                  <span className='text-gray-600 cursor-pointer' onClick={ () => setCustomerModal(false) }>
                    <Bold>Cancel</Bold>
                  </span>

                  <div className='flex items-center justify-center py-2 px-14 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                    <Bold>Save</Bold>
                  </div>

              </div>
            </div>

          </TabPanel>

        <TabPanel value={value} index={1}>

          <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={6} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Bold><span style={{ fontSize : 11 }}>{label}</span></Bold>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>

                <TableRow>
                  {columnsModal.map((column) => (
                    <TableCell
                      key={column.reference}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Bold>{column.label}</Bold>
                    </TableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>
                {historyRows.map((row) => (
                  <TableRow
                    key={historyRows.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.date}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.activity}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.admin}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.remark}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.status}</span>
                      </Regular>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>    

          <div className='flex flex-row w-full items-center mt-4 gap-3'>

            <div className='flex flex-row items-center gap-2'>

              <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronLeft/></span>
              </div>

              <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                <Bold>1</Bold>
              </div>
              
              <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                <Bold>2</Bold>
              </div>

              <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                <Bold>3</Bold>
              </div>

              <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronRight/></span>
              </div>

            </div>

            <div className='border border-gray-300 rounded-md py-0.5 px-3 gap-3 flex justify-between items-center cursor-pointer'>
                <Regular>10/page</Regular>
                <img src={DashboardIcons.DROPDOWN} alt='icon'/>
            </div>

          </div>

          </TabPanel>

          </div>

        </ModalDefault>

    <PageHeader name={"Customer - Follow-Up"} description={"Here are the list of customer that followed-up"}/>

    <div className='w-full flex flex-row items-center justify-between mb-3 max-[933px]:flex-col max-[933px]:gap-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
            <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
            <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
            <Regular><span className='text-secondaryText text-sm'>/ Customer / Follow-Up / List of Customer per Location</span></Regular>
        </div>

    <div className='w-full flex flex-row gap-3 items-center justify-end'>

        {/* Search */}
        <div className='w-4/12 relative'>
            <input placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
            <span className='text-regularText'><AiOutlineSearch/></span>
            </div>
        </div>

        {/* Icon */}
        <div className='flex flex-row items-center justify-between gap-2'>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
            <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
            <span className='text-zinc-700' style={{ fontSize:17}}><RiFilterFill/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
            <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
            </div>

        </div>

    </div>

    </div>

    
    <Card>
      <div className='w-full flex justify-between items-center'>

        <a href={pageRoutes.FOLLOWUPSTATE} className='flex flex-row items-center gap-2'>
          <span  style={{ fontSize:19 }} className='text-mainText'><BsChevronLeft/></span>
          <Header><span className='text-mainText'>New York (54)</span></Header>

        </a>

        <div className='flex flex-row gap-5'>
          
          <div className='bg-mainText py-2 px-4 rounded-md flex flex-row items-center'>
            <span className='text-white text-bold text-xl'><HiPlus/></span>
            <Regular><span className='text-white ml-3'>Add</span></Regular>
          </div>

        </div>


      </div>

      <br/>

      <TableContainer component={Paper}>
      <Table aria-label="simple table">

          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.reference}
                style={{ minWidth: column.minWidth }}
              >
                <Bold>{column.label}</Bold>
              </TableCell>
            ))}
          </TableRow>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell>
                <Regular>
                  <span className='text-regularText'>{row.id}</span>
                </Regular>
              </TableCell>

              <TableCell>
                <Regular>
                  <span className='text-regularText cursor-pointer' onClick={() => setCustomerModal(true)}>{row.name}</span>
                </Regular>
              </TableCell>

              <TableCell>
                <Regular>
                  <span className='text-regularText'>{row.schedule}</span>
                </Regular>
              </TableCell>

              <TableCell>
                
                {row.status === 'Left a Message' ?
                  <Bold>
                    <span className='text-reguarYellow border-reguarYellow border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Add to Repair Calendar' ?
                  <Bold>
                    <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Called No Answer' ?
                  <Bold>
                    <span className='text-regularIndigo border-regularIndigo border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Repairing Somewhere Else' ?
                  <Bold>
                    <span className='text-regularLightOrange border-regularLightOrange border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Not Interested' ?
                  <Bold>
                    <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Track Payment' ?
                  <Bold>
                    <span className='text-regularCyan border-regularCyan border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Contacted Insurance' ?
                  <Bold>
                    <span className='text-regularGrey border-regularGrey border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }


              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div className='flex flex-row w-full items-center mt-4 gap-3'>

        <div className='flex flex-row items-center gap-2'>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronLeft/></span>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>1</Bold>
          </div>
          
          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>2</Bold>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>3</Bold>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronRight/></span>
          </div>

        </div>

        <div className='border border-gray-300 rounded-md py-0.5 px-3 gap-3 flex justify-between items-center cursor-pointer'>
            <Regular>10/page</Regular>
            <img src={DashboardIcons.DROPDOWN} alt='icon'/>
        </div>

      </div>

    </Card>
    <div className='mb-16'/>
  </SubContainer>
  )
}

export default FollowUpCustomer
