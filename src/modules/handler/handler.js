import slugify from "slugify"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"

// export const addOne=function(model){

//         return  async (req,res,next)=>{
//             // req.body.slug=slugify(req.body.title)
//             console.log(req.files);

//             if (model=="Product"){

//                 req.body.imageCover=req.files.imageCover[0].filename
//                 console.log("image cover",req.files.imageCover[0].filename);
//                 req.body.images=req.files.images.map(img=>img.filename)
//                 console.log("image cover",req.files.images.map(img=>img.filename));

//                 }
//             if (model=="Category"){
//                 req.body.image=req.file.filename
//                 }
//             if (model=="Brand"){
//                 req.body.logo=req.file.filename
//             }
//             const document=new model(req.body)
//             console.log(req.files);
//             await document.save()
//             // console.log(document);
//             console.log(req.files);

//             res.status(201).json({message:messages.model.CreatedSuccessfully,document})
//         }
// }



export const deleteOne=(model)=>{
    return async (req,res,next)=>{
        const document=await model.findByIdAndDelete(req.params.id,{new:true})
        document || next(new AppError("not found",404))
    
        !document||res.status(200).json({message:"deleted",document})
    }
}
export const getOne=(model)=>{
    return async (req,res,next)=>{
        const document=await model.findById(req.params.id)
        if(model=="User"){
            document[0].password=undefined
                document[0].rePassword=undefined
        }
        document || next(new AppError(" Not Found",404)) 
    
        !document||res.json({document})
    }
}