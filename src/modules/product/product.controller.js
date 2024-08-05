import slugify from "slugify"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { Product } from "../../../database/models/product.model.js"
import { deleteOne, getOne } from "../handler/handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addProduct= async (req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images=req.files.images.map(img=>img.filename)
    const product=new Product(req.body)
    await product.save()
    res.status(201).json({message:messages.Product.CreatedSuccessfully,product})
}

const getAllProducts=async (req,res,next)=>{

    let apiFeature=new ApiFeature(Product.find(),req.query).pagination().filter().sort().search().fields()

    const products=await apiFeature.mongoQuery

    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,products})
}
const getProduct=getOne(Product)

const updateProduct=async (req,res,next)=>{
    if (req.body.title)req.body.slug=slugify(req.body.title)
    if(req.files.imageCover)req.body.imageCover=req.files.imageCover[0].filename
    if(req.files.images)req.body.images=req.files.images.map(img=>img.filename)
    const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    product || next(new AppError(messages.Product.NotFound,404))

    !product||res.json({message:messages.Product.UpdatedSuccessfully,product})
}
const deleteProduct=deleteOne(Product)


export{
    addProduct,getAllProducts,getProduct,updateProduct,deleteProduct
}