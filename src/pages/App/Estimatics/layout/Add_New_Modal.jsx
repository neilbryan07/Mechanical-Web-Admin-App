import React, { useState , useEffect } from 'react'
import * as Yup from 'yup';

import SubHeader from '../../../../component/Typography/SubHeader'
import TextInputs from '../../../../component/FormInput'
import Header from '../../../../component/Typography/Header'
import Bold from '../../../../component/Typography/Bold'

import { useLocation } from 'react-router-dom';

import { Switch } from '@mui/material'

import { ImUsers } from "react-icons/im";
import { FaToolbox, FaPlusCircle } from "react-icons/fa";
import { MdStore } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

import { AiOutlineClockCircle, AiOutlineCreditCard, AiFillCar } from "react-icons/ai";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle } from '@mui/material';

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';

import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { ColorlibConnector, ColorlibStepIconRoot, ColorlibStepIcon } from '../../../../contants'
import { APIServices } from '../../../../hooks/fetchAPI';

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import { handlePhoneNumberFormat } from '../../../../contants';


import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({

    shop_name: Yup.string().required('Shop Name is a required field'),
    // shop_address: Yup.string().required('Shop Address is a required field'),
    // shop_phone_number: Yup.string().required('Shop Phone Number is a required field'),
    // shop_email_address: Yup.string().required('Shop Email Address is a required field'),

    customer_full_name: Yup.string().required('Customer Name is a required field'),
    // customer_address: Yup.string().required('Customer Address is a required field'),
    // customer_phone_number: Yup.string().required('Customer Phone Number is a required field'),
    // customer_email: Yup.string().required('Customer Email Address is a required field'),

    // vehicle_vin: Yup.string().required('Vehicle Vin is a required field'),
    // vehicle_mileage: Yup.string().required('Vehicle Mileage is a required field'),
    // vehicle_make: Yup.string().required('Vehicle Make is a required field'),
    // vehicle_model: Yup.string().required('Vehicle Model is a required field'),
    // vehicle_year: Yup.string().required('Vehicle Year is a required field'),
    // vehicle_color: Yup.string().required('Vehicle Color is a required field'),

    // insurance_company: Yup.string().required('Insurance Company is a required field'),
    // insurance_claim_number: Yup.string().required('Insurance Claim Number is a required field'),
    // insurance_deductible: Yup.string().required('Insurance Deductible is a required field'),
    // insurance_adjuster: Yup.string().required('Insurance Adjuster is a required field'),
    // insurance_policy_number: Yup.string().required('Insurance Policy Number is a required field'),
    
});

