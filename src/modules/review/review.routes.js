import { Router } from "express";
import {  addReview,  deleteReview, getAllReviews,  getReview,updateReview } from "./review.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { systemRole } from "../../utils/common/enum.js";

const reviewRouter=Router()

reviewRouter.route("/")
.post(protectedRoutes,allowedTo(systemRole.USER),catchError(addReview))
.get(catchError(getAllReviews))

reviewRouter.route('/:id')
.get(catchError(getReview))
.put(protectedRoutes,allowedTo(systemRole.USER),catchError(updateReview))
.delete(protectedRoutes,allowedTo(systemRole.USER,systemRole.ADMIN),catchError(deleteReview))
export default reviewRouter