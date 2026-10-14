import React , { useState , useEffect} from 'react'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Switch from '@mui/material/Switch';

import Card from '../../../../../../component/Card/Card';

import ModalDefault from '../../../../../../component/Modal/ModalDefault';
import Header from '../../../../../../component/Typography/Header';

import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";

import UploadedFilesModal from '../../UploadedFilesModal';

const LT_RT_Fuel = ({ selectedData , ModalToggle , Toggle , type = "Left" }) => {

    const base_url_fender = "https://ice-api1.com/public/images/workfile/techsheet/" ;

    const [ viewFile ,  setViewFile] = useState(false);
    const [ imageToView, setImageToView] = useState(null);

    const handleImageViewUpload = (data) => {
        setViewFile(true)
        setImageToView(data)
    }

  return (
    <ModalDefault 
      title={type === 'Left' ? 'Left Fuel Door' : 'Right Fuel Door'}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'max-w-[500px] w-full max-h-[500px] h-full'}
    >
        <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/>

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

export default LT_RT_Fuel
