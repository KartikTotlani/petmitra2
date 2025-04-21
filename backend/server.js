import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import { addDoctor } from './controllers/adminController.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import ngoRouter from './routes/ngoRoute.js'
import authRouter from './routes/authRoute.js'
import userprofileRouter from './routes/userprofileRoute.js'
import userRouter from './routes/userRoute.js'



//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-doctor
app.use('/api/doctors', doctorRouter);    // Doctor Routes
app.use('/api/ngos', ngoRouter);          // NGO Routes
app.use('/api', authRouter)
app.use('/api/user', userprofileRouter);
app.use('/api/user', userRouter);  

app.get('/',(req,res) =>{
    res.send("API WORKING")
})

app.listen(port, () => console.log("Server Started", port))