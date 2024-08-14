import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { ApiFeature } from "../../utils/apiFeature.js"
import { User } from "../../../database/models/user.model.js"

const addToWishlist=async (req,res,next)=>{
    
    const wishlist=await User.findByIdAndUpdate(req.user.userId,{$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError(messages.Wishlist.NotFound,404))

    !wishlist||res.json({message:messages.Wishlist.CreatedSuccessfully,wishlist:wishlist.wishlist})
}
const getLoggedUserWishlist=async (req,res,next)=>{
    
    const wishlist=await User.findById(req.user.userId).populate("wishlist")
    wishlist || next(new AppError(messages.Wishlist.NotFound,404))

    !wishlist||res.json({message:messages.Wishlist.Success,wishlist:wishlist.wishlist})
}
const removeFromWishlist=async (req,res,next)=>{
    
    const wishlist=await User.findByIdAndUpdate(req.user.userId,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist || next(new AppError(messages.Wishlist.NotFound,404))  

    !wishlist||res.json({message:messages.Wishlist.DeletedSuccessfully,wishlist:wishlist.wishlist})
}

export{
    addToWishlist,removeFromWishlist,getLoggedUserWishlist
}