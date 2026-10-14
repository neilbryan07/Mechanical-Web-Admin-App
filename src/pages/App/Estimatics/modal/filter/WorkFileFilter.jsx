import React , { useState , useEffect , useRef } from 'react'
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FaUserCircle } from "react-icons/fa";

import Bold from '../../../../../component/Typography/Bold';
import ModalDefault from '../../../../../component/Modal/ModalDefault';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker , DateRange } from 'react-date-range';
import { MdKeyboardArrowRight , MdKeyboardArrowDown   } from "react-icons/md";

import { APIServices } from '../../../../../hooks/fetchAPI';

import { FaTrash } from "react-icons/fa";

import { Formik } from 'formik';
import Form from '../../../../../component/Formik/Form';
import FormikSelect from '../../../../../component/Formik/FormikSelect';
import FormikMultiSelect from "../../../../../component/Formik/FormikMultiSelect";
import SubmitButton from '../../../../../component/Formik/SubmitButton';

import { formatMonthDateYear , formatMonthDateYearWithMonthName } from "../../../../../contants/index";

const validationSchema = Yup.object().shape({});

const WorkfileFilter = ({ ModalToggle , Toggle , handleFilter , isShop = false }) => {

  const [ userType , setUserType ] = useState(null);
  const [ storm , setStorm ] = useState([]);
  const [ region , setRegion ] = useState([]);

  const statusRef = useRef();
  const regionRef = useRef();
  const stormRef = useRef();

  const [ stormDropDown , setStormDropDown ] = useState([]);
  const [ regionDropDown , setRegionDropDown ] = useState([]);
  const [ isCalendarDisplay , setIsCalendarDisplay ] = useState(false);

  const [ rangeDate , setRangeDate ] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const options = [
    // { value: 0, label: 'Super' },
    // { value: 1, label: 'Corporate ' },
    // { value: 2, label: 'Admin' },
    // { value: 3, label: 'Technician' },
    // { value: 4, label: 'RNI' },
    { value: 5, label: 'Estimator' },
    { value: 6, label: 'Auditor' }
  ]

  let formValue = {
    status_data : [],
    region_data : [],
    storm_data : [],
  }

  const optionsStatus = [
    { value: 'New', label: 'New' },
    // { value: 'Walk In', label: 'Walk In'},
    { value: 'Canceled', label: 'Canceled' },
    { value: 'No Show', label: 'No Show' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Ready to Audit', label: 'Ready to Audit' },
    { value: 'Ready to Merge', label: 'Ready to Merge' },
    { value: 'Requested Assignment', label: 'Requested Assignment' },
    { value: 'Possible Total Loss', label: 'Possible Total Loss' },
    { value: 'Supplement Request', label: 'Supplement Request' },
    { value: 'Total Loss', label: 'Total Loss' },
  ]

  const optionsAccess = [
    { value: 'CCC', label: 'CCC' },
    { value: 'Mitchell', label: 'Mitchell' },
  ]

    const handleChange = (event , type) => {

        switch(type) {
              case 'Status':
                return setUserType(event.target.value);
              case 'Storm':
                return setStorm(event.target.value);
              case 'Region':
                return setRegion(event.target.value);
              default:
                return 'foo';
        }
    }

    const handleFilterSelected = async (value) => {

      let from , to ;

      if ( formatMonthDateYear( rangeDate?.[0].startDate ) !== formatMonthDateYear( rangeDate?.[0].endDate )  ) {
        from = formatMonthDateYear( rangeDate?.[0].startDate )
        to = formatMonthDateYear( rangeDate?.[0].endDate )
      }

      const formattedValuesWorkStatus = value?.status_data
      ?.filter(item => 
        item?.value !== 'Possible Total Loss' && 
        item?.value !== 'Supplement Request' &&
        item?.value !== 'Total Loss'
      )
      .map(item => item?.value)
      .join(",");

      const formattedValuesRepairStatus = value?.status_data
      ?.filter(item => 
        item?.value === 'Possible Total Loss' || 
        item?.value === 'Supplement Request' || 
        item?.value === 'Total Loss'
      )
      .map(item => item?.value)
      .join(",");

      const formattedValuesRegion = value?.region_data
      ?.map(item => item?.value)
      .join(",");

      const formattedValuesStormData = value?.storm_data
      ?.map(item => item?.value)
      .join(",");

      handleFilter( formattedValuesWorkStatus , formattedValuesStormData , formattedValuesRegion , from , to , formattedValuesRepairStatus );
      setUserType(null);
      ModalToggle(false);

    }

    useEffect(() => {

      handleDropData();
    
    }, []);

    const handleDropData = async () => {

      const resStorm = await APIServices.get({ url: `/stormlocation/list/filter?page=1&limit=100000`,})

      if (resStorm.status === 200) {
        const mapping = resStorm?.data?.data?.data.map( e => ({ value : e._id, label : e.storm_profile  }) )

        setStormDropDown( mapping ) 
      }

      // const resRegion = await APIServices.get({ url: `/region/list/all`,})

      const resRegion = await APIServices.get({ url: '/franchise/region/list/all'})

      if (resRegion.status === 200) {
        // const mapping = resRegion?.data?.data?.map( e => ({ value : e?._id, label : e?.region  }) )
        const mapping = resRegion?.data?.data?.map( e => ({ value : e._id , label :  e.name }) )
        setRegionDropDown( mapping ) 
      }
    
    }

    const handleSelect = (ranges) =>{
      setRangeDate(ranges)
    }

    const handleClearFilter = () => {

      statusRef.current.clearValue()
      regionRef.current.clearValue()
      stormRef.current.clearValue()

      setIsCalendarDisplay(false)

      setRangeDate([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ])

    }

  return (
    <ModalDefault 
        title={"Option:"}
        toggle={Toggle}
        setToggle={ModalToggle}
        size={'w-[35%] h-[60%]'}
    >
      {/* <div className='px-4 w-full flex flex-col gap-5'> */}

      <div className='w-full flex flex-row items-center justify-end px-4'>
        <div className='cursor-pointer flex flex-row gap-2 items-center' onClick={() => handleClearFilter() }>
          <span className='text-mainText'><FaTrash /></span>
          <span className='text-mainText'>Clear All Filters</span>
        </div>
 
      </div>

      <Formik
            initialValues={formValue}
            validationSchema={validationSchema}
            onSubmit={handleFilterSelected}
      >

        <Form className='px-4'>

        {/* <span className='text-black text-md font-semibold'>Status</span> */}
        {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select One</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userType}
                    label="Select One"
                    onChange={ e => handleChange(e , "Status") }
                >
                    <MenuItem value={''}></MenuItem>
                    { optionsStatus.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

        </FormControl> */}

        <div className='my-5 gap-2'>

          <Form.Item name="status_data" label="Status">
              <FormikMultiSelect  ref={ statusRef }  isMulti className="basic-multi-select" classNamePrefix="select" name="status_data" options={optionsStatus}/>
          </Form.Item>

        </div>

        <div className='my-5 gap-2'>

          <Form.Item name="region_data" label="Region">
              <FormikMultiSelect  ref={ regionRef }   isMulti className="basic-multi-select" classNamePrefix="region_data" name="region_data" options={regionDropDown}/>
              {/* <FormikSelect name="region_data" options={regionDropDown}/> */}
          </Form.Item>

        </div>

        <div className='my-5 gap-2'>

          <Form.Item name="storm_data" label="Storm Location">
              <FormikMultiSelect ref={ stormRef } isMulti className="basic-multi-select" classNamePrefix="storm_data" name="storm_data" options={stormDropDown}/>
              {/* <FormikSelect name="storm_data" options={stormDropDown}/> */}
          </Form.Item>

        </div>
        
        <div className='w-full flex flex-col'>

          <div className='w-full flex flex-row items-center justify-between'>

            <span className='text-black font-small text-md'>Date Range</span>

            <div className='cursor-pointer mt-1 text-md text-black' onClick={ () => setIsCalendarDisplay( isCalendarDisplay ? false : true ) }>
              { isCalendarDisplay ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight  /> } 
            </div>


          </div>

          <span className='text-black font-small text-xs my-1'>Date Selected : </span>
          <span className='text-mainText font-bold text-md'>{ formatMonthDateYearWithMonthName( rangeDate?.[0].startDate )  } - { formatMonthDateYearWithMonthName( rangeDate?.[0].endDate ) }</span>
    
        </div>

        { isCalendarDisplay && 

          <div className='mb-5 mt-2 gap-2 w-full flex flex-col items-center'>

            <DateRange
                editableDateInputs={true}
                onChange={item => handleSelect([item.selection]) }
                moveRangeOnFirstSelection={false}
                ranges={rangeDate}
                  // rangeColors={'#2e7d32'}
                color="#2e7d32"
                rangeColors="#2e7d32"
            />

          </div>
        }
        
        {/* <span className='text-black text-md font-semibold'>Region</span>
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select One</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Select One"
                    onChange={ e => handleChange(e , "Region") }
                >
                    <MenuItem value={''}></MenuItem>
                    { regionDropDown.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

        </FormControl> */}

        {/* <span className='text-black text-md font-semibold'>Storm Location</span>
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select One</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={storm}
                    label="Select One"
                    onChange={ e => handleChange(e , "Franchise") }
                >
                    <MenuItem value={''}></MenuItem>
                    { stormDropDown.map ( item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
        
                </Select>

        </FormControl> */}

        
        <Box width={'100%'} display={'flex'} flexDirection={'row-reverse'} gap={2} sx={{ marginTop : 5, marginBottom : 5 }}>

          
          <Button
            onClick={ () => ModalToggle(false) }
            variant="outlined"
            size="large"
            disableElevation
          >
            Cancel
          </Button>  

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
              <Bold>Apply Filters</Bold>
          </SubmitButton>
 

        </Box>



        {/* <div className='w-full flex flex-row items-center justify-between gap-10'>

          <div onClick={ () => ModalToggle(false) } className='w-full flex flex-col items-center justify-center py-3 rounded cursor-pointer'>
            <span className='text-gray-500 font-lg text-md font-bold'>Cancel</span>
          </div>

          <div onClick={ () => handleFilterSelected() } className='w-full flex flex-col items-center justify-center bg-blue-500 py-3 rounded hover:bg-blue-700 cursor-pointer'>
            <span className='text-white font-lg text-md font-bold'>Apply Filters</span>
          </div>

        </div> */}

        </Form>

      </Formik>                     
      {/* </div> */}
    </ModalDefault>
   
  )
}

export default WorkfileFilter
