import React, { useState, useEffect } from 'react'

import Card from '../../../../../component/Card/Card';
import Bold from '../../../../../component/Typography/Bold';

import UploadedFilesModal from '../UploadedFilesModal'
import LT_RT_FenderView from './CustomScopeView/LT_RT_FenderView';
import HoodView from './CustomScopeView/HoodView';

import ScopeBendContainer from './ScopeBendContainer';
import ScopeTextContainer from './ScopeTextContainer';


import { FaFileAlt , FaImage } from "react-icons/fa";

const SectionOne = ({ getCustomer }) => {

    const { tech_sheet_left_fender, tech_sheet_hood, tech_sheet_right_fender } = getCustomer;

    const [fileUpload, setFileUpload] = useState(null)
    const [viewFile, setViewFile] = useState(false);
    const [viewMiddleFile, setViewMiddleFile] = useState(false);
    const [selectedMiddleData, setSelectedMiddleData] = useState(false)
    const [selectedData, setSelectedData] = useState(false)
    const [typeSelected, setTypeSelected] = useState(null);


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleImageViewUpload = (data, type) => {
        setViewFile(true)
        setSelectedData(data)
        setTypeSelected(type)
    }

    const handleMiddleUpload = (data) => {
        setViewMiddleFile(true)
        setSelectedMiddleData(data)
    }

    return (
        <>
            <div className='grid grid-cols-3 gap-4 place-content-between'>
                {/* <UploadedFilesModal ImageView={imageToView}  ModalToggle={setViewFile}  Toggle={viewFile}/> */}

                <LT_RT_FenderView selectedData={selectedData} ModalToggle={setViewFile} Toggle={viewFile} type={typeSelected} />
                <HoodView selectedData={selectedMiddleData} ModalToggle={setViewMiddleFile} Toggle={viewMiddleFile} />

                <div className='col-span-1' onClick={() => handleImageViewUpload(tech_sheet_left_fender, 'Left')}>
                    <Card props={'cursor-pointer hover:bg-gray-100'}>
                        <span style={{ fontSize: 13 }} className='text-black flex flex-row items-center gap-4'><Bold>LEFT FENDER </Bold> { tech_sheet_left_fender !== undefined && tech_sheet_left_fender?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} { tech_sheet_left_fender?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null} </span>

                        <ScopeTextContainer title="Up Charge" value={tech_sheet_left_fender?.up_charge} isPercent={true} />
                        <ScopeTextContainer title="Count" value={tech_sheet_left_fender?.count} />
                        <ScopeTextContainer title="Size" value={tech_sheet_left_fender?.size} />
                        <ScopeTextContainer title="OS" value={tech_sheet_left_fender?.oversize} />
                        <ScopeTextContainer title="CR" value={tech_sheet_left_fender?.conventional_repair_hour} isHours={true} />
                        <ScopeTextContainer title="Fender" value={tech_sheet_left_fender?.fender} />
                        <ScopeTextContainer title="Liner" value={tech_sheet_left_fender?.liner} />
                        <ScopeTextContainer title="Head Lamp" value={tech_sheet_left_fender?.head_lamp_value} />
                        <br />
                        <ScopeBendContainer title="Blend" value={tech_sheet_left_fender?.blend} />

                    </Card>
                </div>

                <div className='col-span-1' onClick={() => handleMiddleUpload(tech_sheet_hood)}>
                    <Card props={'cursor-pointer hover:bg-gray-100'}>
                        <span style={{ fontSize: 13 }} className='text-black flex flex-row items-center gap-4'><Bold>HOOD </Bold> { tech_sheet_hood !== undefined && tech_sheet_hood?.note !== ''  ? <span className='text-mainText'><FaFileAlt /></span> : null} { tech_sheet_hood?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null} </span>


                        <ScopeTextContainer title="Up Charge" value={tech_sheet_hood?.up_charge} isPercent={true} />
                        <ScopeTextContainer title="Count" value={tech_sheet_hood?.count} />
                        <ScopeTextContainer title="Size" value={tech_sheet_hood?.size} />
                        <ScopeTextContainer title="OS" value={tech_sheet_hood?.oversize} />
                        <ScopeTextContainer title="CR" value={tech_sheet_hood?.conventional_repair_hour} isHours={true} />
                        <ScopeTextContainer title="Hood" value={tech_sheet_hood?.hood_value} />
                        <ScopeTextContainer title="Insulator" value={tech_sheet_hood?.insulator_value} />
                        <ScopeTextContainer title="Front Bumper" value={tech_sheet_hood?.front_bumper_value} />

                    </Card>
                </div>

                <div className='col-span-1' onClick={() => handleImageViewUpload(tech_sheet_right_fender, 'Right')}>
                    <Card props={'cursor-pointer hover:bg-gray-100'}>
                        <span style={{ fontSize: 13 }} className='text-black flex flex-row items-center gap-4'><Bold>RIGHT FENDER </Bold> { tech_sheet_right_fender !== undefined && tech_sheet_right_fender?.note !== '' ? <span className='text-mainText'><FaFileAlt /></span> : null} { tech_sheet_right_fender?.photo?.length > 0 ? <span className='text-secondaryText'><FaImage /></span> : null} </span>


                        <ScopeTextContainer title="Up Charge" value={tech_sheet_right_fender?.up_charge} isPercent={true} />
                        <ScopeTextContainer title="Count" value={tech_sheet_right_fender?.count} />
                        <ScopeTextContainer title="Size" value={tech_sheet_right_fender?.size} />
                        <ScopeTextContainer title="OS" value={tech_sheet_right_fender?.oversize} />
                        <ScopeTextContainer title="CR" value={tech_sheet_right_fender?.conventional_repair_hour} isHours={true} />
                        <ScopeTextContainer title="Fender" value={tech_sheet_right_fender?.fender} />
                        <ScopeTextContainer title="Liner" value={tech_sheet_right_fender?.liner} />
                        <ScopeTextContainer title="Head Lamp" value={tech_sheet_right_fender?.head_lamp_value} />
                        <br />
                        <ScopeBendContainer title="Blend" value={tech_sheet_right_fender?.blend} />

                    </Card>
                </div>


            </div>
        </>
    )
}

export default SectionOne
