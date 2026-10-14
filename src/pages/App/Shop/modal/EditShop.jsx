import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';

import ModalDefault from '../../../../component/Modal/ModalDefault';
import Bold from '../../../../component/Typography/Bold';
import Card from '../../../../component/Card/Card';
import Technician_List from '../../../../component/Layout/Sidebar/DropdownContent/Technician_List';


import { MdStore } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlinePlusCircle, AiFillCloseCircle } from "react-icons/ai";


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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, AlertTitle } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";

import { FranchisedDataColumnsModal as columnsModal } from "../../../../contants/StaticData";

import { handlePhoneNumberFormat, handlePhoneNumberFormatNoSave } from '../../../../contants';

import { APIServices } from '../../../../hooks/fetchAPI';

import { getRegionList } from '../../../../redux/region/regionThunk';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({

    name: Yup.string().required('Name is a required field'),
    address: Yup.string().required('Address is a required field'),

    city: Yup.string().required('City is a required field'),
    state: Yup.string().required('State is a required field'),
    zip_code: Yup.string().required('ZipCode is a required field'),
    ein_number: Yup.string().required('EIN Number is a required field'),
    shop_rent: Yup.string().required('Shop Rent is a required field'),
    // region: Yup.string().required('Region is a required field'),

    body_labor_rate: Yup.string().required('Body Labor Rate is a required field'),
    paint_labor_rate: Yup.string().required('Paint Labor Rate is a required field'),
    mechanical_labor_rate: Yup.string().required('Mechanical Labor is a required field'),
    paint_material_rate: Yup.string().required('Paint Material Rate is a required field'),

    // manager: Yup.string().required('Manager Name is a required field'),
    // manager_phone_number: Yup.string().required('Manager Phone Number Rate is a required field'),
    // manager_email_address: Yup.string().required('Manager Email Address is a required field'),

});

