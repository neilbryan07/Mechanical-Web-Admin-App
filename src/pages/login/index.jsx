import React, { useEffect } from 'react';
import * as Yup from 'yup';
import ScreenSize from '../../component/ScreenSize';
import Header from '../../component/Typography/Header';
import Regular from '../../component/Typography/Regular';
import Bold from '../../component/Typography/Bold';
import Form from '../../component/Formik/Form';
import FormikInput from '../../component/Formik/FormikInput';
import SubmitButton from '../../component/Formik/SubmitButton';

import { Alert, AlertTitle, Checkbox, FormControlLabel } from '@mui/material';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authThunk';
import { BannerImage, AuthImage, pageRoutes } from '../../contants';
import { authAction } from '../../redux/auth/authSlice';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is a required field'),
    password: Yup.string().required('Password is a required field')
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, loading, loginForm } = useSelector((state) => state.auth);

    const handleSubmit = async (value) => {
        const response = await dispatch(login(value));

        if (!response?.payload?.error && response?.payload?.token) {
            localStorage.setItem('access_token', response?.payload?.token)

            if ( response?.payload?.role === 6  )  return navigate(pageRoutes.FOLLOWUPSTATE);

            if ( response?.payload?.role === 5  )  return navigate(pageRoutes.ESTIMATICSWORKFILES);

            navigate("/app/" + pageRoutes.DASHBOARD);
        }

        if (value?.remeberMe) {
            localStorage.setItem('remember_me_username', value?.username)
        }

        if (!value?.remeberMe) {
            localStorage.removeItem('remember_me_username')
        }
    }

    useEffect(() => {
        const username = localStorage.getItem('remember_me_username');

        dispatch(authAction.setLoginForm({
            username: username ? username : "",
            password: "",
        }));
    }, []);

    return (
        <>
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${AuthImage})` , height: '100%' }}>
                <div className='justify-end flex h-full content-center'>
                    <div className='rounded-md bg-[#ffff] w-[30%] px-8 py-14 m-[3rem] max-[1024px]:m-0 max-[1024px]:w-full max-[1024px]:px-0'>

                        {/* Logo */}
                        {/* <div className='text-center'>
                        <Header>Your Logo</Header>
                    </div> */}

                        {/* Form */}
                        <div className='flex flex-col items-center w-full'>
                            <div className='invisible w-0 h-0 max-[1024px]:visible max-[1024px]:w-full max-[1024px]:h-full max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-center'>
                                <img src={BannerImage} alt='Banner' style={{ height: 250, width: 250 }} />
                            </div>

                            <span className='text-mainText text-2xl mb-10'>
                                <Bold>Welcome Back!</Bold>
                            </span>

                            {/* <div className='my-5 text-center text-base'>
                            <Regular>Your go-to tech app for quick and</Regular>
                            <Regular>effective job management.</Regular>
                        </div> */}
                            {/* {error?.message ?
                                <span className='text-[#DE4C50] text-base'>{error?.message}</span>
                                : null
                            } */}
                            {/* Form UserName and TextInput */}

                            <Formik
                                enableReinitialize={true}
                                initialValues={loginForm}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {formik => (
                                    <Form className='w-11/12'>
                                        {error?.message ?
                                            <span className='text-[#DE4C50] text-base'>{error?.message}</span>
                                            : <></>
                                        }
                                        {/* {error?.message ?
                                            <Alert className='mb-5' severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                {error?.message}
                                            </Alert>
                                            : <></>
                                        } */}

                                        <Form.Item name="username" label="Username">
                                            <FormikInput name="username" placeholder="Enter Username" />
                                        </Form.Item>

                                        <Form.Item name="password" label="Password">
                                            <FormikInput.Password name="password" placeholder="Enter Password" />
                                        </Form.Item>

                                        <div className='my-2'>
                                            <Link
                                                to="/forgot_password"
                                                className={`text-mainText text-right max-[500px]:text-center hover:text-green-600 hover:transition duration-300`}
                                            >
                                                <Regular>
                                                    Forgot Password?
                                                </Regular>
                                            </Link>
                                        </div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={formik?.values?.remeberMe}
                                                    sx={{
                                                        color: '#66BE7A',
                                                        '&.Mui-checked': {
                                                            color: '#66BE7A',
                                                        },
                                                    }}
                                                    onChange={(value) => {
                                                        formik.setFieldValue('remeberMe', value.target.checked)
                                                    }}
                                                />
                                            }
                                            label={<span className='text-[#646464]'>Remember me</span>} />

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
                                                <Bold>Sign In</Bold>
                                            </SubmitButton>
                                        </div>

                                        <div className='w-11/12 my-2 flex flex-row justify-center max-[500px]:w-full max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-3 '>
                                            <Regular>
                                                <span className='text-regularText'>Didn't have an account?</span>
                                            </Regular>
                                            <Bold>
                                                <Link
                                                    to="/register"
                                                    className='ml-2 text-mainText hover:text-green-600 hover:transition duration-300'>
                                                    Sign Up
                                                </Link>
                                            </Bold>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>

                        {/* Footer text */}
                        <footer className='text-center text-xs mt-16'>
                            <span className={`text-regularText`}>
                                <Regular>© 2024 Integrated Claims Estimating (ICE) All rights reserved</Regular>
                            </span>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
