import React from 'react'

import MessageIcon from '@mui/icons-material/Message';
import Fab from '@mui/material/Fab';

import TextDisplay from '../Typography/TextDisplay'

import { EstimaticsImg } from '../../contants';

const TabPanelData = () => {
  return (
    
    <div className='min-h-[390px] max-h-[391px] h-full overflow-y-auto overflow-x-hidden relative'>

    <div className='absolute bottom-2 right-2'>

      <Fab color="success" aria-label="add" size="small">
        <MessageIcon />
      </Fab>

    </div>

    <div className='w-full flex flex-row items-center justify-between gap-2 p-2 border border-green-200 rounded bg-green-100 mb-2 cursor-pointer'>

      <div className='flex flex-row gap-2'>

        <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>

          <div className='flex flex-col'>

            <div className='flex flex-row gap-2 items-center'>
              <TextDisplay><span style={{ fontSize:15}}>Jane Doe</span></TextDisplay>
              <TextDisplay><span style={{ fontSize:12 , color : 'red' , fontWeight : 400 , fontStyle : 'italic'}}>Missing Photo</span></TextDisplay>
            </div>

            <TextDisplay><span style={{ fontSize:11 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></TextDisplay>

          </div>

      </div>

      <div className='flex flex-col gap-2'>

        <TextDisplay><span style={{ fontSize:13, color : 'gray' , fontWeight : 400 , fontStyle : 'italic'}}>Today, 8:30 AM</span></TextDisplay>
        <TextDisplay><span style={{ fontSize:11 , color : 'red' , fontWeight : 400 , fontStyle : 'italic'}}>Need Attention</span></TextDisplay>

      </div>

    </div>

    <div className='w-full flex flex-row items-center justify-between gap-2 p-2 border border-gray-100 rounded  mb-2 cursor-pointer'>

      <div className='flex flex-row gap-2'>

        <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>

          <div className='flex flex-col'>

            <div className='flex flex-row gap-2 items-center'>
              <TextDisplay><span style={{ fontSize:15}}>Jane Doe</span></TextDisplay>
              <TextDisplay><span style={{ fontSize:12 , color : 'red' , fontWeight : 400 , fontStyle : 'italic'}}>DTP Not Attached</span></TextDisplay>
            </div>

            <TextDisplay><span style={{ fontSize:11 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></TextDisplay>

          </div>

      </div>

      <div className='flex flex-col gap-2'>

        <TextDisplay><span style={{ fontSize:13, color : 'gray' , fontWeight : 400 , fontStyle : 'italic'}}>Today, 8:30 AM</span></TextDisplay>
        <TextDisplay><span style={{ fontSize:11 , color : '#66BE7A' , fontWeight : 400 , fontStyle : 'italic'}}>Need Attention</span></TextDisplay>

      </div>

    </div>

    <div className='w-full flex flex-row items-center justify-between gap-2 p-2 border border-gray-100 rounded  mb-2 cursor-pointer'>

      <div className='flex flex-row gap-2'>

        <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>

          <div className='flex flex-col'>

            <div className='flex flex-row gap-2 items-center'>
              <TextDisplay><span style={{ fontSize:15}}>Jane Doe</span></TextDisplay>
            
            </div>

            <TextDisplay><span style={{ fontSize:11 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></TextDisplay>

          </div>

      </div>

      <div className='flex flex-col gap-2'>

        <TextDisplay><span style={{ fontSize:13, color : 'gray' , fontWeight : 400 , fontStyle : 'italic'}}>Today, 8:30 AM</span></TextDisplay>

      </div>

    </div>

    </div>
  )
}

export default TabPanelData
