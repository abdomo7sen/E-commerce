import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { uploadSingle } from "../../fileUpload/fileUpload.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";

const categoryRouter=Router()

categoryRouter.route("/")
.post(uploadSingle('category','image'),catchError(addCategory))
.get(catchError(getAllCategories))

categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter.route('/:id')
.get(catchError(getCategory))
.put(uploadSingle('category','image'),catchError(updateCategory))
.delete(catchError(deleteCategory))
export default categoryRouter