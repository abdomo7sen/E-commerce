import slugify from "slugify"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { deleteOne,getOne } from "../handler/handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addSubCategory= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const subCategory=new SubCategory(req.body)
    await subCategory.save()
    res.status(201).json({message:messages.SubCategory.CreatedSuccessfully,subCategory})
}

const allSubCategories=async (req,res,next)=>{
    let filter={}
    if(req.params.category) filter.category=req.params.category
    let apiFeature=new ApiFeature(SubCategory.find({filter}),req.query).pagination().filter().sort().search().fields()

    const subCategories=await apiFeature.mongoQuery

    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,subCategories})

}

const getSubCategory=getOne(SubCategory)

const updateSubCategory=async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)

    const subCategory=await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subCategory || next(new AppError(messages.SubCategory.NotFound,404))

    !subCategory||res.json({message:messages.SubCategory.UpdatedSuccessfully,subCategory})
}
const deleteSubCategory=deleteOne(SubCategory)


    export{
    addSubCategory,allSubCategories,getSubCategory,updateSubCategory,deleteSubCategory
}