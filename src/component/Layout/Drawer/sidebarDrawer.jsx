import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Sidebar from '../Sidebar';
import { SidebarOpenerIcon } from '../../../contants';

const DrawerSideBarNew = () => {

    const [state, setState] = useState(false);

    const handleButton = (open) => {
        setState(open);
    }

    return (

        <div>

            {/* <span className='cursor-pointer' onClick={ () => handleButton(true) } style={{ fontSize:23}}> 
        <img src={SidebarOpenerIcon} alt='icon' style={{ width: 20, height: 20 }}/>
    </span> */}

            <Drawer open={state} onClose={() => handleButton(false)} >
                <Sidebar toggle={false} />
            </Drawer>
        </div>
    )
}

export default DrawerSideBarNew
