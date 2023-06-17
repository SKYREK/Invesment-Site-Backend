import mongoose from "../DB/conn.js";
import boughtPlanSchema from "../models/boughtPlan.js"
import { planModel } from "./planController.js";
export const boughtPlanModel = mongoose.model('boughtPlan', boughtPlanSchema)

export function getEndDate(duration, durationType) {
    const today = new Date(); // Get today's date
  
    // Convert the duration to milliseconds
    let durationInMs;
    switch (durationType) {
      case "days":
        durationInMs = duration * 24 * 60 * 60 * 1000;
        break;
      case "weeks":
        durationInMs = duration * 7 * 24 * 60 * 60 * 1000;
        break;
      case "months":
        durationInMs = duration * 30 * 24 * 60 * 60 * 1000;
        break;
      case "years":
        durationInMs = duration * 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        throw new Error("Invalid duration type");
    }
  
    const endDate = new Date(today.getTime() + durationInMs); // Calculate the future date
  
    return endDate;
}
export function calculateProfit(frequency, frequencyType, profit, startDate,endDate) {
    const today = new Date(); // Get today's date
    if(endDate<today){
        today = endDate
    }
    // Calculate the duration between today and the startDate
    const durationInMs = today - startDate;
  
    // Convert the duration to the specified frequency type
    let frequencyInMs;
    switch (frequencyType) {
      case "days":
        frequencyInMs = frequency * 24 * 60 * 60 * 1000;
        break;
      case "weeks":
        frequencyInMs = frequency * 7 * 24 * 60 * 60 * 1000;
        break;
      case "months":
        frequencyInMs = frequency * 30 * 24 * 60 * 60 * 1000;
        break;
      case "years":
        frequencyInMs = frequency * 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        throw new Error("Invalid frequency type");
    }
  
    const frequenciesOccurred = Math.floor(durationInMs / frequencyInMs); // Calculate the number of frequencies occurred
  
    const profitValue = frequenciesOccurred * profit; // Calculate the profit value
  
    return profitValue;
}
export function getWithdrawableProfit(frequency, frequencyType, profit, startDate,endDate , price){
    const today = new Date(); // Get today's date
    if(endDate<today){
        return calculateProfit(frequency, frequencyType, profit, startDate,endDate)+price
    }else{
        return calculateProfit(frequency, frequencyType, profit, startDate,endDate)
    }

}

  

  
export const createBoughtPlan = async (req, res) => {
    {    
        if(req.logInfo.userLogged){
            const {planId,slipScreenshot} = req.body
            planModel.findOne({_id : planId}).then((response)=>{
                if(response){
                    if(response.activated){

                        let newBoughtPlan = new boughtPlanModel()
                        newBoughtPlan.userEmail = req.logInfo.user.userEmail
                        newBoughtPlan.planName = response.name
                        newBoughtPlan.profit = response.profit
                        newBoughtPlan.profitFrequency = response.profitFrequency
                        newBoughtPlan.profitFrequencyType = response.profitFrequencyType
                        newBoughtPlan.price = response.lastPrice 
                        newBoughtPlan.endDate = getEndDate(response.duration, response.durationType)                     
                        newBoughtPlan.slipScreenshot = slipScreenshot 
                        newBoughtPlan.save().then((response)=>{
                            res.send(response)
                        }).catch((err)=>{
                            res.send(err)
                        })

                    }else{
                        res.send("plan_not_activated")
                    }
                }else{
                    res.send("no_plan_found")
                }
            }).catch((err)=>{
            })
        }
        
    }
}

export const activatePlan = async (req, res) => {
    {    
        if(req.logInfo.adminLogged){
            const {boughtPlanId} = req.body
            boughtPlanModel.findOne({_id : boughtPlanId}).then((response)=>{
                if(response){
                    if(!response.activated){
                        boughtPlanModel.updateOne({_id : boughtPlanId}, {activated : true , date : Date.now()}).then((response)=>{
                            res.send(response)
                        }).catch((err)=>{
                        })
                    }else{
                        res.send("plan_already_activated")
                    }
                }else{
                    res.send("no_plan_found")
                }
            }).catch((err)=>{
            })
        }        
    }
}
export const getBoughtPlansCustomer = async (req, res) => {
    {    
        if(req.logInfo.userLogged){
            boughtPlanModel.find({userEmail : req.logInfo.user.userEmail}).then((response)=>{
                res.send(response)
            }).catch((err)=>{
            })
        }else{
            res.send("not_logged")
        }
        
    }
}
export const getBoughtPlansAdmin = async (req, res) => {
    {    
        if(req.logInfo.adminLogged){
            boughtPlanModel.find({}).then((response)=>{
                res.send(response)
            }).catch((err)=>{
            })
        }else{
            res.send("not_logged")
        }
        
    }
}

