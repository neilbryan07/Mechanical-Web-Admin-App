import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';

import ModalDefault from '../../../Modal/ModalDefault';
import Bold from '../../../Typography/Bold';
import Card from "../../../Card/Card";

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

import { handlePhoneNumberFormat, pageRoutes } from '../../../../contants';

import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import ReactSelect from 'react-select';

import { Link, useNavigate } from 'react-router-dom';

const AuditorValidationSchema = Yup.object().shape({

    // type: 
    email: Yup.string().email('Invalid email address').required('Email is a required field'),
    // username: Yup.string().required('Username is a required field'),
    first_name: Yup.string().required('First Name is a required field'),
    last_name: Yup.string().required('Last Name is a required field'),
    password: Yup.string().required('Password is a required field'),
    confirm_password: Yup.string().required('Confirm Password is a required field'),
    mobile_number: Yup.string().required('Mobile Number is a required field'),
    region: Yup.string().required('Region is a required field'),
});

const EstimatorValidationSchema = Yup.object().shape({

    // type: 
    email: Yup.string().required('Email is a required field'),
    // username: Yup.string().required('Username is a required field'),
    first_name: Yup.string().required('First Name is a required field'),
    last_name: Yup.string().required('Last Name is a required field'),
    password: Yup.string().required('Password is a required field'),
    confirm_password: Yup.string().required('Confirm Password is a required field'),
    mobile_number: Yup.string().required('Mobile Number is a required field'),

});

const optionsTest = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
];

