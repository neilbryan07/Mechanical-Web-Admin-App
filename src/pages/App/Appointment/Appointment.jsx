import React, { useState, useEffect } from 'react';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"

import ItemList from './Layout/ItemList'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons , getDate } from '../../../contants'
import { debounce } from '../../../utils/debounce';

import { AppointmentTableRowsData as rows , AppointmentTableColumnsData as columns , AppointmentTableNewRows as newRows } from '../../../contants/StaticData'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import TablePagination from '@mui/material/TablePagination';

import { useDispatch, useSelector } from 'react-redux';
import { getCalendarList } from '../../../redux/calendar/calendarThunk'

import ViewRepairCalendar from './Modal/ViewRepairCalendar';



const Appointment = () => {

  const { action, calendarResponse } = useSelector((state) => state.calendar );

  const calendarResponses = useSelector((state) => state.calendar.action);
  
  const pagingResponse = action?.calendarResponse?.data;
  const pagingLoading = action?.calendarResponse;

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ repairModal , setRepairModal ] = useState(false);

  const [ selectedData , setSelectedData ] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  
        useEffect(() => {
          let typingTimer;
          const doneTypingInterval = 300; 
      
          if (searchTerm.trim() !== "") {
            typingTimer = setTimeout(() => {
              handleSearch();
            }, doneTypingInterval);
          } else {
            handleFilter();
          }
      
          return () => clearTimeout(typingTimer);
        }, [searchTerm ]);
  
        
      const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
  
      const handleSearch = ( search ) => {
  
        if (searchTerm.trim() === "") return false;
  
          const pagination = {
            page: 1,
            limit: rowsPerPage,
            order : 'desc',
            search : searchTerm,
          }
    
          debounce(
            async () =>
              await dispatch(getCalendarList(pagination)),
          2000);
    
          setPage(0);
      }
  
      const handleFilter = async () => {
        const pagination = {
          page: 1,
          limit: rowsPerPage,
          order : 'desc',
        }
      
        debounce(
          async () =>
          await dispatch(getCalendarList(pagination)),
        1000);
      
        setPage(0);
      }

  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
      order : 'desc',
    }

    debounce(
      async () =>
        await dispatch( getCalendarList(pagination) ),
    1000);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
      order : 'desc',
    }

    debounce(
      async () =>
        await dispatch( getCalendarList(pagination) ),
    1000);

    setPage(0);
  };

  // useEffect(() => {

  //   (async () => {

  //     const pagination = {
  //       page: page + 1,
  //       limit: rowsPerPage,
  //       order : 'desc',
  //       search : "Roy",
  //     }

  //     await dispatch( getCalendarList(pagination) );

  //   })();

  //   },[]);


  const handleRowData = ( data ) => {
    setSelectedData( data )
    setRepairModal(true)
  }

  const dollarFormat = ( a  = 0 , b = 0 ) => {
    let data = parseInt(a) + parseInt(b);
    return  data?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  return (
    <SubContainer>

      { repairModal &&
          <ViewRepairCalendar repairmodal={ repairModal} SetRepairModal={ setRepairModal } customerData={ selectedData } />
      }
  
      <PageHeader name={"Repair Calendar"} description={"Here are the upcoming schedules"}/>

      <div className='w-full flex flex-row items-center justify-between mb-3 max-[660px]:flex-col max-[660px]:gap-3 '>

      <div className='w-full flex flex-row items-center gap-1 mt-2'>
        <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
        <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
        <Regular><span className='text-secondaryText text-sm'>/ Appointment Calendar / List View</span></Regular>
      </div>

      <div className='w-full flex flex-row gap-3 items-center justify-end'>

        {/* Search */}
        <div className='w-4/12 relative'>
          <input onChange={ handleInputChange }  placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
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
       
        <ItemList totalItem = { pagingResponse?.data }/>

        <TableContainer component={Paper}>
        <Table>

          <TableBody>

          {
            pagingLoading?.loading ?
            <div className='w-full flex flex-col items-center justify-center my-5'>
              <CircularProgress />
            </div>
            :
            <>

            {pagingResponse?.data?.map(( row , key ) => (

              <TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowData( row ) }
              >
                
              <TableCell>

                <div className='flex flex-col'>

                    <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                    <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                      <Regular><span className='text-black font-semibold'>{ row?.workfile?.vehicle_year } { row?.workfile?.vehicle_make }</span></Regular>
                      <Regular><span className='text-black font-semibold'>Model- { row?.workfile?.vehicle_model }</span></Regular>
                      <Regular><span className='text-black font-semibold'>{ row?.workfile?.vehicle_vin }</span></Regular>

                    </div>
                  
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-col'>

                    <Regular><span className='text-xs text-regularGrey'>Insured Name</span></Regular>
                    <Regular><span className='text-black font-semibold'>{ row?.workfile?.customer?.full_name }</span></Regular>

                    <Regular><span className='text-xs text-regularGrey'>Phone Number</span></Regular>
                    <Regular><span className='text-black font-semibold'>{row?.workfile?.customer?.phone_number}</span></Regular>
                  
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-col'>
                    <Regular><span className='text-xs text-regularGrey'>Insurance Company</span></Regular>

                    <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>
                    
                      <Regular><span className='text-black font-semibold'>{ row?.workfile?.insurance?.provider}</span></Regular>
                      <Regular><span className='text-xs text-regularGrey'>Claim Number</span></Regular>
                      <Regular><span className='text-black font-semibold'>{ row?.workfile?.insurance_claim_number}</span></Regular>

                    </div>
                  
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-col'>
          
                    <Regular><span className='text-xs text-regularGrey'>Schedule Date and Time</span></Regular>
                    <Regular><span className='text-black font-semibold'>{getDate( row?.workfile?.other_detail_repair_date )}</span></Regular>

                    <Regular><span className='text-xs text-regularGrey'>Received</span></Regular>
                    {/* <Regular><span className='text-black font-semibold'>{row?.workfile?.customer?.phone_number}</span></Regular> */}
                  
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-col'>
                
                <Regular><span className='text-xs text-regularGrey'>Status</span></Regular> 
                <span className='mb-2'/>
                        
                { row?.workfile?.work_status === 'New' ?
                  <Bold>
                      <span className='text-[#0098F9] border-[#0098F9] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                  </Bold>
                : null }

                { row?.workfile?.work_status === 'Canceled'?
                  <Bold>
                      <span className='text-[#EC4F54] border-[#EC4F54] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                  </Bold>
                : null }

                { row?.workfile?.work_status === 'No Show' ?
                  <Bold>
                      <span className='text-[#EA580C] border-[#EA580C] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                  </Bold>
                : null }

                { row?.workfile?.work_status === 'Completed' ?
                  <Bold>
                      <span className='text-[#66BE7A] border-[#66BE7A] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                  </Bold>
                : null }

                { row?.workfile?.work_status === 'Ready to Audit' ?
                    <Bold>
                      <span className='text-[#EA6F53] border-[#EA6F53] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                    </Bold>
                : null }

                {  row?.workfile?.work_status === 'Ready to Merge' ?
                    <Bold>
                      <span className='text-[#717597] border-[#717597] border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                    </Bold>
                : null }

                { row?.workfile?.work_status === 'Requested Assignment' ?
                    <Bold>
                      <span className='text-[#5D73C6] border-[#5D73C6]  border rounded-lg py-1 px-2'>{row?.workfile?.work_status}</span>
                    </Bold>
                : null } 

                <span className='mb-2'/>

                  <Regular><span className='text-xs text-regularGrey'>Estimate Total</span></Regular> 

                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-col'>

                    <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                    <Regular><span className='text-tableTextColor invisible'>-</span></Regular>

                    <Regular><span className='text-xs text-regularGrey invisible'>-</span></Regular>
                    <Regular><span className='text-black font-semibold'>{dollarFormat( row?.workfile?.supplement_files?.reduce((sum, file) => sum + file.supplement_amount, 0) ,  row?.workfile?.other_detail_initial_estimate )}</span></Regular>
                   
                </div>

              </TableCell>

              </TableRow>
            ))}
            </>
            }
       
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
          component="div"
          count={pagingResponse?.count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        

      </Card>
      <div className='mb-16'/>
    </SubContainer>
  )
}

export default Appointment
