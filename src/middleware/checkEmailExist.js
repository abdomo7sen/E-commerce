import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"

export const checkEmail=async (req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(user) return next(new AppError(messages.email.AlreadyExists,400))
        
    return next()
}