import { Lawyer } from "../models/lawyerModel.js";
import express from "express";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
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
          { name: { $regex: /${req.query.search}/, $options: 'i', } },
          { email: { $regex: req.query.search, $options: 'i', } },
        ],
      }
    : {};
  
    console.log(req.query.search);
    console.log(keyword);

  const users = await User.find(keyword);
  res.send(users);
};

//api/v1/lawyers?search=shreya
export const getAllLawyers = async (req, res, next) => {
  const lawyers = await User.find({role : "lawyer"});
  // const keyword = req.query.search
  //   ? {
  //     $and: [
  //       {$or: [
  //         { name: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } }
  //       ]},
  //       {role : "lawyer"}
  //     ]
  //     }
  //   : { };

  // const lawyers = await User.find(keyword);
  res.send(lawyers);
};



export const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    res.send("You are not allowed to change the password without validation!!");
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "username",
    "image"
  );

  //3. Update User document.
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      User: updatedUser,
    },
  });
};

	

export const updtateProfileImage = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const img = url + "/public/" + req.file.filename;

  req.body.image = img;

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "username",
    "image"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      User: updatedUser,
    },
  });
};
