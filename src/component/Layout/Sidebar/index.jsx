import React, { useState, useEffect , lazy, Suspense } from 'react';
import Header from '../../Typography/Header'
import Bold from '../../Typography/Bold'
import Regular from '../../Typography/Regular'
import TreeView from '@mui/lab/TreeView';
// import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeItem from '@mui/lab/TreeItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import CustomIconLoader from '../../Icon/CustomIconLoader';

import { styled } from '@mui/material/styles';
import { useLocation, NavLink as RouterLink, useNavigate, Link } from 'react-router-dom';
import { pageRoutes, pageName, SidebarIcon, UserIcon, DropDownIcon, DashboardIcons , handleManagerUser } from '../../../contants'
import { tokenStorage } from '../../../redux/Credentials/credsSlice';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from "react-redux";
import { Sidebar as LibSidebar, Menu as LibMenu, MenuItem as LibMenuItem, SubMenu } from 'react-pro-sidebar';
import { privateRoutes } from './routes';

import Badge from '@mui/material/Badge';

import { APIServices } from '../../../hooks/fetchAPI';

const Add_User = lazy(() => import('./DropdownContent/Add_User'));
const Add_Technician = lazy(() => import('./DropdownContent/Add_Technician'));
const Add_Shop = lazy(() => import('./DropdownContent/Add_Shop'));
const Add_Storm_Location = lazy(() => import('./DropdownContent/Add_Storm_Location'));

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${TreeItem?.treeItemClasses.content}`]: {
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&.MuiTreeItem-iconContainer': {
      backgroundColor: 'blue',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: 'white',
    },
    [`& .${TreeItem?.treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'black',
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelInfo,
    labelIcon: LabelIcon,
    labelText,
    labelClassName,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <div className={`flex flex-row`}>
          <Regular props={`ml-2 ${labelClassName}`}>{labelText}</Regular>
        </div>
      }
      style={{
        '--tree-view-color': 'black',
        '--tree-view-bg-color': 'black',
      }}
      {...other}
    />
  );
}


