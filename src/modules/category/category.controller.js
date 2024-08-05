import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { deleteOne,getOne } from "../handler/handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addCategory= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
    const category=new Category(req.body)
    await category.save()
    res.status(201).json({message:messages.Category.CreatedSuccessfully,category})
}

const getAllCategories=async (req,res,next)=>{
    let apiFeature=new ApiFeature(Category.find(),req.query).pagination().filter().sort().search().fields()

    const categories=await apiFeature.mongoQuery

    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,categories})
}
const getCategory=getOne(Category)

const updateCategory=async (req,res,next)=>{
    if (req.body.name) req.body.slug=slugify(req.body.name)
    if (req.file)req.body.image=req.file.filename

    const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})

    category || next(new AppError(messages.Category.NotFound,404))

    !category||res.json({message:messages.Category.UpdatedSuccessfully,category})
}
const deleteCategory=deleteOne(Category)


export{
    addCategory,getAllCategories,getCategory,updateCategory,deleteCategory
}