import React , { useState , useEffect} from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'
import LT_RT_Fuel from './CustomScopeView/LT_RT_Fuel';

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';


import { FaFileAlt , FaImage } from "react-icons/fa";

const SectionSix = ({ getCustomer }) => {

    const { tech_sheet_left_fuel_door , tech_sheet_right_cab_cnr , tech_sheet_right_fuel_door } = getCustomer;
    const [ fileUpload , setFileUpload ] = useState(null)
    const [ viewFile , setViewFile ] = useState(false);
    const [ viewCab , setCab ] = useState(false);
    const [ selectedMiddleData , setSelectedMiddleData ] = useState(false)
    const [ selectedData , setSelectedData ] = useState(false)
    const [ typeSelected , setTypeSelected ] = useState(null);

    
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);


    const handleImageViewUpload = (data , type) => {
        setViewFile(true)
        setSelectedData(data)
        setTypeSelected(type)
    }

  return (
    <div className='grid grid-cols-3 gap-4 place-content-between'>
        {/* <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/> */}

        <LT_RT_Fuel   selectedData={selectedData}  ModalToggle={setViewFile}  Toggle={viewFile} type={typeSelected}/>

        <div className='col-span-1'onClick={ () => handleImageViewUpload(tech_sheet_left_fuel_door , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT FUEL DOOR </Bold> 
                { tech_sheet_left_fuel_door !== undefined && tech_sheet_left_fuel_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_left_fuel_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Count" value={tech_sheet_left_fuel_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_fuel_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_fuel_door?.oversize}/>


        </Card>
        </div>

        <div className='col-span-1'>
        
        </div>

        <div className='col-span-1'onClick={ () => handleImageViewUpload(tech_sheet_right_fuel_door , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT FUEL DOOR </Bold> 
                { tech_sheet_right_fuel_door !== undefined && tech_sheet_right_fuel_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_right_fuel_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Count" value={tech_sheet_right_fuel_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_fuel_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_fuel_door?.oversize}/>


        </Card>
        </div>


  </div>
  )
}

export default SectionSix
