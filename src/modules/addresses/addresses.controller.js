import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { ApiFeature } from "../../utils/apiFeature.js"
import { User } from "../../../database/models/user.model.js"

const addAddresse=async (req,res,next)=>{
    
    const address=await User.findByIdAndUpdate(req.user.userId,{$addToSet:{addresses:req.body}},{new:true})
    address || next(new AppError(messages.Address.NotFound,404))

    !address||res.json({message:messages.Address.CreatedSuccessfully,address:address.addresses})
}
const getLoggedUserAddress=async (req,res,next)=>{
    
    const address=await User.findById(req.user.userId)
    address || next(new AppError(messages.Address.NotFound,404))

    !address||res.json({message:messages.Address.Success,address:address.addresses})
}
const removeAddress=async (req,res,next)=>{
    
    const address=await User.findByIdAndUpdate(req.user.userId,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    address || next(new AppError(messages.Address.NotFound,404))  

    !address||res.json({message:messages.Address.DeletedSuccessfully,address:address.addresses})
}

export{
    addAddresse,removeAddress,getLoggedUserAddress
}