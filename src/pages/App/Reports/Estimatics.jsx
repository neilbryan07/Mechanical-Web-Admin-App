import React from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"

import Card from "../../../component/Card/Card"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons, pageRoutes } from '../../../contants'


const columns = [
  { id: 'id', label: 'Employee ID', minWidth: 150 },
  { id: 'name', label: 'Employee Name', minWidth: 150 },
  { id: 'shop', label: 'Assigned Repair Shop / Region', minWidth: 150 },
];

const Estimatics = () => {
  return (
    <SubContainer>

      <PageHeader name={"Reports"} description={"Here are the list of reports"}/>

      <div   className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Reports / Estimatics</span></Regular>
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

          <Header><a href={pageRoutes.REPORTS} className='text-mainText flex flex-row cursor-pointer'><BsChevronLeft/> No Shows (123)</a></Header>

        </div>

        </div>

        <br/>

        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>

              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.reference}
                    style={{ minWidth: column.minWidth }}
                  >
                    {/* <Bold>{column.label}</Bold> */}
                  </TableCell>
                ))}
              </TableRow>

          </TableHead>
          <TableBody>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell>
                      <div className='flex flex-col'>

                          <div className='flex flex-col items-start'>
                              <Regular><span className='text-sm text-regularText'>Date</span></Regular>
                              <Bold><span className='text-sm'>November 23, 2023</span></Bold>
                          </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Vehicle</span></Regular>
                            <Bold><span className='text-sm'>2020 Tesla</span></Bold>
                            <Bold><span className='text-sm'>Model- X Black</span></Bold>
                            <Bold><span className='text-sm'>4Y1SL65848Z411439</span></Bold>
                        </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Name / Contact Number</span></Regular>
                            <Bold><span className='text-sm'>OLIVIA POPE</span></Bold>
                            <Bold><span className='text-sm'>+1-202-555-0135</span></Bold>
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Insurance / Claim Number</span></Regular>
                            <Bold><span className='text-sm'>American Family Insurance</span></Bold>
                            <Bold><span className='text-sm'>23-3256981-05</span></Bold>
                        </div>

                      </div>
                  </TableCell>


              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell>
                      <div className='flex flex-col'>

                          <div className='flex flex-col items-start'>
                              <Regular><span className='text-sm text-regularText'>Date</span></Regular>
                              <Bold><span className='text-sm'>November 23, 2023</span></Bold>
                          </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Vehicle</span></Regular>
                            <Bold><span className='text-sm'>2020 Tesla</span></Bold>
                            <Bold><span className='text-sm'>Model- X Black</span></Bold>
                            <Bold><span className='text-sm'>4Y1SL65848Z411439</span></Bold>
                        </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Name / Contact Number</span></Regular>
                            <Bold><span className='text-sm'>OLIVIA POPE</span></Bold>
                            <Bold><span className='text-sm'>+1-202-555-0135</span></Bold>
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Insurance / Claim Number</span></Regular>
                            <Bold><span className='text-sm'>American Family Insurance</span></Bold>
                            <Bold><span className='text-sm'>23-3256981-05</span></Bold>
                        </div>

                      </div>
                  </TableCell>


              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell>
                      <div className='flex flex-col'>

                          <div className='flex flex-col items-start'>
                              <Regular><span className='text-sm text-regularText'>Date</span></Regular>
                              <Bold><span className='text-sm'>November 23, 2023</span></Bold>
                          </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Vehicle</span></Regular>
                            <Bold><span className='text-sm'>2020 Tesla</span></Bold>
                            <Bold><span className='text-sm'>Model- X Black</span></Bold>
                            <Bold><span className='text-sm'>4Y1SL65848Z411439</span></Bold>
                        </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Name / Contact Number</span></Regular>
                            <Bold><span className='text-sm'>OLIVIA POPE</span></Bold>
                            <Bold><span className='text-sm'>+1-202-555-0135</span></Bold>
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Insurance / Claim Number</span></Regular>
                            <Bold><span className='text-sm'>American Family Insurance</span></Bold>
                            <Bold><span className='text-sm'>23-3256981-05</span></Bold>
                        </div>

                      </div>
                  </TableCell>


              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell>
                      <div className='flex flex-col'>

                          <div className='flex flex-col items-start'>
                              <Regular><span className='text-sm text-regularText'>Date</span></Regular>
                              <Bold><span className='text-sm'>November 23, 2023</span></Bold>
                          </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Vehicle</span></Regular>
                            <Bold><span className='text-sm'>2020 Tesla</span></Bold>
                            <Bold><span className='text-sm'>Model- X Black</span></Bold>
                            <Bold><span className='text-sm'>4Y1SL65848Z411439</span></Bold>
                        </div>

                      </div>
                  </TableCell>

                  <TableCell>
                      <div className='flex flex-col items-start justify-center'>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Name / Contact Number</span></Regular>
                            <Bold><span className='text-sm'>OLIVIA POPE</span></Bold>
                            <Bold><span className='text-sm'>+1-202-555-0135</span></Bold>
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <Regular><span className='text-sm text-regularText'>Insurance / Claim Number</span></Regular>
                            <Bold><span className='text-sm'>American Family Insurance</span></Bold>
                            <Bold><span className='text-sm'>23-3256981-05</span></Bold>
                        </div>

                      </div>
                  </TableCell>


              </TableRow>

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

export default Estimatics
