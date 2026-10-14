import React, {  useState } from 'react'

import * as Yup from 'yup';

import SubHeader from '../../../../component/Typography/SubHeader'
import Bold from '../../../../component/Typography/Bold'
import TextInputs from '../../../../component/FormInput'

import ModalDefault from '../../../../component/Modal/ModalDefault';
import Card from '../../../../component/Card/Card';

import { ColorlibConnector, ColorlibStepIcon } from '../../../../contants';

import { AiOutlineClockCircle, AiOutlineCreditCard, AiFillCar } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { FaToolbox, FaPlusCircle } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import { handlePhoneNumberFormat } from '../../../../contants';

import { APIServices } from '../../../../hooks/fetchAPI';
import { AppointmentValidationSchema as validationSchema, AppointmentformValue as formValue  } from '../../../../contants/validationSchema';

import { DateRangePicker , DateRange } from 'react-date-range';

const options = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Heavy', label: 'Heavy' }
];

const ModalAppointment = ({ setStepper, stepper , workfile }) => {

const [phoneNumber, setPhoneNumber] = useState('');
const [phoneCarNumber, setPhoneCarNumber] = useState('');

const [activeStep, setActiveStep] = React.useState(0);

const [ customer , setCustomer ] = useState(false);
const [ repair , setRepair ] = useState(false);

const [ loading, setLoading ] = useState(false);

const [checkedItems, setCheckedItems] = useState([]);

const [ displayCalendar , setDisplayCalendar ] = useState(false)
const [ customDate , setCustomDate ] = useState(false);

const [ dateTarget , setDateTarget ] = useState(false);
const [ dropOffDate , setDropOffDate ] = useState( null );
const [ dropOffTime , setDropOffTime ] = useState( null ); 
const [ calendarSelection , setCalendarSelection ] = useState(0);

const [ rangeDate , setRangeDate ] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }
]);

const [ customDateStart , setCustomDateStart ] = useState({
  startDate: null,
  endDate: null,
});
const [ customDateEnd , setCustomDateEnd ] = useState( null );

const handleStepperPosition = (data) => {
    setActiveStep((prevActiveStep) => data);
}

const handleCheckboxChange = (value) => {
    // Check if the value is already in the array
    if (checkedItems.includes(value)) {
      // If it is, remove it
      setCheckedItems(checkedItems.filter(item => item !== value));
    } else {
      // If it's not, add it to the array
      setCheckedItems([...checkedItems, value]);
    }
};

