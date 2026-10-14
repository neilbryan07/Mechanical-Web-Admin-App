import React, { useState } from 'react'

import ModalDefault from './ModalDefault'
import Regular from '../Typography/Regular';
import Header from '../Typography/Header';
import Bold from '../Typography/Bold';

import { IoIosCloseCircle } from "react-icons/io";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DashboardIcons } from '../../contants';


const Upload_Modal = ({ title ,uploadToggle , setUploadToggle }) => {

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

  return (
    <ModalDefault 
    title={title}
    toggle={uploadToggle}
    setToggle={setUploadToggle}
    // size={"w-3/6"}
  >
    <div className='px-4'>

      <div className='border-dashed border-2 flex justify-center items-center mt-3 mb-5 rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition duration-300'>

        <div className='py-9 flex justify-center items-center flex-col gap-3'>
          <img src={ DashboardIcons.DRAGDROP } alt='icon' width={70} height={70}/>

          <Regular props={"text-md"}>
            Drag & Drop your files here or choose file
          </Regular>

          <Regular props={"text-sm text-gray-400"}>
            CSV Only
          </Regular>

        </div>

      </div>

      <div className='flex flex-col'>
        <Header>Uploaded Files</Header>

        <div className='w-full flex flex-row justify-between items-center py-4 px-3 shadow-lg'>

          <div className='flex flex-row gap-2'>
            <img src={ DashboardIcons.CSVICON } alt='icon' width={40} height={40}/>
            
            <div className='flex flex-col'>

              <Regular props={"text-xs text-sky-500"}>FitzgeraldGrant_Estimate.csv</Regular>

              <Regular props={"text-xs text-black"}>53 kb</Regular>

              <Regular props={"text-xs text-black"}>April 26, 2023 3:19 PM</Regular>

            </div>
          
          </div>

          <span className='text-red-600 cursor-pointer' style={{ fontSize:19}}><IoIosCloseCircle/></span>

        </div>

      </div>

      <div className='flex flex-col mt-6'>

        <Header>Preview</Header>
        <span className='my-2'/>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                  {columnsModal.map((column) => (
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
              {previewRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.date}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.number}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.name}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.vehicle}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.vin}</span>
                    </Regular>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>

      <div className='w-full flex justify-end my-4'>
        <div className='flex flex-row items-center gap-10'>
          
          <span className='text-gray-600 cursor-pointer' onClick={ () => setUploadToggle(false) }>
            <Bold>Cancel</Bold>
          </span>

          <div className='flex items-center justify-center py-2 px-14 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
            <Bold>Upload</Bold>
          </div>

        </div>
      </div>

    </div>
    </ModalDefault>
  )
}

export default Upload_Modal
