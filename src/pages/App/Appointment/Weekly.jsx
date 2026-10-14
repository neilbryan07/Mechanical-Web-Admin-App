import React, { useState , useEffect } from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Regular from '../../../component/Typography/Regular'
import Bold from '../../../component/Typography/Bold'

import Card from "../../../component/Card/Card"

import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons , getDate , formatMonthDateYearWithMonthName } from '../../../contants'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import TablePagination from '@mui/material/TablePagination';

import ModalDefault from '../../../component/Modal/ModalDefault';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import WeeklyItemList from './Layout/WeeklyItemList'
import AppointmentTable from './Layout/AppointmentTable'
import AppointmentCustomer from './Layout/AppointmentCustomer'

import AppointmentNewTable from './Layout/AppointmentNewTable'

import WeekDays from './Layout/WeekDays'
import CalendarWeekdaysLayout from './Layout/CalendarWeekdaysLayout'
import CalendarWeekendLayout from './Layout/CalendarWeekendLayout'
import CalendarSelectedLayout from './Layout/CalendarSelectedLayout'

import { debounce } from '../../../utils/debounce';

import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyList } from '../../../redux/calendar/weeklyThunk'

import ViewRepairCalendar from './Modal/ViewRepairCalendar'

import { APIServices } from '../../../hooks/fetchAPI'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const Weekly = () => {

  const { action, weeklyResponse } = useSelector((state) => state.weekly );

  const weeklyResponses = useSelector((state) => state.weekly.action);

  const [ selectedWeekDateDisplay , setSelectedWeekDateDisplay ] = useState(  new Date() );
  const [ selectedWeekDateAPI , setSelectedWeekDateAPI ] = useState( null );
  const [ selectedWeekDateIndex , setSelectedWeekDateIndex ] = useState( null );

  const pagingResponse = action?.weeklyResponse?.data;
  const pagingLoading = action?.weeklyResponse;

  const [week, setWeek] = useState([]);
  const [ weekDate , setWeekDate ] = useState([]);
  const [ weekDateData , setWeekDateData ] = useState([]);

  const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ repairModal , setRepairModal ] = useState(false);

    const [ selectedData , setSelectedData ] = useState([]);

    const [weekOffset, setWeekOffset] = useState(0);

    const handleNextWeek = () => {
      setSelectedWeekDateIndex(null);
      setWeekOffset(weekOffset + 1); // Move forward by one week
    };
  
    const handlePreviousWeek = () => {
      setSelectedWeekDateIndex(null);
      setWeekOffset(weekOffset - 1); // Move backward by one week
    };

    const getSunday = (offset = 0) => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
      const sunday = new Date(today);
    
      // Adjust to the current week's Sunday and apply the week offset
      sunday.setDate(today.getDate() - dayOfWeek + offset * 7);
    
      // Format the Sunday date as MM/DD/YYYY
      const formattedSunday = sunday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
      return formattedSunday; // Return only the formatted Sunday
    };

    const getLastDayOfWeek = (offset = 0) => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
      const saturday = new Date(today);
    
      // Adjust to the current week's Saturday and apply the week offset
      saturday.setDate(today.getDate() + (6 - dayOfWeek) + offset * 7);
    
      // Format the Saturday date as MM/DD/YYYY
      const formattedSaturday = saturday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
      return formattedSaturday; // Return only the formatted Saturday
    };

    const getWeek = (offset = 0) => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
      const sunday = new Date(today);
      
      // Adjust to the current week's Sunday and apply the week offset
      sunday.setDate(today.getDate() - dayOfWeek + offset * 7);
    
      const weekArray = [];
      const options = { month: 'long', day: 'numeric' }; // Only month and day
    
      for (let i = 0; i < 7; i++) {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() + i);
    
        // Format as "September 29"
        const formattedDay = day.toLocaleDateString('en-US', options);
        weekArray.push(formattedDay);
      }
     
      return weekArray;
    };

    const getCurrentWeekDate = ( offset = 0 ) => {
      const today = new Date();
      const dayOfWeek = today.getDay(); 
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek + offset * 7);
    
      const weekArray = [];
    
      for (let i = 0; i < 7; i++) {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() + i);
    
        // Get only the numeric day of the month
        // const dayOfMonth = day.getDate();
        const dayOfMonth = day.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        weekArray.push(dayOfMonth);
      }
      
      return weekArray;
    };

    const getCurrentDay = () => {
      const today = new Date();
      today.setDate(today.getDate() );

      const currentDay = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      return currentDay;
    };

    const handleWeeklyCalendar = async () => {
      const res = await APIServices.get({ url: `/repair-calendar/calendar/web/weekly?start_date=${ getSunday( weekOffset ) }&end_date=${ getLastDayOfWeek( weekOffset ) }` })
      if (res && !res.error && res.data && res.data.data) {
         setWeekDate( res?.data?.data?.summary )
      }
    }

  useEffect(() => {

    setWeek( getWeek( weekOffset ) );
    setWeekDateData( getCurrentWeekDate( weekOffset ) )
    handleWeeklyCalendar();

  }, [weekOffset]);

  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
      date : selectedWeekDateAPI,
    }

    debounce(
      async () =>
        await dispatch( getWeeklyList(pagination) ),
    1000);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
      date : selectedWeekDateAPI,
    }

    debounce(
      async () =>
        await dispatch( getWeeklyList(pagination) ),
    1000);

    setPage(0);
  };

  const handleWeekData = ( index ) => {
    setSelectedWeekDateAPI( weekDateData[ index ] )
    setSelectedWeekDateDisplay( weekDateData[ index ] )
    setSelectedWeekDateIndex( index )
  }

  useEffect(() => {

    (async () => {

      const pagination = {
        page: page + 1,
        limit: rowsPerPage,
        date : selectedWeekDateAPI ? selectedWeekDateAPI : getCurrentDay(),
      }

      await dispatch( getWeeklyList(pagination) );

    })();

    },[ selectedWeekDateAPI ]);
  
    const handleRowData = ( data ) => {
      setSelectedData( data )
      setRepairModal(true)
    }

  return (
    <SubContainer>

        { repairModal &&
            <ViewRepairCalendar repairmodal={ repairModal} SetRepairModal={ setRepairModal } customerData={ selectedData } />
        }

        <PageHeader name={"Repair Calendar"} description={"Here are the upcoming schedules"}/>

        <div className='w-full flex flex-row items-center justify-between mb-3 max-[700px]:flex-col max-[700px]:gap-3 '>

            <div className='w-full flex flex-row items-center gap-1 mt-2'>
                <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
                <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
                <Regular><span className='text-secondaryText text-sm'>/ Appointment Calendar / Week View</span></Regular>
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

        <Card props={"flex flex-col gap-2 mb-20"}>

        <WeeklyItemList weeklyDate = { week } handleNextWeek = { handleNextWeek } handlePreviousWeek = { handlePreviousWeek }/>

        <WeekDays/>

        <div className='w-full grid grid-cols-7 grid-rows-1'>

          { weekDate?.map( (item , index) => {
            
            if ( index === 0 || index === parseInt(weekDate?.length - 1) ) {
                return  <CalendarWeekendLayout item={ item } index = { index } handleWeekData = { handleWeekData } selectedWeekDateIndex = { selectedWeekDateIndex } />
            } else {
                return  <CalendarWeekdaysLayout item={ item } index = { index } handleWeekData = { handleWeekData } selectedWeekDateIndex = { selectedWeekDateIndex } />
            }
             
          }) }

          {/* <CalendarWeekendLayout day={15} />

          <CalendarWeekdaysLayout day={16} />

          <CalendarWeekdaysLayout day={17} />

          <CalendarSelectedLayout day={18} />

          <CalendarWeekdaysLayout day={19} />

          <CalendarWeekdaysLayout day={20} />

          <CalendarWeekendLayout day={21} /> */}

        </div>

        <div className='w-full flex flex-row items-center justify-between'>

          <div className='flex flex-row gap-2 items-center'>
              <span className='text-mainText font-bold'>{ formatMonthDateYearWithMonthName( new Date() ) === formatMonthDateYearWithMonthName( selectedWeekDateDisplay ) ? "Today" : "Selected Date"}, { formatMonthDateYearWithMonthName( selectedWeekDateDisplay ) }</span>
          </div>

          <span className='text-black text-sm font-semibold'>23 Items</span>

        </div>

        
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
                    <Regular><span className='text-black font-semibold'>{ getDate(row?.date_of_repair) }</span></Regular>

                    <Regular><span className='text-xs text-regularGrey'>Received</span></Regular>
                    <Regular><span className='text-black font-semibold'>{ getDate(row?.target_completion_date) }</span></Regular>
                  
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
                    <Regular><span className='text-black font-semibold'>$ { row?.workfile?.other_detail_initial_estimate }</span></Regular>
                   
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

    </SubContainer>
  )
}

export default Weekly