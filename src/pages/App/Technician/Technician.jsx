import React, { useState , useEffect , lazy, Suspense } from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { IoIosArrowUp , IoIosArrowDown } from "react-icons/io";

import ModalDefault from '../../../component/Modal/ModalDefault'

import { DashboardIcons } from '../../../contants'
import SubHeader from '../../../component/Typography/SubHeader'
import TextInputs from '../../../component/FormInput'

import Switch from '@mui/material/Switch';

import { TbUserCircle, TbCheck } from "react-icons/tb";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TablePagination from '@mui/material/TablePagination';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getTechnicianList } from '../../../redux/technicians/technicianThunk'

import { SwitchUseStyles } from '../../../contants'
import { debounce } from '../../../utils/debounce'

import { APIServices } from '../../../hooks/fetchAPI'

const Add_Technician = lazy(() => import('../../../component/Layout/Sidebar/DropdownContent/Add_Technician'));
const Edit_Technician = lazy(() => import('./Modal/Edit_Technician'));

const rows = [
  { id : 1, name : 'Jake Ballard', shop : 'Bobs Auto Collison Repair' , region : 'Nevada', scope : '30', completed : '30', status : 'Active' },
  { id : 2, name : 'Fitzgerald Grant', shop : 'Any Shop' , region : 'Nebraska', scope : '12', completed : '12', status : 'Active'  },
  { id : 3, name : 'Olivia Pope', shop : 'Any Shop' , region : 'Nebraska', scope : '15', completed : '15',status : 'Inactive'  },
  { id : 4, name : 'Huck Munoz', shop : 'Any Shop' , region : 'New York', scope : '10', completed : '10', status : 'Active'  },
  { id : 5, name : 'Quin Perkins', shop : 'Bobs Auto Collison Repair' , region : 'Nevada', scope : '10' , completed : '10', status : 'Active' },
  { id : 6, name : 'Mellie Grant', shop : 'Any Shop' , region : 'Missouri', scope : '10', completed : '10', status : 'Inactive'  },
  { id : 7, name : 'Abby Whelan', shop : 'Any Shop' , region : 'Mississippi', scope : '10' , completed : '10', status : 'Active' },
  { id : 8, name : 'David Rosen', shop : 'Any Shop' , region : 'Washington', scope : '10', completed : '10',status : 'Active'  },
  { id : 9, name : 'Susan Ross', shop : 'Any Shop' , region : 'Louisana', scope : '10' , completed : '10', status : 'Active' },
  { id : 10, name : 'Bonnie WinterBottom', shop : 'Any Shop' , region : 'Utah', scope : '10' , completed : '10', status : 'Inactive' },
];

const columns = [
  { id: 'id', label: 'Job ID', minWidth: 20 },
  { id: 'name', label: 'Invoice Amount', minWidth: 200 },
  { id: 'shop', label: 'R & I Tech', minWidth: 150 },
  { id: 'region', label: 'Date Checked-in', minWidth: 250 },
  { id: 'scope', label: 'Date Completed', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 250 },
];

const columnsModal = [
  { id: 'id', label: 'Job ID', minWidth: 200 },
  { id: 'invoice', label: 'Invoice Amount', minWidth: 250 },
  { id: 'tech', label: 'R & I Tech', minWidth: 250 },
  { id: 'checkIn', label: 'Date Check-In', minWidth: 250 },
  { id: 'completed', label: 'Date Completed', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 250 },
];

const jobHistory = [
  { id : 123456789, invoice : '500.00', tech : 0, checkIn : 'May 10, 2023', completed : 'N/A' , status : 'Needs Supplement' },
  { id : 123456789, invoice : '500.00', tech : 1, checkIn : 'May 10, 2023', completed : 'May 10, 2023' , status : 'Approved' },
  { id : 123456789, invoice : '500.00', tech : 0, checkIn : 'May 10, 2023', completed : 'N/A' , status : 'Waiting on Approval' },
  { id : 123456789, invoice : '500.00', tech : 1, checkIn : 'May 10, 2023', completed : 'N/A' , status : 'Needs Scope' },
  { id : 123456789, invoice : '500.00', tech : 1, checkIn : 'May 10, 2023', completed : 'May 10, 2023' , status : 'Approved' },
]

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

