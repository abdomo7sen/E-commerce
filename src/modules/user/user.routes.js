import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { systemRole } from "../../utils/common/enum.js";
import orderRouter from "../order/order.routes.js";


const userRouter=Router()

userRouter.use("/:id/orders",protectedRoutes,allowedTo(systemRole.ADMIN),orderRouter)

userRouter.route("/")
.post(checkEmail,catchError(addUser))
.get(catchError(getAllUsers))

userRouter.route('/:id')
.get(catchError(getUser))
.put(catchError(updateUser))
.delete(catchError(deleteUser))


export default userRouter