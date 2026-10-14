import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { tokenStorage, selectToken , selectRemember , rememberStorage } from '../redux/Credentials/credsSlice';

import ScreenSize from '../component/ScreenSize';

const Splash = () => {

    const navigate = useNavigate();
    
    useEffect(() => {

        if(localStorage.getItem('access_token') === null) {
            navigate("/login")
        } else {
            navigate("/app/dashboard")
        }

    }, []);

    return (

    <ScreenSize>
        <div className='flex flex-row max-[1024px]:flex-center'></div>
    </ScreenSize>
  )
}

export default Splash
