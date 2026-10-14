import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../../../component/Card/Card';
import Header from '../../../../component/Typography/Header';
import ModalDefault from '../../../../component/Modal/ModalDefault';
import { EstimaticsImg } from '../../../../contants';
import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics';
import UploadedFilesModal from './UploadedFilesModal';
import MultiFileUpload from '../../../../component/DragAndDrop/MultiFileUpload';

import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload';
import { APIServices } from '../../../../hooks/fetchAPI';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { FaRegImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Upload_Supplement_Request = ({ getCustomer, ModalToggle, Toggle, file , profileMe }) => {

  const { id } = useParams();

  const [fileUploads, setFileUploads] = useState([]); // Supports multiple files
  const [viewFile, setViewFile] = useState(false);
  const [imageToView, setImageToView] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Toggle) {
      setFileUploads([]);
    }
  }, [Toggle]);

  const handleSubmit = async () => {

    if (fileUploads.length === 0) return;

    setLoading(true);
    const formDatas = new FormData();

    fileUploads.forEach((file) => {
      formDatas.append('files', file);
    });

    const res = await APIServicesFileUpload.put({
      url: `workfile/supplement/request/${id}`,
      payload: formDatas,
    });

    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        getCustomer();
      }, 1500);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const handleFileTypeIcon = ( data ) => {

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
 
    if ( data.type === 'application/pdf') return EstimaticsImg.PDF_ICON

    else if ( data?.name?.toLowerCase().endsWith('.awf')) return EstimaticsImg.ADOBEICON

    else if (validImageTypes?.includes(data?.type)) return EstimaticsImg.IMAGEICON

    else return EstimaticsImg.UserImage
  }

  const handleUploadedTypeIcon = ( data ) => {

    let fileUrl = "https://ice-api1.com/public/files/workfile/supplement_request/";
    const parts = data?.split('.');
    let fileExtention = parts?.[parts?.length - 1];

    if ( fileExtention === 'pdf') return EstimaticsImg.PDF_ICON
    else if ( fileExtention === 'AWF' ) return EstimaticsImg.ADOBEICON
    else return `${fileUrl}/${ data }`;

  }


  const handleRemoveFileUpload = async ( data ) => {

    const res = await APIServices.deleted({ url: `workfile/supplement/request/remove/photo/${id}/${data}` });
    if (res.status === 200) {
      getCustomer();
    }

  }

  const handleRemoveUploadedFile = async ( data ) => {

    const newItems = [...fileUploads];
    newItems.splice(data, 1);
    setFileUploads( newItems )

  }

  return (
    <ModalDefault
      title="Supplement Requests"
      toggle={Toggle}
      setToggle={ModalToggle}
      size="w-[35%] h-[50%]"
    >
      <div className="px-4">
        <MultiFileUpload
          SetFiles={setFileUploads}
          // limitText="PDF Only"
          pdfOnly={false}
        />
        <UploadedFilesModal
          ImageView={imageToView}
          ModalToggle={setViewFile}
          Toggle={viewFile}
        />
        <br />

        <Header>Added Files</Header>
        <br />

        {fileUploads.length > 0 ? (
          fileUploads.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
           
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src={ handleFileTypeIcon(file) }
                  alt="icon"
                  width={70}
                  height={70}
                />

              </a>

              <div className='flex flex-row items-center gap-2'>
                  {file.name}
                  <span onClick={ () => handleRemoveUploadedFile( index ) } className='text-red-500 text-[25px] cursor-pointer hover:text-red-800'>
                      <IoMdCloseCircle/>
                    </span>
                </div>

              <br/>

            </div>
          ))
        ) : (
          <p>No files added yet.</p>
        )}

        <br />
        <Header>Uploaded Files</Header>
        <br />
 
        {file?.map((item, key) => (
          <React.Fragment key={key}>

            {/* <div className='flex flex-col w-full gap-2'>
              <span className="text-black text-md">
                {item?.request_status}
              </span>
              {item?.files?.map((item, key) => ( 

                <a target="_blank"
                  href={`https://ice-api1.com/public/files/workfile/supplement_request/${item}`}
                  rel="noopener noreferrer"
                >
                  <span className="text-blue-500 underline text-[#0098F9]">
                    {item}
                  </span>

                </a>

              ))}

            </div>
            <br /> */}
      
            {item?.files?.map(( photoItems , key) => ( 

              <Card props={"mb-6"} key={ key }>

                <div className='flex flex-row items-center justify-between w-full gap-2'>

                  <div className='flex flex-row items-center gap-2'>

                  <a target="_blank"
                  href={`https://ice-api1.com/public/files/workfile/supplement_request/${photoItems}`}
                  rel="noopener noreferrer"
                  >
                    <img
                      src={ handleUploadedTypeIcon( photoItems ) }
                      alt="icon"
                      width={50}
                      height={50}
                    />


                  </a>
   
                    <div className='flex flex-col'>
                        <span className='text-sm text-black'>{item?.request_status}</span>
                        <span className='text-blue-400 text-[10px]'>{ photoItems }</span>
                    </div>

                  </div>

                  { profileMe?.role !== 7 ?
                  <span onClick={ () => handleRemoveFileUpload( photoItems ) } className='text-red-500 text-[25px] cursor-pointer hover:text-red-800'>
                    <IoMdCloseCircle/>
                  </span> : null }
                  
                </div>

              </Card>

            ))}
            
          </React.Fragment>
        ))}

        {success && (
          <Alert className="my-5" severity="success">
            <AlertTitle>Successfully Added</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert className="my-5" severity="error">
            <AlertTitle>Please Try Again</AlertTitle>
          </Alert>
        )}

        <div className="flex justify-end w-full pb-3">
          <div className="flex flex-row items-center gap-10">

            { !loading ?
              <span className='text-gray-600 cursor-pointer' onClick={ () => ModalToggle(false) }>
                <Header>Cancel</Header>
              </span>
              :
              <span className='text-gray-300'>
                <Header>Cancel</Header>
              </span>
            }


            {fileUploads.length > 0 ? (
              <div
                onClick={handleSubmit}
                className="flex items-center justify-center px-20 py-3 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition"
              >
                <Header>
                  Save{' '}
                  {loading && (
                    <span className="ml-2 text-white">
                      <CircularProgress size={15} color="inherit" />
                    </span>
                  )}
                </Header>
              </div>
            ) : (
              <div className="flex items-center justify-center px-20 py-3 text-white bg-gray-200 rounded-md">
                <Header>Save</Header>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalDefault>
  );
};

export default Upload_Supplement_Request;
