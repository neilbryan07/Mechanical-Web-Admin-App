import React , { useState } from 'react'

import { useNavigate, useRoutes , useLocation  } from 'react-router-dom';

import Header from '../../Typography/Header'
import Regular from '../../Typography/Regular'
import DrawerSideBar from '../Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {InboxIcon, BellIcon , DashboardIcons} from "../../../contants/index";

import { HiDotsHorizontal } from "react-icons/hi";

import { MdArrowBackIosNew } from "react-icons/md";

// import { useSelector, useDispatch } from "react-redux";
// import { selectLayout, sideBarStatus } from "../../../redux/Layout/layoutSlice";


// import { BiMenu } from "react-icons/bi";

const MenuHeader = ({ children }) => (
  <Box sx={{ px: 2, py: 2, borderBottom: '1px solid #eee' }}> {/* Styling here */}
    <Typography>
      {children}
    </Typography>
  </Box>
);

const MenuFooter = ({ children }) => (
  <Box sx={{ px: 2, py: 2, borderTop: '1px solid #eee' }}> {/* Styling here */}
    <Typography>
      {children}
    </Typography>
  </Box>
);

const PageHeader = ({ name, description , dashboard = false , dashboardType = null , setButton = null , returnBotton = null , routes = null  }) => {

  const navigate = useNavigate();
  const location = useLocation();

  // const dispatch = useDispatch();
  // const business = useSelector(selectLayout);

  // const handleButton = () => {
  //   let data = business.sideBarValue ? false : true;
  //   dispatch( sideBarStatus(data) );
  // }

  const [ readAll , setReadAll ] = useState(true);

  const [ testData , setTestData ] = useState([
    { "Image" : false },
    { "Image" : false },
    { "Image" : true },
    { "Image" : true },
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = () => {
  }

  return (
    <div className='w-full flex justify-between'>
          
          {/* <div className='flex flex-col max-[1300px]:hidden'>
            
            <Header>{name}</Header>
            <span className={`text-regularText my-2`}><Regular>{description}</Regular></span>

          </div> */}

          {/* <div className='hidden max-[1300px]:flex max-[1300px]:flex-row max-[1300px]:gap-2 '> */}
          <div className='flex flex-row gap-2 mt-4'>

            {/* <span className='cursor-pointer' onClick={ () => handleButton() } style={{ fontSize:23}}><BiMenu/></span> */}
            
            <div className='min-[1301px]:hidden'>
                <DrawerSideBar/>
            </div>
     
            <div className='flex flex-row gap-3'>

              <div className='flex flex-col'>
                <div className='flex flex-row items-center gap-2'>
                  { returnBotton && ( <span onClick={ () => navigate(routes) } className='text-lg ml-2 cursor-pointer'><MdArrowBackIosNew/></span>) }
                  <Header>{name}</Header>
                </div>
      
                <span className={`text-regularText my-2`}><Regular>{description}</Regular></span>
              
              </div>

              { dashboard &&  

              <div className='flex flex-row gap-3'>
                
                <Regular>
                  <span onClick={() => setButton('home') } className={ dashboardType === 'home' ? `cursor-pointer bg-mainText text-white px-3 py-2 rounded-lg text-xs` : `cursor-pointer text-mainText text-sm`}>Home</span>
                </Regular>

                <Regular>
                  <span onClick={() => setButton('estimatics') }  className={ dashboardType === 'estimatics' ? `cursor-pointer bg-mainText text-white px-3 py-2 rounded-lg text-xs` : `cursor-pointer text-mainText text-sm`}>Estimatics</span>
                </Regular>

              </div> }

            </div>


          </div>

           <div className='flex flex-row gap-4 mt-4'>

            <div style={{ width:40, height:40 }} className='bg-white flex justify-center items-center rounded-full border border-zinc-300 cursor-pointer'>
                <img src={InboxIcon} alt='icon'/>
            </div>

            <div
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              // onClick={ () => handleNotificationOpen() } 
             style={{ width:40, height:40 }} className='bg-white hover:bg-gray-200 flex justify-center items-center rounded-full border border-zinc-300 cursor-pointer'>
                <img src={BellIcon} alt='icon'/>
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  maxWidth: 500, // Your desired max width
                  width: '100%' // Ensure it doesn't exceed the available space
                },
              }}
            >
              <MenuHeader>
                <div className='w-full flex flex-row items-center justify-between'>
                  <h1 className='text-sm text-black font-interFont font-semibold'>Notification (5)</h1>
                  <span onClick={ () => setTestData([]) } className='text-blue-600 text-xs font-interFont cursor-pointer'>Mark all as read</span>
                </div>
              </MenuHeader>

              { testData?.map((file, index) => (

                <MenuItem sx={{ backgroundColor : readAll ? '#E5E7EB' : null }}>
                <div className={`w-full flex flex-row items-center justify-between`}>

                  <div className='flex flex-row items-center gap-2'>

                    <img src={ !file?.Image ? DashboardIcons?.NOTIFYMESSAGE : DashboardIcons?.NOTIFYWARNING} alt='icon'/>

                    <div className='flex flex-col'>

                      <h1 className='text-sm text-black font-interFont font-semibold'>Notification (5)</h1>
                      <p className='text-gray-500 font-light text-xs font-interFont cursor-pointer line-clamp-2 overflow-wrap-break-word'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p className='text-gray-500 font-light text-xs font-interFont cursor-pointer'>Today, Jan 16, 2024 8:30 AM</p>

                    </div>


                  </div>

                  <div className="text-lg text-black font-semibold cursor-pointer">
                    <HiDotsHorizontal />
                  </div>

                </div>

                </MenuItem>

              ))}

              <MenuFooter>
                <div className='w-full flex flex-row items-center justify-center'>
                  <span className='text-blue-700 text-xs font-interFont cursor-pointer underline'>See more notification</span>
                </div>
              </MenuFooter>

            </Menu>
   
          </div>
    </div>
  
  )
}

export default PageHeader
