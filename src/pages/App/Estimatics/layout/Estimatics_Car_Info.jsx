import React, { useState} from 'react'

import ModalDefault from '../../../../component/Modal/ModalDefault'
import Card from "../../../../component/Card/Card"
import Bold from "../../../../component/Typography/Bold";
import TextDisplay from '../../../../component/Typography/TextDisplay';

import { BsFillImageFill, BsChevronRight } from "react-icons/bs";

import { EstimaticsImg } from '../../../../contants';

const carDetails = [
    { id : 1 , name : 'LEFT FENDER'},
    { id : 2 , name : 'RIGHT FENDER'},
    { id : 3 , name : 'HOOD'},
    { id : 4 , name : 'LEFT FRONT DOOR'},
    { id : 5 , name : 'RIGHT FRONT DOOR'},
    { id : 6 , name : 'WINDSHEILD'},
    { id : 7 , name : 'LEFT RAIL'},
    { id : 8 , name : 'RIGHT RAIL'},
    { id : 9 , name : 'ROOF'},
    { id : 10 , name : 'LEFT REAR DOOR'},
    { id : 11 , name : 'RIGHT REAR DOOR'},
    { id : 12 , name : 'LEFT FUEL DOOR'},
    { id : 13 , name : 'RIGHT FUEL DOOR'},
    { id : 14 , name : 'LEFT QUARTER'},
    { id : 15 , name : 'RIGHT QUARTER'},
    { id : 16 , name : 'REAR'},
]

const carOtherDetails = [
    { id : 1 , name : 'LEFT FENDER'},
    { id : 2 , name : 'RIGHT FENDER'},
    { id : 3 , name : 'HOOD'},
    { id : 4 , name : 'RIGHT FRONT DOOR'},
    { id : 5 , name : 'WINDSHEILD'},
    { id : 6 , name : 'LEFT RAIL'},
    { id : 7 , name : 'RIGHT RAIL'},
    { id : 8 , name : 'ROOF'},
    { id : 9 , name : 'LEFT REAR DOOR'},
    { id : 10 , name : 'RIGHT REAR DOOR'},
]

const Estimatics_Car_Info = () => {

    const [ customerModal , setCustomerModal ] = useState(false);


  return (
    <div>
        
    <ModalDefault 
        title={"Attachments"}
        toggle={customerModal}
        setToggle={setCustomerModal}
        // size={ 'w-3/6 h-full'}
    >

        <div className='px-4'>

            <Card props={'bg-white flex flex-col'}> 

                <span style={{ fontSize:18}} className='text-black'><Bold>Full Vehicle view by panel</Bold></span>

                <div className='w-full flex flex-row flex-wrap items-center mt-2'>

                    { carDetails.map ( item => (

                        <div style={{ height : '190px', width : '212.8px' }} className='flex flex-col justify-center items-center'>
                            <img src={EstimaticsImg.CARSIX} alt='icon'/>
                            <div className='bg-gray-800 flex flex-col items-center' style={{width : '194.2px'}}>
                                <TextDisplay><span style={{ fontSize:18}} className='text-white'>{item.name}</span></TextDisplay>
                            </div>
                        </div>

                    ))}
    
                </div>

            </Card>

            <br/>

            <Card props={'bg-white flex flex-col'}> 

                <span style={{ fontSize:18}} className='text-black'><Bold>Other Photos (10)</Bold></span>

                <div className='w-full flex flex-row flex-wrap items-center mt-2'>

                    { carOtherDetails.map ( item => (

                        <div style={{ height : '190px', width : '212.8px' }} className='flex flex-col justify-center items-center'>
                            <img src={EstimaticsImg.CARSIX} alt='icon'/>
                        </div>

                    ))}

                </div>

            </Card>

        </div>

    </ModalDefault>
    
    
    <div className='grid grid-rows-1 grid-cols-1 min-[1420px]:grid-cols-2 gap-5' >


        <Card props={'bg-white flex flex-col gap-5'}> 

            <TextDisplay><span style={{ fontSize:18}} className='text-regularGrey'>Attachments</span></TextDisplay>

            <div className='flex flex-row w-full gap-2 items-center'>
                <span style={{ fontSize:22}} className='text-mainText'><BsFillImageFill/></span>
                <span style={{ fontSize:30}} className='text-mainText mt-0.5'><Bold>35</Bold></span>
            </div>

            <div className='w-full flex flex-row items-center justify-between'>

                <img src={EstimaticsImg.CARONE} alt='icon'/>
                <img src={EstimaticsImg.CARTWO} alt='icon'/>
                <img src={EstimaticsImg.CARTHREE} alt='icon'/>
                <img src={EstimaticsImg.CARFOUR} alt='icon'/>
                <img src={EstimaticsImg.CARFIVE} alt='icon'/>

                <div className='flex flex-col justify-center items-center cursor-pointer' onClick={ () => setCustomerModal(true) }>

                    <div className='flex flex-row w-full gap-2 items-center'>
                        <TextDisplay><span style={{ fontSize:12}} className='text-secondaryText'>See More</span></TextDisplay>
                        <span style={{ fontSize:12}} className='text-secondaryText'> <BsChevronRight/> </span>
                        
                    </div>

                </div>

            </div>

        </Card>

        <Card props={'bg-white flex flex-col gap-5'}> 

            <TextDisplay><span style={{ fontSize:18}} className='text-regularGrey'>Appraisal Assignment</span></TextDisplay>
            <span style={{ fontSize:30}} className='text-mainText mt-0.5'><Bold>$25,369.90</Bold></span>

        </Card>

        </div>
      
    </div>
  )
}

export default Estimatics_Car_Info
