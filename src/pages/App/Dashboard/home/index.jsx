import React, { useEffect } from 'react'

import Bold from "../../../../component/Typography/Bold";
import Regular from '../../../../component/Typography/Regular';
import TextDisplay from "../../../../component/Typography/TextDisplay";

import Card from '../../../../component/Card/Card'
import { DashboardIcons } from '../../../../contants'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiFillFlag } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getScopeDashboard } from '../../../../redux/dashboard/dashboardThunk';


const statusWorkLoads = [
    { name: 'Approved', color: '#00A3B2' },
    { name: 'Waiting on Approval', color: '#66BE7A' },
    { name: 'Needs Supplement', color: '#33A885' },
    { name: 'Needs Scoped', color: '#027881' },
    { name: 'Checked In', color: '#2F4858' },
]

const statusDayCharts = [
    { icon: DashboardIcons.BARCHARTONE, weekday: 'Monday' },
    { icon: DashboardIcons.BARCHARTTWO, weekday: 'Tuesday' },
    { icon: DashboardIcons.BARCHARTONE, weekday: 'Wednesday' },
    { icon: DashboardIcons.BARCHARTTWO, weekday: 'Thursday' },
    { icon: DashboardIcons.BARCHARTONE, weekday: 'Friday' },
    { icon: DashboardIcons.BARCHARTTWO, weekday: 'Saturday' },
    { icon: DashboardIcons.BARCHARTONE, weekday: 'Sunday' },
]

const weekIncome = [
    { color: '#005016', week: '1st Week', income: '$145,845' },
    { color: '#107335', week: '2nd Week', income: '$460,151' },
    { color: '#3F9857', week: '3rd Week', income: '$98,965' },
    { color: '#66BE7A', week: '4th Week', income: '$125,500' },
]

const calendar = [
    { dayName: 'Sat', dayTime: '1' },
    { dayName: 'Sun', dayTime: '2' },
    { dayName: 'Mon', dayTime: '3' },
    { dayName: 'Tue', dayTime: '4' },
    { dayName: 'Wed', dayTime: '5' },
    { dayName: 'Thu', dayTime: '6' },
    { dayName: 'Fri', dayTime: '7' },
    { dayName: 'Sat', dayTime: '8' },
    { dayName: 'Sun', dayTime: '9' },
    { dayName: 'Mon', dayTime: '10' },
    { dayName: 'Tue', dayTime: '11' },
    { dayName: 'Wed', dayTime: '12' },
    { dayName: 'Wed', dayTime: '13' },
    { dayName: 'Wed', dayTime: '14' },
    { dayName: 'Wed', dayTime: '15' },
    { dayName: 'Wed', dayTime: '16' },
    { dayName: 'Wed', dayTime: '17' },
    { dayName: 'Wed', dayTime: '18' },
    { dayName: 'Wed', dayTime: '19' },
    { dayName: 'Wed', dayTime: '20' },
    { dayName: 'Wed', dayTime: '21' },
    { dayName: 'Wed', dayTime: '22' },
    { dayName: 'Wed', dayTime: '23' },
    { dayName: 'Wed', dayTime: '24' },
    { dayName: 'Wed', dayTime: '25' },
    { dayName: 'Wed', dayTime: '26' },
    { dayName: 'Wed', dayTime: '27' },
    { dayName: 'Wed', dayTime: '28' },
    { dayName: 'Wed', dayTime: '29' },
    { dayName: 'Wed', dayTime: '30' },
    { dayName: 'Wed', dayTime: '31' },
]

const schedule = [
    { priority: 'Normal Priority', color: 'text-mainText', time: '08:30 AM', detail: 'Changing tires', car: 'TOYOTA', carType: 'Vios - 2022' },
    { priority: 'High Priority', color: 'text-tertiaryText', time: '11:30 AM', detail: 'Adjust Brakes', car: 'FORD', carType: 'Everest - 2019' },
    { priority: 'Low Priority', color: 'text-secondaryText', time: '03:00 PM', detail: 'Performs PDR', car: 'TESLA', carType: 'Modal X - 2023' },
    { priority: 'Low Priority', color: 'text-secondaryText', time: '03:00 PM', detail: 'Performs PDR', car: 'TOYOTA', carType: 'WIGO TRD - 2023' },
    { priority: 'High Priority', color: 'text-tertiaryText', time: '11:30 AM', detail: 'Adjust Brakes', car: 'FORD', carType: 'Everest - 2023' },
]

