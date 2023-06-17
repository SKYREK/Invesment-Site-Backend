import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from './DB/conn.js'
import { validateAdmin, validateUser } from './middlewares/authenticate session.js'
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import planRouter from './routes/planRouter.js'
import boughtPlanRouter from './routes/boughtPlanRouter.js'
import withdrawRouter from './routes/withdrawRouter.js'

dotenv.config()


const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge : process.env.SESSION_MAX_AGE }
    }))

app.use(validateUser)
app.use(validateAdmin)

app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use("/plans",planRouter)
app.use("/bought",boughtPlanRouter)
app.use("/withdrawel",withdrawRouter)


app.listen(process.env.PORT, () => console.log('Server running on port '+process.env.PORT))