import React, { useState, useEffect } from 'react';

import Header from '../../../../component/Typography/Header';
import SubHeader from '../../../../component/Typography/SubHeader';
import TextInputs from '../../../../component/FormInput';
import MainButton from '../../../../component/CustomButton/MainButton';
import Bold from '../../../../component/Typography/Bold';

import { Alert, AlertTitle } from '@mui/material';
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

import { useDispatch, useSelector } from 'react-redux';

import { getStormLocationList } from '../../../../redux/storm_location/stormLocationThunk';
import { APIServices } from '../../../../hooks/fetchAPI';

const AuditSettingTabs = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const [globalAudit, setGlobalAudit] = useState(null);
    const [globalStormLocation, setGlobalStormLocation] = useState(null);
    const [globalCCC, setGlobalCCC] = useState(null);
    const [globalMitchell, setGlobalMitchell] = useState(null);
    const [selectedValue, setSelectedValue] = useState([]);


    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const { action, stormLocationResponse } = useSelector((state) => state.stormLocation);

    const pagingStorm = action?.stormLocationResponse?.data;

    useEffect(() => {

        (async () => {

            const pagination = {
                page: 1,
                limit: 10000,
            }

            await dispatch(getStormLocationList(pagination));

        })()

    }, []);


    const handleRadioChange = (event) => {
        setSelectedValue((prevSelectedItems) => {

            if (prevSelectedItems.includes(event.target.value)) {
                return prevSelectedItems.filter((selectedItem) => selectedItem !== event.target.value);
            } else {
                return [...prevSelectedItems, event.target.value];
            }
        });

    };

    const handleSubmit = async () => {

        if (globalAudit === null && globalCCC === null && globalMitchell === null) return setError("Please complete the edit audit setting");

        let dataValue = {
            "audit_settings": {
                "global_audit_percent": globalAudit,
                "estimate_partners": selectedValue,
                "ccc_percentage": globalCCC,
                "mitchell_percentage": globalMitchell
            }
        };


        const resAudit = await APIServices.put({ url: `/stormlocation/update/audit/settings/${globalStormLocation}`, payload: dataValue })

        if (resAudit.status === 200) {
            setSuccess("Audit Setting succesfully edited")
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }

    }


    return (
        <div className='flex flex-col items-center justify-center'>

            <div className='flex flex-col items-center w-3/6 mb-10'>

                <form className='w-full'>

                    <div className='w-full flex flex-col items-center justify-center mb-10'>
                        <Header>Audit Settings</Header>
                    </div>

                    <div className='my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Global Audit Percentage</SubHeader></span>
                        <TextInputs value={globalAudit} onChange={e => setGlobalAudit(e.target.value)} placeholder={"Enter percentage"} type={"number"} />
                    </div>

                    <FormControl fullWidth>
                        <span className='flex flex-row gap-2 mb-2'><SubHeader>Create Custom Percentage by Storm Location</SubHeader></span>
                        <Select
                            id="demo-simple-select"
                            onChange={e => setGlobalStormLocation(e.target.value)}
                            value={globalStormLocation}
                        >

                            {pagingStorm?.data?.map(item => (
                                <MenuItem value={item?._id}>{item?.storm_profile}</MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    <div className='w-full my-3'>
                        <span className='flex flex-row gap-2'><SubHeader>Estimate Partners</SubHeader></span>

                        <FormControl fullWidth>

                            <div className='flex flex-col items-center'>

                                <FormGroup row>

                                    <FormControlLabel control={<Checkbox color="success" value="CCC" onChange={handleRadioChange} />} label="CCC" />

                                    <FormControlLabel control={<Checkbox color="success" value="Mitchell" onChange={handleRadioChange} />} label="Mitchell" />

                                </FormGroup>

                            </div>

                        </FormControl>

                    </div>

                    {selectedValue?.includes('CCC') &&
                        <div className='my-3'>
                            <span className='flex flex-row gap-2'><SubHeader>CCC Percentage</SubHeader></span>
                            <TextInputs value={globalCCC} onChange={e => setGlobalCCC(e.target.value)} placeholder={"Enter percentage"} type={"text"} />
                        </div>
                    }

                    {selectedValue?.includes('Mitchell') &&
                        <div className='my-3'>
                            <span className='flex flex-row gap-2'><SubHeader>Mitchell Percentage</SubHeader></span>
                            <TextInputs value={globalMitchell} onChange={e => setGlobalMitchell(e.target.value)} placeholder={"Enter percentage"} type={"text"} />
                        </div>
                    }


                </form>


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

                <div className='w-11/12 my-3'>
                    <button onClick={() => handleSubmit()} className={`w-full px-10 py-3 bg-mainText rounded-full text-center text-white hover:bg-green-600 hover:transition duration-300`}>
                        <Bold>Submit</Bold>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default AuditSettingTabs
