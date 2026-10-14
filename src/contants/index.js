import React, { useState , useMemo , useRef  } from 'react'

// Banner Image
import BannerCarImage from "../assets/images/banner.png"
import AuthBackgroundImage from "../assets/images/authentication_background.png"

/*  SideBar   */ 
import DashboardIcon from "../assets/icons/Sidebar/Dashboard_2.svg"
import DashboardActiveIcon from "../assets/icons/Sidebar/Dashboard.svg"
import AppointmentIcon from "../assets/icons/Sidebar/Appointment Calendar.svg"
import AppointmentActiveIcon from "../assets/icons/Sidebar/Appointment_Active.svg"
import JobsIcon from "../assets/icons/Sidebar/Jobs.svg"
import CustomersIcon from "../assets/icons/Sidebar/Customers.svg"
import CustomersActiveIcon from "../assets/icons/Sidebar/Customer_Active.svg"
import FranchiseIcon from "../assets/icons/Sidebar/Franchise Regions.svg"
import FranchiseActiveIcon from "../assets/icons/Sidebar/Franchise_Regions_Active.svg"
import EstimaticsIcon from "../assets/icons/Sidebar/Estimatics.svg"
import EstimaticsActiveIcon from "../assets/icons/Sidebar/Estimatics_Active.svg"
import ReportsIcon from "../assets/icons/Sidebar/Reports.svg"
import ReportsActiveIcon from "../assets/icons/Sidebar/Reports_Active.svg"
import SettingsIcon from "../assets/icons/Sidebar/Settings and Config.svg"
import LogoutIcon from "../assets/icons/Sidebar/Logout.svg"
import TechnicianIcon from "../assets/icons/Sidebar/Technicians.svg";
import TechnicianActiveIcon from "../assets/icons/Sidebar/Technicians_Active.svg";
import EmployeeIcon from "../assets/icons/Dashboard/Employee.svg";
import SidebarIconOpen from "../assets/icons/side_bar_opener.svg";


import User from "../assets/icons/Sidebar/user_icon.png";
import Drop from "../assets/icons/Sidebar/DropDown.png"

/*  Navbar   */ 
import Inbox from "../assets/icons/Sidebar/inbox.png";
import Bell from "../assets/icons/Sidebar/bell.png";

/*  Dashboard   */ 
import CarDashboard from "../assets/icons/Dashboard/car.svg";
import MoreDashboard from "../assets/icons/Dashboard/more.svg";
import ProfileDashboard from "../assets/icons/Dashboard/profile.svg";
import SettingDashboard from "../assets/icons/Dashboard/setting.svg";
import ChartOneDashboard from "../assets/icons/Dashboard/chart_1.svg";
import ChartTwoDashboard from "../assets/icons/Dashboard/chart_2.svg";
import DropDownDashboard from "../assets/icons/Dashboard/dropdown.svg";
import ReportDashboard from "../assets/icons/Dashboard/report_dashboard.svg";
import ClosingDashboard from "../assets/icons/Dashboard/closing.svg";
import CupDashboard from "../assets/icons/Dashboard/cup.svg";
import VideoDashboard from "../assets/icons/Dashboard/videotime.svg";
import StormLocationDashboard from "../assets/icons/Dashboard/Storm_Location.svg";
import StormLocationIssueDashboard from "../assets/icons/Dashboard/Storm_Location_Issue.svg";
import NoShowDashboard from "../assets/icons/Dashboard/NoShow.svg";
import TimerDashboard from "../assets/icons/Dashboard/timer.svg";
import TicketDashboard from "../assets/icons/Dashboard/ticket.svg";
import EstimaticsDashboard from "../assets/icons/Dashboard/estimatics.svg";
import DollarDashboard from "../assets/icons/Dashboard/Dollar.svg";
import FranchiseStateMap from "../assets/images/Maps/State_Map.svg";
import FranchiseCityMap from "../assets/images/Maps/City_Map.svg";
import NotificationMessage from "../assets/icons/Notify_Message.png";
import NotificationWarning from "../assets/icons/Notify_Warning.png";

