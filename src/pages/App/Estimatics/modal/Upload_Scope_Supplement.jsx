import React , { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

import Header from '../../../../component/Typography/Header'

import ModalDefault from '../../../../component/Modal/ModalDefault'

import { EstimaticsImg } from '../../../../contants'

import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics'

import UploadedFilesModal from './UploadedFilesModal'

import { APIServices } from '../../../../hooks/fetchAPI'
import { Alert, AlertTitle , CircularProgress } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload'

const Upload_Scope_Supplement = ({ getCustomer , ModalToggle , Toggle , file }) => {

  const { id } = useParams();

    const [ fileUpload , setFileUpload ] = useState(null)
    const [ viewFile , setViewFile ] = useState(false);
    const [ imageToView , setImageToView ] = useState(false)

    
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState(false);

    const [ userType , setUserType ] = useState(  file?.estimate_supplement_type ? file?.estimate_supplement_type : null );
    const [ supplementAmount , setSupplementAmount ] = useState(0);


    useEffect(() => {

        if ( Toggle ) {
    
            setFileUpload(null)

        }
  
    }, [Toggle]);

    
    useEffect(() => {

      setErrors(false);
      setSuccess(false);
      setLoading(false);
    }, [fileUpload]);

    const handleSubmit = async () => {

      if ( fileUpload?.name.toLowerCase().endsWith('.awf') && userType === 'Mitchell' ) {
        setErrors(true);
        return;
      }
      
      setLoading(true);
      
      const formDatas = new FormData();
      formDatas.append( 'file', fileUpload );
      formDatas.append( 'estimate_supplement_type', userType);
      formDatas.append( 'supplement_amount', supplementAmount);
      
      const res = await APIServicesFileUpload.post({ url: `workfile/upload/file/supplement/${id}`, payload: formDatas })

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(function() {
          setLoading(false);
          getCustomer();
        }, 1500);

      }

    }

  const handleChange = (event) => {
    
      setUserType(event.target.value);
      if(event.target.value === 'Mitchell' ) alert('Please be sure that you have pressed commit and send within Mitchell');

  }

  const options = [
      { value: 'CCC', label: 'CCC' },
      { value: 'Mitchell', label: 'Mitchell' },
      // { value: 'AWF', label: 'AWF' },
  ]

  return (
    <ModalDefault 
        title={"Upload Supplements"}
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
                    required
                    readOnly={ file?.estimate_supplement_type ? true : false }
                >

                    { options.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

            </FormControl> <br/><br/>

            <FormControl fullWidth>
              <TextField id="outlined-basic" required label="Supplement Amount" variant="outlined" type="number" onChange={ e => setSupplementAmount(e.target.value)  } />
            </FormControl> <br/><br/>

            <DragAndDropEstimatics SetFiles={setFileUpload} limitText = "PDF and AWF Only" pdfOnly={true}/>
            <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile} />
            <br/>

            <Header>Added Files</Header> <br/>
            
            
            { fileUpload ?
            
                fileUpload?.type === 'application/pdf'  || fileUpload?.name.toLowerCase().endsWith('.awf') ?
                    <div className='flex flex-col items-center'> 
                        
                        <a href={ URL.createObjectURL(fileUpload) } target='_blank' className='flex flex-col items-center'>
                            <img src={ fileUpload?.type === 'application/pdf' ?  EstimaticsImg.PDF_ICON : EstimaticsImg.ADOBEICON  } alt='icon' width={70} height={70}/>
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


            <br/> <Header>Uploaded Files</Header> <br/>
            { file?.supplement_files?.map((item ,key ) => (
                <React.Fragment key={key}>
                    <div className='flex flex-row gap-3'>
                      <span className='text-black font-semibold text-md'>Type: </span> 
                      <span className='text-black font-bold text-md'>{ file?.estimate_supplement_type }</span> 
                    </div>
              
                    <a target='_blank' href={`https://ice-api1.com/public/files/supplement/${item?.file}`}><span className='text-blue-500 underline text-[#0098F9]'>{ item?.file }</span></a>
                    <br/><br/>
                </React.Fragment>
            )) }


            { success ? 
              <Alert className='my-5' severity="success">
                  <AlertTitle>Successfully Added</AlertTitle>
              </Alert> 
            : null  }

            
            { errors ? 
              <Alert className='my-5' severity="error">
                  <AlertTitle>Error: Unsupported File Type</AlertTitle>
              </Alert> 
            : null  }

        <div className='w-full flex justify-end pb-3'>
          <div className='flex flex-row items-center gap-10'>

            { !loading ?
              <span className='text-gray-600 cursor-pointer' onClick={ () => ModalToggle(false) }>
                <Header>Cancel</Header>
              </span>
              :
              <span className='text-gray-300'>
                <Header>Cancel</Header>
              </span>
            }

            { fileUpload && userType && supplementAmount  && fileUpload?.type === 'application/pdf'  || fileUpload?.name.toLowerCase().endsWith('.awf') ?  

            <div onClick={ () => handleSubmit() } className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
              <Header>Save  { loading &&  <span className='text-white ml-2'><CircularProgress size={15} color="inherit"/></span>}</Header>
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

export default Upload_Scope_Supplement
