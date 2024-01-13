import express from "express";
import { login, signup, logout, forgotPassword, resetPassword, updatePassword, protect } from "../controllers/authController.js";

const router = express.Router();
router.post('/signUp', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token',resetPassword);
router.patch('/updatePassword',protect, updatePassword);


export default router;
