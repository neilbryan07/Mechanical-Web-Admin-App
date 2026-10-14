import React, { useState , useEffect } from 'react'
import * as Yup from 'yup';

import ModalDefault from '../../../../component/Modal/ModalDefault';
import Bold from '../../../../component/Typography/Bold';
import Card from '../../../../component/Card/Card';

import { Switch } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Formik, useFormikContext } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import FormikMultiSelect from '../../../../component/Formik/FormikMultiSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Alert, AlertTitle } from '@mui/material';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { APIServices } from '../../../../hooks/fetchAPI';
import { getRegionList } from '../../../../redux/region/regionThunk';
import { getAuditorList } from '../../../../redux/auditor/auditorThunk';
import { getFilteredEstimator } from '../../../../redux/estimator/estimatorThunk';

import { handlePhoneNumberFormat } from '../../../../contants';

import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import ReactSelect  from 'react-select';

const FranchiseValidationSchema = Yup.object().shape({

    email: Yup.string().required('Email is a required field'),
    full_name: Yup.string().required('Full Name is a required field'),
    password: Yup.string().required('Password is a required field'),
    confirm_password : Yup.string().required('Confirm Password is a required field'),
    phone_number: Yup.string().required('Mobile Number is a required field'),
    region : Yup.string().required('Region is a required field'),

});


const AddFranchise = ({ Franchisemodal , SetFranchiseModal }) => {

    const dispatch = useDispatch();

    const regionResponses = useSelector((state) => state.region.action);

    const [ regionLists , setRegionLists ] = useState([]);

    const [ userType , setUserType ] = useState(null);

    const [ errors , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const [selectedValue, setSelectedValue] = useState([]);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [ manager , setManager ] = useState(false);
    const [ status , setStatus ] = useState(false);

    const [ selectedAuditor, setSelectedAuditor ] = useState(null);
    const [ selectedEstimator , setSelectedEstimator ] = useState(null);
    const [ selectedLevel, setSelectedLevel ] = useState([]);

    let FranchiseformValue = {
        
        full_name: "",
        region : "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password : '',

    }

    useEffect(() => {
        setManager(false);
        setStatus(false);
        (async () => {

        await dispatch( getRegionList() );

        })();

    }, []);


    useEffect(() => {

        const mapping = regionResponses?.regionResponse?.data?.map( e => ({ value : e._id , label :  e.region }) )
        setRegionLists(mapping)

    }, [regionResponses]);


    const handleSubmit = async (value) => {

        setError(null)
        setSuccess(null)
        setLoading(true);

        if( value.password.length < 8 ) {
            return setError("Password requires minimum of 8 characters")
        }

        if( value.password !== value.confirm_password ) {
            return setError("Password is not match")
        }

        
        let dataValue = value;

        const res = await APIServices.post({ url: '/franchise/region/add', payload: dataValue })

        if (res.status === 200) {
            setSuccess(res.data.message)
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setLoading(false)
            setError(res[0].response.data.message)
        }


    }

  return (
    <ModalDefault 
        title={"Add a Franchise Region"}
        toggle={ Franchisemodal }
        setToggle={ SetFranchiseModal }
        size={'w-4/12'}
    >

        <Formik
            initialValues={ FranchiseformValue }
            validationSchema={ FranchiseValidationSchema }
            onSubmit={ handleSubmit }
        >
            <Form className='px-4'>

                <div className='mb-3 gap-2'>
                    <Form.Item name="full_name" label="Full Name">
                        <FormikInput name="full_name" placeholder="Enter Full Name"/>
                    </Form.Item>
                </div>
                

                <div className='my-5 gap-2'>
                    <Form.Item name="region" label="Region">
                        <FormikSelect name="region" options={regionLists}/>
                    </Form.Item>
                </div>

                <div className='my-3 gap-2'>
                    <Form.Item name="phone_number" label="Phone Number">
                        <FormikInput name="phone_number" placeholder="Enter Phone number" value={phoneNumber} maxlength="14" autocomplete="off"
                        onChange={ e => handlePhoneNumberFormat( e , setPhoneNumber )} />
                    </Form.Item>
                </div>

                <div className='my-3 gap-2'>
                    <Form.Item name="email" label="Email Address">
                        <FormikInput name="email" placeholder="Enter email address" type="email"/>
                    </Form.Item>
                </div>

                <div className='my-3 gap-2'>
                    <Form.Item name="password" label="Password">
                        <FormikInput.Password name="password" placeholder="Enter Password" />
                    </Form.Item>
                </div>

                <div className='my-3 gap-2'>
                    <Form.Item name="confirm_password" label="Confirm Password">
                        <FormikInput.Password name="confirm_password" placeholder="Enter Confirm Password" />
                    </Form.Item>
                </div>

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

                        <>

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
                        </>
                    

                    <Button
                      onClick={ () => SetFranchiseModal(false) }
                    //   sx={{ mt: 1, mr: 1 }}
                      variant="outlined"
                      size="large"
                      disableElevation
                    >
                      Cancel
                    </Button>   
                </Box>

            </Form>

      </Formik>

    </ModalDefault>
  )
}

export default AddFranchise
