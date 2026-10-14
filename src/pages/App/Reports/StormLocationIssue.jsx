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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa";

import { DashboardIcons, pageRoutes } from '../../../contants'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const columns = [
  { id: 'id', label: 'Employee ID', minWidth: 150 },
  { id: 'name', label: 'Employee Name', minWidth: 150 },
  { id: 'shop', label: 'Assigned Repair Shop / Region', minWidth: 150 },
  { id: 'shop', label: 'Assigned Repair Shop / Region', minWidth: 150 },
];

const InsurancePartner = () => {

  const [age, setAge] = React.useState('');

  return (
    <SubContainer>

      <PageHeader name={"Reports"} description={"Here are the list of all reports in the system"}/>

      <div   className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Reports / Storm Location Issue Report</span></Regular>
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
        <div className='w-full flex items-center'>

          <div className='w-full flex flex-row'>

            <Header><a href={pageRoutes.REPORTS} className='text-mainText flex flex-row cursor-pointer'><BsChevronLeft/> Storm Location Issue Report (123)</a></Header>

          </div>

          <div className='w-full flex flex-row gap-5 max-[883px]:order-first max-[883px]:self-end'>
                
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select Filter"
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>

                <div className='w-full'>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Select Date" />
                  </LocalizationProvider>
                  
                </div>

                <div className='w-full bg-mainText gap-2 rounded-md flex flex-row items-center justify-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
                    <span className='text-white text-bold text-xl'><IoMdStats/></span>
                    <Regular><span className='text-white'>Run Report</span></Regular>
                </div>

                <div className='w-full bg-secondaryText gap-2 rounded-md flex flex-row items-center justify-center hover:bg-sky-600 hover:transition duration-300 cursor-pointer'>
                    <span className='text-white text-bold text-xl'><FaCloudDownloadAlt/></span>
                    <Regular><span className='text-white'>Export Report</span></Regular>
                </div>

            </div>

        </div>

        <TableContainer component={Paper}>
          <Table>
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

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    
                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>
                      <Regular><span className='text-tableTextColor'>2020 Tesla</span></Regular>
                      <Regular><span className='text-tableTextColor'>Model-X Black</span></Regular>
                      <Regular><span className='text-tableTextColor'>4Y1SL65848Z411439</span></Regular>
                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Name</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>OLIVIA POPE</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>+1-202-555-0135</span></Regular>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>American Family Insurance</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>23-3256981-05</span></Regular>

                    </div>

                  </div>

                </TableCell>
                
                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Issue Reported</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tertiaryText'>Missing Photo</span></Regular>
                      <Regular><span className='text-xs text-regularGrey mb-2'>Issue Status</span></Regular>
                      <Bold>
                        <span className='text-[#0098F9] border-[#0098F9] border rounded-lg py-1 px-2'>New</span>
                      </Bold>

                    </div>

                  </div>

                </TableCell>

              </TableRow>

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    
                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>
                      <Regular><span className='text-tableTextColor'>2020 Tesla</span></Regular>
                      <Regular><span className='text-tableTextColor'>Model-X Black</span></Regular>
                      <Regular><span className='text-tableTextColor'>4Y1SL65848Z411439</span></Regular>
                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Name</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>OLIVIA POPE</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>+1-202-555-0135</span></Regular>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>American Family Insurance</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>23-3256981-05</span></Regular>

                    </div>

                  </div>

                </TableCell>
                
                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Issue Reported</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tertiaryText'>DTP Not Attached</span></Regular>
                      <Regular><span className='text-xs text-regularGrey mb-2'>Issue Status</span></Regular>
                      <Bold>
                        <span className='text-[#66BE7A] border-[#66BE7A] border rounded-lg py-1 px-2'>Issue Completed</span>
                      </Bold>

                    </div>

                  </div>

                </TableCell>

              </TableRow>

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    
                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>
                      <Regular><span className='text-tableTextColor'>2020 Tesla</span></Regular>
                      <Regular><span className='text-tableTextColor'>Model-X Black</span></Regular>
                      <Regular><span className='text-tableTextColor'>4Y1SL65848Z411439</span></Regular>
                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Name</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>OLIVIA POPE</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>+1-202-555-0135</span></Regular>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>American Family Insurance</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>23-3256981-05</span></Regular>

                    </div>

                  </div>

                </TableCell>
                
                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Issue Reported</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tertiaryText'>DTP Not Attached</span></Regular>
                      <Regular><span className='text-xs text-regularGrey mb-2'>Issue Status</span></Regular>
                      <Bold>
                        <span className='text-[#EA580C] border-[#EA580C] border rounded-lg py-1 px-2'>In-progress Issue</span>
                      </Bold>

                    </div>

                  </div>

                </TableCell>

              </TableRow>

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    
                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>
                      <Regular><span className='text-tableTextColor'>2020 Tesla</span></Regular>
                      <Regular><span className='text-tableTextColor'>Model-X Black</span></Regular>
                      <Regular><span className='text-tableTextColor'>4Y1SL65848Z411439</span></Regular>
                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Name</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>OLIVIA POPE</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>+1-202-555-0135</span></Regular>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>American Family Insurance</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>23-3256981-05</span></Regular>

                    </div>

                  </div>

                </TableCell>
                
                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Issue Reported</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tertiaryText'>DTP Not Attached</span></Regular>
                      <Regular><span className='text-xs text-regularGrey mb-2'>Issue Status</span></Regular>
                      <Bold>
                        <span className='text-[#66BE7A] border-[#66BE7A] border rounded-lg py-1 px-2'>Issue Completed</span>
                      </Bold>

                    </div>

                  </div>

                </TableCell>

              </TableRow>

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    
                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>
                      <Regular><span className='text-tableTextColor'>2020 Tesla</span></Regular>
                      <Regular><span className='text-tableTextColor'>Model-X Black</span></Regular>
                      <Regular><span className='text-tableTextColor'>4Y1SL65848Z411439</span></Regular>
                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Name</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>OLIVIA POPE</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>+1-202-555-0135</span></Regular>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tableTextColor'>American Family Insurance</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-tableTextColor'>23-3256981-05</span></Regular>

                    </div>

                  </div>

                </TableCell>
                
                <TableCell>

                  <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Issue Reported</span></Regular>

                    <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                      <Regular><span className='text-tertiaryText'>DTP Not Attached</span></Regular>
                      <Regular><span className='text-xs text-regularGrey mb-2'>Issue Status</span></Regular>
                      <Bold>
                        <span className='text-[#EA580C] border-[#EA580C] border rounded-lg py-1 px-2'>In-progress Issue</span>
                      </Bold>

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

export default InsurancePartner
