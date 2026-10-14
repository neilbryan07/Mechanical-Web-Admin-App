import React , { useState , useEffect} from 'react'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Switch from '@mui/material/Switch';

import Card from '../../../../../../component/Card/Card';

import ModalDefault from '../../../../../../component/Modal/ModalDefault';
import Header from '../../../../../../component/Typography/Header';

import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";

import UploadedFilesModal from '../../UploadedFilesModal';

import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from '../../../../../../contants/StaticData';

import { handleCR , handleUpCharge } from '../../../../../../contants';

const base_url_lt_fender = "https://ice-api1.com/public/images/workfile/lt_fender";

const LT_RT_RearDoor = ({ selectedData , ModalToggle , Toggle , type = "Left" }) => {

    const base_url_fender = "https://ice-api1.com/public/images/workfile/techsheet/" ;

    const [ viewFile ,  setViewFile] = useState(false);
    const [ imageToView, setImageToView] = useState(null);

    const handleImageViewUpload = (data) => {
        setViewFile(true)
        setImageToView(data)
    }

  return (
    <ModalDefault 
      title={type === 'Left' ? 'Left Rear Door' : 'Right Rear Door'}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'max-w-[500px] w-full max-h-[500px] h-full'}
    >
        <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/>
        <div className='w-full flex flex-row px-4'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Up Charge</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>• { handleUpCharge(selectedData?.up_charge) }</span>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>• {selectedData?.up_charge ? "HSS / Aluminum" : null}</span>
                </div>

        </div>  

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Count</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.count}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Size</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.size}</span>
                </div>

        </div>  

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>OS</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.oversize}</span>
                </div>

        </div>
             
        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>CR</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: { handleCR(selectedData?.conventional_repair_hour) }</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Door</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.door}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Belt Molding</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.belt_molding}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Upper Molding</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.upper_molding}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Applique</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.applique}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Int Trim Panel</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.int_trim_panel}</span>
                </div>

        </div>

        <div className='w-full flex flex-row px-4 items-center'>

                <div className='w-6/12'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Door Glass</span>
                </div>

                <div className='w-6/12 flex flex-col'>
                    <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>: {selectedData?.door_glass}</span>
                </div>

        </div>

        
        <div className='w-full flex flex-row px-4 items-center '>

            <div className='w-full'>
                <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>Blend</span>
            </div>

            <div className='w-full flex flex-col items-center'>
                {/* <Switch defaultChecked={selectedData?.blend} color="success" size="small"  /> */}

                <FormControlLabel
                    control={<IOSSwitch defaultChecked={selectedData?.blend} size="small" disabled  />}
                />
            </div>

        </div>

        <div className='w-full px-4 mt-5'>
            <Header>Uploaded Photos</Header>

            <div className='flex flex-row flex-wrap gap-4 items-center my-5'>
                {selectedData?.photo?.map((column) => (
                    <div className='cursor-pointer' onClick={ () => handleImageViewUpload(`${base_url_fender}/${column}`) }>
                        <img src={`${base_url_fender}/${column}`} alt='icon'  className=' w-[8rem] h-[8rem]' />
                        {/* <img src={`${base_url_fender}/${column}`} alt='icon' style={{ height : '70px' , width : '70px' }}/> */}
                    </div>
                ))}
            </div>

        </div>

        <div className='w-full px-4 mt-5'>
            <Header>Notes</Header>

            <Card props={"my-5"}>
                <span style={{ fontSize:14}} className='text-gray-700 font-semibold'>{selectedData?.note}</span>
            </Card>

        </div>

    </ModalDefault>
   
  )
}

export default LT_RT_RearDoor
