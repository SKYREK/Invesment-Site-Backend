import mongoose from "../DB/conn.js";

const withDrawelSchema = mongoose.Schema({
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
    }
})
export default withDrawelSchema