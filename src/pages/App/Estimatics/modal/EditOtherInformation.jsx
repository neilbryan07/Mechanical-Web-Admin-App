import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { Formik } from 'formik';
import Form from '../../../../component/Formik/Form';
import FormikInput from '../../../../component/Formik/FormikInput';
import FormItem from '../../../../component/Formik/FormItem';
import FormikSelect from '../../../../component/Formik/FormikSelect';
import FormikMultiSelect from '../../../../component/Formik/FormikMultiSelect';
import SubmitButton from '../../../../component/Formik/SubmitButton';

import { Alert, AlertTitle } from '@mui/material';

import { Switch } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import Bold from "../../../../component/Typography/Bold";
import ModalDefault from '../../../../component/Modal/ModalDefault'

import { APIServices } from '../../../../hooks/fetchAPI';


const validationSchema = Yup.object().shape({

    // other_info_threshold_percent: Yup.string().required('required field'),

});

const EditOtherInformation = ({ ModalToggle, Toggle, CustomerData }) => {

    const { id } = useParams();

    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const [ possibleTl , setPossibleTL ] = useState(CustomerData?.other_detail_possible_tl);

    let formValue = {

        other_detail_possible_tl: CustomerData?.other_detail_possible_tl,
        other_info_threshold_percent: CustomerData?.other_info_threshold_percent,
        other_detail_initial_estimate: CustomerData?.other_detail_initial_estimate,

    }

    const handleSubmit = async (value) => {
        setError(null)
        setSuccess(null)
        setLoading(true)
        value.other_detail_possible_tl = possibleTl;

        const res = await APIServices.put({ url: '/workfile/other-info/' + id, payload: value })

        if (res.status === 200) {
            setSuccess(res.data.message)
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            }, 1200);

        } else {
            setLoading(false)
            setError(res.data.message)
        }

    }

    const handleSupplementUpdate = async ( value , id ) => {

        let payloads = {
            "supplement_amount": value
        }
        
        const res = await APIServices.put({ url: '/workfile/supplement/amount/' + CustomerData?._id + '/' + id, payload: payloads })

        if (res.status === 200) {

        } 
    }

    const dataDropdown = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'Total Loss', label: 'Total Loss' },
    ]

    return (
        <ModalDefault
            title={"Edit Other Information"}
            toggle={Toggle}
            setToggle={ModalToggle}
            size={'w-[25%] h-[59%]'}
        >
            <div className='px-4'>

                <Formik
                    initialValues={formValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='px-4'>


                        <div className='mb-5 gap-2'>
                            {/* <Form.Item name="other_detail_possible_tl" label="Possible T/L">
                                <FormikSelect name="other_detail_possible_tl" options={dataDropdown} />
                            </Form.Item> */}

                            <span className='text-black text-md'>Possible T/L</span>

                            <FormControl fullWidth>
                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    value={ possibleTl }
                                    onChange={ e => { setPossibleTL( e.target.value ) } }

                                    // setPossibleTL

                                >
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                    <MenuItem value={'Total Loss'}>Total Loss</MenuItem>
                                </Select>
                         
                            </FormControl>
                        </div>
                        

                        <div className='my-3 gap-2'>
                            <Form.Item name="other_info_threshold_percent" label="Threshold Percent">
                                <FormikInput
                                    className="custom-input-number"
                                    name="other_info_threshold_percent"
                                    placeholder="Enter Threshold Percent"
                                    type="number"
                                    onWheel={event => event.currentTarget.blur()}
                                />
                            </Form.Item>
                        </div>


                        <div className='my-3 gap-2'>
                            <Form.Item name="other_detail_initial_estimate" label="Initial Estimate">
                                <FormikInput
                                    className="custom-input-number"
                                    name="other_detail_initial_estimate"
                                    placeholder="Enter Initial Estimate"
                                    type="number"
                                    onWheel={event => event.currentTarget.blur()}
                                />
                            </Form.Item>
                        </div>
                        

                        { CustomerData?.supplement_files?.map( (item , key) => (  
                            <React.Fragment key={key}>
                                <span className='text-black'>Supplement {key + 1}</span>
                                <input  
                                    onChange={ e => handleSupplementUpdate(e.target.value , item?._id ) }
                                    defaultValue={ item?.supplement_amount }
                                    className={`custom-input w-full focus:outline-none focus:border-green-700 rounded-lg border py-3 px-4 my-2`}
                                />
                            </React.Fragment>
                        ))}

                        {/* <input
                        ref={ref}
                        name={name}
                        value={value}
                        onChange={(event) => {
                            onChange(event);
                            $onChange && $onChange(event);
                        }}
                        onBlur={(event) => {
                            onBlur(event);
                            $onBlur && $onBlur(event);
                        }}
                        {...restProps}
                        className={`custom-input w-full focus:outline-none focus:border-green-700 rounded-lg border py-3 px-4 my-2 ${restProps.className}`}
                        /> */}

                        {errors ?
                            <Alert className='my-5' severity="error">
                                <AlertTitle>{errors}</AlertTitle>
                            </Alert>
                            : null}

                        {success ?
                            <Alert className='my-5' severity="success">
                                <AlertTitle>{success}</AlertTitle>
                            </Alert>
                            : null}

                        <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop: 5, marginBottom: 5 }}>

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
                                    {/* <Bold>Save</Bold> */}
                                    <Bold>Save {loading && <span className='text-white'><CircularProgress size={15} color="inherit" /></span>}</Bold>
                                </SubmitButton>
                            </>


                            <Button
                                onClick={() => ModalToggle(false)}
                                variant="outlined"
                                size="large"
                                disableElevation
                            >
                                Cancel
                            </Button>
                        </Box>

                    </Form>

                </Formik>

            </div>
        </ModalDefault>

    )
}

export default EditOtherInformation
