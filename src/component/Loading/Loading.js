import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/loading/page-loading.json'

import { useSelector } from 'react-redux';

const Loading = () => {
    // const { pageLoading } = useSelector((state) => state.Loading);

    return (
        <>
            <div style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Lottie style={{ width: '50%' }} animationData={animationData} />
            </div>
        </>
    )
}

export default Loading;