import multer from "multer"
import {v4} from "uuid"

const fileUpload=(folderName)=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`uploads/${folderName}`)
        },
        filename:(req,file,cb)=>{
            cb(null,v4()+"-"+file.originalname)
        }
    })
    const fileFilter=(req,file,cb)=>{
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }
    const upload = multer({
        storage,fileFilter
        // limits:{fileSize:2*1024*1024}
    })

    return upload;
} 

const uploadSingle=(folderName,fileField)=>{
    return fileUpload(folderName).single(fileField)
}
const uploadMixFiles=(folderName,arrayOfFields,maxCount)=>{
    return fileUpload(folderName).fields(arrayOfFields,maxCount)
}
const uploadArrayFiles=(folderName,arrayOfFields,maxCount)=>{
    return fileUpload(folderName).array(arrayOfFields,maxCount)
}

export{uploadSingle,uploadMixFiles,uploadArrayFiles} ;
