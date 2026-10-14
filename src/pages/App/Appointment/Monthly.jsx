import React, { useState , useEffect } from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Regular from '../../../component/Typography/Regular'
import Bold from '../../../component/Typography/Bold'

import Card from "../../../component/Card/Card"

import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons , getDate , formatMonthDateYearWithMonthName , getCurrentDay } from '../../../contants'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import TablePagination from '@mui/material/TablePagination';

import ItemList from './Layout/ItemList'
import MonthlyItemList from './Layout/MonthlyItemList'
import WeekDays from './Layout/WeekDays'

import CalendarMonthlyWeekDaysLayout from './Layout/CalendarMonthlyWeekDaysLayout'
import CalendarMonthlyWeekEndLayout from './Layout/CalendarMonthlyWeekEndLayout'

import { debounce } from '../../../utils/debounce';

import { useDispatch, useSelector } from 'react-redux';
import { getCalendarList } from '../../../redux/calendar/calendarThunk'
import { getMonthlyList } from '../../../redux/calendar/monthlyThunk'

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
  
const Monthly = () => {
  const { action, monthlyResponse } = useSelector((state) => state.monthly );

  const monthlyResponses = useSelector((state) => state.monthly.action);
  
  const pagingResponse = action?.monthlyResponse?.data;
  const pagingLoading = action?.monthlyResponse;

  const [ selectedMonthDateDisplay , setSelectedMonthDateDisplay ] = useState(  [] );
  const [ selectedMonthDateAPI , setSelectedMonthDateAPI ] = useState(null);
  const [ selectedMonthlyDateIndex , setSelectedMonthlyDateIndex ] = useState( null );

  const [ handleSelectedDate , setHandleSelectedDate ] = useState(  new Date() );
  const [ handleMonthlyDataCalendar , setHandleMonthlyDataCalendar ] = useState(  [] );

  const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ repairModal , setRepairModal ] = useState(false);

    const [ selectedData , setSelectedData ] = useState([]);

  const get35DaysGrid = (year, month) => {
      // Get the first day of the month (October 1 in this case)
      const firstDayOfMonth = new Date(year, month, 1);
    
      // Get the last day of the month
      const lastDayOfMonth = new Date(year, month + 1, 0);
    
      // Find the previous Sunday before the first day of the month
      const startDate = new Date(firstDayOfMonth);
      startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    
      // Find the next Saturday after the last day of the month
      const endDate = new Date(lastDayOfMonth);
      endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));
    
      const daysArray = [];
      for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
        // Format the date as MM/DD/YYYY
        const formattedDate = new Date(day).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        daysArray.push(formattedDate);
      }
      setSelectedMonthlyDateIndex( null )
      // Return only the first 35 days to form the 5-week grid
      return setSelectedMonthDateDisplay( daysArray.slice(0, 35) );
  };

  const handleMonthlyCalendar = async () => {
    const res = await APIServices.get({ url: `/repair-calendar/calendar/web/date?start_date=${ selectedMonthDateDisplay?.[0] }&end_date=${ selectedMonthDateDisplay?.[selectedMonthDateDisplay?.length - 1] }` })
    if (res && !res.error && res.data && res.data.data) {
      setHandleMonthlyDataCalendar(  res?.data?.data?.summary )
    }
  }
  
  const handleMonthlyData = ( index ) => {
    // setSelectedWeekDateAPI( weekDateData[ index ] )
    // setSelectedWeekDateDisplay( weekDateData[ index ] )
    setSelectedMonthlyDateIndex( index )
    setHandleSelectedDate( selectedMonthDateDisplay[ index ] )
    setSelectedMonthDateAPI( selectedMonthDateDisplay[ index ] )
  }  

  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
      date : selectedMonthDateAPI ? selectedMonthDateAPI : getCurrentDay(),
    }

    debounce(
      async () =>
        await dispatch( getMonthlyList(pagination) ),
    1000);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
      date : selectedMonthDateAPI ? selectedMonthDateAPI : getCurrentDay(),
    }

    debounce(
      async () =>
        await dispatch( getMonthlyList(pagination) ),
    1000);

    setPage(0);
  };

  useEffect(() => {

    handleMonthlyCalendar();

  },[ selectedMonthDateDisplay ]);

  useEffect(() => {

    (async () => {

      const pagination = {
        page: page + 1,
        limit: rowsPerPage,
        date : selectedMonthDateAPI ? selectedMonthDateAPI : getCurrentDay(),
      }

      await dispatch( getMonthlyList(pagination) );

    })();

    },[ selectedMonthDateAPI ]);
  
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

        <div className='w-full flex flex-row items-center justify-between mb-3'>

            <div className='w-full flex flex-row items-center gap-1 mt-2'>
                <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
                <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
                <Regular><span className='text-secondaryText text-sm'>/ Appointment Calendar / Month View</span></Regular>
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
        
        <MonthlyItemList get35DaysGrid = { get35DaysGrid }/>

        <WeekDays/>

        <div>

        {/* selectedMonthDateDisplay */}

          <div className='w-full grid grid-cols-7 grid-rows-1'>

          { handleMonthlyDataCalendar?.map( (item , index) => {

            const dayOfWeek = new Date( item?.dayFormat ).getDay(); // Sunday is 0, Saturday is 6
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return isWeekend ? (

              <React.Fragment key = { index }>
                  <CalendarMonthlyWeekEndLayout index = { index } item = { item } selectedMonthlyDateIndex = { selectedMonthlyDateIndex } handleMonthlyData = { handleMonthlyData } />
              </React.Fragment>

            ) : (
              <React.Fragment key = { index }>
                <CalendarMonthlyWeekDaysLayout index = { index } item = { item } selectedMonthlyDateIndex = { selectedMonthlyDateIndex } handleMonthlyData = { handleMonthlyData } />
              </React.Fragment>
            );
          

          }) }


            {/* <CalendarWeekendLayout day={1} />

            <CalendarWeekdaysLayout day={2} />

            <CalendarWeekdaysLayout day={3} />

            <CalendarWeekdaysLayout day={4} />

            <CalendarWeekdaysLayout day={5} />

            <CalendarWeekdaysLayout day={6} />
            
            <CalendarWeekendLayout day={7} /> */}
            

          </div>

        </div>

        <div className='w-full flex flex-row items-center justify-between'>

          <div className='flex flex-row gap-2 items-center'>
          <span className='text-mainText font-bold'>{ formatMonthDateYearWithMonthName( new Date() ) === formatMonthDateYearWithMonthName( handleSelectedDate ) ? "Today" : "Selected Date"}, { formatMonthDateYearWithMonthName( handleSelectedDate ) }</span>
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

export default Monthly