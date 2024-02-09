import express from 'express';
import { protect } from '../controllers/authController.js';
import { addToDiscord, hasAccessToDiscord, getMessages, sendMessage} from '../controllers/discordController.js';

const router = express.Router();

// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);
router.route("/add/:userId").put(protect, addToDiscord);
router.route("/hasAccess/:userId").get(protect, hasAccessToDiscord);
router.route("/getMessages").get(protect, getMessages);
router.route("/sendMessage").post(protect, sendMessage);

export default router;
