import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../../../../component/Typography/Header'

import ModalDefault from '../../../../component/Modal/ModalDefault'

import { EstimaticsImg } from '../../../../contants'

import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics'

import UploadedFilesModal from './UploadedFilesModal'

// import { APIServices } from '../../../../hooks/fetchAPI'

import { Alert, AlertTitle, CircularProgress } from '@mui/material';

import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload'

const ConfirmationPayment = ({ file, ModalToggle, Toggle, getCustomer }) => {

  const { id } = useParams();

  const [fileUpload, setFileUpload] = useState(null)
  const [viewFile, setViewFile] = useState(false);
  const [imageToView, setImageToView] = useState(false)

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (Toggle) {
      setFileUpload(null)
    }

  }, [Toggle]);

  const handleImageViewUpload = (data) => {
    setViewFile(true)
    setImageToView(data)
  }

  const handleSubmit = async () => {
    setLoading(true);
    const formDatas = new FormData();
    formDatas.append('file', fileUpload);

    const res = await APIServicesFileUpload.post({ url: `workfile/upload/file/payment/${id}`, payload: formDatas })

    if (res.status === 200) {
      setSuccess(true);
      setTimeout(function () {
        setLoading(false);
        getCustomer();
      }, 1500);

    }

  }

  return (
    <ModalDefault
      title={"Confirmation Payment"}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'w-[35%] h-[50%]'}
    >
      <div className='px-4'>
        <DragAndDropEstimatics SetFiles={setFileUpload} limitText="Image files e.g. JPG, PNG and PDF" isImage={true} pdfOnly={true} />
        <UploadedFilesModal ImageView={imageToView} ModalToggle={setViewFile} Toggle={viewFile} />
        <br />

        <Header>Added Files</Header> <br />


        {fileUpload ?

          fileUpload?.type === 'application/pdf' ?
            <div className='flex flex-col items-center'>

              <a href={URL.createObjectURL(fileUpload)} target='_blank' className='flex flex-col items-center'>
                <img src={EstimaticsImg.PDF_ICON} alt='icon' width={70} height={70} />
                {fileUpload.name}
              </a>
            </div>
            :

            <div className='flex flex-col items-center cursor-pointer' onClick={() => handleImageViewUpload(URL.createObjectURL(fileUpload))}>
              <img src={URL.createObjectURL(fileUpload)} style={{ height: '137px', width: '183.2px' }} />
            </div>

          : null

        }

        {file &&
          <React.Fragment>
            <br /> <Header>Uploaded Files</Header> <br />
            <a target='_blank' href={`https://ice-api1.com/public/files/payment/${file}`}><span className='text-blue-500 underline text-[#0098F9]'>{file}</span></a> <br /><br />
          </React.Fragment>}

        {success ?
          <Alert className='my-5' severity="success">
            <AlertTitle>Successfully Added</AlertTitle>
          </Alert>
          : null}

        <div className='w-full flex justify-end pb-3'>
          <div className='flex flex-row items-center gap-10'>

            {!loading ?
              <span className='text-gray-600 cursor-pointer' onClick={() => ModalToggle(false)}>
                <Header>Cancel</Header>
              </span>
              :
              <span className='text-gray-300'>
                <Header>Cancel</Header>
              </span>
            }

            {fileUpload ?

              <div onClick={() => handleSubmit()} className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                <Header>Save {loading && <span className='text-white ml-2'><CircularProgress size={15} color="inherit" /></span>}</Header>
              </div>

              :

              <div className='flex items-center justify-center py-3 px-20 bg-gray-200 rounded-md text-white'>
                <Header>Save</Header>
              </div>
            }

          </div>
        </div>

      </div>
    </ModalDefault>

  )
}

export default ConfirmationPayment
