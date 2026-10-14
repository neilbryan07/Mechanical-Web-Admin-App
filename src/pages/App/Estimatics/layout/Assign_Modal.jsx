import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';

import Bold from '../../../../component/Typography/Bold'

import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';

import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material';

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import FormikMultiSelect from '../../../../component/Formik/FormikMultiSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import { APIServices } from '../../../../hooks/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditorList } from '../../../../redux/auditor/auditorThunk';
import { getFilteredEstimator } from '../../../../redux/estimator/estimatorThunk';

import { Alert, AlertTitle } from '@mui/material';

import { queryData } from '../../../../contants';

const validationSchema = Yup.object().shape({

    // auditor: Yup.string().required('Assign Adjuster is a required field'),
    // estimator: Yup.array().required('Assign Estimator is a required field'),
    
});

const Assign_Modal = ({ 
    title ,toogle , setToggle , loader = false , shopList = null , assign_data = null
}) => {

    let formValue = {
        estimator : [],
        auditor : [],
        shop : '',
    }

    let location = useLocation();
    const dispatch = useDispatch();

    const [ shopLists , setShopLists ] = useState([]);
    const [ estimatorLists , setEstimatorLists ] = useState([]);
    const [ adjusterLists , setAdjusterLists ] = useState([]);
    const [ auditorLists , setAuditorLists ] = useState([]);

    const [ errors , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const [ checkUser , setCheckerUser ] = useState(null);

    const auditorResponses = useSelector( (state) => state.auditor.action );
    const estimatorResponses = useSelector( (state) => state.estimator.action );

    useEffect(() => {

        (async () => {
  
          await dispatch( getAuditorList() );
          await dispatch( getFilteredEstimator() );
  
        })()
  
    }, []);

    useEffect( () => {

        const mapping = shopList?.shopResponse?.data?.map( e => ({ value : e._id , label : e.name }) )
        setShopLists(mapping)
     
   } , [shopList] )

    useEffect(() => {

        const fetchData = async () => {
          try {

            let querySelection = 0;

            if ( checkUser?.auditor_details?.access.length < 2 || checkUser?.estimator_details?.level_type.length < 2 ) {
                    
                if ( checkUser?.auditor_details?.access?.[0] === 'CCC' || checkUser?.estimator_details?.level_type?.[0].includes('CCC') ) 
                    querySelection = 1;
                else 
                    querySelection = 2;
    
            }   

            let mapping , mappingEstimator ;

            if ( checkUser?.role === 6 ) {

                mapping = checkUser?.auditor_details?.auditors?.map( e => ({ value : e._id, label : e.first_name + " " + e.last_name  }) )

            } else {
                const resAuditor = await APIServices.get({ url: queryData?.[querySelection]?.queryAuditor , })
                mapping = resAuditor?.data?.data?.data.map( e => ({ value : e._id, label : e.first_name + " " + e.last_name  }) )
            }


            setAuditorLists(mapping)

            
            if ( checkUser?.role === 5 ) {

                mappingEstimator = checkUser?.estimator_details?.estimators?.map( e => ({ value : e._id, label : e.first_name + " " + e.last_name + " - [ " + [
                    checkUser?.estimator_details?.level_type?.map( e => e)
                ] + ' ]' }) )

            } else {

                const resEstimator = await APIServices.get({ url: queryData?.[querySelection]?.queryEstimator ,})
                mappingEstimator = resEstimator?.data?.data?.data.map( e => ({ value : e._id , label : e.first_name + " " +  e.last_name + " - [ " + [
                    e?.estimator_details?.level_type?.map( e => e)
                ] + ' ]' }) )

            }

            setEstimatorLists(mappingEstimator)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        if( checkUser !== null ) fetchData();
   
      }, [checkUser]);

    useEffect(() => {

        const fetchDataProfile = async () => {

            try {
                const res = await APIServices.get({ url: '/user/profile/me' })
                if ( res?.data?.data ) {
                    setCheckerUser( res?.data?.data  );
                } 
  
            } catch (error) {
                setCheckerUser( null );
                console.error('Error fetching data:', error);
            }

        }

        fetchDataProfile();

    }, []);

    const handleSubmit = async (value) => {
        
        setLoading(true)
        var filteredData = shopList?.shopResponse?.data?.filter(item => value?.shop.includes(item._id));
        const mapEstimator = value?.estimator?.map( e => e.value )
        const mapAuditor = value?.auditor?.map( e => e.value )

        let data = {
            "workfiles": assign_data,
            "estimators": mapEstimator,
            "auditors": mapAuditor,
            "shop_name": filteredData?.[0]?.name,
            "shop_address": filteredData?.[0]?.address,
            "shop_phone_number": filteredData?.[0]?.contact?.phone_number,
            "shop_email_address": filteredData?.[0]?.email,
        }

        const res = await APIServices.put({ url: '/workfile/multiple/assignment', payload: data });

        if (res.status === 200) {
            setLoading(false)
            setSuccess(res.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setLoading(false)
            setError("Error while Assigning Data")
        }

    }

  return (
    <ModalDefault 
        title={title}
        toggle={toogle}
        setToggle={setToggle}
        size={'h-[60%] w-4/12'}
      >
        <Formik
            initialValues={formValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className='px-4'>
                
                <div className='w-full flex flex-row items-center justify-between'>
                        
                    <div className='flex flex-row gap-2 items-center'>     
                        <span style={{ fontSize:16}} className='text-mainText'><Bold>{assign_data?.length} Items Selected</Bold></span>                 
                    </div>
                        
                </div>

                <React.Fragment>

                    <div className='my-5 gap-2'>

                        <Form.Item name="shop" label="Shop Name">
                            <FormikSelect name="shop" options={shopLists}/>
                        </Form.Item>

                    </div>

                    <div className='my-5 gap-2'>

                        <Form.Item name="estimator" label="Assign Estimator">
                            <FormikMultiSelect isMulti className="basic-multi-select" classNamePrefix="select" name="estimator" options={estimatorLists}/>
                        </Form.Item>

                    </div>

                    <div className='flex flex-row gap-2 items-center'>     
                        <span style={{ fontSize:14}} className='text-gray-800'>Search and select estimator, You can select multiple assign.</span>                 
                    </div>

                    <div className='my-5 gap-2'>

                        {/* <Form.Item name="auditor" label="Assign Auditor">
                            <FormikSelect name="auditor" options={auditorOptions}/>
                        </Form.Item> */}

                        <Form.Item name="auditor" label="Assign Auditor">
                            <FormikMultiSelect isMulti className="basic-multi-select" classNamePrefix="select" name="auditor" options={auditorLists}/>
                        </Form.Item>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>     
                        <span style={{ fontSize:14}} className='text-gray-800'>Search and select auditor, You can select multiple assign.</span>                 
                    </div>

                </React.Fragment>

                
                { errors ? 
                    <Alert className='my-5' severity="error">
                        <AlertTitle>{errors}</AlertTitle>
                    </Alert> 
                : null  }

                { success ? 
                    <Alert className='my-5' severity="success">
                        <AlertTitle>{success}</AlertTitle>
                    </Alert> 
                : null  }

                <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop : 5, marginBottom : 5 }}>

                    <SubmitButton
                        loading={false}
                        className={`
                            px-10
                            py-3
                            !bg-secondaryText
                            !rounded-md
                            !text-center
                            !text-white
                        `}
                    >
                        <Bold>Save { loading &&  <span className='text-white'><CircularProgress size={15} color="inherit"/></span>}</Bold>
                    </SubmitButton>
                 
                    <Button
                      onClick={ () => setToggle(false) }
                      variant="outlined"
                      size="large"
                      disableElevation
                    >
                      Cancel
                    </Button>   
                </Box>

                { loader && <LinearProgress/> }

            </Form>

      </Formik>
    </ModalDefault>
  )
}

export default Assign_Modal