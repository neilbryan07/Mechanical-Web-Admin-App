import React, { useState, useEffect } from 'react';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import TextInputs from '../../../component/FormInput'
import MainButton from '../../../component/CustomButton/MainButton';

import Regular from '../../../component/Typography/Regular'
import SubHeader from '../../../component/Typography/SubHeader';

import Card from "../../../component/Card/Card"

import { DashboardIcons } from '../../../contants'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import UserDetails from './UserDetails';
import AuditSettingTabs from './AuditSettings';

import { APIServices } from '../../../hooks/fetchAPI';

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


const SettingConfiguration = () => {

  const [value, setValue] = useState(0);
  const [ userDetails , setUserDetails ] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
  
      async function getData() {
        const res = await APIServices.get({ url: '/user/profile/me' })
        if (res && !res.error && res.data && res.data.data) {
          setUserDetails( res?.data?.data )
        }
        
      }
  
      getData();
    }, []);

  return (
    <SubContainer>
      <PageHeader name={"Settings and Configurations"} description={"You can change your password in this page"}/>

      <div className='w-full flex flex-row items-center justify-between mb-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon'/>
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Settings and Configurations</span></Regular>
        </div>

      </div>

      <Card>

        <div className='mt-5'>

          <StyledTabs
              onChange={handleChange}
              value={value}
              aria-label="Tabs where selection follows focus"
              selectionFollowsFocus
          >
              <StyledTab label="User Details" {...a11yProps(0)} />
              { parseInt( userDetails?.role ) !== 7 ? 
              <StyledTab label="Audit Settings" {...a11yProps(1)} /> : null }
              
          </StyledTabs>

            <TabPanel value={value} index={0}>
              <UserDetails/>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <AuditSettingTabs/>
            </TabPanel>

        </div>
        
      </Card>
      
    </SubContainer>
  )
}

export default SettingConfiguration
