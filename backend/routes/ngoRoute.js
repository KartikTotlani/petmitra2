import express from 'express';
import ngoModel from '../models/ngoModel.js';
import upload from '../middlewares/multer.js'; // Assuming you're using multer for image upload

const ngoRouter = express.Router();

// POST - Add new NGO
ngoRouter.post('/add-ngo', upload.single('image'), async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ success: false, message: "NGO image is required" });
    }

    const ngo = await ngoModel.create({
      name,
      email,
      password,
      image,
      address: JSON.parse(address), // assuming frontend sends address as JSON string
      phone,
    });

    res.status(201).json({ success: true, data: ngo });
  } catch (error) {
    console.error("Error adding NGO:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET - All NGOs
ngoRouter.get('/get-ngos', async (req, res) => {
  try {
    const ngos = await ngoModel.find({});
    res.status(200).json({ success: true, data: ngos });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE - Delete NGO by ID
ngoRouter.delete('/delete-ngo/:id', async (req, res) => {
  try {
    const deletedNgo = await ngoModel.findByIdAndDelete(req.params.id);
    if (!deletedNgo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }
    res.status(200).json({ success: true, message: "NGO deleted successfully" });
  } catch (error) {
    console.error("Error deleting NGO:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default ngoRouter;
