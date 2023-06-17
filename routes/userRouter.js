import express from 'express'
import { activateUser, createUser, deactivateUser, getCurrentUser, getWithdrawablebalance, logUser, requestEmailCode, verifyEmail } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",logUser)
userRouter.get("/",getCurrentUser)
userRouter.put("/activate",activateUser)
userRouter.put("/deactivate",deactivateUser)
userRouter.post("/emailcode",requestEmailCode)
userRouter.post("/emailVerify",verifyEmail)
userRouter.get("/balance",getWithdrawablebalance)

export default userRouter
