import express from "express";
import crypto from "crypto";
import { User } from "../models/userModel.js";

import {
	login,
	signup,
	logout,
	forgotPassword,
	resetPasswordGet,
	updatePassword,
	protect,
} from "../controllers/authController.js";

import {
	getMe,
	getUser,
	getAllUsers,
	getAllLawyers,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPasswordGet/:token", resetPasswordGet);
router.post("/protect", protect);
router.get("/getUsers", getAllUsers);
router.get("/getLawyers", getAllLawyers);
router.get("/getUser/:id", getUser);

router.post("/resetPasswordGet/:token", async (req, res) => {
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		PasswordResetTokenExpires: { $gt: Date.now() },
	});

	if (!user) {
		res.send("Token is Invalid or has expired.");
		// return next(new AppError('Token is invalid or has expired', 400));
	}
	console.log(user);
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user
	// 4) Log the user in, send JWT
	const loginLink = "http://localhost:3000/login";
	res.render("pages/loginRedirection");
	// createSendToken(user, 200, res);
});

router.patch("/updatePassword", protect, updatePassword);
router.get("/me/:id", getMe, getUser);

export default router;
