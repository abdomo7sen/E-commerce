import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { changePassword, signin, signUp } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";


const authRouter= Router()

authRouter.post("/signup",checkEmail,catchError(signUp));
authRouter.post("/signin",catchError(signin));
authRouter.patch("/change-password",catchError(changePassword));

// authRouter.post("/verify",catchError(verifyOtp))

export {authRouter}