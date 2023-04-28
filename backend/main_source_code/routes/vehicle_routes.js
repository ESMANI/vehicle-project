import Express from 'express'
const vehicleRouter = Express.Router()

import {
   vehicleTypeFetch,
   vehicleModelFetch,
   vehicleBooking,
} from '../controllers/vehicle_controllers.js'

vehicleRouter.route('/type/fetch').post(vehicleTypeFetch)

vehicleRouter.route('/model/fetch').post(vehicleModelFetch)

vehicleRouter.route('/booking').post(vehicleBooking)

export default vehicleRouter
