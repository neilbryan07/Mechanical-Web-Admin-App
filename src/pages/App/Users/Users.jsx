import React, { useState, useEffect , useRef} from 'react'
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


import { DashboardIcons, pageRoutes, EstimaticsImg, SwitchUseStyles } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { UsersRows as newRows } from '../../../contants/StaticData'

import ModalDefault from '../../../component/Modal/ModalDefault';

import Add_User from '../../../component/Layout/Sidebar/DropdownContent/Add_User'

import { useDispatch, useSelector } from 'react-redux';
import { getAuditorList } from '../../../redux/auditor/auditorThunk';
import { getFilteredEstimator } from '../../../redux/estimator/estimatorThunk';

import { getFilteredUser } from '../../../redux/users/userThunk';
import { debounce } from '../../../utils/debounce';
import PaginationDefault from '../../../component/Pagination/PaginationDefault';

import { getDate } from '../../../contants'

import TablePagination from '@mui/material/TablePagination';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import Backdrop from '@mui/material/Backdrop';
import Divider from '@mui/material/Divider';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

import ViewUser from './modal/ViewUser'
import DeleteUser from './modal/DeleteUser'
import FilterUser from './modal/FilterUser'
import Edit_User from './modal/EditUser'

import { APIServices } from '../../../hooks/fetchAPI'

import { ToastContainer, toast } from 'react-toastify';

const columns = [
  { id: 'id', label: '#', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 250 },
  { id: 'email', label: 'Email Address', minWidth: 200 },
  { id: 'access', label: 'Access / Level', minWidth: 200 },
  { id: 'user_type', label: 'User Type', minWidth: 200 },
  { id: 'date_created', label: 'Date Created', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 200 },
];

