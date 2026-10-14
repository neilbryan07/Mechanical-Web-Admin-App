import React, { useState } from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"

import Card from "../../../component/Card/Card"

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FaPlusCircle, FaMinusCircle, FaListOl } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { FiMap } from "react-icons/fi";
import { IoIosArrowUp , IoIosArrowDown } from "react-icons/io";

import { DashboardIcons, pageRoutes } from '../../../contants'

import { FranchisedDataTable as dataTable , FranchisedDataColumnsSubMain as columns , FranchisedDataColumnMain as columnMain } from "../../../contants/StaticData";

import AddFranchise from './modal/AddFranchise'

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaMinusCircle /> : <FaPlusCircle />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.owner}</TableCell>
        <TableCell>{row.number}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
    
              <Table  aria-label="purchases">
                <TableHead>

                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.reference}
                      style={{ minWidth: column.minWidth }}
                    >
                      { column.label ? 
                        <div className='flex flex-row items-center justify-between'>
                          <Bold>{column.label}</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs'><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs'><IoIosArrowDown/></span>
                          </div>

                        </div>
                      : null}
                      
                    </TableCell>
                  ))}
                </TableRow>

                </TableHead>
                <TableBody>
                  {row.region.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell/>
                      <TableCell>{item.id}</TableCell>
                      <TableCell><a href={pageRoutes.FRANCHISEREGIONS} className='cursor-pointer'>{item.region_city}</a></TableCell>
                      <TableCell>{item.total_shop}</TableCell>
                      <TableCell>{item.total_technician}</TableCell>

                      <TableCell>

                        {item.shop_status=== 'Temporary Close' ?
                            <Bold>
                              <span className='text-regularOrange border-regularOrange border rounded py-1 px-2'>{item.shop_status}</span>
                            </Bold>
                        : null }

                        {item.shop_status=== 'Active' ?
                            <Bold>
                              <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{item.shop_status}</span>
                            </Bold>
                        : null }

                        {item.shop_status=== 'Closed' ?
                            <Bold>
                              <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{item.shop_status}</span>
                            </Bold>
                        : null }

      
                      </TableCell>


                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Franchise = () => {

  const [ openFranchise , setOpenFranchise ] = useState(false);

  return (
    <SubContainer>

      <AddFranchise Franchisemodal={ openFranchise } SetFranchiseModal={ setOpenFranchise } />

      <PageHeader name={"Franchised Regions"} description={"Here are the list of shops across the nation"}/>
      
      <div className='w-full flex flex-row items-center justify-between mb-3 max-[700px]:flex-col max-[700px]:gap-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Franchise Regions</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Region Owners</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>
          

            <a href={pageRoutes.FRANCHISEMAPS} className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><FiMap/></span>
            </a>

            <div className='p-1.5 bg-mainText border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-white' style={{ fontSize:17}}><FaListOl/></span>
            </div>

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

            <Header><span className='text-mainText'>Item List (3)</span></Header>

          </div>

          <div onClick={ () => setOpenFranchise(true) } className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
            <span className='text-white text-bold text-xl'><HiPlus/></span>
            <Regular><span className='text-white ml-3'>Add Franchise Region Owner</span></Regular>
          </div>

        </div>

        <br/>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                  {columnMain.map((column) => (
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
              {dataTable.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br/>

      </Card>

      <div className='mb-16'/>
    </SubContainer>
  )
}

export default Franchise
