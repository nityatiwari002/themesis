import { User } from "../models/userModel.js";

export const getMe = (req, res, next) => {
    req.params.id = "65a21a3b524058ab467f4d7d";
    // req.params.id = req.user.id;
    next();
};

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.send("Ho jaaega bhai!!");


    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //       Data : user
    //     }
    //   });

};