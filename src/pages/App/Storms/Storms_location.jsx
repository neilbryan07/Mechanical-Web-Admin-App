import React, { useState , useEffect } from 'react'
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

import { Switch } from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

import Backdrop from '@mui/material/Backdrop';

import { DashboardIcons, pageRoutes , EstimaticsImg , SwitchUseStyles } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import CircularProgress from '@mui/material/CircularProgress';

import { StormLocationRows as newRows  } from '../../../contants/StaticData'

import { useDispatch, useSelector } from 'react-redux';
import { getStormLocationList } from '../../../redux/storm_location/stormLocationThunk'
import { debounce } from '../../../utils/debounce';

import Add_Storm_Location from '../../../component/Layout/Sidebar/DropdownContent/Add_Storm_Location'

import TablePagination from '@mui/material/TablePagination';

import { APIServices } from '../../../hooks/fetchAPI'

import ViewStorm from './modal/ViewStorm'
import DeleteStorm from './modal/DeleteStorm'
import UpdateStorm from './modal/UpdateStorm'

const columns = [
    { id: 'id', label: '# Storm Location', minWidth: 200 },
    { id: 'leader', label: 'Storm Leader', minWidth: 200 },
    { id: 'ground_staff', label: 'Ground Staff', minWidth: 200 },
    { id: 'insurance_partner', label: 'Insurance Partner', minWidth: 200 },
    { id: 'storm_profile', label: 'Storm Profile', minWidth: 200 },
    { id: 'storm_header', label: 'Storm Header', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 200 },
];
  
