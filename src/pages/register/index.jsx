import React, { useState } from 'react';
import * as Yup from 'yup';
import ScreenSize from '../../component/ScreenSize';
import Header from '../../component/Typography/Header';
import Regular from '../../component/Typography/Regular';
import Bold from '../../component/Typography/Bold';
import Form from '../../component/Formik/Form';
import FormikInput from '../../component/Formik/FormikInput';
import SubmitButton from '../../component/Formik/SubmitButton';
import PasswordChecklist from "react-password-checklist"

import { Popover } from 'react-tiny-popover';
import { Link, useNavigate } from 'react-router-dom';
import { BannerImage, AuthImage } from '../../contants';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { createAccount } from '../../redux/auth/authThunk';
import { Alert, AlertTitle } from '@mui/material';
import { handlePhoneNumberFormat } from '../../contants';

const validationSchema = Yup.object().shape({
    last_name: Yup.string().required('Last name is a required field'),
    first_name: Yup.string().required('First name is a required field'),
    // email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required('Email is a required field'),
    email: Yup.string().email('Must be a valid email').matches(/^(?!.*@[^,]*,)/).required('Email is a required field'),
    // username: Yup.string().required('Username is a required field'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ).required('Password is a required field'),
    confirmPassword: Yup.string()
        .required('Confirm Password is a required field')
        .oneOf([Yup.ref('password'), null], 'Your password and confirmation password does not match.'),
});

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registerFormError, loading, registerForm } = useSelector((state) => state.auth);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);

    const handleSubmit = async (value) => {
        const response = await dispatch(createAccount(value));

        if (!response?.payload?.error) {
            navigate("/");
        }
    }

    return (
        <>
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${AuthImage})` , height: '100%' }}>
                <div className='justify-end flex h-full content-center'>
                    <div className='rounded-md bg-[#ffff] w-[35%] px-8 py-14 m-[3rem] max-[1024px]:m-0 max-[1024px]:w-full max-[1024px]:px-0'>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={registerForm}
                            onSubmit={handleSubmit}
                        >
                            {formik => {
                                return (
                                    <Form className='flex flex-col items-center max-[730px]:px-4'>

                                        <div className='invisible w-0 h-0 max-[1024px]:visible max-[1024px]:w-full max-[1024px]:h-full max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-center'>
                                            <img src={BannerImage} alt='Banner' style={{ height: 250, width: 250 }} />
                                        </div>

                                        <span className='text-mainText text-2xl'>
                                            <Bold>Create Account</Bold>
                                        </span>

                                        <div className='my-5 text-center text-base w-full'>
                                            <Regular>Your go-to tech app for quick and effective job management.</Regular>
                                        </div>

                                        {registerFormError?.message ?
                                            <Alert className='w-full mb-10 mt-5' severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                {registerFormError?.message}
                                            </Alert>
                                            : <></>
                                        }

                                        <div className='flex flex-row justify-between w-full gap-3 max-[730px]:flex-col'>
                                            <Form.Item className='my-2 w-full' name="first_name" label="First Name" >
                                                <FormikInput name="first_name" placeholder="First Name" />
                                            </Form.Item>
                                            <Form.Item className='my-2 w-full' name="last_name" label="Last Name" >
                                                <FormikInput name="last_name" placeholder="Last Name" />
                                            </Form.Item>
                                            {/* <Form.Item name="middle_name" label="Middle Name" >
                                    <FormikInput name="middle_name" placeholder="Middle Name" />
                                </Form.Item> */}
                                        </div>

                                        <div className='w-full'>
                                            <div className='flex flex-row justify-between w-full gap-3 max-[730px]:flex-col'>
                                                <Form.Item className='my-2 w-full' name="phoneNumber" label="Phone Number" >
                                                    <FormikInput name="mobile_number" placeholder="Mobile Number" value={phoneNumber} maxlength="14" autocomplete="off"
                                                        onChange={e => handlePhoneNumberFormat(e, setPhoneNumber)} />
                                                </Form.Item>
                                                <Form.Item className='my-2 w-full' name="email" label="Email Address" >
                                                    <FormikInput name="email" placeholder="Email Address" />
                                                </Form.Item>
                                            </div>

                                            {/* <Form.Item name="username" label="Username" >
                                    <FormikInput name="username" placeholder="Username" />
                                </Form.Item> */}
                                            <Form.Item name="password" label="Password" >
                                                <Popover isOpen={passwordFocus} positions="bottom" align="end" content={
                                                    <div className="bg-white p-5 rounded-md border border-inherit">
                                                        <PasswordChecklist
                                                            rules={["minLength", "specialChar", "number", "capital"]}
                                                            minLength={8}
                                                            value={formik.values.password}
                                                        />
                                                    </div>
                                                }>
                                                    <FormikInput.Password
                                                        name="password"
                                                        placeholder="Password"
                                                        onFocus={() => {
                                                            setPasswordFocus(true)
                                                        }}
                                                        onBlur={() => {
                                                            setPasswordFocus(false)
                                                        }} />
                                                </Popover>
                                            </Form.Item>
                                            <Form.Item name="confirmPassword" label="Confirm Password" >
                                                <FormikInput.Password name="confirmPassword" placeholder="Confirm Password" />
                                            </Form.Item>

                                            <div className='my-3'>
                                                <SubmitButton
                                                    loading={loading}
                                                    className={`
                                        w-full
                                        px-10
                                        py-3
                                        !bg-mainText
                                        !rounded-full
                                        !text-center
                                        !text-white
                                        hover:bg-green-600
                                        hover:transition
                                        duration-300
                                `}
                                                >
                                                    <Bold>Sign Up</Bold>
                                                </SubmitButton>
                                            </div>
                                        </div>

                                        <div className='my-2 flex flex-row justify-center w-full'>
                                            <Regular>
                                                <span className='text-regularText'>Already have an account?</span>
                                            </Regular>
                                            <Bold>
                                                <Link
                                                    to="/login"
                                                    className='ml-2 text-mainText hover:text-green-600 hover:transition duration-300'>
                                                    Sign In

                                                </Link>
                                            </Bold>
                                        </div>
                                        <div className='text-center  text-xs'>
                                                <span className={`text-regularText`}>
                                                    <Regular>© 2024 Integrated Claims Estimating (ICE) All rights reserved</Regular>
                                                </span>
                                            </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
