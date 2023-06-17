import adminSchema from "../models/admin.js";
import mongoose from "../DB/conn.js";
import { hashPassword } from "./userController.js";
export const adminModel = mongoose.model('admin', adminSchema)

//done following function but not tested
export const startAdministration = async (req, res) => {
    //to start admin account pass is "lL7cieIgN096cLh"
    //to change admin account pass is "Wg07pMg8rvhLv90"
    //new admin password is PUeBDo3koQOtj0F
    const {pass} = req.body;
    adminModel.findOne({email : "invest@mail.com"}).then((response)=>{
        if((!response&&pass == "lL7cieIgN096cLh")){
            let newAdmin = new adminModel()    
            newAdmin.firstName = "Heshan"
            newAdmin.lastName = "Heshan"
            newAdmin.email = "invest@mail.com"
            newAdmin.passwordHash = hashPassword("PUeBDo3koQOtj0F")
            newAdmin.privileges = ["super"]
            newAdmin.activated = true
            newAdmin.save().then((response)=>{
                res.send(response)
            }
            ).catch((err)=>{
                res.send(err)
            }
            )
        }else if(pass == "Wg07pMg8rvhLv90"){
            adminModel.updateOne({email : "invest@mail.com"},{
                $set : {
                    activated : true,
                    privileges : ["super"],
                    passwordHash : hashPassword("PUeBDo3koQOtj0F")
                }
            }).then(response=>{
                res.send(response)
            })
        }
    })
    
}
export const logAdmin = async (req, res) => {
    const {email,password} = req.body
    adminModel.findOne({email : email}).then((response)=>{
        if(response){
            if(response.activated){
                if(response.passwordHash == hashPassword(password)){
                    req.session.adminId = response._id
                    req.logInfo.adminLogged = true
                    res.send({validated : true})
                }else{
                    res.send({validated : false})
                }
            }else{
                res.send({activationFailed : true})
            }
        }else{
            res.send({notFound : true})
        }
    })
}

//validations are not implemented
export const createAdmin = async (req, res) => {
    
    if(req.logInfo.adminLogged && req.logInfo.admin.privileges.includes("super")){
        let newAdmin = new adminModel()
        const{firstName , lastName , email , password, privileges} = req.body
        newAdmin.firstName = firstName
        newAdmin.lastName = lastName
        newAdmin.email = email
        newAdmin.passwordHash = hashPassword(password)
        newAdmin.privileges = privileges
        newAdmin.activated = true
        newAdmin.save().then((response)=>{
            res.send(response)
        }
        ).catch((err)=>{
            res.send(err)
        }
        )
    }
}
export const getLoggedAdmin = async (req, res) => {
    res.send(req.logInfo.admin)
}

//change password

export const changePassword = async (req, res) => {
    if(req.logInfo.adminLogged){
        const {password} = req.body
        adminModel.updateOne({_id : req.logInfo.admin._id},{
            $set : {
                passwordHash : hashPassword(password)
            }
        }).then((response)=>{
            res.send(response)
        })
    }
}


