import React , { useState , useEffect } from 'react'
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
import { Alert, AlertTitle , CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';

import { EstimaticsImg, DashboardIcons , getDate , handleImageUpload , handleSelectedAllCarAttachment } from '../../../../contants'

import { BiTrash, BiScan } from "react-icons/bi";
import { IoMdCloudUpload, IoMdCloudDownload } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { APIServices } from '../../../../hooks/fetchAPI';
import { APIServicesFileUpload } from '../../../../hooks/fetchAPIFileUpload'

import UploadedFilesModal from '../modal/UploadedFilesModal';

import { ReactComponent as SELECTICONS } from '../../../../assets/icons/Select_Icon.svg';
import { ReactComponent as SELECTICONSWHITE } from '../../../../assets/icons/Select_Icon_White.svg';

import { CarAttachment , CarDetailsAttachment as carDetails , CarpanelData as panelData , CarInsurance as carInsurance , CarTotalLoss as carTotalLoss } from '../../../../contants/StaticData';

import JSZip from "jszip";
import { saveAs } from 'file-saver';

const Car_Attachment = ({ CustomerData , getCustomer , viewScope , dataScope }) => {

    const { id } = useParams();
    const [ upload , setUpload] = useState(false);
    const [ panelType, setPanelType ] = useState(null);

    const [ imageSelect , setImageSelect ] = useState(null);

    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const [ uploadedFiles, setUploadedFiles ] = useState(null)
    const [ uploadedFilesConfig, setUploadedFilesConfig ] = useState(null)
    const [ globalUpload , setGlobalUpdate] = useState(false);

    const [ viewFile , setViewFile ] = useState(false);
    const [ imageToView , setImageToView ] = useState(false)

    const [ uploadLoader , setUploadLoader ] = useState(false);
    const [ snackBar , setSnackBar ] = useState(false);

    const [ updatePanel , setUpdatePanel ] = useState(null);

    const [ checkBoxData , setCheckBoxData ] = useState([]);
    const [ isCheckAll , setIsCheckAll ] = useState(false);

    const [ isAdditional , setIsAdditional ] = useState(false);

    const [ customSelect , setCustomSelect ] = useState([]);

    const [ panelSelect , setPanelSelect ] = useState( [] );

  
    useEffect(() => {

      const startId = 1;
      const endId = 34;
    
      const filteredData = panelData.filter(item => item.id >= startId && item.id <= endId);
      setUpdatePanel(filteredData);
    
  }, []);


    const handleChange = (event) => {
      setPanelType(event.target.value);
    };

    const handleUploadedFiles = (data) => {


 
      setUploadedFiles(null)
      setUploadedFilesConfig(null)
      
      const uploadedFile = carDetails.find( element => element.name === data )



      const customerVehiclePart = dataScope[uploadedFile['parts']]?.photo;

      setUploadedFilesConfig(uploadedFile)
      setUploadedFiles(customerVehiclePart ? customerVehiclePart : null )

      // setUploadedFiles(customerVehiclePart)

    }

    const handleUploadedTotalLoss = (data) => {
 
      setUploadedFiles(null)
      setUploadedFilesConfig(null)
      
      const uploadedFile = carTotalLoss.find( element => element.name === data )

      const customerVehiclePart = dataScope[uploadedFile['parts']];

      setUploadedFilesConfig(uploadedFile)
      setUploadedFiles(customerVehiclePart ? customerVehiclePart : null )

      setUploadedFiles(customerVehiclePart)

    }

    const handleUploadedVinTags = (data) => {

      setUploadedFiles(null)
      setUploadedFilesConfig(null)
      
      const uploadedFile = carInsurance.find( element => element.name === data )

      const customerVehiclePart = dataScope[uploadedFile['parts']];

      setUploadedFilesConfig(uploadedFile)
      setUploadedFiles(customerVehiclePart ? customerVehiclePart : null )

      setUploadedFiles(customerVehiclePart)

    }

    const handleUploadAPI = async (tags,formdata) => {

      const res = await APIServicesFileUpload.post({ url: `/workfile/upload/part/${tags.tag}/${id}`, payload: formdata })

      if (res.status === 200) {
          setSuccess(true);
          setLoading(false);
          setTimeout(function() {
            getCustomer();
          }, 1000);
          
      }
    }
    
    const handleUpload = async () => {

    
    if ( imageSelect.name ) {
      setLoading(true);
      const tags = panelData.find( element => element.name === panelType )

      const formDatas = new FormData();
      formDatas.append( 'images', imageSelect );

      if( panelType === 'ADDITIONAL PHOTO' ) return handleUploadAPI( tags ,  formDatas );

      const attachment_car_json = CarAttachment.find( element => element.name === tags.name )

      if ( attachment_car_json === undefined ) return handleUploadAPI( tags ,  formDatas );

      const find_car_part = CustomerData?.hasOwnProperty( attachment_car_json.tags )

      if ( !find_car_part ) {
   
        const res = await APIServicesFileUpload.put({ url: attachment_car_json.url + id , payload: attachment_car_json.data })

        if (res.status === 200) {
          handleUploadAPI( tags ,  formDatas )
        }
   
      } else {
        handleUploadAPI( tags ,  formDatas )
      }

    }

    }

    const handleImageViewUpload = (data) => {
      setViewFile(true)
      setImageToView(data)
    }

    const handleCheckboxChange = (name) => {
      
      if ( checkBoxData.some((existingItem) => existingItem === name) ) {
        const filtered = checkBoxData.filter((item) =>item !== name);
        setCheckBoxData(filtered);
      } else {
        setCheckBoxData((prevArray) => [...prevArray, name]);
      }

    };

    const handleCustomSelect = (data) => {
  
      if ( customSelect.some((existingItem) => existingItem === data) ) {
        const filtered = customSelect.filter((item) =>item !== data);
        setCustomSelect(filtered);
      } else {
        setCustomSelect((prevArray) => [...prevArray, data]);
      }

    }

    const handleExport = async  () => {

      if ( panelSelect?.length === 0 ) return;
      setUploadLoader(true)

      const resTechScope = await APIServicesFileUpload.get({ url: `/workfile/v2/tech-scope-sheet/gallery?tech_scope=${dataScope?._id}`})

      if ( resTechScope?.status !== 200 ) return;

      let tech_url = resTechScope?.data?.base_urls?.base_url_tech_sheet;
      const filteredDataObject = Object.keys( resTechScope?.data?.data?.[0] )
      .filter(key => panelSelect.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: resTechScope?.data?.data?.[0][key] }), {});
      
      // filteredDataObject?.forEach(item => {

      //   const { sheet_name, ...filteredPhotos } = item;   

      //   const nonEmptyValues = Object.entries(item)
      //     .filter(([key, value]) => value.length > 0)
      //     .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        
      //   if (Object.keys(filteredPhotos).length > 0) {
      //     filteredData[sheet_name] = filteredPhotos;
      //   }
      // });

      const filteredData = Object.fromEntries(
        Object.entries(filteredDataObject).filter(([key, value]) => value.length > 0)
      );

      let folder_date = getDate( new Date() ) ;
      const zip = new JSZip();
      const parentFolder = zip.folder(`DamageReport_${resTechScope?.data?.data?.[0]?.['sheet_name']}_${folder_date}`);

      for (const sheetName in filteredData) {

        for (const partName in filteredData[sheetName]) {
            const photoUrls = filteredData[sheetName][partName];

                const imageUrl = `${tech_url}/${photoUrls}`;
                const response = await fetch(imageUrl);
                const blob = await response.blob();
    
                const filename = photoUrls.split('/').pop();
                const newFilename = `${sheetName}_${partName}_${filename}`;
    
                parentFolder.file(newFilename, blob);

        }
    }
  
      zip.generateAsync({ type: 'blob' })
      .then((content) => {
        setUploadLoader(false)
        saveAs(content, `${resTechScope?.data?.data?.[0]?.['sheet_name']}_${CustomerData?.customer?.full_name}_${CustomerData?.vehicle_year}_${CustomerData?.vehicle_model}_${CustomerData?.vehicle_vin}`);
      })
      .catch((error) => {
        setSnackBar(true);
        setUploadLoader(false);
        console.error('Error generating zip file:', error);
      });


    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnackBar(false);
    };

    const handleSelectAll = () => {

      if( handleImageUpload(CustomerData) === 0 ) return

      if ( isCheckAll ) {
        setIsCheckAll(false);
        setCheckBoxData([]);
        setCustomSelect([]);
        return;
      }

      const checkData = carDetails.map( item => {
        if( CustomerData[item.parts]?.photo?.length > 0 ) {
          setCheckBoxData((prevArray) => [...prevArray, item.parts]);
        } else {
          setIsCheckAll(true);
        }
      }) 

      const checkDataInsurance = carInsurance.map( item => {

        if( CustomerData[item.parts]?.length > 0 ) setCustomSelect((prevArray) => [...prevArray, item.parts]);
                
      })

      const checkDataTotalLoss = carTotalLoss.map( item => {

        if( CustomerData[item.parts]?.length > 0 ) setCustomSelect((prevArray) => [...prevArray, item.parts]);
        
      })


    }

    const handleAdditionalPhoto = () => {
      setUpload(true)
      setGlobalUpdate(false)
      setIsAdditional(true) 

      setPanelType('ADDITIONAL PHOTO')
      
    }

    const handlePanelCheckbox = ( panel ) => {

      const isDataExists = panelSelect?.some(item => item === panel );

      if (isDataExists) 
        setPanelSelect(panelSelect?.filter(item => item !== panel));
      else 
        setPanelSelect([...panelSelect, panel]);
      
    }

    const handleSelectAllData = () => {

      let data = [ 
        'additional_photos' , 
        'gallery_full_vin', 
        'gallery_full_side_view',
        'gallery_full_license_plate' ,
        'gallery_full_lt_front' , 
        'gallery_full_rt_rear',
        'gallery_full_mileage',
        'gallery_full_rt_front',
        'gallery_full_license_plate',
        'gallery_total_loss_headliner',
        'gallery_total_loss_dashboard',
        'gallery_total_loss_tires',
        'gallery_total_loss_seats',
        'gallery_total_loss_door_trim',
        'gallery_total_loss_engine_compartment',
        'gallery_total_loss_front_undercarriage',
        'tech_sheet_left_fender',
        'tech_sheet_right_fender',
        'tech_sheet_hood',
        'tech_sheet_left_front_door',
        'tech_sheet_right_front_door',
        'tech_sheet_wind_shield',
        'tech_sheet_left_rail',
        'tech_sheet_right_rail',
        'tech_sheet_roof',
        'tech_sheet_left_rear_door',
        'tech_sheet_right_rear_door',
        'tech_sheet_left_fuel_door',
        'tech_sheet_right_fuel_door',
        'tech_sheet_left_quarter_box',
        'tech_sheet_right_quarter_box',
        'tech_sheet_left_cab_cnr',
        'tech_sheet_right_cab_cnr',
        'tech_sheet_deck_lid'
      ];

      if ( parseInt( panelSelect?.length ) > 0 ) 
          setPanelSelect([]);
      else 
          setPanelSelect(data);

    }

  
  return (
    <div>
<UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/>

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

    anchorOrigin={ { vertical: 'bottom', horizontal: 'center'} }

  />

<ModalDefault 
      title={"Upload Photosxx"}
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
              readOnly={ globalUpload ? false : true }
            >

              {/* { panelData.map ( item => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))} */}

              { updatePanel?.map ( item => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
          </div>

        {/* <div className='border-dashed border-2 flex justify-center items-center mt-3 mb-5 rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition duration-300'>

          <div className='py-9 flex justify-center items-center flex-col gap-3'>
              <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>

              <Regular props={"text-md"}>
                  Drag & Drop your files here or choose file
              </Regular>

              <Regular props={"text-sm text-gray-400"}>
                  Image files e.g. JPG and PNG
              </Regular>

          </div>

        </div> */}

        <div className='mt-3 mb-5'>
          <DragAndDrop SetFiles={setImageSelect} />
        </div>

        <Header>Added Files</Header> <br/>

        {imageSelect ?

        <Card props={'bg-white flex flex-row items-center justify-between'}> 

          <div className='flex flex-row gap-4 items-center '>

            <img src={ URL.createObjectURL(imageSelect) } alt='icon' width={70} height={70}/>

            <div className='flex flex-col'>

                <Regular props={"text-sm text-black"}>{panelType}</Regular>

                <Regular props={"text-xs text-sky-500"}>itfender.png</Regular>

                <Regular props={"text-xs text-black"}>51 kb</Regular>

            </div>


          </div>
          <span onClick={ ()=> setImageSelect(null) } className='text-tertiaryText text-2xl cursor-pointer'><FaTimesCircle/></span>
         
        </Card> : null }
        
        <br/>


        { !globalUpload && !isAdditional ? 
          <React.Fragment>
            <Header>Uploaded Files</Header> <br/>

            <Card props={'bg-white flex flex-row flex-wrap gap-4 items-center justify-start'}> 
                {uploadedFiles?.map((column) => (
                  <div className='flex flex-col gap-2 items-center '>

                    <div className='cursor-pointer' onClick={ () => handleImageViewUpload( `https://ice-api1.com/public/images/workfile/techsheet//${column}` ) }>
                      <img src={`https://ice-api1.com/public/images/workfile/techsheet/${column}`} alt='icon' style={{ height : '137px' , width : '183.2px' }}/>
                    </div>
                  
                    <div className='flex flex-col'>
        
                        <Regular props={"text-sm text-black"}>{column}</Regular>

                    </div>
        
                  </div>
                ))}
              </Card> 
          </React.Fragment> : null }
      
        { success ? 
            <Alert className='my-5' severity="success">
                <AlertTitle>Successfully Added</AlertTitle>
            </Alert> 
        : null  }

        <br/>

        <div className='w-full flex justify-end'>
          <div className='flex flex-row items-center gap-10'>
            
            <span className='text-gray-600 cursor-pointer' onClick={ () => setUpload(false) }>
              <Header>Cancel</Header>
            </span>

            { imageSelect ?  

            <div onClick={ handleUpload } className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
              <Header>Save { loading &&  <span className='text-white'><CircularProgress size={15} color="inherit"/></span>}</Header>
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

        <Card props={'bg-white flex flex-col gap-5'}> 
        {/* viewScope */}
            <div className='flex flex-row items-center justify-between max-[830px]:flex-col max-[830px]:gap-3'>

                <div className='flex flex-row items-center gap-2'>
                  <div onClick={ () => viewScope( true ) } style={{ fontSize:25}} className='text-black cursor-pointer'><MdKeyboardArrowLeft/></div>
                  <span style={{ fontSize:18}} className='text-black'><Bold>Damage Report - { dataScope?.sheet_name }</Bold></span>
                </div>
       
                <div className='flex flex-row items-center gap-3 max-[673px]:flex-col'>
                {/* checkBoxData?.length === 0 */}
                    <div onClick={ () => handleSelectAllData()  } className={`flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center ${ parseInt(panelSelect?.length) <= 0 ? 'bg-white' : 'bg-mainText' }  border border-regularText rounded-md text-white cursor-pointer hover:border-black hover:transition duration-300`}>
                        
                        <span style={{ fontSize:25}} className='text-white'>{ parseInt(panelSelect?.length) <= 0 ? <SELECTICONS/> : <SELECTICONSWHITE/> } </span>
                        <div className='mt-1'>
                            <TextDisplay><span style={{ fontSize:18}} className={`${ parseInt(panelSelect?.length) <= 0 ? 'text-regularText' : 'text-white' }`}>{ parseInt(panelSelect?.length) <= 0 ? "Select All" : [`Unselect`] }</span></TextDisplay>
                        </div>
                        {/* ${ handleSelectedAllCarAttachment( checkBoxData?.length , customSelect?.length ) } */}
                    </div>

                    {/* onClick={ () => [setUpload(true), setPanelType(null) ] } */}
                    {/* <div  onClick={ () => [setUpload(true) , setGlobalUpdate(true) , setIsAdditional(true) ] } className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-600 hover:transition duration-300'>
                        
                        <span style={{ fontSize:25}} className='text-white'><IoMdCloudUpload/></span>
                        <div className='mt-1'>
                            <TextDisplay><span style={{ fontSize:18}} className='text-white'>Upload</span></TextDisplay>
                        </div>
                        
                    </div> */}

                    { parseInt( panelSelect?.length ) > 0 ?
                      <div onClick={ () => handleExport() } className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-mainText rounded-md text-white cursor-pointer hover:bg-green-600 hover:transition duration-300'>
                          
                          <span style={{ fontSize:25}} className='text-white'><IoMdCloudDownload/></span>
                          <div className='mt-1'>
                              <TextDisplay><span style={{ fontSize:18}} className='text-white'>Export</span></TextDisplay>
                          </div>
                          
                      </div>
                    : null }
                    
                    {/* <div className='flex flex-row items-center w-[131px] h-[40px] gap-2 justify-center bg-tertiaryText rounded-md text-white cursor-pointer hover:bg-red-700 hover:transition duration-300'>
                        
                        <span style={{ fontSize:25}} className='text-white'><BiTrash/></span>
                        <div className='mt-1'>
                            <TextDisplay><span style={{ fontSize:18}} className='text-white'>Delete</span></TextDisplay>
                        </div>
                        
                    </div> */}
                    
                </div>
                
            </div>

            <span style={{ fontSize:18}} className='text-black'><Bold>VIN, Mileage, 4 corners, and Tag</Bold></span>

            <div className='w-full flex flex-row flex-wrap items-center'>
              
                  { carInsurance.map ( item => (
                    <div className='relative' key={item.id}>
                      <div onClick={ () => [setUpload(true), setPanelType(item.name) , setIsAdditional(false) , setGlobalUpdate(false) , handleUploadedVinTags(item.name) , setImageSelect(null) ] } style={{ height : '190px', width : '200.8px' }} className='flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100'>
                          
                          { dataScope[item.parts] ? 
                            <React.Fragment>
                              { dataScope[item.parts]?.length > 0 ?

                              <div className='relative'> 
                                <img src={`https://ice-api1.com/public/images/workfile/techsheet/${dataScope[item.parts][dataScope[item.parts]?.length - 1]}`} alt='icon' style={{ height : '137px' , width : '183.2px' }}/>
                                <div className='absolute bottom-1 right-2 bg-gray-300 rounded-lg px-1'>
                                  <span className='text-black text-xs'>{dataScope[item.parts]?.length} Uploaded Photo(s)</span>
                                </div>
                              </div>

                              :
                              <>
                                <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                              </>
                              }        

                            </React.Fragment>
                          :
                            <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                          }

                          <div className='bg-gray-800 flex flex-col text-center' style={{width : '183.2px'}}>
                              <TextDisplay><span style={{ fontSize:18}} className='text-white'>{item.name}</span></TextDisplay>
                          </div>

                      </div>
                          
                      { dataScope[item.parts]?.length > 0 ?

                        <div className='absolute top-3 left-1 z-20'>
                          {/* <Checkbox size="small" color="success" checked={ customSelect.some((existingItem) => existingItem === item.parts) } onChange={() => handleCustomSelect( item.parts ) }/> */}
                          <Checkbox size="small" color="success" checked={ panelSelect.includes(item?.parts) } onChange={ () => handlePanelCheckbox( item?.parts ) }/>
                        </div> : null
                      }
     

                    </div>
                ))}

            </div>

            <span style={{ fontSize:18}} className='text-black'><Bold>Full Vehicle View by Panel</Bold></span>

            <div className='w-full flex flex-row flex-wrap items-center'>
              
                { carDetails.map ( item => (
                    <div className='relative' key={item.id}>
                      <div onClick={ () => [setUpload(true), setPanelType(item.name) , setIsAdditional(false) , setGlobalUpdate(false) , handleUploadedFiles(item.name) , setImageSelect(null) ] } style={{ height : '190px', width : '200.8px' }} className='flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100'>
                          
                          
                          { dataScope[item.parts] ? 
                            <React.Fragment>
                              { dataScope[item.parts]?.photo?.length > 0 ?

                              <div className='relative'> 
                                <img src={`https://ice-api1.com/public/images/workfile/techsheet/${dataScope[item.parts]['photo'][dataScope[item.parts]['photo'].length - 1]}`} alt='icon' style={{ height : '137px' , width : '183.2px' }}/>
                                <div className='absolute bottom-1 right-2 bg-gray-300 rounded-lg px-1'>
                                  <span className='text-black text-xs'>{dataScope[item.parts]['photo'].length} Uploaded Photo(s)</span>
                                </div>
                              </div>

                              :
                              <>
                                <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                              </>
                              }        

                            </React.Fragment>
                          :
                            <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                          }

                          <div className='bg-gray-800 flex flex-col text-center' style={{width : '183.2px'}}>
                              <TextDisplay><span style={{ fontSize:18}} className='text-white'>{item.name}</span></TextDisplay>
                          </div>

                      </div>
                          
                      { dataScope[item.parts]?.photo?.length > 0 ?

                        <div className='absolute top-3 left-1 z-20'>
                          {/* <Checkbox size="small" color="success" checked={ checkBoxData.some((existingItem) => existingItem === item.parts) } onChange={() => handleCheckboxChange(item.parts)}/> */}
                           {/* setIsCheckAll( isCheckAll ? false : true )  */}
                          <Checkbox size="small" color="success" checked={ panelSelect.includes(item?.parts) } onChange={ () => handlePanelCheckbox( item?.parts ) }/>
                        </div> : null
                      }
     

                    </div>
                ))}

            </div>

            <span style={{ fontSize:18}} className='text-black'><Bold>Total Loss Photos</Bold></span>

            <div className='w-full flex flex-row flex-wrap items-center'>
              

                {/* { carTotalLoss.map ( item => (
                    <div className='relative' key={item.id}>
                      <div style={{ height : '190px', width : '200.8px' }} className='flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100'>
                          

                          <img src={EstimaticsImg.CARSIX} alt='icon'/>

                          <div className='bg-gray-800 flex flex-col text-center' style={{width : '183.2px'}}>
                              <TextDisplay><span style={{ fontSize:18}} className='text-white'>{item.name}</span></TextDisplay>
                          </div>

                      </div>

                    </div>
                ))} */}

                              
                  { carTotalLoss.map ( item => (
                    <div className='relative' key={item.id}>
                      <div onClick={ () => [setUpload(true), setPanelType(item.name) , setIsAdditional(false) , setGlobalUpdate(false) , handleUploadedTotalLoss(item.name) , setImageSelect(null) ] } style={{ height : '190px', width : '200.8px' }} className='flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100'>
                          
                          
                          { dataScope[item.parts] ? 
                            <React.Fragment>
                              { dataScope[item.parts]?.length > 0 ?

                              <div className='relative'> 
                                <img src={`https://ice-api1.com/public/images/workfile/techsheet/${dataScope[item.parts][dataScope[item.parts]?.length - 1]}`} alt='icon' style={{ height : '137px' , width : '183.2px' }}/>
                                <div className='absolute bottom-1 right-2 bg-gray-300 rounded-lg px-1'>
                                  <span className='text-black text-xs'>{dataScope[item.parts]?.length} Uploaded Photo(s)</span>
                                </div>
                              </div>

                              :
                              <>
                                <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                              </>
                              }        

                            </React.Fragment>
                          :
                            <img src={EstimaticsImg.CARSIX} alt='icon' style={{ height : '137px' , width : '201px' }}/>
                          }

                          <div className='bg-gray-800 flex flex-col text-center' style={{width : '183.2px'}}>
                              <TextDisplay><span style={{ fontSize:18}} className='text-white'>{item.name}</span></TextDisplay>
                          </div>

                      </div>
                          
                      { dataScope[item.parts]?.length > 0 ?

                        <div className='absolute top-3 left-1 z-20'>
                          <Checkbox size="small" color="success" checked={ panelSelect.includes(item?.parts) } onChange={ () => handlePanelCheckbox( item?.parts ) }/>
                          {/* <Checkbox size="small" color="success" checked={ customSelect.some((existingItem) => existingItem === item.parts) } onChange={() => handleCustomSelect( item.parts ) }/> */}
                        </div> : null
                      }
     

                    </div>
                ))}

            </div>

            <div className='flex flex-row items-center justify-between max-[830px]:flex-col max-[830px]:gap-3'>
                <span style={{ fontSize:18}} className='text-black'><Bold>Additional Photos ({ CustomerData?.additional_photos?.length })</Bold></span>
            </div>

            <div className='w-full flex flex-row flex-wrap items-center'>
              

                { dataScope?.additional_photos?.map ( item => (
                    <div className='relative' key={item.id}>
                      <div  onClick={ () => handleImageViewUpload( `https://ice-api1.com/public/images/workfile/techsheet/${ item }` ) } style={{ height : '190px', width : '200.8px' }} className='flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100'>
                          
                        <img src={`https://ice-api1.com/public/images/workfile/techsheet/${ item }`} alt='icon' style={{ height : '137px' , width : '183.2px' }}/>

                      </div>

                      {/* <div className='absolute top-5 left-1 z-20'>
                          <Checkbox size="small" color="success"/>
                        </div> */}

                    </div>
                ))}

            </div>

        </Card>
    </div>
  )
}

export default Car_Attachment

// const handleExport = async  () => {
//   setUploadLoader(true)
//   const res = await APIServices.get({ url: 'workfile/export/attachment/list/' + id  })
  
//   if(Object.keys(res.data?.data["tech_sheet_photos"]).length === 0) {
//     setSnackBar(true);
//     setUploadLoader(false)
//     return;
//   }

//   const resJson = res.data?.data?.tech_sheet_photos;
//   const resJsonURl = res.data?.data?.base_url;

//   const objectNames = Object.keys(resJson);
//   const filteredData = carDetails.filter(item => objectNames.includes(item.parts));
//   const checkedAttachment = carDetails.filter(item => checkBoxData.includes(item.name));
  
//   const folderNames = checkBoxData.length > 0 ? checkedAttachment?.map( e => e.name ) : filteredData?.map( e => e.name );
//   const ImagesDirectory = checkBoxData.length > 0 ? checkedAttachment : filteredData ;
//   // const folderNames = filteredData?.map( e => e.name );
//   let folder_date = getDate( new Date() ) ;
//   const zip = new JSZip();
//   const parentFolder = zip.folder(`${CustomerData?.customer?.full_name}-${CustomerData?.vehicle_year}_${CustomerData?.vehicle_make}_${CustomerData?.vehicle_model}_${CustomerData?.insurance?.provider }_${folder_date}`);


//   for (const [index, folder] of folderNames.entries()) {
//     // const imgFolder = zip.folder(folder);
//     // const imgFolder = parentFolder.folder(folder);
 
//     const images = resJson[ImagesDirectory[index]?.parts]?.map( (item , key) => (
//       { "name": folder + "_" + item, "url": `${resJsonURl[ImagesDirectory[index].url]}/${item} ` }  
//     ));
    
//     for (const { name, url } of images) {
//       const imgContent = await fetch(url).then((response) => response.blob());
//       // imgFolder.file(name, imgContent);
//       parentFolder.file(name, imgContent);
//     }

//   }

//   zip.generateAsync({ type: 'blob' })
//   .then((content) => {
//     setUploadLoader(false)
//     saveAs(content, `${CustomerData?.customer?.full_name}-${CustomerData?.vehicle_year}_${CustomerData?.vehicle_make}_${CustomerData?.vehicle_model}_${CustomerData?.insurance?.provider }_${folder_date}.zip`);

//   })
//   .catch((error) => {
//     setSnackBar(true);
//     setUploadLoader(false);
//     console.error('Error generating zip file:', error);
//   });

// }
