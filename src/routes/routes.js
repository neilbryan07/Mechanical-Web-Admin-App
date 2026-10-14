import React from 'react';
import { Navigate } from "react-router-dom";

/* Authenticate Page */
import Login from '../pages/login';
import Register from '../pages/register';
import ForgotPassword from '../pages/forgetPassword';
import Splash from '../pages/splash';

/* APP Page */
import Appointment from '../pages/App/Appointment/Appointment';
import Weekly from '../pages/App/Appointment/Weekly';
import Monthly from '../pages/App/Appointment/Monthly';

import Dashboard from '../pages/App/Dashboard/Dashboard';
import Jobs from '../pages/App/Jobs/Jobs';

import Customers from '../pages/App/Customers/Customers';
import CompletedJobs from '../pages/App/Customers/CompletedJobs';
import FollowUpCustomer from '../pages/App/Customers/FollowUpCustomer';
import FollowUpState from '../pages/App/Customers/FollowUpState';

import Franchise from '../pages/App/Franchise/Franchise';
import FranchiseRegion from "../pages/App/Franchise/Franchise_Region";
import FranchiseMap from '../pages/App/Franchise/FranchiseMap';

import Estimatics from '../pages/App/Estimatics/Estimatics';
import Assignments from '../pages/App/Estimatics/Assignments';
import Insurance from '../pages/App/Estimatics/Insurance';
import ShopEstimatics from '../pages/App/Estimatics/Shop_Estimatics';
import JobOverView from '../pages/App/Estimatics/JobOverView';
import AuditList from '../pages/App/Estimatics/AuditList';

import Reports from '../pages/App/Reports/Reports';
import Closing from '../pages/App/Reports/Closing';
import Repairs from '../pages/App/Reports/Repairs';
import FollowUp from '../pages/App/Reports/FollowUp';
import AverageRepair from '../pages/App/Reports/AverageRepair';
import AverageTicket from '../pages/App/Reports/AverageTicket';
import EstimaticsReport from '../pages/App/Reports/Estimatics';
import StormLocationIssue from '../pages/App/Reports/StormLocationIssue';

import Technician from '../pages/App/Technician/Technician';
import SettingConfiguration from '../pages/App/Settings/Settings';

import DTP_Print from '../component/Printable_Content/DTP_Print';

import Users from '../pages/App/Users/Users';
import Storms_location from '../pages/App/Storms/Storms_location';
import ShopAccount from '../pages/App/Shop/ShopAccount';

/* 404 Found */
import ErrorPage from '../pages/ErrorPage';

/* Layout Component */
import Container from '../component/Layout/Container';

import { pageRoutes, getPath } from '../contants';
import ResetPassword from '../pages/resetPassword';

const routes = [
    {
      path: "app",
      element: <Container />,
      children: [

        { path: getPath(pageRoutes.APPOINTMENT), element: <Appointment /> },
        { path: getPath(pageRoutes.WEEKLYAPPOINTMENT), element: <Weekly /> },
        { path: getPath(pageRoutes.MONTHLYAPPOINTMENT), element: <Monthly /> },
        

        { path: getPath(pageRoutes.DASHBOARD),element: <Dashboard /> },
        { path: getPath(pageRoutes.JOBS), element: <Jobs /> },

        { path: getPath(pageRoutes.CUSTOMERCHECKIN), element: <Customers /> },
        { path: getPath(pageRoutes.COMPLETEDJOBS), element: <CompletedJobs /> },
        { path: getPath(pageRoutes.FOLLOWUPCUSTOMERS), element: <FollowUpCustomer /> },
        { path: getPath(pageRoutes.FOLLOWUPSTATE), element: <FollowUpState /> },

        { path: getPath(pageRoutes.FRANCHISE), element: <Franchise /> },
        { path: getPath(pageRoutes.FRANCHISEREGIONS), element: <FranchiseRegion /> },
        { path: getPath(pageRoutes.FRANCHISEMAPS), element: <FranchiseMap /> },
        
        { path: getPath(pageRoutes.ESTIMATICSWORKFILES), element: <Estimatics /> },
        { path: getPath(pageRoutes.ASSIGNMENTS), element: <Assignments /> },
        { path: getPath(pageRoutes.INSURANCE), element: <Insurance /> },
        { path: getPath(pageRoutes.SHOP), element: <ShopEstimatics /> },
        { path: getPath(pageRoutes.AUDITLIST), element: <AuditList /> },
        { path: getPath(pageRoutes.ESTIMATICS_JOBS_OVER_VIEW), element: <JobOverView /> },

        { path: getPath(pageRoutes.TECHNICIANS), element: <Technician /> },

        { path: getPath(pageRoutes.REPORTS), element: <Reports /> },
        { path: getPath(pageRoutes.CLOSING), element: <Closing /> },
        { path: getPath(pageRoutes.REPAIRS), element: <Repairs /> },
        { path: getPath(pageRoutes.FOLLOWUP), element: <FollowUp /> },
        { path: getPath(pageRoutes.AVERAGEREPAIR), element: <AverageRepair /> },
        { path: getPath(pageRoutes.AVERAGETICKET), element: <AverageTicket /> },
        { path: getPath(pageRoutes.ESTIMATICSREPORT), element: <EstimaticsReport /> },
        { path: getPath(pageRoutes.STORMISSUEREPORT), element: <StormLocationIssue /> },

        { path: getPath(pageRoutes.USERS), element: <Users /> },
        { path: getPath(pageRoutes.STORMS), element: <Storms_location /> },
        { path: getPath(pageRoutes.SHOPACCOUNT), element: <ShopAccount /> },

        
        { path: getPath(pageRoutes.SETTINGS), element: <SettingConfiguration /> },
        
      ],
    },
    {
      path: "/",
      children: [
        { path: pageRoutes.LOGIN, element: <Login /> },
        { path: pageRoutes.REGISTER, element: <Register /> },
        { path: pageRoutes.FORGOT_PASSWORD, element: <ForgotPassword /> },
        { path: pageRoutes.RESET_PASSWORD, element: <ResetPassword /> },
        { path: pageRoutes.SPLASH, element: <Splash /> },
        { path: "*", element: <Navigate to="/404" /> },
        // { path: "/", element: <Navigate to={pageRoutes.LOGIN} /> },
        { path: "/", element: <Navigate to={pageRoutes.SPLASH} /> },
        { path: "404", element: <ErrorPage /> },
      ],
    },

    {
      path: "print",
      children: [
        { path: 'dtp', element: <DTP_Print /> },
      ],
    },
  ];
  
  export default routes;
