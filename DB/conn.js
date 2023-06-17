import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
mongoose.connect(process.env.DB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true}).then(
        response=>{
        if(response){
            console.log('Database connected')
        }
}).catch(err=>{
    console.log(err)
})
export default mongoose