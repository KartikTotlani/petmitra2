// backend/controllers/userController.js
import User from '../models/userModel.js'; // Assuming you have a User model for MongoDB or another DB
import Appointment from '../models/appointmentModel.js'; // Add this import at the top


// Controller to get the profile of the authenticated user
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming user id is stored in req.user.id (from auth middleware)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage, // Adjust based on your schema
        about: user.about, // Adjust based on your schema
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Controller to update the profile of the authenticated user
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, about, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, about, profileImage }, 
      { new: true } // Returns the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Book a new appointment
export const bookAppointment = async (req, res) => {
    try {
      const { doctorId, date, timeSlot, reason } = req.body;

      console.log("Booking appointment for user:", req.user.id, "with doctor:", doctorId);
    console.log("Appointment details: Date -", date, ", TimeSlot -", timeSlot);

        // Check if the slot is already booked
      const doctor = await Doctor.findById(doctorId);
    if (doctor.slots_booked.has(timeSlot)) {
      console.log("Slot already booked:", timeSlot);
      return res.status(400).json({ success: false, message: 'Slot already booked' });
    }
  
      const newAppointment = new Appointment({
        user: req.user.id,
        doctor: doctorId,  // Store the doctor ID
        date,
        time: timeSlot,    // Store the timeSlot as time
        reason,            // Store the reason if provided
      });
  
      await newAppointment.save();
  
      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        appointment: newAppointment,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error while booking appointment' });
    }
  };

// Get all appointments for the authenticated user
export const getUserAppointments = async (req, res) => {
  try {
    console.log("Fetching appointments for user:", req.user.id);

    const appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });

    /*const appointments = await Appointment.find({ user: req.user.id })
      .populate('doctor', 'name speciality') // Populate doctor details (name, specialty)
      .sort({ date: 1 });
      console.log('Appointments:', appointments);*/

    res.json({
      success: true,
      appointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error while fetching appointments' });
  }
};

// Controller to cancel an appointment
export const cancelAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      // Find the appointment by ID and make sure it belongs to the authenticated user
      const appointment = await Appointment.findOne({ _id: appointmentId, user: req.user.id });
  
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found or does not belong to user' });
      }
  
      // Update the status to 'cancelled' instead of deleting (optional based on business logic)
      appointment.status = 'cancelled';
      await appointment.save();
  
      // Send a success response
      res.json({
        success: true,
        message: 'Appointment cancelled successfully',
        appointment,
      });
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      res.status(500).json({ success: false, message: 'Server error while cancelling appointment' });
    }
  };
