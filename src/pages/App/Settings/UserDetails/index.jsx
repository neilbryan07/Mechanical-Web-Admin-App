import React, { useState, useEffect } from 'react';

import Header from '../../../../component/Typography/Header';
import SubHeader from '../../../../component/Typography/SubHeader';
import TextInputs from '../../../../component/FormInput';
import MainButton from '../../../../component/CustomButton/MainButton';

const UserDetails = () => {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {

    }

    return (
        <div className='flex flex-col items-center justify-center'>

            <div className='flex flex-col items-center w-2/6 mb-10'>

                <form className='w-11/12'>

                    <div className='w-full flex flex-col items-center justify-center mb-10'>
                        <Header>User Details</Header>
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Full Name</SubHeader> <span className='text-red-600'>*</span></span>
                        <TextInputs placeholder={"Enter full name"} type={"text"} />
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Contact Number</SubHeader> <span className='text-red-600'>*</span></span>
                        <TextInputs placeholder={"Enter contact number"} type={"text"} />
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Enter old password</SubHeader> <span className='text-red-600'>*</span></span>
                        <TextInputs placeholder={"Enter password"} type={"password"} />
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Enter new password</SubHeader> <span className='text-red-600'>*</span></span>
                        <TextInputs placeholder={"Enter password"} type={"password"} />
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Confirm new password</SubHeader> <span className='text-red-600'>*</span></span>
                        <TextInputs placeholder={"Enter password"} type={"password"} />
                    </div>


                </form>


                <div className='w-11/12 my-3'>
                    <MainButton text="Submit" handleButton={handleSubmit} />
                </div>

            </div>

        </div>
    )
}

export default UserDetails
