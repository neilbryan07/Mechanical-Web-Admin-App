import React, { useState } from 'react'
import * as Yup from 'yup';
import SubContainer from '../../../component/Layout/Container/SubContainer'
import PageHeader from '../../../component/Layout/PageHeader_PageNotification'

import Header from '../../../component/Typography/Header'
import Regular from '../../../component/Typography/Regular'
import Bold from "../../../component/Typography/Bold"
import TextDisplay from '../../../component/Typography/TextDisplay'

import Card from "../../../component/Card/Card"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SubHeader from '../../../component/Typography/SubHeader'
import TextInputs from '../../../component/FormInput'
import Switch from '@mui/material/Switch';

import { BsChevronRight, BsChevronLeft, BsCurrencyDollar, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch, AiFillPrinter, AiTwotoneShop, AiOutlinePlusCircle } from "react-icons/ai";
import { RiFilterFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { HiPlus, HiUserGroup } from "react-icons/hi";

import { Formik, useFormikContext } from 'formik';
import Form from '../../../component/Formik/Form'
import FormikInput from '../../../component/Formik/FormikInput'

import { DashboardIcons, pageRoutes } from '../../../contants'

import ModalDefault from '../../../component/Modal/ModalDefault'

import { FranchisedDataRows as rows, FranchisedDataColumns as columns, FranchisedDataColumnsModal as columnsModal, FranchisedDataPreview as preview } from "../../../contants/StaticData"

const validationSchema = Yup.object().shape({

  // region: Yup.string().required('Region is a required field'),
  // shops: Yup.string().required('Shop Assigned is a required field'),

  // mobile_number: Yup.string().required('Mobile Number is a required field'),

  // first_name: Yup.string().required('First Name is a required field'),
  // last_name: Yup.string().required('Last Name is a required field'),
  // email: Yup.string().required('Email Address is a required field'),

  // pay_percentage: Yup.string().required('Tech Pay Percentage is a required field'),

  // username: Yup.string().required('Username is a required field'),
  password: Yup.string().required('Password is a required field'),
  confirm_password: Yup.string().required('Confirm Password is a required field'),
});

let formValue = {

  mobile_number: '',

  // Currently Active Based from the API response
  email: '',
  first_name: '',
  last_name: '',

  pay_percentage: '',
  shops: [],
  region: '',
  role: 2,
  status: '',
  verified: false,

  username: '',
  password: '',
  confirm_password: '',
}

const Franchise_Region = () => {

  const [modalHandle, setModalHandle] = useState(false);

  const [modalTech, setModalTech] = useState(false);

  const handleSubmit = () => {

  }


  return (
    <SubContainer>

      <ModalDefault
        title={"Add Technician"}
        toggle={modalTech}
        setToggle={setModalTech}
      >
        <Formik
          initialValues={formValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='px-4'>

            <div className='my-3'>
              <span><SubHeader>Name</SubHeader></span>
              <TextInputs placeholder={"Enter full name"} type={"text"} />
            </div>

            <div className='my-3'>
              <span><SubHeader>Mobile Number</SubHeader></span>
              <TextInputs placeholder={"Enter mobile number"} type={"text"} />
            </div>

            <div className='my-3'>
              <span><SubHeader>UserName</SubHeader></span>
              <TextInputs placeholder={"Enter username"} type={"text"} />
            </div>

            <div className='flex flex-row justify-between w-full '>

              <div className='flex flex-row justify-between w-full gap-3'>

                <div className='gap-2 my-3 w-full'>
                  <Form.Item name="password" label="Password">
                    <FormikInput.Password name="password" placeholder="Enter Password" />
                  </Form.Item>
                </div>

                <div className='gap-2 my-3 w-full'>
                  <Form.Item name="confirm_password" label="Confirm Password">
                    <FormikInput.Password name="confirm_password" placeholder="Enter Confirm Password" />
                  </Form.Item>
                </div>

                {/* Phone Number TextInput */}
                {/* <div className='my-2 w-full'>
                  <span><SubHeader>Password</SubHeader></span>
                  <TextInputs placeholder={"Enter password"} type={"password"} />
                </div> */}

                {/* Email Address Name TextInput */}
                {/* <div className='my-2 w-full'>
                  <span><SubHeader>Confirmed Password</SubHeader></span>
                  <TextInputs placeholder={"Enter confirmed password"} type={"password"} />
                </div> */}

              </div>

            </div>

            <div className='gap-3 flex flex-row items-center'>

              <span className='text-gray-500 font-semibold text-sm'>Inactive</span>
              <Switch defaultChecked color="success" />
              <span className='text-green-400 font-semibold text-sm'>Active</span>

            </div>

            <div className='w-full flex justify-end pb-8'>
              <div className='flex flex-row items-center gap-10'>

                <span className='text-gray-600 cursor-pointer' onClick={() => setModalTech(false)}>
                  <Header>Cancel</Header>
                </span>

                <div className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                  <Header>Save</Header>
                </div>

              </div>
            </div>

          </Form>

        </Formik>
      </ModalDefault>

      <ModalDefault
        title={"Repair Shop Details"}
        toggle={modalHandle}
        setToggle={setModalHandle}
      // size={"w-3/6"}
      >
        <div className='px-4'>

          {/* Technician Info */}
          <div className='w-full border rounded-md p-2'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                <AiTwotoneShop />
                <span style={{ fontSize: 14 }}><Bold>Repair Shop Information</Bold></span>
              </div>

              <span className='text-mainText cursor-pointer' style={{ fontSize: 14 }}><Bold>EDIT</Bold></span>

            </div>

            <div class="grid grid-cols-2 gap-y-2 mt-3 items-center">

              {/* Name */}

              <div><TextDisplay>Name</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>BOBS AUTO COLLISION REPAIR</TextDisplay>
              </div>

              <div><TextDisplay>Address</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>Any St. Anywhere City</TextDisplay>
              </div>

              <div><TextDisplay>Region / State</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>Nevada</TextDisplay>
              </div>

              <div><TextDisplay>Total Number of Technicians</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>10</TextDisplay>
              </div>

              <div><TextDisplay>Status</TextDisplay></div>
              <div className='flex flex-row items-center'>
                <TextDisplay><span className='text-green-500 font-semibold text-sm mr-2'>:</span> </TextDisplay>
                <TextDisplay><span className='text-green-500 font-semibold text-sm'>Active</span> </TextDisplay>
              </div>

            </div>

          </div>

          <br />

          {/* Technician Labor Rates */}
          <div className='w-full border rounded-md p-2'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                <BsCurrencyDollar />
                <span style={{ fontSize: 14 }}><Bold>Labor Rates</Bold></span>
              </div>

              <span className='text-mainText cursor-pointer' style={{ fontSize: 14 }}><Bold>EDIT</Bold></span>

            </div>

            <div class="grid grid-cols-2 gap-y-2 mt-3 items-center">

              <div><TextDisplay>Body Labor Rate</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>$56</TextDisplay>
              </div>

              <div><TextDisplay>Paint Labor Rate</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>$65</TextDisplay>
              </div>

              <div><TextDisplay>Mechanicla Labor Rate</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>$56</TextDisplay>
              </div>

            </div>

          </div>

          <br />

          {/* Technician Shop Manager */}
          <div className='w-full border rounded-md p-2'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                <BsFillPersonFill />
                <span style={{ fontSize: 14 }}><Bold>Shop Manager</Bold></span>
              </div>

              <span className='text-mainText cursor-pointer' style={{ fontSize: 14 }}><Bold>EDIT</Bold></span>

            </div>

            <div class="grid grid-cols-2 gap-y-2 mt-3 items-center">

              <div><TextDisplay>Manager's Name</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>Zach Reichert</TextDisplay>
              </div>

              <div><TextDisplay>Phone Number</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>(303)-232-2324</TextDisplay>
              </div>

              <div><TextDisplay>Email Address</TextDisplay></div>

              <div className='flex flex-row items-center'>
                <TextDisplay><span className='font-extrabold mr-2'>:</span></TextDisplay>
                <TextDisplay>zreichert@gmail.com</TextDisplay>
              </div>


            </div>

          </div>

          <div className='flex flex-col mt-6'>

            <div className='flex flex-row justify-between items-center'>

              <div className='flex flex-row gap-3 items-center'>
                <HiUserGroup />
                <span style={{ fontSize: 14 }}><Bold>Technicians</Bold></span>
              </div>

              <span className='font-semibold' style={{ fontSize: 14 }}>Item List (10)</span>

            </div>

            <span className='my-2' />

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columnsModal.map((column) => (
                      <TableCell
                        key={column.reference}
                        style={{ minWidth: column.minWidth }}
                      >
                        <Bold>{column.label}</Bold>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {preview.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.id}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.name}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.username}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>
                        <Regular>
                          <span className='text-regularText'>{row.number}</span>
                        </Regular>
                      </TableCell>

                      <TableCell>

                        {row.status === 'Active' ?
                          <Bold>
                            <span className='bg-mainText rounded-lg py-1 px-2 text-white'>{row.status}</span>
                          </Bold>
                          : null}

                        {row.status === 'Inactive' ?
                          <Bold>
                            <span className='bg-tertiaryText rounded-lg py-1 px-2 text-white'>{row.status}</span>
                          </Bold>
                          : null}

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <span className='my-2' />

            <div className='w-full flex justify-center pb-3'>

              <div onClick={() => [setModalTech(true), setModalHandle(false)]} className='flex items-center justify-center gap-3 py-2 px-24 border-mainText border rounded-lg text-mainText cursor-pointer'>
                <span style={{ fontSize: 23 }}><AiOutlinePlusCircle /></span> <Bold>Add Technicians</Bold>
              </div>

            </div>

          </div>

          <div className='w-full flex justify-end pb-3'>
            <div className='flex flex-row items-center gap-10'>

              <span className='text-gray-600 cursor-pointer' onClick={() => setModalHandle(false)}>
                <Header>Cancel</Header>
              </span>

              <div className='flex items-center justify-center py-3 px-20 bg-sky-500 rounded-md text-white cursor-pointer hover:bg-sky-800 hover:transition duration-300'>
                <Header>Save</Header>
              </div>

            </div>
          </div>

        </div>
      </ModalDefault>

      <PageHeader name={"Franchised Regions"} description={"Here are the list of shops across the nation"} />

      <div className='w-full flex flex-row items-center justify-between mb-3 max-[1338px]:flex-col max-[1338px]:gap-3'>

        <div className='w-full flex flex-row items-center gap-1 mt-2'>
          <img src={DashboardIcons.REPORTDASHBOARD} alt='icon' />
          <Regular><span className='text-secondaryText text-sm'>Dashboard</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Franchise Regions</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Region Owners</span></Regular>
          <Regular><span className='text-secondaryText text-sm'>/ Region Shop per Region</span></Regular>
        </div>

        <div className='w-full flex flex-row gap-3 items-center justify-end'>

          {/* Search */}
          <div className='w-4/12 relative'>
            <input placeholder={"Search"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border py-1 px-4`} type={"text"} />
            <div className='absolute top-2.5 right-2'>
              <span className='text-regularText'><AiOutlineSearch /></span>
            </div>
          </div>

          {/* Icon */}
          <div className='flex flex-row items-center justify-between gap-2'>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><IoReload /></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><RiFilterFill /></span>
            </div>

            <div className='p-1.5 bg-white border border-gray-300 rounded-md cursor-pointer'>
              <span className='text-zinc-700' style={{ fontSize: 17 }}><AiFillPrinter /></span>
            </div>

          </div>

        </div>

      </div>

      <Card>

        <div className='w-full flex justify-between items-center'>

          <div className='flex flex-row'>

            <Header><a href={pageRoutes.FRANCHISE} className='text-mainText flex flex-row cursor-pointer'><BsChevronLeft /> Nevada (54)</a></Header>

          </div>

          <div onClick={() => setModalHandle(true)} className='bg-mainText py-2 px-6 rounded-md flex flex-row items-center cursor-pointer hover:bg-green-600 hover:transition duration-300'>
            <span className='text-white text-bold text-xl'><HiPlus /></span>
            <Regular><span className='text-white ml-3'>Add</span></Regular>
          </div>

        </div>

        <br />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.reference}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Bold>{column.label}</Bold>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.id}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.shop}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.technician}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.address}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>
                    <Regular>
                      <span className='text-regularText'>{row.region}</span>
                    </Regular>
                  </TableCell>

                  <TableCell>

                    {row.status === 'Temporary Close' ?
                      <Bold>
                        <span className='text-regularOrange border-regularOrange border rounded py-1 px-2'>{row.status}</span>
                      </Bold>
                      : null}

                    {row.status === 'Active' ?
                      <Bold>
                        <span className='text-mainText border-mainText border rounded-lg py-1 px-2'>{row.status}</span>
                      </Bold>
                      : null}

                    {row.status === 'Closed' ?
                      <Bold>
                        <span className='text-tertiaryText border-tertiaryText border rounded-lg py-1 px-2'>{row.status}</span>
                      </Bold>
                      : null}

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className='flex flex-row w-full items-center mt-4 gap-3'>

          <div className='flex flex-row items-center gap-2'>

            <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width: 25, height: 25 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }} className='text-regularText'><BsChevronLeft /></span>
            </div>

            <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width: 25, height: 25 }}>
              <Bold>1</Bold>
            </div>

            <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width: 25, height: 25 }}>
              <Bold>2</Bold>
            </div>

            <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width: 25, height: 25 }}>
              <Bold>3</Bold>
            </div>

            <div className='rounded-md flex items-center justify-center border border-regularText cursor-pointer' style={{ width: 25, height: 25 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }} className='text-regularText'><BsChevronRight /></span>
            </div>

          </div>

          <div className='border border-gray-300 rounded-md py-0.5 px-3 gap-3 flex justify-between items-center cursor-pointer'>
            <Regular>10/page</Regular>
            <img src={DashboardIcons.DROPDOWN} alt='icon' />
          </div>

        </div>

      </Card>
      <div className='mb-16' />
    </SubContainer>
  )
}

export default Franchise_Region
