import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Card from '../../../../component/Card/Card'
import Regular from '../../../../component/Typography/Regular';
import Bold from '../../../../component/Typography/Bold';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { DashboardIcons , getDate } from '../../../../contants';

import TextDisplay from '../../../../component/Typography/TextDisplay';

import { APIServices } from '../../../../hooks/fetchAPI';

import TablePagination from '@mui/material/TablePagination';

const rows = [
    { id : 1, name : 'Jake Ballard', shop : 'Bobs Auto Collison Repair' , region : 'Nevada', scope : '30', completed : '30', status : 'Active' },
    { id : 2, name : 'Fitzgerald Grant', shop : 'Any Shop' , region : 'Nebraska', scope : '12', completed : '12', status : 'Active'  },
    { id : 3, name : 'Olivia Pope', shop : 'Any Shop' , region : 'Nebraska', scope : '15', completed : '15',status : 'Inactive'  },
    { id : 4, name : 'Huck Munoz', shop : 'Any Shop' , region : 'New York', scope : '10', completed : '10', status : 'Active'  },
    { id : 5, name : 'Quin Perkins', shop : 'Bobs Auto Collison Repair' , region : 'Nevada', scope : '10' , completed : '10', status : 'Active' },
    { id : 6, name : 'Mellie Grant', shop : 'Any Shop' , region : 'Missouri', scope : '10', completed : '10', status : 'Inactive'  },
    { id : 7, name : 'Abby Whelan', shop : 'Any Shop' , region : 'Mississippi', scope : '10' , completed : '10', status : 'Active' },
    { id : 8, name : 'David Rosen', shop : 'Any Shop' , region : 'Washington', scope : '10', completed : '10',status : 'Active'  },
    { id : 9, name : 'Susan Ross', shop : 'Any Shop' , region : 'Louisana', scope : '10' , completed : '10', status : 'Active' },
    { id : 10, name : 'Bonnie WinterBottom', shop : 'Any Shop' , region : 'Utah', scope : '10' , completed : '10', status : 'Inactive' },
];

const activity_row = [
    { id : 1, date : "April 04, 2023 - 8:00 AM" , activity : 'PDR Repair Complete' , user : 'Mike Doe', remarks : 'N/A' , status : 'Vehicle Checked-In' },
    { id : 2, date : "April 04, 2023 - 8:00 AM" , activity : 'Repair is in progress' , user : 'Olivia Pope', remarks : 'System Generated' , status : 'Repair-In-Progress' },
    { id : 3, date : "April 04, 2023 - 8:00 AM" , activity : 'Vehicle Check In' , user : 'Olivia Pope', remarks : 'N/A' , status : 'Vehicle Checked-In' },
    { id : 4, date : "April 04, 2023 - 8:00 AM" , activity : 'Schedule for Repair' , user : 'Mike Doe', remarks : 'N/A' , status : 'Vehicle Checked-In' },
    { id : 5, date : "April 04, 2023 - 8:00 AM" , activity : 'Follow-Up Customer' , user : 'Mike Doe', remarks : 'N/A' , status : 'Vehicle Checked-In' },
]

const Activity = (  CustomerData ) => {

    const { id } = useParams();

    const [ page , setPage ] = useState(0);
    const [ limit , setLimit ] = useState(10);

    const [ activityData , setActivityData ] = useState([]);

    useEffect(() => {
        (async () => {
            handleData();
        })()
      }, []);


    const handleData = async () => {
        const res = await APIServices.get({ url: `/workfile/list/${id}/filter/activity?page=${page + 1}&limit=${limit}` })
        if (res && !res.error && res.data && res.data.data) {
            setActivityData( res?.data?.data )
        }
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage)
        handleData();
    };

    const handleChangeRowsPerPage = async (event) => {
        setLimit(parseInt(event.target.value, 10));
        handleData();
    };
  

  return (
    <Card props={'bg-white flex flex-col gap-5'}>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">

        <TableBody>
          {/* { CustomerData?.CustomerData?.activities.map((row) => ( */}
          {(limit > 0
              ? CustomerData?.CustomerData?.activities?.slice(page * limit, page * limit + limit)
              : CustomerData?.CustomerData?.activities
            )?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell>

                <div className='flex flex-col'>

                    <Regular>
                        <span className='text-tableTextColor'>Date and Time</span>
                    </Regular>

                    <Bold>
                        <span style={{ fontSize : 12 }} className='text-regularText'>{getDate(row?.timestamp)}</span>
                    </Bold>

                </div>
                
              </TableCell>

              <TableCell>

                <div className='flex flex-col'>

                    <Regular>
                        <span className='text-tableTextColor'>Activity</span>
                    </Regular>

                    <Bold>
                        <span style={{ fontSize : 12 }} className='text-regularText'>{row?.activity}</span>
                    </Bold>

                </div>
                
              </TableCell>

              <TableCell>

                <div className='flex flex-col'>

                    <Regular>
                        <span className='text-tableTextColor'>Performed by</span>
                    </Regular>

                    <Bold>
                        <span style={{ fontSize : 12 }} className='text-regularText'>{row?.performed_by?.first_name} {row?.performed_by?.last_name}</span>
                    </Bold>

                </div>
                
              </TableCell>
  
              <TableCell>

                <div className='flex flex-col'>

                    <Regular>
                        <span className='text-tableTextColor'>Remarks</span>
                    </Regular>

                    <Bold>
                        <span style={{ fontSize : 12 }} className='text-regularText'>{row?.remarks}</span>
                    </Bold>

                </div>
                
              </TableCell>

              <TableCell>

                <div className='flex flex-col'>

                    <Regular>
                        <span className='text-tableTextColor'>Status</span>
                    </Regular>

                    <Bold>
                        <span style={{ fontSize : 12 }} className='text-regularText'>{row?.status}</span>
                    </Bold>

                </div>

             </TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
        component="div"
        count={CustomerData?.CustomerData?.activities?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />

    </Card>
  )
}

export default Activity
