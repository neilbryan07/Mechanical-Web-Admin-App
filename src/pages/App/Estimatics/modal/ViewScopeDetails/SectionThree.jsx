import React , { useState , useEffect} from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';

import LT_RT_Rail from './CustomScopeView/LT_RT_Rail';
import DeckView from './CustomScopeView/DeckView';


import { FaFileAlt , FaImage } from "react-icons/fa";

const SectionThree = ({ getCustomer }) => {

    const { tech_sheet_left_rail , tech_sheet_deck_lid ,  tech_sheet_right_rail } = getCustomer;
    const [ fileUpload , setFileUpload ] = useState(null)
    const [ viewFile , setViewFile ] = useState(false);
    const [ viewDeck , setViewDeck ] = useState(false);
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

    const handleDeckUpload = (data) => {

        setViewDeck(true)
        setSelectedData(data)
    }

  return (
    <div className='grid grid-cols-3 gap-4 place-content-between'>

        {/* <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/> */}

        <LT_RT_Rail  selectedData={selectedData}  ModalToggle={setViewFile}  Toggle={viewFile} type={typeSelected}/>
        <DeckView  selectedData={selectedData}  ModalToggle={setViewDeck}  Toggle={viewDeck}/>
        
        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_left_rail , 'Left') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>LEFT RAIL </Bold> 
                { tech_sheet_left_rail !== undefined && tech_sheet_left_rail?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_left_rail?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_left_rail?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_left_rail?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_left_rail?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_left_rail?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_left_rail?.conventional_repair_hour} isHours={true}/>

        </Card>
        </div>

        <div className='col-span-1 relative'>
        <div className='w-full top-[80px] flex flex-col gap-4 absolute' onClick={ () => handleDeckUpload(tech_sheet_deck_lid) }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>DECK LID / TAILGATE </Bold> 
                { tech_sheet_deck_lid !== undefined && tech_sheet_deck_lid?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_deck_lid?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_deck_lid?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_deck_lid?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_deck_lid?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_deck_lid?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_deck_lid?.conventional_repair_hour} isHours={true}/>
            <ScopeTextContainer title="Deck Lid / Panel" value={tech_sheet_deck_lid?.deck_lid_panel}/>
            <ScopeTextContainer title="Interior Trim" value={tech_sheet_deck_lid?.interior_trim}/>
            <ScopeTextContainer title="Spoiler" value={tech_sheet_deck_lid?.spoiler}/>
            <ScopeTextContainer title="Bumper Cover" value={tech_sheet_deck_lid?.bumper_cover}/>

        </Card> 
        </div>
        </div>

        <div className='col-span-1' onClick={ () => handleImageViewUpload(tech_sheet_right_rail , 'Right') }>
        <Card props={'cursor-pointer hover:bg-gray-100'}>
            <span style={{ fontSize:13}} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT RAIL </Bold> 
                { tech_sheet_right_rail !== undefined && tech_sheet_right_rail?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} 
                { tech_sheet_right_rail?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null } 
            </span>

            <ScopeTextContainer title="Up Charge" value={tech_sheet_right_rail?.up_charge} isPercent={true} />
            <ScopeTextContainer title="Count" value={tech_sheet_right_rail?.count}/>
            <ScopeTextContainer title="Size" value={tech_sheet_right_rail?.size}/>
            <ScopeTextContainer title="OS" value={tech_sheet_right_rail?.oversize}/>
            <ScopeTextContainer title="CR" value={tech_sheet_right_rail?.conventional_repair_hour} isHours={true}/>

        </Card>
        </div>


  </div>
  )
}

export default SectionThree
