import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { systemRole } from "../../utils/common/enum.js";

const wishlistRouter=Router()

wishlistRouter.route('/')
.patch(protectedRoutes,allowedTo(systemRole.USER),catchError(addToWishlist))
.get(protectedRoutes,allowedTo(systemRole.USER),catchError(getLoggedUserWishlist))
wishlistRouter.route('/:id')
.delete(protectedRoutes,allowedTo(systemRole.USER),catchError(removeFromWishlist))


export default wishlistRouter;