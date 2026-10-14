import React , { useState , useEffect} from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'
import LT_RT_Quarter from './CustomScopeView/LT_RT_Quarter';
import LT_RT_Cab from './CustomScopeView/LT_RT_Cab';

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';


import { FaFileAlt , FaImage  } from "react-icons/fa";

const SectionFive = ({ getCustomer }) => {

    const { tech_sheet_left_quarter_box , tech_sheet_right_cab_cnr , tech_sheet_right_quarter_box } = getCustomer;
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

    const handleCabUpload = (data , type) => {
        setCab(true)
        setSelectedData(data)
        setTypeSelected(type)
    }

  return (
    <div className='grid grid-cols-3 gap-4 place-content-between'>
        {/* <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/> */}

        <LT_RT_Quarter   selectedData={selectedData}  ModalToggle={setViewFile}  Toggle={viewFile} type={typeSelected}/>
        <LT_RT_Cab  selectedData={selectedData}  ModalToggle={setCab}  Toggle={viewCab} type={typeSelected}/>
        
        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_left_quarter_box , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT QUARTER </Bold> 
                { tech_sheet_left_quarter_box !== undefined && tech_sheet_left_quarter_box?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_left_quarter_box?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>


            <ScopeTextContainer title="Up Charge" value={tech_sheet_left_quarter_box?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_left_quarter_box?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_quarter_box?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_quarter_box?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_left_quarter_box?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Rear Lamp" value={tech_sheet_left_quarter_box?.rear_lamp}/>
            <ScopeTextContainer title="Trim" value={tech_sheet_left_quarter_box?.trim}/>
            <ScopeTextContainer title="Glass Molding" value={tech_sheet_left_quarter_box?.quarter_glass_molding}/>
            <br/>
            <ScopeBendContainer title="Blend" value={tech_sheet_left_quarter_box?.blend}/>

        </Card>
        </div>

        <div className='col-span-1'onClick={ () => handleCabUpload(tech_sheet_right_cab_cnr , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT CAB CNR </Bold> 
                { tech_sheet_right_cab_cnr !== undefined && tech_sheet_right_cab_cnr?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                {  tech_sheet_right_cab_cnr?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_right_cab_cnr?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_right_cab_cnr?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_cab_cnr?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_cab_cnr?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_right_cab_cnr?.conventional_repair_hour} isHours={true}/>

        </Card> 
        </div>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_right_quarter_box , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT QUARTER </Bold> 
                { tech_sheet_right_quarter_box !== undefined && tech_sheet_right_quarter_box?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_right_quarter_box?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>


            <ScopeTextContainer title="Up Charge" value={tech_sheet_right_quarter_box?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_right_quarter_box?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_quarter_box?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_quarter_box?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_right_quarter_box?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Rear Lamp" value={tech_sheet_right_quarter_box?.rear_lamp}/>
            <ScopeTextContainer title="Trim" value={tech_sheet_right_quarter_box?.trim}/>
            <ScopeTextContainer title="Glass Molding" value={tech_sheet_right_quarter_box?.quarter_glass_molding}/>
            <br/>
            <ScopeBendContainer title="Blend" value={tech_sheet_right_quarter_box?.blend}/>

        </Card>
        </div>


  </div>
  )
}

export default SectionFive
