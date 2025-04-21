import express from 'express'
import {
  addDoctor,
  loginAdmin,
  getDoctors,
  deleteDoctor,
  addUser,
  getAllUsers,
  deleteUser,
  addNgo,
  getAllNgos,
  deleteNgo,
} from '../controllers/adminController.js'
import Appointment from '../models/appointmentModel.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

// Admin login
adminRouter.post('/login', loginAdmin)

// Doctor routes
adminRouter.post('/add-doctor', upload.single('image'), authAdmin, addDoctor)
adminRouter.get('/get-doctors', authAdmin, getDoctors)
adminRouter.delete('/delete-doctor/:id', authAdmin, deleteDoctor)

// NGO routes
adminRouter.post('/add-ngo', upload.single('image'), authAdmin, addNgo)
adminRouter.get('/get-ngos', authAdmin, getAllNgos)
adminRouter.delete('/delete-ngo/:id', authAdmin, deleteNgo)

// User routes
adminRouter.post('/add-user', upload.single('image'), authAdmin, addUser)
adminRouter.get('/get-users', authAdmin, getAllUsers)
adminRouter.delete('/delete-user/:id', authAdmin, deleteUser)

// Appointments route
adminRouter.get('/get-appointments', authAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('user', 'name email')
      .populate('doctor', 'name specialty')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: appointments,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

export default adminRouter
