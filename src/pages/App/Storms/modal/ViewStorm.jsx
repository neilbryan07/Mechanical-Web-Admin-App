import React, { useState } from 'react'


import { FaUserCircle } from "react-icons/fa";
import { LuPersonStanding } from "react-icons/lu";

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from '../../../../component/Card/Card';
import TextDisplay from '../../../../component/Typography/TextDisplay';
import Bold from '../../../../component/Typography/Bold';

import { formatMonthDateYearWithMonthName } from '../../../../contants';

const ViewStorm = ({ ModalToggle, Toggle, userData }) => {

  const handleAccessManager = () => {

    if (userData.hasOwnProperty('estimator_details'))
      return userData?.estimator_details?.is_manager ? 'Manager' : 'Not Manager';

    return userData?.auditor_details?.is_manager ? 'Manager' : 'Not Manager';

  }

  const handleAccessLevel = () => {

    if (userData.hasOwnProperty('auditor_details')) {

      return userData?.auditor_details?.access?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item}</span> <br />
        </React.Fragment>

      )
      )

    } else if (userData.hasOwnProperty('estimator_details')) {

      return userData?.estimator_details?.level_type?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item}</span> <br />
        </React.Fragment>

      )
      )

    }

  }

  const handleAuditor = () => {

    if (userData.hasOwnProperty('auditor_details')) {

      return userData?.auditor_details?.auditors?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item?.first_name} {item?.last_name}</span> <br />
        </React.Fragment>

      )
      )

    } else if (userData.hasOwnProperty('estimator_details')) {

      return userData?.estimator_details?.auditors?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item?.first_name} {item?.last_name}</span> <br />
        </React.Fragment>

      )
      )

    }
  }

  const handleEstimator = () => {

    if (userData.hasOwnProperty('auditor_details')) {

      return userData?.auditor_details?.estimators?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item?.first_name} {item?.last_name}</span> <br />
        </React.Fragment>

      )
      )

    } else if (userData.hasOwnProperty('estimator_details')) {

      return userData?.estimator_details?.estimators?.map((item) =>
      (
        <React.Fragment>
          <span className='text-tableTextColor'>{item?.first_name} {item?.last_name}</span> <br />
        </React.Fragment>

      )
      )

    }
  }

  return (
    <ModalDefault
      title={"Storm Location Details"}
      toggle={Toggle}
      setToggle={ModalToggle}
      size={'w-[35%] h-[60%]'}
    >
      <div className='px-4 w-full flex flex-col gap-5 overflow-x-hidden'>

        <Card>

          <div className='w-full flex flex-row items-center justify-between'>

            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize: 18 }} className='text-black'><FaUserCircle /></span>
              <span style={{ fontSize: 16 }} className='text-black'><Bold>Storm Profile</Bold></span>
            </div>

          </div>

          <div className='w-full px-4 grid grid-cols-2 mt-3'>

            <div>
              <TextDisplay>
                <span style={{ fontSize: 16 }}>Start Date</span>
              </TextDisplay>
            </div>


            <div className='flex flex-row items-center'>
              <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
              <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{formatMonthDateYearWithMonthName(userData?.start_date)}</span>
            </div>

            <div className='mt-2'>
              <TextDisplay>
                <span style={{ fontSize: 16 }}>Storm Leader</span>
              </TextDisplay>
            </div>

            <div className='flex flex-row items-center'>
              <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
              <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{userData?.storm_leader?.first_name} {userData?.storm_leader?.last_name}</span>
            </div>

            <div className='mt-2'>
              <TextDisplay>
                <span style={{ fontSize: 16 }}>Storm Profile</span>
              </TextDisplay>
            </div>

            <div className='flex flex-row items-center'>
              <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
              <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{userData?.storm_profile}</span>
            </div>

            <div className='mt-2'>
              <TextDisplay>
                <span style={{ fontSize: 16 }}>Storm Header</span>
              </TextDisplay>
            </div>

            <div className='flex flex-row items-center'>
              <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
              <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{userData?.storm_header}</span>
            </div>

            <div className='mt-2'>
              <TextDisplay>
                <span style={{ fontSize: 16 }}>Insurance Partner</span>
              </TextDisplay>
            </div>

            <div className='flex flex-row items-center'>
              <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
              <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{userData?.insurance_partner?.provider}</span>
            </div>

          </div>

        </Card>

        <Card>

          <div className='w-full flex flex-row items-center justify-between'>

            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize: 18 }} className='text-black'><LuPersonStanding /></span>
              <span style={{ fontSize: 16 }} className='text-black'><Bold>Storm Location Portal Access</Bold></span>
            </div>

          </div>

          {userData?.shop_location?.map((row, index) => (

            <div className='w-full px-4 flex flex-col gap-2 mt-3' key={index}>

              <div className='w-full grid grid-cols-2'>

                <div className='flex flex-row items-center'>
                  <TextDisplay>
                    <span style={{ fontSize: 16 }}>Shop Name</span>
                  </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                  <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{userData?.shop?.name}</span>
                </div>

              </div>


              <div className='w-full grid grid-cols-2 break-words'>

                <div className='mt-2'>
                  <TextDisplay>
                    <span style={{ fontSize: 16 }}>Managers Name</span>
                  </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                  <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{row?.contact_name}</span>
                </div>

                <div className='mt-2'>
                  <TextDisplay>
                    <span style={{ fontSize: 16 }}>Phone Number</span>
                  </TextDisplay>
                </div>

                <div className='flex flex-row items-center'>
                  <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{row?.phone_number}</span>
                </div>

                <div className='mt-2'>
                  <TextDisplay>
                    <span style={{ fontSize: 16 }}>Email Address</span>
                  </TextDisplay>
                </div>

                <div className='flex flex-row items-center w-full'>
                  <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                  <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5 w-10/12'>{row?.email}</span>
                </div>

              </div>


            </div>

          ))}

        </Card>

        <Card>

          <div className='w-full flex flex-row items-center justify-between'>

            <div className='flex flex-row gap-2 items-center'>
              <span style={{ fontSize: 18 }} className='text-black'><LuPersonStanding /></span>
              <span style={{ fontSize: 16 }} className='text-black'><Bold>Ground Staff</Bold></span>
            </div>

          </div>


          {userData?.ground_staffs?.map((row, key) => (

            <div className='w-full px-4 grid grid-cols-2 mt-3 border rounded p-2 break-words'>

              <div>
                <TextDisplay>
                  <span style={{ fontSize: 16 }}>Name</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'></span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                  <span style={{ fontSize: 16 }}>Managers Name</span>
                </TextDisplay>
              </div>


              <div className='flex flex-row items-center'>
                <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{row?.first_name} {row?.last_name}</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                  <span style={{ fontSize: 16 }}>Phone Number</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5'>{row?.phone_number}</span>
              </div>

              <div className='mt-2'>
                <TextDisplay>
                  <span style={{ fontSize: 16 }}>Email Address</span>
                </TextDisplay>
              </div>

              <div className='flex flex-row items-center'>
                <span style={{ fontSize: 16 }} className='text-black font-extrabold mr-2'>:</span>
                <span style={{ fontSize: 16 }} className='text-black font-semibold ml-5 w-10/12'>{row?.email}</span>
              </div>

            </div>
          ))}

        </Card>

      </div>
    </ModalDefault>

  )
}

export default ViewStorm
