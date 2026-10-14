import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../../../../component/Typography/Header'

import ModalDefault from '../../../../component/Modal/ModalDefault'

import { EstimaticsImg } from '../../../../contants'

import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics'

import UploadedFilesModal from './UploadedFilesModal'

// import { APIServices } from '../../../../hooks/fetchAPI'
import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';

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

const UploadScopeEstimate = ({ getCustomer, ModalToggle, Toggle, file }) => {

  const { id } = useParams();

  const [fileUpload, setFileUpload] = useState(null)
  const [viewFile, setViewFile] = useState(false);
  const [imageToView, setImageToView] = useState(false)

  const [possibleTl, setPossibleTL] = useState(null);
  const [thresholdPercent, setThresholdPercent] = useState(null);
  const [estimateAmmount, setEstimateAmmount] = useState(null);


  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const [userType, setUserType] = useState(file?.estimate_supplement_type ? file?.estimate_supplement_type : null);

  useEffect(() => {

    if (Toggle) {
      setFileUpload(null)
    }

  }, [Toggle]);

  const handleSubmit = async () => {

    if (fileUpload?.name.toLowerCase().endsWith('.awf') && userType === 'Mitchell') {
      setErrors(true);
      return;
    }

    setLoading(true);

    const formDatas = new FormData();
    formDatas.append('file', fileUpload);
    formDatas.append('estimate_supplement_type', userType);
    formDatas.append('other_info_threshold_percent', userType !== 'AWF' ? thresholdPercent : '');
    formDatas.append('other_detail_possible_tl', userType !== 'AWF' ? possibleTl : '');
    formDatas.append('estimate_amount', estimateAmmount);


    const res = await APIServicesFileUpload.post({ url: `workfile/upload/file/estimate/${id}`, payload: formDatas })

    if (res.status === 200) {
      setSuccess(true);
      setErrors(false);
      setTimeout(function () {
        setLoading(false);
        getCustomer();
      }, 1500);

    }

  }

  const handleChange = (event) => {
    setUserType(event.target.value);
    if (event.target.value === 'Mitchell') alert('Please be sure that you have pressed commit and send within Mitchell');
  }

  const options = [
    { value: 'CCC', label: 'CCC' },
    { value: 'Mitchell', label: 'Mitchell' },
    // { value: 'AWF', label: 'AWF' },
  ]


  return (
    <ModalDefault
      title={"Upload Estimate"}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'w-[35%] h-[50%]'}
    >
      <div className='px-4'>

        <span className='text-gray-600 text-sm mb-5'>Please choose which type of Estimate you are uploading.</span>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="Type"
            onChange={handleChange}
            readOnly={file?.estimate_supplement_type ? true : false}
          >

            {options.map(item => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}

          </Select>

        </FormControl> <br /> <br />

        {userType !== 'AWF' &&
          <div className='mb-5 gap-2'>

            <span className='text-black text-md'>Possible T/L</span>

            <FormControl fullWidth>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={possibleTl}
                onChange={e => { setPossibleTL(e.target.value) }}
              >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
                <MenuItem value={'Total Loss'}>Total Loss</MenuItem>
              </Select>

            </FormControl>
          </div>
        }

        {userType !== 'AWF' &&
          <div className='my-3 gap-2'>
            <span className='text-black text-md'>Threshold Percent</span>
            <TextField id="outlined-basic" variant="outlined" fullWidth type="number" onChange={e => setThresholdPercent(e?.target?.value)} />
          </div>
        }

        <div className='my-3 gap-2'>
          <span className='text-black text-md'>Estimate Amount</span>
          <TextField id="outlined-basic" variant="outlined" fullWidth type="estimate" onChange={e => setEstimateAmmount(e?.target?.value)} />
        </div>

        {/* <div className='my-3 gap-2'>
              <span className='text-black text-md'>Initial Estimate</span>
              <TextField id="outlined-basic" variant="outlined" fullWidth type="number"/>
            </div> */}

        <DragAndDropEstimatics SetFiles={setFileUpload} limitText="PDF and AWF Only" pdfOnly={true} />
        <UploadedFilesModal ImageView={imageToView} ModalToggle={setViewFile} Toggle={viewFile} />
        <br />

        <Header>Added Files</Header> <br />

        {fileUpload ?

          fileUpload?.type === 'application/pdf' || fileUpload?.name.toLowerCase().endsWith('.awf') ?
            <div className='flex flex-col items-center'>

              <a href={URL.createObjectURL(fileUpload)} target='_blank' className='flex flex-col items-center'>

                <img src={
                  fileUpload?.type === 'application/pdf' ? EstimaticsImg.PDF_ICON : EstimaticsImg.ADOBEICON
                } alt='icon' width={70} height={70} />

                {fileUpload.name}
              </a>
            </div>
            :

            <div className='flex flex-col items-center'>
              <Alert className='my-5' severity="error">
                <AlertTitle>Only accept PDF and AWF file</AlertTitle>
              </Alert>
            </div>

          : null

        }

        {/* <br/> <Header>Uploaded Files</Header> <br/>

            <span className='text-blue-500 underline text-[#0098F9]'>{ file }</span> <br/><br/> */}

        {/* { file && 
            <React.Fragment>
              <br/> <Header>Uploaded Files</Header> <br/>
              <a target='_blank' href={`https://ice-api1.com/public/files/estimate/${file}`}><span className='text-blue-500 underline text-[#0098F9]'>{ file }</span></a> <br/><br/>
            </React.Fragment> } */}

        {file?.estimate_file &&
          <React.Fragment>
            <br /> <Header>Uploaded Files</Header> <br />

            <div className='flex flex-row gap-3'>
              <span className='text-black font-semibold text-md'>Type: </span>
              <span className='text-black font-bold text-md'>{file?.estimate_supplement_type}</span>
            </div>

            <a target='_blank' href={`https://ice-api1.com/public/files/estimate/${file?.estimate_file}`}><span className='text-blue-500 underline text-[#0098F9]'>{file?.estimate_file}</span></a> <br /><br />
          </React.Fragment>}

        {success ?
          <Alert className='my-5' severity="success">
            <AlertTitle>Successfully Added</AlertTitle>
          </Alert>
          : null}

        {errors ?
          <Alert className='my-5' severity="error">
            <AlertTitle>Error: Unsupported File Type</AlertTitle>
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

            {estimateAmmount && possibleTl && thresholdPercent && fileUpload && fileUpload?.type === 'application/pdf' || fileUpload?.name.toLowerCase().endsWith('.awf') ?

              <div onClick={() => handleSubmit()} className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                <Header>Save  {loading && <span className='text-white ml-2'><CircularProgress size={15} color="inherit" /></span>}</Header>
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

export default UploadScopeEstimate