import BarChartsOne from "../assets/images/Dasboard/Bar_1.png";
import BarChartsTwo from "../assets/images/Dasboard/Bar_2.png";
import PieCharts from "../assets/images/Dasboard/Pie.png";

import EstimaticPieChart from "../assets/images/Dasboard/EstimaticsPie.svg";
import EstimaticWritten from "../assets/images/Dasboard/EstimaticsWritten.svg";
import EstimaticCar from "../assets/images/Dasboard/EstimaticsCars.svg";
import EstimaticClock from "../assets/images/Dasboard/EstimaticsClock.svg";

import WeeklyChart from "../assets/images/Dasboard/Weekly.svg";
import MonthlyChart from "../assets/images/Dasboard/Monthly.svg";

import DragDrop from "../assets/icons/Dashboard/Drag_Drop.svg";
import CsvIcon from "../assets/icons/Dashboard/csv-icon.svg";

import Store from "../assets/icons/Dashboard/store.svg";
import Technician from "../assets/icons/Dashboard/miscellaneous_services.svg";
import UserGroup from "../assets/icons/Dashboard/groups.svg";
import LocationStorm from "../assets/icons/Dashboard/location_on.svg";

/* Progress Bar */

import ProgressCustomer from "../assets/icons/Progress/Customer.svg";
import ProgressSearch from "../assets/icons/Progress/Search.svg";
import ProgressCalculator from "../assets/icons/Progress/Calculator.svg";
import ProgressRepair from "../assets/icons/Progress/Repair.svg";
import ProgressDropOff from "../assets/icons/Progress/DropOff.svg";
import ProgressCar from "../assets/icons/Progress/Car.svg";
import ProgressCase from "../assets/icons/Progress/Case.svg";
import ProgressCheck from "../assets/icons/Progress/Check.svg";
import ProgressActive from "../assets/icons/Progress/Active_Progress.svg";
import ProgressInActive from "../assets/icons/Progress/InActive_Progress.svg";

/* Esmatics */

import UserImage from "../assets/icons/Estimates/User_Profile.svg";
import CarImageOne from "../assets/icons/Estimates/Car_1.svg";
import CarImageTwo from "../assets/icons/Estimates/Car_2.svg";
import CarImageThree from "../assets/icons/Estimates/Car_3.svg";
import CarImageFour from "../assets/icons/Estimates/Car_4.svg";
import CarImageFive from "../assets/icons/Estimates/Car_5.svg";
import CarImageSix from "../assets/icons/Estimates/Car_6.svg";
import PDFICON  from "../assets/icons/Estimates/pdf_icon.svg";
import CHATUSERICON from "../assets/icons/Estimates/chat_user_icon.svg";
import CARFENDER from "../assets/icons/Estimates/Left_Fender.svg";
import CARWINDSHIELD from "../assets/icons/Estimates/WindShield.svg"; 
import ADOBEICONS from "../assets/icons/Estimates/adobe.png"; 
import IMAGEICONS from "../assets/icons/Estimates/imageIcon.png";

import EmployeeFollowUP from "../assets/images/followUpEmployee.png";
import FlagFollowUP from "../assets/images/followUPFlag.png";

import CarFolderIcon from "../assets/images/car_folder_icon.png";

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import { Switch } from '@mui/material'

import SELECTICONS from "../assets/icons/Select_Icon.svg";

import clipSetting from "../assets/icons/clipSetting.png";
import letterSetting from "../assets/icons/letterSetting.png";
import NoMessage from "../assets/images/NoMessage.png";

export const BannerImage = BannerCarImage;
export const AuthImage = AuthBackgroundImage;
export const InboxIcon = Inbox;
export const BellIcon = Bell;
export const UserIcon = User;
export const DropDownIcon = Drop;
export const SidebarOpenerIcon = SidebarIconOpen;

