import React, { useState, useEffect, useRef   } from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"

import Add_New_Modal from './layout/Add_New_Modal';

import TableHead from '@mui/material/TableHead';
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

import { AiOutlineSearch, AiFillPrinter, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiFilterFill , RiMessage2Fill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";

import { DashboardIcons, pageRoutes, EstimaticsImg, getDate, defaultEstimatic, getRoute , handleManagerUser } from '../../../contants'

import { EstimaticsNewRows as newRows } from '../../../contants/StaticData'

import PaginationDefault from '../../../component/Pagination/PaginationDefault';
import { APIServices } from '../../../hooks/fetchAPI'
import { useDispatch, useSelector } from 'react-redux';
// import { getFilteredEstimatic } from '../../../redux/estimatics/estimaticsThunk';
import { getCustomerList } from '../../../redux/customer/customerThunk';
import { getAdjusterList } from '../../../redux/adjuster/adjusterThunk';
import { getShopList } from '../../../redux/shop/shopThunk';
import { getFilteredWorkfile } from '../../../redux/estimatics/workfileThunk';
import { debounce } from '../../../utils/debounce';
import WorkfileFilter from './modal/filter/WorkFileFilter';

import Assign_Modal from './layout/Assign_Modal';

import { GradientTableRow } from '../../../contants/StaticData';

const columns = [
  { id: 'reference', label: 'Reference #', minWidth: 200 },
  { id: 'name', label: 'Customer Name', minWidth: 200 },
  { id: 'insurance', label: 'Check-In Date and Time', minWidth: 250 },
];

const Estimatics = () => {
  const { action, workfileResponse } = useSelector((state) => state.workfile);

  const shopResponses = useSelector((state) => state.shop.action);
  const customerResponses = useSelector((state) => state.customer.action);
  const adjusterResponses = useSelector( (state) => state.adjuster.action )

  const paging = action?.workfileResponse?.pagination;
  const response = action?.workfileResponse;

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const [estimaticData, SetEstimaticsData] = useState([]);

  const [modalWorkFile, setModalWorkFile] = useState(false);
  const [dataSource, setDataSource] = useState(defaultEstimatic);
  const [loader, setLoader] = useState(false);
  const [ filterUserModal, setFilterUserModal ] = useState(false);
  const [ searchLoading , setSearchLoading ] = useState(false);

  const [ modalShop, setModalShop ] = useState(false);

  const [ assignData, setAssignData ] = useState([]);
  const [ userManager , setUserManager ] = useState(false);

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

    const validStatuses = ['Ready to Audit', 'Requested Assignment', 'Canceled', 'No Show', 'Completed', 'Ready to Merge' , 'New'];
    // if (color?.other_detail_possible_tl === 'No' && color?.work_status === 'Completed') {
    
    
    if ( color?.work_status === 'Completed') {
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

  useEffect(() => {

    (async () => {

      const pagination = {
        page: workfileResponse?.pagination?.current + 1,
        limit: workfileResponse?.pagination?.size,
        sort : sortBy,
        is_assigned_to_me  : userManager
      }
      
      await dispatch(getFilteredWorkfile(pagination));
   
    })();


  }, [sortBy]);

  useEffect(() => {

    // async function getData() {
    //   const res = await APIServices.get({ url: '/shop/list/all' })
    //   if (res && !res.error && res.data && res.data.data) {
    //     // SetEstimaticsData(res.data.data)
    //   }
    // }

    async function getDataProfileLogged() {

      const res = await APIServices.get({ url: '/user/profile/me' })

      if (res && !res.error && res.data && res.data.data) {
        
        // if( handleManagerUser( res?.data?.data ) !== true && res?.data?.data?.role === 5 ) {
        if( res?.data?.data?.role === 5 ) {
          setUserManager(true);
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


  }, [ userManager , searchTerm , sortBy  ]);

  const handleDefaultFetch = async () => {

    const pagination = {
      page: workfileResponse?.pagination?.current + 1,
      limit: workfileResponse?.pagination?.size,
      sort : sortBy,
      work_status : workStatus,
      storm_location : stormLocation, 
      franchise_region : franchiseRegion,
      from : fromDate,
      to : toDate,
      repair_status : repairStatus,
      is_assigned_to_me  : userManager
    }

    // if ( userManager ) pagination.is_assigned_to_me = true;
    
    await dispatch(getFilteredWorkfile(pagination));
    await dispatch( getShopList() );
    // await dispatch( getCustomerList() );
    await dispatch( getAdjusterList() );

  }
  

  const handleScopeChecker = ( data ) => {

    if( data?.is_scope_sheet_uploaded ) { 
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#0098F9' }}></div> 
    } else {
      return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>
    }

    // const propertiesToCheck = [
    //   'tech_sheet_left_fender',
    //   'tech_sheet_right_fender.photo',
    //   'tech_sheet_left_front_door',
    //   'tech_sheet_right_front_door',
    //   'tech_sheet_wind_shield',
    //   'tech_sheet_left_rail',
    //   'tech_sheet_right_rail',
    //   'tech_sheet_roof',
    //   'tech_sheet_left_rear_door',
    //   'tech_sheet_right_rear_door',
    //   'tech_sheet_left_fuel_door',
    //   'tech_sheet_right_fuel_door',
    //   'tech_sheet_left_quarter_box',
    //   'tech_sheet_right_quarter_box',
    //   'tech_sheet_left_cab_cnr',
    //   'tech_sheet_right_cab_cnr'
    // ];
  
    // const hasNonEmptyProperty = propertiesToCheck.some(property => {
    //   const value = data?.[property];
    //   return value !== undefined && value !== null && value !== '';
    // });

    // return hasNonEmptyProperty ?
    //   ( <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#0098F9' }}></div> ) :
    //   ( <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div> );
  
  }

  const handleUploadedFileChecker = (data) => {
      
    // if( 
    //   data?.tech_sheet_left_fender?.photo?.length > 0 ||
    //   data?.tech_sheet_right_fender?.photo?.length > 0 ||
    //   data?.tech_sheet_hood?.photo?.length > 0 ||
    //   data?.tech_sheet_left_front_door?.photo?.length > 0 ||
    //   data?.tech_sheet_right_front_door?.photo?.length > 0 ||
    //   data?.tech_sheet_wind_shield?.photo?.length > 0 ||
    //   data?.tech_sheet_left_rail?.photo?.length > 0 ||
    //   data?.tech_sheet_right_rail?.photo?.length > 0 ||
    //   data?.tech_sheet_roof?.photo?.length > 0 ||
    //   data?.tech_sheet_left_rear_door?.photo?.length > 0 ||
    //   data?.tech_sheet_right_rear_door?.photo?.length > 0 ||
    //   data?.tech_sheet_left_fuel_door?.photo?.length > 0 ||
    //   data?.tech_sheet_right_fuel_door?.photo?.length > 0 ||
    //   data?.tech_sheet_left_quarter_box?.photo?.length > 0 ||
    //   data?.tech_sheet_right_quarter_box?.photo?.length > 0 ||
    //   data?.tech_sheet_left_cab_cnr?.photo?.length > 0 ||
    //   data?.tech_sheet_right_cab_cnr?.photo?.length > 0 ||
    //   data?.gallery_full_vin?.length > 0 ||
    //   data?.gallery_full_interior?.length > 0 ||
    //   data?.gallery_full_license_plate?.length > 0 ||
    //   data?.gallery_full_lt_front?.length > 0 ||
    //   data?.gallery_full_lt_rear?.length > 0 ||
    //   data?.gallery_full_mileage?.length > 0 ||
    //   data?.gallery_full_odometer?.length > 0 ||
    //   data?.gallery_full_rt_front?.length > 0 ||
    //   data?.gallery_full_rt_rear?.length > 0 ||
    //   data?.gallery_total_loss_dashboard?.length > 0 ||
    //   data?.gallery_total_loss_door_trim?.length > 0 ||
    //   data?.gallery_total_loss_engine_compartment?.length > 0 ||
    //   data?.gallery_total_loss_front_undercarriage?.length > 0 ||
    //   data?.gallery_total_loss_headliner?.length > 0 ||
    //   data?.gallery_total_loss_seats?.length > 0 ||
    //   data?.gallery_total_loss_seats?.length > 0 ||
    //   data?.additional_photos?.length > 0 
    // ) { 
    //     return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#E0BC31' }}></div> 
    //   } else {
    //     return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>
    //   }

      if( data?.is_photo_uploaded ) { 
        return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#E0BC31' }}></div> 
      } else {
        return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>
      }

  }

  const handleFilter = ( status = '' , storm = '' , region = '' , startDate = '' , endDate = '', repair = ''  ) => {

    setWorkStatus(status);
    setStormLocation(storm);
    setFranchiseRegion(region);
    setFromDate(startDate);
    setToDate(endDate);
    setRepairStatus(repair);

    const pagination = {
      page: 1,
      limit: workfileResponse?.pagination?.size,
      work_status : status,
      storm_location : storm , 
      franchise_region : region,
      sort : sortBy,
      from : startDate,
      to : endDate,
      repair_status : repair,
      is_assigned_to_me  : userManager
    }

    debounce(
      async () =>
        await dispatch(getFilteredWorkfile(pagination)),
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
      limit: workfileResponse?.pagination?.size,
      sort : sortBy,
      is_assigned_to_me  : userManager
    }

    debounce(
      async () =>
        await dispatch(getFilteredWorkfile(pagination)),
    1000);

  }

  const handleSearch = ( search ) => {

    const pagination = {
      page: 1,
      limit: workfileResponse?.pagination?.size,
      search : searchTerm,
      sort : sortBy,
      work_status : workStatus,
      storm_location : stormLocation, 
      franchise_region : franchiseRegion,
      from : fromDate,
      to : toDate,
      repair_status : repairStatus,
      is_assigned_to_me  : userManager
    }

    debounce(
      async () =>
        [await dispatch(getFilteredWorkfile(pagination)) , setSearchLoading(false) ],
    500);

  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDTPChecker = (data) => {

    if ( data?.dtp?.signature?.length > 0 ) return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#66BE7A' }}></div> 

    return <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#CCCCCC' }}></div>

  }

  return (
    <SubContainer>

      <PageHeader name={"Estimatics - Workfiles"} description={"Here are the list of uploaded estimates"} />

      <Add_New_Modal title="Add New WorkFile" loader={loader} toogle={modalWorkFile} setToggle={setModalWorkFile} adjuster={adjusterResponses} shopList={shopResponses} customerList={customerResponses}/>
      <Assign_Modal assign_data={ assignData } title="Assign Users" toogle={ modalShop } setToggle={ setModalShop } shopList={shopResponses}/>
      <WorkfileFilter ModalToggle={ setFilterUserModal } Toggle={ filterUserModal } handleFilter={ handleFilter } />

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon' />
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Estimatics</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input ref={inputRef}  onChange={ handleInputChange }  placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch /></span>
            </div>
          </div>

          {/* Icon */}
          <div className='flex flex-row items-center justify-between gap-2'>

            <div onClick={ () => handleRemoveFilter() }  className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><IoReload /></span>
            </div>

            <div onClick={ () => setFilterUserModal(true) } className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><RiFilterFill /></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><AiFillPrinter /></span>
            </div>

          </div>

        </div>

      </div>

      <Card>
        <div className='w-full flex justify-between items-center max-[874px]:flex-col max-[874px]:items-start max-[874px]:gap-3 mb-3'>

          <div className='flex flex-row max-[658px]:flex-col max-[658px]:gap-2'>

            <Header><span className='text-mainText'>Item List ({paging?.count})</span></Header>

            <div className='flex flex-row ml-4 items-center max-[658px]:ml-0'>

              <span className='text-sm'>Legends:</span>

              <div className='flex flex-row items-center ml-7 gap-2 mt-0.5'>
                <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#E0BC31' }}></div>
                <span className='text-sm'>Photo Uploaded</span>
              </div>

              <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#0098F9' }}></div>
                <span className='text-sm'>Scope Uploaded</span>
              </div>

              <div className='flex flex-row items-center ml-4 gap-2 mt-0.5'>
                <div className='bg-black rounded-full' style={{ height: 12, width: 12, backgroundColor: '#66BE7A' }}></div>
                <span className='text-sm'>DTP included</span>
              </div>

            </div>

          </div>

          <div className='flex flex-row items-center justify-center gap-3 max-[874px]:order-first max-[874px]:self-end mr-2'>

            { assignData.length > 0 ? 
              <div onClick={ () => setModalShop(true) } className='bg-secondaryText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-cyan-600 hover:transition duration-300'>
                <span className='text-white text-bold text-xl'><AiOutlineUsergroupAdd/></span>
                <Regular><span className='text-white ml-3'>Assign</span></Regular>
              </div>

            :null}

            <div className='flex flex-row gap-3 items-center'>
              <span className='text-sm font-semibold'>Sort by:</span>
              <FormControl>
                <Select defaultValue={'desc'} onChange={ e => setSortBy( e.target.value ) }>

                  <MenuItem value={'desc'}>Newest - Oldest</MenuItem>
                  <MenuItem value={'asc'}>Oldest - Newest</MenuItem>
        
                </Select>

              </FormControl>
              
            </div>

            {/* <div onClick={() => setModalWorkFile(true)} className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
              <span className='text-white text-bold text-xl'><HiPlus /></span>
              <Regular><span className='text-white ml-3'>Add New Workfile</span></Regular>
            </div> */}

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
                    {/* <Bold>{column.label}</Bold> */}
                  </TableCell>
                ))}
              </TableRow>

          </TableHead>
            <TableBody>

              {
                response?.loading || searchLoading ?
                  <div className='w-full flex flex-col items-center justify-center my-5'>
                    <CircularProgress />
                  </div>
                  :
                  <>

                    {response?.data?.map((row) => (
                    <GradientTableRow
                      key={row.reference}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
                      colorGradient={ handleColorGradient(row)  }
                      // to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)}
                      // component={Link}
                    >

                        <TableCell>

                        <div className='flex flex-start relative mb-1 right-3 '>

                          { handleManagerUser( assignData ) !== true && assignData?.role === 5  ? null : <Checkbox onChange={ e => handleAssignData(e) } value={ row?._id }/> }

                        </div>
                  

                        <a className='flex flex-col' href={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} >
                            <div className='flex flex-row gap-2 items-center'>

                              { handleUploadedFileChecker(row) }

                              { handleScopeChecker( row ) }
                            
                              { handleDTPChecker(row) }
         
                            </div>
                            <Regular><span className='text-xs text-regularGrey'>Vehicle</span></Regular>
                            <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                              <Regular><span className='text-tableTextColor'>{row?.vehicle_year} {row?.vehicle_make}</span></Regular>
                              <Regular><span className='text-tableTextColor'>{row?.vehicle_model} {row?.vehicle_color}</span></Regular>
                              <Regular><span className='text-tableTextColor'>{row?.vehicle_vin}</span></Regular>

                            </div>

                          </a>

                        </TableCell>

                        <TableCell to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link}>

                          <div className='flex flex-col'>
                            <Regular><span className='text-xs text-regularGrey'>Name / Insurance</span></Regular>

                            <a href={'#'} style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                              <Regular><span className='text-tableTextColor'>{row?.customer?.full_name}</span></Regular>
                              <Regular><span className='text-tableTextColor'>{row?.insurance?.provider}</span></Regular>
                              <Regular><span className='text-tableTextColor'>{row?.insurance?.claim_number}</span></Regular>

                            </a>

                          </div>

                        </TableCell>

                        
                        <TableCell to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link}>

                          <div className='flex flex-col'>
                            

                            <a href={'#'} style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' }}>

                              <Regular><span className='text-xs text-regularGrey'>Repair Schedule</span></Regular>

                              <Regular><span className='text-tableTextColor'>August 3, 2024 - 8:00 AM</span></Regular>
                              <Regular><span className='text-xs text-regularGrey'>Estimated Completion</span></Regular>
                              <Regular><span className='text-tableTextColor'>September 30, 2024</span></Regular>

                            </a>

                          </div>

                        </TableCell>

                        <TableCell to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link}>

                          <div className='flex flex-col'>

                            <div style={{ gap: 4, marginTop: 4, flexDirection: 'column', display: 'flex' , gap : 10 }}>

                              <Regular><span className='text-xs text-regularGrey'>Workfile Status</span></Regular>
                              
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

                            </div>
                     
                            <Regular><span className='text-xs text-regularGrey mb-2'>Repair Status</span></Regular>
                              <span className='mb-2' />
                              { handleWorkfileStatusColor(row) }
                             
                            <Bold>

                            </Bold>
 
                          </div>

                        </TableCell>

                        <TableCell to={getRoute(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW, row._id)} component={Link}>
                         
                            <div className='flex flex-row gap-2 items-center'>
                              { row?.is_new_message ?
                                <React.Fragment>
                                  <span className="text-lg text-secondaryText"><RiMessage2Fill /></span>
                                  <Regular><span className='text-sm text-secondaryText'>New Message(s)</span></Regular>
                                </React.Fragment>
                              : null }
                            </div> 
                          
                        </TableCell>

                      </GradientTableRow>
                    ))}

                  </>
              }


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
              is_assigned_to_me  : userManager
            }

            debounce(
              async () =>
                await dispatch(getFilteredWorkfile(pagination)),
              1000);
          }}
        />
        {/* <Pagination page={100} className='mt-4' count={10} variant="outlined" shape="rounded" /> */}
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
      <div className='mb-16' />
    </SubContainer>
  )
}

export default Estimatics
