import mongoose from "../DB/conn.js"
import logSchema from "../models/log.js"

const logModel = mongoose.model('log', logSchema)

export function createLog(userId, relatedUsers, type, context){
    let newLog = new logModel()
    newLog.userId = userId
    newLog.relatedUsers = relatedUsers
    newLog.type = type
    newLog.context = context
    newLog.save().then((response)=>{
        console.log(response)
    }).catch((err)=>{
        console.log(err)
    })
}
export function createLogWithoutuserId(type, context){
    let newLog = new logModel()
    newLog.type = type
    newLog.context = context
    newLog.save().then((response)=>{
        console.log(response)
    }).catch((err)=>{
        console.log(err)
    })
}