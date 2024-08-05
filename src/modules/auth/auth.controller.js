import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/messages.js"
// import { sendEmail } from '../../utils/email/sendEmail.js'
import { User } from "../../../database/models/user.model.js"


//signup
const signUp=async(req,res,next)=>{
    

    const user=new User(req.body)
    // save  user
    await user.save()
    let token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
    res.status(201).json({messages: messages.User.CreatedSuccessfully,token})
}

//signin
const signin=async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return next(new AppError(messages.User.NotFound,404))
    console.log(user);
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
        res.status(200).json({messages: messages.User.userSignedInSuccessfully,token})
    }
    else return next(new AppError(messages.password.emailOrPasswordIncorrect,400))
};
const changePassword=async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return next(new AppError(messages.User.NotFound,404))
    if(user&&bcrypt.compareSync(req.body.oldPassword,user.password)){
        await User.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword,passwordChangedAt:Date.now()},{new:true})
        let token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
        res.status(200).json({messages: messages.password.UpdatedSuccessfully,token})
    }
    else return next(new AppError(messages.password.emailOrPasswordIncorrect,400))
};


const protectedRoutes=async (req, res,next) => {
    let {token}=req.headers
    let userPayload=null
    if(!token) return next(new AppError(messages.token.required,404))
    
    jwt.verify(token,process.env.JWT_KEY,(err,data)=>{
        if (err) return next(new AppError(messages.err,403))
        userPayload=data
    })

    let user=User.findById(userPayload.userId)
    if(!user) return next(new AppError(messages.User.NotFound,404))
    
        if(user.passwordChangedAt){
            let time= parseInt(user.passwordChangedAt.getTime()/1000)

            if (time >token.iat) return next(new AppError(messages.token.invalidToken,404))
        
        }
        req.user=data
    next()
}

const allowedTo=(...roles)=>{
    return async (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(new AppError(messages.User.userNotAuthorized,400))
        }
        return next()
    }
}


export{
    signUp,
    signin,
    changePassword,
    protectedRoutes,
    allowedTo
}