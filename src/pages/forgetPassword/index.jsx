import React from 'react';
import * as Yup from 'yup';
import Regular from '../../component/Typography/Regular';
import Bold from '../../component/Typography/Bold';
import Form from '../../component/Formik/Form';
import SubmitButton from '../../component/Formik/SubmitButton';
import FormikInput from '../../component/Formik/FormikInput';

import { BannerImage, AuthImage } from '../../contants';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/auth/authThunk';
import Swal from 'sweetalert2';
import { Alert, AlertTitle } from '@mui/material';

const validationSchema = Yup.object().shape({
    // email_or_phone_number: Yup
    //     .string()
    //     .matches(/^(?!.*@[^,]*,)/)
    //     .required('Email or phone number is a required field'),
    email: Yup.string().email('Must be a valid email').matches(/^(?!.*@[^,]*,)/).required('Email is a required field'),
    // password: Yup
    //     .string()
    //     .matches(
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    //     ).required('Password is a required field'),
    // confirm_new_password: Yup
    //     .string()
    //     .required('Confirm Password is a required field')
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { forgotPasswordFormError, forgotPasswordForm, loading } = useSelector(state => state.auth);

    const handleSubmit = async (value) => {
        const response = await dispatch(forgotPassword(value));
        
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });


        if (!response?.payload?.error && response?.type === "user/forgotPassword/fulfilled") {
            Toast.fire({
                icon: "success",
                title: "Successfully Submitted"
            });
        }
    }

    return (
        <>
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${AuthImage})`, height: '100%' }}>
                <div className='justify-end flex h-full content-center'>
                    <div className='rounded-md bg-[#ffff] w-[30%] px-8 py-14 m-[3rem] max-[1024px]:m-0 max-[1024px]:w-full max-[1024px]:px-0'>
                        <div className='invisible w-0 h-0 max-[1024px]:visible max-[1024px]:w-full max-[1024px]:h-full max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-center'>
                            <img src={BannerImage} alt='Banner' style={{ height: 250, width: 250 }} />
                        </div>
                        <div className='justify-center grid h-full	content-center'>
                            <span className='text-mainText text-2xl text-center'>
                                <Bold>Welcome Back!</Bold>
                            </span>

                            <div className='my-5 text-center text-base'>
                                <Regular>Your go-to tech app for quick and</Regular>
                                <Regular>effective job management.</Regular>
                            </div>
                            <Formik
                                initialValues={forgotPasswordForm}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form >
                                    {forgotPasswordFormError?.message ?
                                        <Alert className='mb-5' severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {forgotPasswordFormError?.message}
                                        </Alert>
                                        : <></>
                                    }

                                    <Form.Item
                                        className='my-3'
                                        name="email"
                                        label="Email"
                                    >
                                        <FormikInput
                                            name="email"
                                            placeholder="Enter email"
                                        />
                                    </Form.Item>

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
                                        <Bold>
                                            Submit
                                        </Bold>
                                    </SubmitButton>
                                    {/* 
                                <Form.Item
                                    className='my-3'
                                    name="password"
                                    label="Password"
                                >
                                    <FormikInput.Password
                                        name="password"
                                        placeholder="Enter password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='my-3'
                                    name="confirm_new_password"
                                    label="Confirm New Password"
                                >
                                    <FormikInput.Password
                                        name="confirm_new_password"
                                        placeholder="Enter Password"
                                    />
                                </Form.Item>

                                <SubmitButton
                                    loading={false}
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
                                    <Bold>
                                        Change Password
                                    </Bold>
                                </SubmitButton> */}
                                </Form>
                            </Formik>
                            <div className='w-11/12 my-2 flex flex-row justify-center max-[500px]:w-full max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-3 '>
                                <Regular>
                                    <span className='text-regularText'>
                                        Didn't have an account?
                                    </span>
                                </Regular>
                                <Link
                                    to='/register'
                                    className='ml-2 text-mainText hover:text-green-600 hover:transition duration-300'
                                >
                                    <Bold>
                                        Signup now
                                    </Bold>
                                </Link>
                            </div>
                            <footer className='text-center text-xs mt-16'>
                                <span className={`text-regularText`}>
                                    <Regular>© 2024 Integrated Claims Estimating (ICE) All rights reserved</Regular>
                                </span>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