const Add_New_Modal = ({ title ,toogle , 
  setToggle , dataSource= null , submitHandler = null, validation = null , loader = false ,
  shopList = null , customerList = null , adjuster = null,
  is_from_shop = true,
 }) => {
    
    let formValue = {
        is_from_web : true,
        shop_name : '',
        shop_address : '',
        shop_phone_number : '',
        shop_email_address : '',

        customer_full_name : '',
        customer_address : '',
        customer_phone_number : '',
        customer_email : '',

        vehicle_vin : '',
        vehicle_mileage : '',
        vehicle_make : '',
        vehicle_model : '',
        vehicle_year : '',
        vehicle_color : '',

        insurance_company : ' ',
        insurance_claim_number : '',
        insurance_full_name: "",
        insurance_adjuster_name : null,
        insurance_adjuster_name_sample : "",
        insurance_phone_number : "",
        insurance_email : "",

        insurance_deductible : '',
        insurance_adjuster : '',
        insurance_policy_number : '',

        other_detail_direction_to_pay: "Yes",
        other_detail_possible_tl : "",
        other_info_threshold_percent : 0,
        other_info_assigned_to: "",
        other_info_audited_by: "",
        other_detail_repair_date : new Date() ,
        other_detail_date_time_upload : new Date() ,

        appraisal_assignment: 1,
        appraisal_location: "California",
        primary_contact: "Ben Ten",
        estimatic_status: "New",
        provider : "test",
        region : '',

     }

    let location = useLocation();
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneAdjusterNumber, setPhoneAdjusterNumber] = useState('');

    const regionResponses = useSelector((state) => state.region.action);

    const [ stepper , setStepper] = useState(false);

    const [activeStep, setActiveStep] = React.useState(0);

    const [ customer , setCustomer ] = useState(false);
    const [ repair , setRepair ] = useState(false);
    const [ shop , setShop ] = useState(false);
    const [ shopDetails , setShopDetails ] = useState(null);
    const [ customerDetails , setCustomerDetails ] = useState(null);
    const [ regionDetails , setRegionDetails ] = useState(null);

    const [ loading, setLoading ] = useState(false);

    const [ shopLists , setShopLists ] = useState([]);
    const [ customerLists , setCustomerLists ] = useState([]);
    const [ adjusterLists , setAdjusterLists ] = useState([]);

    const [ errors , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ message , setMessage ] = useState("Error");

    const [ regionLists , setRegionLists ] = useState([]);

    useEffect( () => {

      const mapping = adjuster?.adjusterResponse?.data?.map( e => ({ value : e._id, label : e.first_name + " " + e.last_name  }) )
      setAdjusterLists(mapping)
   
    } , [adjuster] )

    useEffect( () => {

         const mapping = shopList?.shopResponse?.data?.map( e => ({ value : e.name , label : e.name }) )
         setShopLists(mapping)
      
    } , [shopList] )

    
    const handleFetchFranchiseRegion = async () => {

      const res = await APIServices.get({ url: '/franchise/region/list/all'})
      if ( res?.status === 200 ) {
          const mapping = res?.data?.data?.map( e => ({ value : e._id , label :  e.name }) )
          setRegionLists(mapping)
      }
  }

    useEffect(() => {
        
      handleFetchFranchiseRegion();

    }, []);

    const handleStepperPosition = (data) => {
        setActiveStep((prevActiveStep) => data);
    }

    const handleSubmit = async (value) => {
      setLoading(true)
      setSuccess(false);
      setError(false);

      value.other_info_assigned_to = null;
      value.other_info_audited_by = null;

      value.shop_address = shopDetails.address;
      value.shop_phone_number = shopDetails?.contact?.[0]?.phone_number;
      value.shop_email_address = shopDetails?.contact?.[0]?.email;

      value.region = regionDetails?.value;

      value.is_from_shop = is_from_shop;

      const res = await APIServices.post({ url: '/workfile/add', payload: value })

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setLoading(false)
        }, 1200);

      } else {

        setMessage(res[0].response.data.message);
        setError(true);
      }
    }

    const handleChange = (e) => {

      const find = shopList?.shopResponse?.data?.find( item => item.name === e );
      setShopDetails(find);

    }

    const handleRegionChange = (e) => {

      const find = regionLists?.find( item => item.value === e );
      setRegionDetails(find);

    }

    const handleCustomerChange = (e) => {

      const find = customerList?.customerResponse?.data?.find( item => item._id === e )
      setCustomerDetails(find);

    }

  return (
    <ModalDefault 
        title={title}
        toggle={toogle}
        setToggle={setToggle}
        size={'h-3/5 w-2/5'}
      >
        <Formik
            initialValues={formValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
            <Form className='px-4'>
                <Stepper activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>


                 <Step expanded={true} active>

                    <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(0) }/>

                    <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                      
                      <Card props={"ml-7"}>

                          

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:18}} className='text-black'><MdStore/></span>         
                                <span style={{ fontSize:16}} className='text-black'><Bold>Shop Details</Bold></span>                 
                              </div>
                              
                            </div>

                            { !shop ?   

                            <div onClick={ () => setShop(true) } className='w-full flex flex-row gap-3 items-center justify-center rounded-md border-2 my-4 py-3 cursor-pointer border-mainText'>
                              
                              <span style={{ fontSize:14}} className='text-mainText'><FaPlusCircle/></span>         
                              <span style={{ fontSize:14}} className='text-mainText'><Bold>Add Shop Details</Bold></span>       
                              
                            </div> :
                            <React.Fragment>

                            <div className='my-5 gap-2'>

                                {/* <Form.Item name="shop_name" label="Shop Name">
                                    <FormikInput name="shop_name" placeholder="Enter Shop name" />
                                </Form.Item> */}

                                <Form.Item name="shop_name" label="Shop Name">
                                    <FormikSelect name="shop_name" options={shopLists} onChange={handleChange}/>
                                </Form.Item>

                            </div>

                            { shopDetails ?  
                            <>
                              <div className='my-3 gap-2'>
                                  <Form.Item name="shop_address" label="Address">
                                      <FormikInput name="shop_address" placeholder="Enter address" value={shopDetails?.address} readOnly/>
                                  </Form.Item>
                              </div>

                              <div className='w-full flex flex-row justify-between gap-3'>

                                <div className='my-3 gap-2 w-full'>
                                  <Form.Item name="shop_phone_number" label="Phone Number">
                                      <FormikInput name="shop_phone_number" placeholder="Enter phone number" value={shopDetails?.contact?.[0]?.phone_number} readOnly/>
                                      {/* <FormikInput name="shop_phone_number" placeholder="Enter phone number" readOnly/> */}
                                  </Form.Item>
                                </div>

                                
                                <div className='my-3 gap-2 w-full'>
                                  <Form.Item name="shop_email_address" label="Email Address">
                                      <FormikInput name="shop_email_address" placeholder="Enter email address" type="email" value={shopDetails?.contact?.[0]?.email} readOnly/>
                                      {/* <FormikInput name="shop_email_address" placeholder="Enter email address" type="email" readOnly/> */}
                                  </Form.Item>
                                </div>

                              </div>

                            </>

                            : null }

                            </React.Fragment>
                          }

                      </Card>

                    </StepContent>
                            
                 </Step>

                <Step expanded={true} >

                    <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(1) }/>

                    <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                      
                      <Card props={"ml-7"}>

                          

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:18}} className='text-black'><ImUsers/></span>         
                                <span style={{ fontSize:16}} className='text-black'><Bold>Customer Details</Bold></span>                 
                              </div>
                              
                            </div>

                            { !customer ?   

                            <div onClick={ () => setCustomer(true) } className='w-full flex flex-row gap-3 items-center justify-center rounded-md border-2 my-4 py-3 cursor-pointer border-mainText'>
                              
                              <span style={{ fontSize:14}} className='text-mainText'><FaPlusCircle/></span>         
                              <span style={{ fontSize:14}} className='text-mainText'><Bold>Add Customer Details</Bold></span>       
                              
                            </div> :
                            <React.Fragment>
                            <div className='my-5 gap-2'>

                                <Form.Item name="customer_full_name" label="Customer Name">
                                  <FormikInput name="customer_full_name" placeholder="Enter customer name" />
                                </Form.Item>

                                {/* <Form.Item name="customer_full_name" label="Customer Name">
                                    <FormikSelect name="customer_full_name" options={customerLists} onChange={handleCustomerChange}/>
                                </Form.Item> */}
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name="customer_address" label="Address">
                                  <FormikInput name="customer_address" placeholder="Enter customer address" />
                                </Form.Item>
                            </div>
                            
                            <Form.Item name="region" label="Region">
                                    <FormikSelect name="region" options={regionLists} onChange={handleRegionChange}/>
                                </Form.Item>

                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="customer_phone_number" label="Phone Number">
                                  <FormikInput name="customer_phone_number" placeholder="Enter customer phone number" value={phoneNumber} maxlength="14" autocomplete="off"
                                  onChange={ e => handlePhoneNumberFormat( e , setPhoneNumber )} />
                                </Form.Item>
                              </div>

                              
                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="customer_email" label="Email Address">
                                  <FormikInput name="customer_email" placeholder="Enter customer email address"  type="email"  />
                                </Form.Item>
                              </div>

                            </div>

                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:18}} className='text-black'><AiFillCar/></span>         
                                <span style={{ fontSize:16}} className='text-black'><Bold>Vehicle Information</Bold></span>                 
                              </div>
                              
                            </div>
     
                            <div className='my-5 gap-2'>
                                <Form.Item name="vehicle_vin" label="VIN">
                                  <FormikInput name="vehicle_vin" placeholder="Enter vin"/>
                                </Form.Item>
                            </div>

                            <div className='my-5 gap-2'>
                                <Form.Item name="vehicle_mileage" label="Mileage">
                                  <FormikInput name="vehicle_mileage" placeholder="Enter mileage" type="number" />
                                </Form.Item>
                            </div>
     
                            <div className='w-full flex flex-row justify-between gap-3'>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="vehicle_make" label="Make">
                                  <FormikInput name="vehicle_make" placeholder="Enter make" />
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="vehicle_model" label="Model">
                                  <FormikInput name="vehicle_model" placeholder="Enter model" />
                                </Form.Item>
                              </div>

                            </div>

                            <div className='w-full flex flex-row justify-between gap-3'>

                            
                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="vehicle_year" label="Year">
                                  <FormikInput name="vehicle_year" placeholder="Enter year" type="number" />
                                </Form.Item>
                              </div>

                              <div className='my-3 gap-2 w-full'>
                                <Form.Item name="vehicle_color" label="Color">
                                  <FormikInput name="vehicle_color" placeholder="Enter color" />
                                </Form.Item>
                              </div>

                            </div>

                            </React.Fragment>
                          }

                      </Card>

                    </StepContent>
                            
                 </Step>

                 <Step expanded={true} >

                      <StepLabel StepIconComponent={ColorlibStepIcon} onClick={ () => handleStepperPosition(2) }/>

                      <StepContent sx={{ marginLeft: 3, borderLeft : '2px dashed #838383'}}>
                        
                        <Card props={"ml-7"}>
                          
                            <div className='w-full flex flex-row items-center justify-between'>
                              
                              <div className='flex flex-row gap-2 items-center'>
                                <span style={{ fontSize:18}} className='text-black'><IoShieldCheckmarkSharp/></span>         
                                <span style={{ fontSize:16}} className='text-black'><Bold>Insurance Information</Bold></span>                 
                              </div>
                        
                            </div>
                            
                            { !repair ? 

                            <div onClick={ () => setRepair(true) } className='w-full flex flex-row gap-3 items-center justify-center rounded-md border-2 my-4 py-3 cursor-pointer border-mainText'>
                              
                              <span style={{ fontSize:14}} className='text-mainText'><FaPlusCircle/></span>         
                              <span style={{ fontSize:14}} className='text-mainText'><Bold>Add Insurance Information</Bold></span>       
                              
                            </div> : 

                            <React.Fragment>

                                <div className='my-5 gap-2'>
                                  <Form.Item name="insurance_company" label="Insurance Company">
                                    <FormikInput name="insurance_company" placeholder="Enter insurance company" />
                                  </Form.Item>
                                </div>

                                <div className='my-3 gap-2'>
                                  <Form.Item name="insurance_claim_number" label="Claim Number">
                                    <FormikInput name="insurance_claim_number" placeholder="Enter claim number" />
                                  </Form.Item>
                                </div>

                                <div className='my-3 gap-2'>
                                  <Form.Item name="insurance_deductible" label="Deductible">
                                    <FormikInput name="insurance_deductible" placeholder="Enter deductible" type="number" />
                                  </Form.Item>
                                </div>

                                <div className='my-3 gap-2'>

                                  <Form.Item name="insurance_adjuster_name" label="Adjuster">
                                    <FormikInput name="insurance_adjuster_name" placeholder="Enter adjuster" />
                                  </Form.Item>

                                  {/* <Form.Item name="insurance_adjuster_name" label="Adjuster">
                                    <FormikSelect name="insurance_adjuster_name" options={adjusterLists}/>
                                  </Form.Item> */}

                                </div>

                                <div className='my-3 gap-2'>

                                  <Form.Item name="insurance_phone_number" label="Adjuster Phone No.">
                                  <FormikInput name="insurance_phone_number" placeholder="Enter adjuster phone" value={phoneAdjusterNumber} maxlength="14" autocomplete="off"
                                  onChange={ e => handlePhoneNumberFormat( e , setPhoneAdjusterNumber )}  />
                                  </Form.Item>

                                </div>

                                <div className='my-3 gap-2'>

                                  <Form.Item name="insurance_email" label="Adjuster Email">
                                  <FormikInput name="insurance_email" placeholder="Enter adjuster email" type="email" />
                                  </Form.Item>

                                </div>

                                <div className='my-3 gap-2'>
                                  <Form.Item name="insurance_policy_number" label="Policy Number">
                                    <FormikInput name="insurance_policy_number" placeholder="Enter policy number" />
                                  </Form.Item>
                                </div>



                            </React.Fragment>
                            }

                        </Card>

                      </StepContent>
                              
                  </Step>
                
                </Stepper>

                { errors ? 
                    <Alert className='my-5' severity="error">
                        <AlertTitle>{message}</AlertTitle>
                    </Alert> 
                : null  }

                { success ? 
                    <Alert className='my-5' severity="success">
                        <AlertTitle>Workfile Successfully Added</AlertTitle>
                    </Alert> 
                : null  }

                <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop : 5, marginBottom : 5 }}>

                    {/* <Button
                      sx={{ mt: 1, mr: 1 }}
                      variant="contained"
                      disableElevation
                      size="large"
                    //   onClick={ () => setStepper(false) }
                    type="submit" 
                    >
                      Save
                    </Button>   */}

                    {/* <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button> */}
                        <>

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
                        </>
                    

                    <Button
                      onClick={ () => setToggle(false) }
                      variant="outlined"
                      size="large"
                      disableElevation
                    >
                      Cancel
                    </Button>   
                </Box>

                {/* {  <LinearProgress/> } */}

            </Form>
          )
        }}
      </Formik>
    </ModalDefault>
  )
}

