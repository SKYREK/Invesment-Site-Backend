import userSchema from "../models/user.js"
import mongoose from "../DB/conn.js";
import crypto from 'crypto'
import { createLog } from "./logController.js";
import { boughtPlanModel, calculateProfit, getWithdrawableProfit } from "./boughtPlanController.js";
import { withDrawelModel } from "./withdrawController.js";


export const userModel = mongoose.model('user', userSchema)

export const createUser = async (req, res) => {
    let newUser = new userModel()
    const{firstName , lastName , gender,userImage , DOB , email , password, nic, nicImage} = req.body
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.gender = gender
    newUser.userImage = userImage
    newUser.DOB = DOB
    newUser.email = email
    newUser.nic = nic
    newUser.nicImage = nicImage
    newUser.passwordHash = hashPassword(password)
    newUser.save().then((response)=>{
        res.send(response)
    }).catch((err)=>{
        res.send(err)
    })
}

export const logUser = async (req, res) => {
    let result = {
        validated : false,
        status : "user_not_found",
        id : ""
    }
    userModel.findOne({email : req.body.email}).then((response)=>{
        if(response){
            result.status = "incorrect_password"
            if(response.passwordHash == hashPassword(req.body.password)){
                if(response.emailVerified){                    
                    req.session.userId = response._id
                    req.logInfo.userLogged = true
                    result.validated = true
                    result.status = "correct_password"
                    result.id = response._id             
                }else{
                    result.status = "email_not_verified"
                }                
            }
        }
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

export function hashPassword(password){
    return crypto.pbkdf2Sync(password,"no_salt",1000,64,'sha512').toString('hex')
}

export const getCurrentUser = async (req, res) => {
    
    userModel.findOne({_id : req.session.userId}).then((response)=>{
        if(response){
            res.send(response)
        }
        res.send({invalidSession : true})
    }
    ).catch((err)=>{
        res.send({loginError : true})
    }
    )
}
export const activateUser = async (req, res) => {
    if(req.logInfo.adminLogged){
        userModel.updateOne({_id : req.body.userId},{
            $set : {
                activated : true
            }
        }).then((response)=>{
            if(response.modifiedCount == 1){
                res.send({success : true})
                createLog(req.session.adminId,[req.body.userId],"customer_account_activation",
                "Customer account with id : "+req.body.userId+" activated by admin with email : "+req.logInfo.admin.email)
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
}
export const deactivateUser = async (req, res) => {
    if(req.logInfo.adminLogged){
        userModel.updateOne({_id : req.body.userId},{
            $set : {
                activated : false
            }
        }).then((response)=>{
            if(response.modifiedCount == 1){
                res.send({success : true})
                createLog(req.session.adminId,[req.body.userId],"customer_account_deactivation",
                "Customer account with id : "+req.body.userId+" deactivated by admin with email : "+req.logInfo.admin.email)
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
}

export const requestEmailCode = async (req, res) => {
    const code = createCode()
    userModel.updateOne({email : req.body.email},{
        $set : {
            emailActivationCode : hashPassword(code)
        }
    }).then((response)=>{
        if(response.modifiedCount == 1){
            res.send({success : true})
            //send email

        }
    })
}

//function create 6 digit random number and convert it into 6 character string and return
export function createCode(){
    let code = Math.floor(Math.random() * 1000000)
    return code.toString()
}

export const verifyEmail = async (req, res) => {
    const{email , code} = req.body
    userModel.findOne({email : email}).then((response)=>{
        if(response){
            if(response.emailActivationCode != "error" && response.emailActivationCode == hashPassword(code)){
                userModel.updateOne({email : email},{
                    $set : {
                        emailVerified : true,
                        emailActivationCode : "error"
                    }
                }).then((response)=>{
                    if(response.modifiedCount == 1){
                        res.send({success : true})
                    }
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send({codeIncorrect : true})
            }
        }else{
            res.send({userNotFound : true})
        }
    }).catch((err)=>{
        res.send(err)
    })
}

export const getWithdrawablebalance = async (req, res) => {
    if(req.logInfo.userLogged){
        let balance = 0
        boughtPlanModel.find({userEmail : req.logInfo.user.email}).then((response)=>{
            if(response){
                response.forEach(element => {
                    //frequency, frequencyType, profit, startDate,endDate
                    balance += getWithdrawableProfit(element.profitFrequency,element.profitFrequencyType,element.profit,element.date,element.endDate,element.price)
                });
                withDrawelModel.find({userEmail : req.logInfo.user.email}).then((response)=>{
                    if(response){
                        response.forEach(element => {
                            balance -= element.amount
                        });
                        res.send({balance : balance})
                    }
                })                
            }
        })
    }
}






