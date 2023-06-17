import mongoose from "../DB/conn.js";

const withDrawRequestSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    description : {
        type: String,
        required: false
    },
    status : {
        type : String,
        required : true,
        default : "pending"
    }
})
export default withDrawRequestSchema