import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct, } from "./product.controller.js";
import { uploadMixFiles } from "../../fileUpload/fileUpload.js";

const productRouter=Router()

productRouter.route("/")
.post(uploadMixFiles("products",[{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),catchError(addProduct))
.get(catchError(getAllProducts))

productRouter.route('/:id')
.get(catchError(getProduct))
.put(uploadMixFiles("products",[{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),catchError(updateProduct))
.delete(catchError(deleteProduct))
export default productRouter