const convertDateFormat = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${month}/${day}/${year}`;
};

const convertTimeFormat = (timeStr) => {
  let [hours, minutes] = timeStr.split(':');
  hours = parseInt(hours, 10);
  let suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format, handle 0 as 12
  return `${hours}:${minutes} ${suffix}`; // Replace the minutes with '00' for the conversion
};

const convertDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US'); // This will return the date in MM/DD/YYYY format
};

const addDays = (days) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

const handleSubmit = async (value) => {

    let date_of_repair,target_completion_date;

    switch( parseInt( calendarSelection ) ) {

      case 1:
        date_of_repair = addDays(1);
        target_completion_date = addDays(3); 
        break;
      case 2:
        date_of_repair = addDays(0);
        target_completion_date = addDays(7); 
        break;
      case 3:
        date_of_repair = addDays(7);
        target_completion_date = addDays(14); 
        break;
      default:
        date_of_repair = rangeDate?.[0]?.startDate;
        target_completion_date = rangeDate?.[0]?.endDate;
        break;
    }

    let dataValueNew = {
      "workfile": workfile,
      "date_of_repair": convertDateFormat( dropOffDate ),
      // "date_of_repair": convertDate( date_of_repair ),
      "drop_off_date": convertDateFormat( dropOffDate ),
      "drop_off_time": convertTimeFormat( dropOffTime ),
      "target_completion_date": convertDate( target_completion_date ),
      "repair_desciption": value.repair_description,
      "damage_level": value.damage_level,
      "note_for_estimator": "this is a note for estimator",
      "conventional_repair": 5,
      "conventional_repair_amount": "low",
      "parts": checkedItems,
      "notes": value.notes,
      "repair_calendar_status": "pending",
      "status": 1
    }

    setLoading(true)
    const res = await APIServices.post({ url: '/repair-calendar/add', payload: dataValueNew })

    if (res.status === 200) {

        setTimeout(() => {
          window.location.reload();
          setLoading(false)
        }, 1200);

    } 

}

const handleStaticRange = ( data ) => {

  const next1to3 = [
    addDays(1),
    addDays(2),
    addDays(3)
  ];

  const oneWeekFromNow = [
    addDays(0),
    addDays(7)
  ];

  const next7to14 = [
    addDays(7),
    addDays(14)
  ];

  switch( parseInt( data ) ) {

    case 1:
      return handleSaveDateandTimeSchedule( next1to3[ next1to3?.length - 1 ] );
    case 2:
      return handleSaveDateandTimeSchedule( oneWeekFromNow[ oneWeekFromNow?.length - 1 ] );
    case 3:
      return handleSaveDateandTimeSchedule( next7to14[ next7to14?.length - 1 ] );
    default:
      return handleSaveDateandTimeSchedule( rangeDate?.[0]?.endDate );
  }

} 


const handleSelect = (ranges) =>{
  setRangeDate(ranges)
}

const handleSaveDateandTimeSchedule = ( paramDate ) => {

  // const dateStr = `${paramDate}T${paramTime}:00`;

  const dateObj = new Date(paramDate);

  const handleFormatDate = ( date ) => {

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long', // Full day name (e.g., Monday)
      year: 'numeric', // Full year (e.g., 2023)
      month: 'long', // Full month name (e.g., April)
      day: 'numeric' // Day of the month (e.g., 2)
    });

    return formattedDate;

  }

  const handleFormatTime = ( time ) => {

    const formattedTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // 12-hour format
    });

    return formattedTime;

  }

  const finalFormatted = `${ handleFormatDate(dateObj) }, ${handleFormatTime(dateObj) }`;
  return finalFormatted;

}
    

return (

<ModalDefault 
    title={"Add New Appointment"}
    toggle={stepper}
    setToggle={setStepper}
    size={'h-2/3'}
>
    <Formik
        initialValues={formValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
    <Form className='px-4'>
            <Box>
                <Stepper activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>

                  <Step expanded={true} active>

                    <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(0) }/>

                    <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                    { dateTarget ? 
                    <Card props={"ml-7"}>
                        
                        <div className='w-full flex flex-row items-center justify-between'>
                          
                          <div className='flex flex-row gap-2 items-center'>
                            <span style={{ fontSize:14}} className='text-black'><AiOutlineClockCircle/></span>         
                            <span style={{ fontSize:14}} className='text-black'><Bold>Date and Time Schedule</Bold></span>                 
                          </div>

                          <span className='text-mainText cursor-pointer' onClick={ () => setDateTarget(false) } style={{ fontSize:14}}><Bold>EDIT</Bold></span>    
                          
                        </div>

                        <div className='w-full flex flex-row items-center gap-2'>

                          <div className='my-5 gap-2 w-full'>
                            <span className='text-black font-small text-sm'>Drop of Date and Time</span>
                          </div>
                          
                          <div className='my-5 gap-2  w-full'>
                            <span className='text-black font-medium text-sm'>{ handleSaveDateandTimeSchedule(`${dropOffDate}T${dropOffTime}:00`) }</span>
                          </div>

                        </div>

                        
                        <div className='w-full flex flex-row items-center gap-2'>

                          <div className='my-5 gap-2 w-full'>
                            <span className='text-black font-small text-sm'>Target Completion Date</span>
                          </div>
                          
                          <div className='my-5 gap-2 w-full'>
                            <span className='text-black font-medium text-sm'>{ handleStaticRange( calendarSelection ) }</span>
                          </div>

                        </div>

                    </Card> : 
                      
                      <Card props={"ml-7"}>
                        
                          <div className='w-full flex flex-row items-center justify-between'>
                            
                            <div className='flex flex-row gap-2 items-center'>
                              <span style={{ fontSize:14}} className='text-black'><AiOutlineClockCircle/></span>         
                              <span style={{ fontSize:14}} className='text-black'><Bold>Date and Time Schedule</Bold></span>                 
                            </div>

                            <span className='text-mainText cursor-pointer' onClick={ () => setDateTarget(true) }  style={{ fontSize:14}}><Bold>SAVE</Bold></span>    
                            
                          </div>

                          <div className='w-full flex flex-row items-center gap-2'>
  
                            <div className='my-5 gap-2 w-full'>
                              <Form.Item name="start_date" label="Drop off Date">
                                  <FormikInput name="start_date" type="date" onChange={ e => setDropOffDate( e.target.value ) }/>
                              </Form.Item>
                            </div>
                            
                            <div className='my-5 gap-2  w-full'>
                              <Form.Item name="start_time" label="Drop off Time">
                                  <FormikInput name="start_time" type="time" onChange={ e => setDropOffTime( e.target.value ) }/>
                              </Form.Item>
                            </div>

                          </div>

                          <div className='my-3 gap-2'>
                            {/* <Form.Item name="target_completion_date" label="Target Completion Date">
                                <FormikInput name="target_completion_date" type="date"/>
                            </Form.Item> */}
                            <span className='text-black font-medium text-sm'>Target Completion Date</span>

                            <div className='w-full border rounded flex flex-row items-center justify-between p-2 mt-2 mb-3 cursor-pointer' onClick={ () => setDisplayCalendar( displayCalendar ? false : true ) }>
                              
                              <span className='text-gray-400 font-small text-sm'>Select Date</span>

                              <div>
                                  <span className='text-lg text-black'><IoMdCalendar/></span>
                              </div>
                       
                            </div>

                            { displayCalendar && 

                            <div className='w-full items-center flex flex-col'>

                              {/* <div className='w-2/6 flex flex-col bg-[#F0F9F2] p-2 rounded-tl rounded-tr  items-center'>
                                
                                <div className='py-2 cursor-pointer'>
                                  <span className='text-black font-medium text-sm cursor-pointer'>1-3 DAYS</span>
                                </div>
                                                                
                                <div className='py-2 cursor-pointer'>
                                  <span className='text-black font-medium text-sm cursor-pointer'>1 WEEK</span>
                                </div>
                                                                
                                <div className='pt-2 cursor-pointer'>
                                  <span className='text-black font-medium text-sm cursor-pointer'>7-14 DAYS</span>
                                </div>
           
                              </div> */}

                              <div className={`w-2/6 flex flex-col ${ calendarSelection === 1 ? "bg-[#66BE7A]"  : "bg-[#F0F9F2]" } items-center`}>
                                
                                <div className='py-2' onClick={ () => [ setCustomDate( false ) , setCalendarSelection( calendarSelection === 1 ? 0 : 1 ) ] }>
                                  <span className={`${ calendarSelection === 1 ? "text-white"  : "text-black" }  font-medium text-sm cursor-pointer`}>1-3 DAYS</span>
                                </div>

                              </div>

                              <div className={`w-2/6 flex flex-col ${ calendarSelection === 2 ? "bg-[#66BE7A]"  : "bg-[#F0F9F2]" } items-center`}>
                                
                                <div className='py-2' onClick={ () => [ setCustomDate( false ) ,setCalendarSelection( calendarSelection === 2 ? 0 : 2 ) ] }>
                                  <span className={`${ calendarSelection === 2 ? "text-white"  : "text-black" }  font-medium text-sm cursor-pointer`}>1 WEEK</span>
                                </div>

                              </div>
                              
                              <div className={`w-2/6 flex flex-col ${ calendarSelection === 3 ? "bg-[#66BE7A]"  : "bg-[#F0F9F2]" } items-center`}>
                                
                                <div className='py-2' onClick={ () => [ setCustomDate( false ) ,setCalendarSelection( calendarSelection === 3 ? 0 : 3 ) ] }>
                                  <span className={`${ calendarSelection === 3 ? "text-white"  : "text-black" }  font-medium text-sm cursor-pointer`}>7-14 DAYS</span>
                                </div>

                              </div>

                              <div className={`w-2/6 flex flex-col ${ calendarSelection === 4 ? "bg-[#66BE7A]"  : "bg-[#F0F9F2]" } items-center`}>
                                
                                <div className='py-2' onClick={ () => [setCustomDate( customDate ? false : true ) , setCalendarSelection( calendarSelection === 4 ? 0 : 4 )] }>
                                  <span className={`${ calendarSelection === 4 ? "text-white"  : "text-black" }  font-medium text-sm cursor-pointer`}>CUSTOM RANGE</span>
                                </div>

                              </div>

                            </div>

                            }

                            { customDate && 

                              <div className='mb-5 mt-2 gap-2 w-full flex flex-col items-center'>

                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => handleSelect([item.selection]) }
                                    moveRangeOnFirstSelection={false}
                                    ranges={rangeDate}
                                      // rangeColors={'#2e7d32'}
                                    color="#2e7d32"
                                    rangeColors="#2e7d32"
                                />

                              </div>

                            }

                          </div>

                      </Card>
                    }

                    </StepContent>
                            
                 </Step>

                {/* <Step expanded={true} >

                    <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(1) }/>

                    <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                      
                      <Card props={"ml-7"}>

                          

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:14}} className='text-black'><ImUsers/></span>         
                                <span style={{ fontSize:14}} className='text-black'><Bold>Customer Contact Information</Bold></span>                 
                              </div>
                              
                            </div>

                            { !customer ?   

                            <div onClick={ () => [ setCustomer(true) , handleStepperPosition(1) ]  } className='w-full flex flex-row gap-3 items-center justify-center rounded-md border-2 my-4 py-3 cursor-pointer border-mainText'>
                              
                              <span style={{ fontSize:14}} className='text-mainText'><FaPlusCircle/></span>         
                              <span style={{ fontSize:14}} className='text-mainText'><Bold>Select Customer</Bold></span>       
                              
                            </div> :
                            <React.Fragment>

                            <div className='my-5 gap-2'>
                                <Form.Item name="full_name" label="Customer Full Name">
                                    <FormikInput name="full_name" placeholder="Enter Customer Full Name"/>
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="address" label="Address">
                                    <FormikInput name="address" placeholder="Enter Address"/>
                                </Form.Item>
                            </div>

                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="phone_number" label="Phone Number">
                                    <FormikInput name="phone_number" placeholder="Enter Phone Number" value={phoneNumber} maxlength="14" autocomplete="off"
                                    onChange={ e => handlePhoneNumberFormat( e , setPhoneNumber )}/>
                                </Form.Item>
                              </div>

                              
                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="email_address" label="Email Address">
                                    <FormikInput name="email_address" placeholder="Enter Email Address" type="email"/>
                                </Form.Item>
                              </div>

                            </div>

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:14}} className='text-black'><AiOutlineCreditCard/></span>         
                                <span style={{ fontSize:14}} className='text-black'><Bold>Insurance Information</Bold></span>                 
                              </div>
                              
                            </div>

                            <div className='my-5 gap-2'>
                                <Form.Item name="claim_number" label="Claim No.">
                                    <FormikInput name="claim_number" placeholder="Enter Claim Number"/>
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="provider" label="Insured Full Name">
                                    <FormikInput name="provider" placeholder="Enter Insured Full Name"/>
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="adjuster_name" label="Adjuster Name">
                                    <FormikInput name="adjuster_name" placeholder="Enter Adjuster Name"/>
                                </Form.Item>
                            </div>

                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="adjuster_phone_number" label="Phone Number">
                                    <FormikInput name="adjuster_phone_number" placeholder="Enter Phone Number" value={phoneCarNumber} maxlength="14" autocomplete="off"
                                    onChange={ e => handlePhoneNumberFormat( e , setPhoneCarNumber )}/>
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="adjuster_email_address" label="Email Address">
                                    <FormikInput name="adjuster_email_address" placeholder="Enter Email Address" type="email"/>
                                </Form.Item>
                              </div>

                            </div>

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:14}} className='text-black'><AiFillCar/></span>         
                                <span style={{ fontSize:14}} className='text-black'><Bold>Vehicle Information</Bold></span>                 
                              </div>
                              
                            </div>
     
                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="model_year" label="Year">
                                    <FormikInput 
                                      className="custom-input-number"
                                      name="model_year"
                                      placeholder="Enter Year" 
                                      type="number"
                                      onWheel={event => event.currentTarget.blur()}
                                    />
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="vin_number" label="Vin">
                                    <FormikInput name="vin_number" placeholder="Enter Vin"/>
                                </Form.Item>
                              </div>

                            </div>
     
                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="make" label="Make">
                                    <FormikInput name="make" placeholder="Enter Make"/>
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="model" label="Model">
                                    <FormikInput name="model" placeholder="Enter Model"/>
                                </Form.Item>
                              </div>

                            </div>

                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="color" label="Color">
                                    <FormikInput name="color" placeholder="Enter Color"/>
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="mileage" label="Mileage">
                                    <FormikInput 
                                      className="custom-input-number"
                                      name="mileage"
                                      placeholder="Enter Mileage"
                                      type="number"
                                      onWheel={event => event.currentTarget.blur()}
                                    />
                                </Form.Item>
                              </div>

                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="note" label="Note For Estimator">
                                    <FormikInput.TextArea name="note" rows={3} placeholder="Please make note of any specific damage issues or concerns you had with your car. (Example: Windshield damage/Cracked Tail Lamp etc."/>
                                </Form.Item>
                            </div>

                            </React.Fragment>
                          }

                      </Card>

                    </StepContent>
                            
                 </Step> */}

                 <Step expanded={true} >

                      <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(2) }/>

                      <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                        
                        <Card props={"ml-7"}>
                          
                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:14}} className='text-black'><FaToolbox/></span>         
                                <span style={{ fontSize:14}} className='text-black'><Bold>Repair Details</Bold></span>                 
                              </div>
                        
                            </div>
                            
                            { !repair ? 

                            <div onClick={ () => [ setRepair(true) , handleStepperPosition(2) ] } className='w-full flex flex-row gap-3 items-center justify-center rounded-md border-2 my-4 py-3 cursor-pointer border-mainText'>
                              
                              <span style={{ fontSize:14}} className='text-mainText'><FaPlusCircle/></span>         
                              <span style={{ fontSize:14}} className='text-mainText'><Bold>Add Repair Details</Bold></span>       
                              
                            </div> : 

                            <React.Fragment>

                            <div className='my-5 gap-2'>
                                <Form.Item name="repair_description" label="Repair Description">
                                    <FormikInput name="repair_description" placeholder="Enter Repair Description"/>
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="damage_level" label="Damage Level">
                                    {/* <FormikInput name="damage_level" placeholder="Enter Damage Level" type="number"/> */}
                                    <FormikSelect name="damage_level" options={options}/>
                                </Form.Item>
                            </div>

                            <div className='w-full flex flex-col gap-2'>
                              <span><SubHeader>Parts</SubHeader></span>     

                              <div className='w-1/2 flex flex-row gap-2'>

                                <div className='flex flex-row items-center justify-center'>
                                    <Checkbox color="success" 
                                        value="Moldings"
                                        checked={checkedItems.includes('Moldings')}
                                        onChange={() => handleCheckboxChange('Moldings')}
                                    />
                                  <span className='mt-0.5'><SubHeader>Moldings</SubHeader></span>
                                </div>  

                                <div className='flex flex-row items-center justify-center'>
                                    <Checkbox color="success" 
                                        value="Hood"
                                        checked={checkedItems.includes('Hood')}
                                        onChange={() => handleCheckboxChange('Hood')}
                                    />
                                  <span className='mt-0.5'><SubHeader>Hood</SubHeader></span>
                                </div> 

                                <div className='flex flex-row items-center justify-center'>
                                    <Checkbox color="success" 
                                        value="Roof"
                                        checked={checkedItems.includes('Roof')}
                                        onChange={() => handleCheckboxChange('Roof')}
                                    />
                                  <span className='mt-0.5'><SubHeader>Roof</SubHeader></span>
                                </div> 

                              </div>  

                              <div className='w-1/2 flex flex-row gap-2'>

                                <div className='flex flex-row items-center justify-center'>
                                    <Checkbox color="success" 
                                        value="Other Panel R&R"
                                        checked={checkedItems.includes('Other Panel R&R')}
                                        onChange={() => handleCheckboxChange('Other Panel R&R')}
                                    />
                                  <span className='mt-0.5'><SubHeader>Other Panel R&R</SubHeader></span>
                                </div>  

                                {/* <div className='flex flex-row items-center justify-center'>
                                  <Checkbox color="success"/>
                                  <span className='mt-0.5'><SubHeader>None</SubHeader></span>
                                </div>  */}

                              </div>
                              
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="amount" label="Amount of Conventional Repair needed for this job?">
                                    {/* <FormikInput name="amount" placeholder="Enter Amount" type="number"/> */}
                                    <FormikSelect name="amount" options={options}/>
                                </Form.Item>
                            </div>

                            
                            <div className='my-3 gap-2'>
                                <Form.Item name="notes" label="Notes">
                                    <FormikInput name="notes" placeholder="Enter Notes"/>
                                </Form.Item>
                            </div>

                            </React.Fragment>
                            }

                        </Card>

                      </StepContent>
                              
                  </Step>
                
                </Stepper>

                <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop : 5, marginBottom : 5 }}>

                    {/* <Button
                      sx={{ mt: 1, mr: 1 }}
                      variant="contained"
                      disableElevation
                      size="large"
                      onClick={ () => setStepper(false) }
                    >
                      Save
                    </Button>   */}

                    
                    <SubmitButton
                        loading={false}
                        className={`
                            px-10
                            py-3
                            !bg-secondaryText
                            !rounded-md
                            !text-center
                            !text-white
                        `}
                    >
                        <Bold>Save { loading &&  <span className='text-white'><CircularProgress size={15} color="inherit"/></span>}</Bold>
                    </SubmitButton>

                    <Button
                      onClick={ () => setStepper(false) }
                      variant="outlined"
                      size="large"
                      disableElevation
                    >
                      Cancel
                    </Button>   
                </Box>

            </Box>
        </Form>
        </Formik>
    </ModalDefault>
  )
}

export default ModalAppointment
