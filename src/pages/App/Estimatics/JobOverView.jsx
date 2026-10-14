import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import TextDisplay from '../../../component/Typography/TextDisplay'
import Bold from '../../../component/Typography/Bold'

import Card from "../../../component/Card/Card"

import { BsChevronLeft} from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { RxCaretDown } from "react-icons/rx";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { DashboardIcons, EstimaticsImg } from '../../../contants'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';

import AccordionExample from './layout/AccordionExample';
// import Estimatics_Car_Info from './layout/Estimatics_Car_Info';
import Upload_Scope from './layout/Upload_Scope'
import Car_Attachment from './layout/Car_Attachment'
import Cat_Attachment_new from './layout/Cat_Attachment_new'
import MessageTab from './layout/MessageTab'
import Activity from './layout/Activity';

import { styled } from '@mui/material/styles';

import { pageRoutes } from '../../../contants'

// Testing
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';


import { APIServices } from '../../../hooks/fetchAPI'

const BootstrapInput = styled(InputBase)(({ theme , dynamicColor = "#0098F9" }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: dynamicColor,
    border: `1px solid ${dynamicColor}`,
    fontSize: 16,
    color : 'white',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > span": {
        width: "100%",
        backgroundColor: "#66BE7A"
      }
    },
    borderBottom: '1px solid none',
  
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      minWidth: 50,
      color: "#797979",
      fontWeight: 500,
      fontSize: 16,
      '&.Mui-selected': {
        color: "#66BE7A"
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
);

