import mongoose from "../DB/conn.js";
import withDrawelSchema from "../models/withdrawel.js";
import withDrawRequestSchema from "../models/withdrawRequest.js";
import boughtPlanSchema from "../models/boughtPlan.js";
import { calculateProfit, getWithdrawableProfit } from "./boughtPlanController.js";

export const withDrawelModel = mongoose.model('withdrawel', withDrawelSchema)
export const withDrawRequestModel = mongoose.model('withdrawRequest', withDrawRequestSchema)

export const createWithdrawRequest = (req,res) => {
    if(req.logInfo.userLogged){
        let balance = 0
        boughtPlanSchema.find({userId : req.logInfo.userId}).then((response)=>{
            if(response){
                response.forEach((item)=>{
                    balance += getWithdrawableProfit(item.frequency, item.frequencyType, item.profit, item.date, item.endDate,item.price)
                })
                //frequency, frequencyType, profit, startDate,endDate , price
                withDrawRequestSchema.find({email : req.logInfo.user.email , status : "pending"}).then((response)=>{
                    if(response){
                        
                        response.forEach((item)=>{
                            balance -= item.amount
                        })
                    
                        withDrawelModel.find({email : req.logInfo.user.email}).then((response)=>{
                            if(response){
                                response.forEach((item)=>{
                                    balance -= item.amount
                                })
                            }

                            if(balance>=req.body.amount){
                                let newWithdrawRequest = new withDrawRequestModel()
                                newWithdrawRequest.email = req.logInfo.user.email
                                newWithdrawRequest.amount = req.body.amount
                                newWithdrawRequest.description = req.body.description
                                newWithdrawRequest.save().then((response)=>{
                                    res.send(response)
                                }).catch((err)=>{
                                    res.send(err)
                                })
                            }else{
                                res.send("not_enough_balance")
                            }
                        })
                    }
                })

                
            }else{
                res.send("no_plan_found")
            }
        }
        ).catch((err)=>{
            res.send(err)
        })
    }
    else{
        res.send("not_logged")
    }
}

export const getWithdrawRequestsAsCustomer = (req,res) => {
    if(req.logInfo.userLogged){
        withDrawRequestModel.find({email : req.logInfo.user.email}).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_logged")
    }
}

export const getWithdrawRequestsAsAdmin = (req,res) => {
    if(req.logInfo.adminLogged){
        withDrawRequestModel.find().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }
}

export const getWithdrawelsAsCustomer = (req,res) => {
    if(req.logInfo.userLogged){
        withDrawelModel.find({email : req.logInfo.user.email}).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_logged")
    }
}

export const getWithdrawelsAsAdmin = (req,res) => {
    if(req.logInfo.adminLogged){
        withDrawelModel.find().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }
}

export const approveWithdrawRequest = (req,res) => {
    if(req.logInfo.adminLogged){
        withDrawRequestModel.updateOne({_id : req.body.id, status : "pending"}, {$set : {
            approved : true,
            status : "approved"      
        }}).then((response)=>{
            if(response.modifiedCount == 1){
                withDrawRequestModel.findOne({_id : req.body.id}).then((response)=>{
                    let newWithdrawel = new withDrawelModel()
                    newWithdrawel.email = response.userEmail
                    newWithdrawel.amount = response.amount
                    newWithdrawel.description = response.description
                    newWithdrawel.save().then((response)=>{
                        res.send(response)
                    }).catch((err)=>{
                        res.send(err)
                    })
                })
            } 
        })
    } 
}
export const rejectWithdrawRequest = (req,res) => {
    if(req.logInfo.adminLogged){
        withDrawRequestModel.updateOne({_id : req.body.id, status : "pending"}, {$set : {
            approved : false,
            status : "rejected"      
        }}).then((response)=>{
            res.send(response)
        })
    } 
}

