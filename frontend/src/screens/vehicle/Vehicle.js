import { Input, Button, Radio, RadioGroup, DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import LoaderComponent from '../loaderComponent/LoaderComponent'

const Vehicle = () => {
   const apiUrl = process.env.REACT_APP_BACK_END_API

   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [numberOfWheels, setNumberOfWheels] = useState('')
   const [errMes, setErrMes] = useState({})
   const [screen, setScreen] = useState('NAME')
   const [vehType, setVehType] = useState([])
   const [vehTypeValue, setVehTypeValue] = useState('')
   const [vehModel, setVehModel] = useState([])
   const [vehModelValue, setVehModelValue] = useState('')
   const [bookingDate, setBookingDate] = useState([])
   const [userVehData, setUserVehData] = useState({})

   const nameValidation = () => {
      let valid = true

      if (!firstName.trim()) {
         errMes.firstName = 'please fill the first name'
         valid = false
      }
      if (!lastName.trim()) {
         errMes.lastName = 'please fill the last name'
         valid = false
      }

      setErrMes({ ...errMes })

      if (valid) setScreen('WHEELS')
   }

   const vehicleTypeFetch = async () => {
      LoaderComponent(true)
      try {
         const result = await axios.post(`${apiUrl}/vehicle/type/fetch`, {
            numberOfWheels,
         })

         if (result.data.success) {
            const resultData = result.data.data
            setVehType(resultData?.vehicle ? resultData.vehicle : [])
            setScreen('VEHICLE')
         }
      } catch (err) {
         console.error(err)
      }
      LoaderComponent(false)
   }

   const vehicleModelFetch = async () => {
      LoaderComponent(true)
      try {
         const result = await axios.post(`${apiUrl}/vehicle/model/fetch`, {
            vehTypeValue,
         })

         if (result.data.success) {
            const resultData = result.data.data
            setVehModel(resultData?.vehicle ? resultData.vehicle : [])
            setScreen('MODEL')
         }
      } catch (err) {
         console.error(err)
      }
      LoaderComponent(false)
   }

   const vehicleBooking = async () => {
      LoaderComponent(true)
      try {
         const result = await axios.post(`${apiUrl}/vehicle/booking`, {
            firstName,
            lastName,
            numberOfWheels,
            vehTypeValue,
            vehModelValue,
            bookingDate,
         })

         const resultData = result.data.data
         setUserVehData(resultData ? resultData : {})
         setScreen('USER_VEH_INFO')
      } catch (err) {
         console.error(err)
      }
      LoaderComponent(false)
   }

   return (
      <div className='flex items-center justify-center fixed p-0 m-0 top-0 left-0 w-full h-full bg-neutral-200'>
         {screen === 'NAME' && (
            <div className='w-full max-w-xs'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  What's your name?
               </label>
               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='mb-4'>
                     <label className='block text-gray-700 text-sm font-bold mb-2'>
                        First Name
                     </label>
                     <Input
                        value={firstName}
                        onChange={(value) => {
                           setFirstName(value)
                           errMes.firstName = value.trim()
                              ? ''
                              : 'please fill the first name'
                           setErrMes({ ...errMes })
                        }}
                        onBlur={() => {
                           errMes.firstName = firstName.trim()
                              ? ''
                              : 'please fill the first name'
                           setErrMes({ ...errMes })
                        }}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                     />
                     <label className='text-red-500 text-sm'>
                        {errMes.firstName ? errMes.firstName : ''}
                     </label>
                  </div>

                  <div className='mb-6'>
                     <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Last Name
                     </label>
                     <Input
                        value={lastName}
                        onChange={(value) => {
                           setLastName(value)
                           errMes.lastName = value.trim()
                              ? ''
                              : 'please fill the last name'
                           setErrMes({ ...errMes })
                        }}
                        onBlur={() => {
                           errMes.lastName = lastName.trim()
                              ? ''
                              : 'please fill the last name'
                           setErrMes({ ...errMes })
                        }}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                     />
                     <label className='text-red-500 text-sm'>
                        {errMes.lastName ? errMes.lastName : ''}
                     </label>
                  </div>
                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => nameValidation()}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Next
                     </Button>
                  </div>
               </div>
            </div>
         )}

         {screen === 'WHEELS' && (
            <div className='w-full max-w-xs'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  Number of wheels?
               </label>
               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='flex items-center justify-center'>
                     <RadioGroup name='radioList'>
                        <Radio
                           value='2'
                           onChange={() => {
                              setNumberOfWheels('2')
                              errMes.numberOfWheels = ''
                              setErrMes({ ...errMes })
                           }}>
                           2
                        </Radio>
                        <Radio
                           value='4'
                           onChange={() => {
                              setNumberOfWheels('4')
                              errMes.numberOfWheels = ''
                              setErrMes({ ...errMes })
                           }}>
                           4
                        </Radio>
                     </RadioGroup>
                  </div>

                  <div className='flex items-center justify-center mb-2'>
                     <label className='text-red-500 text-sm'>
                        {errMes.numberOfWheels ? errMes.numberOfWheels : ''}
                     </label>
                  </div>
                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => {
                           if (numberOfWheels) {
                              vehicleTypeFetch()
                           } else {
                              errMes.numberOfWheels =
                                 'please select number of wheels'
                              setErrMes({ ...errMes })
                           }
                        }}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Next
                     </Button>
                  </div>
               </div>
            </div>
         )}

         {screen === 'VEHICLE' && (
            <div className='w-full max-w-xs'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  Type of vehicle?
               </label>
               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='flex items-center justify-center'>
                     <RadioGroup name='radioList1'>
                        {vehType.map((data, index) => {
                           return (
                              <Radio
                                 key={index}
                                 value={data}
                                 onChange={() => {
                                    setVehTypeValue(data)
                                    errMes.vehTypeValue = ''
                                    setErrMes({ ...errMes })
                                 }}>
                                 {data}
                              </Radio>
                           )
                        })}
                     </RadioGroup>
                  </div>

                  <div className='flex items-center justify-center mb-2'>
                     <label className='text-red-500 text-sm'>
                        {errMes.vehTypeValue ? errMes.vehTypeValue : ''}
                     </label>
                  </div>
                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => {
                           if (vehTypeValue) {
                              vehicleModelFetch()
                           } else {
                              errMes.vehTypeValue = 'please select vehicle type'
                              setErrMes({ ...errMes })
                           }
                        }}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Next
                     </Button>
                  </div>
               </div>
            </div>
         )}

         {screen === 'MODEL' && (
            <div className='w-full max-w-xs'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  Specific model?
               </label>
               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='flex items-center justify-center'>
                     <RadioGroup name='radioList2'>
                        {vehModel.map((data, index) => {
                           return (
                              <Radio
                                 key={index}
                                 value={data.model}
                                 onChange={() => {
                                    setVehModelValue(data.model)
                                    errMes.vehModelValue = ''
                                    setErrMes({ ...errMes })
                                 }}>
                                 {data.model}
                              </Radio>
                           )
                        })}
                     </RadioGroup>
                  </div>

                  <div className='flex items-center justify-center mb-2'>
                     <label className='text-red-500 text-sm'>
                        {errMes.vehModelValue ? errMes.vehModelValue : ''}
                     </label>
                  </div>

                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => {
                           if (vehModelValue) {
                              setScreen('PICKER')
                           } else {
                              errMes.vehModelValue =
                                 'please select vehicle model'
                              setErrMes({ ...errMes })
                           }
                        }}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Next
                     </Button>
                  </div>
               </div>
            </div>
         )}

         {screen === 'PICKER' && (
            <div className='w-full max-w-xs'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  Booking date?
               </label>

               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='flex items-center justify-center'>
                     <DateRangePicker
                        onChange={(value) => {
                           setBookingDate(value ? value : [])
                           errMes.bookingDate =
                              !value || value.length === 0
                                 ? 'please select booking date'
                                 : ''
                           setErrMes({ ...errMes })
                        }}
                        onExited={() => {
                           errMes.bookingDate =
                              bookingDate.length === 0
                                 ? 'please select booking date'
                                 : ''
                           setErrMes({ ...errMes })
                        }}
                        character=' to '
                        value={bookingDate}
                     />
                  </div>

                  <div className='flex items-center justify-center mb-2'>
                     <label className='text-red-500 text-sm'>
                        {errMes.bookingDate ? errMes.bookingDate : ''}
                     </label>
                  </div>

                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => {
                           if (bookingDate.length === 0) {
                              errMes.bookingDate = 'please select booking date'
                              setErrMes({ ...errMes })
                           } else {
                              vehicleBooking()
                           }
                        }}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Submit
                     </Button>
                  </div>
               </div>
            </div>
         )}

         {screen === 'USER_VEH_INFO' && (
            <div className='w-full max-w-sm'>
               <label className='text-center block text-gray-700 text-xl font-bold mb-2'>
                  Booking details
               </label>

               <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                  <div className='flex items-center justify-center'>
                     {userVehData.message === 'ALREADY_BOOKED' ? (
                        <div className='flex items-center justify-center mb-2'>
                           <label className='text-red-500 text-sm'>
                              {`${userVehData.vehicleType} ${userVehData.vehicleModel} is already booked`}
                           </label>
                        </div>
                     ) : (
                        <div className='w-full mb-4'>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 User name
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.name}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Number of wheels
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.numberOfWheels}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Vehicle type
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.vehicleType}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Vehicle model
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.vehicleModel}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Booking date
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {`${moment(userVehData.startDate).format(
                                    'YYYY-MM-DD'
                                 )} to ${moment(userVehData.endDate).format(
                                    'YYYY-MM-DD'
                                 )}`}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Year
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.year}
                              </label>
                           </div>
                           <div className='flex items-center justify-between mb-2'>
                              <label className='text-gray-900 text-sm'>
                                 Make
                              </label>
                              <label className='text-gray-500 text-sm'>
                                 {userVehData.make}
                              </label>
                           </div>
                        </div>
                     )}
                  </div>
                  <div className='flex items-center justify-center'>
                     <Button
                        onClick={() => {
                           setFirstName('')
                           setLastName('')
                           setNumberOfWheels('')
                           setErrMes({})
                           setScreen('NAME')
                           setVehType([])
                           setVehTypeValue('')
                           setVehModel([])
                           setVehModelValue('')
                           setBookingDate([])
                           setUserVehData({})
                        }}
                        classPrefix=''
                        ripple={false}
                        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'>
                        Submit New Form
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Vehicle
