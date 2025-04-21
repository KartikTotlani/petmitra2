import express from 'express';
import doctorModel from '../models/doctorModel.js';

const doctorRouter = express.Router();

// GET all available doctors
doctorRouter.get('/', async (req, res) => {
  try {
    const doctors = await doctorModel.find({ available: true }).sort({ date: -1 });
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET doctor by ID
doctorRouter.get('/:id', async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PATCH - update doctor availability (optional)
doctorRouter.patch('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );
    res.json({ success: true, data: updatedDoctor });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default doctorRouter;