const Sidebar = ({ toggle }) => {

  let location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const capitalLetter = (letter) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    dispatch(tokenStorage(""));
    navigate("/")
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userModal, setUserModal] = useState(false);
  const [techModal, setTechModal] = useState(false);
  const [shopModal, setTShopModal] = useState(false);
  const [stormModal, setStormModal] = useState(false);

  const [ userDetails , setUserDetails ] = useState([]);
  const [ notificationDetails , setNotificationDetails ] = useState([]);

  const handleNotificationIcon = (label) => {

    switch (label) {
      case 'Work Files':
        return notificationDetails?.workFile > 0 ? <span className='bg-red-500 px-2 py text-white rounded text-xs'>{ notificationDetails?.workFile }</span> : null;
      case 'Assignments':
        return notificationDetails?.assignments > 0 ? <span className='bg-red-500 px-2 py text-white rounded text-xs'>{ notificationDetails?.assignments }</span> : null;
      case 'Insurance Partner':
        return notificationDetails?.external > 0 ? <span className='bg-red-500 px-2 py text-white rounded text-xs'>{ notificationDetails?.assignments }</span> : null;      
      case 'Shop':
        return notificationDetails?.internal > 0 ? <span className='bg-red-500 px-2 py text-white rounded text-xs'>{ notificationDetails?.assignments }</span> : null;
      case 'Audit Lists':
        return notificationDetails?.auditlist > 0 ? <span className='bg-red-500 px-2 py text-white rounded text-xs'>{ notificationDetails?.auditlist }</span> : null;
      default:
        return;
    }
  
  }

  const menuItem = (value, isChild = false) => {

    return value?.map((x) => {
      const routeChecking =  window.location.pathname.includes(x.name);
      const specificRouteChecker = window.location.pathname.toLowerCase() === x?.routes?.toLowerCase();
    
      if (  userDetails?.role === 7 && 
        x.label !== 'Repair Calendar' && 
        // x.label !== 'Follow-up List' && 
        x.label !== 'Estimatics' && 
        x.label !== 'Work Files' && 
        x.label !== 'Assignments' && 
        // x.label !== 'Insurance Partner' && 
        x.label !== 'Shop' &&
        x.label !== 'Settings and Configuration'
      ) return;
      
      if (  userDetails?.role === 6 && 
            x.label !== 'Reports' && 
            x.label !== 'Repair Calendar' && 
            x.label !== 'Follow-up List' && 
            x.label !== 'Estimatics' && 
            x.label !== 'Work Files' && 
            x.label !== 'Assignments' && 
            x.label !== 'Insurance Partner' && 
            x.label !== 'Shop' &&
            handleManagerUser(userDetails) !== true
      ) return;

      if (  userDetails?.role === 6 && 
        x.label !== 'Dashboard' && 
        x.label !== 'Repair Calendar' && 
        x.label !== 'Follow-up List' && 
        x.label !== 'Franchise Regions' && 
        x.label !== 'Technicians' && 
        x.label !== 'Estimatics' && 
        x.label !== 'Work Files' && 
        x.label !== 'Assignments' && 
        x.label !== 'Insurance Partner' && 
        x.label !== 'Shop' &&
        handleManagerUser(userDetails) === true
      ) return;

      if (  userDetails?.role === 5 && 
            x.label !== 'Estimatics' && 
            x.label !== 'Work Files' && 
            x.label !== 'Assignments' && 
            x.label !== 'Insurance Partner' && 
            x.label !== 'Shop' &&
            handleManagerUser(userDetails) !== true
      ) return;

      if (  userDetails?.role === 5 && 
        x.label !== 'Dashboard' && 
        // x.label !== 'Repair Calendar' && 
        // x.label !== 'Follow-up List' && 
        // x.label !== 'Franchise Regions' && 
        // x.label !== 'Technicians' && 
        x.label !== 'Estimatics' && 
        x.label !== 'Work Files' && 
        x.label !== 'Assignments' && 
        x.label !== 'Insurance Partner' && 
        x.label !== 'Shop' &&
        // x.label !== 'Audit Lists' &&
        handleManagerUser(userDetails) === true
      ) return;

      // debugger
      if (!x.children) {
        return (
          <LibMenuItem
            key={x.name}
            active={!isChild ? window.location.pathname === x.routes : false}
            component={<Link to={x.routes} />}
            icon={<CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={x.name} />}
          >
            <span className={(specificRouteChecker) ? 'text-[#66BE7A]' : ''}>{x.label} { handleNotificationIcon(x.label) }</span>
          </LibMenuItem>
        );
      }

      return (
        <SubMenu
          key={x.name}
          label={<span className={(routeChecking) ? 'text-[#66BE7A]' : ''}>{x.label} { handleNotificationIcon(x.label) }</span>}
          icon={<CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={x.name} />}
          component={x.routes ? <Link to={x.routes} /> : undefined}
          active={!isChild ? routeChecking || specificRouteChecker : false}
        >
            <span className={(specificRouteChecker) ? 'text-[#66BE7A]' : ''}>{menuItem(x.children, true)} </span>
        </SubMenu>
      );
    });
  };

  
  useEffect(() => {

    async function getData() {
      const res = await APIServices.get({ url: '/user/profile/me' })
      if (res && !res.error && res.data && res.data.data) {
        setUserDetails( res?.data?.data )


        const resNotification = await APIServices.get({ url: `/notification/user/${ res?.data?.data?._id }` })
        if (res && !res.error && res.data && res.data.data) {
          setNotificationDetails( resNotification?.data?.data )
        }

      }
      
    }

    getData();
  }, []);

  const handleRoleFilter = (data) => {

    if( data === 1 ) return "Corporate";
    else if( data === 2 ) return "Admin";
    else if( data === 3 ) return "Technician";
    else if( data === 4 ) return "RNI";
    else if( data === 5 ) return "Estimator";
    else if( data === 6 ) return "Auditor";
    else return "Super User";
    
  }

  const handleRoleAddNew = ( data ) => {

    if( userDetails?.role === 5 && handleManagerUser(userDetails) !== true ||  userDetails?.role === 6 && handleManagerUser(userDetails) !== true ||  userDetails?.role === 7 ) return;

    return <div 
          className={`bg-mainText py-2 px-4 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 ${toggle ? 'mr-3' : 'mx-[5px] mb-[5px]'} mt-3`}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          id="basic-button"
          onClick={handleClick}>
          <Regular><span className='text-white'>Add New</span></Regular>
      </div>

  }
  
  return (
    // <div className='block bg-white border-r border-gray-300 w-full'></div>
    // <div className='h-screen bg-white border-r border-gray-300 w-full overflow-auto'>
    <div className='flex h-screen'>
      <LibSidebar
        collapsed={!toggle}
        collapsedWidth="79px"
        backgroundColor="#ffffff"
        width='100%'
        height='100vh'
        rootStyles={{
          width: 'unset'
        }}
      >
        <div>
          {/* <div className='h-screen bg-white border-r border-gray-300 w-full'> */}
          <Suspense>
            <Add_User Usermodal={userModal} SetUserModal={setUserModal} />
          </Suspense>
 
          <Suspense>
            <Add_Technician Techmodal={techModal} SetTechModal={setTechModal} />
          </Suspense>

          <Suspense>
            <Add_Shop Shopmodal={shopModal} SetShopModal={setTShopModal} />
          </Suspense>

          <Suspense>
            <Add_Storm_Location Stormmodal={stormModal} SetStormModal={setStormModal} />
          </Suspense>
          
          {/* Logo */}
          <animated.div style={fadeIn} className='py-7 ml-5'>
            <Header>
              <span className='text-mainText'>Your Logo</span>
            </Header>
          </animated.div>

          {/* User */}
          <div className='w-full flex justify-center'>
            <div className={`w-11/12 py-3 px-2 ${toggle ? 'border border-gray-200 rounded-md' : ''}  flex justify-between`}>

              <div className='flex flex-row'>

                <img src={UserIcon} alt='icon' />

                {toggle ?
                  <animated.div style={fadeIn} className='flex flex-col ml-2 mt-1.5'>
                    <Header>{ userDetails?.first_name } { userDetails?.last_name }</Header>
                    <span className='my-0.5' />
                    <Regular>{ handleRoleFilter( userDetails?.role ) } { handleManagerUser( userDetails ) ? "(Manager)" : null }</Regular>
                  </animated.div>
                  : <></>}
              </div>
              {toggle ?
                <div style={{ width: 15, height: 10 }} className='relative top-5'>
                  <img src={DropDownIcon} alt='icon' />
                </div> : <></>}

            </div>
          </div>

          <div className='w-full flex justify-end'>
            {/* {toggle ?
              <div className={`bg-mainText py-2 px-4 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 ${toggle ? 'mr-3' : 'mx-[5px] mb-[5px]'} mt-3`}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                id="basic-button"
                onClick={handleClick}>
                <Regular><span className='text-white'>Add New</span></Regular>
              </div>
              : <></>} */}

              { toggle ? handleRoleAddNew(userDetails) : null }

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >

              <MenuItem value={10} onClick={() => setTShopModal(true)}>
                <div className='w-full flex flex-row'>
                  <img src={DashboardIcons.STOREICON} alt='icon' />
                  <span className='ml-2 mt-1'>Shop</span>
                </div>
              </MenuItem>

              <MenuItem value={40} onClick={() => setStormModal(true)}>
                <div className='w-full flex flex-row'>
                  <img src={DashboardIcons.STORMLOCATION} alt='icon' />
                  <span className='ml-2 mt-1'>Storm Location</span>
                </div>
              </MenuItem>

              <MenuItem value={30} onClick={() => setUserModal(true)}>
                <div className='w-full flex flex-row'>
                  <img src={DashboardIcons.USERGROUPS} alt='icon' />
                  <span className='ml-2 mt-1'>Users</span>
                </div>
              </MenuItem>

              <MenuItem value={20} onClick={() => setTechModal(true)}>
                <div className='w-full flex flex-row'>
                  <img src={DashboardIcons.GEARICON} alt='icon' />
                  <span className='ml-2 mt-1'>Technician</span>
                </div>
              </MenuItem>

            </Menu>

          </div>

          {/* Menu */}
          <div>
            {toggle ?
              <div className={`${toggle ? 'py-2 ml-7' : 'ml-5'} mb-4`}>
                <Bold>Menu</Bold>
              </div>
              : <></>}
            {/* Menu Item */}

            {/* {sidebarItem2.map((item, key) => (
          menu(item)
        ))} */}


            <LibMenu
              menuItemStyles={{
                button: {
                  [`&.ps-active`]: {
                    backgroundColor: '#D1ECD7',
                    color: '#66BE7A',
                    borderRight: 4,
                    borderRightColor: '#66BE7A',
                    borderRight: '4px solid #66BE7A',
                  },
                },
              }}
            >
              {menuItem(privateRoutes)}
              <LibMenuItem
                icon={<img src={SidebarIcon.LOGOUT} alt='icon' className='mr-2' />}
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </LibMenuItem>
            </LibMenu>


            {/* <animated.div style={fadeIn} className='ml-2 py-3 flex flex-row items-center' >
          <div className='w-[24] h-[24]'>
            <img src={SidebarIcon.LOGOUT} alt='icon' className='mr-2' />
          </div>

          <div className='flex items-center'>
            <a href={""} className=' ml-2' onClick={() => logout()}>
              <Regular>Log Out</Regular>
            </a>
          </div>
        </animated.div> */}
          </div>
        </div>
      </LibSidebar>
    </div>
  )
}

export default Sidebar
