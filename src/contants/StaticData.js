import { styled } from '@mui/system';
import { styled as MUIStyle } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

import Switch from '@mui/material/Switch';

// Appointment Page

export const IOSSwitch = MUIStyle((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 100,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 100,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 12,
    height: 12,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const AppointmentTableRowsData = [
    { id : 1 , reference : 12345678, name : 'Jake Ballard', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Approved' },
    { id : 2 , reference : 12345678, name : 'Fitzgerald Grant', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Waiting on Approval' },
    { id : 3 , reference : 12345678, name : 'Olivia Pope', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Needs Supplement' },
    { id : 4 , reference : 12345678, name : 'Huck Munoz', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Needs Scope' },
    { id : 5 , reference : 12345678, name : 'Quin Perkins', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Checked In' },
    { id : 6 , reference : 12345678, name : 'Mellie Grant', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Waiting on Approval' },
    { id : 7 , reference : 12345678, name : 'Abby Whelan', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Needs Supplement' },
    { id : 8 , reference : 12345678, name : 'David Rosen', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Approved' },
    { id : 9 , reference : 12345678, name : 'Susan Ross', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Approved' },
    { id : 10 , reference : 12345678, name : 'Bonnie WinterBottom', description : 'Perform monthly Check-up' , schedule : 'April 4, 2023 - 3:30 PM', status : 'Approved' },
];

export const AppointmentTableColumnsData = [
    { id: 'id', label: '#', minWidth: 100 },
    { id: 'reference', label: 'Reference #', minWidth: 250 },
    { id: 'name', label: 'Customer Name', minWidth: 250 },
    { id: 'description', label: 'Repair Description', minWidth: 250 },
    { id: 'schedule', label: 'Schedule Date Time', minWidth: 250 },
    // { id: 'status', label: 'Status', minWidth: 250 },
];

export const AppointmentTableNewRows = [

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'Approved'}, 
    customer : { name : 'OLIVIA POPE', number : '+1-720-6601188' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    insurance : { insurance_company : 'American Family Insurance' , claim_number : '23-3256981-05' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'Waiting on Approval'}, 
    customer : { name : 'OLIVIA POPE', number : '+1-720-6601188' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    insurance : { insurance_company : 'American Family Insurance' , claim_number : '23-3256981-05' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'Needs Supplement'}, 
    customer : { name : 'OLIVIA POPE', number : '+1-720-6601188' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    insurance : { insurance_company : 'American Family Insurance' , claim_number : '23-3256981-05' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'Needs Scope'}, 
    customer : { name : 'OLIVIA POPE', number : '+1-720-6601188' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    insurance : { insurance_company : 'American Family Insurance' , claim_number : '23-3256981-05' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'Checked In'}, 
    customer : { name : 'OLIVIA POPE', number : '+1-720-6601188' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    insurance : { insurance_company : 'American Family Insurance' , claim_number : '23-3256981-05' },
  },


]

// Appointment Page (weekly and monthly)

export const WeeklyMonthlyHistoryRowsData = [
    { date : 'April 4, 2023 - 8:00 AM', activity : 'PDR Repair Complete', admin : 'Mike Doe', remark : 'N/A', status : 'Vehicle Checked-In' },
    { date : 'April 4, 2023 - 8:00 AM', activity : 'Repair is in progress', admin : 'Mike Doe', remark : 'System Generated', status : 'Repair In-Progress' },
    { date : 'April 4, 2023 - 8:00 AM', activity : 'Vehicle Check In', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Vehicle Checked-In' },
    { date : 'April 5, 2023 - 8:00 AM', activity : 'Customer Drop-Off', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Dropped-Off' },
    { date : 'April 4, 2023 - 5:20 PM', activity : 'Schedule for Repair', admin : 'Mike Doe', remark : 'Schedule Date is April 5, 2023- 8:00 AM', status : 'Schedule for Repair' },
    { date : 'April 4, 2023 - 5:20 PM', activity : 'Follow-Up Customer', admin : 'Jane Doe', remark : 'Added to Repair Calendar', status : 'Follow-up Customer' },
    { date : 'April 4, 2023 - 5:11 PM', activity : 'Estimate has been sent', admin : 'Johnathan Doe', remark : 'Needs to undergo PDR', status : 'Inspected' },
    { date : 'April 4, 2023 - 5:10 PM', activity : 'Estimate Created', admin : 'Johnathan Doe', remark : '$500 for PDR', status : 'Estimate Created' },
    { date : 'April 4, 2023 - 5:00 PM', activity : 'Inspected', admin : 'Johnathan Doe', remark : 'Needs to undergo PDR', status : 'Inspected' },
    { date : 'April 4, 2023 - 3:33 PM', activity : 'Schedule for Inspection', admin : 'John Doe', remark : 'Found a dent in the rear portion of the car', status : 'For Inspection' },
    { date : 'April 4, 2023 - 3:33 PM', activity : 'Customer Check-In', admin : 'Fitzgerald Grant', remark : 'System Generated', status : 'Checked-In' }
];

export const WeeklyMonthlyColumnsData = [
    { id: 'date', label: 'Date and Time', minWidth: 200 },
    { id: 'activity', label: 'Activity', minWidth: 250 },
    { id: 'admin', label: 'Administered By', minWidth: 250 },
    { id: 'remark', label: 'Remarks', minWidth: 250 },
    { id: 'status', label: 'Status', minWidth: 250 },
];

// Appointment Montly Page

export const DataSteps = ['1. Customer Check In', '2. Vehicle Inspection', '3. Estimate has been sent', '4. Repair Scheduled', '5. Drop off Date', '6. Vehicle Check-In', '7. Repair Started', '8. Repair Completed'];
 
export const statusWorkLoads = [
    {name : 'Checked-In' , color : '#656C9A'},
    {name : 'Approved' , color : '#66BE7A'},
    {name : 'Needs Supplement' , color : '#EA6F53'},
    {name : 'Waiting on Approval' , color : '#0098F9'},
    {name : 'Needs Scope' , color : '#DE4C50'},
];

// Customer Assignments

export const CustomerAssignmentNewRows = [

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    status : { vehicle : 'Active', estimate_sched : 'August 13, 2:30 PM' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : false , dtp : false }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    status : { vehicle : 'Inactive', estimate_sched : 'August 13, 2:30 PM' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : false , scope : true , dtp : false }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    status : { vehicle : 'Active', estimate_sched : 'August 13, 2:30 PM' },
  },

  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    status : { vehicle : 'Active', estimate_sched : 'August 13, 2:30 PM' },
  },

]

export const UsersRows = [

  { id : 1 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'CCC' , user_type : 'Auditor (Manager)' , date_created : 'February 05, 2024' , status : true }, 
  { id : 2 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'Mitchell Level 1' , user_type : 'Estimator (Manager)' , date_created : 'February 05, 2024' , status : true }, 
  { id : 3 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'Mitchell' , user_type : 'Auditor' , date_created : 'February 05, 2024' , status : true }, 
  { id : 4 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'Mitchell Level 1' , user_type : 'Estimator' , date_created : 'February 05, 2024' , status : true }, 
  { id : 5 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'Mitchell Level 1' , user_type : 'Estimator' , date_created : 'February 05, 2024' , status : false }, 
  { id : 6 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'CCC Level 1' , user_type : 'Estimator' , date_created : 'February 05, 2024' , status : true }, 
  { id : 7 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'CCC' , user_type : 'Auditor' , date_created : 'February 05, 2024' , status : true }, 
  { id : 8 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'CCC Level 1' , user_type : 'Estimator' , date_created : 'February 05, 2024' , status : false }, 
  { id : 9 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'CCC' , user_type : 'Auditor' , date_created : 'February 05, 2024' , status : true }, 
  { id : 10 , name : 'Mike Doe', email : 'email@gmail.com' , access : 'Mitchell' , user_type : 'Auditor' , date_created : 'February 05, 2024' , status : true }, 
]

export const StormLocationRows = [

  { id : 1 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true }, 
  { id : 2 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true }, 
  { id : 3 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true }, 
  { id : 4 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : false }, 
  { id : 5 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true },
  { id : 6 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : false }, 
  { id : 7 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true },
  { id : 8 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true },
  { id : 9 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : true },
  { id : 10 , shop : 'Shop 1', leader : 'Mike Doe' , ground_staff : 3 , insurance_partner : 'Progressive Insurance' , storm_profile : 'Storm Profile 1' , storm_header : 'FTW' , status : false },
  

]


// Estimatics newRow 

export const EstimaticsNewRows = [
    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : 'Approved' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'Ready to Audit' },
    },
  
    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439'  , status : 'dtp' , photo : true , scope : true , dtp : true }, 
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : 'Approved' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'No Show' },
    },
  
    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439', status : 'scope' , photo : true , scope : false , dtp : true },  
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : '' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'Ready to Merge' },
    },
  
    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'scope', photo : false , scope : true , dtp : true }, 
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : '' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'Requested Assignment' },
    },
  
    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439', status : 'photo' , photo : true , scope : true , dtp : false }, 
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : 'Approved' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'Ready to Audit' },
    },

    {
      vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439'  , status : 'dtp' , photo : true , scope : false , dtp : true }, 
      customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
      date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
      estimate : { estimate : 'No Estimate Added', status : 'In-progress' , estimate_status : 'Approved' },
      modified : { time : '9:00 AM', completion : 'July 12, 2:30 PM' , status : 'No Show' },
    },
  
]

export const AuditNewRows = [
  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    shop : { name : 'BOBS AUTO COLLISION REPAIR CENTER', location : 'Anywhere St. Any City, Nevada' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    modified : { date : 'July 12, 2:30 PM' , status : 'Ready to Audit' , percentage : '20%' },
  },
  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    shop : { name : 'BOBS AUTO COLLISION REPAIR CENTER', location : 'Anywhere St. Any City, Nevada' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    modified : { date : 'July 12, 2:30 PM' , status : 'Completed' , percentage : '20%' },
  },
  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    shop : { name : 'BOBS AUTO COLLISION REPAIR CENTER', location : 'Anywhere St. Any City, Nevada' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    modified : { date : 'July 12, 2:30 PM' , status : 'Ready to Audit' , percentage : '20%' },
  },
  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    shop : { name : 'BOBS AUTO COLLISION REPAIR CENTER', location : 'Anywhere St. Any City, Nevada' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    modified : { date : 'July 12, 2:30 PM' , status : 'Completed' , percentage : '20%' },
  },
  {
    vehicle : { name : '2020 Tesla', model : 'Model- X Black' , number : '4Y1SL65848Z411439' , status : 'photo' , photo : true , scope : true , dtp : true }, 
    customer : { name : 'OLIVIA POPE', model : 'American Family Insurance' , number : '23-3256981-05' },
    shop : { name : 'BOBS AUTO COLLISION REPAIR CENTER', location : 'Anywhere St. Any City, Nevada' },
    date : { due : 'July 12, 2023', completion : 'August 3, 2023' },
    modified : { date : 'July 12, 2:30 PM' , status : 'Completed' , percentage : '20%' },
  },
]

export const EstimaticsColumnsData = [
    { id: 'vehicle', label: '', minWidth: 200 ,},
    { id: 'customer', label: '', minWidth: 200 },
    { id: 'date', label: '', minWidth: 200 },
    { id: 'estimate', label: '', minWidth: 200 },
    { id: 'modified', label: '', minWidth: 200 },
];


// Franchised Regions

export const FranchisedDataRows = [
  { id : 1, shop : 'Repair 1', technician : 10, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 2, shop : 'Repair 2', technician : 12, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Temporary Close' },
  { id : 3, shop : 'Repair 3', technician : 8, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Closed' },
  { id : 4, shop : 'Repair 4', technician : 9, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 5, shop : 'Repair 5', technician : 5, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 6, shop : 'Repair 6', technician : 12, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 7, shop : 'Repair 7', technician : 11, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Temporary Close' },
  { id : 8, shop : 'Repair 8', technician : 16, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 9, shop : 'Repair 9', technician : 18, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
  { id : 10, shop : 'Repair 10', technician : 11, address : 'Any St., Las Vegas', region : 'Nevada', status : 'Active' },
];

export const FranchisedDataColumns = [
  { id: 'id', label: '#', minWidth: 100 },
  { id: 'shop', label: 'Repair Shop', minWidth: 200 },
  { id: 'technician', label: '# of Technicians', minWidth: 200 },
  { id: 'address', label: 'Address', minWidth: 250 },
  { id: 'region', label: 'State', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 300 },
];

export const FranchisedDataColumnsModal = [
  { id: '_id', label: '#', minWidth: 100 },
  { id: 'first_name', label: 'Name', minWidth: 250 },
  { id: 'email', label: 'Email', minWidth: 250 },
  { id: 'mobile_number', label: 'Mobile Number', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 250 },
]

export const FranchisedDataPreview = [
  { id : 1, name : 'Mike Doe', username : 'Mike_Tech', number : '(702) 555-3890', status : 'Active' },
  { id : 2, name : 'Jane Doe', username : 'Jane_Tech', number : '(702) 523-3560', status : 'Inactive' },
  { id : 3, name : 'Jose Doe', username : 'Jose_Tech', number : '(702) 523-3597', status : 'Active' },
  { id : 4, name : 'John Doe', username : 'John_Tech', number : '(702) 523-3595', status : 'Active' },
  { id : 5, name : 'Emily Doe', username : 'Emily_Tech', number : '(702) 523-3593', status : 'Active' },
]

export const FranchisedDataTable = [

  { id : 1 , owner : 'Gerry Martinez' , number : 4 , region : [
      { id : 1, region_city : 'Nevada' , total_shop : 32 , total_technician : 235 , shop_status : 'Temporary Close' },
      { id : 2, region_city : 'New Hampshire' , total_shop : 24 , total_technician : 184 , shop_status : 'Active' },
      { id : 3, region_city : 'New Jersey' , total_shop : 13 , total_technician : 65 , shop_status : 'Closed' },
      { id : 4, region_city : 'Nebraska' , total_shop : 8 , total_technician : 26 , shop_status : 'Active' },
    ] 
  },

  { id : 2 , owner : 'Taylor McKenzie' , number : 2 , region : [
      { id : 1, region_city : 'Nevada' , total_shop : 54 , total_technician : 587 , shop_status : 'Active' },
      { id : 2, region_city : 'New Hampshire' , total_shop : 38 , total_technician : 258 , shop_status : 'Active' },
    ] 
  },

  { id : 3 , owner : 'Jake Ballard' , number : 3 , region : [
      { id : 1, region_city : 'Nevada' , total_shop : 54 , total_technician : 587 , shop_status : 'Active' },
    ] 
  },

];

export const FranchisedDataColumnsSubMain = [
  { id: 'empty', label: '', minWidth: 10 },
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'region_city', label: 'Regions', minWidth: 200 },
  { id: 'total_shop', label: 'Total # of Repair Shops', minWidth: 200 },
  { id: 'total_technician', label: 'Total # of Technicians', minWidth: 200 },
  { id: 'shop_status', label: 'Status', minWidth: 250 },
];

export const FranchisedDataColumnMain = [
  { id: 'id', label: '', minWidth: 10 },
  { id: 'id', label: '#', minWidth: 100 },
  { id: 'owner', label: 'Owner', minWidth: 200 },
  { id: 'number', label: 'Number of Regions', minWidth: 200 },
]

export const GradientTableRow = styled(TableRow)(
  ({ theme , colorGradient}) => ({
    background: `linear-gradient(to right, ${colorGradient} 10%, white 90% )`,
    // You can customize the gradient or other styles as needed
    color: 'white',
  })
);

export const CarDetailsAttachment = [
  { id : 1 , name : 'LEFT FENDER' , gallery : 'gallery_lt_fender_image' , url : 'base_url_lt_fender' , parts : 'tech_sheet_left_fender'},
  { id : 2 , name : 'RIGHT FENDER' , gallery : 'gallery_rt_fender_image', url : 'base_url_rt_fender' , parts : 'tech_sheet_right_fender'},
  { id : 3 , name : 'HOOD' , gallery : 'gallery_hood_image', url : 'base_url_hood', parts : 'tech_sheet_hood'},
  { id : 4 , name : 'LEFT FRONT DOOR' , gallery : 'gallery_lt_front_door_image', url : 'base_url_lt_front_door', parts : 'tech_sheet_left_front_door'},
  { id : 5 , name : 'RIGHT FRONT DOOR' , gallery : 'gallery_rt_front_door_image', url : 'base_url_rt_front_door', parts : 'tech_sheet_right_front_door'},
  { id : 6 , name : 'WINDSHEILD' , gallery : 'gallery_windshield_image', url : 'base_url_windshield', parts : 'tech_sheet_wind_shield'},
  { id : 7 , name : 'LEFT RAIL' , gallery : 'gallery_lt_rail_image', url : 'base_url_lt_rail', parts : 'tech_sheet_left_rail'},
  { id : 8 , name : 'RIGHT RAIL', gallery : 'gallery_rt_rail_image', url : 'base_url_rt_rail', parts : 'tech_sheet_right_rail'},
  { id : 9 , name : 'ROOF', gallery : 'gallery_roof_image', url : 'base_url_roof', parts : 'tech_sheet_roof'},
  { id : 10 , name : 'LEFT REAR DOOR', gallery : 'gallery_lt_rear_door_image', url : 'base_url_lt_rear_door', parts : 'tech_sheet_left_rear_door'},
  { id : 11 , name : 'RIGHT REAR DOOR', gallery : 'gallery_rt_rear_door_image', url : 'base_url_rt_rear_door', parts : 'tech_sheet_right_rear_door'},
  { id : 12 , name : 'LEFT FUEL DOOR', gallery : 'gallery_lt_fuel_door_image', url : 'base_url_lt_fuel_door', parts : 'tech_sheet_left_fuel_door'},
  { id : 13 , name : 'RIGHT FUEL DOOR', gallery : 'gallery_rt_fuel_door_image', url : 'base_url_rt_fuel_door', parts : 'tech_sheet_right_fuel_door'},
  { id : 14 , name : 'LEFT QUARTER', gallery : 'gallery_lt_quarter_image', url : 'base_url_lt_quarter', parts : 'tech_sheet_left_quarter_box'},
  { id : 15 , name : 'RIGHT QUARTER', gallery : 'gallery_rt_quarter_image', url : 'base_url_rt_quarter', parts : 'tech_sheet_right_quarter_box'},
  { id : 16 , name : 'LEFT CAB CORNER', gallery : 'gallery_lt_quarter_image', url : 'base_url_lt_cab_cbr', parts : 'tech_sheet_left_cab_cnr'},
  { id : 17 , name : 'RIGHT CAB CORNER', gallery : 'gallery_rt_quarter_image', url : 'base_url_rt_cab_cbr', parts : 'tech_sheet_right_cab_cnr'},
  { id : 18 , name : 'DECK', gallery : 'gallery_rt_quarter_image', url : 'base_url_deck_lid', parts : 'tech_sheet_deck_lid'},
  // { id : 16 , name : 'REAR', gallery : 'gallery_rear_image', url : 'base_url_rear', parts : 'tech_sheet_right_quarter_box'},
]

export const CarTotalLoss = [

  { id : 1 , name : 'HEAD LINER' , url : 'base_url_full_total', parts : 'gallery_total_loss_headliner'},
  { id : 2 , name : 'DASHBOARD' , url : 'base_url_full_total', parts : 'gallery_total_loss_dashboard'},
  { id : 3 , name : 'TIRE' , url : 'base_url_full_total', parts : 'gallery_total_loss_tires'},
  { id : 4 , name : 'SEAT' , url : 'base_url_full_total', parts : 'gallery_total_loss_seats'},
  { id : 5 , name : 'DOOR TRIM PANEL' , url : 'base_url_full_total', parts : 'gallery_total_loss_door_trim'},
  { id : 6 , name : 'ENGINE COMPARTMENT' , url : 'base_url_full_total', parts : 'gallery_total_loss_engine_compartment'},
  { id : 7 , name : 'FRONT UNDERCARRIAGE' , url : 'base_url_full_total', parts : 'gallery_total_loss_front_undercarriage'},
]
export const CarInsurance = [
  { id : 1 , name : 'VIN' , url : 'base_url_full_total', parts : 'gallery_full_vin'},
  { id : 2 , name : 'MILEAGE', url : 'base_url_full_total', parts : 'gallery_full_mileage'},
  { id : 3 , name : 'LT FRONT',  url : 'base_url_full_total', parts : 'gallery_full_lt_front'},
  { id : 4 , name : 'RT FRONT', url : 'base_url_full_total', parts : 'gallery_full_rt_front'},
  { id : 5 , name : 'LT REAR',  url : 'base_url_full_total', parts : 'gallery_full_lt_rear'},
  { id : 6 , name : 'RT REAR',  url : 'base_url_full_total', parts : 'gallery_full_rt_rear'},
  { id : 7 , name : 'LICENSE TAG', url : 'base_url_full_total', parts : 'gallery_full_license_plate'},
  { id : 1 , name : 'SIDE VIEW' , url : 'base_url_full_total', parts : 'gallery_full_side_view'},
]

export const CarpanelData = [
  { id : 1 , name : 'VIN' , tag : 'full_vin'},
  { id : 2 , name : 'MILEAGE' , tag : 'full_mileage'},
  { id : 3 , name : 'LT FRONT' , tag : 'full_lt_front'},
  { id : 4 , name : 'RT FRONT' , tag : 'full_rt_front'},
  { id : 5 , name : 'LT REAR' , tag : 'full_lt_rear'},
  { id : 6 , name : 'RT REAR' , tag : 'full_rt_rear'},
  { id : 7 , name : 'LICENSE TAG' , tag : 'full_license_plate'},

  { id : 8 , name : 'LEFT FENDER' , tag : 'lt_fender'},
  { id : 9 , name : 'RIGHT FENDER', tag : 'rt_fender'},
  { id : 10 , name : 'HOOD', tag : 'hood'},
  { id : 11 , name : 'LEFT FRONT DOOR', tag : 'lt_front_door'},
  { id : 12 , name : 'RIGHT FRONT DOOR', tag : 'rt_front_door'},
  { id : 13 , name : 'WINDSHEILD', tag : 'windshield'},
  { id : 14 , name : 'LEFT RAIL', tag : 'lt_rail'},
  { id : 15 , name : 'RIGHT RAIL', tag : 'rt_rail'},
  { id : 16 , name : 'ROOF', tag : 'roof'},
  { id : 17 , name : 'LEFT REAR DOOR', tag : 'lt_rear_door'},
  { id : 18 , name : 'RIGHT REAR DOOR', tag : 'rt_rear_door'},
  { id : 19 , name : 'LEFT FUEL DOOR', tag : 'lt_fuel_door'},
  { id : 20 , name : 'RIGHT FUEL DOOR', tag : 'rt_fuel_door'},
  { id : 21 , name : 'LEFT QUARTER', tag : 'lt_quarter'},
  { id : 22 , name : 'RIGHT QUARTER', tag : 'rt_quarter'},
  { id : 23 , name : 'REAR', tag : 'rear'},

  { id : 24 , name : 'LEFT CAB CORNER', tag : 'left_cab_cnr'},
  { id : 25 , name : 'RIGHT CAB CORNER', tag : 'right_cab_cnr'},

  { id : 26 , name : 'DECK', tag : 'deck_lid'},

  { id : 27 , name : 'HEAD LINER', tag : 'total_loss_headliner'},
  { id : 28 , name : 'DASHBOARD', tag : 'total_loss_dashboard'},
  { id : 29 , name : 'TIRE', tag : 'total_loss_tires'},
  { id : 30 , name : 'SEAT', tag : 'total_loss_seats'},
  { id : 31 , name : 'DOOR TRIM PANEL', tag : 'total_loss_door_trim'},
  { id : 32 , name : 'ENGINE COMPARTMENT', tag : 'total_loss_engine_compartment'},
  { id : 33 , name : 'FRONT UNDERCARRIAGE', tag : 'total_loss_front_undercarriage'},

  { id : 34 , name : 'ADDITIONAL PHOTO', tag : 'additional_photos'},




]

export const CarAttachment = [

  { 
    name : 'LEFT FENDER' , 
    tags : 'tech_sheet_left_fender',
    url : '/workfile/left/fender/',
    data : {
      "up_charge": 25,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "fender": "R&R",
      "head_lamp_value": "R&R",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'RIGHT FENDER' , 
    tags : 'tech_sheet_right_fender',
    url : '/workfile/right/fender/',
    data: {
      "up_charge": 50,
      "size": "Half Dollar",
      "count": "16-25",
      "oversize": 2,
      "conventional_repair_hour": 3,
      "fender": "R&R",
      "head_lamp_value": "R&I",
      "blend_value": false,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'HOOD' , 
    tags : 'tech_sheet_hood',
    url : '/workfile/hood/',
    data: {
      "up_charge": 35,
      "size": "Quarter",
      "count": "6-15",
      "oversize": 2,
      "conventional_repair_hour": 2,
      "hood_value": "R&R",
      "insulator_value": "R&R",
      "front_bumper_value": "R&R",
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'LEFT FRONT DOOR' , 
    tags : 'tech_sheet_left_front_door',
    url : '/workfile/left/front/door/',
    data: {
      "up_charge": 25,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "door": "Full R&I",
      "belt_molding": "R&I",
      "upper_molding": "R&I",
      "applique": "R&I",
      "int_trim_panel": "R&I",
      "door_glass": "R&I",
      "mirror_assy": "R&I",
      "mirror_glass": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'RIGHT FRONT DOOR' , 
    tags : 'tech_sheet_right_front_door',
    url : '/workfile/right/front/door/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "door": "R&R",
      "belt_molding": "R&I",
      "upper_molding": "R&I",
      "applique": "R&I",
      "int_trim_panel": "R&I",
      "door_glass": "R&I",
      "mirror_assy": "R&I",
      "mirror_glass": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'WINDSHEILD' , 
    tags : 'tech_sheet_wind_shield',
    url : '/workfile/windshield/',
    data: {
      "glass_value": "R&R",
      "cowl_value": "R&R",
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'LEFT RAIL' , 
    tags : 'tech_sheet_left_rail',
    url : '/workfile/left/rail/',
    data: {
      "up_charge": 25,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'RIGHT RAIL' , 
    tags : 'tech_sheet_right_rail',
    url : '/workfile/right/rail/',
    data: {
      "up_charge": 35,
      "size": "Quarter",
      "count": "6-15",
      "oversize": 2,
      "conventional_repair_hour": 1,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'ROOF' , 
    tags : 'tech_sheet_roof',
    url : '/workfile/roof/',
    data: {
      "sun_roof": "Without",
      "up_charge": 25,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "roof": "R&R",
      "headliner": "R&R",
      "sun_roof_frame": "R&R",
      "antenna": "R&R",
      "luggage_rack": "R&R",
      "high_mount_lamp": "R&I",
      "back_glass": "R&I",
      "cab_running_lights": "R&I",
      "left_roof_molding": "R&I",
      "right_roof_molding": "R&I",
      "photo": [],
      "note": ""
    }, 
  },
  
  { 
    name : 'LEFT REAR DOOR' , 
    tags : 'tech_sheet_left_rear_door',
    url : '/workfile/left/rear/door/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "door": "R&R",
      "belt_molding": "R&I",
      "upper_molding": "R&I",
      "applique": "R&I",
      "int_trim_panel": "R&I",
      "door_glass": "R&I",
      "blend": true,
      "photo": [],
      "note": "",
    }, 
  },
  
  { 
    name : 'RIGHT REAR DOOR' , 
    tags : 'tech_sheet_right_rear_door',
    url : '/workfile/right/rear/door/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "door": "R&R",
      "belt_molding": "R&I",
      "upper_molding": "R&I",
      "applique": "R&I",
      "int_trim_panel": "R&I",
      "door_glass": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'LEFT FUEL DOOR' , 
    tags : 'tech_sheet_left_fuel_door',
    url : '/workfile/left/fuel/door/',
    data: {
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "photo": [],
      "note": ""
    }, 
  },
  
  { 
    name : 'RIGHT FUEL DOOR' , 
    tags : 'tech_sheet_right_fuel_door',
    url : '/workfile/right/fuel/door/',
    data: {
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "photo": [],
      "note": ""
    }, 
  },
  
  { 
    name : 'LEFT QUARTER' , 
    tags : 'tech_sheet_left_quarter_box',
    url : '/workfile/left/quarter/box/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "rear_lamp": "R&R",
      "trim": "R&I",
      "quarter_glass_molding": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },
  
  { 
    name : 'RIGHT QUARTER' , 
    tags : 'tech_sheet_right_quarter_box',
    url : '/workfile/right/quarter/box/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "rear_lamp": "R&R",
      "trim": "R&I",
      "quarter_glass_molding": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'LEFT CAB CORNER' , 
    tags : 'tech_sheet_left_cab_cnr',
    url : '/workfile/left/cab/cnr/',
    data : {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "conventional_repair_hour": 1,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'RIGHT CAB CORNER' , 
    tags : 'tech_sheet_right_cab_cnr',
    url : '/workfile/right/cab/cnr/',
    data : {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "conventional_repair_hour": 1,
      "photo": [],
      "note": ""
    }, 
  },

  { 
    name : 'DECK' , 
    tags : 'tech_sheet_deck_lid',
    url : 'workfile/deck/lid/',
    data: {
      "up_charge": 50,
      "size": "Nickle",
      "count": "1-5",
      "oversize": 1,
      "conventional_repair_hour": 1,
      "deck_lid_panel": "R&R",
      "interior_trim": "R&I",
      "spoiler": "R&I",
      "bumper_cover": "R&I",
      "blend": true,
      "photo": [],
      "note": ""
    }, 
  },

]