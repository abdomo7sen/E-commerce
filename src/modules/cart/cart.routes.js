import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { addToCart, applyCoupon, clearUserCart, deleteCartItem, getLoggedUserCart, updateCart } from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { systemRole } from "../../utils/common/enum.js";
const cartRouter=Router()
cartRouter.route("/")
.post(protectedRoutes,allowedTo(systemRole.USER),catchError(addToCart))
.get(protectedRoutes,allowedTo(systemRole.USER),catchError(getLoggedUserCart))
.delete(protectedRoutes,allowedTo(systemRole.USER),catchError(clearUserCart))
cartRouter.route('/:id')

.put(protectedRoutes,allowedTo(systemRole.USER),catchError(updateCart))
.delete(protectedRoutes,allowedTo(systemRole.USER),catchError(deleteCartItem))

cartRouter.post('/apply-coupon',protectedRoutes,allowedTo(systemRole.USER),catchError(applyCoupon))

export default cartRouter