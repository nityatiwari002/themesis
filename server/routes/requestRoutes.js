import express from "express";
import { createRequest, getUserRequests, getLawyerRequests, acceptRequest, rejectRequest } from "../controllers/requestController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();
router.post('/createRequest', createRequest);
router.get('/userRequests/:userId', getUserRequests);
router.get('/lawyerRequests/:lawyerId', getLawyerRequests);
router.patch('/acceptRequest/:requestId', acceptRequest);
router.patch('/rejectRequest/:requestId', rejectRequest);

export default router;
