import React, { useState, useEffect , useRef  } from 'react';

import { BrowserRouter as Router, Link ,  useNavigate, useRoutes } from 'react-router-dom';

import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Assign_Modal from './layout/Assign_Modal';

import Card from "../../../component/Card/Card"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import { BsChevronRight, BsChevronLeft, } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiFilterFill , RiMessage2Fill } from "react-icons/ri";
import { IoReload , IoChevronDownOutline } from "react-icons/io5";
import { HiPlus } from "react-icons/hi"; 

import { DashboardIcons, pageRoutes , EstimaticsImg, getDate, getRoute , handleManagerUser } from '../../../contants'

import { EstimaticsNewRows as newRows  } from '../../../contants/StaticData'

import Add_New_Modal from './layout/Add_New_Modal';

import PaginationDefault from '../../../component/Pagination/PaginationDefault';
import { APIServices } from '../../../hooks/fetchAPI'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerList } from '../../../redux/customer/customerThunk';
import { getAdjusterList } from '../../../redux/adjuster/adjusterThunk';
import { getFilteredEstimator } from '../../../redux/estimator/estimatorThunk';
import { getFilteredShopEstimatic } from '../../../redux/estimatics/assignmentShopThunk';
import { getShopList } from '../../../redux/shop/shopThunk';
import { debounce } from '../../../utils/debounce';

import { GradientTableRow } from '../../../contants/StaticData';
import WorkfileFilter from './modal/filter/WorkFileFilter';

