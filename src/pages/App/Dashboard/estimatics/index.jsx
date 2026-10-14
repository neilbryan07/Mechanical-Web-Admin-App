import React, { useEffect, useCallback } from 'react'

import Bold from "../../../../component/Typography/Bold";
import Regular from '../../../../component/Typography/Regular';
import TextDisplay from "../../../../component/Typography/TextDisplay";

import Card from '../../../../component/Card/Card'
import { DashboardIcons , dollarFormat } from '../../../../contants'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiFillFlag } from "react-icons/ai";

import ContentLoader from "react-content-loader"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getWebData } from '../../../../redux/dashboard/dashboardThunk';
import { dashboardAction } from '../../../../redux/dashboard/dashboardSlice';



const estimaticsIncome = [
    { color: '#33A885', week: 'CCC', income: '$98,965' },
    { color: '#66BE7A', week: 'Mitchell', income: '$460,151' },
]



export const DashboardEstimatics = ({ dashboardType }) => {

    const dispatch = useDispatch();
    const { webDataLoading, webDataList, webData } = useSelector(state => state.dashboard);

    const cardThreeItem = [
        {
            key: "total_number_of_estimates_written",
            icon: DashboardIcons.ESTIMATICSWRITTEN,
            number: 0,
            description: 'Total Number of Estimates Written'
        },
        {
            key: "average_estimating_cycle_time",
            icon: DashboardIcons.ESTIMATICSCLOCKS,
            number: 0,
            description: 'Average Estimating Cycle Time'
        },
        {
            key: "total_number_of_mitchel_estimates",
            icon: DashboardIcons.ESTIMATICSCARS,
            number: 0,
            description: 'Total Number of Mitchell Estimates'
        },
        {
            key: "total_number_of_ccc_estimates",
            icon: DashboardIcons.ESTIMATICSCARS,
            number: 0,
            description: 'Total Number of CCC Estimates'
        },
    ]


    const fetchData = useCallback(async () => { 
       
        try {

            dispatch(getWebData());


          } catch (err) {
              console.error("Error fetching data:", err);
            
          } 
    }, []);

    useEffect(() => {
          fetchData();
          const intervalId = setInterval(fetchData, 100000);
      
          return () => clearInterval(intervalId);
    }, [fetchData]);


    // useEffect(() => {
    //     dispatch(getWebData());

    //     if (webData) {
    //         const dataList = Object.keys(webData).map(x => {
    //             const findKey = cardThreeItem.find(c => c.key === x);
    
    //             if (findKey)
    //                 return {
    //                     ...findKey,
    //                     number: webData[x]
    //                 }
    //         }).filter(item => item !== undefined);

    //         dispatch(dashboardAction.setWebDataList(dataList));
    //     }
    //     else {
    //         dispatch(dashboardAction.setWebDataList(cardThreeItem));

    //     }
    // }, []);

    const convertToMinutes = (hours) => {
        return hours * 60;
    }

    const convertTo12HourFormat = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 
        const minutesPadded = minutes.toString().padStart(2, '0'); 
        return `${hours}:${minutesPadded} ${ampm}`;
    }

    const convertToHoursAndMinutes = (decimalHours) => {

        const hours = Math.floor(decimalHours / 3600);
        const minutes = Math.floor((decimalHours % 3600) / 60);
  
        const formattedTime = hours > 0 
            ? `${hours} hr${hours > 1 ? "s" : ""} and ${minutes} min${minutes > 1 ? "s" : ""}`
            : `${minutes} min${minutes > 1 ? "s" : ""}`;

        return formattedTime;

        // const hours = Math.floor(decimalHours); 
        // const minutes = Math.round((decimalHours - hours) * 60); 
        
        // if (hours > 0 && minutes > 0) {
        //   return `${hours} hrs and ${minutes} minutes`;
        // } else if (hours > 0) {
        //   return `${hours} hrs`;
        // } else {
        //   return `${minutes} minutes`;
        // }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); // Format as 'Month Day, Year'
    }

    return (
        <React.Fragment>

            {/* <div class="grid min-[1420px]:grid-cols-2 grid-cols gap-3"></div> */}
            <div class="w-full flex flex-row max-[1420px]:flex-col gap-3">

                <Card props={'w-full max-h-[450px] max-[1420px]:h-[500px]'}>

                    <div className='w-full flex justify-between items-center'>

                        <Bold>Total Amount of Estimates</Bold>

                        <div className='border border-gray-300 rounded-xl py-3 px-3 flex items-center'>
                            <img src={DashboardIcons.MORE} alt='icon' />
                        </div>

                    </div>

                    <div className='flex flex-row overflow-x-auto overflow-y-hidden flex-nowrap mt-5'>

                        <div className='w-full flex flex-col items-center justify-center'>

                        <div className='flex flex-col items-start justify-center'>

                            <div className='flex justify-items-start items-start flex-col mt-5'>

                                <div className='flex flex-row items-center'>
                                    <div className='rounded-full mr-3' style={{ height: 10, width: 10, backgroundColor: '#33A885' }}></div>
                                    <Bold><span className='text-regularText'>CCC</span></Bold>
                                </div>

                                <div className='flex flex-row items-center mt-2'>
                                    <Bold>{ dollarFormat( webData?.ccc_amount_of_estimate ) }</Bold>
                                </div>

                            </div>

                            <div className='flex justify-items-start items-start flex-col mt-5'>

                                <div className='flex flex-row items-center'>
                                    <div className='rounded-full mr-3' style={{ height: 10, width: 10, backgroundColor: '#66BE7A' }}></div>
                                    <Bold><span className='text-regularText'>Mitchell</span></Bold>
                                </div>

                                <div className='flex flex-row items-center mt-2'>
                                    <Bold>{ dollarFormat( webData?.mitchel_amount_of_estimate ) }</Bold>
                                </div>

                            </div>

                        </div>

                        </div>

                        <div className='w-full relative'>
                            <img src={DashboardIcons.ESTIMATICSCHART} alt='icon' style={{ width: '100%', height: '100%', maxHeight: 300, maxWidth: 300 }} />
                        </div>

                    </div>

                </Card>


                <Card props={'w-full'}>

                    <div className='w-full flex justify-between items-center mb-2'>

                        <Bold>Current Estimator/Auditor (24)</Bold>

                        <div className='border border-gray-300 rounded-xl py-3 px-3 flex items-center'>
                            <img src={DashboardIcons.MORE} alt='icon' />
                        </div>

                    </div>

                    <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        <Table sx={{ minWidth: 250 }}>

                            <TableBody>

                            {webData?.current_estimator_auditor?.map((row) => (
                                
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='rounded-full mr-3' style={{ height: 15, width: 15, backgroundColor: '#66BE7A' }}></div>

                                            <div className='flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Logged In</span></Regular>
                                                <Bold><span className='text-sm'>{ convertTo12HourFormat(row?.loginTimeToday) }</span></Bold>
                                            </div>

                                            <div className='flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Idle Time</span></Regular>
                                                <Bold><span className='text-sm'>{ convertToHoursAndMinutes(row?.averageIdleTime) }</span></Bold>
                                            </div>

                                        </div>


                                    </TableCell>

                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='flex flex-col items-start mt-6'>
                                                <Regular><span className='text-sm text-regularText'>Name</span></Regular>
                                                <Bold><span className='text-sm'>{ row?.firstName } { row?.lastName }</span></Bold>
                                            </div>

                                            <div className='flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Job Title</span></Regular>
                                                <Bold><span className='text-sm'></span></Bold>
                                            </div>

                                        </div>


                                    </TableCell>

                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='flex flex-col items-start mt-6'>
                                                <Regular><span className='text-sm text-regularText'>Level</span></Regular>
                                                <Bold><span className='text-sm'>Mitchell - Level 1</span></Bold>
                                            </div>

                                            <div className='flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Average Daily Time Cycle</span></Regular>
                                                <Bold><span className='text-sm'>12 Hours</span></Bold>
                                            </div>

                                        </div>


                                    </TableCell>


                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='w-full flex flex-col items-start mt-6'>
                                                <Regular><span className='text-sm text-regularText'>Total Number of Active Assignments</span></Regular>

                                                <div className='w-full flex flex-row justify-end'>
                                                    <Bold><span className='text-sm'>12</span></Bold>
                                                </div>

                                            </div>

                                            <div className='w-full flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Completed</span></Regular>
                                                <div className='w-full flex flex-row justify-end'>
                                                    <Bold><span className='text-sm'>5</span></Bold>
                                                </div>

                                            </div>

                                        </div>


                                    </TableCell>

                                </TableRow>

                            ))}

                            </TableBody>

                        </Table>
                    </TableContainer>

                </Card>

            </div>

            <div class="gap-2 mt-2 mb-16 grid grid-rows-1 grid-cols-1 min-[1420px]:grid-cols-2">
            {/* icon: DashboardIcons.ESTIMATICSWRITTEN,
            icon: DashboardIcons.ESTIMATICSCLOCKS,
            icon: DashboardIcons.ESTIMATICSCARS,
            icon: DashboardIcons.ESTIMATICSCARS, */}

            {/* description: 'Total Number of Estimates Written'
            description: 'Average Estimating Cycle Time'
            description: 'Total Number of Mitchell Estimates'
            description: 'Total Number of CCC Estimates' */}

            <div className='grid grid-cols-4 gap-2'>
           
                <Card props="col-span-2">
                    <React.Fragment>
                    <img src={DashboardIcons.ESTIMATICSWRITTEN} alt='icon' className='bg-gray-100 p-3 rounded-full' />
                    <div className='flex flex-row mt-8'>
                        <Bold>
                            <span className='text-3xl'>
                                { webData?.total_number_of_estimates_written }
                            </span>
                       </Bold>
                    </div>

                    <div className='w-9/12 mt-2'>
                        <Regular>
                            <span className='text-lg text-regularText'>
                                Total Number of Estimates Written
                            </span>
                        </Regular>
                    </div>
                    </React.Fragment>
                </Card>   

                <Card props="col-span-2">
                     <React.Fragment>
                    <img src={DashboardIcons.ESTIMATICSWRITTEN} alt='icon' className='bg-gray-100 p-3 rounded-full' />
                    <div className='flex flex-row mt-8'>
                        <Bold>
                            <span className='text-3xl'>
                                { webData?.total_number_of_ccc_estimates }
                            </span>
                       </Bold>
                    </div>

                    <div className='w-9/12 mt-2'>
                        <Regular>
                            <span className='text-lg text-regularText'>
                                Total Number of CCC Estimates
                            </span>
                        </Regular>
                    </div>
                    </React.Fragment>
                </Card>

                <Card props="col-span-2">
                    <React.Fragment>
                    <img src={DashboardIcons.ESTIMATICSWRITTEN} alt='icon' className='bg-gray-100 p-3 rounded-full' />
                    <div className='flex flex-row mt-8'>
                        <Bold>
                            <span className='text-3xl'>
                                { webData?.total_number_of_mitchel_estimates }
                            </span>
                       </Bold>
                    </div>

                    <div className='w-9/12 mt-2'>
                        <Regular>
                            <span className='text-lg text-regularText'>
                                Total Number of Mitchell Estimates
                            </span>
                        </Regular>
                    </div>
                    </React.Fragment>
                </Card>

                <Card props="col-span-2">
                  <React.Fragment>
                    <img src={DashboardIcons.ESTIMATICSWRITTEN} alt='icon' className='bg-gray-100 p-3 rounded-full' />
                    <div className='flex flex-row mt-8'>
                        <Bold>
                            <span className='text-3xl'>
                                { webData?.average_estimating_cycle_time }
                            </span>
                       </Bold>
                    </div>

                    <div className='w-9/12 mt-2'>
                        <Regular>
                            <span className='text-lg text-regularText'>
                                Average Estimating Cycle Time
                            </span>
                        </Regular>
                    </div>
                    </React.Fragment>
                </Card>
            
            </div>

                <Card props={'w-full'}>

                    <div className='w-full flex justify-between items-center mb-2'>

                        <Bold>Active Storm Locations</Bold>

                        <div className='border border-gray-300 rounded-xl py-3 px-3 flex items-center'>
                            <img src={DashboardIcons.MORE} alt='icon' />
                        </div>

                    </div>

                    <TableContainer component={Paper}  sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        <Table sx={{ minWidth: 250 }}>

                            <TableBody>

                                
                            {webData?.active_storm_locations?.map((row) => (

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>


                                            <div className='flex flex-col items-start'>
                                                <Regular><span className='text-sm text-regularText'>Date</span></Regular>
                                                <Bold><span className='text-sm'>{ formatDate( row?.date ) }</span></Bold>
                                            </div>

                                        </div>

                                    </TableCell>

                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='flex flex-col items-start mt-6'>
                                                <Regular><span className='text-sm text-regularText'>Shop</span></Regular>
                                                <Bold><span className='text-sm'></span></Bold>
                                            </div>

                                            <div className='flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Address</span></Regular>
                                                <Bold><span className='text-sm'></span></Bold>
                                            </div>

                                        </div>

                                    </TableCell>

                                    <TableCell>
                                        <div className='flex flex-col items-start justify-center'>

                                            <div className='w-full flex flex-col items-start mt-6'>
                                                <Regular><span className='text-sm text-regularText'>Total Daily Assignments</span></Regular>

                                                <div className='w-full flex flex-row justify-end'>
                                                    <Bold><span className='text-sm'>234</span></Bold>
                                                </div>

                                            </div>

                                            <div className='w-full flex flex-col items-start mt-3'>
                                                <Regular><span className='text-sm text-regularText'>Total Daily Completed</span></Regular>
                                                <div className='w-full flex flex-row justify-end'>
                                                    <Bold><span className='text-sm'>78</span></Bold>
                                                </div>

                                            </div>

                                        </div>

                                    </TableCell>

                                </TableRow>

                                ))}

                            </TableBody>

                        </Table>
                    </TableContainer>

                </Card>

            </div>

        </React.Fragment>
    )
}

// export default DashboardEstimatics
