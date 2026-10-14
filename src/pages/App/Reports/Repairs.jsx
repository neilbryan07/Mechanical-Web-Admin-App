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

const rows = [
  { reference : 123456789, name : 'Jake Ballard', region : 'Nevada' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Fritz Grant', region : 'New York' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Olivia Pope', region : 'Utah' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Huck Munoz', region : 'Washington' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Quinn Perkinss', region : 'Missouri' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Eli Rowan', region : 'Louisiana' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Gerry Martinez', region : 'Nevada' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Annalisse Keating', region : 'Arkansas' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Mike Posner', region : 'Arizona' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
  { reference : 123456789, name : 'Cher Lloyd', region : 'Texas' , checkIn : 'April 4 , 2023 - 3:30 PM' , dateCompleted : 'April 4, 2023', repairTime : '4 Hours' },
];

const columns = [
  { id: 'reference', label: 'Ref Number', minWidth: 150 },
  { id: 'name', label: 'Customer Name', minWidth: 150 },
  { id: 'region', label: 'Location', minWidth: 150 },
  { id: 'checkIn', label: 'Check-In Date and Time', minWidth: 250 },
  { id: 'dateCompleted', label: 'Date Completed', minWidth: 250 },
  { id: 'repairTime', label: 'Total Repair Time', minWidth: 250 },
];

const Repairs = () => {
  return (
    <SubContainer>

      <PageHeader name={"Reports"} description={"Here are the list of reports"}/>

      <div   className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Reports / Repairs Completed</span></Regular>
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

          <Header><a href={pageRoutes.REPORTS} className='text-mainText flex flex-row cursor-pointer'><BsChevronLeft/> Repairs Completed (235)</a></Header>

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
                    <Bold>{column.label}</Bold>
                  </TableCell>
                ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.reference}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.name}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.region}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.checkIn}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.dateCompleted}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                <Regular>
                    <span className='text-regularText'>{row.repairTime}</span>
                </Regular>
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

export default Repairs
