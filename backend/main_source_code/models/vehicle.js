import mongoose from 'mongoose'

const VehicleSchema = new mongoose.Schema({
   year: Number,
   make: String,
   model: String,
   category: String,
   vehicleType: String,
   isBooked: Boolean,
})

const Vehicle = mongoose.model('Vehicle', VehicleSchema, 'vehicle')

export default Vehicle
