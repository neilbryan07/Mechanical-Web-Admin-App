import React from 'react'

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import Bold from '../../../../component/Typography/Bold';
import Regular from '../../../../component/Typography/Regular';

import {  WeeklyMonthlyHistoryRowsData as historyRows , WeeklyMonthlyColumnsData as columns , DataSteps as steps } from '../../../../contants/StaticData'
import { ProgressIcon, DashboardIcons } from '../../../../contants';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 23,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#D2ECD8',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#D2ECD8',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: '#D2ECD8',
    }),
    ...(ownerState.completed && {
      backgroundColor: '#D2ECD8',
    }),
  }));
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <img src={ ProgressIcon.ProgressCustomerIcon} alt='icon' width={32} height={32}/>,
      2: <img src={ ProgressIcon.ProgressSearchIcon} alt='icon' width={32} height={32}/>,
      3: <img src={ ProgressIcon.ProgressCalculatorIcon} alt='icon' width={32} height={32}/>,
      4: <img src={ ProgressIcon.ProgressRepairIcon} alt='icon' width={32} height={32}/>,
      5: <img src={ ProgressIcon.ProgressDropOffIcon} alt='icon' width={32} height={32}/>,
      6: <img src={ ProgressIcon.ProgressCarIcon} alt='icon' width={32} height={32}/>,
      7: <img src={ ProgressIcon.ProgressCaseIcon} alt='icon' width={32} height={32}/>,
      8: <img src={ ProgressIcon.ProgressCheckIcon} alt='icon' width={32} height={32}/>,
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

const AppointmentTable = () => {
  return (
    <React.Fragment>
        
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={6} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Bold><span style={{ fontSize : 11 }}>{label}</span></Bold>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
        </Box>

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>

                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Bold>{column.label}</Bold>
                    </TableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>
                {historyRows.map((row) => (
                  <TableRow
                    key={historyRows.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.date}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.activity}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.admin}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.remark}</span>
                      </Regular>
                    </TableCell>

                    <TableCell>
                      <Regular>
                        <span className='text-regularText'>{row.status}</span>
                      </Regular>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>  

        <div className='flex flex-row w-full items-center mt-4 gap-3'>

            <div className='flex flex-row items-center gap-2'>

                <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                    <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronLeft/></span>
                </div>

                <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                    <Bold>1</Bold>
                </div>
                
                <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                    <Bold>2</Bold>
                </div>

                <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                    <Bold>3</Bold>
                </div>

                <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width:25,height:25}}>
                    <span style={{ fontWeight:600,fontSize:15 }} className='text-regularText'><BsChevronRight/></span>
                </div>

            </div>

            <div className='border border-gray-300 rounded-md py-0.5 px-3 gap-3 flex justify-between items-center cursor-pointer'>
                <Regular>10/page</Regular>
                <img src={DashboardIcons.DROPDOWN} alt='icon'/>
            </div>

        </div>

    </React.Fragment>
  )
}

export default AppointmentTable
