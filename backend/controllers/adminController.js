import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import ngoModel from '../models/ngoModel.js'
import userModel from '../models/userModel.js'


//api for adding doctor

const addDoctor = async (req,res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        console.log("---- Incoming Request to /api/admin/add-doctor ----");
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("Headers:", req.headers);

        //chking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        //validating strong passw
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //Null Check img for Safety
        if (!imageFile) {
            return res.json({ success: false, message: "Please upload an image" });
          }

        //hashing doctor passw
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url 
        console.log("Image uploaded to Cloudinary:", imageUrl);

        const doctorData = {
            name, 
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            fees,
            address:JSON.parse(address),
            experience,
            about,
            date:Date.now(),
        }
        console.log("Final doctor data to be saved:", doctorData);


        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api for admin login 

const loginAdmin = async (req,res) => {
    try {

        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}


// ============ Get All Doctors ============
const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find().sort({ date: -1 })
        res.json({ success: true, data: doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ============ Delete Doctor ============
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params
        await doctorModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Doctor deleted" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ================= Add NGO =================
const addNgo = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body
    const imageFile = req.file

    // Validation
    if (!name || !email || !password || !address) {
      return res.json({ success: false, message: "Missing Details" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a stronger password" })
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Please upload an NGO logo" })
    }

    // Check duplicate NGO
    const existing = await ngoModel.findOne({ email })
    if (existing) {
      return res.json({ success: false, message: "NGO already exists with this email" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    })

    const imageUrl = imageUpload.secure_url

    const newNgo = new ngoModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      address: JSON.parse(address),
      phone: phone || "0000000000"
    })

    await newNgo.save()

    res.json({ success: true, message: "NGO Added Successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ================= Get All NGOs =================
const getAllNgos = async (req, res) => {
  try {
    const ngos = await ngoModel.find().sort({ _id: -1 })
    res.json({ success: true, data: ngos })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ================= Delete NGO =================
const deleteNgo = async (req, res) => {
  try {
    const { id } = req.params
    await ngoModel.findByIdAndDelete(id)
    res.json({ success: true, message: "NGO deleted" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// ================= Add User =================
const addUser = async (req, res) => {
    try {
      const { name, email, password, address, phone, gender, dob } = req.body
      const imageFile = req.file
  
      // Validation
      if (!name || !email || !password || !address) {
        return res.json({ success: false, message: "Missing Details" })
      }
  
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" })
      }
  
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a stronger password" })
      }
  
      if (!imageFile) {
        return res.json({ success: false, message: "Please upload an NGO logo" })
      }
  
      // Check duplicate User
      const existing = await userModel.findOne({ email })
      if (existing) {
        return res.json({ success: false, message: "User already exists with this email" })
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      })
  
      const imageUrl = imageUpload.secure_url
  
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        image: imageUrl,
        address: JSON.parse(address),
        phone: phone || "0000000000",
        gender: gender || "Not Selected",
        dob: dob || "Not Selected"
      })
  
      await newUser.save()
  
      res.json({ success: true, message: "User Added Successfully" })
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }
  
  // ================= Get All Users =================
  const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find().sort({ _id: -1 })
      res.json({ success: true, data: users })
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }
  
  // ================= Delete User =================
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params
      await userModel.findByIdAndDelete(id)
      res.json({ success: true, message: "User deleted" })
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }
  
export {
  addDoctor,
  loginAdmin,
  getDoctors,
  deleteDoctor,
  // NGO controllers
  addNgo,
  getAllNgos,
  deleteNgo,
  // NGO controllers
  addUser,
  getAllUsers,
  deleteUser
}