export const DashboardIcons = {
    CAR : CarDashboard,
    MORE : MoreDashboard,
    PROFILE : ProfileDashboard,
    SETTING : SettingDashboard,
    CHARTONE : ChartOneDashboard,
    CHARTTWO : ChartTwoDashboard,
    DROPDOWN : DropDownDashboard,
    BARCHARTONE : BarChartsOne,
    BARCHARTTWO : BarChartsTwo,
    PIECHART : PieCharts,
    ESTIMATICSCHART : EstimaticPieChart,
    ESTIMATICSWRITTEN : EstimaticWritten,
    ESTIMATICSCLOCKS :EstimaticClock,
    ESTIMATICSCARS : EstimaticCar,
    REPORTDASHBOARD : ReportDashboard,
    CLOSING : ClosingDashboard,
    CUP : CupDashboard,
    VIDEO : VideoDashboard,
    STORMLOCATIONREPORT : StormLocationDashboard,
    STORMLOCATIONISSUE : StormLocationIssueDashboard,
    NOSHOW : NoShowDashboard,
    TIMER : TimerDashboard,
    TICKET : TicketDashboard,
    ESTIMATIC : EstimaticsDashboard,
    DOLLAR : DollarDashboard,
    EMPLOYEE : EmployeeIcon,
    DRAGDROP: DragDrop,
    CSVICON : CsvIcon,
    MONTHLY : MonthlyChart,
    WEEKLY : WeeklyChart,
    STATE_MAP : FranchiseStateMap,
    CITY_MAP : FranchiseCityMap,
    STOREICON : Store, 
    GEARICON : Technician ,
    USERGROUPS : UserGroup,
    STORMLOCATION : LocationStorm, 
    SELECTICON : SELECTICONS,
    EMPLOYEEFOLLOWUP : EmployeeFollowUP,
    FLAGFOLLOWUP : FlagFollowUP,
    CARFOLDERICONS : CarFolderIcon,
    NOTIFYMESSAGE : NotificationMessage,
    NOTIFYWARNING : NotificationWarning
}

export const ProgressIcon = {
    ProgressCustomerIcon : ProgressCustomer,
    ProgressSearchIcon : ProgressSearch,
    ProgressCalculatorIcon : ProgressCalculator,
    ProgressRepairIcon : ProgressRepair,
    ProgressDropOffIcon : ProgressDropOff,
    ProgressCarIcon : ProgressCar,
    ProgressCaseIcon : ProgressCase,
    ProgressCheckIcon : ProgressCheck,
    ProgressActiveIcon : ProgressActive,
    ProgressInActiveIcon : ProgressInActive,
}

/* Constant Route Names */

export const SidebarIcon = {
    DASHBOARD : DashboardIcon,
    DASHBOARD_ACTIVE :DashboardActiveIcon ,
    APPOINTMENT : AppointmentIcon,
    APPOINTMENT_ACTIVE :AppointmentActiveIcon ,
    JOBS : JobsIcon,
    CUSTOMERS : CustomersIcon,
    CUSTOMERS_ACTIVE : CustomersActiveIcon,
    FRANCHISE : FranchiseIcon,
    FRANCHISE_ACTIVE : FranchiseActiveIcon,
    ESTIMATICS : EstimaticsIcon,
    ESTIMATICS_ACTIVE : EstimaticsActiveIcon,
    TECHNICIANS : TechnicianIcon,
    TECHNICIANS_ACTIVE : TechnicianActiveIcon,
    REPORTS : ReportsIcon,
    REPORTS_ACTIVE : ReportsActiveIcon,
    SETTINGS : SettingsIcon,
    LOGOUT : LogoutIcon
}

