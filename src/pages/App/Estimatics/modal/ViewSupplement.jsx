import React , { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

import Header from '../../../../component/Typography/Header'

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';

import { EstimaticsImg } from '../../../../contants'

import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics'

import UploadedFilesModal from './UploadedFilesModal'

// import { APIServices } from '../../../../hooks/fetchAPI'
import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload';
import { Alert, AlertTitle , CircularProgress } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';

const ViewSupplement = ({ getCustomer , ModalToggle , Toggle , file }) => {

    const handleFileTypeIcon = ( data ) => {

      if ( data?.file?.toLowerCase().endsWith('.pdf') ) return EstimaticsImg.PDF_ICON
    
      else if ( data?.file?.toLowerCase().endsWith('.awf')) return EstimaticsImg.ADOBEICON
    
      else return EstimaticsImg.IMAGEICON

    }
    
  return (
    <ModalDefault 
        title={"View Supplement Files"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[25%] h-[25%]'}
    >
      <div className='px-4'> 

        { file?.supplement_files?.map((item ,key ) => (
          <React.Fragment key={key}>
          <Card props={"mb-6"}>

            <div className='w-full flex flex-row items-center justify-between gap-2'>

              <div className='flex flex-row items-center gap-2'>

                <img
                  src={ handleFileTypeIcon( item  ) }
                  alt="icon"
                  width={50}
                  height={50}
                />

                <div className='flex flex-col'>
                  <span className='text-black text-sm'>{ item?.file }</span>
                  <a target='_blank' href={`https://ice-api1.com/public/files/estimate/${item?.file}`}><span className='text-blue-500 underline text-[#0098F9]'>{ item?.file }</span></a>
                </div>

              </div>

            </div>

          </Card>
          </React.Fragment>
          )) }     

           
        <div className='w-full flex justify-end pb-3'>
          <div className='flex flex-row items-center gap-10'>
            
            <span className='text-gray-600 cursor-pointer' onClick={ () => ModalToggle(false) }>
              <Header>Close</Header>
            </span>

          </div>
        </div>
 
      </div>
    </ModalDefault>
   
  )
}

export default ViewSupplement
