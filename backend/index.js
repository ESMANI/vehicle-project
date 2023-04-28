import DotEnv from 'dotenv'
import Express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http'

DotEnv.config({ path: './config.env' })

mongoose.set('strictQuery', false)
mongoose.connect(process.env.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

const app = Express()

app.use(cors())
app.use(Express.json({ limit: '10mb' }))

const server = http.createServer(app)
const port = process.env.port || 5000
server.listen(port, () => console.log(`Server running on port ${port}`))
process.on('unhandledRejection', (err, promise) => {
   console.log(`Logged Error: ${err.message}`)
   server.close(() => process.exit(1))
})

app.get('/', (req, res, next) => {
   res.send('Api running')
})

import vehicleRouter from './main_source_code/routes/vehicle_routes.js'

app.use('/vehicle', vehicleRouter)

app.get('*', (req, res, next) => {
   res.send('no path directory')
})
