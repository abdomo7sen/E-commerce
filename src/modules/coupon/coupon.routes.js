import { Router } from "express";
import { addCoupon, deleteCoupon,  getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";
import { catchError } from "../../middleware/catchError.js";

const couponRouter=Router()

couponRouter.route("/")
.post(catchError(addCoupon))
.get(catchError(getAllCoupons))

couponRouter.route('/:id')
.get(catchError(getCoupon))
.put(catchError(updateCoupon))
.delete(catchError(deleteCoupon))
export default couponRouter