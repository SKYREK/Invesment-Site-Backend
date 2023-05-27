import adminSchema from "../models/admin.js";
import mongoose from "../DB/conn.js";
import { hashPassword } from "./userController.js";
export default adminModel = mongoose.model('admin', adminSchema)

//done following function but not tested
export const createAdmin = async (req, res) => {
    //to start admin account pass is "lL7cieIgN096cLh"
    //to change admin account pass is "Wg07pMg8rvhLv90"
    //ne admin password is PUeBDo3koQOtj0F
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
            })
        }
    })
    
}
