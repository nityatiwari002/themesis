import { User } from "../models/userModel.js";
import { Lawyer } from "../models/lawyerModel.js";
import { Request } from "../models/requestModel.js";
import mongoose from "mongoose";
export const createRequest = async (req, res) => {
	try {
		const { userId, lawyerId, requestType } = req.body;
		const userObject = await User.findById(userId);
		const lawyerObject = await Lawyer.findById(lawyerId);
		if (!userObject || !lawyerObject) {
			return res
				.status(404)
				.json({ message: "User or lawyer not found" });
		}
		const existingRequest = await Request.findOne({
			user_id: userObject._id,
			lawyer_id: lawyerObject._id,
			request_type: requestType,
		});

		if (existingRequest) {
			return res.status(400).json({ message: "Request already exists" });
		}

		const newRequest = await Request.create({
			_id : new mongoose.Types.ObjectId(),
			user_id: userObject._id,
			lawyer_id: lawyerObject._id,
			request_type: requestType,
		});
		res.status(201).json({
			message: "Request created successfully",
		});
	} catch (error) {
		console.error("Error creating request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserRequests = async (req, res) => {
	try {
		const { userId } = req.params;
		const userRequests = await Request.find({ user_id: userId });

		if (!userRequests.length) {
			return res.status(200).json(null);
		}

		res.status(200).json(userRequests);
	} catch (error) {
		console.error("Error fetching user requests:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getLawyerRequests = async (req, res) => {
	try {
		const { lawyerId } = req.params;
		const lawyerRequests = await Request.find({ lawyer_id: lawyerId });

		if (!lawyerRequests.length) {
			return res.status(200).json(null);
		}

		res.status(200).json(lawyerRequests);
	} catch (error) {
		console.error("Error fetching lawyer requests:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const acceptRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{ accepted: true, rejected: false, pending: false },
			{ new: true }
		);
		res.status(200).json(updatedRequest);
	} catch (error) {
		console.error("Error accepting request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
export const rejectRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{ accepted: false, rejected: true, pending: false },
			{ new: true }
		);

		res.status(200).json(updatedRequest);
	} catch (error) {
		console.error("Error rejecting request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
