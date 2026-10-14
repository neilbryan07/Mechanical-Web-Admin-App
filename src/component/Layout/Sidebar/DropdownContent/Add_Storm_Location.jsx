import React, { useState, useEffect , useRef , memo , useCallback } from 'react'
import * as Yup from 'yup';

import ModalDefault from '../../../Modal/ModalDefault';
import Bold from '../../../Typography/Bold';
import Card from "../../../Card/Card";
import TextDisplay from '../../../Typography/TextDisplay';

import { Switch } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import FormikMultiSelect from '../../../../component/Formik/FormikMultiSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import { useDispatch, useSelector } from 'react-redux';
import { APIServices } from '../../../../hooks/fetchAPI';
import { getRegionList } from '../../../../redux/region/regionThunk';
import { getFilteredInsurance } from '../../../../redux/insurance/insuranceThunk';
import { getTechnicianList } from '../../../../redux/technicians/technicianThunk';

import { Alert, AlertTitle } from '@mui/material';
import { MdAddCircleOutline , MdClose  } from "react-icons/md";
import Checkbox from '@mui/material/Checkbox';

import { handlePhoneNumberFormat } from '../../../../contants';

const validationSchema = Yup.object().shape({

    start_date: Yup.string().required('Start Date is a required field'),
    shop_location: Yup.string().required('Shop Location is a required field'),
    storm_leader: Yup.string().required('Storm Leader is a required field'),
    // insurance: Yup.string().required('Insurance Partner is a required field'),
    storm_profile: Yup.string().required('Storm Profile is a required field'),
    storm_header: Yup.string().required('Storm Header is a required field'),

});

const insuranceValidationSchema = Yup.object().shape({

    provider: Yup.string().required('Insurance Company is a required field'),
    // email: Yup.string().required('Email is a required field'),
    // name: Yup.string().required('Name is a required field'),
    // phone_number: Yup.string().required('Phone Number is a required field'),

});

