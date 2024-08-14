import { model, Schema, Types } from "mongoose";


const schema = new Schema({

    title: {
        type: String,
        required: [true, "Please enter a title"],
        minlength: [3,"too short category title"],
        trim: true,
        unique: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    description:{
        type: String,
        required: [true, "Please enter a description"],
        minlength: [10,"too short description"],
        trim: true,
    },
    category:{
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subCategory:{
        type: Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    brand:{
        type: Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    images:{
        type: [String]
    },
    imageCover:{
        type: String
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    priceAfterDiscount:{
        type: Number,
        required: true,
        min: 0,
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
    },
    sold:{
        type: Number,
        min: 0,
    },
    rateAvg:{
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    rateCount:{
        type: Number,
        min: 0,
        default: 0,
    },
    // createdBy:{
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
    


},{timestamps: true,versionKey:false,toJSON:{virtuals:true},id:false})

schema.virtual("reviews",
    {
        ref: "Review",
        localField: "_id",
        foreignField: "product",
        
    }
)

schema.pre("findOne",function(){
    this.populate("reviews")
})

schema.post("init",(doc)=>{
    if( doc.imageCover)doc.imageCover=process.env.BASE_URL +'products/'+doc.imageCover
    if(doc.images)doc.images=doc.images.map(img=>process.env.BASE_URL +"products/"+img)
})

export const Product= model("Product",schema)