import mongoose from "../DB/conn.js";
const boughtPlanSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    planName : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    profit : {
        type: Number,
        required: true
    },
    profitFrequency : {
        type: Number,
        required: true
    },
    profitFrequencyType : {
        type: String,
        required: true
    },
    endDate : {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    slipScreenshot: {
        type: String,
        required: true
    }
})
export default boughtPlanSchema