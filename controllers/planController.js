import planSchema from "../models/plan.js";
import mongoose from "../DB/conn.js";

export const planModel = mongoose.model('plan', planSchema)
export const createPlan = async (req, res) => {
    if(req.logInfo.adminLogged){
        const {name,price,lastPrice,priceDiscount,profit,profitFrequency,profitFrequencyType,duration,durationType,description,image,activated} = req.body
        let newPlan = new planModel()
        newPlan.name = name
        newPlan.price = price
        newPlan.lastPrice = lastPrice
        newPlan.priceDiscount = priceDiscount
        newPlan.profit = profit
        newPlan.profitFrequency = profitFrequency
        newPlan.profitFrequencyType = profitFrequencyType
        newPlan.duration = duration
        newPlan.durationType = durationType
        newPlan.description = description
        newPlan.image = image
        newPlan.activated = activated
        newPlan.save().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_admin")
    }
}

export const editPlan = async (req, res) => {
    if(req.logInfo.adminLogged){
        const {name,price,lastPrice,priceDiscount,profit,profitFrequency,profitFrequencyType,duration,durationType,description,image,activated} = req.body
        planModel.findOne({_id : req.params.id}).then((response)=>{
            if(response){
                planModel.updateOne({_id : req.params.id},{$set : {
                    name : name,
                    price : price,
                    lastPrice : lastPrice,
                    priceDiscount : priceDiscount,
                    profit : profit,
                    profitFrequency : profitFrequency,
                    profitFrequencyType : profitFrequencyType,
                    duration : duration,
                    durationType : durationType,
                    description : description,
                    image : image,
                    activated : activated
                }}).then((response)=>{
                    res.send(response)
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send("no_plan_found")
            }
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_admin")
    }
}

export const deletePlan = async (req, res) => {
    if(req.logInfo.adminLogged){
        planModel.deleteOne({_id : req.params.id}).then((response)=>{
        res.send(response)
        }).catch((err)=>{
        res.send(err)
        })
    }else{
        res.send("not_admin")
    }
}

export const deactivatePlan = async (req, res) => {
    if(req.logInfo.adminLogged){
        planModel.updateOne({_id : req.params.id},{
            $set : {
                activated : false
            }
        }).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_admin")
    }
}

export const activatePlan = async (req, res) => {
    if(req.logInfo.adminLogged){
        planModel.updateOne({_id : req.params.id},{
            $set : {
                activated : true
            }
        }).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }else{
        res.send("not_admin")
    }
}

export const getPlans = async (req, res) => {
    if(req.logInfo.userLogged){
        planModel.find({activated : true}).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }
}
export const getAllPlans = async (req, res) => {
    if(req.logInfo.adminLogged){
        planModel.find().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }
}

