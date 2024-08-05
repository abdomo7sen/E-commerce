import { Router } from "express";

import { catchError } from "../../middleware/catchError.js";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../fileUpload/fileUpload.js";

const brandRouter=Router()

brandRouter.route("/")
.post(uploadSingle("brand","logo"),catchError(addBrand))
.get(catchError(getAllBrands))

brandRouter.route('/:id')
.get(catchError(getBrand))
.put(uploadSingle("brand","logo"),catchError(updateBrand))
.delete(catchError(deleteBrand))
export default brandRouter