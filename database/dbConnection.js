import { connect } from "mongoose";
import * as dotenv from "dotenv"
dotenv.config({path:'./config/.env'})

let db=process.env.MONGO_URI
export const conn = await connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));  