import { authRouter } from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./product/product.routes.js"
import subCategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"


export const bootstrape=(app)=>{
    
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subCategoryRouter)
    app.use('/api/brands',brandRouter)
    app.use('/api/products',productRouter)
    app.use('/api/users',userRouter)
    app.use('/api/auth',authRouter)
    
}

