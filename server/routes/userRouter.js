import express from "express";
import { login, signup, logout, forgotPassword, resetPassword, updatePassword, protect } from "../controllers/authController.js";
import { getMe, getUser } from "../controllers/userController.js";

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token',resetPassword);
router.patch('/updatePassword',protect, updatePassword);
router.get('/me/:id',  getMe, getUser);


export default router;