const DashboardHome = () => {

    const dispatch = useDispatch();
    const { scopeDashboardLoading, scopeDashboard } = useSelector(state => state.dashboard);

    const cardOneItem = [
        {
            key: "",
            icon: DashboardIcons.PROFILE,
            number: '1,568',
            description: 'Total Number of Technicians & Teams',
            chart: DashboardIcons.CHARTONE
        },
        {
            key: "",
            icon: DashboardIcons.CAR,
            number: '568',
            description: 'Total Number of Repairs',
            chart: DashboardIcons.CHARTONE
        },
        {
            key: "",
            icon: DashboardIcons.SETTING,
            number: '1,568',
            description: 'Total Number of Completed Repairs',
            chart: DashboardIcons.CHARTTWO
        },
        {
            key: "",
            icon: DashboardIcons.CAR,
            number: '20',
            description: 'Total Number of Vehicle On-site',
            chart: DashboardIcons.CHARTTWO
        },
    ]



    useEffect(() => {
        dispatch(getScopeDashboard());

        if (scopeDashboard) {
            const dataList = Object.keys(scopeDashboard).map(x => {
                return {

                }
            });
        }
    }, []);

    return (
        <React.Fragment>

            <div class="grid min-[1420px]:grid-cols-2 grid-cols gap-3">

                <div className='grid grid-cols-4 gap-2'>

                    {cardOneItem.map((item, key) => (

                        <Card props="col-span-2" key={key}>

                            <img src={item.icon} alt='icon' className='bg-gray-100 p-3 rounded-full' />

                            <div className='flex flex-row mt-3'>

                                <Bold><span className='text-4xl'>{item.number}</span></Bold>

                                <div className='ml-7 flex justify-center'>
                                    <img src={item.chart} alt='icon' />
                                </div>

                            </div>

                            <div className='w-9/12 mt-2'>
                                <Regular><span className='text-xl text-regularText'>{item.description}</span></Regular>
                            </div>

                        </Card>
                    ))
                    }

                </div>

                <Card props={'w-full'}>

                    <div className='w-full flex justify-between items-center'>

                        <Bold>Status by Workloads</Bold>

                        <div className='border border-gray-300 rounded-xl py-2 px-3 w-3/12 flex justify-between'>
                            <Regular>Weekly</Regular>
                            <img src={DashboardIcons.DROPDOWN} alt='icon' />
                        </div>

                    </div>

                    <div className='w-full flex flex-row mt-6'>

                        {statusWorkLoads.map((item, key) => (
                            <div className='flex flex-row mr-4 items-center' key={key}>
                                <div className='bg-black rounded-sm mr-3' style={{ height: 12, width: 12, backgroundColor: item.color }}></div>
                                <span className='text-sm font-medium'>{item.name}</span>
                            </div>
                        ))
                        }

                    </div>

                    <div className='w-full flex flex-row mt-8 justify-evenly'>

                        {statusDayCharts.map((item, key) => (
                            <div className='flex flex-col items-center' key={key}>
                                <img src={item.icon} alt='icon' />
                                <span className='text-sm font-medium'>{item.weekday}</span>
                            </div>
                        ))
                        }

                    </div>

                </Card>

            </div>

            <div class="gap-2 mt-2 mb-16 grid grid-rows-1 grid-cols-1 min-[1420px]:grid-cols-2">

                <Card props={'w-full'}>

                    <div className='w-full flex justify-between items-center'>

                        <Bold>Monthly Total Revenue</Bold>

                        <div className='border border-gray-300 rounded-xl py-3 px-3 flex items-center'>
                            <img src={DashboardIcons.MORE} alt='icon' />
                        </div>

                    </div>

                    <div className='flex flex-row overflow-x-auto overflow-y-hidden flex-nowrap mt-5'>

                        <div className='w-full relative top-5'>
                            <img src={DashboardIcons.PIECHART} alt='icon' style={{ width: '100%', height: '100%', maxHeight: 250, maxWidth: 250 }} />
                        </div>

                        <div className='w-full flex flex-col items-center'>

                            {weekIncome.map((item, key) => (
                                <div className='flex justify-items-start flex-col mt-5' key={key}>

                                    <div className='flex flex-row items-center'>
                                        <div className='rounded-full mr-3' style={{ height: 10, width: 10, backgroundColor: item.color }}></div>
                                        <Bold><span className='text-regularText'>{item.week}</span></Bold>
                                    </div>

                                    <div className='flex flex-row items-center mt-2'>
                                        <Bold>{item.income}</Bold>
                                        <Bold><span className='text-regularText ml-2'>Total Income</span></Bold>
                                    </div>
                                </div>
                            ))
                            }

                        </div>

                    </div>

                </Card>

                <Card props={'w-full'}>

                    <div className='w-full flex justify-between items-center'>

                        <Bold>Upcoming Schedules</Bold>

                        <div className='border border-gray-300 rounded-xl py-3 px-3 flex items-center'>
                            <img src={DashboardIcons.MORE} alt='icon' />
                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center mt-6'>

                        <Bold>April 2023</Bold>

                        <div className='ml-6 flex flex-row'>
                            <span style={{ fontWeight: 600, fontSize: 20 }}><BsChevronLeft /></span>
                            <span style={{ fontWeight: 600, fontSize: 20 }}><BsChevronRight /></span>
                        </div>

                    </div>

                    <div className={`overflow-x-auto flex flex-nowrap justify-between gap-3 mb-5 w-full calendarWidth`}>
                        {calendar.map((item, key) => (
                            <div key={key} className='flex flex-col items-center justify-center bg-gray-100 py-2 px-3 rounded mt-3'>
                                <Bold>{item.dayTime}</Bold>
                                <Regular><span className='text-xs text-regularText'>{item.dayName}</span></Regular>
                            </div>
                        ))
                        }

                    </div>

                    <div className='my-5'>
                        <Bold><span className='text-regularText'>Schedule for today</span></Bold>
                    </div>

                    <div className='w-full overflow-x-auto flex flex-nowrap gap-5'>


                        {schedule.map((item, key) => (
                            <Card key={key}>
                                <div style={{ width: 250 }}>

                                    <div className={`w-full flex flex-row ${item.color} items-center`}>
                                        <AiFillFlag />
                                        <div className='mx-2' />
                                        <TextDisplay><span className='font-bold'>{item.priority}</span></TextDisplay>
                                    </div>

                                    <div className='mt-3 w-full'>
                                        <Regular>{item.time}</Regular>
                                        <Bold>{item.detail}</Bold>
                                    </div>

                                    <div className='mt-5 w-full'>
                                        <TextDisplay>{item.car}</TextDisplay>
                                        <TextDisplay>{item.carType}</TextDisplay>
                                    </div>

                                </div>

                            </Card>
                        ))
                        }

                    </div>

                </Card>

            </div>


        </React.Fragment>
    )
}

export default DashboardHome