const ShopEstimatics = () => {

   const navigate = useNavigate();

  const { action, shopEstimaticResponse } = useSelector((state) => state.shopEstimatic);

  const shopResponses = useSelector((state) => state.shop.action);
  const customerResponses = useSelector((state) => state.customer.action);
  const adjusterResponses = useSelector( (state) => state.adjuster.action )
  const estimatorResponses = useSelector( (state) => state.estimator.action )

  const inputRef = useRef(null);

  const paging = action?.shopEstimaticResponse?.pagination;
  const response = action?.shopEstimaticResponse;

  const dispatch = useDispatch();

  const [modalWorkFile, setModalWorkFile] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ filterUserModal, setFilterUserModal ] = useState(false);
  const [ searchLoading , setSearchLoading ] = useState(false);

  const [ modalShop, setModalShop ] = useState(false);

  const [ assignData, setAssignData ] = useState([]);

  const [ sortBy , setSortBy ] = useState('desc');
  const [ workStatus , setWorkStatus ] = useState('');
  const [ repairStatus , setRepairStatus ] = useState('');
  const [ stormLocation , setStormLocation ] = useState('');
  const [ franchiseRegion , setFranchiseRegion ] = useState('');
  const [ fromDate , setFromDate ] = useState('');
  const [ toDate , setToDate ] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const handleAssignData = (event) => {

    setAssignData((prevSelectedItems) => {
      if (prevSelectedItems.includes(event.target.value)) {
        // Remove the item if it's already in the array
        return prevSelectedItems.filter((selectedItem) => selectedItem !== event.target.value);
      } else {
        // Add the item if it's not in the array
        return [...prevSelectedItems, event.target.value];
      }
    });

  }

  useEffect(() => {

    async function getDataProfileLogged() {

      const res = await APIServices.get({ url: '/user/profile/me' })

      if (res && !res.error && res.data && res.data.data) {
        
        if( handleManagerUser( res?.data?.data ) !== true && res?.data?.data?.role === 5 ) {
          setAssignData( res?.data?.data );
        } 
      }

    }

    getDataProfileLogged();

   

  }, []);

  useEffect(() => {
      
    let typingTimer;
    const doneTypingInterval = 300;
      
    if (searchTerm.trim() !== "") { 
        typingTimer = setTimeout(() => {
          handleSearch();
        }, doneTypingInterval);
    } else {
        handleDefaultFetch();
    }
      
    return () => clearTimeout(typingTimer);
      
  }, [ searchTerm , sortBy  ]);

    
  const handleDefaultFetch = async () => {
    
  
        const pagination = {
          page: shopEstimaticResponse?.pagination?.current + 1,
          limit: shopEstimaticResponse?.pagination?.size,
          sort : sortBy,
          work_status : workStatus,
          storm_location : stormLocation, 
          franchise_region : franchiseRegion,
          from : fromDate,
          to : toDate,
          repair_status : repairStatus
        }
    
        await dispatch(getFilteredShopEstimatic(pagination));
        await dispatch( getShopList() );
        await dispatch( getCustomerList() );
        await dispatch( getAdjusterList() );
        await dispatch( getFilteredEstimator() );
    
    }
   
  const handleWorkfileStatusColor = ( data ) => {

    if( data?.supplement_request?.length > 0 && data?.work_status !== 'Completed' ) 
    return  <Bold>
              <span className='text-[#a020f0] border-[#a020f0]  border rounded-lg py-1 px-2'>Supplement Request</span>
            </Bold>
    
    // if( data?.supplement_files?.length > 0 ) return <span className='text-purple-500'>Supplement Request</span>

    let color;
    
    if (data?.other_detail_possible_tl === 'No') return;
    else if (data?.other_detail_possible_tl === 'Total Loss') color = "text-gray-500";
    else color = "text-red-500";

    return <span className={`${color}`}>{ data?.other_detail_possible_tl === 'Yes' ? 'Possible Total Loss' : data?.other_detail_possible_tl }</span>
  }

  const handleColorGradient = (color) => {

    const validStatuses = ['Ready to Audit', 'Requested Assignment', 'Canceled', 'No Show', 'Completed', 'Ready to Merge', 'New'];

    if ( color?.work_status === 'New' && !color?.is_opened) {
      return "rgba(0, 150, 255, 0.2)";
    }
    
    else if ( color?.work_status === 'Completed') {
      return "rgba(102, 190, 122, 0.2)";
    }

    else if ( color?.work_status === 'Ready to Audit') {
      return "rgba(234, 111, 83, 0.2)";
    }

    else if (color?.other_detail_possible_tl === 'No' && color?.work_status === 'No Show') {
      return "rgba(234, 88, 12, 0.2)";
    }

    else if ( color?.supplement_request?.length > 0 ||  color?.tech_scope_sheet?.length >= 2 ) {
      return "rgba(160, 32, 240, 0.2)";
    }

    else if (color?.other_detail_possible_tl === 'Yes' && validStatuses.includes( color?.work_status) ) {
      return "rgba(236, 79, 84, 0.2)";
    }
    
    else if (color?.other_detail_possible_tl === 'Total Loss' && validStatuses.includes( color?.work_status )) {
      return "rgba(93, 115, 198, 0.2)";
    } 

    else {
      return "rgba(255, 255, 255, 0.2)";
    }
    
  }

  
  const handleScopeChecker = ( data ) => {

    if( data?.is_scope_sheet_uploaded ) { 
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#0098F9' }}></div> 
    } else {
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>
    }
    
  }

  
  const handleUploadedFileChecker = (data) => {
     
    if( data?.is_photo_uploaded ) { 
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#E0BC31' }}></div> 
    } else {
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>
    }

  }


  const handleDTPChecker = (data) => {

    if ( data?.dtp?.signature?.length > 0 ) return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#66BE7A' }}></div> 

    return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>


  }

  const handleDateChecker = (data , is_web) => {

    const rowDate = new Date( data );
    const today = new Date();

    return  rowDate.getDate() === today.getDate() &&
            rowDate.getMonth() === today.getMonth() &&
            rowDate.getFullYear() === today.getFullYear()
            && is_web === true;

  }

  const handleFilter = ( status = '' , storm = '' , region = '' , startDate = '' , endDate = '' , repair = ''  ) => {

    setWorkStatus(status);
    setStormLocation(storm);
    setFranchiseRegion(region);
    setFromDate(startDate);
    setToDate(endDate);
    setRepairStatus(repair);

    const pagination = {
      page: 1,
      limit: shopEstimaticResponse?.pagination?.size,
      work_status : status,
      storm_location : storm , 
      franchise_region : region,
      from : startDate,
      to : endDate,
      repair_status : repair
    }

    debounce(
      async () =>
        await dispatch(getFilteredShopEstimatic(pagination)),
    1000);
    
  }
  
  const handleRemoveFilter = () => {
    
    setWorkStatus('');
    setStormLocation('');
    setFranchiseRegion('');
    setFromDate('');
    setToDate('');
    setRepairStatus('');

    inputRef.current.value = '';

    const pagination = {
      page: 1,
      limit: shopEstimaticResponse?.pagination?.size,
    }

    debounce(
      async () =>
        await dispatch(getFilteredShopEstimatic(pagination)),
    1000);

  }

  const handleSearch = ( search ) => {

    const pagination = {
      page: 1,
      limit: shopEstimaticResponse?.pagination?.size,
      search : searchTerm,
      sort : sortBy,
      work_status : workStatus,
      storm_location : stormLocation, 
      franchise_region : franchiseRegion,
      from : fromDate,
      to : toDate,
      repair_status : repairStatus,
    }

    debounce(
      async () =>
        [await dispatch(getFilteredShopEstimatic(pagination)) , setSearchLoading(false) ],
    500);

  }
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIsOpenUpdate = async ( row ) => {
    navigate( getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row?._id) );
    if ( row?.is_opened ) return;
    const res = await APIServices.put({ url: `/workfile/opened/${ row?._id }` })

  }


  return (
    <SubContainer>

      <Add_New_Modal title="Add New Shop Assignment" loader={loader} toogle={modalWorkFile} setToggle={setModalWorkFile} adjuster={adjusterResponses} shopList={shopResponses} customerList={customerResponses}/>

      <Assign_Modal assign_data={ assignData } title="Assign Users" toogle={ modalShop } setToggle={ setModalShop } shopList={shopResponses} estimator={estimatorResponses} adjuster={adjusterResponses}/>

      <PageHeader name={"Estimatics - Assignments - Shop"} description={"Here are the list of uploaded estimates"}/>

      <WorkfileFilter ModalToggle={ setFilterUserModal } Toggle={ filterUserModal } handleFilter={ handleFilter } isShop={true} />

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Estimatics</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input ref={inputRef} onChange={ handleInputChange }  placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch/></span>
            </div>
          </div>

          {/* Icon */}
          <div className='flex flex-row items-center justify-between gap-2'>

            <div onClick={ () => handleRemoveFilter() } className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
            </div>

            <div onClick={ () => setFilterUserModal(true) } className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><RiFilterFill/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
            </div>

          </div>

        </div>

      </div>

      <Card>
        <div className='w-full flex justify-between items-center max-[1355px]:flex-col max-[1355px]:items-start'>

          <div className='flex flex-row max-[1355px]:order-last'>

            <Header><span className='text-mainText'>Item List ({ response?.data?.length })</span></Header>

            <div className='flex flex-row ml-4 items-center'>

                <span className='text-sm'>Legends:</span>

                <div className='flex flex-row items-center ml-7 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#E0BC31' }}></div>
                  <span className='text-sm'>Photo Uploaded</span>
                </div>

                <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#0098F9' }}></div>
                  <span className='text-sm'>Scope Uploaded</span>
                </div>

                <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                  <div className='bg-black rounded-full' style={{height:12,width:12, backgroundColor: '#66BE7A' }}></div>
                  <span className='text-sm'>DTP included</span>
                </div>

            </div>

          </div>

          <div className='flex flex-row items-center justify-center gap-3 max-[1355px]:w-full max-[1355px]:justify-end max-[1355px]:mb-2'>

            { assignData.length > 0 ? 
            <div onClick={ () => setModalShop(true) } className='bg-secondaryText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-cyan-600 hover:transition duration-300'>
              <span className='text-white text-bold text-xl'><AiOutlineUsergroupAdd/></span>
              <Regular><span className='text-white ml-3'>Assign</span></Regular>
            </div>
            
            :null }

            <div className='flex flex-row gap-3 items-center'>
              <span className='text-sm font-semibold'>Sort by:</span>
              <FormControl>
                <Select defaultValue={'desc'} onChange={ e => setSortBy( e.target.value ) }>

                  <MenuItem value={'desc'}>Newest - Oldest</MenuItem>
                  <MenuItem value={'asc'}>Oldest - Newest</MenuItem>
        
                </Select>

              </FormControl>
              
            </div>

            <div onClick={() => setModalWorkFile(true)}  className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
              <span className='text-white text-bold text-xl'><HiPlus/></span>
              <Regular><span className='text-white ml-3'>New Shop Assignment</span></Regular>
            </div>

          </div>

        </div>

        <br/>

        <TableContainer component={Paper}>
        <Table>
          {/* <TableHead>

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

          </TableHead> */}
          <TableBody>
          {
            response?.loading || searchLoading ?
                <div className='w-full flex flex-col items-center justify-center my-5'>
                    <CircularProgress />
                </div>
            :<>

            { response?.data?.map((row , key) => (
              <GradientTableRow
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
                colorGradient={ handleColorGradient(row) }
              >
        
                <TableCell>

                  <div className='flex flex-start relative mb-1 right-3 '>

                    { handleManagerUser( assignData ) !== true && assignData?.role === 5  ? null : <Checkbox onChange={ e => handleAssignData(e) } value={ row?._id }/> }

                  </div>
                  {/* href={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} */}
                  <a className='flex flex-col'  >

                      <div className='flex flex-row gap-2 items-center'>

                        { handleUploadedFileChecker(row) }

                        { handleScopeChecker( row ) }

                        { handleDTPChecker(row) }
   
                      </div>
                      <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row?.vehicle_year} {row?.vehicle_make}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row?.vehicle_model} {row?.vehicle_color}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row?.vehicle_vin}</span></Regular>

                      </div>
                     
                  </a>

                </TableCell>

                <TableCell onClick={() => handleIsOpenUpdate( row )}>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Name / Contact Number</span></Regular>

                      <a href={'#'} style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row?.customer?.full_name}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row?.customer?.phone_number}</span></Regular>

                        <Regular><span className='text-xs text-regularGrey'>Insurance / Claim Number</span></Regular>

                        <Regular><span className='text-tableTextColor'>{row?.insurance?.provider}</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row?.insurance_claim_number}</span></Regular>


                      </a>
                     
                  </div>

                </TableCell>

                {/* to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link} */}
                <TableCell onClick={() => handleIsOpenUpdate( row )}>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Shop Name</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <Regular><span className='text-tableTextColor'>{row?.shop_name ? row?.shop_name : null }</span></Regular>
                        <Regular><span className='text-xs text-regularGrey'>Shop Location</span></Regular>
                        <Regular><span className='text-tableTextColor'>{row?.shop_address ? row?.shop_address : null }</span></Regular>

                      </div>
                     
                  </div>

                </TableCell>

                <TableCell onClick={() => handleIsOpenUpdate( row )}>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Scheduled Time</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>

                        <div className='flex flex-row w-full items-center'>
                          <Regular><span className='text-tableTextColor'>{ getDate( row?.other_detail_date_time_upload ) }</span></Regular>
                        </div>
    
                      </div>
                     
                  </div>

                </TableCell>
                {/* to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link} */}
                <TableCell onClick={() => handleIsOpenUpdate( row )}>

                  <div className='flex flex-col'>
                      <Regular><span className='text-xs text-regularGrey'>Workfile Status</span></Regular>

                      <div style={{ gap : 4, marginTop : 4 , flexDirection :'column' , display : 'flex' }}>
                              
                              { row?.work_status === 'New'?
                                <Bold>
                                  <span className='text-[#0098F9] py-1'>{row?.work_status}</span>
                                </Bold>
                              : null }

                              { row?.work_status === 'Canceled' ?
                                <Bold>
                                  <span className='text-[#EC4F54] border-[#EC4F54] border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null }

                              { row?.work_status === 'No Show'?
                                <Bold>
                                  <span className='text-[#EA580C] border-[#EA580C] border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null }

                              { row?.work_status === 'Completed' ?
                                <Bold>
                                  <span className='text-[#66BE7A] border-[#66BE7A] border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null }

                              { row?.work_status === 'Ready to Audit' ?
                                <Bold>
                                  <span className='text-[#EA6F53] border-[#EA6F53] border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null }


                              {  row?.work_status === 'Ready to Merge' ?
                                <Bold>
                                  <span className='text-[#717597] border-[#717597] border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null }

                              { row?.work_status === 'Requested Assignment' ?
                                <Bold>
                                  <span className='text-[#5D73C6] border-[#5D73C6]  border rounded-lg py-1 px-2'>{row?.work_status}</span>
                                </Bold>
                              : null } 


                        <Regular><span className='text-xs text-regularGrey'>Repair Status</span></Regular>
                        
                        <span className='mb-2' />
                        { handleWorkfileStatusColor(row) }
                             
                      </div>
                     
                  </div>

                </TableCell>
                {/* to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link} */}
                <TableCell onClick={() => handleIsOpenUpdate( row )}>

                  <div className='flex flex-row gap-2 items-center'>
                    <span className="text-lg text-secondaryText"><RiMessage2Fill /></span>
                    <Regular><span className='text-sm text-secondaryText'>New Message(s)</span></Regular>

                  </div>

                </TableCell>

              </GradientTableRow>
            ))}

            </>}

          </TableBody>
        </Table>
      </TableContainer>

      <PaginationDefault
          index={paging?.current > 0 ? paging?.current - 1 : paging?.current}
          size={paging?.size}
          total={paging?.count}
          onChange={(index, size) => {
            // debugger;
            const pagination = {
              page: index + 1,
              limit: size,
              sort : sortBy,
              work_status : workStatus,
              storm_location : stormLocation, 
              franchise_region : franchiseRegion,
              from : fromDate,
              to : toDate,
            }

            debounce(
              async () =>
                await dispatch(getFilteredShopEstimatic(pagination)),
              1000);
          }}
      />

      {/* <div className='flex flex-row w-full items-center mt-4 gap-3'>

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

      </div> */}

      </Card>
      <div className='mb-16'/>
    </SubContainer>
  )
}

export default ShopEstimatics
