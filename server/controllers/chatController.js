import {Chat} from './../models/chatModel.js';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

export const accessChat = asyncHandler(async(req, res) => {
   const {userId} = req.body;

   if(!userId){
    console.log("userId Param not sent with request!!");
    return res.statusCode(400);
   }
   
   var isChat = await Chat.find({
    isGroupChat : false,
    $and : [
        {users : { $elemMatch : {$eq : req.user._id}}},
        {users : { $elemMatch : {$eq : userId}}},
    ], 
   }).populate("users", "-password").populate("latestMessage");

   isChat = User.populate(isChat, {
    path : "latestMessage.sender",
    select : "name image email",
   });

   if(isChat.length > 0){
     res.send(isChat[0]);
   }
   else{
    var chatData = {
        chatName : "sender",
        isGroupChat : false,
        users : [req.user._id, userId],
    };

    try{
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");

        res.status(200).json(FullChat);
    } catch(err){
        res.status(400);
        console.log("Error", err);
    }
   }
});

export const fetchChats = asyncHandler(async (req, res) => {
    try{
    const user = Chat.find({users : {$elemMatch : {$eq : req.user._id}}})
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({updatedAt : -1})
    .then(async (results) => {
        results = await User.populate(results, {
            path : "latestMessage.sender",
            select : "name image email"
        });

        res.status(200).send(results);
    })
} catch (err){
    res.status(400);
    console.log("Error", err);
}
});


export const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message : "Please Fill all the fields."});
    }
    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        return res.status(400).send({message : "More than two users are required for creating a group!!"});
    }
    users.push(req.user);

    try{
        const groupChat = await Chat.create({
            chatName : req.body.name,
            users : users,
            isGroupChat : true,
            groupAdmin : req.user,
        });

         const fullGroupChat = await Chat.findOne({_id : groupChat._id})
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

         res.status(200).json(fullGroupChat);
    }catch(err){
        console.log("Error", err);
        res.send(400);
    }
})

export const renameGroup = asyncHandler(async (req, res) => {
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,{
        chatName,
    },
    {
        new : true,
    }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");


    if(!updatedChat){
        res.status(404);
    }
    else{
        res.status(200).json(updatedChat);
    }
})

export const addToGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, {
        $push : {users : userId},

    }, {
        new : true
    })
    .populate("users", "-populate")
    .populate("groupAdmin", "-populate");

    if(!added){
        res.status(404);
    }else{
        res.status(200).json(added);
    }
})

export const removeFromGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, {
        $pull : {users : userId},

    }, {
        new : true
    })
    .populate("users", "-populate")
    .populate("groupAdmin", "-populate");

    if(!removed){
        res.status(404);
    }else{
        res.status(200).json(removed);
    }
});
