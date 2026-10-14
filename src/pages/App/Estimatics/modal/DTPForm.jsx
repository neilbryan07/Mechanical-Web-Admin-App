import React , { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Header from '../../../../component/Typography/Header'
import Card from '../../../../component/Card/Card';
import Regular from '../../../../component/Typography/Regular';

import ModalDefault from '../../../../component/Modal/ModalDefault'

import { EstimaticsImg } from '../../../../contants'

import DragAndDropEstimatics from '../../../../component/DragAndDrop/DragandDropEstimatics'

import UploadedFilesModal from './UploadedFilesModal'

import { APIServices } from '../../../../hooks/fetchAPI'

import { Alert, AlertTitle , CircularProgress } from '@mui/material';
import { IoPrintSharp } from "react-icons/io5";

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import FormikMultiSelect from '../../../../component/Formik/FormikMultiSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import DTP_Print_Content from '../../../../component/Printable_Content/DTP_Print_Content';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const validationSchema = Yup.object().shape({

  // region: Yup.string().required('Region is a required field'),
  // shops: Yup.string().required('Shop Assigned is a required field'),
});

const DTPForm = ({ file , ModalToggle , Toggle , getCustomer }) => {

    const { dtp } = file;

    const { id } = useParams();

    const [ fileUpload , setFileUpload ] = useState(null)
    const [ viewFile , setViewFile ] = useState(false);
    const [ imageToView , setImageToView ] = useState(false)

    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const [ handlePrint , setHandlePrint ] = useState(true);

    let formValue = {

      number : '',

      // Currently Active Based from the API response
      email : '',
      first_name : '',
      last_name : '',

      pay_percentage : '',
      shops : '',
      region : '',
      role: 2,
      status: 1,
      verified: false,

      username : '',
      password : '',
      confirm_password : '',
  }


    useEffect(() => {

        if ( Toggle ) {
            setFileUpload(null)
        }
  
    }, [Toggle]);

    const handleImageViewUpload = (data) => {
        setViewFile(true)
        setImageToView(data)
    }

    const handleSubmit = async () => {
      setLoading(true);
      const formDatas = new FormData();
      formDatas.append( 'file', fileUpload );

      const res = await APIServices.post({ url: `workfile/upload/file/dtp/${id}`, payload: formDatas })

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(function() {
          setLoading(false);
          getCustomer();
        }, 1500);

      }

    }

    const handleDate = (date) => {

      if(!date) {
        return "N/A";
      }

      let dateObject = new Date(date);

      let day =  parseInt(dateObject.getUTCDate()) >= 9 ?  dateObject.getUTCDate() : '0' + dateObject.getUTCDate() ;
      let month = parseInt(dateObject.getUTCMonth()) >= 10 ? dateObject.getUTCMonth() + 1 :  `0${dateObject.getUTCMonth() + 1}`;
      let year =  dateObject.getUTCFullYear();

      return day + "/" + month + "/" + year;
      
    }

  return (
    <ModalDefault 
        title={"Direction To Pay"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[45%] h-[95%]'}
    >

        {/* <ModalDefault 
          title={"DIRECTION OF PAYMENT"}
          toggle={handlePrint}
          setToggle={setHandlePrint}
          size={'w-[45%] h-[95%]'}
        >

          <DTP_Print_Content data={dtp}/>

        </ModalDefault> */}

      <div className='px-4'>

        <Formik
            initialValues={formValue}
            validationSchema={validationSchema}
            // onSubmit={handleSubmit}
        >
          <Form>


            <div className='w-full flex flex-row justify-end mb-5'>
              <PDFDownloadLink document={ <DTP_Print_Content data={dtp}/> } fileName='DTP'>
                <div className='flex flex-row gap-3 items-center justify-center py-2 px-5 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                    <IoPrintSharp/>
                    <Regular>Print as PDF</Regular>
                </div> 
              </PDFDownloadLink>
            </div>

          

            <Card>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Shop Name">
                        <FormikInput name="first_name" placeholder="Enter Shop Name" value={dtp?.shop} readOnly/>
                    </Form.Item>
                </div>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="EIN #">
                        <FormikInput name="first_name" placeholder="Enter EIN" value={dtp?.ein_number} readOnly/>
                    </Form.Item>
                </div>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Mailing Address">
                        <FormikInput name="first_name" placeholder="Enter Mailing Address" value={dtp?.mailing_address} readOnly/>
                    </Form.Item>
                </div>

                <div className='w-full flex flex-row gap-3'>

                    <div className='w-full'>
                        <Form.Item name="city" label="City">
                            <FormikInput name="city" placeholder="Enter City" value={dtp?.city}/>
                        </Form.Item>
                    </div>

                    <div className='w-full'>
                        <Form.Item name="state" label="State">
                            <FormikInput name="state" placeholder="Enter state" value={dtp?.state}/>
                        </Form.Item>
                    </div>

                    <div className='w-full'>
                        <Form.Item name="zip_code" label="Zip Code">
                            <FormikInput name="zip_code" placeholder="Enter zip code" value={dtp?.zip_code}/>
                        </Form.Item>
                    </div>

                </div>


            </Card>

            <div className='w-full text-justify my-3'>
              <span className='text-black font-semibold text-[18px]'>
                  I hereby authorize this certified repair center to repair my vehicle in accordance with the approved insurance estimate associated with the claim number listed below. I understand that all payments made by my insurance provider regarding this claim will be paid to the repair center for services provided including but not limited to, the initial repair estimate payment, the deductible and any supplemental payments made for additional damages and/or services. I agree to turn over, re-issue or otherwise release to the repair center any payments made on behalf of my insurance provider in my name or the name of any third party (I.E: Lien Holder) for the repairs associated with the claim number listed below.
              </span>
            </div>

            <Card>

              <div className='w-full flex flex-row gap-3'>

                  <div className='w-full'>
                      <Form.Item name="city" label="Initial">
                          <FormikInput name="city" placeholder="Enter Initial" value={dtp?.initial} readOnly/>
                      </Form.Item>
                  </div>

                  <div className='w-full'>
                      <Form.Item name="zip_code" label="Date">
                          <FormikInput name="zip_code" placeholder="Enter Date" value={handleDate(dtp?.createdAt)} readOnly/>
                      </Form.Item>
                  </div>

              </div>

            </Card>

            <div className='w-full text-justify my-3'>
              <span className='text-black font-semibold text-[18px]'>
              I authorize this certified repair center to choose the least invasive repair method possible to restore my vehicle to its pre-claim condition. This repair method will include Paintless Dent Repair and the repair center may substitute Paintless Dent Repair for panel replacement at their discretion provided the repair is less invasive to the vehicle and restores the vehicle to its pre-claim condition or exceeds it. Acting as my own agent, with my signature I give this certified repair center limited power of attorney to sign all insurance related proof of loss and resolution of loss forms directly attributable to the repairs associated with the specific claim number listed below including all payment drafts and supplemental request drafts. I furthermore authorize my insurance provider to re-issue all previous payments and issue all further payments directly associated with the claim number listed below to this certified repair center.
              </span>
            </div>

            <Card>

                {/* <div className='gap-2'>
                    <Form.Item name="first_name" label="Date">
                        <FormikInput name="first_name" placeholder="Enter Date" readOnly/>
                    </Form.Item>
                </div> */}

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Vehicle Owner">
                        <FormikInput name="first_name" placeholder="Enter Vehicle Owner" readOnly value={dtp?.vehicle_owner}/>
                    </Form.Item>
                </div>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Vehicle">
                        <FormikInput name="first_name" placeholder="Enter Vehicle" readOnly value={dtp?.vehicle}/>
                    </Form.Item>
                </div>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Insurance Provider">
                        <FormikInput name="first_name" placeholder="Enter Insurance Provider" readOnly value={dtp?.insurance_provider}/>
                    </Form.Item>
                </div>

                <div className='gap-2'>
                    <Form.Item name="first_name" label="Claim #">
                        <FormikInput name="first_name" placeholder="Enter Claim Number"  readOnly value={dtp?.claim_number}/>
                    </Form.Item>
                </div>

                <div className='w-full flex flex-col gap-3 items-center justify-center'>

                  {dtp?.signature?.map((column) => (
                      <div className='cursor-pointer'>
                          <img src={`https://ice-api1.com/public/images/signature/${column}`} alt='icon' style={{ height : '70px' , width : '70px' }}/>
                      </div>
                  ))}

                  <span className='text-black font-semibold text-[14px]'>Vehicle Owner's Signature</span>

                </div>

            </Card>

            <div className='w-full text-justify my-3'>
              <span className='text-black font-semibold text-[18px]'>
              *Repair Center is not responsible for lost or stolen items in vehicle and asks that all items be removed from vehicle prior to scheduled date of repair. Repair Center is not responsible for any damage to vehicle that occurs beyond the reasonable control and supervision of the repair center.
              </span>
            </div>

          </Form>

        </Formik>

      </div>
    </ModalDefault>
   
  )
}

export default DTPForm
