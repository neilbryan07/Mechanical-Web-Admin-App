import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import ModalDefault from '../../../Modal/ModalDefault';
import Bold from '../../../Typography/Bold';

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
import { getShopList } from '../../../../redux/shop/shopThunk';
import { getRegionList } from '../../../../redux/region/regionThunk';
import { APIServices } from '../../../../hooks/fetchAPI';

import { Alert, AlertTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { handlePhoneNumberFormat } from '../../../../contants';

const validationSchema = Yup.object().shape({

    // region: Yup.string().required('Region is a required field'),
    // shops: Yup.string().required('Shop Assigned is a required field'),

    mobile_number: Yup.string().required('Mobile Number is a required field'),

    first_name: Yup.string().required('First Name is a required field'),
    last_name: Yup.string().required('Last Name is a required field'),
    email: Yup.string().required('Email Address is a required field'),

    pay_percentage: Yup.string().required('Tech Pay Percentage is a required field'),

    // username: Yup.string().required('Username is a required field'),
    password: Yup.string().required('Password is a required field'),
    confirm_password: Yup.string().required('Confirm Password is a required field'),
});

const Add_Technician = ({ Techmodal, SetTechModal }) => {

    const dispatch = useDispatch();

    const shopResponses = useSelector((state) => state.shop.action);
    const regionResponses = useSelector((state) => state.region.action);

    const [shopLists, setShopLists] = useState([]);
    const [regionLists, setRegionLists] = useState([]);

    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState(true);


    const [phoneNumber, setPhoneNumber] = useState('');

    let formValue = {

        mobile_number: '',

        // Currently Active Based from the API response
        email: '',
        first_name: '',
        last_name: '',

        pay_percentage: '',
        shops: [],
        region: '',
        role: 2,
        status: '',
        verified: false,

        username: '',
        password: '',
        confirm_password: '',
    }

    const handleSubmit = async (value) => {

        setError(null)
        setSuccess(null)
        setLoading(true)
        if (value.password !== value.confirm_password) {
            return setError("Password do not match")
        }

        if (!value.region) {
            setLoading(false)
            return setError("Home Region is required")
        }

        value.status = status ? 1 : 0;

        value.technician_details = {
            "pay_percentage": value.pay_percentage,
            "region": value.region,
        }

        const res = await APIServices.post({ url: '/user/register/technician', payload: value })

        if (res.status === 200) {
            setSuccess(res.data.message)
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setLoading(false)
            setError(res[0].response.data.message)
        }

    }

    useEffect(() => {
        (async () => {

            await dispatch(getShopList());
            await dispatch(getRegionList());

        })();

        handleFetchFranchiseRegion();

    }, []);

    const handleFetchFranchiseRegion = async () => {

        const res = await APIServices.get({ url: '/franchise/region/list/all' })
        if (res?.status === 200) {
            const mapping = res?.data?.data?.map(e => ({ value: e._id, label: e.name }))
            setRegionLists(mapping)
        }
    }

    useEffect(() => {

        const mapping = shopResponses?.shopResponse?.data?.map(e => ({ value: e._id, label: e.name }))
        setShopLists(mapping)

    }, [shopResponses]);

    // useEffect(() => {

    //     const mapping = regionResponses?.regionResponse?.data?.map( e => ({ value : e._id , label :  e.region }) )
    //     setRegionLists(mapping)

    // }, [regionResponses]);

    const handleStatus = (event) => {
        setStatus(event.target.checked);
    };

    return (
        <ModalDefault
            title={"Add Technicians"}
            toggle={Techmodal}
            setToggle={SetTechModal}
            size={'w-4/12'}
        >

            <Formik
                initialValues={formValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='px-4'>

                    <div className='my-3 gap-2'>
                        <Form.Item name="first_name" label="First Name">
                            <FormikInput name="first_name" placeholder="Enter First Name" />
                        </Form.Item>
                    </div>

                    <div className='my-3 gap-2'>
                        <Form.Item name="last_name" label="Last Name">
                            <FormikInput name="last_name" placeholder="Enter Last Name" />
                        </Form.Item>
                    </div>

                    <div className='my-3 gap-2'>
                        <Form.Item name="mobile_number" label="Mobile Number">
                            <FormikInput name="mobile_number" placeholder="Enter mobile number" value={phoneNumber} maxlength="14" autocomplete="off"
                                onChange={e => handlePhoneNumberFormat(e, setPhoneNumber)} />
                        </Form.Item>
                    </div>

                    <div className='my-3 gap-2'>
                        <Form.Item name="email" label="Email Address">
                            <FormikInput name="email" placeholder="Enter email address" type="email" />
                        </Form.Item>
                    </div>

                    <div className='my-3 gap-2'>
                        <Form.Item name="pay_percentage" label="Tech Pay Percentage">
                            <FormikInput name="pay_percentage" placeholder="Enter tech pay percentage" type="number" />
                        </Form.Item>
                    </div>

                    <div className='my-5 gap-2'>
                        <Form.Item name="shops" label="Shop Assigned">
                            <FormikSelect name="shops" options={shopLists} />
                        </Form.Item>
                    </div>

                    <div className='my-5 gap-2'>
                        <Form.Item name="region" label="Home Region">
                            <FormikSelect name="region" options={regionLists} />
                        </Form.Item>
                    </div>

                    {/* <div className='my-3 gap-2'>
                    <Form.Item name="username" label="Username">
                        <FormikInput name="username" placeholder="Enter username"/>
                    </Form.Item>
                </div> */}

                    <div className='my-3 gap-2'>
                        <Form.Item name="password" label="Password">
                            <FormikInput.Password name="password" placeholder="Enter Password" />
                        </Form.Item>
                    </div>

                    <div className='my-3 gap-2'>
                        <Form.Item name="confirm_password" label="Confirm Password">
                            <FormikInput.Password name="confirm_password" placeholder="Enter Confirm Password" />
                        </Form.Item>
                    </div>

                    <span style={{ fontSize: 16 }} className='text-black'>Status</span>

                    <div className='gap-3 flex flex-row items-center'>

                        <span className='text-gray-400 font-semibold text-sm'>Inactive</span>
                        <Switch checked={status} onChange={handleStatus} color="success" />
                        <span className={` ${status ? 'text-green-500' : 'text-gray-400 '} font-semibold text-sm`}>Active</span>

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
                                {/* <Bold>Save</Bold> */}
                                <Bold>Save {loading && <span className='text-white'><CircularProgress size={15} color="inherit" /></span>}</Bold>
                            </SubmitButton>
                        </>


                        <Button
                            onClick={() => SetTechModal(false)}
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
}

export default Add_Technician