export const EstimaticsImg = {
    USERIMG : UserImage,
    CARONE : CarImageOne,
    CARTWO : CarImageTwo,
    CARTHREE : CarImageThree,
    CARFOUR : CarImageFour,
    CARFIVE : CarImageFive,
    CARSIX : CarImageSix,
    PDF_ICON : PDFICON,
    CHATUSERSICON : CHATUSERICON,
    FENDER : CARFENDER,
    WINDSHIELD : CARWINDSHIELD,
    ADOBEICON : ADOBEICONS,
    IMAGEICON : IMAGEICONS,
    CLIPSETTING : clipSetting,
    LETTERSETTING : letterSetting,
    NOMESSAGE : NoMessage,

}

export const pageName = {

    /* Authenticate */

    LOGIN : 'login',
    REGISTER : 'register',
    FORGOT_PASSWORD : 'forgot_password',
    
    /* APP */
    
    DASHBOARD : 'dashboard',
    
    APPOINTMENT : 'appointment',
    WEEKLYAPPOINTMENT : 'weekly',
    MONTHLYAPPOINTMENT : 'monthly',

    JOBS : 'jobs',
    CUSTOMERS : 'customers',
    FOLLOWUPCUSTOMERS : 'follow-up',
    FOLLOWUPSTATE : 'follow-up-state',
    COMPLETEDJOBS : 'completed-jobs',

    FRANCHISE : 'franchise',
    FRANCHISEREGIONS : 'franchise-region',
    FRANCHISEMAPS : 'franchise-map',

    ESTIMATICS : 'estimatics',
    ASSIGNMENTS : 'assignments',
    INSURANCE : 'insurance',
    SHOP : 'shop',
    ESTIMATICS_JOBS_OVER_VIEW : 'estimatics-job-view',

    TECHNICIANS : 'technicians',

    REPORTS : 'reports',
    CLOSING : 'closing',
    REPAIR : 'repairs',
    FOLLOWUP : 'followUp',
    AVERAGEREPAIR : 'averageRepair',
    AVERAGETICKET : 'averageTicket',
    ESTIMATICSREPORT : 'estimatics',
    INSURANCEREPORT : 'insurance',

    SETTINGS: 'settings',

    USERS : 'users',

    STORMS : 'storms',
}

export const pageRoutes = {

    /* Authenticate */

    LOGIN : '/login',
    REGISTER : '/register',
    FORGOT_PASSWORD : '/forgot_password',
    RESET_PASSWORD : '/reset-password/:id',
    SPLASH : '/',

    /* APP */

    DASHBOARD : 'dashboard',

    // Appointment
    APPOINTMENT : '/app/repair',
    FOLLOWUPSTATE : '/app/repair/follow-up-state',
    WEEKLYAPPOINTMENT : '/app/repair/weekly',
    MONTHLYAPPOINTMENT : '/app/repair/monthly',

    JOBS : '/app/jobs',

    CUSTOMERS : '/app/customers',
    CUSTOMERCHECKIN : '/app/customers/checked-in',
    FOLLOWUPCUSTOMERS : '/app/customers/follow-up',
    COMPLETEDJOBS : '/app/customers/completed-jobs',

    // FRANCHISE
    FRANCHISE : '/app/franchise',
    FRANCHISEREGIONS : '/app/franchise-region',
    FRANCHISEMAPS : '/app/franchise-map',

    ESTIMATICS : '/app/estimatics',
    ESTIMATICSWORKFILES : '/app/estimatics/work-files',
    ASSIGNMENTS : '/app/estimatics/assignments',
    INSURANCE : '/app/estimatics/assignments/insurance',
    AUDITLIST : '/app/estimatics/audit-lists',
    SHOP : '/app/estimatics/assignments/shop',
    ESTIMATICS_JOBS_OVER_VIEW : '/app/estimatics/overview/:id',

    TECHNICIANS : '/app/technicians',

    // Reports Pages
    REPORTS : '/app/reports',
    CLOSING : '/app/reports/closing',
    REPAIRS : '/app/reports/repairs',
    FOLLOWUP : '/app/reports/followUp',
    AVERAGEREPAIR : '/app/reports/averageRepair',
    AVERAGETICKET : '/app/reports/averageTicket',
    ESTIMATICSREPORT : '/app/reports/estimatics',
    INSURANCEREPORT : '/app/reports/insurance',
    STORMISSUEREPORT : '/app/reports/storm-location-issue',

    SETTINGS: '/app/settings',


    // Users Page

    USERS : '/app/users',

    // Storm Page

    STORMS : '/app/storms',

    // Shop Accounts 

    SHOPACCOUNT : '/app/shopAccounts',
}

