process.on("uncaughtException",(err)=>{
    console.log(err);
})
import express from 'express'
import * as dotenv from "dotenv"
import { conn } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js';
import { bootstrape } from './src/modules/bootstrape.js';
import cors from "cors"
dotenv.config({path:'./config/.env'})
const app = express()
const port =process.env.PORT||3000
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

bootstrape(app)
app.use("/*",( req, res,next) => {
    next(new AppError(`Route Not Found ${req.originalUrl}`,404))
})
app.use(globalError)
process.on("unhandledRejection",(err) => { console.log(err);})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))