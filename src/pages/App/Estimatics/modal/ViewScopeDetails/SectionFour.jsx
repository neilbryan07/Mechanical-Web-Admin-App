import React , { useState , useEffect} from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'
import LT_RT_RearDoor from './CustomScopeView/LT_RT_RearDoor';
import LT_RT_Cab from './CustomScopeView/LT_RT_Cab';

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';


import { FaFileAlt, FaImage  } from "react-icons/fa";

const SectionFour = ({ getCustomer }) => {

    const { tech_sheet_left_rear_door , tech_sheet_left_cab_cnr ,  tech_sheet_right_rear_door } = getCustomer;
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

        <LT_RT_RearDoor  selectedData={selectedData}  ModalToggle={setViewFile}  Toggle={viewFile} type={typeSelected}/>
        <LT_RT_Cab  selectedData={selectedData}  ModalToggle={setCab}  Toggle={viewCab} type={typeSelected}/>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_left_rear_door , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT REAR DOOR </Bold> 
                { tech_sheet_left_rear_door !== undefined && tech_sheet_left_rear_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_left_rear_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_left_rear_door?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_left_rear_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_rear_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_rear_door?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_left_rear_door?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Door" value={tech_sheet_left_rear_door?.door}/>
            <ScopeTextContainer title="Belt Molding" value={tech_sheet_left_rear_door?.belt_molding}/>
            <ScopeTextContainer title="Upper Molding" value={tech_sheet_left_rear_door?.upper_molding}/>
            <ScopeTextContainer title="Applique" value={tech_sheet_left_rear_door?.applique}/>
            <ScopeTextContainer title="Int Trim Panel" value={tech_sheet_left_rear_door?.int_trim_panel}/>
            <ScopeTextContainer title="Door Glass" value={tech_sheet_left_rear_door?.door_glass}/>

            <ScopeBendContainer title="Blend" value={tech_sheet_left_rear_door?.blend}/>

        </Card>
        </div>

        <div className='col-span-1 relative'>
        <div className='w-full top-[170px] flex flex-col gap-4 absolute' onClick={ () => handleCabUpload(tech_sheet_left_cab_cnr , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT CAB CNR </Bold> 
                { tech_sheet_left_cab_cnr !== undefined && tech_sheet_left_cab_cnr?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_left_cab_cnr?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_left_cab_cnr?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_left_cab_cnr?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_cab_cnr?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_cab_cnr?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_left_cab_cnr?.conventional_repair_hour} isHours={true}/>

        </Card> 
        </div>
        </div>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_right_rear_door , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT REAR DOOR </Bold> 
                { tech_sheet_right_rear_door !== undefined && tech_sheet_right_rear_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_right_rear_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_right_rear_door?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_right_rear_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_rear_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_rear_door?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_right_rear_door?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Door" value={tech_sheet_right_rear_door?.door}/>
            <ScopeTextContainer title="Belt Molding" value={tech_sheet_right_rear_door?.belt_molding}/>
            <ScopeTextContainer title="Upper Molding" value={tech_sheet_right_rear_door?.upper_molding}/>
            <ScopeTextContainer title="Applique" value={tech_sheet_right_rear_door?.applique}/>
            <ScopeTextContainer title="Int Trim Panel" value={tech_sheet_right_rear_door?.int_trim_panel}/>
            <ScopeTextContainer title="Door Glass" value={tech_sheet_right_rear_door?.door_glass}/>

            <ScopeBendContainer title="Blend" value={tech_sheet_right_rear_door?.blend}/>

        </Card>
        </div>


  </div>
  )
}

export default SectionFour
