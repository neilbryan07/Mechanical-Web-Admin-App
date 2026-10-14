import React , { useState } from 'react'

import Card from '../../../../component/Card/Card';
import Bold from '../../../../component/Typography/Bold';
import ModalDefault from '../../../../component/Modal/ModalDefault'
import ScopeTextContainer from './ViewScopeDetails/ScopeTextContainer';
import ScopeBendContainer from './ViewScopeDetails/ScopeBendContainer';
import Regular from '../../../../component/Typography/Regular';

import { IoPrintSharp } from "react-icons/io5";

import SectionOne from './ViewScopeDetails/SectionOne';
import SectionTwo from './ViewScopeDetails/SectionTwo';
import SectionThree from './ViewScopeDetails/SectionThree';
import SectionFour from './ViewScopeDetails/SectionFour';
import SectionFive from './ViewScopeDetails/SectionFive';
import SectionSix from './ViewScopeDetails/SectionSix';
import { Grid } from '@mui/material';

import { PDFDownloadLink } from '@react-pdf/renderer';

import Supplement_Print_Content from '../../../../component/Printable_Content/Supplement_Print_Content';

const ViewScopeData = ({ getCustomer, ModalToggle, Toggle }) => {

  const [ printPDF , setPrintPDF ] = useState(false);

  return (
    <ModalDefault
      title={getCustomer?.sheet_name}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'w-[60%] h-[90%]'}
    >

      <ModalDefault
        title={"Testing Print"}
        toggle={printPDF}
        setToggle={setPrintPDF}
        size={'w-[40%] h-[90%]'}
      >

          <Supplement_Print_Content getCustomer={getCustomer} />
      
      </ModalDefault>

      <div className='px-4 pb-4'>

        <div className='w-full flex flex-row justify-end mb-5' >

            <div className='w-full flex flex-row justify-end mb-5'>
              <PDFDownloadLink document={ <Supplement_Print_Content getCustomer={getCustomer}/> } fileName='Initial Scope'>
                <div className='flex flex-row gap-3 items-center justify-center py-2 px-5 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                    <IoPrintSharp/>
                    <Regular>Print as PDF</Regular>
                </div> 
              </PDFDownloadLink>
            </div>

          {/* <div className='flex flex-row gap-3 items-center justify-center py-2 px-5 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
            <IoPrintSharp />
            <Regular>Print as PDF</Regular>
          </div> */}

        </div>

        <div className='w-full flex flex-col gap-8'>

          <SectionOne getCustomer={getCustomer} />
          <SectionTwo getCustomer={getCustomer} />
          <SectionThree getCustomer={getCustomer} />
          <SectionFour getCustomer={getCustomer} />
          <SectionFive getCustomer={getCustomer} />
          <SectionSix getCustomer={getCustomer} />


        </div>
      </div>
    </ModalDefault>
  )
}

export default ViewScopeData
