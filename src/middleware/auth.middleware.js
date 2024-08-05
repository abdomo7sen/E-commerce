import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"
import { sendEmail } from "../utils/email/sendEmail.js"
import { status } from '../utils/common/enum.js'
import { User } from '../../database/index.data.js'

const signupVal=async(req, res,next) => {
    const userExist=await User.findOne({email:req.body.email})
    if(userExist&&userExist.confirmEmail==true){
        return next(new AppError(messages.User.AlreadyExists,409))
    }else if(req.body.rePassword!==req.body.password){
    return next(new AppError(messages.password.passwordsNotMatch,400))
    }else{
    }

}
const signinVal=async(req, res,next) => {
    const userExist=await User.findOne({email:req.body.email})

    if(userExist&&bcrypt.compare(req.body.password,userExist.password)&&userExist.verifyEmail==true){
        userExist.status=status.ACTIVE
        jwt.sign({userId:userExist._id,email:req.body.email,status:userExist.status},"signin-token",(err,token) => {
            
            req.token=token
            return next()

        })
        
        
    }
    else if(!userExist||bcrypt.compare(req.body.password,userExist.password)&&userExist.verifyEmail==true){
        return next(new AppError(messages.password.emailOrPasswordIncorrect,401))
    }
    else if(userExist&&bcrypt.compare(req.body.password,userExist.password)&&userExist.verifyEmail==false){
        
        return next(new AppError(messages.email.emailNotVerified,409))&&sendEmail(req.body.email) 
    }
    

}
const auth=(roles)=>{
    return async(req,res,next)=>{
        const authorization = req.headers.authorization;
    if(!authorization) return next(new AppError(messages.token.required,400))

    if(!authorization.startswith('Bearer ')) return next(new AppError(messages.token.invalidBearerKey,400))


    const {token}=authorization.split("Bearer ")[1]
    jwt.verify(token,"signin-token",async(err,data)=>{
        if (err) return next(new AppError(messages.token.invalidToken,403))
        if (!data?.userId) return next(new AppError(messages.token.invalidPayload,400))
        const user=await User.findById(data.userId)
        if(!user) return next(new AppError(messages.user.userNotFound,404))
        if(user.status==status.INACTIVE) return next(new AppError(messages.user.mustLogin,400))
        if(!roles.includes(user.role)) return next(new AppError(messages.user.userNotAuthorized,400))
            req.authUser=user
            return next()

    })
    }
    
}


export{
    signupVal,
    signinVal,
    auth
}