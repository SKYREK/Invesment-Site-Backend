import express from 'express';
import { approveWithdrawRequest, createWithdrawRequest, getWithdrawRequestsAsAdmin, getWithdrawRequestsAsCustomer, getWithdrawelsAsAdmin, getWithdrawelsAsCustomer, rejectWithdrawRequest } from '../controllers/withdrawController.js';

const withdrawRouter = express.Router();

withdrawRouter.post("/request",createWithdrawRequest)
withdrawRouter.get("/request",getWithdrawRequestsAsCustomer)
withdrawRouter.get("/request/admin",getWithdrawRequestsAsAdmin)
withdrawRouter.get("/withdrawels",getWithdrawelsAsCustomer)
withdrawRouter.get("/withdrawels/admin",getWithdrawelsAsAdmin)
withdrawRouter.put("request/approve",approveWithdrawRequest)
withdrawRouter.put("request/reject",rejectWithdrawRequest)

export default withdrawRouter;