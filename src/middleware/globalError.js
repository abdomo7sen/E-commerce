
export const globalError=(err, req, res,next) => {
    let code=err.statusCode ||500

    return res.status(code).json({error:err.message,code,stack:err.stack})
}