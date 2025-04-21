import express from 'express';
import { bookAppointment, getUserAppointments, getUserProfile, updateUserProfile, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();
userRouter.route('/appointments')
  .post(authUser, bookAppointment)
  .get(authUser, getUserAppointments);

userRouter.delete('/appointments/:id', authUser, cancelAppointment);


userRouter.route('/profile')
  .get(authUser, getUserProfile)
  .put(authUser, updateUserProfile);

export default userRouter;