const Edit_Shop = ({ Shopmodal, SetShopModal, shopData }) => {

    const dispatch = useDispatch();
    const regionResponses = useSelector((state) => state.region.action);

    const [regionLists, setRegionLists] = useState([]);

    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [listTechModal, setListTechModal] = useState(false);

    const [techListData, setTechListData] = useState([]);

    const [regionDropdown, setRegionDropdown] = useState([]);

    const [shopContact, setShopContact] = useState([
        {
            contact_name: "",
            phone_number: "",
            email: ""
        },
    ]);

    let formValue = {

        name: shopData?.name,
        address: shopData?.address,
        // contact: "0344452283",
        email: shopData?.email,
        city: shopData?.city,
        state: "",
        zip_code: "",
        ein_number: "",
        shop_rent: "",

        lat: "10.677617505627385",
        long: "122.95953576867043",

        body_labor_rate: "",
        paint_labor_rate: "",
        mechanical_labor_rate: "",
        paint_material_rate: "",

        manager: "test",
        // manager_phone_number: "",
        // manager_email_address: "",

        technicians: [],
        contact: [],
        owner: "",
        region: "",

    }


    useEffect(() => {
        setTechListData([]);
    }, [Shopmodal]);

    useEffect(() => {

        (async () => {

            await dispatch(getRegionList());
            handleFetchFranchiseRegion();

        })();

    }, []);

    const handleFetchFranchiseRegion = async () => {

        const res = await APIServices.get({ url: '/franchise/region/list/all' })
        if (res?.status === 200) {
            const mapping = res?.data?.data?.map(e => ({ value: e._id, label: e.name }))
            setRegionLists(mapping)
        }
    }


    // useEffect(() => {

    //     const mapping = regionResponses?.regionResponse?.data?.map( e => ({ value : e._id , label :  e.region }) )
    //     setRegionLists(mapping)

    // }, [regionResponses]);

    const handleRemoveContact = (index) => {

        const newData = shopContact.filter((_, i) => i !== index);
        const resetData = shopContact[index];
        resetData.contact_name = '';
        resetData.email = '';
        resetData.phone_number = '';

        setShopContact(newData)

    }

    const handleAddContact = () => {

        let newShopdata = {
            contact_name: "",
            phone_number: "",
            email: ""
        };

        const newData = [...shopContact, newShopdata];

        // formValue.contact = [...formValue.contact, newShopdata];

        setShopContact(newData)
    }

    const handleTextInput = (input, keyData, type) => {

        const newData = shopContact.map((item, key) => {

            if (keyData === key) {

                if (type === 'manager') {

                    return { ...item, 'contact_name': input.target.value };

                }

                if (type === 'email') {

                    return { ...item, 'email': input.target.value };

                }

                //   if(type === 'manager') {

                //     return { ...item, 'contact_name': input.target.value };

                //   }

            }
            return item;

        });

        setShopContact(newData)

    }


    const handleSubmit = async (value) => {

        setError(null)
        setSuccess(null)

        // const resProfileMe = await APIServices.get({ url: '/user/profile/me'});

        let values = {

            "name": value.name,
            "address": value.address,
            "city": value.city,
            "state": value.state,
            "zip_code": value.zip_code,
            "ein_number": value.ein_number,
            "shop_rent": value.shop_rent,
            "contact_number": "0344452283",
            "contact": shopContact,
            "email": value.email,

            "body_labor_rate": value.body_labor_rate,
            "paint_labor_rate": value.paint_labor_rate,
            "mechanical_labor_rate": value.mechanical_labor_rate,
            "paint_material_rate": value.paint_material_rate,

            "technicians": techListData,
            "owner": 'Mrs.Chan',
            "region": regionDropdown,
            "status": 1,
        }

        const res = await APIServices.post({ url: '/shop/add', payload: values })

        if (res.status === 200) {
            setSuccess(res.data.message)

            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setError(res?.[0]?.response?.data?.message)
        }

    }

    const handleChange = (event) => {
        setRegionDropdown(event.target.value);
    }

    const handleRemoveTechnician = (index) => {
        setTechListData(prevData => prevData.filter((_, i) => i !== index));
    }

    return (
        <ModalDefault
            title={"Edit Shops"}
            toggle={Shopmodal}
            setToggle={SetShopModal}
            size={'w-7/12'}
        >
            <Technician_List Techmodal={listTechModal} SetTechModal={setListTechModal} setTechData={setTechListData} techListDatas={techListData} />
            <Formik
                initialValues={formValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='px-4'>

                    <Card props={"mb-6"}>

                        <div className='flex flex-row items-center gap-2 mb-2'>
                            <span style={{ fontSize: 18 }} className='text-black'><MdStore /></span>
                            <span style={{ fontSize: 18 }} className='text-black'><Bold>Repair Shop Information</Bold></span>
                        </div>

                        <div className='gap-3 flex flex-row items-center'>
                            <span className='text-gray-400 font-semibold text-sm'>Inactive</span>
                            <Switch defaultChecked color="success" />
                            <span className='text-green-500 font-semibold text-sm'>Active</span>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="name" label="Name">
                                <FormikInput name="name" placeholder="Search or Enter Name" />
                            </Form.Item>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="address" label="Address">
                                <FormikInput name="address" placeholder="Enter Street Number, Apartment and Unit Number" />
                            </Form.Item>
                        </div>

                        <div className='w-full flex flex-row gap-3 items-center'>

                            <div className='my-3 w-full'>
                                <Form.Item name="city" label="City">
                                    <FormikInput name="city" placeholder="Enter City" />
                                </Form.Item>
                            </div>

                            <div className='my-3 w-full'>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={regionDropdown}
                                        label="Type"
                                        onChange={handleChange}
                                    >

                                        {regionLists.map(item => (
                                            <MenuItem value={item?.value}>{item?.label}</MenuItem>
                                        ))}

                                    </Select>

                                </FormControl>

                            </div>

                        </div>

                        <div className='w-full flex flex-row gap-3'>

                            <div className='my-3  w-full'>
                                <Form.Item name="state" label="State">
                                    <FormikInput name="state" placeholder="Enter state" />
                                </Form.Item>
                            </div>

                            <div className='my-3  w-full'>
                                <Form.Item name="zip_code" label="Zip Code">
                                    <FormikInput name="zip_code" placeholder="Enter zip code" />
                                </Form.Item>
                            </div>

                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="ein_number" label="EIN Number">
                                <FormikInput name="ein_number" placeholder="Enter EIN Number" />
                            </Form.Item>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="shop_rent" label="Shop Rent">
                                <FormikInput name="shop_rent" placeholder="Enter shop rent" type="number" />
                            </Form.Item>
                        </div>

                    </Card>

                    <Card props={"mb-6"}>

                        <div className='flex flex-row items-center gap-2 mb-2'>
                            <span style={{ fontSize: 18 }} className='text-black'><BsCurrencyDollar /></span>
                            <span style={{ fontSize: 18 }} className='text-black'><Bold>Labor Rates</Bold></span>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="body_labor_rate" label="Body Labor Rate">
                                <FormikInput name="body_labor_rate" placeholder="Enter body labor rate" type="number" />
                            </Form.Item>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="paint_labor_rate" label="Paint Labor Rate">
                                <FormikInput name="paint_labor_rate" placeholder="Enter paint labor rate" type="number" />
                            </Form.Item>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="mechanical_labor_rate" label="Mechanical Labor Rate">
                                <FormikInput name="mechanical_labor_rate" placeholder="Enter mechanical labor rate" type="number" />
                            </Form.Item>
                        </div>

                        <div className='my-3 gap-2'>
                            <Form.Item name="paint_material_rate" label="Paint Material Rate">
                                <FormikInput name="paint_material_rate" placeholder="Enter paint material rate" type="number" />
                            </Form.Item>
                        </div>

                    </Card>

                    {shopContact?.map((item, key) => (

                        <Card props={"mb-6"} key={key}>

                            <div className='flex flex-row items-center justify-between gap-2 mb-2'>

                                <div className='flex flex-row items-center gap-2 mb-2'>
                                    <span style={{ fontSize: 18 }} className='text-black'><FaUser /></span>
                                    <span style={{ fontSize: 18 }} className='text-black'><Bold>Shop Contact</Bold></span>
                                </div>

                                {key !== 0 ?
                                    <div className='cursor-pointer' onClick={() => handleRemoveContact(key)}>
                                        <span className='text-xl text-black'><IoMdCloseCircleOutline /></span>
                                    </div>
                                    : null}

                            </div>



                            <div className='my-3 gap-2'>
                                <Form.Item name={`manager${key}`} label="Manager's Name">
                                    <FormikInput name={`manager${key}`} placeholder="Enter manager name" onChange={e => handleTextInput(e, key, 'manager')} />
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name={`phone${key}`} label="Phone Number">
                                    <FormikInput name={`phone${key}`} placeholder="Enter phone number" value={item?.phone_number} maxLength="14"
                                        onChange={e => handlePhoneNumberFormatNoSave(e, setPhoneNumber, shopContact, key)} />
                                </Form.Item>
                            </div>

                            <div className='my-3 gap-2'>
                                <Form.Item name={`email${key}`} label="Email Address">
                                    <FormikInput name={`email${key}`} placeholder="Enter email address" type="email" onChange={e => handleTextInput(e, key, 'email')} />
                                </Form.Item>
                            </div>

                        </Card>

                    ))}

                    <span className='my-2' />

                    <div className='w-full flex justify-center pb-3'>

                        <div onClick={handleAddContact} className='flex items-center justify-center gap-3 py-2 px-14 border-mainText border rounded-lg text-mainText cursor-pointer hover:bg-green-500 hover:text-white'>
                            <span style={{ fontSize: 23 }}><AiOutlinePlusCircle /></span> <Bold>Add Another Shop Contact</Bold>
                        </div>

                    </div>

                    <div className='flex flex-col mt-6'>

                        <div className='flex flex-row justify-between items-center'>

                            <div className='flex flex-row gap-3 items-center'>
                                <HiUserGroup />
                                <span style={{ fontSize: 14 }}><Bold>Technicians</Bold></span>
                            </div>

                            <span className='font-semibold' style={{ fontSize: 14 }}>Item List ({techListData ? techListData?.length : null})</span>

                        </div>

                        <span className='my-2' />

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
                                    {techListData?.map((row, key) => (

                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                                        >

                                            <TableCell><span className='text-red-500 cursor-pointer text-lg' onClick={e => handleRemoveTechnician(key)}><AiFillCloseCircle /></span></TableCell>

                                            <TableCell>

                                                <div className='flex flex-col'>
                                                    {row?.first_name} {row?.last_name}
                                                </div>

                                            </TableCell>


                                            <TableCell>

                                                <div className='flex flex-col'>
                                                    {row?.email}
                                                </div>

                                            </TableCell>

                                            <TableCell>

                                                <div className='flex flex-col'>
                                                    {row?.mobile_number}
                                                </div>

                                            </TableCell>

                                            <TableCell><h1 /></TableCell>


                                        </TableRow>
                                    ))}

                                </TableBody>

                            </Table>
                        </TableContainer>

                        <span className='my-2' />

                        <div className='w-full flex justify-center pb-3'>

                            <div onClick={() => setListTechModal(true)} className='flex items-center justify-center gap-3 py-2 px-24 border-mainText border hover:bg-green-500 hover:text-white rounded-lg text-mainText cursor-pointer'>
                                <span style={{ fontSize: 23 }}><AiOutlinePlusCircle /></span> <Bold>Assign Technicians</Bold>
                            </div>

                        </div>

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
                            onClick={() => SetShopModal(false)}
                            //   sx={{ mt: 1, mr: 1 }}Storm Location
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
}

export default Edit_Shop