export function getPath(path) {
    return path.split('/app/').reverse()[0]
}




export const getDate = date => {


    if(!date) {
      return "N/A";
    }

    let dateObject = new Date(date);

    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June' , 'July' , 'August' , 'September' , 'October', 'November' , 'December'];

    let day =  dateObject.getUTCDate() > 9 ?  dateObject.getUTCDate() : '0' + dateObject.getUTCDate() ;
    let month =  monthArray[ dateObject.getUTCMonth() ];
    let year =  dateObject.getUTCFullYear();

    let hours = dateObject.getUTCHours();
    let minutes = dateObject.getUTCMinutes() > 9 ?  dateObject.getUTCMinutes() : '0' + dateObject.getUTCMinutes() ;
    let amOrPm = hours >= 12 ? "PM" : "AM";

    let hourFormat;

    if (hours === 0 && amOrPm === "AM") {  hourFormat = 12; }
    else if (hours >= 1 && hours <= 9  && amOrPm === "AM") { hourFormat = "0" + hours; }
    else if (hours >= 10 && hours <= 11  && amOrPm === "AM") { hourFormat = hours; }
    else if (hours >= 13 && hours <= 21  && amOrPm === "PM") { hourFormat = "0" + parseInt( hours - 12 ); }
    else if (hours >= 22 && hours <= 23  && amOrPm === "PM") { hourFormat =  parseInt( hours - 12 ); }
    else { hourFormat = hours; }

    return month + " " + day + "," + year + " - " + hourFormat + ":" + minutes + " " +amOrPm;


}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-CA', options); // Format as 'YYYY-MM-DD'
}

export const getCurrentDay = () => {
    
  const today = new Date();
  today.setDate(today.getDate() );

  const currentDay = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return currentDay;
  
};

