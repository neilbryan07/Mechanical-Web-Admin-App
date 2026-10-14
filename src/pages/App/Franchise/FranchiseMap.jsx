import React from 'react'

import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Card from "../../../component/Card/Card"

import Regular from '../../../component/Typography/Regular'
import Bold from '../../../component/Typography/Bold'

import SubHeader from '../../../component/Typography/SubHeader'
import TextInputs from '../../../component/FormInput'

import { FaListOl } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { IoReload , IoLocationSharp } from "react-icons/io5";
import { FiMap } from "react-icons/fi";

import { DashboardIcons, pageRoutes } from '../../../contants'

import "./css/style.css";

const FranchiseMap = () => {
  return (
    <SubContainer>

        <PageHeader name={"Franchised Regions"} description={"Here are the list of shops across the nation"}/>

        <div className='w-full flex flex-row items-center justify-between mb-3'>

            <div className='w-full flex flex-row items-center gap-1 mt-2'>
                <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
                <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
                <Regular><span className='text-secondaryText text-sm'>/ Franchise Regions</span></Regular>
            </div>

            <div className='w-full flex flex-row gap-3 items-center justify-end'>

            {/* Icon */}
            <div className='flex flex-row items-center justify-between gap-2'>

                <div className='p-1.5 bg-mainText border border-gray-300 rounded-md cursor-pointer'>
                <span className='text-white' style={{ fontSize:17}}><FiMap/></span>
                </div>

                <a href={pageRoutes.FRANCHISE} className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                <span className='text-zinc-700' style={{ fontSize:17}}><FaListOl/></span>
                </a>

                <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
                </div>

                <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
                </div>

            </div>

            </div>

        </div>

        <Card>

        <div className="grid grid-rows-1 grid-flow-col place-content-evenly">

            <div className="col-span-2 max-[910px]:col-span-full">

                <React.Fragment>

                    <div className='flex flex-row gap-3 items-center'>
                        <IoLocationSharp/>
                        <span style={{ fontSize:14}}><Bold>Shop locator</Bold></span>      
                    </div>

                    <div className='mt-10 w-full'>
                        <span><SubHeader>State</SubHeader></span>        
                        <TextInputs placeholder={"Enter full name"} type={"text"}/>
                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Nebraska</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-green-100 px-2 py-2 border-green-500 border-2 rounded-lg'>
                            <span className='text-green-500'><SubHeader>Nevada</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>New Hampshire</SubHeader></span>   
                        </div>

                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>New Jersey</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>New Mexico</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>New York</SubHeader></span>   
                        </div>

                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>North Carolina</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>North Dakota</SubHeader></span>   
                        </div>

                    </div>

                </React.Fragment>

                <br/>

                <React.Fragment>

                    <div className='mt-5 w-full'>
                        <span><SubHeader>City</SubHeader></span>        
                        <TextInputs placeholder={"Enter full name"} type={"text"}/>
                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Lakeridge</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Lamoille</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-green-100 px-2 py-2 border-green-500 border-2 rounded-lg'>
                            <span className='text-green-500'><SubHeader>Las Vegas</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Laughlin</SubHeader></span>   
                        </div>

                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Lemmon Valley</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Logan Creek</SubHeader></span>   
                        </div>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Lovelock</SubHeader></span>   
                        </div>

                    </div>

                    <div className='mt-3 flex flex-row flex-wrap gap-3'>

                        <div className='flex items-center justify-center bg-gray-100 px-2 py-2 rounded-lg'>
                            <span><SubHeader>Lund</SubHeader></span>   
                        </div>

                    </div>
                    <br/>
                    
                </React.Fragment>

            </div>
            
            <div className="col-span-3 max-[910px]:col-span-full">
                <div className='w-full flex items-center justify-center'>
                    <img src={DashboardIcons.STATE_MAP} className='cursor-pointer' alt='icon' id='mapImage'/>
                </div>
            </div>

        </div>

        {/* <div className='w-full flex items-center justify-center'>
            <img src={DashboardIcons.STATE_MAP} className='cursor-pointer' alt='icon' style={{ maxWidth:1200, width: '100%' }}/>
        </div> */}

        </Card>
      
    </SubContainer>
  )
}

export default FranchiseMap
