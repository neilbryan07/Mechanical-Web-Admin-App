import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"
import Assign_Modal from './layout/Assign_Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { BsChevronRight, BsChevronLeft, } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { HiPlus } from "react-icons/hi"; 

import { DashboardIcons, pageRoutes , EstimaticsImg } from '../../../contants'

import { AuditNewRows as newRows  } from '../../../contants/StaticData'

import { APIServices } from '../../../hooks/fetchAPI'

import { TbArrowsDownUp } from "react-icons/tb";

const AuditList = () => {


  const [ estimaticData, SetEstimaticsData ] = useState([]);
  const [ modalShop, setModalShop ] = useState(false);

  useEffect(() => {

    async function getData() {
      const res = await APIServices.get({ url: '/estimatic/list/all' })
      if (res && !res.error && res.data && res.data.data) {
        SetEstimaticsData(res.data.data)
      }
    }

    getData();
  }, []);

  return (
    <SubContainer>

      <PageHeader name={"Estimatics - Audit List"} description={"Here are the list of uploaded estimates"}/>

      <Assign_Modal title="Assign Users" toogle={ modalShop } setToggle={ setModalShop }/>

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Estimatics</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Audit Lists</span></Regular>
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
        <div className='w-full flex justify-between items-center'>

          <div className='flex flex-row'>
            <Header><span className='text-mainText'>Item List (5)</span></Header>
          </div>

        </div>

        <div className='w-full flex flex-row items-center justify-evenly px-8 py-2 gap-6 bg-gray-100 rounded mt-3'>

            <div className='flex flex-row gap items-center'>
                <span className='text-sm text-black font-semibold'>#</span>
                <span className='text-md text-gray-500 font-semibold cursor-pointer'><TbArrowsDownUp/></span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold'>Auditor/Estimator</span>
                <span className='text-md text-gray-500 font-semibold cursor-pointer'><TbArrowsDownUp/></span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold'>Completed</span>
                <span className='text-md text-gray-500 font-semibold cursor-pointer'><TbArrowsDownUp/></span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold'>Ready To Audit</span>
                <span className='text-md text-gray-500 font-semibold cursor-pointer'><TbArrowsDownUp/></span>
            </div>

        </div>

        <div className='w-full flex flex-row items-center justify-evenly px-8 py-2 gap-6 mb-3'>

            <div className='flex flex-row gap items-center'>
                <span className='text-sm text-black font-semibold ml-2'>1</span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold ml-2'>Mike Doe</span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold ml-2'>2</span>
            </div>

            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                <span className='text-sm text-black font-semibold ml-2'>2</span>
            </div>

        </div>

        <TableContainer component={Paper}>
        <Table>

          <TableBody>
            {newRows.map((row) => (
              <TableRow
                hover
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  
                  <div className='flex flex-col'>
  
                      <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.vehicle.name}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.vehicle.model}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.vehicle.number}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Name / Insurance</span></Regular>

                      <a href={'#'} style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.customer.name}</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Insurance / Claim number</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.customer.model}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.customer.number}</span></Regular>

                      </a>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Shop Name</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.shop.name}</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Shop Location</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.shop.location}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Status</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <div className='flex flex-col w-full py-2'>
                            { row.modified.status === 'Ready to Audit' ?
                                <Bold>
                                    <span className='text-[#0098F9] border-[#0098F9] border rounded-lg py-1 px-2'>{row.modified.status}</span>
                                </Bold>
                            : null }

                            { row.modified.status === 'Completed' ?
                            <Bold>
                                <span className='text-[#66BE7A] border-[#66BE7A] border rounded-lg py-1 px-2'>{row.modified.status}</span>
                            </Bold>
                            : null }
                        </div>
    
                        <Regular><span className='text-xs text-regularGrey'>Date and Time</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.modified.date}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Running Percentage Total</span></Regular>

                      <div style={{ gap : 20, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor w-full flex flex-row-reverse'>{row.modified.percentage}</span></Regular>

                        <div className='bg-secondaryText py-2 px-6 rounded-md flex flex-col items-center cursor-pointer hover:bg-cyan-600 hover:transition duration-300'>
                            <Regular><span className='text-white'>Audit</span></Regular>
                        </div>

                      </div>
                     
                  </div>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='flex flex-row w-full items-center mt-4 gap-3'>

        <div className='flex flex-row items-center gap-2'>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronLeft/></span>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>1</Bold>
          </div>
          
          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>2</Bold>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <Bold>3</Bold>
          </div>

          <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
            <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronRight/></span>
          </div>

        </div>

        <div className='border border-gray-300 rounded-md py-0.5 px-3 gap-3 flex justify-between items-center cursor-pointer'>
            <Regular>10/page</Regular>
            <img src={DashboardIcons.DROPDOWN} alt='icon'/>
        </div>

      </div>

      </Card>
      <div className='mb-16'/>
    </SubContainer>
  )
}

export default AuditList
