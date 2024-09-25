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
import { catchError } from './src/middleware/catchError.js';
import { messages } from './src/utils/common/messages.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.SCRT_KEY);
dotenv.config({path:'./config/.env'})
const app = express()
const port =process.env.PORT||3000
app.post('/api/webhook', express.raw({type: 'application/json'}), catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString();
  
    let event=stripe.webhooks.constructEvent(req.body, sig, process.env.SCRT_WEBHOOK);  
    let checkout
    // Handle the event
    if(event.type=="checkout.session.completed"){
        checkout = event.data.object;

    }
  
    // Return a res to acknowledge receipt of the event
    res.json({message:messages.Success,checkout});
  }));

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