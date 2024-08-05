import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"


const addCategory= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const category=new Category(req.body)
    await category.save()
    res.status(201).json({message:messages.category.CreatedSuccessfully,category})
}

const getAllCategories=async (req,res,next)=>{
    const categories=await Category.find()
    res.json({categories})
}
const getCategory=async (req,res,next)=>{
    const category=await Category.findById(req.params.id)
    category || next(new AppError(messages.category.NotFound,404)) 

    !category||res.json({category})
}

const updateCategory=async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)

    const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError(messages.category.NotFound,404))

    !category||res.json({message:messages.category.UpdatedSuccessfully,category})
}
const deleteCategory=async (req,res,next)=>{
    const category=await Category.findByIdAndDelete(req.params.id,{new:true})
    category || next(new AppError(messages.category.NotFound,404))

    !category||res.status(200).json({message:messages.category.DeletedSuccessfully,category})
}


export{
    addCategory,getAllCategories,getCategory,updateCategory,deleteCategory
}