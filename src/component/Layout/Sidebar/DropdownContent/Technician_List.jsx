import React, { useState, useEffect } from 'react'

import SubContainer from '../../Container/SubContainer';
import Card from '../../../Card/Card';


import ModalDefault from '../../../Modal/ModalDefault';
import Bold from '../../../Typography/Bold';
import { AiOutlinePlusCircle } from "react-icons/ai";

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid , GridToolbar ,GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { APIServices } from '../../../../hooks/fetchAPI';
import { getTechnicianList } from '../../../../redux/technicians/technicianThunk';

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      {/* Add custom toolbar content if needed */}
      {/* To disable export buttons, you can omit or conditionally render them */}
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarQuickFilter />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
};


const Technician_List = ({ Techmodal , SetTechModal , setTechData , techListDatas , pagingTechnician }) => {

    const dispatch = useDispatch();

    // const { action, technicianResponse } = useSelector((state) => state.technician);
    // const technicianResponses = useSelector((state) => state.technician.action);
    // const pagingTechnician = action?.technicianResponse?.data;
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
      const ids = techListDatas?.map(item => item._id);
      setSelectionModel(ids)

    }, [Techmodal]);


    const handleSelectedData = () => {
        setTechData(null)
        // var filteredData = technicianResponses?.technicianResponse?.data.filter(item => assignData.includes(item._id));
        var filteredData = pagingTechnician?.data.filter(item => selectionModel.includes(item._id));
        setTechData(filteredData)
        SetTechModal(false)

    }

    // const handleAssignData = (event) => {

    //     setAssignData((prevSelectedItems) => {
    //       if (prevSelectedItems.includes(event.target.value)) {

    //         return prevSelectedItems.filter((selectedItem) => selectedItem !== event.target.value);
    //       } else {
         
    //         return [...prevSelectedItems, event.target.value];
    //       }
    //     });
    
    // }

    const handleSelectionModelChange = (newSelectionModel) => {
      setSelectionModel(newSelectionModel);
    };


    useEffect(() => {

        (async () => {

        const pagination = {
            page: 1,
            limit: 10000000,
        }
     
        await dispatch( getTechnicianList(pagination) );

        })();

    }, []);

    const setToggleClose = (data) => {
      SetTechModal(data)
    }

    const getRowId = (row) => row?._id;

    const columnsGrids = [

      {
        field: 'first_name',
        headerName: 'First Name',
        flex: 1,
        renderCell: (params)=> {
          return (
            <div style={{ position: 'relative' }}>
              <span>{ params?.row?.first_name }</span>        
            </div>
          )
        }
      },
      {
        field: 'last_name',
        headerName: 'Last Name',
        flex: 1,
        renderCell: (params)=> {
          return (
            <div style={{ position: 'relative' }}>
              <span> { params?.row?.last_name }</span>        
            </div>
          )
        }
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        renderCell: (params)=> {
          return (
            <div style={{ position: 'relative' }}>
              <span> { params?.row?.email }</span>        
            </div>
          )
        }
      },
      {
        field: 'mobile_number',
        headerName: 'Phone Number',
        flex: 1,
        renderCell: (params)=> {
          return (
            <div style={{ position: 'relative' }}>
              <span> { params?.row?.mobile_number }</span>        
            </div>
          )
        }
      },
    ]

  return (
    <ModalDefault 
        title={"List of Technicians"}
        toggle={Techmodal}
        // setToggle={SetTechModal}
        setToggle={setToggleClose}
        size={'w-6/12 h-[85%]'}
    >

    <div className='px-4'>
    <Card>

        <div className='w-full flex flex-row justify-between items-center pb-3 pr-2 mb-3'>

            <h1 className='w-full flex flex-row'>
                <span className='font-bold' style={{ fontSize:14}}>Item Selected ({ selectionModel?.length })</span>
            </h1>

            
            <div className='w-full flex justify-end my-2'>

              {
                  selectionModel?.length ?        
                  <Button
                      onClick={ () => handleSelectedData() }
                      sx={{ mt: 1, mr: 1 }}
                      variant="contained"
                      size="large"
                      color="success"
                  >
                      Assign Technician
                  </Button> : null
              }

            </div>
        
            {/* <div className='flex items-center justify-center gap-3 py-2 px-10 border-mainText border hover:bg-green-500 hover:text-white rounded-lg text-mainText cursor-pointer'>
                <span style={{ fontSize:23 }}><AiOutlinePlusCircle/></span> <Bold>Add Technicians</Bold>
            </div> */}

        </div>
        
        <DataGrid
          rows={ pagingTechnician?.data }
          getRowId={getRowId}
          columns={columnsGrids}
          rowSelectionModel={selectionModel}
          slots={{ toolbar: CustomToolbar }}
          checkboxSelection
          onRowSelectionModelChange={ handleSelectionModelChange }
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              disableToolbarButton: true
            },
          }}

        />

        {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>

              <TableRow>
    
                  <TableCell style={{ maxWidth: '40' }} >
                    <Bold>Assign</Bold>
                  </TableCell>

                  <TableCell style={{ minWidth: '80' }} >
                    <Bold>Full Name</Bold>
                  </TableCell>

                  <TableCell style={{ minWidth: '80' }} >
                    <Bold>Email</Bold>
                  </TableCell>

                  <TableCell style={{ minWidth: '80' }} >
                    <Bold>Phone Number</Bold>
                  </TableCell>
     
              </TableRow>

          </TableHead>
          <TableBody>

            {technicianResponses?.technicianResponse?.data?.map((row , key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
              >
                <TableCell>

                  <div className='flex flex-start relative mb-1 right-3 '>
                    <Checkbox onChange={ e => handleAssignData(e) } value={ row?._id }/>
                  </div>
                  
            
                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    {row?.first_name} {row?.last_name} 
                  </div>

                </TableCell>


                <TableCell>

                  <div className='flex flex-col'>
                    {row?.email}
                  </div>

                </TableCell>

                <TableCell>

                  <div className='flex flex-col'>
                    {row?.mobile_number}
                  </div>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer> */}


      </Card>
      </div>
    </ModalDefault>
  )
}

export default Technician_List
