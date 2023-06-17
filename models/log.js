import mongoose from "../DB/conn.js";

const logSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    relatedUsers : {
        type : [mongoose.Schema.Types.ObjectId]
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    type:{
        type : String
    },
    context :{
        type : String,
        required : true
    }
})

export default logSchema