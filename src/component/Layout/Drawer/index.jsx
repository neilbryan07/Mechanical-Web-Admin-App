import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { BiMenu } from "react-icons/bi";
import Sidebar from '../Sidebar';
import { BsBox } from 'react-icons/bs';

const DrawerSideBar = () => {

    const [state, setState] = useState(false);

    const handleButton = (open) => {
        setState(open);
    }

    return (

        <div>

            <span className='cursor-pointer' onClick={() => handleButton(true)} style={{ fontSize: 23 }}> <BiMenu /> </span>

            <Drawer open={state} onClose={() => handleButton(false)} >
                <Sidebar toggle={true}/>
            </Drawer>
        </div>
    )
}

export default DrawerSideBar