const JobOverView = () => {

    const { id } = useParams();
  
    const [ getUserDetails , setUserDetails ] = useState([]);
    const [ getProfileDetails , setProfileDetails ] = useState([]);
    const [ loader , setLoader ] = useState(false);

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [age, setAge] = React.useState('New');
    const [ color , setColor ] = useState('');

    const handleChanges = async (event) => {

      let data = {
        "work_status": event.target.value,
      }

      const res = await APIServices.put({ url: '/workfile/work/status/' + id , payload: data })
      if (res && !res.error && res.data && res.data.data) {
        setAge(event.target.value);
        handleColorStatus( event.target.value );
      }


    };

    const handleColorStatus = (work_status) => {

      if ( work_status === "New" ) return setColor("#0098F9")
      else if ( work_status === "Canceled" ) return setColor("#DE4C50")
      else if ( work_status === "Completed" ) return setColor("#66BE7A")
      else if ( work_status === "No Show" ) return setColor("#EA580C")
      else if ( work_status === "Ready to Audit" ) return setColor("#EA6F53")
      else if ( work_status === "Ready to Merge" ) return setColor("#717597")
      else return setColor("#5D73C6")

    }

    const getProfileData = async () => {
      const res = await APIServices.get({ url: '/user/profile/me' })
        if (res && !res.error && res.data && res.data.data) {
          setProfileDetails( res?.data?.data )
        }      
    }

    const getData = async () => {
      setLoader(false);
      const res = await APIServices.get({ url: '/workfile/' + id })
      if (res && !res.error && res.data && res.data.data) {
        setUserDetails( res.data.data ); 

        setAge( res.data.data.work_status ? res.data.data.work_status : "New" );
        handleColorStatus( res?.data?.data?.work_status );
        setLoader(true);
      }
    }

    const fetchMessageData = async () => {
      
      const res = await APIServices.get({ url: '/workfile/' + id })
      if (res && !res.error && res.data && res.data.data) {
        setUserDetails( res.data.data ); 
 
      }
    }
    

    useEffect(() => {

      // async function getData() {
      //   setLoader(false);
      //   const res = await APIServices.get({ url: '/workfile/' + id })
      //   if (res && !res.error && res.data && res.data.data) {
      //     setUserDetails( res.data.data ); 
      //     setLoader(true);
      //   }
      // }
  
      getData();
      getProfileData();
    }, []);

    const dollarFormat = ( a  = 0 , b = 0 ) => {
      let data = parseInt(a) + parseInt(b);
      return  data?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

  return (
    <SubContainer>

      <PageHeader routes={"/app/estimatics/work-files"} returnBotton={true} name={"Estimatics - File"} description={"Here are the list of uploaded estimates"}/>

      <div className='w-full flex flex-row items-center justify-between mb-3 max-[550px]:flex-col'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Estimatics</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch/></span>
            </div>
          </div>

          {/* Icon */}
          <div className='flex flex-row items-center justify-between gap-2'>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><IoReload/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><RiFilterFill/></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize:17}}><AiFillPrinter/></span>
            </div>

          </div>

        </div>

      </div>

      
      {
        !loader ? 
          <div className='w-full flex flex-col items-center justify-center my-5'>
                  <CircularProgress/> 
          </div>
        :
    

      <Card>

        <div className='w-full flex justify-between items-center'>

            <div className='flex flex-row gap-2'>
                <Header><span className='text-mainText'>Job Overview</span></Header>
            </div>

            {/* <div className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
                <span className='text-white text-bold text-xl'><HiPlus/></span>
                <Regular><span className='text-white ml-3'>Add New Job</span></Regular>
            </div> */}

        </div>

        <br/>

        <div className='w-full flex justify-between items-center max-[601px]:flex-col'>

          <div className='flex flex-row'>

            { getUserDetails?.profile_photo ?
                <img src={`https://ice-api1.com/public/images/workfile/techsheet/${ getUserDetails?.profile_photo }`} alt='icon' className='mr-2' class="h-[100px] w-[100px] rounded-full"/>
              : <img src={EstimaticsImg.USERIMG} alt='icon' className='mr-2' width={100} height={100}/>
            }

            <div className='flex flex-col justify-between ml-2'>

                <Regular><span className='text-xl'>{ getUserDetails?.customer?.full_name }</span></Regular>
                <Regular><span className='text-lg'>{ getUserDetails?.vehicle_year } { getUserDetails?.vehicle_make } { getUserDetails?.vehicle_model } ({ getUserDetails?.vehicle_color })</span></Regular>
                <Regular><span className='text-lg text-regularGrey'>{ getUserDetails?.insurance?.provider }</span></Regular>
                
            </div>

          </div>
 
          <div className='flex flex-col items-end gap-3'>

            <TextDisplay><span style={{ fontSize:18}} className='text-regularGrey'>Appraisal Assignment</span></TextDisplay>
            <span style={{ fontSize:30}} className='text-mainText mt-0.5'><Bold>{dollarFormat( getUserDetails?.supplement_files?.reduce((sum, file) => sum + file.supplement_amount, 0) ,  getUserDetails?.other_detail_initial_estimate )}</Bold></span>
          
            <div className='flex flex-row justify-between items-center gap-3'>

                <Regular><span className='text-xl'>Status</span></Regular>

                {/* <div className='bg-mainText py-1 px-3 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
                  <Regular><span className='text-white'>Ready to Audit</span></Regular>
                  <span style={{ fontSize:35}} className='text-white'><RxCaretDown/></span>
                </div> */}

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChanges}
                    displayEmpty
                    // inputProps={{ 'aria-label': 'Without label' }}
                    input={<BootstrapInput dynamicColor={ color } />}
                    readOnly={ getProfileDetails?.role === 7 }
                  >

                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                    <MenuItem value="No Show">No Show</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Ready to Audit">Ready to Audit</MenuItem>
                    <MenuItem value="Ready to Merge">Ready to Merge</MenuItem>
                    <MenuItem value="Requested Assignment">Requested Assignment</MenuItem>

                  </Select>
                </FormControl>
           
                
            </div>

          </div>

        </div>
  
        <div className='mt-5'>
 
            <StyledTabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
            >
                <StyledTab label="Overview" {...a11yProps(0)} />
                <StyledTab label="Attachments" {...a11yProps(1)} />
                <StyledTab label="Messages" {...a11yProps(2)} />
                <StyledTab label="Activity" {...a11yProps(3)} />
                 
            </StyledTabs>

            <TabPanel value={value} index={0}>
               <AccordionExample CustomerData={getUserDetails} /> <br/>
               <Upload_Scope CustomerData={getUserDetails} getCustomer={ getData } profileMe={ getProfileDetails }/>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Cat_Attachment_new CustomerData={getUserDetails} getCustomer={ getData }/>
            </TabPanel>

            <TabPanel value={value} index={2}>
               <MessageTab/>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <Activity CustomerData={getUserDetails}/>
                {/* <AccordionExample data={getUserDetails}/> <br/> */}
                {/* <Estimatics_Car_Info/> */}
            </TabPanel>

        </div>


      </Card>
      }

      <div className='mb-16'/>
    </SubContainer>
  )
}

export default JobOverView
