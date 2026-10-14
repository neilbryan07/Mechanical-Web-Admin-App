import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


import ModalDefault from '../../../../component/Modal/ModalDefault'

import Bold from '../../../../component/Typography/Bold'
import TextDisplay from '../../../../component/Typography/TextDisplay'
import Header from '../../../../component/Typography/Header'
import Regular from '../../../../component/Typography/Regular'

import DragAndDrop from '../../../../component/DragAndDrop/DragAndDrop'

import Card from '../../../../component/Card/Card'

import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';

import { EstimaticsImg, DashboardIcons, getDate, handleImageUpload, handleSelectedAllCarAttachment, } from '../../../../contants'

import { BiTrash, BiScan } from "react-icons/bi";
import { IoMdCloudUpload, IoMdCloudDownload } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";

import { APIServices } from '../../../../hooks/fetchAPI';
import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload'

import UploadedFilesModal from '../modal/UploadedFilesModal';

import { ReactComponent as SELECTICONS } from '../../../../assets/icons/Select_Icon.svg';
import { ReactComponent as SELECTICONSWHITE } from '../../../../assets/icons/Select_Icon_White.svg';

import { CarAttachment, CarDetailsAttachment as carDetails, CarpanelData as panelData, CarInsurance as carInsurance, CarTotalLoss as carTotalLoss } from '../../../../contants/StaticData';

import JSZip from "jszip";
import { saveAs } from 'file-saver';

import Car_Attachment from './Car_Attachment';

