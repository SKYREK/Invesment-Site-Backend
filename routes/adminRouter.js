import mongoose from "../DB/conn.js";
import express from 'express'
import { changePassword, createAdmin, getLoggedAdmin, logAdmin, startAdministration } from "../controllers/adminController.js";
const adminRouter = express.Router()

adminRouter.get('/start',startAdministration)
adminRouter.post("/",logAdmin)
adminRouter.post("/create",createAdmin)
adminRouter.get("/",getLoggedAdmin)
adminRouter.put("/password",changePassword)

export default adminRouter