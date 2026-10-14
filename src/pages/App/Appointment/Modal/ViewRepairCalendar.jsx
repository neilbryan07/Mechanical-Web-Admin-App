import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';


import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import { APIServices } from '../../../../hooks/fetchAPI';

import ModalDefault from '../../../../component/Modal/ModalDefault';

import RepairCalendarLayout from '../Layout/RepairCalendarLayout';
import RepairCalendarTransaction from '../Layout/RepairCalendarTransaction';

import { FaRegEye } from "react-icons/fa";


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


const ViewRepairCalendar = ({ repairmodal , SetRepairModal , customerData }) => {

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChanges = (event, newValue) => {
        setValue(newValue);
  };

return (
    <ModalDefault
        title={"Customer Information"}
        toggle={repairmodal}
        setToggle={ SetRepairModal }
        size={'w-8/12'}
    >

        <div className='w-full flex flex-row justify-end px-4'>
        
            <div className='bg-mainText px-3 py-2 rounded hover:bg-green-700 cursor-pointer flex flex-row gap-2 items-center' onClick={ () => navigate(`/app/estimatics/overview/${ customerData?.workfile?._id }`) }>
              <span className='text-white text-md text-semibold '><FaRegEye/></span>
              <span className='text-white text-md text-semibold '>Open Workfile</span>
            </div>

        </div>

        <div className='px-4'>

            <StyledTabs
                onChange={handleChanges}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
            >
                <StyledTab label="Customer Details" {...a11yProps(0)} />
                <StyledTab label="Transaction History" {...a11yProps(1)} />

            </StyledTabs>

            <TabPanel value={value} index={0}>
                <RepairCalendarLayout repairData = { customerData } />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <RepairCalendarTransaction repairData = { customerData } />
            </TabPanel>

        </div>

    </ModalDefault>
  )
}

export default ViewRepairCalendar