const Storms_location = () => {

    const { action, stormLocationResponse } = useSelector((state) => state.stormLocation);

    const [ sortBy , setSortBy ] = useState('desc');

    const [stormModal, setStormModal] = useState(false);
    const [ viewStormModal, setViewStormModal ] = useState(false);
    const [ deleteStormModal, setDeleteStormModal ] = useState(false);
    const [ updateStormModal, setUpdateStormModal ] = useState(false);
    const [ selectedUserData , setSelectedUserData ] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const pagingStorm = action?.stormLocationResponse?.data;
    const pagingResponse = action?.stormLocationResponse;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = async (event, newPage) => {

      const pagination = {
        page: newPage + 1,
        limit: rowsPerPage,
        order : sortBy,
        search : searchTerm,
      }

      debounce(
        async () =>
          await dispatch(getStormLocationList(pagination)),
      1000);

      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));

      const pagination = {
        page: 1,
        limit: event.target.value,
        order : sortBy,
        search : searchTerm,
      }

      debounce(
        async () =>
          await dispatch(getStormLocationList(pagination)),
      1000);

      setPage(0);
    };

    const handleStatusUpdate = async ( id , status ) => {

      const res = await APIServices.put({ url: `/stormlocation/status/${id}` , payload: {
        "status": status ? 1 : 0,
      } })
  
    }
  
    const handleClickOpen = (data) => {
      setSelectedUserData( data )
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

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
    }, [searchTerm ,   sortBy]);


    const handleSearch = ( search ) => {

      if (searchTerm.trim() === "") return false;

        const pagination = {
          page: 1,
          limit: 10,
          order : sortBy,
          search : searchTerm,
        }
  
        debounce(
          async () =>
            await dispatch( getStormLocationList(pagination)),
        2000);
  
        setPage(0);
    }

    
    const handleFilter = async () => {
          const pagination = {
            page: 1,
            limit: rowsPerPage,
            order : sortBy,
            search : searchTerm,
          }
        
          debounce(
            async () =>
            await dispatch(getStormLocationList(pagination)),
          1000);
        
          setPage(0);
    }

          
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

  return (
    <SubContainer>

        <Add_Storm_Location Stormmodal={stormModal} SetStormModal={setStormModal} />

        { viewStormModal && 
          <ViewStorm ModalToggle={ setViewStormModal } Toggle={ viewStormModal } userData={ selectedUserData } /> 
        }

        { updateStormModal && <UpdateStorm Stormmodal={ updateStormModal } SetStormModal={ setUpdateStormModal } stormData={ selectedUserData }/> }

        <DeleteStorm ModalToggle={ setDeleteStormModal } Toggle={ deleteStormModal } userData={ selectedUserData } />
      
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >

          <div className='flex flex-col items-start bg-white rounded p-4 gap-2'>

            <div className='border-b border-gray-400 w-full pb-2'>
              <span className='text-black text-md'>Options :</span>
            </div>
        

            <div onClick={ () => setViewStormModal(true) } className='w-full flex flex-row gap-3 items-center hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-mainText text-md'><VisibilityIcon/></span>
              <span className='text-black text-md font-semibold'>View</span>
            </div>

            <div onClick={ () => setUpdateStormModal(true) } className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-secondaryText text-md'><ModeIcon/></span>
              <span className='text-black text-md font-semibold'>Edit</span>
            </div>

            <div onClick={ () => setDeleteStormModal(true) } className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-tertiaryText text-md'><DeleteIcon/></span>
              <span className='text-black text-md font-semibold'>Delete</span>
            </div>

          </div>
       
        </Backdrop>

        <PageHeader name={"Storm Location"} description={"You can manage all storm location created"}/>

        <div className='w-full flex flex-row items-center justify-between mb-3 max-[700px]:flex-col max-[700px]:gap-3'>

            <div className='w-full flex flex-row items-center gap-1 mt-2'>
                <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
                <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
                <Regular><span className='text-secondaryText text-sm'>/ Storm Location</span></Regular>
            </div>

            <div className='w-full flex flex-row gap-3 items-center justify-end'>

                {/* Search */}
                <div className='w-4/12 relative'>
                    <input onChange={ handleInputChange } placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
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
{/* 
                    <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                    <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
                    </div> */}

                </div>

            </div>

        </div>

        <Card>

        <div className='w-full flex justify-between items-center max-[883px]:flex-col max-[883px]:items-start max-[883px]:gap-3'>

            <div className='flex flex-row max-[658px]:flex-col max-[658px]:gap-2'>
                <Header><span className='text-mainText'>Item List (123)</span></Header>
            </div>

            <div className='flex flex-row gap-5 max-[883px]:order-first max-[883px]:self-end'>

              <div className='flex flex-row gap-3 items-center'>
                <span className='text-sm font-semibold'>Sort by:</span>
                <FormControl>
                  <Select defaultValue={'desc'} onChange={ e => setSortBy( e.target.value ) }>

                    <MenuItem value={'desc'}>Newest - Oldest</MenuItem>
                    <MenuItem value={'asc'}>Oldest - Newest</MenuItem>

                  </Select>

                </FormControl>
                
              </div>
                
                <div onClick={ () => setStormModal(true) } className='bg-mainText py-2 px-4 rounded-md flex flex-row items-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
                    <span className='text-white text-bold text-xl'><HiPlus/></span>
                    <Regular><span className='text-white ml-3'>Add Storm Location</span></Regular>
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
                    <Bold>{column.label}</Bold>
                  </TableCell>
                ))}
              </TableRow>

          </TableHead>
          <TableBody>

          {
                pagingResponse?.loading ?
                  <div className='w-full flex flex-col items-center justify-center my-5'>
                    <CircularProgress />
                  </div>
                  :
                  <>

                    { pagingResponse?.data?.data.map(( row , key ) => (
                    <TableRow
                      hover
                      key={row.reference}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <div className='w-full flex flex-row items-center gap-5'>
                              <Regular><span className='text-tableTextColor'>{ key + 1 }</span></Regular>
                              <Regular><span className='text-tableTextColor'>{row?.shop?.name}</span></Regular>
                          </div>
                      </TableCell>

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <Regular><span className='text-tableTextColor'>{row?.storm_leader?.first_name} {row?.storm_leader?.last_name}</span></Regular>
                      </TableCell>

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <Regular><span className='text-tableTextColor'>{row?.ground_staffs.length}</span></Regular>
                      </TableCell>

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <Regular><span className='text-tableTextColor'>{row?.insurance_partner?.provider}</span></Regular>
                      </TableCell>

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <Regular><span className='text-tableTextColor'>{row.storm_profile}</span></Regular>
                      </TableCell>

                      <TableCell onClick={ () => handleClickOpen(row) } >
                          <Regular><span className='text-tableTextColor'>{row.storm_header}</span></Regular>
                      </TableCell>

                      <TableCell>
                          <SwitchUseStyles checked={row.status} id={ row._id } handleFunction={handleStatusUpdate}  />
                        
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
          count={pagingStorm?.count}
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

export default Storms_location
