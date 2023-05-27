import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from './DB/conn.js'

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



app.listen(process.env.PORT, () => console.log('Server running on port '+process.env.PORT))