import React , { useState , useEffect} from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'
import LT_RT_FrontDoorView from './CustomScopeView/LT_RT_FrontDoorView';
import WindShield from './CustomScopeView/WindShield';
import RoofView from './CustomScopeView/RoofView';

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';


import { FaFileAlt, FaImage } from "react-icons/fa";

const SectionTwo = ({ getCustomer }) => {

    const { tech_sheet_left_front_door , tech_sheet_roof , tech_sheet_wind_shield,  tech_sheet_right_front_door } = getCustomer;
    const [ fileUpload , setFileUpload ] = useState(null)

    const [ viewFile , setViewFile ] = useState(false);
    const [ viewShield , setViewShield ] = useState(false);
    const [ viewRoof , setViewRoof ] = useState(false);

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

    const handleMiddleUpload = (data) => {
        setViewShield(true)
        setSelectedData(data)
    }

    const handleRoofUpload = (data) => {
        setViewRoof(true)
        setSelectedData(data)
    }


  return (
    <div className='grid grid-cols-3 gap-4 place-content-between'>
        {/* <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/> */}

        <LT_RT_FrontDoorView selectedData={selectedData}  ModalToggle={setViewFile}  Toggle={viewFile} type={typeSelected}/>

        <WindShield selectedData={selectedData}  ModalToggle={setViewShield}  Toggle={viewShield}/>

        <RoofView selectedData={selectedData}  ModalToggle={setViewRoof}  Toggle={viewRoof}/>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_left_front_door , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT FRONT DOOR </Bold> 
                { tech_sheet_left_front_door !== undefined && tech_sheet_left_front_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                {  tech_sheet_left_front_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_left_front_door?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_left_front_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_front_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_front_door?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_left_front_door?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Door" value={tech_sheet_left_front_door?.door}/>
            <ScopeTextContainer title="Belt Molding" value={tech_sheet_left_front_door?.belt_molding}/>
            <ScopeTextContainer title="Upper Molding" value={tech_sheet_left_front_door?.upper_molding}/>
            <ScopeTextContainer title="Applique" value={tech_sheet_left_front_door?.applique}/>
            <ScopeTextContainer title="Int Trim Panel" value={tech_sheet_left_front_door?.int_trim_panel}/>
            <ScopeTextContainer title="Door Glass" value={tech_sheet_left_front_door?.door_glass}/>
            <ScopeTextContainer title="Mirror Assy" value={tech_sheet_left_front_door?.mirror_assy}/>
            <ScopeTextContainer title="Mirror Glass" value={tech_sheet_left_front_door?.mirror_glass}/>

            <ScopeBendContainer title="Blend" value={tech_sheet_left_front_door?.blend}/>

        </Card>
        </div>

        <div className='col-span-1 relative'>
            
        <div className='w-full top-[-55px] flex flex-col gap-4 absolute'>
        
        <div onClick={ () => handleMiddleUpload(tech_sheet_wind_shield) }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>WINDSHIELD </Bold> 
                { tech_sheet_wind_shield !== undefined && tech_sheet_wind_shield?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_wind_shield?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Glass" value={tech_sheet_wind_shield?.glass_value}/>
            <ScopeTextContainer title="Cowl" value={tech_sheet_wind_shield?.cowl_value}/>

        </Card> 
        </div>

        <div onClick={ () => handleRoofUpload(tech_sheet_roof) }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>ROOF </Bold> 
                { tech_sheet_roof !== undefined && tech_sheet_roof?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null}
                { tech_sheet_roof?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_roof?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_roof?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_roof?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_roof?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_roof?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Roof" value={tech_sheet_roof?.roof}/>
            <ScopeTextContainer title="Headliner" value={tech_sheet_roof?.headliner}/>
            <ScopeTextContainer title="Sunroof Frame" value={tech_sheet_roof?.sun_roof_frame}/>
            <ScopeTextContainer title="Antenna" value={tech_sheet_roof?.antenna}/>
            <ScopeTextContainer title="Luggage Rack" value={tech_sheet_roof?.luggage_rack}/>
            <ScopeTextContainer title="High Mount Lamp" value={tech_sheet_roof?.high_mount_lamp}/>
            <ScopeTextContainer title="Back Glass" value={tech_sheet_roof?.back_glass}/>
            <ScopeTextContainer title="Cab Running Lights" value={tech_sheet_roof?.cab_running_lights}/>
            <ScopeTextContainer title="LT Roof Molding" value={tech_sheet_roof?.left_roof_molding}/>
            <ScopeTextContainer title="RT Roof Molding" value={tech_sheet_roof?.right_roof_molding}/>

        </Card> 
        </div>

        </div>
        </div>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_right_front_door , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT FRONT DOOR </Bold> 
                { tech_sheet_right_front_door !== undefined && tech_sheet_right_front_door?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null}
                { tech_sheet_right_front_door?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage/></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_right_front_door?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_right_front_door?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_front_door?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_front_door?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_right_front_door?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Door" value={tech_sheet_right_front_door?.door}/>
            <ScopeTextContainer title="Belt Molding" value={tech_sheet_right_front_door?.belt_molding}/>
            <ScopeTextContainer title="Upper Molding" value={tech_sheet_right_front_door?.upper_molding}/>
            <ScopeTextContainer title="Applique" value={tech_sheet_right_front_door?.applique}/>
            <ScopeTextContainer title="Int Trim Panel" value={tech_sheet_right_front_door?.int_trim_panel}/>
            <ScopeTextContainer title="Door Glass" value={tech_sheet_right_front_door?.door_glass}/>
            <ScopeTextContainer title="Mirror Assy" value={tech_sheet_right_front_door?.mirror_assy}/>
            <ScopeTextContainer title="Mirror Glass" value={tech_sheet_right_front_door?.mirror_glass}/>

            <ScopeBendContainer title="Blend" value={tech_sheet_right_front_door?.blend}/>

        </Card>
        </div>


  </div>
  )
}

export default SectionTwo
