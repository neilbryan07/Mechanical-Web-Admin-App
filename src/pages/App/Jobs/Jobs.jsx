import React from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

const Jobs = () => {
  return (
    <SubContainer>
      <PageHeader name={"Jobs"} description={"Here are the list of jobs for you"}/>

      <div className='w-full flex flex-row items-center justify-end gap-3 mb-3'>
        {/* Search */}
        <div className='w-2/12 relative'>
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

    </SubContainer>
  )
}

export default Jobs
