import slugify from "slugify"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { Brand } from "../../../database/models/brand.model.js"
import fs from "fs"
import { deleteOne, getOne } from "../handler/handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addBrand= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    const brand=new Brand(req.body)
    await brand.save()
    res.status(201).json({message:messages.Brand.CreatedSuccessfully,brand})
}

const getAllBrands=async (req,res,next)=>{
    let apiFeature=new ApiFeature(Brand.find(),req.query).pagination().filter().sort().search().fields()

    const brands=await apiFeature.mongoQuery

    res.json({message:messages.Success,page:apiFeature.pageNumber,limit:apiFeature.limit,brands})

}
const getBrand=getOne(Brand)

const updateBrand=async (req,res,next)=>{
    if (req.body.name)req.body.slug=slugify(req.body.name)
    

    if (req.file){
        const deletedLogo=await Brand.findById(req.params.id)
        console.log(deletedLogo.logo);
        if (fs.existsSync(deletedLogo.logo)){
        fs.unlinkSync(`uploads/brand/${deletedLogo.logo}`,()=>{
            console.log("a7a");
        })}
        req.body.logo=req.file.filename

    }
    // console.log(req.body.logo);

    const brand=await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new AppError(messages.brand.NotFound,404))

    !brand||res.json({message:messages.brand.UpdatedSuccessfully,brand})
}
const deleteBrand=deleteOne(Brand)


export{
    addBrand,getAllBrands,getBrand,deleteBrand,updateBrand
}