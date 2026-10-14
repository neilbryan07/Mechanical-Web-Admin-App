import React , { useState , useEffect} from 'react'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import ModalDefault from '../../../../component/Modal/ModalDefault'

import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";

const UploadedFilesModal = ({ ImageView , ModalToggle , Toggle }) => {

  return (
    <ModalDefault 
      title={"View Part Image"}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'w-[90%]'}
    >
      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>

              <div className="tools flex flex-row gap-6 justify-center mb-3">
                <button className='bg-gray-200 px-5 py-1 flex items-center text-xl rounded-lg text-black' onClick={() => zoomIn()}><HiOutlineZoomIn/></button>
                <button className='bg-gray-200 px-5 py-1 flex items-center text-xl rounded-lg text-black' onClick={() => zoomOut()}><HiOutlineZoomOut/></button>
                <button className='bg-gray-200 px-5 py-1 flex items-center text-xl rounded-lg text-black' onClick={() => resetTransform()}><RiCloseCircleFill/></button>
              </div>

              <div className='px-4 py-3 drop-shadow-xl bg-gray-200 flex items-center justify-center'>
                <div className='bg-white rounded-lg'>
                  <TransformComponent>
                    <img src={ImageView}/>
                  </TransformComponent>
                </div>
              </div>

          </React.Fragment>
        )}
      </TransformWrapper>
   

      {/* <div className='px-4'>
        <img src={ImageView}/>
      </div> */}

    </ModalDefault>
   
  )
}

export default UploadedFilesModal
