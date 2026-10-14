import React, { useState , useEffect } from 'react'
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"

import Card from "../../../component/Card/Card"

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { IoReload } from "react-icons/io5";

import { DashboardIcons, SwitchUseStyles } from '../../../contants'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';

import ViewShop from './modal/ViewShop'
import Edit_Shop from './modal/EditShop'


import { getShopAccountList } from '../../../redux/shop/shopAccountThunk'
import { debounce } from '../../../utils/debounce';

import { getDate } from '../../../contants'

import TablePagination from '@mui/material/TablePagination';

import Backdrop from '@mui/material/Backdrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';



const columns = [
    { id: 'id', label: '#', minWidth: 100 },
    { id: 'name', label: 'Shop Name', minWidth: 250 },
    { id: 'email', label: 'Email Address', minWidth: 200 },
    { id: 'address', label: 'Address', minWidth: 200 },
    { id: 'shop_contact', label: 'Shop Contact', minWidth: 200 },
    { id: 'date_created', label: 'Date Created', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 200 },
];
  
const ShopAccount = () => {

    const dispatch = useDispatch();

    const { action, shopAccountResponse } = useSelector((state) => state.shopAccount);

    const pagingUser = action?.shopAccountResponse?.pagination;
    const pagingResponse = action?.shopAccountResponse;

    const [ sortBy , setSortBy ] = useState('desc');
    const [ selectedShopData , setSelectedShopData ] = useState([]);
    const [ viewShopModal, setViewShopModal ] = useState(false);
    const [ editShopModal, setEditShopModal ] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    
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
    }, [searchTerm , sortBy ]);

    
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
    

    // useEffect(() => {
  
    //   (async () => {

    //     const pagination = {
    //       page: 1,
    //       limit: 10,
    //       sort : sortBy,
    //     }

    //     await dispatch( getShopAccountList(pagination) );

    //   })()

    // }, []);

    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = async (event, newPage) => {

      const pagination = {
        page: newPage + 1,
        limit: rowsPerPage,
        sort : sortBy,
      }

      debounce(
        async () =>
          await dispatch(getShopAccountList(pagination)),
      1000);

      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));

      const pagination = {
        page: 1,
        limit: event.target.value,
        sort : sortBy,
      }

      debounce(
        async () =>
          await dispatch(getShopAccountList(pagination)),
      1000);

      setPage(0);
    };

    const handleSearch = ( search ) => {

        const pagination = {
          page: 1,
          limit: rowsPerPage,
          search : searchTerm,
          sort : sortBy,
        }
  
        debounce(
          async () =>
            await dispatch(getShopAccountList(pagination)),
        1000);
  
        setPage(0);
    }



    const handleRemoveFilter = () => {
      const pagination = {
        page: 1,
        limit: rowsPerPage,
        sort : sortBy,
      }

      debounce(
        async () =>
          await dispatch(getShopAccountList(pagination)),
      1000);

      setPage(0);
    }

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  
  const handleClickOpen = (data) => {
    setSelectedShopData( data )
    setOpen(true);
  };



  return (
    <SubContainer>

{/* editModal , setEditModal */}

        <PageHeader name={"Shop Accounts"} description={"You can manage shop accounts here"}/>
   
        { viewShopModal && <ViewShop ModalToggle={ setViewShopModal } Toggle={ viewShopModal } shopData={ selectedShopData } /> }
        { editShopModal && <Edit_Shop SetShopModal={ setEditShopModal } Shopmodal={ editShopModal } shopData={ selectedShopData } /> }
      
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >

          <div className='flex flex-col items-start bg-white rounded p-4 gap-2'>

            <div className='border-b border-gray-400 w-full pb-2'>
              <span className='text-black text-md'>Options :</span>
            </div>
        

            <div onClick={ () => setViewShopModal(true) } className='w-full flex flex-row gap-3 items-center hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-mainText text-md'><VisibilityIcon/></span>
              <span className='text-black text-md font-semibold'>View</span>
            </div>
            
            <div onClick={ () => setEditShopModal(true) } className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-secondaryText text-md'><ModeIcon/></span>
              <span className='text-black text-md font-semibold'>Edit</span>
            </div>

            <div className='flex flex-row gap-3 items-center justify-between hover:bg-gray-100 pr-10 rounded cursor-pointer'>
              <span className='text-tertiaryText text-md'><DeleteIcon/></span>
              <span className='text-black text-md font-semibold'>Delete</span>
            </div>

          </div>
       
        </Backdrop>

        <div className='w-full flex flex-row items-center justify-between mb-3 max-[700px]:flex-col max-[700px]:gap-3'>

            <div className='w-full flex flex-row items-center gap-1 mt-2'>
                <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
                <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
                <Regular><span className='text-secondaryText text-sm'>/ Shop Accounts</span></Regular>
            </div>

            <div className='w-full flex flex-row gap-3 items-center justify-end'>

                {/* Search */}
                <div className='w-4/12 relative'>
                    <input onChange={ e => handleInputChange(e) }  placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
                    <div className='absolute top-2.5 right-2'>
                    <span className='text-regularText'><AiOutlineSearch/></span>
                    </div>
                </div>

                {/* Icon */}
                <div onClick={ () => handleRemoveFilter() } className='flex flex-row items-center justify-between gap-2'>

                    <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                      <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
                    </div>

                    {/* <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
                    <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
                    </div> */}

                </div>

            </div>

        </div>

        <Card>

        <div className='w-full flex justify-between items-center max-[883px]:flex-col max-[883px]:items-start max-[883px]:gap-3 mb-3'>

            <div className='flex flex-row max-[658px]:flex-col max-[658px]:gap-2'>
                <Header><span className='text-mainText'>Item List ({ pagingResponse?.pagination?.count })</span></Header>
            </div>

            {/* <div className='flex flex-row gap-5 max-[883px]:order-first max-[883px]:self-end'>

                <div className='flex flex-row gap-3 items-center'>
                  <span className='text-sm font-semibold'>Sort by:</span>
                  <FormControl>
                    <Select defaultValue={'desc'} onChange={ e => setSortBy( e.target.value ) }>

                      <MenuItem value={'desc'}>Newest - Oldest</MenuItem>
                      <MenuItem value={'asc'}>Oldest - Newest</MenuItem>
            
                    </Select>

                  </FormControl>
                  
                </div>
                
                <div onClick={ () => setUserModal(true) } className='bg-mainText py-2 px-4 rounded-md flex flex-row items-center hover:bg-green-600 hover:transition duration-300 cursor-pointer'>
                    <span className='text-white text-bold text-xl'><HiPlus/></span>
                    <Regular><span className='text-white ml-3'>Add Users</span></Regular>
                </div>

            </div> */}

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

                    {pagingResponse?.data?.map(( row , key ) => (
                     <TableRow
                     hover
                     key={key}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    //  onClick={ () => handleClickOpen(row) }
                   > 
           
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <div className='w-full flex flex-row items-center gap-5 cursor-pointer'>
                             <Regular><span className='text-tableTextColor'>{ key + 1 }</span></Regular>
                         </div>
                     </TableCell>
     
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <div className='w-full flex flex-row items-center gap-5 cursor-pointer'>
                             <Regular><span className='text-tableTextColor'>{ row?.name }</span></Regular>
                         </div>
                     </TableCell>
     
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <Regular><span className='text-tableTextColor cursor-pointer'>{row?.contact?.[0]?.email}</span></Regular>
                     </TableCell>
     
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <Regular><span className='text-tableTextColor cursor-pointer'>{row?.address}</span></Regular>
                     </TableCell>
     
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <Regular><span className='text-tableTextColor cursor-pointer'>{row?.contact?.[0]?.contact_name}</span></Regular>
                     </TableCell>
     
                     <TableCell onClick={ () => handleClickOpen(row) } >
                         <Regular><span className='text-tableTextColor cursor-pointer'>{ getDate( row?.createdAt ) }</span></Regular>
                     </TableCell>
     
                     <TableCell>

                         <SwitchUseStyles checked={row.status} id={ row._id }  />
     
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


    </Card>
    <div className='mb-16'/>

    </SubContainer>
  )
}

export default ShopAccount