export const formatMonthDateYearWithMonthName = (dateString) => {

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June' , 'July' , 'August' , 'September' , 'October', 'November' , 'December'];

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${monthArray[month]} ${day} , ${year}`;
};

export const formatMonthDateYear = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export function getRoute(path) {
    let args = Array.prototype.slice.call(arguments, 1);
    let count = -1;
    return path.replace(/:[a-zA-Z?]+/g, function (match) {
        count += 1;
        return args[count] !== undefined ? args[count] : match;
    });
};

export const defaultEstimatic = {
    "customer_full_name": "",
    "customer_address": "",
    "customer_phone_number": "",
    "vin_plate_number": "",
    "vehicle": "",
    "color": "",
    "insurance_company":"",
    "insurance_claim_number": "",
    "insurance_deductible": "",
    "adjuster": "64240d681911c3640f2fb401",
    "other_info_repair_date": "",
    "other_info_direction_to_pay": "yes",
    "other_info_possible_tl": "yes",
    "other_info_threshold_percent": "",
    "other_info_supplement": "N/A",
    "other_info_scoped_by": "64240d681911c3640f2fb401",
    "other_info_scoped_date_time": "09/03/2023",
    "other_info_estimate_assigned_to": "64240d681911c3640f2fb401",
    "other_info_estimate_date_time": "",
    "other_info_audited_by": "64240d681911c3640f2fb401",
    "other_info_date_time_uploaded": "09/03/2023",
    "scope_sheet_file": "",
    "dtp_form": "",
    "confirmation_of_payment": "",
    "estimate_file": "",
    "supplement_file": "",
    "attachments": []
};

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.disabled}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          backgroundColor : 'transparent'
        },
      },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor : 'transparent'
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: 'transparent',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 10,
      border: 0,
      backgroundColor: 'blue',
      borderRadius: 1,
    },
  }));

export const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize : 25,
    ...(ownerState.active && {
      backgroundColor: '#66BE7A',
    }),
    ...(ownerState.completed && {
      backgroundColor: '#66BE7A',
    }),
  }));

  export  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <span className='cursor-pointer'>1</span>,
      2: <span className='cursor-pointer'>2</span>,
      3: <span className='cursor-pointer'>3</span>,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  export const handlePhoneNumberFormat = (e , setPhoneNumber) => {
    const inputValue = e.target.value;

    // Remove non-numeric characters
    const numericInput = inputValue.replace(/\D/g, '');

    // Format the phone number with parentheses
    let formattedValue = '';

    if (numericInput.length >= 4) {
    formattedValue = `(${numericInput.slice(0, 3)})`;

    if (numericInput.length > 3) {
        formattedValue += ` ${numericInput.slice(3, 6)}`;

        if (numericInput.length > 6) {
        formattedValue += `-${numericInput.slice(6, 10)}`;
        }
    }
    } else {
    formattedValue = numericInput;
    }

    setPhoneNumber(formattedValue);
};

export const handlePhoneNumberFormatNoSave = (e , setPhoneNumber , item , key ) => {
  const inputValue = e.target.value;

  // Remove non-numeric characters
  const numericInput = inputValue.replace(/\D/g, '');

  // Format the phone number with parentheses
  let formattedValue = '';

  if (numericInput.length >= 4) {
  formattedValue = `(${numericInput.slice(0, 3)})`;

  if (numericInput.length > 3) {
      formattedValue += ` ${numericInput.slice(3, 6)}`;

      if (numericInput.length > 6) {
      formattedValue += `-${numericInput.slice(6, 10)}`;
      }
  }
  } else {
  formattedValue = numericInput;
  }
  
  item[key].phone_number =  formattedValue
  setPhoneNumber(formattedValue);

};

const CustomSwitch = makeStyles({
  root: {
    width: "80px",
    height: "24px",
    padding: "0px"
  },
  switchBase: {
    color: "#cccccc",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#23bf58"
      }
    }
  },
  thumb: {
    color: "white",
    width: "20px",
    height: "20px",
    margin: "1px"
  },
  track: props => ({
    borderRadius: "20px",
    backgroundColor: "#cccccc",
    opacity: "1 !important",
    position: "relative",
    "&:after": {
      content: `"${props.checked ? 'Active' : 'Inactive'}"`,
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "4.5px",
      left: props.checked ? "8px" : "auto",
      right: props.checked ? "auto" : "7px",
      visibility: "visible"
    }
  }),
  checked: {
    color: "#23bf58 !important",
    transform: 'translateX(calc(80px - 24px)) !important',
  }
});

export function SwitchUseStyles({ checked , handleFunction = null , id = null  }) {
  // const classes = CustomSwitch ({ checked }); // Pass checked value to the useStyles hook

  const [ switches , setSwitches ] = useState( checked === 1 ? true : false );
  const classes = CustomSwitch({ checked: switches });

  const handleChanges = () => {

    setSwitches( prev => prev ? false : true ); 

    if ( handleFunction ) {
      handleFunction( id , switches ? false : true  )  
    } 
    
  }

  return (
    <Switch
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      checked={switches}
      onChange={ handleChanges }
      name="checkedA"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}

export const handleUpCharge = ( data ) => {
  if (data === undefined) return '';
  return `${data} %`;
}

export const handleCR = ( data ) => {
  if (data === undefined) return '';
  return `${data} ${parseFloat(data) > 1 ? 'hrs' : 'hr'}`;
}

export const handleImageUpload = ( data ) => {

  if( 
    data?.tech_sheet_left_fender?.photo?.length > 0 ||
    data?.tech_sheet_right_fender?.photo?.length > 0 ||
    data?.tech_sheet_hood?.photo?.length > 0 ||
    data?.tech_sheet_left_front_door?.photo?.length > 0 ||
    data?.tech_sheet_right_front_door?.photo?.length > 0 ||
    data?.tech_sheet_wind_shield?.photo?.length > 0 ||
    data?.tech_sheet_left_rail?.photo?.length > 0 ||
    data?.tech_sheet_right_rail?.photo?.length > 0 ||
    data?.tech_sheet_roof?.photo?.length > 0 ||
    data?.tech_sheet_left_rear_door?.photo?.length > 0 ||
    data?.tech_sheet_right_rear_door?.photo?.length > 0 ||
    data?.tech_sheet_left_fuel_door?.photo?.length > 0 ||
    data?.tech_sheet_right_fuel_door?.photo?.length > 0 ||
    data?.tech_sheet_left_quarter_box?.photo?.length > 0 ||
    data?.tech_sheet_right_quarter_box?.photo?.length > 0 ||
    data?.tech_sheet_left_cab_cnr?.photo?.length > 0 ||
    data?.tech_sheet_right_cab_cnr?.photo?.length > 0 ||
    data?.gallery_full_vin?.length > 0 ||
    data?.gallery_full_side_view?.length > 0 ||
    data?.gallery_full_interior?.length > 0 ||
    data?.gallery_full_license_plate?.length > 0 ||
    data?.gallery_full_lt_front?.length > 0 ||
    data?.gallery_full_lt_rear?.length > 0 ||
    data?.gallery_full_mileage?.length > 0 ||
    data?.gallery_full_odometer?.length > 0 ||
    data?.gallery_full_rt_front?.length > 0 ||
    data?.gallery_full_rt_rear?.length > 0 ||
    data?.gallery_total_loss_dashboard?.length > 0 ||
    data?.gallery_total_loss_door_trim?.length > 0 ||
    data?.gallery_total_loss_engine_compartment?.length > 0 ||
    data?.gallery_total_loss_front_undercarriage?.length > 0 ||
    data?.gallery_total_loss_headliner?.length > 0 ||
    data?.gallery_total_loss_seats?.length > 0 ||
    data?.gallery_total_loss_seats?.length > 0 ||
    data?.additional_photos?.length > 0 
)  {
  return 1
}
  
return 0

}

export const handleSelectedAllCarAttachment = ( checkbox , customer ) => {
  return parseInt ( checkbox > 0 ? checkbox : 0 ) + parseInt( customer ? customer : 0 );
}

export const handleManagerUser = ( data ) => {
  if (data?.auditor_details?.is_manager || data?.estimator_details?.is_manager ) return true;
  return false;
}

export const dollarFormat = ( a  = 0 , b = 0 ) => {
  let data = parseInt(a) + parseInt(b);
  return  data?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const queryData = [
    {
        name : 'Default' , 
        queryAuditor : '/user/list/filter/auditor?page=1&limit=10000&is_manager_auditor=true&status=1',
        queryEstimator : '/user/list/filter/estimator?page=1&limit=10000&is_manager_auditor=false&status=1',
    },
    {
        name : 'Auditor Manager CCC' , 
        queryAuditor : '/user/list/filter/auditor?page=1&limit=10000&is_manager_auditor=true&status=1&access=CCC',
        queryEstimator : '/user/list/filter/estimator?page=1&limit=10000&is_manager_auditor=false&status=1&level_type=CCC - Level 1,CCC - Level 2'
    },
    {
        name : 'Auditor Manager Mitchell' , 
        queryAuditor : '/user/list/filter/auditor?page=1&limit=10000&is_manager_auditor=true&status=1&access=Mitchell',
        queryEstimator : '/user/list/filter/estimator?page=1&limit=10000&is_manager_auditor=false&status=1&level_type=Mitchell - Level 1,Mitchell - Level 2'
    },
];