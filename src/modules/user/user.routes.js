import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";

const userRouter=Router()

userRouter.route("/")
.post(checkEmail,catchError(addUser))
.get(catchError(getAllUsers))

userRouter.route('/:id')
.get(catchError(getUser))
.put(catchError(updateUser))
.delete(catchError(deleteUser))
export default userRouter