const Technician = () => {

  const dispatch = useDispatch();

  const { action, technicianResponse } = useSelector((state) => state.technician);

  const pagingTechnician = action?.technicianResponse?.data;
  const pagingResponse = action?.technicianResponse;

  const [ technicianTable , setTechnicianTable ] = useState([]);

  const [ selectedTechnician , setSelectedTechnician ] = useState([]);

  const [ modalHandle , setModalHandle ] = useState(false);
  const [ modalEditHandle , setModalEditHandle ] = useState(false);
  const [ businessModal , setBusinessModal ] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [value, setValue] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [ sortBy , setSortBy ] = useState('');
  const [ sortOrder , setSortOrder ] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {

  //   (async () => {

  //     const pagination = {
  //       page: 1,
  //       limit: 10,
  //     }

  //     await dispatch( getTechnicianList( pagination ) );

  //   })()

  // }, []);

  
  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
    }

    debounce(
      async () =>
        await dispatch(getTechnicianList(pagination)),
    1000);

    setPage(newPage);
  };

    
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
    }

    debounce(
      async () =>
        await dispatch(getTechnicianList(pagination)),
    1000);

    setPage(0);
  };

  const handleViewTechnician = ( data ) => {
    setSelectedTechnician( data )
    setBusinessModal(true);

  }

  
  const handleStatusUpdate = async ( id , status ) => {

    const res = await APIServices.put({ url: `/user/update/technician/${id}` , payload: {
      "status": status ? 1 : 0,
    } })
    
    const pagination = {
      page: page + 1,
      limit: rowsPerPage,
    }

    debounce(
      async () =>
        await dispatch(getTechnicianList(pagination)),
    1000);

  }

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
      }, [searchTerm ,   sortBy , sortOrder]);

      
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = ( search ) => {

      if (searchTerm.trim() === "") return false;

        const pagination = {
          page: 1,
          limit: rowsPerPage,
          search : searchTerm,
        }
  
        debounce(
          async () =>
            await dispatch(getTechnicianList(pagination)),
        2000);
  
        setPage(0);
    }

    const handleFilter = async () => {
      const pagination = {
        page: 1,
        limit: rowsPerPage,
        sortBy : sortBy , 
        sortOrder : sortOrder
      }
    
      debounce(
        async () =>
        await dispatch(getTechnicianList(pagination)),
      1000);
    
      setPage(0);
    }

    const handleRemoveFilter = async () => {

      setSortBy("");
      setSortOrder("");
      const pagination = {
        page: 1,
        limit: rowsPerPage,
        sortBy : "" , 
        sortOrder : ""
      }
    
      debounce(
        async () =>
        await dispatch(getTechnicianList(pagination)),
      1000);
    
      setPage(0);
  }

  const handleSortFilter = ( sortBy , sortOrder ) => {
    setSortBy( sortBy )
    setSortOrder( sortOrder )
  }
    
  return (
    <SubContainer>

      <Suspense >
        <Add_Technician Techmodal={modalHandle} SetTechModal={setModalHandle} />
      </Suspense >

      <Suspense>
        <Edit_Technician Techmodal={modalEditHandle} SetTechModal={setModalEditHandle} technicianData={ selectedTechnician } />
      </Suspense>

      { businessModal &&
      <ModalDefault 
        title={"Technician Details"}
        toggle={businessModal}
        setToggle={setBusinessModal}
        // size={"w-3/6"}
      >
        <div className='px-4'>

          {/* Technician Info */}
          <div className='w-full border rounded-md p-2'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                  <span style={{ fontSize:23}}><TbUserCircle/></span>
                  <span style={{ fontSize:14}}><Bold>Technician Information</Bold></span>      
              </div>

              <span onClick={ () => setModalEditHandle(true) } className='text-mainText cursor-pointer' style={{ fontSize:14}}><Bold>EDIT</Bold></span>    

            </div>

            <div class="grid grid-cols-2 gap-y-2 mt-3 items-center">

              {/* Name */}

              <div><TextDisplay>Name</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>{ selectedTechnician?.first_name } { selectedTechnician?.last_name }</TextDisplay>
              </div>

              <div><TextDisplay>Shop Assigned</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>{ selectedTechnician?.shops?.[0]?.name }</TextDisplay>
              </div>

              <div><TextDisplay>Region</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>{ selectedTechnician?.shops?.[0]?.region?.name }</TextDisplay>
              </div>

              <div><TextDisplay>Scope Sheet Written</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>10</TextDisplay>
              </div>

              <div><TextDisplay>Status</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='text-green-500 font-semibold text-sm mr-2'>:</span> </TextDisplay>
                { selectedTechnician?.status === 1 ?
                  <TextDisplay><span className='text-green-500 font-semibold text-sm'>Active</span> </TextDisplay> : 
                  <TextDisplay><span className='text-gray-500 font-semibold text-sm'>InActive</span> </TextDisplay>
                }
              </div>

            </div>

          </div>

          <div className='w-full'>

          <Tabs
            onChange={handleChange}
            value={value}
            aria-label="Tabs where selection follows focus"
            selectionFollowsFocus
          >
            <Tab label="Job History" {...a11yProps(0)} />
            <Tab label="Assigned Shop History" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <span style={{ fontSize:14}}><Bold>Item List(10)</Bold></span>      
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

                      <div className='flex flex-row items-center justify-between'>
                          <Bold>{column.label}</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>
                  ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobHistory.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.id}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular props="text-end">
                          <span className='text-regularText'>{row.invoice}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>

                        {row.tech === 1 ?
                          <span className='flex justify-center items-center text-mainText'><TbCheck/></span>
                        : null
                        }

                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.checkIn}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.completed}</span>
                        </Regular>
                      </TableCell>


                      <TableCell>

                        {row.status === 'Needs Supplement' ?
                            <Bold>
                              <span className='text-regularOrange border-regularOrange border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                        : null }

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

                        {row.status === 'Needs Scope' ?
                            <Bold>
                              <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status}</span>
                            </Bold>
                        : null }

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>


          </TabPanel>

          <TabPanel value={value} index={1}>
            <span style={{ fontSize:14}}><Bold>Item List(10)</Bold></span>      
            <br/>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    
                    <TableCell>
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>Shop Name</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>
                
                    <TableCell>
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>Repairs Completed</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>  

                    <TableCell>
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>Estimates Written</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>Region</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>Date Assigned</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' ><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' ><IoIosArrowDown/></span>
                          </div>

                      </div>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>Bobs Auto Collisions Repair</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>13</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>10</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>Nevada</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>May 10, 2023</span>
                        </Regular>
                      </TableCell>

                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>Any Shop</span>
                        </Regular>
                      </TableCell>

                      
                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>22</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>15</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>New York</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>May 10, 2022</span>
                        </Regular>
                      </TableCell>

                    </TableRow>

                </TableBody>
              </Table>
            </TableContainer>


          </TabPanel>

          </div>

          <div className='w-full flex justify-end pb-8'>
            <div className='flex flex-row items-center gap-10'>
              
              <span className='text-gray-600 cursor-pointer' onClick={ () => setBusinessModal(false) }>
                <Header>Cancel</Header>
              </span>

              <div className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                <Header>Save</Header>
              </div>

            </div>
          </div>

        </div>
      </ModalDefault>  }
  
    <PageHeader name={"Technicians"} description={"Here are the list of all technician across region/state"}/>

    <div className='w-full flex flex-row items-center justify-between mb-3'>

      <div className='w-full flex flex-row items-center gap-1 mt-2'>
        <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
        <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
        <Regular><span className='text-secondaryText text-sm'>/ Technicians</span></Regular>
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

          <div onClick={  handleRemoveFilter } className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
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

          <Header><span className='text-mainText'>Item List ( { pagingResponse?.data?.count } )</span></Header>

        </div>

        <div className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300' onClick={ () => setModalHandle(true) }>
          <span className='text-white text-bold text-xl'><HiPlus/></span>
          <Regular><span className='text-white ml-3'>Add</span></Regular>
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
                      <div className='flex flex-row items-center justify-between'>
                          <Bold>{column.label}</Bold>

                          <div className='flex flex-col'>
                            <span className='cursor-pointer text-xs' onClick={ () => handleSortFilter(column?.id , "asc")}><IoIosArrowUp/></span>
                            <span className='cursor-pointer text-xs' onClick={ () => handleSortFilter(column?.id , "desc")}><IoIosArrowDown/></span>
                          </div>

                      </div>
                  </TableCell>
                ))}
            </TableRow>
            
        </TableHead>
        <TableBody>

        { pagingResponse?.loading ?
                  <div className='w-full flex flex-col items-center justify-center my-5'>
                    <CircularProgress />
                  </div>
                  :
                  <>

          { pagingResponse?.data?.data?.map(( row , key ) => (
            <TableRow
              key={row.key}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell  onClick={ () => handleViewTechnician( row )  }>
                <Regular>
                  <span className='text-regularText cursor-pointer'>{key + 1}</span>
                </Regular>
              </TableCell>

              <TableCell  onClick={ () => handleViewTechnician( row )  }>
                <Regular>
                  <span className='text-regularText cursor-pointer'>{row.first_name} {row.last_name}</span>
                </Regular>
              </TableCell>

              <TableCell>

                {row?.shop === 'Any Shop' ?
                  <Regular>
                    <span className='text-regularText'>{row?.shops?.[0]?.name}</span>
                  </Regular>
                : <span className='cursor-pointer' onClick={ () => handleViewTechnician( row )  }>
                    <Bold>
                      {row?.shops?.[0]?.name}
                    </Bold> 
                  </span>
                }

              </TableCell>

              <TableCell onClick={ () => handleViewTechnician( row )  }>
                <Regular>
                  <span className='text-regularText cursor-pointer'>{row?.technician_details?.region?.name}</span>
                </Regular>
              </TableCell>

              <TableCell onClick={ () => handleViewTechnician( row )  }>
                <Regular>
                  <span className='text-regularText cursor-pointer'>{ row?.technician_details?.pay_percentage }</span>
                </Regular>
              </TableCell>

              <TableCell>
                <Regular>
                  <span className='text-regularText'>{row.completed}</span>
                </Regular>
              </TableCell>


              <TableCell>

                <SwitchUseStyles checked={row?.status} id={ row?._id } handleFunction={handleStatusUpdate} />

                {/* {row.status === 1 ?
                    <Bold>
                      <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>Active</span>
                    </Bold>
                : null }

                {row.status === 0 ?
                    <Bold>
                      <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>Inactive</span>
                    </Bold>
                : null } */}

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
        count={pagingTechnician?.count}
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

export default Technician
