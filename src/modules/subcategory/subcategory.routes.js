import { Router } from "express";
import {  addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { catchError } from "../../middleware/catchError.js";

const subCategoryRouter=Router({mergeParams:true})

subCategoryRouter.route("/")
.post(catchError(addSubCategory))
.get(catchError(allSubCategories))

subCategoryRouter.route('/:id')
.get(catchError(getSubCategory))
.put(catchError(updateSubCategory))
.delete(catchError(deleteSubCategory))
export default subCategoryRouter