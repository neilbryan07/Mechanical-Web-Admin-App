import React from 'react'
import { useLocation, NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { pageRoutes, pageName, SidebarIcon, UserIcon, DropDownIcon, SidebarOpenerIcon } from '../../../contants'
import Header from '../../Typography/Header'
import Bold from '../../Typography/Bold'
import Regular from '../../Typography/Regular'

import { tokenStorage } from '../../../redux/Credentials/credsSlice';

import { useDispatch } from "react-redux";

import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Tooltip from '@mui/material/Tooltip';
import DrawerSideBarNew from '../Drawer/sidebarDrawer';
import CustomIconLoader from '../../Icon/CustomIconLoader';

const sidebarItem = [
  { routes: '/app/dashboard', name: pageName.DASHBOARD, icon: SidebarIcon.DASHBOARD, active: SidebarIcon.DASHBOARD_ACTIVE },
  { routes: pageRoutes.APPOINTMENT, name: 'Repair Calendar', icon: SidebarIcon.APPOINTMENT, active: SidebarIcon.APPOINTMENT_ACTIVE },
  // { routes : pageRoutes.JOBS, name : pageName.JOBS  , icon : SidebarIcon.JOBS},
  { routes: pageRoutes.CUSTOMERS, name: pageName.CUSTOMERS, icon: SidebarIcon.CUSTOMERS, active: SidebarIcon.CUSTOMERS_ACTIVE },
  { routes: pageRoutes.FRANCHISE, name: 'Franchise Regions', icon: SidebarIcon.FRANCHISE, active: SidebarIcon.FRANCHISE_ACTIVE },
  { routes: pageRoutes.TECHNICIANS, name: pageName.TECHNICIANS, icon: SidebarIcon.TECHNICIANS, active: SidebarIcon.TECHNICIANS_ACTIVE },
  { routes: pageRoutes.ESTIMATICS, name: pageName.ESTIMATICS, icon: SidebarIcon.ESTIMATICS, active: SidebarIcon.ESTIMATICS_ACTIVE },
  { routes: pageRoutes.REPORTS, name: pageName.REPORTS, icon: SidebarIcon.REPORTS, active: SidebarIcon.REPORTS_ACTIVE },
  { routes: pageRoutes.SETTINGS, name: 'Settings and Configuration', icon: SidebarIcon.SETTINGS, active: SidebarIcon.SETTINGS },
]

const sidebarItem2 = [{
  routes: '/app/dashboard',
  name: "dashboard",
  icon: SidebarIcon.DASHBOARD,
  active: SidebarIcon.DASHBOARD_ACTIVE
},
{
  routes: pageRoutes.APPOINTMENT,
  name: "appointment",
  icon: SidebarIcon.APPOINTMENT,
  active: SidebarIcon.APPOINTMENT_ACTIVE
},
{
  routes: pageRoutes.CUSTOMERS,
  name: "customer",
  icon: SidebarIcon.CUSTOMERS,
  active: SidebarIcon.CUSTOMERS_ACTIVE,
},
{
  routes: pageRoutes.FRANCHISE,
  name: 'franchise',
  icon: SidebarIcon.FRANCHISE,
  active: SidebarIcon.FRANCHISE_ACTIVE
},
{
  routes: pageRoutes.TECHNICIANS,
  name: "technician",
  icon: SidebarIcon.TECHNICIANS,
  active: SidebarIcon.TECHNICIANS_ACTIVE
},
{
  routes: pageRoutes.ESTIMATICS,
  name: "estimatics",
  icon: SidebarIcon.ESTIMATICS,
  active: SidebarIcon.ESTIMATICS_ACTIVE
},
{
  routes: pageRoutes.REPORTS,
  name: "reports",
  icon: SidebarIcon.REPORTS,
  active: SidebarIcon.REPORTS_ACTIVE
},
{
  routes: pageRoutes.SETTINGS,
  name: "settings",
  icon: SidebarIcon.SETTINGS,
  active: SidebarIcon.SETTINGS
},
]

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
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <div className={`flex flex-row`}>
          <Regular props='ml-2'>{labelText}</Regular>
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

const MiniSidebar = () => {

  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const capitalLetter = (letter) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    dispatch(tokenStorage(""));
    navigate("/")
  }

  return (
    // <div className='block bg-white border-r border-gray-300 w-full'></div>
    <div className='h-screen bg-white border-r border-gray-300 w-full'>


      {/* User */}


      <div className='fixed left-[95px] top-[11px]'>

        <DrawerSideBarNew />

      </div>

      <div className='w-full flex flex-col px-2'>

        <span className={`self-center text-mainText py-3`}><Header>LOGO</Header></span>

        <div className='border border-gray-200 rounded-md flex justify-between items-center'>

          <div className='flex flex-row p-2'>

            <img src={UserIcon} alt='icon' style={{ width: 40, height: 40 }} />

          </div>

          <div style={{ width: 15, height: 10 }} className='relative right-1'>
            <img src={DropDownIcon} alt='icon' />
          </div>

        </div>

        <span className={`text-black my-2 self-center`}><Regular>Menu</Regular></span>

      </div>

      {/* Menu */}
      <div className=''>

        {/* Menu Item */}

        {sidebarItem2.map((item, key) => {
          const routeChecking = location?.pathname?.replace("/app/", '') === item.routes?.replace("/app/", '');

          return (
            <>

              {item.name === 'customers' ?

                // <TreeView
                //   sx={{ backgroundColor:'white' }}
                //   defaultParentIcon={<img src={item.icon} alt='icon' className='ml-1 h-6 w-6' />}
                // >
                //   <StyledTreeItem nodeId="1" labelText="Customers">

                //       <RouterLink to={item.routes}>
                //         <Regular props={"text-black mt-3 mb-5 ml-10"}>{ capitalLetter('Assignments') }</Regular>
                //       </RouterLink>

                //       <RouterLink to={pageRoutes.FOLLOWUPSTATE}>
                //         <Regular props={"text-black ml-10"}>{ capitalLetter('Follow-up List') }</Regular>
                //       </RouterLink>

                //   </StyledTreeItem>

                // </TreeView>

                <div className={`flex flex-col justify-center items-center ${routeChecking ?
                  `border-r-4 border-mainText` : null}`} key={key}>

                  <Tooltip title="Assignments" placement="right-end">
                    <RouterLink to={item.routes}>
                      <div className='py-2 cursor-pointer'>
                        {/* <img src={item.icon} alt='icon'/> */}
                        <CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={item.name} />
                      </div>
                    </RouterLink>
                  </Tooltip>

                  <Tooltip title="Follow-up List" placement="right-end">
                    <RouterLink to={pageRoutes.FOLLOWUPSTATE}>
                      <div className='py-2 cursor-pointer'>
                        {/* <img src={item.icon} alt='icon'/> */}
                        <CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={item.name} />
                      </div>
                    </RouterLink>
                  </Tooltip>

                </div>

                :

                <div className={`flex flex-row justify-center items-center ${routeChecking ?
                  `border-r-4 border-mainText` : null}`} key={key}>

                  <Tooltip title={capitalLetter(item.name)} placement="right-end">
                    <RouterLink to={item.routes}>
                      <div className='py-2 cursor-pointer'>
                        {/* <img src={item.icon} alt='icon'/> */}
                        <CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={item.name} />
                      </div>
                    </RouterLink>
                  </Tooltip>

                  {/* <RouterLink to={item.routes}>
                  {
                    location?.pathname?.replace("/app/",'') === item.routes ? 
                      <Regular props='ml-2'><span className='text-mainText'>{ capitalLetter(item.name) }</span></Regular>
                    : <Regular props='ml-2'>{ capitalLetter(item.name) }</Regular>
                  }
              </RouterLink> */}

                </div>

              }

            </>
          )
        })}

        <div className={`flex flex-row justify-center items-center py-2`}>

          <Tooltip title="Log Out" placement="right-end">
            {/* <RouterLink to={pageRoutes.LOGIN}> */}
            <div className='cursor-pointer' onClick={() => logout()}>
              <img src={SidebarIcon.LOGOUT} alt='icon' />
            </div>
            {/* </RouterLink> */}
          </Tooltip>

          {/* <a href={pageRoutes.LOGIN} className='mt-1'>
            <Regular>Log Out</Regular>
          </a> */}
        </div>

      </div>

    </div>
  )
}

export default MiniSidebar
