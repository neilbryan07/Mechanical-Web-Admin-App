import React, { useState, useEffect } from 'react';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'


import DashboardHome from './home';
// import DashboardEstimatics from './estimatics';
import { DashboardEstimatics } from './estimatics';

import { APIServices } from '../../../hooks/fetchAPI';


const Dashboard = () => {

  const [ dashboardType , setDashboardType ] = useState('home');

  const [ userDetails , setUserDetails ] = useState([]);

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

        <PageHeader name={`Good Morning, ${userDetails?.first_name}!`} description={"Here is today’s report and performances"} dashboard={true} dashboardType={dashboardType} setButton={setDashboardType}/>

        { dashboardType === 'home' ? <DashboardHome/> :  <DashboardEstimatics dashboardType ={ dashboardType }/> }
        
    </SubContainer>
  )
}

export default Dashboard
