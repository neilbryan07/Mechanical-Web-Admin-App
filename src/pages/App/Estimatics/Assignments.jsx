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

import { EstimaticsNewRows as newRows  } from '../../../contants/StaticData'

import { APIServices } from '../../../hooks/fetchAPI'

const Assignments = () => {


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

      <PageHeader name={"Estimatics - Assignments"} description={"Here are the list of uploaded estimates"}/>

      <Assign_Modal title="Assign Users" toogle={ modalShop } setToggle={ setModalShop }/>

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Estimatics</span></Regular>
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

            <Header><span className='text-mainText'>Item List (34)</span></Header>

            <div className='flex flex-row ml-4 items-center'>

                <span className='text-sm'>Legends:</span>

                <div className='flex flex-row items-center ml-7 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#E0BC31' }}></div>
                  <span className='text-sm'>Photo Uploaded</span>
                </div>

                <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#0098F9' }}></div>
                  <span className='text-sm'>Scope Uploaded</span>
                </div>

                <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#66BE7A' }}></div>
                  <span className='text-sm'>DTP included</span>
                </div>

            </div>

          </div>

          <div className='flex flex-row items-center justify-center gap-3'>

            <div onClick={ () => setModalShop(true) } className='bg-secondaryText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-sky-600 hover:transition duration-300'>
              <span className='text-white text-bold text-xl'><AiOutlineUsergroupAdd/></span>
              <Regular><span className='text-white ml-3'>Assign</span></Regular>
            </div>

            <div className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
              <span className='text-white text-bold text-xl'><HiPlus/></span>
              <Regular><span className='text-white ml-3'>Add New Assignments</span></Regular>
            </div>

          </div>



        </div>

        <br/>

        <TableContainer component={Paper}>
        <Table>
          {/* <TableHead>

              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.reference}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Bold>{column.label}</Bold>
                  </TableCell>
                ))}
              </TableRow>

          </TableHead> */}
          <TableBody>
            {newRows.map((row) => (
              <TableRow
                hover
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // to={pageRoutes.ESTIMATICS_JOBS_OVER_VIEW}
                // component={Link}
              >

                <TableCell>
                  
                  <div className='flex flex-col'>
                      <div className='flex flex-row gap-2 items-center'>

                        {row.vehicle.photo ? 
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#E0BC31' }}></div> :
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#CCCCCC' }}></div>
                        }

                        {row.vehicle.scope ? 
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#0098F9' }}></div> :
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#CCCCCC' }}></div>
                        }
                        
                        {row.vehicle.dtp ? 
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#66BE7A' }}></div> :
                          <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#CCCCCC' }}></div>
                        }
                                              
                      </div>
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
                        <Regular><span className='text-tableTextColor'>{row.customer.model}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.customer.number}</span></Regular>

                      </a>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Repair Scheduled</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.date.due}</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Estimated Completion</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.date.completion}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Estimate</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <div className='flex flex-row w-full items-center'>
                          <Regular><span className='text-tableTextColor'>{row.estimate.estimate}</span></Regular>
                          {row.estimate.estimate_status === 'Approved' ? <TextDisplay><span className='text-green-500 font-semibold text-sm ml-2'>{ row.estimate.estimate_status }</span> </TextDisplay> : null }
                        </div>
    
                        <Regular><span className='text-xs text-regularGrey'>Repair Status</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.estimate.status}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Modified</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.modified.time}</span></Regular>
    
                        {/* <Regular><span className='text-xs text-regularGrey'>Received</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.modified.completion}</span></Regular> */}

                        <br/>
                        <br/>

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

export default Assignments