const Add_Storm_Location = memo(({ Stormmodal, SetStormModal }) => {

    const dispatch = useDispatch();

    const insuranceRef = useRef();

    const [ testInput , setTestInput ] = useState(null)

    const technicianResponses = useSelector((state) => state.technician.action);
    const insuranceResponses = useSelector((state) => state.insurance.action);
    const shopResponses = useSelector((state) => state.shop.action);
    const regionResponses = useSelector((state) => state.region.action);

    const [technicianLists, setTechnicianLists] = useState([]);
    const [insuranceLists, setInsuranceLists] = useState([]);
    const [shopLists, setShopLists] = useState([]);
    const [ userLists , setUserLists ] = useState([]);

    const [insuranceModal, setInsuranceModal] = useState(false);

    const [shopName, setShopName] = useState(null);

    const [ shopFilter , setShopFilter  ] = useState(null); 

    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [errorsInsurance, setErrorInsurance] = useState(null);
    const [successInsurance, setSuccessInsurance] = useState(null);

    const [ dropDownList , setDropDownList ] = useState([]);

    const [ regionLists , setRegionLists ] = useState([]);

    const [ selectedShopResult , setSelectedShopResult ] = useState([]);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [ platForm , setPlatForm ] = useState(null);
    const [ errorPlatForm , setErrorPlatForm ] = useState(false);

    const [ insurancePartner , setInsurancePartner ] = useState(null);


    let formValue = {

        start_date: '',
        shop_location: '',
        storm_leader: '',
        insurance: '',
        ground_staffs: [],
        storm_profile: '',
        storm_header: '',
        region : '',
    }

    let formValueInsurance = {
        provider: "",
        name: "",
        phone_number: "",
        email: "",
        estimate_fee : "",
        estimating_platform_used : "",
    }

    const handleInsuranceSubmit = async (value) => {

        setErrorPlatForm(false);

        if( platForm === null ) return setErrorPlatForm(true);

        value.estimating_platform_used = platForm;
        const res = await APIServices.post({ url: '/insurance/add', payload: value })

        if (res.status === 200) {
            setSuccessInsurance(res.data.message)
            await dispatch(getFilteredInsurance());
            setTimeout(() => {
                setSuccessInsurance(null)
                setErrorInsurance(null)
                setInsuranceModal(false);
            }, 1200);

        } else {
            setErrorInsurance( res?.[0]?.response?.data?.message )
        }
    }

    const handleUserList = useCallback(async ( data = [] ) => {

        const res = await APIServices.get({ url: '/user/list/filter?page=1&limit=1000&role=5,6&status=1'})

        if (res.status === 200) {

            const mapping = res?.data?.data?.data?.map(e => ({ value: e._id, label: `${e.first_name} ${e.last_name}` }))
            const mergedData = [ ...data , ...mapping ];

            setDropDownList( mergedData );
            // setUserLists(mapping);
        }

    },[])

    const handleSubmit = async (value) => {

        setError(null)
        setSuccess(null)

        let data =  value?.ground_staffs.map(e => e.value)

        let values = {
            "shop" : shopFilter?.[0]?._id,
            "start_date": value?.start_date,
            "shop_location": selectedShopResult,
            "storm_leader": value?.storm_leader,
            "insurance_partner" : value?.insurance,
            "storm_profile": value?.storm_profile,
            "storm_header": value?.storm_header,
            "status": 1,
            "estimate_fee": insurancePartner?.estimate_fee,
            "tax": insurancePartner?.tax ? insurancePartner?.tax : 10 ,
            "region" : value?.region,
        }

        if (data && data.length > 0) {
            values.ground_staffs = data;
        }

        const res = await APIServices.post({ url: '/stormlocation/add/shop', payload: values })
        
        if (res.status === 200) {
            setSuccess(res.data.message)
            insuranceRef.current = null;
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setError(res.data.message)
        }

    }

    useEffect(() => {
        (async () => {

            const pagination = {
                page: 1,
                limit: 10000000,
            }
      
            await dispatch(getTechnicianList(pagination));
            await dispatch( getRegionList() );
            await dispatch(getFilteredInsurance());
            handleFetchFranchiseRegion();
        })();

    }, []);

    
    const handleFetchFranchiseRegion = async () => {

        const res = await APIServices.get({ url: '/franchise/region/list/all'})
        if ( res?.status === 200 ) {
            const mapping = res?.data?.data?.map( e => ({ value : e._id , label :  e.name }) )
            setRegionLists(mapping)
        }
    }

    // useEffect(() => {

    //     const mapping = regionResponses?.regionResponse?.data?.map( e => ({ value : e._id , label :  e.region }) )
    //     setRegionLists(mapping)
    //     insuranceRef.current = null;

    // }, [regionResponses]);

    useEffect(() => {

        const mapping = technicianResponses?.technicianResponse?.data?.data?.map(e => ({ value: e._id, label: `${e.first_name} ${e.last_name}` }))
        setTechnicianLists(mapping)
        handleUserList(mapping);

    }, []);
// }, [technicianResponses]);

    useEffect(() => {

        const mapping = insuranceResponses?.insuranceResponse?.data?.map(e => ({ value: e._id, label: e.provider }));
        setInsuranceLists(mapping)

    }, [insuranceResponses]);

    useEffect(() => {

        const mapping = shopResponses?.shopResponse?.data?.map(e => ({ value: e._id, label: e.name }))
        setShopLists(mapping)

    }, [insuranceResponses]);

    const handleShopDetails = (id) => {
      
        const mapping = shopResponses?.shopResponse?.data?.filter( item => { 
            return item._id.includes(id); 
        } );

        setShopName( mapping?.[0].name );
        setShopFilter( mapping )

        const mapManagerAccess = mapping?.[0]?.contact?.map(e => ({"contact_id": e?._id, "is_shop_portal": e?.is_shop_portal}))
        // const mapManagerAccess = mapping?.map(e => ({"shop_id": e._id, "is_shop_portal": false}))

        setSelectedShopResult( mapManagerAccess );
    }

    const handleInsuranceDetails = ( id ) => {

        let insuranceData = insuranceResponses?.insuranceResponse?.data;
        let searchInsurance = insuranceData.find( data => data._id === id);
        setInsurancePartner( searchInsurance );

    }

    const StormHeader = [
        { value: 'FTW', label: 'FTW' },
        { value: 'NCRT', label: 'NCRT' },
    ]

    const handleAccessShopPortal = ( id ) => {

        const mapManagerAccess = selectedShopResult.map( item => {
            if (item.contact_id === id) {
                return { ...item, is_shop_portal: !item.is_shop_portal };
              }
              return item;
        })
        setSelectedShopResult( mapManagerAccess );

    } 

    const handleAssignData = ( data ) => {
        let checking = platForm === data ? null : data;
        setPlatForm( checking );
    }

    return (
        <ModalDefault
            title={"Add Storm Location"}
            toggle={Stormmodal}
            setToggle={SetStormModal}
            size={'w-5/12'}
        >

            <ModalDefault
                title={"Add New Insurance Partner"}
                toggle={insuranceModal}
                setToggle={setInsuranceModal}
                size={'h-[72%] w-4/12'}
            >

                <Formik
                    initialValues={formValueInsurance}
                    validationSchema={insuranceValidationSchema}
                    onSubmit={handleInsuranceSubmit}
                >

                    <Form className='px-4'>

                        <div className='gap-2'>
                            <Form.Item name="provider" label="Insurance Company">
                                <FormikInput name="provider" placeholder="Enter insurance company" />
                            </Form.Item>
                        </div>

                        <span className='text-md'>Estimating Platform used by Partner?</span>

                        <div className='flex flex-row items-center w-full justify-evenly'>
                            <div className='flex flex-row items-center gap-2'>
                                <Checkbox 
                                    checked={ platForm === 'CCC' ? true : false }
                                    onChange={ e => handleAssignData('CCC') } 
                                />
                                <span className='text-black text-md'>CCC</span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <Checkbox 
                                    checked={ platForm === 'Mitchell' ? true : false }
                                    onChange={ e => handleAssignData('Mitchell') } 
                                />
                                <span className='text-black text-md'>Mitchell</span>
                            </div>
                        </div>

                        { errorPlatForm && <span className='mb-2 text-xs text-red-500'>Estimating Platform is required</span> }
        
                        <div className='gap-2'>
                            <Form.Item name="estimate_fee" label="Estimate Fee">
                                <FormikInput name="estimate_fee" placeholder="Enter Estimate Fee" type="number"/>
                            </Form.Item>
                        </div>

                        <span className='font-bold text-md'>Insurance Contact</span>

                        <div className='gap-2 my-3'>
                            <Form.Item name="name" label="Name">
                                <FormikInput name="name" placeholder="Enter name" />
                            </Form.Item>
                        </div>

                        <div className='gap-2 my-3'>
                            <Form.Item name="phone_number" label="Phone Number">
                                <FormikInput name="phone_number" placeholder="Enter phone number" value={phoneNumber} maxlength="14" autocomplete="off"
                                onChange={ e => handlePhoneNumberFormat( e , setPhoneNumber )} />
                            </Form.Item>
                        </div>

                        <div className='gap-2 my-3'>
                            <Form.Item name="email" label="Email">
                                <FormikInput name="email" placeholder="Enter email" type="email" />
                            </Form.Item>
                        </div>

                        {errorsInsurance ?
                            <Alert className='my-5' severity="error">
                                <AlertTitle>{errorsInsurance}</AlertTitle>
                            </Alert>
                            : null}

                        {successInsurance ?
                            <Alert className='my-5' severity="success">
                                <AlertTitle>{successInsurance}</AlertTitle>
                            </Alert>
                            : null}

                        <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop: 5, marginBottom: 5 }}>

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
                                    <Bold>Save</Bold>
                                </SubmitButton>
                            </>
                            <Button
                                onClick={() => setInsuranceModal(false)}
                                sx={{ mt: 1, mr: 1 }}
                                variant="outlined"
                                size="large"
                                disableElevation
                            >
                                Cancel
                            </Button>
                        </Box>

                    </Form>

                </Formik>

            </ModalDefault>

            <Formik
                initialValues={formValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='px-4'>

                    <div className='gap-2 my-3'>
                        <Form.Item name="start_date" label="Start Date">
                            <FormikInput name="start_date" type="date" />
                        </Form.Item>
                    </div>

                    <Card props={"w-full mb-4"}>

                        <div className='gap-2 my-1'>
                            <Form.Item name="shop_location" label="Shop Location">
                                {/* <FormikInput name="shop_location" placeholder="Enter shop location" /> */}
                                <FormikSelect name="shop_location" options={shopLists} onChange={ e => handleShopDetails(e) } />
                            </Form.Item>
                        </div>

             
                        { shopFilter?.[0]?.contact?.map((row , key) => (

                            <React.Fragment>

                            <span>Possible Result</span>

                            <Card key={key} props={'my-2'}>
                               
                               <div className='flex flex-row items-center w-full'>

                                        <div class="grid grid-cols-2 gap-y-2 items-center w-7/12">

                                            <TextDisplay>
                                                <span style={{ fontSize:14}}>Shop name</span>
                                            </TextDisplay>

                                            <div className='flex flex-row items-center'>
                                                <span style={{ fontSize:14}} className='mr-2 font-extrabold text-black'>:</span>
                                                <span style={{ fontSize:14}} className='ml-5 text-black'>{shopName}</span>
                                            </div>

                                            <TextDisplay>
                                                <span style={{ fontSize:14}}>Managers Name</span>
                                            </TextDisplay>

                                            <div className='flex flex-row items-center '>
                                                <span style={{ fontSize:14}} className='mr-2 font-extrabold text-black'>:</span>
                                                <span style={{ fontSize:14}} className='ml-5 text-black'>{row?.contact_name}</span>
                                            </div>

                                            <TextDisplay>
                                                <span style={{ fontSize:14}}>Phone Number</span>
                                            </TextDisplay>

                                            <div className='flex flex-row items-center'>
                                                <span style={{ fontSize:14}} className='mr-2 font-extrabold text-black'>:</span>
                                                <span style={{ fontSize:14}} className='ml-5 text-black'>{row?.phone_number}</span>
                                            </div>

                                            <TextDisplay>
                                                <span style={{ fontSize:14}}>Email Address</span>
                                            </TextDisplay>

                                            <div className='flex flex-row items-center'>
                                                <span style={{ fontSize:14}} className='mr-2 font-extrabold text-black'>:</span>
                                                <p style={{ fontSize:14 }} className='ml-5 text-black break-all'>{row?.email}</p>
                                            </div>

                                        </div>

                        

                                    <div className='flex flex-col items-center justify-center w-5/12'>
                                        <span style={{ fontSize:14}} className='font-bold text-black'>Add Access to Shop Portal</span>
                                        <Switch onChange={ () => handleAccessShopPortal( row?._id ) } />
                                    </div>


                               </div>


                            </Card>

                            </React.Fragment>

                        ))}


                    </Card>

                    <div className='gap-2 my-5'>
                                <Form.Item name="region" label="Region">
                                    <FormikSelect name="region" options={regionLists}/>
                                </Form.Item>
                        </div>

                    <div className='gap-2 my-3'>
                        <Form.Item name="storm_leader" label="Storm Leader">
                            <FormikSelect name="storm_leader" options={dropDownList} />
                        </Form.Item>
                    </div>

                    <div className='gap-2 my-3'>
                        <Form.Item name="ground_staffs" label="Ground Staff">
                            <FormikMultiSelect isMulti className="basic-multi-select" classNamePrefix="select" name="ground_staffs" options={dropDownList} />
                        </Form.Item>
                    </div>

                    <Card props={"w-full mb-4"}>

                    <div className='flex flex-row items-center justify-between w-full gap-2 my-3'>
                    {/* testInput , setTestInput */}
                        <div className='w-full'>
                            <Form.Item name="insurance" label="Insurance Partner">
                                <FormikSelect ref={ insuranceRef } name="insurance" options={insuranceLists} onChange={ e => [handleInsuranceDetails(e)  ] } />
                            </Form.Item>
                        </div>

                        { insuranceRef.current ? 
                            <div className='text-xl text-red-400 cursor-pointer hover:text-red-700' onClick={() => insuranceRef.current.clearValue() }>
                                <MdClose />
                            </div>
                        : null }

                        <div className='bg-[#387FE2] p-2 rounded text-xl text-white cursor-pointer hover:bg-blue-700' onClick={() => setInsuranceModal(true)  }>
                            <MdAddCircleOutline />
                        </div>
                    </div>

                    { insurancePartner && 

                    <div className='flex flex-col w-full gap-2'>

                        <div className='flex flex-row items-center pl-4'>
                            
                            <div className='w-full'>
                                <span className='text-xs text-black'>Insurance Partner</span>
                            </div>

                            <div className='w-full'>
                                <span className='text-xs text-black'>: { insurancePartner?.provider }</span>
                            </div>

                        </div>

                        <div className='flex flex-row items-center pl-4'>
                            
                            <div className='w-full'>
                                <span className='text-xs text-black'>Estimating Platform used by Partner</span>
                            </div>

                            <div className='w-full'>
                                <span className='text-xs text-black'>: { insurancePartner?.estimating_platform_used }</span>
                            </div>

                        </div>

                        <div className='flex flex-row items-center w-full gap-2'>

                            <div className='w-full gap-2 my-3'>
                                <Form.Item name="fee" label="Estimate Fee">
                                    <FormikInput name="fee" value={ insurancePartner?.estimate_fee } placeholder="Enter Estimate Fee" />
                                </Form.Item>
                            </div>

                            <div className='w-full gap-2 my-3'>
                                <Form.Item name="tax" label="Tax">
                                    <FormikInput name="tax" placeholder="Enter Tax Fee" value={ insurancePartner?.tax } />
                                </Form.Item>
                            </div>
                        
                        </div>

                    </div>
                    }

                    </Card>

                    <div className='gap-2 my-3'>
                        <Form.Item name="storm_profile" label="Storm Profile">
                            <FormikInput name="storm_profile" placeholder="Enter profile" />
                        </Form.Item>
                    </div>

                    <div className='gap-2 my-3'>
                        <Form.Item name="storm_header" label="Storm Header">
                            <FormikSelect name="storm_header" options={StormHeader} />
                        </Form.Item>
                    </div>

                    {errors ?
                        <Alert className='my-5' severity="error">
                            <AlertTitle>{errors}</AlertTitle>
                        </Alert>
                        : null}

                    {success ?
                        <Alert className='my-5' severity="success">
                            <AlertTitle>{success}</AlertTitle>
                        </Alert>
                        : null}

                    <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop: 5, marginBottom: 5 }}>

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
                                <Bold>Save</Bold>
                            </SubmitButton>
                        </>


                        <Button
                            onClick={() => SetStormModal(false)}
                            //   sx={{ mt: 1, mr: 1 }}
                            variant="outlined"
                            size="large"
                            disableElevation
                        >
                            Cancel
                        </Button>
                    </Box>

                </Form>

            </Formik>

        </ModalDefault>
    )
})

export default Add_Storm_Location
