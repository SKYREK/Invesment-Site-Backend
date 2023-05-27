import mongoose from "../DB/conn.js";

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    passwordHash: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    adminImage: {
        type: String,
        required: true,
        default : "https://img.freepik.com/premium-vector/accoun-vector-icon-with-long-shadow-white-illustration-isolated-blue-round-background-graphic-web-design_549897-771.jpg?w=740"
    },
    privileges :{
        type : [String],
        required : true,
        default : ["local"]
    },
    activated : {
        type: Boolean,
        required: true,
        default : false
    }
})
export default adminSchema