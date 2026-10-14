import React from 'react'

import Regular from '../../../../component/Typography/Regular';
import Bold from '../../../../component/Typography/Bold';

import { DashboardIcons } from '../../../../contants';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AppointmentNewTable = () => {
  return (
    <React.Fragment>

        
<TableContainer component={Paper}>
        <Table>

          <TableBody>
       
              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  
                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>2020 Tesla</span></Regular>
                        <Regular><span className='text-black font-semibold'>Model- X Black</span></Regular>
                        <Regular><span className='text-black font-semibold'>4Y1SL65848Z411439</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Insured Name</span></Regular>
                      <Regular><span className='text-black font-semibold'>OLIVIA POPE</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>+1-720-6601188</span></Regular>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Insurance Company</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>American Family Insurance</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                        <Regular><span className='text-black font-semibold'>23-3256981-05</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>
                      <Regular><span className='text-black font-semibold'>August 13, 2:30 PM</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>July 12, 2:30 PM</span></Regular>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                  
                  <Regular><span className='text-xs text-regularGrey'>Status</span></Regular> 
                  <span className='mb-2'/>

                  <Bold>
                      <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>Approved</span>
                  </Bold>
                  <span className='mb-2'/>

                    <Regular><span className='text-xs text-regularGrey'>Estimate Total</span></Regular> 

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-tableTextColor invisible'>-</span></Regular>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-black font-semibold'>$ 123,000.00</span></Regular>
                    
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
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>2020 Tesla</span></Regular>
                        <Regular><span className='text-black font-semibold'>Model- X Black</span></Regular>
                        <Regular><span className='text-black font-semibold'>4Y1SL65848Z411439</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Insured Name</span></Regular>
                      <Regular><span className='text-black font-semibold'>OLIVIA POPE</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>+1-720-6601188</span></Regular>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Insurance Company</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>American Family Insurance</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                        <Regular><span className='text-black font-semibold'>23-3256981-05</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>
                      <Regular><span className='text-black font-semibold'>August 13, 2:30 PM</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>July 12, 2:30 PM</span></Regular>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                  
                  <Regular><span className='text-xs text-regularGrey'>Status</span></Regular> 
                  <span className='mb-2'/>

           
                    <Bold>
                      <span className='text-secondaryText border-secondaryText border rounded-lg py-1 px-2'>Waiting on Approval</span>
                    </Bold>

                    <span className='mb-2'/>
                
                    <Regular><span className='text-xs text-regularGrey'>Estimate Total</span></Regular> 

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-tableTextColor invisible'>-</span></Regular>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-black font-semibold'>$ 123,000.00</span></Regular>
                    
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
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>2020 Tesla</span></Regular>
                        <Regular><span className='text-black font-semibold'>Model- X Black</span></Regular>
                        <Regular><span className='text-black font-semibold'>4Y1SL65848Z411439</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Insured Name</span></Regular>
                      <Regular><span className='text-black font-semibold'>OLIVIA POPE</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>+1-720-6601188</span></Regular>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Insurance Company</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>American Family Insurance</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                        <Regular><span className='text-black font-semibold'>23-3256981-05</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>
                      <Regular><span className='text-black font-semibold'>August 13, 2:30 PM</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>July 12, 2:30 PM</span></Regular>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                  
                  <Regular><span className='text-xs text-regularGrey'>Status</span></Regular> 
                  <span className='mb-2'/>

                    <Bold>
                      <span className='text-regularIndigo border-regularIndigo border rounded-lg py-1 px-2'>Checked In</span>
                    </Bold>
                    <span className='mb-2'/>
                
                    <Regular><span className='text-xs text-regularGrey'>Estimate Total</span></Regular> 

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-tableTextColor invisible'>-</span></Regular>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-black font-semibold'>$ 123,000.00</span></Regular>
                    
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
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>2020 Tesla</span></Regular>
                        <Regular><span className='text-black font-semibold'>Model- X Black</span></Regular>
                        <Regular><span className='text-black font-semibold'>4Y1SL65848Z411439</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Insured Name</span></Regular>
                      <Regular><span className='text-black font-semibold'>OLIVIA POPE</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>+1-720-6601188</span></Regular>
                     
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Insurance Company</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-black font-semibold'>American Family Insurance</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                        <Regular><span className='text-black font-semibold'>23-3256981-05</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>
                      <Regular><span className='text-black font-semibold'>August 13, 2:30 PM</span></Regular>

                      <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>July 12, 2:30 PM</span></Regular>
                     
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                  
                  <Regular><span className='text-xs text-regularGrey'>Status</span></Regular> 
                  <span className='mb-2'/>

                    <Bold>
                      <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>Needs Scope</span>
                    </Bold>
                    <span className='mb-2'/>
                
                    <Regular><span className='text-xs text-regularGrey'>Estimate Total</span></Regular> 

                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-tableTextColor invisible'>-</span></Regular>

                      <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                      <Regular><span className='text-black font-semibold'>$ 123,000.00</span></Regular>
                    
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


    </React.Fragment>
  )
}


export default AppointmentNewTable;