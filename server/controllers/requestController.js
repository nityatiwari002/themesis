import { User } from "../models/userModel.js";
import { Lawyer } from "../models/lawyerModel.js";
import { Request } from "../models/requestModel.js";
import mongoose from "mongoose";
export const createRequest = async (req, res) => {
  const { userId, lawyerId, requestType } = req.body;
  try{
  if (!userId || !lawyerId) {
    return res.status(404).json({ message: "Please Enter all the required details!!" });
  }

  const userObject = await User.findById(userId);
  const lawyerObject = await Lawyer.findById(lawyerId);

  if(!lawyerObject){
	res.status(400).json("The User you want to send request to, no longer exists!!");
  }


  const isRequest = await Request.findOne({
			user_id: userObject._id,
			lawyer_id: lawyerObject._id,
			request_type: requestType,
		});


  if (!isRequest) {
    var requestData = {
      user_id: userId,
      lawyer_id: lawyerId,
      request_type: requestType,
    };

    try {
      const createdRequest = await Request.create(requestData);
	  const FullRequest = await Request.findOne({_id : createdRequest._id}).populate("user_id", "-password").populate("lawyer_id", "-password");


      res.status(200).json({
		status : "success",
		message : "Request made successfully!!",
		newRequest : {
			FullRequest,
		}
	  });
    }
	 catch (err) {
      res.status(400);
      console.log("Error", err);
    }
  } 
  else {
    return res.status(400).json({ message: "You have already made a request to this user....Please wait untill the user approves!!" });
  }
} 
catch (error) {
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
