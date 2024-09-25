import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { systemRole } from "../../utils/common/enum.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { allOrders, cashOrder, createCheckOutSession, userOrders } from "./order.controller.js";
const orderRouter=Router({mergeParams:true});
orderRouter.route("/")
.get(protectedRoutes,allowedTo(systemRole.ADMIN),catchError(allOrders))

orderRouter.get("/users",protectedRoutes,allowedTo(systemRole.USER,systemRole.ADMIN),catchError(userOrders))

orderRouter.route('/:id')
.post(protectedRoutes,allowedTo(systemRole.USER),catchError(cashOrder))

orderRouter.post("/checkout/:id",protectedRoutes,allowedTo(systemRole.USER),catchError(createCheckOutSession))
export default orderRouter