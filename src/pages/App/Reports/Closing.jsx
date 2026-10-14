import React, { useState} from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import ModalDefault from '../../../component/Modal/ModalDefault'

import Card from "../../../component/Card/Card"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter, AiTwotoneShop } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";

import { DashboardIcons, pageRoutes } from '../../../contants'

const rows = [
  { shop : 'Repair Shop 1', name : 'Jake Ballard', region : 'Nevada' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
  { shop : 'Repair Shop 2', name : 'Fritz Grant', region : 'New York' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 ,  nsc : 99 },
  { shop : 'Repair Shop 3', name : 'Olivia Pope', region : 'Utah' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 ,  nsc : 99 },
  { shop : 'Repair Shop 4', name : 'Huck Munoz', region : 'Washington' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 ,  nsc : 99 },
  { shop : 'Repair Shop 5', name : 'Quinn Perkinss', region : 'Missouri' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 ,  nsc : 99 },
  { shop : 'Repair Shop 6', name : 'Eli Rowan', region : 'Louisiana' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
  { shop : 'Repair Shop 7', name : 'Gerry Martinez', region : 'Nevada' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
  { shop : 'Repair Shop 8', name : 'Annalisse Keating', region : 'Arkansas' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
  { shop : 'Repair Shop 9', name : 'Mike Posner', region : 'Arizona' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
  { shop : 'Repair Shop 10', name : 'Cher Lloyd', region : 'Texas' , dtp : 12 , ns : 34 , rse : 23 , ci : 34 , wfa : 87 , nsc : 99 },
];

const columns = [
  { id: 'shop', label: 'Shop Name', minWidth: 250 },
  { id: 'name', label: 'Region Owner', minWidth: 250 },
  { id: 'region', label: 'Region', minWidth: 250 },
  { id: 'dtp', label: 'DTP', minWidth: 100 },
  { id: 'ns', label: 'NS', minWidth: 100 },
  { id: 'rse', label: 'NS', minWidth: 100 },
  { id: 'ci', label: 'CI', minWidth: 100 },
  { id: 'wfa', label: 'WFA', minWidth: 100 },
  { id: 'ns', label: 'NS', minWidth: 100 },
  { id: 'nsc', label: 'NSC', minWidth: 100 },
];

const preview = [
  { id : 123456789, name : 'Mike Doe', date : 'May 10, 2023 - 11:00 AM', status : 'Checked-in' },
  { id : 123456789, name : 'Jane Doe', date : 'May 10, 2023 - 11:00 AM', status : 'Approved' },
  { id : 123456789, name : 'Jose Doe', date : 'May 10, 2023 - 11:00 AM', status : 'Needs Supplement' },
  { id : 123456789, name : 'John Doe', date : 'May 10, 2023 - 11:00 AM', status : 'Waiting on Approval' },
  { id : 123456789, name : 'Emily Doe', date : 'May 10, 2023 - 11:00 AM', status : 'Needs Scope' },
]

const columnsPreview = [
  { id: 'id', label: 'Job ID', minWidth: 150 },
  { id: 'name', label: 'Customer Name', minWidth: 200 },
  { id: 'date', label: 'Check-in Date and Time', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 300 },
];

const Closing = () => {

  const [ modalHandle , setModalHandle ] = useState(false);

  return (
    <SubContainer>

    <ModalDefault 
        title={"Closing Rate Details"}
        toggle={modalHandle}
        setToggle={setModalHandle}
        // size={"w-3/6"}
    >
        <div className='px-4'>

          {/* Technician Info */}
          <div className='w-full border rounded-md p-2'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                    <AiTwotoneShop/>
                    <span style={{ fontSize:14}}><Bold>Repair Shop Details</Bold></span>      
              </div>

            </div>

            <div class="grid grid-cols-2 gap-y-2 mt-3 items-center">

              {/* Name */}

              <div><TextDisplay>Name</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>BOBS AUTO COLLISION REPAIR</TextDisplay>
              </div>

              <div><TextDisplay>Region Owner</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>Gerry Martinez</TextDisplay>
              </div>

              <div><TextDisplay>Region</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>Nevada</TextDisplay>
              </div>

            </div>

          </div>

          <div className='flex flex-col mt-6'>
            
            <div className='flex flex-row justify-between items-center'>

                <div className='flex flex-row gap-3 items-center'>
                    <HiUserGroup/>
                    <span style={{ fontSize:14}}><Bold>Customers</Bold></span>      
                </div>

                <span className='font-semibold' style={{ fontSize:14}}>Item List (10)</span>    

            </div>
     
            <span className='my-2'/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      {columnsPreview.map((column) => (
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
                    {preview.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                        <TableCell>
                            <Regular>
                                <span className='text-regularText'>{row.id}</span>
                            </Regular>
                        </TableCell>

                        <TableCell>
                            <Regular>
                            <span className='text-regularText'>{row.name}</span>
                            </Regular>
                        </TableCell>

                        <TableCell>
                            <Regular>
                            <span className='text-regularText'>{row.date}</span>
                            </Regular>
                        </TableCell>

                        <TableCell>
                          
                          {row.status === 'Approved' ?
                            <Bold>
                              <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                          : null }

                          {row.status === 'Waiting on Approval' ?
                            <Bold>
                              <span className='text-secondaryText border-secondaryText border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                          : null }

                          {row.status === 'Needs Supplement' ?
                            <Bold>
                              <span className='text-regularOrange border-regularOrange border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                          : null }

                          {row.status === 'Needs Scope' ?
                            <Bold>
                              <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                          : null }

                          {row.status === 'Checked-in' ?
                            <Bold>
                              <span className='text-regularIndigo border-regularIndigo border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                          : null }


                        </TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <span className='my-2'/>

            </div>

          <div className='w-full flex justify-end pb-3'>
            <div className='flex flex-row items-center gap-10'>
              
              <span className='text-gray-600 cursor-pointer' onClick={ () => setModalHandle(false) }>
                <Header>Cancel</Header>
              </span>

              <div className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                <Header>Save</Header>
              </div>

            </div>
          </div>

        </div>
    </ModalDefault>

      <PageHeader name={"Reports"} description={"Here are the list of reports"}/>

      <div   className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Reports / Closing Rate</span></Regular>
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

          <Header><a href={pageRoutes.REPORTS} className='text-mainText flex flex-row cursor-pointer'><BsChevronLeft/> Closing Rate Report</a></Header>

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
                key={row.shop}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  <Regular>
                    <span onClick={ () => setModalHandle(true) } className='text-regularText cursor-pointer'>{row.shop}</span>
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
                    <span className='text-regularText'>{row.dtp}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.ns}</span>
                  </Regular>
                </TableCell>


                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.rse}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.ci}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.wfa}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.ns}</span>
                  </Regular>
                </TableCell>

                <TableCell>
                  <Regular>
                    <span className='text-regularText'>{row.nsc}</span>
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

export default Closing