export default Add_New_Modal

{/* <div className='flex flex-col justify-between w-full '>

            <Header>Customer Information</Header> <br/>

            <div className='flex flex-row justify-between w-full gap-3'>

                <div className='my-2 w-full'>
                    <span><SubHeader>Full Name</SubHeader></span>        
                    <TextInputs FormValidation={validation?.customer_full_name} FormText={"Full Name"}  onChange={ (e)=> dataSource( old => ( { ...old, customer_full_name : e.target.value })) } placeholder={"Enter full name"} type={"text"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Address</SubHeader></span>        
                    <TextInputs FormValidation={validation?.customer_address} FormText={"Address"}  onChange={ (e)=> dataSource( old => ( { ...old, customer_address : e.target.value })) } placeholder={"Enter address"} type={"text"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Phone Number</SubHeader></span>        
                    <TextInputs FormValidation={validation?.customer_phone_number} FormText={"Phone Number"} onChange={ (e)=> dataSource( old => ( { ...old, customer_phone_number : e.target.value })) } placeholder={"Enter phone number"} type={"number"}/>
                </div>


            </div>

        </div>

        <div className='flex flex-col justify-between w-full '>

            <Header>Vehicle Information</Header> <br/>

            <div className='flex flex-row justify-between w-full gap-3'>

                <div className='my-2 w-full'>
                    <span><SubHeader>Vin Plate Number</SubHeader></span>        
                    <TextInputs FormValidation={validation?.vin_plate_number} FormText={"Vin Number"} onChange={ (e)=> dataSource( old => ( { ...old, vin_plate_number : e.target.value })) } placeholder={"Enter vin plate number"} type={"number"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Model</SubHeader></span>        
                    <TextInputs FormValidation={validation?.vehicle} FormText={"Vehicle"} onChange={ (e)=> dataSource( old => ( { ...old, vehicle : e.target.value })) } placeholder={"Enter model"} type={"text"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Color</SubHeader></span>        
                    <TextInputs FormValidation={validation?.color} FormText={"Color"} onChange={ (e)=> dataSource( old => ( { ...old, color : e.target.value })) } placeholder={"Enter color"} type={"text"}/>
                </div>


            </div>

        </div>

        <div className='flex flex-col justify-between w-full '>

            <Header>Insurance Information</Header> <br/>

            <div className='flex flex-row justify-between w-full gap-3'>

                <div className='my-2 w-full'>
                    <span><SubHeader>Company Name</SubHeader></span>        
                    <TextInputs FormValidation={validation?.insurance_company} FormText={"Company Name"} onChange={ (e)=> dataSource( old => ( { ...old, insurance_company : e.target.value })) } placeholder={"Enter company name"} type={"text"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Claim Number</SubHeader></span>        
                    <TextInputs FormValidation={validation?.insurance_claim_number} FormText={"Claim Number"} onChange={ (e)=> dataSource( old => ( { ...old, insurance_claim_number : e.target.value })) } placeholder={"Enter claim number"} type={"number"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Deductible</SubHeader></span>        
                    <TextInputs FormValidation={validation?.insurance_deductible} FormText={"Deductible"} onChange={ (e)=> dataSource( old => ( { ...old, insurance_deductible : e.target.value })) } placeholder={"Enter deductible"} type={"number"}/>
                </div>


            </div>

        </div>

        <div className='flex flex-col justify-between w-full '>

            <Header>Other Information</Header> <br/>

            <div className='flex flex-row justify-between w-full gap-3'>

                <div className='my-2 w-full'>
                    <span><SubHeader>Repair Date</SubHeader></span>        
                    <TextInputs FormValidation={validation?.other_info_repair_date} FormText={"Repair Date"} onChange={ (e)=> dataSource( old => ( { ...old, other_info_repair_date : e.target.value })) } placeholder={"Enter company name"} type={"date"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Due Date</SubHeader></span>        
                    <TextInputs FormValidation={validation?.other_info_estimate_date_time} FormText={"Due Date"} onChange={ (e)=> dataSource( old => ( { ...old, other_info_estimate_date_time : e.target.value })) } placeholder={"Enter company name"} type={"date"}/>
                </div>

                <div className='my-2 w-full'>
                    <span><SubHeader>Threshold Percent (%)</SubHeader></span>        
                    <TextInputs FormValidation={validation?.other_info_threshold_percent} FormText={"Threshold Percent"} onChange={ (e)=> dataSource( old => ( { ...old, other_info_threshold_percent : e.target.value })) } placeholder={"Enter threshold percent"} type={"number"} min={0}/>
                </div>


            </div>

        </div>
   

        <div className='w-full flex justify-end pb-8'>
          <div className='flex flex-row items-center gap-10'>
            
            <span className='text-gray-600 cursor-pointer' onClick={ () => setToggle(false) }>
              <Header>Cancel</Header>
            </span>

            <div onClick={ () => submitHandler()  } className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
            <Header>Save</Header>
            </div>

          </div>
        </div> */}
