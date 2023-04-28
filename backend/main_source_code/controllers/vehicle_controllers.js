import Vehicle from '../models/vehicle.js'

export const vehicleTypeFetch = async (req, res, next) => {
   try {
      const bodyData = req.body

      const vehicle = await Vehicle.find({
         vehicleType:
            bodyData.numberOfWheels === '2'
               ? 'BIKE'
               : bodyData.numberOfWheels === '4'
               ? 'CAR'
               : '',
      }).select('category')
      if (!vehicle) {
         return next({ message: 'vehicle find error' })
      }

      const arr = []

      for (const data of vehicle) {
         if (!arr.includes(data.category)) arr.push(data.category)
      }

      return res.status(200).json({
         success: true,
         data: { vehicle: arr },
      })
   } catch (err) {
      return next(err)
   }
}

export const vehicleModelFetch = async (req, res, next) => {
   try {
      const bodyData = req.body

      const vehicle = await Vehicle.find({
         category: bodyData.vehTypeValue,
      }).select('model')
      if (!vehicle) {
         return next({ message: 'vehicle find error' })
      }

      return res.status(200).json({
         success: true,
         data: { vehicle },
      })
   } catch (err) {
      return next(err)
   }
}

export const vehicleBooking = async (req, res, next) => {
   try {
      const bodyData = req.body

      const vehicle = await Vehicle.findOneAndUpdate(
         {
            category: bodyData.vehTypeValue,
            model: bodyData.vehModelValue,
            $or: [{ isBooked: { $exists: false } }, { isBooked: false }],
         },
         {
            $set: {
               isBooked: true,
            },
         },
         {
            new: true,
         }
      )

      return vehicle
         ? res.status(200).json({
              success: true,
              data: {
                 name: `${bodyData.firstName} ${bodyData.lastName}`,
                 numberOfWheels: bodyData.numberOfWheels,
                 vehicleType: bodyData.vehTypeValue,
                 vehicleModel: bodyData.vehModelValue,
                 startDate: bodyData.bookingDate[0],
                 endDate: bodyData.bookingDate[1],
                 year: vehicle.year,
                 make: vehicle.make,
              },
           })
         : res.status(200).json({
              success: false,
              data: {
                 message: 'ALREADY_BOOKED',
                 vehicleType: bodyData.vehTypeValue,
                 vehicleModel: bodyData.vehModelValue,
              },
           })
   } catch (err) {
      return next(err)
   }
}
