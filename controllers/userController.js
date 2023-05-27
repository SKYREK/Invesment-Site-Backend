import userSchema from "../models/user.js"
import mongoose from "../DB/conn.js";
import crypto from 'crypto'


export default userModel = mongoose.model('user', userSchema)

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
    }
    ).catch((err)=>{
        res.send(err)
    }
    )
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
                    if(response.activated){
                        req.session.userId = response._id
                        req.logInfo.userLogged = true
                        result.validated = true
                        result.status = "correct_password"
                        result.id = response._id                        
                    }else{
                        result.status = "not_activated"
                    }
                }else{
                    result.status = "email_not_verified"
                }                
            }
        }
        res.send(result)
    }
    ).catch((err)=>{
        res.send(err)
    }
    )

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


