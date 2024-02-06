import { Lawyer } from "../models/lawyerModel.js";
import { User } from "../models/userModel.js";

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
	  if (allowedFields.includes(el)) {
		newObj[el] = obj[el];
	  }
	});
	return newObj;
  };

export const getMe = (req, res, next) => {
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

export const updateMe = async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
	   res.send("You are not allowed to change the password without validation!!");
	}
	console.log(req.body);
  
	const filteredBody = filterObj(req.body, 'name', 'email', 'username', 'image');
  
	//3. Update User document.
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
	  new: true,
	  runValidators: true,
	});
      
	res.status(200).json({
	  status: 'success',
	  data: {
		User: updatedUser,
	  },
	});
  };
  