const Add_User = ({ Usermodal, SetUserModal }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const regionResponses = useSelector((state) => state.region.action);
    const auditorResponses = useSelector((state) => state.auditor.action);
    const estimatorResponses = useSelector((state) => state.estimator.action);


    const [regionLists, setRegionLists] = useState([]);
    const [estimatorLists, setEstimatorLists] = useState([]);
    const [auditorLists, setAuditorLists] = useState([]);

    const [userType, setUserType] = useState(null);

    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState([]);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [manager, setManager] = useState(false);
    const [status, setStatus] = useState(false);

    const [managerLevelType, setManagerLevelType] = useState([]);

    const [selectedAuditor, setSelectedAuditor] = useState(null);
    const [selectedEstimator, setSelectedEstimator] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState([]);

    let AuditorformValue = {

        email: "",
        // username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: '',
        mobile_number: "",
        region: "",
        auditor: "",

    }

    let EstimatorformValue = {

        email: "",
        // username: "",
        first_name: "",
        last_name: "",
        password: "",
        mobile_number: "",
        // type : "",
        region: "",
        estimators: "",
    }

    useEffect(() => {
        setManager(false);
        setStatus(false);
        (async () => {

            await dispatch(getRegionList());
            await dispatch(getAuditorList());
            await dispatch(getFilteredEstimator());

        })();

    }, []);


    useEffect(() => {

        if (manager) {

            setManagerLevelType([
                { value: 'CCC - Level 2', label: 'CCC - Level 2' },
                { value: 'Mitchell - Level 2', label: 'Mitchell - Level 2' },
            ])

        } else {

            setManagerLevelType([
                { value: 'CCC - Level 1', label: 'CCC - Level 1' },
                { value: 'CCC - Level 2', label: 'CCC - Level 2' },
                { value: 'Mitchell - Level 1', label: 'Mitchell - Level 1' },
                { value: 'Mitchell - Level 2', label: 'Mitchell - Level 2' },
            ])

        }

    }, [manager]);

    const handleFetchFranchiseRegion = async () => {

        const res = await APIServices.get({ url: '/franchise/region/list/all' })
        if (res?.status === 200) {
            const mapping = res?.data?.data?.map(e => ({ value: e._id, label: e.name }))
            setRegionLists(mapping)
        }
    }

    // useEffect(() => {

    //     const mapping = regionResponses?.regionResponse?.data?.map( e => ({ value : e._id , label :  e.region }) )
    //     setRegionLists(mapping)

    // }, [regionResponses]);

    // useEffect( () => {

    //     const mapping = estimatorResponses?.estimatorResponse?.data?.map( e => ({ value : e._id , label : e.first_name + " " +  e.last_name + " - [ " + [
    //         e?.estimator_details?.level_type?.map( e => e)
    //     ] + ' ]' }) )

    //     setEstimatorLists(mapping)

    // } , [estimatorResponses] )


    // useEffect( () => {

    //     const mapping = auditorResponses?.auditorResponse?.data?.map( e => ({ value : e._id, label : e.first_name + " " + e.last_name  }) )

    //     setAuditorLists(mapping)

    // } , [auditorResponses] )

    const handleSubmit = async (value) => {

        setError(null)
        setSuccess(null)
        setLoading(true);

        if (value.password.length < 8) {
            return setError("Password requires minimum of 8 characters")
        }

        if (value.password !== value.confirm_password) {
            return setError("Password is not match")
        }

        let dataValue = value;

        if (userType === 'Auditor') {

            if (selectedValue?.length === 0) {
                setLoading(false);
                return setError("Please assign Access type")
            }

            value.status = status ? 1 : 0;

            if (manager) {

                // const mappingAuditor = value?.auditor.map( e => e.value );
                const mappingAuditor = selectedAuditor.map(e => e.value);

                value['auditor_details'] = {
                    "access": selectedValue,
                    "region": value.region,
                    "is_manager": manager,
                    "auditors": mappingAuditor,

                }

            } else {

                value['auditor_details'] = {
                    "access": selectedValue,
                    "region": value.region,
                    "is_manager": false,
                    "auditors": [],
                }

            }

            const resAuditor = await APIServices.post({ url: '/user/register/auditor', payload: dataValue })

            if (resAuditor && !resAuditor.error && resAuditor.data && resAuditor.data.data) {

                let resData = resAuditor.data.data;

                setSuccess(resAuditor.data.message)
                setLoading(false);

                const mappingEstimator = selectedEstimator?.map(e => e.value);

                let EstimatorData = {
                    "estimators": mappingEstimator,
                }

                if (manager) {

                    const resAuditorManager = await APIServices.put({ url: 'user/auditor/add-estimator/' + resData?.id, payload: EstimatorData })

                    if (resAuditorManager && !resAuditorManager.error && resAuditorManager.data && resAuditorManager.data.data) {

                        return setTimeout(() => {
                            window.location.href = pageRoutes.USERS;
                            SetUserModal(false);
                        }, 1200);

                    }

                }

                return setTimeout(() => {
                    window.location.href = pageRoutes.USERS;
                    SetUserModal(false);
                }, 1200);

            } else {
                setError(resAuditor[0]?.response?.data?.message)
                setLoading(false);
            }

        } else {


            if (selectedLevel?.length === 0 || selectedLevel === null) {
                setLoading(false);
                return setError("Please assign Level Type")
            }


            value.status = status ? 1 : 0;


            // let dataMapping = dataValue?.type?.map( e => e.value)

            let dataMapping = selectedLevel?.map(e => e.value)

            if (manager) {

                // const mappingEstimator = value?.estimators?.map( e => e.value );
                const mappingEstimator = selectedEstimator?.map(e => e.value);

                value['estimator_details'] = {
                    "level_type": dataMapping,
                    "is_manager": manager,
                    "estimators": mappingEstimator,
                    "region": value.region,
                }

            } else {

                value['estimator_details'] = {
                    "level_type": dataMapping,
                    "region": value.region,
                    "is_manager": false,
                    "estimators": [],
                }

            }

            const res = await APIServices.post({ url: '/user/register/estimator', payload: dataValue })

            if (res.status === 200) {
                setSuccess(res.data.message)
                setLoading(false);
                setTimeout(() => {
                    // window.location.reload();
                    window.location.href = pageRoutes.USERS;
                    SetUserModal(false);
                }, 1200);

            } else {
                setLoading(false);
                setError(res[0].response.data.message)
            }

        }

    }

    const handleAuditorDropdown = async () => {

        let auditorData;
        let estimatorData;

        if (selectedValue.length < 2) {

            if (selectedValue.includes('CCC')) {
                auditorData = "&access=CCC";
                estimatorData = "&level_type=CCC - Level 1,CCC - Level 2";

            }
            else if (selectedValue.includes('Mitchell')) {
                auditorData = "&access=Mitchell";
                estimatorData = "&level_type=Mitchell - Level 2,Mitchell - Level 1";
            }
            else {
                auditorData = null;
                estimatorData = null;
            }
        }
        else {
            auditorData = null;
            estimatorData = null;
        }

        const resAuditor = await APIServices.get({ url: `/user/list/filter/auditor?page=1&limit=1000${auditorData}&is_manager_auditor=false&status=1`, })
        const mapping = resAuditor?.data?.data?.data.map(e => ({ value: e._id, label: e.first_name + " " + e.last_name }))

        setAuditorLists(mapping)

        const resEstimator = await APIServices.get({ url: `/user/list/filter/estimator?page=1&limit=100000${estimatorData}&is_manager_auditor=false&status=1`, })
        const mappingEstimator = resEstimator?.data?.data?.data.map(e => ({ value: e._id, label: e.first_name + " " + e.last_name }))

        setEstimatorLists(mappingEstimator)

    }


    useEffect(() => {
        handleFetchFranchiseRegion();
        handleAuditorDropdown();
    }, [selectedValue])

    const handleRadioChange = (event) => {
        handleClearOptions();
        setSelectedValue((prevSelectedItems) => {

            if (prevSelectedItems.includes(event.target.value)) {
                // Remove the item if it's already in the array
                return prevSelectedItems.filter((selectedItem) => selectedItem !== event.target.value);
            } else {
                // Add the item if it's not in the array
                return [...prevSelectedItems, event.target.value];
            }
        });

    };

    const handleChange = (event) => {
        setUserType(event.target.value);
        handleClearOptions();
    }

    const options = [
        { value: 'Auditor', label: 'Auditor' },
        { value: 'Estimator', label: 'Estimator' },
    ]

    const handleSelectAuditorChange = (selected) => {
        setSelectedAuditor(selected);
    };

    const handleSelectEstimatorChange = (selected) => {
        setSelectedEstimator(selected);
    };

    const handleSelectLevelChange = async (selected) => {
        setSelectedLevel(selected);

        if (!manager) return;
        let estimatorData;

        if (selected?.length < 2) {

            if (selected?.[0]?.label === 'CCC - Level 2') {

                estimatorData = "&level_type=CCC - Level 1,CCC - Level 2";
            }
            else if (selected?.[0]?.label === 'Mitchell - Level 2') {

                estimatorData = "&level_type=Mitchell - Level 2,Mitchell - Level 1";
            }
            else {
                estimatorData = null;
            }
        } else {
            estimatorData = null;
        }

        // const formattedValues = selected.map(item => item?.value).join(",");
        // let estimatorData =  `&level_type=${formattedValues}`;
        // /user/list/filter/estimator?page=1&limit=100000&is_manager_auditor=false&status=1${estimatorData}
        const resEstimator = await APIServices.get({ url: `/user/list/filter/estimator?page=1&limit=100000${estimatorData}&is_manager_auditor=false&status=1`, })
        const mappingEstimator = resEstimator?.data?.data?.data.map(e => ({ value: e._id, label: e.first_name + " " + e.last_name }))

        setEstimatorLists(mappingEstimator)
    };

    const handleClearOptions = () => {
        setSelectedAuditor(null);
        setSelectedEstimator(null);
        setSelectedLevel(null);
    };

    const handleManager = (event) => {

        setManager(event.target.checked);
        handleClearOptions();
    };

    const handleStatus = (event) => {
        setStatus(event.target.checked);
    };

    const handleLevelType = () => {
        return (
            <div className='gap-2 my-5'>

                <Form.Item name="type" label="Level Type">
                    <ReactSelect
                        options={managerLevelType}
                        value={selectedLevel}
                        onChange={handleSelectLevelChange}
                        isMulti
                        className="basic-multi-select custom-input" name="type"
                    />
                </Form.Item>

            </div>
        )
    }


    return (
        <ModalDefault
            title={"Add Users"}
            toggle={Usermodal}
            setToggle={SetUserModal}
            size={'w-4/12'}
        >

            <div className='px-4'>

                <div className='flex flex-row items-center justify-between w-full'>

                    <div className='flex flex-col w-full'>

                        <span style={{ fontSize: 16 }} className='text-black'>Status</span>

                        <div className='flex flex-row items-center gap-3 mb-4'>

                            <span className='text-sm font-semibold text-gray-400'>Inactive</span>
                            <Switch checked={status} onChange={handleStatus} color="success" />
                            <span className={` ${status ? 'text-green-500' : 'text-gray-400 '} font-semibold text-sm`}>Active</span>

                        </div>

                    </div>

                    <div className='flex flex-col w-full'>

                        <span style={{ fontSize: 16 }} className='text-black'>Tagged as Manager</span>

                        <div className='flex flex-row items-center gap-3 mb-4'>

                            <span className='text-sm font-semibold text-gray-400'>No</span>
                            <Switch checked={manager} onChange={handleManager} color="success" />
                            <span className={` ${manager ? 'text-green-500' : 'text-gray-400 '} font-semibold text-sm`}>Yes</span>

                        </div>

                    </div>

                </div>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="Type"
                        onChange={handleChange}
                    >

                        {options.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}

                    </Select>


                </FormControl>

            </div>

            {userType ?

                <Formik
                    initialValues={userType === 'Auditor' ? AuditorformValue : EstimatorformValue}
                    validationSchema={userType === 'Auditor' ? AuditorValidationSchema : EstimatorValidationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='px-4'>

                        {userType === 'Auditor' ?

                            <FormControl fullWidth>

                                <FormLabel>Access</FormLabel>

                                <div className='flex flex-col items-center'>

                                    <FormGroup row>

                                        <FormControlLabel control={<Checkbox color="success" icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />}
                                            onChange={handleRadioChange} value="CCC" />} label="CCC" />

                                        <FormControlLabel control={<Checkbox color="success" icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />}
                                            onChange={handleRadioChange} value="Mitchell" />} label="Mitchell" />

                                    </FormGroup>

                                    <Card props={"w-full mb-4"}>


                                        <React.Fragment>

                                            <div className='gap-2 my-5'>
                                                <Form.Item name="region" label="Region">
                                                    <FormikSelect name="region" options={regionLists} />
                                                </Form.Item>
                                            </div>

                                            {manager &&

                                                <React.Fragment>

                                                    <div className='w-full'>
                                                        <Form.Item name="auditor" label="Assign Auditor">
                                                            <ReactSelect
                                                                options={auditorLists}
                                                                value={selectedAuditor}
                                                                onChange={handleSelectAuditorChange}
                                                                isMulti
                                                                className="basic-multi-select custom-input" name="auditor"
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <div className='w-full'>
                                                        <Form.Item name="estimators" label="Assign Estimator">
                                                            <ReactSelect
                                                                options={estimatorLists}
                                                                value={selectedEstimator}
                                                                onChange={handleSelectEstimatorChange}
                                                                isMulti
                                                                className="basic-multi-select custom-input" name="estimators"
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                </React.Fragment>

                                            } </React.Fragment>


                                    </Card>

                                </div>

                            </FormControl>

                            : null}

                        {userType === 'Estimator' ?

                            <React.Fragment>

                                {handleLevelType()}

                                <Card props={"w-full mb-4"}>


                                    <div className='gap-2 my-5'>
                                        <Form.Item name="region" label="Region">
                                            <FormikSelect name="region" options={regionLists} />
                                        </Form.Item>
                                    </div>

                                    {manager &&
                                        <div className='gap-2 my-5'>
                                            {/* <Form.Item name="estimators" label="Assign Estimator">
                                    <FormikMultiSelect isMulti className="basic-multi-select" classNamePrefix="select" name="estimators" options={estimatorLists}/>
                                </Form.Item> */}

                                            <Form.Item name="estimators" label="Assign Estimator">
                                                <ReactSelect
                                                    options={estimatorLists}
                                                    value={selectedEstimator}
                                                    onChange={handleSelectEstimatorChange}
                                                    isMulti
                                                    className="basic-multi-select custom-input" name="estimators"
                                                />
                                            </Form.Item>
                                        </div>
                                    }

                                </Card>

                            </React.Fragment>



                            : null}

                        <div className='gap-2 mb-3'>
                            <Form.Item name="first_name" label="First Name">
                                <FormikInput name="first_name" placeholder="Enter First name" />
                            </Form.Item>
                        </div>

                        <div className='gap-2 mb-3'>
                            <Form.Item name="last_name" label="Last Name">
                                <FormikInput name="last_name" placeholder="Enter Last name" />
                            </Form.Item>
                        </div>

                        <div className='gap-2 my-3'>
                            <Form.Item name="mobile_number" label="Mobile Number">
                                <FormikInput name="mobile_number" placeholder="Enter mobile number" value={phoneNumber} maxlength="14" autocomplete="off"
                                    onChange={e => handlePhoneNumberFormat(e, setPhoneNumber)} />
                            </Form.Item>
                        </div>
                        {/* 
                <div className='gap-2 my-3'>
                    <Form.Item name="username" label="Username">
                        <FormikInput name="username" placeholder="Enter username"/>
                    </Form.Item>
                </div> */}

                        <div className='gap-2 my-3'>
                            <Form.Item name="email" label="Email Address">
                                <FormikInput name="email" placeholder="Enter email address" type="email" />
                            </Form.Item>
                        </div>

                        <div className='gap-2 my-3'>
                            <Form.Item name="password" label="Password">
                                <FormikInput.Password name="password" placeholder="Enter Password" />
                            </Form.Item>
                        </div>

                        <div className='gap-2 my-3'>
                            <Form.Item name="confirm_password" label="Confirm Password">
                                <FormikInput.Password name="confirm_password" placeholder="Enter Confirm Password" />
                            </Form.Item>
                        </div>

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
                                    <Bold>Save {loading && <span className='text-white'><CircularProgress size={15} color="inherit" /></span>}</Bold>
                                </SubmitButton>
                            </>


                            <Button
                                onClick={() => SetUserModal(false)}
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
                :

                <div className='px-4 mt-2'>
                    <Bold>Please Select User Type</Bold>
                </div>

            }
        </ModalDefault>
    )
}

export default Add_User