const Users = () => {

  const dispatch = useDispatch();

  const { action, userFilterResponse } = useSelector((state) => state.userFilter);

  const pagingUser = action?.userFilterResponse?.pagination;
  const pagingResponse = action?.userFilterResponse;

  const [userModal, setUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userTable, setUserTable] = useState([]);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [filterUserModal, setFilterUserModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const backspaceHold = useRef(false);
  const timeoutRef = useRef(null);

  const [sortBy, setSortBy] = useState('desc');

  const auditorResponses = useSelector((state) => state.auditor.action);
  const estimatorResponses = useSelector((state) => state.estimator.action);

  const handleAuditEstimatorMerged = () => {
    const mergeData = estimatorResponses?.estimatorResponse?.data?.concat(auditorResponses?.auditorResponse?.data);
    setUserTable(mergeData);
  }

  useEffect(() => {
    handleAuditEstimatorMerged();
    (async () => {

      // const pagination = {
      //   page: userFilterResponse?.pagination?.current + 1,
      //   limit: userFilterResponse?.pagination?.size,
      //   role : '5,6',
      //   order : sortBy,
      // }

      // await dispatch( getFilteredUser(pagination) );
      await dispatch(getAuditorList());
      await dispatch(getFilteredEstimator());

    })()

  }, []);


  // useEffect(() => {

  //   (async () => {

  //     const pagination = {
  //       page: userFilterResponse?.pagination?.current + 1,
  //       limit: userFilterResponse?.pagination?.size,
  //       order : sortBy,
  //     }

  //     await dispatch( getFilteredUser(pagination) );

  //   })();


  // }, [sortBy]);

  useEffect(() => {
    handleAuditEstimatorMerged();
  }, [auditorResponses, estimatorResponses]);


  const handleAccessLevel = (data) => {

    if (data.hasOwnProperty('auditor_details')) {

      return data?.auditor_details?.access?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item}</span> <br />
        </React.Fragment>

      )
      )

    } else if (data.hasOwnProperty('estimator_details')) {


      return data?.estimator_details?.level_type?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item}</span> <br />
        </React.Fragment>

      )
      )

    }

  }

  const handleUserLevel = (data) => {

    if (data.hasOwnProperty('auditor_details')) {

      if (data?.auditor_details?.is_manager) {
        return "Auditor (Manager)";
      } else {
        return "Auditor";
      }

    } else if (data.hasOwnProperty('estimator_details')) {

      if (data?.estimator_details?.is_manager) {
        return "Estimator (Manager)";
      } else {
        return "Estimator";
      }

    }

  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = async (event, newPage) => {

    const pagination = {
      page: newPage + 1,
      limit: rowsPerPage,
      order: sortBy,
    }

    debounce(
      async () =>
        await dispatch(getFilteredUser(pagination)),
      1000);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    const pagination = {
      page: 1,
      limit: event.target.value,
      order: sortBy,
    }

    debounce(
      async () =>
        await dispatch(getFilteredUser(pagination)),
      1000);

    setPage(0);
  };

  useEffect(() => {
    let typingTimer;
    const doneTypingInterval = 300;

    if (searchTerm.trim() !== "") {
      typingTimer = setTimeout(() => {
        handleSearch();
      }, doneTypingInterval);
    } else {
      handleRemoveFilter();
    }

    return () => clearTimeout(typingTimer);
  }, [searchTerm, sortBy]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (search) => {

    if (searchTerm.trim() === "") return false;

    const pagination = {
      page: 1,
      limit: rowsPerPage,
      search: searchTerm,
      order: sortBy,
      role: '5,6',
    }

    debounce(
      async () =>
        await dispatch(getFilteredUser(pagination)),
      2000);

    setPage(0);
  }

  const handleFilter = (user = null, access = null) => {
    const pagination = {
      page: 1,
      limit: rowsPerPage,
      role: user ? user : '',
      order: sortBy,
      access_level: user === 6 ? access : access === 'Mitchell' ? 'Mitchell - Level 2,Mitchell - Level 1' : 'CCC - Level 2,CCC - Level 1',
      // level_type :  user === 5 ? access === 'Mitchell' ? 'Mitchell - Level 1,Mitchell - Level 2' : 'CCC - Level 1,CCC - Level 2' : '',
    }

    debounce(
      async () =>
        await dispatch(getFilteredUser(pagination)),
      1000);

    setPage(0);
  }

  const handleRemoveFilter = async () => {

    const pagination = {
      page: userFilterResponse?.pagination?.current + 1,
      limit: userFilterResponse?.pagination?.size,
      role: '5,6',
      order: sortBy,
    }

    debounce(
      async () =>
        await dispatch(getFilteredUser(pagination)),
      1000);

    setPage(0);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    setSelectedUserData(data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleStatusUpdate = async (id, status) => {

    const res = await APIServices.put({
      url: `/user/status/${id}`, payload: {
        "status": status ? 1 : 0,
      }
    })

    notify();

    // if ( res?.status === 200 ) notify();

  }

  const notify = () => toast("Status successfully changed");


  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      backspaceHold.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setInterval(() => {
        setSearchTerm((prevValue) => prevValue.slice(0, prevValue.length - 1));
      }, 100); // Adjust the interval for deletion speed
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Backspace') {
      backspaceHold.current = false;
      clearInterval(timeoutRef.current);
    }
  };

  return (
    <SubContainer>

      {/* editModal , setEditModal */}

      {userModal && <Add_User Usermodal={userModal} SetUserModal={setUserModal} />}
      {editModal && <Edit_User Usermodal={editModal} SetUserModal={setEditModal} userData={selectedUserData} />}

      {viewUserModal && <ViewUser ModalToggle={setViewUserModal} Toggle={viewUserModal} userData={selectedUserData} />}
      {deleteUserModal && <DeleteUser ModalToggle={setDeleteUserModal} Toggle={deleteUserModal} userData={selectedUserData} />}
      {filterUserModal && <FilterUser ModalToggle={setFilterUserModal} Toggle={filterUserModal} handleFilter={handleFilter} />}

      <ToastContainer position="top-right" autoClose={1000} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >

        <div className='flex flex-col items-start bg-white rounded p-4 gap-2'>

          <div className='border-b border-gray-400 w-full pb-2'>
            <span className='text-black text-md'>Options :</span>
          </div>


          <div onClick={() => setViewUserModal(true)} className='w-full flex flex-row gap-3 items-center hover:bg-gray-100 pr-10 rounded cursor-pointer'>
            <span className='text-mainText text-md'><VisibilityIcon /></span>
            <span className='text-black text-md font-semibold'>View</span>
          </div>

          <div onClick={() => setEditModal(true)} className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
            <span className='text-secondaryText text-md'><ModeIcon /></span>
            <span className='text-black text-md font-semibold'>Edit</span>
          </div>

          <div onClick={() => setDeleteUserModal(true)} className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
            <span className='text-tertiaryText text-md'><DeleteIcon /></span>
            <span className='text-black text-md font-semibold'>Delete</span>
          </div>

        </div>

      </Backdrop>

      <PageHeader name={"Users"} description={"You can manage different types of users here"} />

      <div className='w-full flex flex-row items-center justify-between mb-3 max-[700px]:flex-col max-[700px]:gap-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon' />
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Users</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input 
              onChange={e => handleInputChange(e)} 
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp} 
              placeholder={"Search"} 
              class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} 
              type={"text"} 
            />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch /></span>
            </div>
          </div>

          {/* Icon */}
          <div onClick={() => handleRemoveFilter()} className='flex flex-row items-center justify-between gap-2'>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><IoReload /></span>
            </div>

            <div onClick={() => setFilterUserModal(true)} className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><RiFilterFill /></span>
            </div>

            {/* <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                    <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
                    </div> */}

          </div>

        </div>

      </div>

      <Card>

        <div className='w-full flex justify-between items-center max-[883px]:flex-col max-[883px]:items-start max-[883px]:gap-3'>

          <div className='flex flex-row max-[658px]:flex-col max-[658px]:gap-2'>
            <Header><span className='text-mainText'>Item List ({pagingResponse?.pagination?.count})</span></Header>
          </div>

          <div className='flex flex-row gap-5 max-[883px]:order-first max-[883px]:self-end'>

            <div className='flex flex-row gap-3 items-center'>
              <span className='text-sm font-semibold'>Sort by:</span>
              <FormControl>
                <Select defaultValue={'desc'} onChange={e => setSortBy(e.target.value)}>

                  <MenuItem value={'desc'}>Newest - Oldest</MenuItem>
                  <MenuItem value={'asc'}>Oldest - Newest</MenuItem>

                </Select>

              </FormControl>

            </div>

            <div onClick={() => setUserModal(true)} className='bg-mainText py-2 px-4 rounded-md flex flex-row items-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
              <span className='text-white text-bold text-xl'><HiPlus /></span>
              <Regular><span className='text-white ml-3'>Add Users</span></Regular>
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

                    {pagingResponse?.data?.map((row, key) => (
                      <TableRow
                        hover
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      //  onClick={ () => handleClickOpen(row) }
                      >
                        <TableCell onClick={() => handleClickOpen(row)} >
                          <div className='w-full flex flex-row items-center gap-5 cursor-pointer'>
                            <Regular><span className='text-tableTextColor'>{key + 1}</span></Regular>
                          </div>
                        </TableCell>

                        <TableCell onClick={() => handleClickOpen(row)} >
                          <div className='w-full flex flex-row items-center gap-5 cursor-pointer'>
                            <Regular><span className='text-tableTextColor'>{row?.full_name ? row?.full_name : row?.first_name + " " + row?.last_name}</span></Regular>
                          </div>
                        </TableCell>

                        <TableCell onClick={() => handleClickOpen(row)} >
                          <Regular><span className='text-tableTextColor cursor-pointer'>{row?.email}</span></Regular>
                        </TableCell>

                        <TableCell onClick={() => handleClickOpen(row)} >
                          <div className='cursor-pointer'>
                            <Regular>{handleAccessLevel(row)}</Regular>
                          </div>
                        </TableCell>

                        <TableCell onClick={() => handleClickOpen(row)}  >
                          <Regular><span className='text-tableTextColor cursor-pointer'> {handleUserLevel(row)} </span></Regular>
                        </TableCell>

                        <TableCell onClick={() => handleClickOpen(row)}  >
                          <Regular><span className='text-tableTextColor cursor-pointer'>{getDate(row?.createdAt)}</span></Regular>
                        </TableCell>

                        <TableCell>

                          <SwitchUseStyles checked={row.status} id={row._id} handleFunction={handleStatusUpdate} />

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
          count={pagingUser?.count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* <PaginationDefault
            index={pagingUser?.current > 0 ? pagingUser?.current - 1 : pagingUser?.current}
            size={pagingUser?.size}
            total={pagingUser?.count}
            onChange={(index, size) => {
            // debugger;

            const pagination = {
              page: index + 1,
              limit: size,
            }

            debounce(
              async () =>
                await dispatch(getFilteredUser(pagination)),
              1000);
            }}
        /> */}


      </Card>
      <div className='mb-16' />

    </SubContainer>
  )
}

export default Users
