// backend/routes/userRoute.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js'

const userprofileRouter = express.Router();

// Route to fetch the user's profile
userprofileRouter.get('/profile', authUser, getUserProfile);

// Route to update the user's profile
userprofileRouter.put('/profile', authUser, updateUserProfile);


export default userprofileRouter;
