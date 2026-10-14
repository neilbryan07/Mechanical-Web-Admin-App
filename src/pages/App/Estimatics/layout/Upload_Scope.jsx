import React, { useState } from 'react'

import TextDisplay from '../../../../component/Typography/TextDisplay'
import Bold from '../../../../component/Typography/Bold'
import Regular from '../../../../component/Typography/Regular'

import Card from '../../../../component/Card/Card'

import { DashboardIcons , EstimaticsImg } from '../../../../contants'

import { FaRegEye } from "react-icons/fa";

import ScopeSheet from '../modal/ScopeSheet'
import DTPForm from '../modal/DTPForm'
import ConfirmationPayment from '../modal/ConfirmationPayment'
import UploadScopeEstimate from '../modal/UploadScopeEstimate'
import Upload_Scope_Supplement from '../modal/Upload_Scope_Supplement'
import Upload_Supplement_Request from '../modal/Upload_Supplement_Request'
import ViewScopeData from '../modal/ViewScopeData'
import ViewSupplement from '../modal/ViewSupplement'
import ViewEstimate from '../modal/ViewEstimate'

const Upload_Scope = ({ CustomerData , getCustomer , profileMe = null }) => {

    const [ uploadScopeSheet , setUploadScopeSheet ] = useState(false);
    const [ uploadDTPForm , setUploadDTPForm ] = useState(false);
    const [ uploadConfirmation , setUploadConfirmation ] = useState(false);
    const [ uploadScope , setUploadScope ] = useState(false);
    const [ uploadScopeSupplement , setUploadScopeSupplement ] = useState(false);
    const [ uploadSupplementRequest , setUploadScopeSupplementRequest ] = useState(false);
    const [ viewScopeSheet , setViewScopeSheet ] = useState(false);
    const [ ViewSupplements , setViewSupplements ] = useState(false);
    const [ ViewEstimates , setViewEstimates ] = useState(false);

  return (
    <React.Fragment>
    <div className='grid grid-rows-1 grid-cols-1 min-[1661px]:grid-cols-4 max-[1660px]:grid-cols-3 max-[847px]:grid-cols-1 gap-5' >

        <ScopeSheet getCustomer={ getCustomer } ModalToggle={setUploadScopeSheet} Toggle={uploadScopeSheet} file={ CustomerData.hasOwnProperty( "scope_sheet_file" ) ? CustomerData?.scope_sheet_file  : null }/>
        <DTPForm getCustomer={ getCustomer } ModalToggle={setUploadDTPForm} Toggle={uploadDTPForm} file={ CustomerData }/>
        
        <ConfirmationPayment getCustomer={ getCustomer } ModalToggle={setUploadConfirmation} Toggle={uploadConfirmation} file={ CustomerData.hasOwnProperty( "confirmation_of_payment" ) ? CustomerData?.confirmation_of_payment  : null }/>
       
        <UploadScopeEstimate getCustomer={ getCustomer } ModalToggle={setUploadScope} Toggle={uploadScope} file={ CustomerData } />
        <Upload_Scope_Supplement getCustomer={ getCustomer } ModalToggle={setUploadScopeSupplement} Toggle={uploadScopeSupplement} file={ CustomerData } />
        <Upload_Supplement_Request profileMe={ profileMe } getCustomer={ getCustomer } ModalToggle={setUploadScopeSupplementRequest} Toggle={uploadSupplementRequest} file={ CustomerData.hasOwnProperty( "supplement_request" ) ? CustomerData?.supplement_request  : null } />

        <ViewScopeData getCustomer={ CustomerData } ModalToggle={setViewScopeSheet} Toggle={viewScopeSheet}/>
        <ViewSupplement getCustomer={ getCustomer } ModalToggle={ setViewSupplements } Toggle={ ViewSupplements } file={ CustomerData } />
        <ViewEstimate getCustomer={ getCustomer } ModalToggle={ setViewEstimates } Toggle={ ViewEstimates } file={ CustomerData } />

        {/* <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'}> 

            <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>View Scope Sheet</span></TextDisplay>
            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>
                    <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/>
                    { CustomerData.hasOwnProperty( "scope_sheet_file" ) ?
                        <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/> : 
                        <img src={ DashboardIcons.DRAGDROP } alt='icon' width={70} height={70}/>
                    }
                    
                    <div onClick={ ()=> setUploadScopeSheet(true) }  className='flex flex-row items-center justify-center gap-3 px-10 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <Regular>{ CustomerData.hasOwnProperty( "scope_sheet_file" ) ? "View PDF" : "Upload PDF" }</Regular>
                        <FaRegEye/>
                    </div> 

                    <div onClick={ ()=> setViewScopeSheet(true) }  className='flex flex-row items-center justify-center gap-3 px-10 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <Regular>View Scope</Regular>
                        <FaRegEye/>
                    </div> 
                    
                    <Regular props={"text-[10px] text-center"}>
                        View the Scope Sheet Data
                    </Regular>

                </div>

            </div>

        </Card> */}

        <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'}>

            <div className='flex flex-col items-start justify-center w-full'>
                <TextDisplay props={""}><span style={{ fontSize:18}} className='text-regularGrey'>View DTP</span></TextDisplay>
            </div> 

            <div className='flex items-center justify-center'>

                <div className='flex flex-col items-center justify-center gap-3 py-3 mt-10'>

                    {/* <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/> */}

                    {/* { CustomerData.hasOwnProperty( "dtp_form" ) ?
                        <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/> : 
                        <img src={ DashboardIcons.DRAGDROP } alt='icon' width={70} height={70}/>
                    } */}
                    
                    <div onClick={ ()=> setUploadDTPForm(true) }  className='flex flex-row items-center justify-center gap-3 px-3 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <FaRegEye/>
                        {/* <Regular>{ CustomerData?.dtp?.signature?.length > 0 ? "View" : "Upload File" }</Regular> */}
                        <Regular>View</Regular>
                    </div> 
                    
                </div>

            </div>


            {/* <div className='flex items-center justify-center mt-1 duration-300 rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>
                    <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/>

                    <Regular props={"text-md  text-[10px] underline text-[#0098F9]"}>
                        Sample_DTP.pdf
                    </Regular>

                </div>

            </div> */}

        </Card>

        {/* <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'}> 

            <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>Confirmation of Payment</span></TextDisplay>
            <div className='flex items-center justify-center mt-1 duration-300 rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>
                    <img src={ EstimaticsImg.PDF_ICON } alt='icon' width={70} height={70}/>

                    <Regular props={"text-md text-[10px] underline text-[#0098F9]"}>
                    Confirmation_payment.pdf
                    </Regular>

                </div>

            </div>

        </Card> */}

        <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'} > 

            <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>Confirmation of Payment</span></TextDisplay>
            
            {/* <DragAndDrop SetFiles={setImageSelect} limitText = "Image files e.g. JPG, PNG and PDF"/> */}
            {/* border-dashed border-2 flex justify-center items-center rounded-md cursor-pointer */}
            <div className='flex items-center justify-center'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>
               
                    <img src={ EstimaticsImg.PDF_ICON  } alt='icon' width={70} height={70}/>

                    { profileMe?.role !== 7 ?
                    
                    <React.Fragment>

                        <div onClick={ ()=> setUploadConfirmation(true) }  className='flex flex-row items-center justify-center gap-3 px-10 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                            <Regular>{ CustomerData?.confirmation_of_payment !== '' ? "View File (1)" : "Upload File" }</Regular>
                            <FaRegEye/>
                        </div> 

                        <Regular props={"text-[10px] text-center"}>
                            Drag & Drop Option is available in the pop-out
                        </Regular>

                    </React.Fragment>   

                    : 
                        <a target='_blank' href={`https://ice-api1.com/public/files/payment/${CustomerData?.confirmation_of_payment }`}>
                            <span className='text-blue-500 underline text-[#0098F9]'>{ CustomerData?.confirmation_of_payment }</span>
                        </a> 
                    }
                    
                </div>

            </div>

        </Card>

        <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'}> 
            

            { profileMe?.role !== 7 ?
            <React.Fragment>
            <div className='flex flex-row items-center w-full gap-2'>

                <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>Upload Estimate</span></TextDisplay>
                
                <div onClick={ ()=> setUploadScope(true) }  className='flex flex-row items-center justify-center gap-3 px-3 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                    <FaRegEye/>
                    <Regular>{ CustomerData?.estimate_file ? "View" : "Upload" }</Regular>    
                </div> 

            </div>

            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>

                    <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>

                    <Regular props={"text-[10px] text-center"}>
                        Drag & Drop Option is available in the pop-out
                    </Regular>

                    <span className='text-[9px] font-xs text-gray-500'>Document files: PDF or CSV</span>

                </div>

            </div>
            </React.Fragment> 
            : 
            <React.Fragment>

            <div className='flex flex-row items-center w-full gap-2'>

                <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>View Estimate</span></TextDisplay>

            </div>

            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>

                    <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>
                    
                    <div onClick={ ()=> setViewEstimates(true) }  className='flex flex-row items-center justify-center gap-3 px-6 py-3 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <FaRegEye/>
                        <Regular>Open</Regular>
                    </div> 

                </div>

            </div>
            </React.Fragment> 
            }
            
        </Card>

        <Card props={'bg-white flex flex-col gap-5 drop-shadow-md'}> 
            { profileMe?.role !== 7 ?
            <React.Fragment>
            <div className='flex flex-row items-center w-full gap-2'>

            <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>Upload Supplements</span></TextDisplay>

            <div onClick={ ()=> setUploadScopeSupplement(true) }  className='flex flex-row items-center justify-center gap-3 px-3 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                <FaRegEye/>
                <Regular>{ CustomerData?.supplement_files?.length ? `View` : "Upload" }</Regular>
            </div> 
            
            </div>

            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>

                    <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>
                    <Regular props={"text-[10px] text-center"}>
                        Drag & Drop Option is available in the pop-out
                    </Regular>
                    <span className='text-[9px] font-xs text-gray-500'>Document files: PDF or CSV</span>

                </div>

            </div>
            </React.Fragment> 
            : 
            <React.Fragment>
            <div className='flex flex-row items-center w-full gap-2'>

                <TextDisplay props={"text-center"}><span style={{ fontSize:18}} className='text-regularGrey'>View Supplements</span></TextDisplay>

            </div>

            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>

                    <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>
                    
                    <div onClick={ ()=> setViewSupplements(true) }  className='flex flex-row items-center justify-center gap-3 px-6 py-3 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <FaRegEye/>
                        <Regular>Open</Regular>
                    </div> 

                </div>

            </div>
            </React.Fragment> 
            }

        </Card>
    </div>

          <Card props={'bg-white flex flex-col gap-5 drop-shadow-md mt-2'}> 

            <TextDisplay props={"text-left"}><span style={{ fontSize:18}} className='text-regularGrey'>Submit  Supplement Request</span></TextDisplay>

            <div className='flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer'>

                <div className='flex flex-col items-center justify-center gap-3 py-3'>

                    <img src={ DashboardIcons.DRAGDROP } alt='icon' width={50} height={50}/>

                    <Regular props={"text-[10px] text-center"}>
                        Please upload all files pertaining to supplement request
                    </Regular>

                    <div onClick={ ()=> setUploadScopeSupplementRequest(true) }  className='flex flex-row items-center justify-center gap-3 px-10 py-2 text-white duration-300 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-800 hover:transition'>
                        <Regular>Upload Files</Regular>
                    </div> 

                </div>

            </div>

        </Card>



    </React.Fragment>
  )
}

export default Upload_Scope

{/* <DTPForm getCustomer={ getCustomer } ModalToggle={setUploadDTPForm} Toggle={uploadDTPForm} file={ CustomerData.hasOwnProperty( "dtp_form" ) ? CustomerData?.dtp_form  : null }/> */}
