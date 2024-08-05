import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./review.controller.js";
import { catchError } from "../../middleware/catchError.js";

const categoryRouter=Router()

categoryRouter.route("/")
.post(catchError(addCategory))
.get(catchError(getAllCategories))

categoryRouter.route('/:id')
.get(catchError(getCategory))
.put(catchError(updateCategory))
.delete(catchError(deleteCategory))
export default categoryRouter