import mongoose from "../DB/conn.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    DOB : {
        type: Date,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type:String,
        required: true,
    },
    userImage: {
        type: String,
        required: true,
        default : "https://img.freepik.com/premium-vector/accoun-vector-icon-with-long-shadow-white-illustration-isolated-blue-round-background-graphic-web-design_549897-771.jpg?w=740"
    },
    gender :{
        type: String,
        required: true,
    },
    nic : {
        type: String,
        required: true,
    },nicImage : {
        type: String,
        required: true,
    },
    emailVerified : {
        type: Boolean,
        required: true,
        default : false
    },
    activated : {
        type: Boolean,
        required: true,
        default : false
    },
    startDate :{
        type: Date,
        required: true,
        default : Date.now()
    }
});
export default userSchema