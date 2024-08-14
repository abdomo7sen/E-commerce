process.on("uncaughtException",(err)=>{
    console.log(err);
})
import * as dotenv from "dotenv"
import express from 'express'
import { conn } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js';
import { bootstrape } from './src/modules/bootstrape.js';
dotenv.config({path:'./config/.env'})
const app = express()
const port = 3000

app.use(express.json())
app.use('/uploads',express.static('uploads'))

bootstrape(app)

app.use("/*",( req, res,next) => {
    next(new AppError(`Route Not Found ${req.originalUrl}`,404))
})
app.use(globalError)
process.on("unhandledRejection",(err) => { console.log(err);})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))