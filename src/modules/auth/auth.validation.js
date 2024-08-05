import joi from "joi";
 const signupSchemaVal=joi.object({
    firstName:joi.string().min(2).max(20).required(),
    lastName:joi.string().min(2).max(20).required(),
    userName:joi.string().min(2).max(20),
    email:joi.string().email().required(),
    recoveryEmail:joi.string().email(),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    DOB:joi.date().example("2023-7-7"),
    mobileNumber:joi.string().min(11).max(11).pattern(/^(002||\+2)?01[0125][0-9]{8}$/).required(),
    
}).required()
//allow(joi.string().pattern(new RegExp('/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm')))
//coreJoi.string().pattern(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])$/)),
 const signinSchemaVal=joi.object({
    email:joi.string().email(),
    mobileNumber:joi.string().min(11).max(11).pattern(/^(002||\+2)?01[0125][0-9]{8}$/),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),

}).required()

export {
    signupSchemaVal,
    signinSchemaVal
 
}