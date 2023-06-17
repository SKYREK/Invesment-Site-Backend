import mongoose from "../DB/conn.js"

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price :{
        type: Number,
        required: true
    },
    lastPrice :{
        type: Number,
        required : true
    },
    priceDiscount : {
        type: Number
    },
    profit : {
        type: Number
    },
    profitFrequency : {
        type: Number
    },
    profitFrequencyType : {
        type: String,
        default : "days"
    },
    duration : {
        type: Number,
        required: true
    },
    durationType : {
        type: String,
        default : "days"
    },
    description : { 
        type: String
    },
    image : {
        type: String,
        default : "https://img.freepik.com/free-vector/online-education-concept-illustration_114360-133.jpg?size=626&ext=jpg"
    },
    activated : {
        type: Boolean,
        required: true,
        default : true
    }
})

export default planSchema