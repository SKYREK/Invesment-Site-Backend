import { adminModel } from "../controllers/adminController.js"
import { userModel } from "../controllers/userController.js"

export function validateUser(req,res,next){
    //user session validation
    if(req.session.userId){
        userModel.findOne({_id : req.session.userId}).then((response)=>{
            if(response){
                req.logInfo.userLogged = true
                req.logInfo.user = response       
                next()         
            }else{
                req.logInfo.userLogged = false  
                next()     
            }
        }) 
    }else{
        req.logInfo.userLogged = false  
        next()
    }           
}

export function validateAdmin(req,res,next){
    //admin session validation
    if(req.session.adminId){
        adminModel.findOne({_id : req.session.adminId}).then((response)=>{
            if(response){
                req.logInfo.adminLogged = true
                req.logInfo.admin = response 
                next()               
            }else{
                req.logInfo.adminLogged = false  
                next()     
            }
        }) 
    }else{
        req.logInfo.adminLogged = false
        next()
    }           
}