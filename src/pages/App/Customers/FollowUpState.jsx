import React, { useState, useEffect } from 'react';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"

import Card from "../../../component/Card/Card"

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

import { DashboardIcons, pageRoutes, } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import TablePagination from '@mui/material/TablePagination';

import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';

import { debounce } from '../../../utils/debounce';

import { getFollowUpList } from '../../../redux/followup/followupThunk';

import ViewFollowUpList from '../Appointment/Modal/ViewFollowUpList';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

import { APIServices } from '../../../hooks/fetchAPI';

const BootstrapInput = styled(InputBase)(({ theme, dynamicColor = "#0098F9" }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'white',  // Keep background color white or any other static color
    border: `1px solid ${dynamicColor}`,  // Dynamic border color
    fontSize: 16,
    color: dynamicColor,  // Dynamic text color
    padding: '10px 26px 10px 12px',
    fontWeight: 500,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: dynamicColor,
      boxShadow: `0 0 0 0.2rem rgba(0,123,255,.25)`,
    },
  },
}));

const columns = [
  { id: 'id', label: '#', maxWidth: 30 },
  { id: 'id', label: 'Customer Name', minWidth: 200 },
  { id: 'location', label: 'Check-In Date and Time', minWidth: 200 },
  { id: 'number', label: 'Follow-up Date and Time', minWidth: 200 },
  { id: 'id', label: 'Status', minWidth: 200 },
];


const FollowUpState = () => {

  const { action, followupResponse } = useSelector((state) => state.followup );

  const followupResponses = useSelector((state) => state.followup.action);
  
  const pagingResponse = action?.followupResponse?.data;
  const pagingLoading = action?.followupResponse;

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [ followUpListModal , setFollowUpListModal ] = useState( false );
  const [ selectedData , setSelectedData ] = useState([]);

  const [ statusData , setStatusData ] = useState('New');

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
      await dispatch(getFollowUpList(pagination)),
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
      await dispatch(getFollowUpList(pagination)),
    1000);
        
    setPage(0);
  }

  // useEffect(() => {

  //   (async () => {

  //     const pagination = {
  //       page: page + 1,
  //       limit: rowsPerPage,
  //     }

  //     await dispatch( getFollowUpList(pagination) );

  //   })();

  //   },[]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
    }

    debounce(
      async () =>
        await dispatch( getFollowUpList(pagination) ),
    1000);

    setPage(0);
  };
  
  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
    }

    debounce(
      async () =>
        await dispatch( getFollowUpList(pagination) ),
    1000);

    setPage(newPage);
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format as 'Month Day, Year'
  }

  
  const convertTo12HourFormat = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutesPadded = minutes.toString().padStart(2, '0'); // Pad minutes with 0 if necessary
    return `${hours}:${minutesPadded} ${ampm}`;
  }

  
  const handleRowData = ( data ) => {
    setSelectedData( data )
    setFollowUpListModal(true)
  }

  const handleChanges = async ( e , row ) => {

    let data =     {
      "follow_up_status": e.target.value 
    }

    const res = await APIServices.put({ url: '/followup/follow/status/' + row?._id , payload: data })
      if (res && !res.error && res.data && res.data.data) {

        const pagination = {
          page: page + 1,
          limit: rowsPerPage,
        }
  
        await dispatch( getFollowUpList(pagination) );
    
    }

  }

  const handleStatusBG = ( color ) => {

    switch ( color ) {
      case 'Left a Message':
        return '#E0BC31'; 
      case 'Added to Repair Calendar':
        return '#66BE7A';
      case 'Called No Answer':
        return '#656C9A'; 
      case 'Repairing Somewhere Else':
        return '#DE4C50'; 
      case 'Not Interested':
        return '#DE4C50'; 
      case 'Track Payment':
        return '#00A3B2'; 
      case 'Requested Assignment':
        return '#838383';
      default:
        return '#66BE7A'; 
    }

  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <SubContainer>

    { followUpListModal &&
          <ViewFollowUpList followUpListmodal={ followUpListModal} SetfollowUpListModal={ setFollowUpListModal } customerData={ selectedData } />
    }

    <PageHeader name={"Customer - Follow-Up"} description={"Here are the list of customer that followed-up"}/>

    <div className='w-full flex flex-row items-center justify-between mb-3 max-[516px]:flex-col max-[516px]:gap-3 '>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
            <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
            <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
            <Regular><span className='text-secondaryText text-sm'>/ Customer / Follow-Up</span></Regular>
        </div>

    <div className='w-full flex flex-row gap-3 items-center justify-end'>

        {/* Search */}
        <div className='w-4/12 relative'>
            <input onChange={ handleInputChange }   placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
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

          <Header><span className='text-mainText'>Item List ({pagingResponse?.data?.length})</span></Header>

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

            {
              pagingLoading?.loading ?
              <div className='w-full flex flex-col items-center justify-center my-5'>
                <CircularProgress />
              </div>
              :
            <>

            {pagingResponse?.data?.map(( row , key ) => (

            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell onClick={() => handleRowData( row ) }>
                <Regular>
                  <span className='text-regularText'>{ key + 1 }</span>
                </Regular>
              </TableCell>

              <TableCell onClick={() => handleRowData( row ) }>
                <Regular>
                  <span className='text-regularText'>{ row?.customer?.full_name }</span>
                  {/* <a href={pageRoutes.FOLLOWUPCUSTOMERS} className='text-regularText hover:border-green-700 hover:border-b-2'>{row.location}</a> */}
                </Regular>
              </TableCell>

              <TableCell onClick={() => handleRowData( row ) }>
                <Regular>
                  <span className='text-regularText'>{ formatDate( row?.start_date ) } - { convertTo12HourFormat( row?.start_date ) }</span>
                </Regular>
              </TableCell>

              <TableCell onClick={() => handleRowData( row ) }>
                <Regular>
                  <span className='text-regularText'>{ formatDate( row?.end_date ) } - { convertTo12HourFormat( row?.end_date ) }</span>
                </Regular>
              </TableCell>

              <TableCell>

                  {/* <Bold>
                      <span className='text-[#EC4F54] border-[#EC4F54] border rounded-lg py-1 px-2'>{row?.follow_up_status}</span>
                  </Bold> */}

                  
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={ row?.follow_up_status }
                    onChange={ e => handleChanges( e , row ) }
                    displayEmpty
                    // inputProps={{ 'aria-label': 'Without label' }}
                    input={<BootstrapInput dynamicColor={ handleStatusBG(row?.follow_up_status) } />}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Left a Message">Left a Message</MenuItem>
                    <MenuItem value="Added to Repair Calendar">Added to Repair Calendar</MenuItem>
                    <MenuItem value="Called No Answer">Called No Answer</MenuItem>
                    <MenuItem value="Repairing Somewhere Else">Repairing Somewhere Else</MenuItem>
                    <MenuItem value="Not Interesed">Not Interesed</MenuItem>
                    <MenuItem value="Track Payment">Track Payment</MenuItem>
                    <MenuItem value="Requested Assignment">Contacted Insurance</MenuItem>

                  </Select>
                </FormControl>

                {/* <Regular>
                <span className='text-regularText'>{ row?.follow_up_status }</span>
                </Regular> */}
              </TableCell>

            </TableRow>

            ))} </> }

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

{/* 
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
*/}

    </Card>
    <div className='mb-16'/>
  </SubContainer>
  )
}

export default FollowUpState
