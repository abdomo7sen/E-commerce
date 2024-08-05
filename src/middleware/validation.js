import { AppError } from "../utils/appError.js";

export const validate=(schema)=>{

    return(req,res,next)=>{
    const {error}=schema.validate({...req.body,...req.params,...req.query},{abortEarly:false});
    if(!error){
        return next();
    
    }else {
    let msg=error.details.map(element =>element.message);
    
    return next(new AppError(msg,404))
    }
}
}