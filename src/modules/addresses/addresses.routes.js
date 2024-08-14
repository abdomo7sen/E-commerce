import { Router } from "express";
import { addAddresse, getLoggedUserAddress, removeAddress} from "./addresses.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { systemRole } from "../../utils/common/enum.js";

const addressRouter=Router()

addressRouter.route('/')
.patch(protectedRoutes,allowedTo(systemRole.USER),catchError(addAddresse))
.get(protectedRoutes,allowedTo(systemRole.USER),catchError(getLoggedUserAddress))
addressRouter.route('/:id')
.delete(protectedRoutes,allowedTo(systemRole.USER),catchError(removeAddress))


export default addressRouter;