const Cat_Attachment_new = ({ CustomerData, getCustomer }) => {

  const { id } = useParams();
  const [upload, setUpload] = useState(false);
  const [panelType, setPanelType] = useState(null);

  const [imageSelect, setImageSelect] = useState(null);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [uploadedFilesConfig, setUploadedFilesConfig] = useState(null)
  const [globalUpload, setGlobalUpdate] = useState(false);

  const [viewFile, setViewFile] = useState(false);
  const [imageToView, setImageToView] = useState(false)

  const [uploadLoader, setUploadLoader] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  const [updatePanel, setUpdatePanel] = useState(null);

  const [checkBoxData, setCheckBoxData] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [isAdditional, setIsAdditional] = useState(false);

  const [customSelect, setCustomSelect] = useState([]);

  const [viewScope, setViewScope] = useState(true);
  const [dataScope, setDataScope] = useState([]);


  useEffect(() => {

    const startId = 1;
    const endId = 34;

    const filteredData = panelData.filter(item => item.id >= startId && item.id <= endId);
    setUpdatePanel(filteredData);

  }, []);


  const handleChange = (event) => {
    setPanelType(event.target.value);
  };



  const handleUploadAPI = async (tags, formdata) => {

    const res = await APIServicesFileUpload.post({ url: `/workfile/upload/part/${tags.tag}/${id}`, payload: formdata })

    if (res.status === 200) {
      setSuccess(true);
      setLoading(false);
      setTimeout(function () {
        getCustomer();
      }, 1000);

    }
  }

  const handleUpload = async () => {


    if (imageSelect.name) {
      setLoading(true);
      const tags = panelData.find(element => element.name === panelType)

      const formDatas = new FormData();
      formDatas.append('images', imageSelect);

      if (panelType === 'ADDITIONAL PHOTO') return handleUploadAPI(tags, formDatas);

      const attachment_car_json = CarAttachment.find(element => element.name === tags.name)

      if (attachment_car_json === undefined) return handleUploadAPI(tags, formDatas);

      const find_car_part = CustomerData?.hasOwnProperty(attachment_car_json.tags)

      if (!find_car_part) {

        const res = await APIServicesFileUpload.put({ url: attachment_car_json.url + id, payload: attachment_car_json.data })

        if (res.status === 200) {
          handleUploadAPI(tags, formDatas)
        }

      } else {
        handleUploadAPI(tags, formDatas)
      }

    }

  }

  const handleImageViewUpload = (data) => {
    setViewFile(true)
    setImageToView(data)
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };

  const handleCheckboxChange = (event, fileId) => {

    const updatedCheckBoxData = event.target.checked ? [...checkBoxData, fileId] : checkBoxData.filter(id => id !== fileId);
    setCheckBoxData(updatedCheckBoxData);
    setIsCheckAll(updatedCheckBoxData.length > 0 ? true : false);

  };

  const handleCheckBoxTest = () => {
    setIsCheckAll(!isCheckAll);

    if (isCheckAll) {
      // Uncheck all
      setCheckBoxData([]);
    } else {
      // Check all
      setCheckBoxData(CustomerData?.tech_scope_sheet?.map(file => file._id));
    }


  };


  const handleExport = async () => {

    setUploadLoader(true)
    const stringifiedArray = checkBoxData?.join(',');

    if (checkBoxData?.length === 0) return;

    const resTechScope = await APIServicesFileUpload.get({ url: `/workfile/v2/tech-scope-sheet/gallery?tech_scope=${stringifiedArray}` })

    if (resTechScope?.status !== 200) return;

    const filteredData = [];
    let tech_url = resTechScope?.data?.base_urls?.base_url_tech_sheet;

    resTechScope?.data?.data?.forEach(item => {

      const { sheet_name, ...filteredPhotos } = item;

      const nonEmptyValues = Object.entries(item)
        .filter(([key, value]) => value.length > 0)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      if (Object.keys(filteredPhotos).length > 0) {
        filteredData[sheet_name] = filteredPhotos;
      }
    });

    let folder_date = getDate(new Date());
    const zip = new JSZip();
    const parentFolder = zip.folder(`${CustomerData?.customer?.full_name}_${CustomerData?.vehicle_year}_${CustomerData?.vehicle_model}_${CustomerData?.vehicle_vin}`);

    for (const sheetName in filteredData) {
      let data = parentFolder.folder(sheetName, null);

      for (const partName in filteredData[sheetName]) {
        const photoUrls = filteredData[sheetName][partName];

        for (const photoUrl of photoUrls) {
          const imageUrl = `${tech_url}/${photoUrl}`;
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const filename = photoUrl.split('/').pop();
          const newFilename = `${sheetName}_${partName}_${filename}`;

          data.file(newFilename, blob);
        }
      }
    }

    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        setUploadLoader(false)
        saveAs(content, `${CustomerData?.customer?.full_name}_${CustomerData?.vehicle_year}_${CustomerData?.vehicle_model}_${CustomerData?.vehicle_vin}`);
      })
      .catch((error) => {
        setSnackBar(true);
        setUploadLoader(false);
        console.error('Error generating zip file:', error);
      });

  }


  return (
    <div>
      <UploadedFilesModal ImageView={imageToView} ModalToggle={setViewFile} Toggle={viewFile} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploadLoader}
      >
        <div className='flex flex-col gap-2 items-center justify-center'>

          <span className='text-white font-bold text-xl'><CircularProgress color="inherit" /></span>
          <span className='text-white font-bold text-xl'>Export Image Loading</span>
          <span className='text-white font-semibold text-xs'>Multiple Images takes time to export to zip file</span>
        </div>

      </Backdrop>

      <Snackbar
        open={snackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Unable to Export Data"
        severity="error"

        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

      />

      <ModalDefault
        title={"Upload Photos"}
        toggle={upload}
        setToggle={setUpload}
        size={'w-[35%]'}
      >
        <div className='px-4'>

          <div className='my-5 gap-2'>
            {/* <span><SubHeader>{panelType}</SubHeader></span> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Panel</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={panelType}
                label="Select Panel"
                onChange={handleChange}
                readOnly={globalUpload ? false : true}
              >

                {/* { panelData.map ( item => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))} */}

                {updatePanel?.map(item => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>

          <div className='mt-3 mb-5'>
            <DragAndDrop SetFiles={setImageSelect} />
          </div>

          <Header>Added Files</Header> <br />

          {imageSelect ?

            <Card props={'bg-white flex flex-row items-center justify-between'}>

              <div className='flex flex-row gap-4 items-center '>

                <img src={URL.createObjectURL(imageSelect)} alt='icon' width={70} height={70} />

                <div className='flex flex-col'>

                  <Regular props={"text-sm text-black"}>{panelType}</Regular>

                  <Regular props={"text-xs text-sky-500"}>itfender.png</Regular>

                  <Regular props={"text-xs text-black"}>51 kb</Regular>

                </div>


              </div>
              <span onClick={() => setImageSelect(null)} className='text-tertiaryText text-2xl cursor-pointer'><FaTimesCircle /></span>

            </Card> : null}

          <br />


          {!globalUpload && !isAdditional ?
            <React.Fragment>
              <Header>Uploaded Files</Header> <br />

              <Card props={'bg-white flex flex-row flex-wrap gap-4 items-center justify-start'}>
                {uploadedFiles?.map((column) => (
                  <div className='flex flex-col gap-2 items-center '>

                    <div className='cursor-pointer' onClick={() => handleImageViewUpload(`${CustomerData[uploadedFilesConfig['url']]}/${column}`)}>
                      <img src={`${CustomerData[uploadedFilesConfig['url']]}/${column}`} alt='icon' style={{ height: '137px', width: '183.2px' }} />
                    </div>

                    <div className='flex flex-col'>

                      <Regular props={"text-sm text-black"}>{column}</Regular>

                    </div>

                  </div>
                ))}
              </Card>
            </React.Fragment> : null}

          {success ?
            <Alert className='my-5' severity="success">
              <AlertTitle>Successfully Added</AlertTitle>
            </Alert>
            : null}

          <br />

          <div className='w-full flex justify-end'>
            <div className='flex flex-row items-center gap-10'>

              <span className='text-gray-600 cursor-pointer' onClick={() => setUpload(false)}>
                <Header>Cancel</Header>
              </span>

              {imageSelect ?

                <div onClick={handleUpload} className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                  <Header>Save {loading && <span className='text-white'><CircularProgress size={15} color="inherit" /></span>}</Header>
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


      {viewScope ?

        <Card props={'bg-white flex flex-col gap-5'}>

          <div className='flex flex-row items-center justify-between max-[830px]:flex-col max-[830px]:gap-3'>
            <span style={{ fontSize: 18 }} className='text-black'><Bold>Damage Report</Bold></span>

            <div className='flex flex-row items-center gap-3 max-[673px]:flex-col'>

              <div onClick={handleCheckBoxTest} className={`flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center ${!isCheckAll ? 'bg-white' : 'bg-mainText'}  border border-regularText rounded-md text-white cursor-pointer hover:border-black hover:transition duration-300`}>

                <span style={{ fontSize: 25 }} className='text-white'>{!isCheckAll ? <SELECTICONS /> : <SELECTICONSWHITE />} </span>
                <div className='mt-1'>
                  <TextDisplay><span style={{ fontSize: 18 }} className={`${!isCheckAll ? 'text-regularText' : 'text-white'}`}>{!isCheckAll ? "Select All" : [`Unselect`]}</span></TextDisplay>
                </div>

              </div>

              {/* <div  className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-600 hover:transition duration-300'>
                        
                        <span style={{ fontSize:25}} className='text-white'><IoMdCloudUpload/></span>
                        <div className='mt-1'>
                            <TextDisplay><span style={{ fontSize:18}} className='text-white'>Upload</span></TextDisplay>
                        </div>
                        
                    </div> */}
              {isCheckAll &&
                <React.Fragment>

                  <div onClick={handleExport} className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-mainText rounded-md text-white cursor-pointer hover:bg-green-600 hover:transition duration-300'>

                    <span style={{ fontSize: 25 }} className='text-white'><IoMdCloudDownload /></span>
                    <div className='mt-1'>
                      <TextDisplay><span style={{ fontSize: 18 }} className='text-white'>Export</span></TextDisplay>
                    </div>

                  </div>

                  <div className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-tertiaryText rounded-md text-white cursor-pointer hover:bg-red-700 hover:transition duration-300'>

                    <span style={{ fontSize: 25 }} className='text-white'><BiTrash /></span>
                    <div className='mt-1'>
                      <TextDisplay><span style={{ fontSize: 18 }} className='text-white'>Delete</span></TextDisplay>
                    </div>

                  </div>
                </React.Fragment>}

            </div>

          </div>

          <div className='grid grid-cols-4 gap-4'>

            {CustomerData?.tech_scope_sheet?.map((file, index) => (

              <Card props={'bg-white flex flex-col gap-5 w-full'} key={index}>

                <div className='flex flex-row items-center justify-between '>
                  <span style={{ fontSize: 16 }} className='text-black'>{file?.sheet_name}</span>
                  <Checkbox
                    size="small"
                    color="success"
                    checked={checkBoxData.includes(file?._id)}
                    onChange={(event) => handleCheckboxChange(event, file._id)}
                  />
                </div>

                <div onClick={() => [setViewScope(false), setDataScope(file)]} className='w-full bg-gray-50 rounded flex flex-col items-center justify-item-center cursor-pointer'>
                  <img src={DashboardIcons.CARFOLDERICONS} alt='icon' width={150} height={150} />
                </div>

              </Card>

            ))}

          </div>

        </Card>
        :

        <React.Fragment>

          <Car_Attachment dataScope={dataScope} viewScope={setViewScope} CustomerData={CustomerData} getCustomer={getCustomer} />

        </React.Fragment>

      }

    </div>
  )
}

export default Cat_Attachment_new