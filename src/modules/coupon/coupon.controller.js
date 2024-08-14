import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { Coupon } from "../../../database/models/coupon.model.js"


const addCoupon= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const coupon=new Coupon(req.body)
    await Coupon.save()
    res.status(201).json({message:messages.Coupon.CreatedSuccessfully,coupon})
}

const getAllCoupons=async (req,res,next)=>{
    const coupons=await Coupon.find()
    res.json({coupons})
}
const getCoupon=async (req,res,next)=>{
    const coupon=await Coupon.findById(req.params.id)
    coupon || next(new AppError(messages.Coupon.NotFound,404)) 

    !coupon||res.json({coupon})
}

const updateCoupon=async (req,res,next)=>{
    const coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new AppError(messages.Coupon.NotFound,404))

    !coupon||res.json({message:messages.Coupon.UpdatedSuccessfully,coupon})
}
const deleteCoupon=async (req,res,next)=>{
    const coupon=await Coupon.findByIdAndDelete(req.params.id,{new:true})
    coupon || next(new AppError(messages.Coupon.NotFound,404))

    !coupon||res.status(200).json({message:messages.Coupon.DeletedSuccessfully,coupon})
}

    
export{
    addCoupon,getAllCoupons,getCoupon,updateCoupon,deleteCoupon
}