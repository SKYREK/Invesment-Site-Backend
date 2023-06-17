import express from 'express'

import { activatePlan, createBoughtPlan, getBoughtPlansAdmin, getBoughtPlansCustomer} from "../controllers/boughtPlanController.js";

const boughtPlanRouter = express.Router()

boughtPlanRouter.post("/",createBoughtPlan)
boughtPlanRouter.put("activate",activatePlan)
boughtPlanRouter.get("/",getBoughtPlansCustomer)
boughtPlanRouter.get("/admin",getBoughtPlansAdmin)

export default boughtPlanRouter
