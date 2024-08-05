
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { User } from "../../../database/models/user.model.js"
import { deleteOne, getOne } from "../handler/handler.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addUser= async (req,res,next)=>{
    const user=new User(req.body)
    await user.save()
    res.status(201).json({message:messages.User.CreatedSuccessfully,user})
}

const getAllUsers=async (req,res,next)=>{
    let apiFeature=new ApiFeature(User.find(),req.query).pagination().filter().sort().search().fields()

    const users=await apiFeature.mongoQuery
    users.forEach(user=>{
        user.password=undefined
        user.rePassword=undefined
    })
    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,users})

}
const getUser=getOne(User)

const updateUser=async (req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user || next(new AppError(messages.User.NotFound,404))

    !user||res.json({message:messages.User.UpdatedSuccessfully,user})
}
const deleteUser=deleteOne(User)


export{
    addUser,getAllUsers,getUser,updateUser,deleteUser
}