import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Sidebar from '../Sidebar';
// import MiniSidebar from '../Sidebar/mini-sidebar';
import Regular from '../../Typography/Regular';

import { SidebarOpenerIcon } from '../../../contants';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { privateRoutes } from '../Sidebar/routes';
import CustomIconLoader from '../../Icon/CustomIconLoader';

const Container = () => {

  const [width, setWidth] = useState('300px');
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {

    if (localStorage.getItem('access_token') === null) {
      navigate("/")
    }
  }, []);


  const handleToggle = () => {

    setToggle(current => !current)
    setWidth(!toggle ? '300px' : '107px');

  }

  // const menuItem = (value, isChild = false) => {
  //   return value?.map((x) => {
  //     const routeChecking = window.location.pathname.includes(x.routes);

  //     if (!x.children) {
  //       return (
  //         <MenuItem
  //           key={x.name}
  //           active={!isChild ? window.location.pathname === x.routes : false}
  //           component={<Link to={x.routes} />}
  //           icon={<CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={x.name} />}
  //         >
  //           {x.label}
  //         </MenuItem>
  //       );
  //     }

  //     return (
  //       <SubMenu
  //         key={x.name}
  //         label={x.label}
  //         icon={<CustomIconLoader color={routeChecking ? '#66BE7A' : '#000000'} iconType={x.name} />}
  //         active={!isChild ? routeChecking : false}
  //       >
  //         {menuItem(x.children, true)}
  //       </SubMenu>
  //     );
  //   });
  // };

  return (
    <>
      <div className='flex bg-gray-100 w-full h-full overflow-hidden'>

        <div className={`transition-width duration-700 ease-in-out ${toggle ? 'max-w-[300px]' : 'max-w-[79px]'} block w-full max-[1300px]:hidden`}>

          <div className={`fixed top-[11px] transition-all duration-700 ease-in-out ${toggle ? 'left-[290px]' : 'left-[68px]'} z-10	`}>

            <span className='cursor-pointer' style={{ fontSize: 23 }} onClick={handleToggle}>
              <img src={SidebarOpenerIcon} alt='icon' style={{ width: 20, height: 20 }} />
            </span>

          </div>

          {/* <div className='flex h-screen'>
            <Sidebar
              collapsed={!toggle}
              collapsedWidth="79px"
              backgroundColor="#ffffff"
              width='100%'
              height='100%'
            >
              <Menu
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
              </Menu>
            </Sidebar>
          </div> */}
          <Sidebar toggle={toggle} />

          {/* {width === '107px' ?
          <MiniSidebar />
          :
          <Sidebar />
        } */}

          {/* <div class={`${miniDisplay}`}>
                
              </div> */}

        </div >

        <div className='flex flex-auto flex-col overflow-hidden pr-3'>

          <div className='flex flex-auto overflow-hidden pl-3'>
            <Outlet />
          </div>

          <div className='bg-white w-full p-3 fixed bottom-0.5'>
            <Regular>© 2024 Integrated Claims Estimating (ICE) All rights reserved</Regular>
          </div>

        </div>

      </div >
    </>
  )
}

export default Container

