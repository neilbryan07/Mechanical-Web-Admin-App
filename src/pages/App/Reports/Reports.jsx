import React, { useState, useEffect } from 'react';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold";

import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons } from '../../../contants'

import Card from "../../../component/Card/Card"

import { pageRoutes } from '../../../contants';

import { APIServices } from '../../../hooks/fetchAPI';

const Reports = () => {

  const [ userDetails , setUserDetails ] = useState([]);

  useEffect(() => {

    async function getData() {
      const res = await APIServices.get({ url: '/user/profile/me' })
      if (res && !res.error && res.data && res.data.data) {
        setUserDetails( res?.data?.data )
      }
    }

    getData();
  }, []);
  
  return (
    <SubContainer>
      <PageHeader name={"Reports"} description={"Here are the list of reports"}/>

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Reports</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch/></span>
            </div>
          </div>

          {/* Icon */}
          <div className='flex flex-row items-center justify-between gap-2'>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><RiFilterFill/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
            </div>

          </div>

        </div>

      </div>

      <Card>

        <div className='grid grid-rows-1 grid-cols-1 min-[1420px]:grid-cols-3 gap-5' >

          { userDetails?.role !== 6 ? 
          <React.Fragment>
            
            <a className='w-thirty h-thirty' href={pageRoutes.CLOSING}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>Closing Rate</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    This report shows the list of customer that checked in at different repair shops/storms broken down in different statuses.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.CLOSING} alt='icon'/>
                </div>

              </Card>
            </a>

            <a className='w-thirty' href={pageRoutes.REPAIRS}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>Follow-up Conversions</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    This report shows the list of customers that are converted from follow-up to appointment calendar.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.VIDEO} alt='icon'/>
                </div>

            </Card>
            </a>

            <a className='w-thirty' href={pageRoutes.FOLLOWUP}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>No Shows</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    This report will pull a list of all "No Shows" for the day selectedIt will be broken down by active storm locations.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.NOSHOW} alt='icon'/>
                </div>

              </Card>
            </a>

            <a className='w-thirty' href={pageRoutes.AVERAGEREPAIR}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>Insurance Partner Billing Report</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    The report will list out all customers who received an estimate from storm locations during a specified date range, These storm locations could be active or inactive.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.DOLLAR} alt='icon'/>
                </div>

              </Card>
            </a>

            <a className='w-thirty' href={pageRoutes.AVERAGETICKET}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>Storm Location Report</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    This report will break down the entirety of what went on at the storm location.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.STORMLOCATIONREPORT} alt='icon'/>
                </div>

              </Card>
            </a>

            <a className='w-thirty' href={pageRoutes.ESTIMATICSREPORT}>
              <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

                <Bold>Average Estimate by Storm Location</Bold>

                <div className='h-1/5 w-full mb-11'>
                  <Regular props={"text-sm"}>
                    This report will break down the average price of all estimates written at a storm location.
                  </Regular>
                </div>

                <div className='absolute right-1 bottom-1'>
                  <img src={DashboardIcons.ESTIMATIC} alt='icon'/>
                </div>

              </Card>
            </a>

          </React.Fragment> : null }

          <a className='w-thirty' href={pageRoutes.STORMISSUEREPORT}>
          <Card props={'bg-zinc-100 h-full flex flex-col relative gap-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'}> 

            <Bold>Storm Location Issue Report</Bold>

            <div className='h-1/5 w-full mb-11'>
              <Regular props={"text-sm"}>
                Lorem ipsum
              </Regular>
            </div>

            <div className='absolute right-1 bottom-1'>
              <img src={DashboardIcons.STORMLOCATIONISSUE} alt='icon'/>
            </div>

          </Card>
          </a>

        </div>

      </Card>
      <div className='mb-16'/>
    </SubContainer>
  )
}

export default Reports
