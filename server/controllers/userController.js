import { Lawyer } from "../models/lawyerModel.js";
import { User } from "../models/userModel.js";

export const getMe = (req, res, next) => {
	// req.params.id = "65a21a3b524058ab467f4d7d";
	req.params.id = req.user.id;
	next();
};

export const getUser = async (req, res, next) => {
	const user = await User.findById(req.params.id);
	res.send(user);
};

//api/v1/users?search=shreya
export const getAllUsers = async (req, res, next) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {};

	const users = await User.find(keyword);
	res.send(users);
};

export const getAllLawyers = async (req, res, next) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {};

	const lawyers = await Lawyer.find(keyword);
	res.send(lawyers);
};
