import React, { useState} from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"
import { IoMdCloudUpload } from "react-icons/io";

import { HiPlus } from "react-icons/hi";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

import { DashboardIcons, pageRoutes , EstimaticsImg } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { CustomerAssignmentNewRows as newRows  } from '../../../contants/StaticData'

import ModalDefault from '../../../component/Modal/ModalDefault';

const rows = [
  { id : 1 , reference : 12345678, name : 'Jake Ballard', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Scheduled for estimate' },
  { id : 2 , reference : 12345678, name : 'Fitzgerald Grant', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Walk-In' },
  { id : 3 , reference : 12345678, name : 'Olivia Pope', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'No Show' },
  { id : 4 , reference : 12345678, name : 'Huck Munoz', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Checked-In' },
  { id : 5 , reference : 12345678, name : 'Quin Perkins', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'No Claim Number' },
  { id : 6 , reference : 12345678, name : 'Mellie Grant', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Checked-In' },
  { id : 7 , reference : 12345678, name : 'Abby Whelan', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'No Show' },
  { id : 8 , reference : 12345678, name : 'David Rosen', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'No Claim Number' },
  { id : 9 , reference : 12345678, name : 'Susan Ross', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Checked-In' },
  { id : 10 , reference : 12345678, name : 'Bonnie WinterBottom', location : 'New york', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Checked-In' },
];

const columns = [
  { id: 'reference', label: 'Reference #', minWidth: 200 },
  { id: 'name', label: 'Customer Name', minWidth: 200 },
  { id: 'insurance', label: 'Check-In Date and Time', minWidth: 250 },
  { id: 'location', label: 'Location', minWidth: 200 },
  // { id: 'schedule', label: 'Status', minWidth: 250 },
];

const columnsModal = [
  { id: 'date', label: 'Date and Time', minWidth: 200 },
  { id: 'number', label: 'Claim Number', minWidth: 250 },
  { id: 'name', label: 'Customer Name', minWidth: 250 },
  { id: 'vehicle', label: 'Vehicle Details', minWidth: 250 },
  { id: 'vin', label: 'Vin', minWidth: 250 },
];

const previewRows = [
  { date : 'April 27,2023 8:00 AM', number : '23-5834053', name : 'Brian Lopez', vehicle : '2015 FORD F150', vin : '4O8PG5SBG0957238' },
  { date : 'April 27,2023 8:00 AM', number : '23-5834053', name : 'Huck Munoz', vehicle : '2010 TOYOTA VIOS', vin : '5J3PG5SBG9647829' },
  { date : 'April 27,2023 8:00 AM', number : '23-5834053', name : 'Fitzgerald Grant', vehicle : '2018 VOLKSWAGEN PASSAT', vin : '1G1PG5SBG7218329' },
  { date : 'April 27,2023 11:00 AM', number : '23-7334051', name : 'Oscar Adams', vehicle : '2022 CHEVROLET MALIBU', vin : '3K5PG5SBG7345678' },
  { date : 'April 27,2023 11:00 AM', number : '23-7334051', name : 'Olivia Pope', vehicle : '2021 TOYOTA FORTUNER', vin : '6Y5PG5SBG6473290' },
];

const CompletedJobs = () => {

  const [ importModal , setImportModal ] = useState(false);

  return (
    <SubContainer>

    <PageHeader name={"Customers - Completed Jobs"} description={"Here are the list of customer that are for assignment"}/>

    <div className='w-full flex flex-row items-center justify-between mb-3 max-[550px]:flex-col max-[550px]:gap-3'>

    <div className='w-full flex flex-row items-center gap-1 mt-2'>
      <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
      <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
      <Regular><span className='text-secondaryText text-sm'>/ Customer / Assignments</span></Regular>
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
      <div className='w-full flex justify-between items-center max-[878px]:flex-col max-[878px]:items-start max-[878px]:gap-3'>

      {/* <div className='flex flex-row'>

        <Header><span className='text-mainText'>Item List (34)</span></Header>

      </div> */}

      <div className='flex flex-row  max-[650px]:flex-col max-[650px]:gap-3 '>

        <Header><span className='text-mainText'>Item List (34)</span></Header>

        <div className='max-[650px]:ml-0 flex flex-row ml-4 items-center'>

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

      <div className='flex flex-row gap-5 max-[878px]:order-first max-[878px]:self-end'>
        
        {/* <div className='bg-secondaryText hover:bg-cyan-600 hover:transition duration-300 py-2 px-4 rounded-md flex flex-row items-center cursor-pointer' onClick={ () => setImportModal(true) }>
          <span className='text-white text-bold text-xl'><IoMdCloudUpload/></span>
          <Regular><span className='text-white ml-3'>Import Customers</span></Regular>
        </div> */}

        <div className='bg-mainText py-2 px-4 rounded-md flex flex-row items-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
          <span className='text-white text-bold text-xl'><HiPlus/></span>
          <Regular><span className='text-white ml-3'>Add New Assignment</span></Regular>
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
            {newRows.map((row) => (
              <TableRow
                hover
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.customer.name}</span></Regular>

                        <Regular><span className='text-xs text-regularGrey'>Insurance Company / Claim Number</span></Regular>

                        <Regular><span className='text-tableTextColor'>{row.customer.model}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.customer.number}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row.date.due}</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Received</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.date.completion}</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Status</span></Regular>
                        <span className='mb-2'/>

                      { row.status.vehicle === 'Active' ?
                        <Bold>
                          <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{row.status.vehicle}</span>
                        </Bold>
                      : null }

                      { row.status.vehicle === 'Inactive' ?
                        <Bold>
                          <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status.vehicle}</span>
                        </Bold>
                      : null }

                      <span className='mb-2'/>

                      <Regular><span className='text-xs text-regularGrey'>Estimate Scheduled</span></Regular>
                      <Regular><span className='text-tableTextColor'>{row.status.estimate_sched}</span></Regular>


                      {/* <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <div className='flex flex-row w-full items-center'>
                          <Regular><span className='text-tableTextColor'>{row.estimate.estimate}</span></Regular>
                          {row.estimate.estimate_status === 'Approved' ? <TextDisplay><span className='text-green-500 font-semibold text-sm ml-2'>{ row.estimate.estimate_status }</span> </TextDisplay> : null }
                        </div>
    
                        <Regular><span className='text-xs text-regularGrey'>Repair Status</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row.estimate.status}</span></Regular>

                      </div> */}
                     
                  </div>

                </TableCell>



              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TableContainer component={Paper}>
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
              key={row.id}
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
                  <span className='text-regularText'>{row.schedule}</span>
                </Regular>
              </TableCell>

              <TableCell>
                <Regular>
                  <span className='text-regularText'>{row.location}</span>
                </Regular>
              </TableCell>

              <TableCell>
                
                {row.status === 'Checked-In' ?
                  <Bold>
                    <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Scheduled for estimate' ?
                  <Bold>
                    <span className='text-secondaryText border-secondaryText border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'Walk-In' ?
                  <Bold>
                    <span className='text-reguarYellow border-reguarYellow border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'No Show' ?
                  <Bold>
                    <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }

                {row.status === 'No Claim Number' ?
                  <Bold>
                    <span className='text-regularIndigo border-regularIndigo border rounded-lg py-1 px-2'>{row.status}</span>
                  </Bold>
                : null }


              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}

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

export default CompletedJobs
