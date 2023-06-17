import express from 'express'
import { activatePlan, createPlan, deactivatePlan, deletePlan, editPlan, getAllPlans, getPlans } from '../controllers/planController.js'

const planRouter = express.Router()

planRouter.post("/",createPlan)
planRouter.get("/",getPlans)
planRouter.get("/all",getAllPlans)
planRouter.put("/activate/:id",activatePlan)
planRouter.put("/deactivate/:id",deactivatePlan)
planRouter.delete("/:id",deletePlan)
planRouter.put("/:id",editPlan)

export default planRouter