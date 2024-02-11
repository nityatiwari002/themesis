import mongoose from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "User"
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },
    // references: { type: [mongoose.Schema.Types.ObjectId], refPath: 'model_type' },
    // model_type: {  type: String, enum: ['User', 'Lawyer'], required: true }
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatModel);
