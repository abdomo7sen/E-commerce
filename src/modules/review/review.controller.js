import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { Review } from "../../../database/models/review.model.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addReview= async (req,res,next)=>{
    req.body.user=req.user.userId
    let exist=await Review.findOne({user:req.user.userId,product:req.body.product})
    if(exist) return next(new AppError(messages.Review.AlreadyExists,400))
    const review=new Review(req.body)
    await review.save()
    res.status(201).json({message:messages.Review.CreatedSuccessfully,review})
}

const getAllReviews=async (req,res,next)=>{
    let apiFeature=new ApiFeature(Review.find(),req.query).pagination().filter().fields().sort().search()
    const reviews=await apiFeature.mongoQuery
    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,reviews})

}
const getReview=async (req,res,next)=>{
    const review=await Review.findById(req.params.id)
    review || next(new AppError(messages.Review.NotFound,404)) 

    !review||res.json({review})
}

const updateReview=async (req,res,next)=>{
    
    const review=await Review.findOneAndUpdate({_id:req.params.id,user:req.user.userId},req.body,{new:true})
    review || next(new AppError("review Not Found or not created by you",404))

    !review||res.json({message:messages.Review.UpdatedSuccessfully,review})
}
const deleteReview=async (req,res,next)=>{
    const review=await Review.findByIdAndDelete(req.params.id,{new:true})
    review || next(new AppError(messages.Review.NotFound,404))

    !review||res.status(200).json({message:messages.Review.DeletedSuccessfully,review})
}


export{
    addReview,getAllReviews,getReview,updateReview,deleteReview
}