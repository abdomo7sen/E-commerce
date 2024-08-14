import { model, Schema, Types } from "mongoose";


const schema = new Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
        minlength: [3,"too short category name"],
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
    // createdBy:{
    //     type: Types.ObjectId,
    //     ref: "User", 
    //     required: true,
    // },
    image:{
        type: String
    }

},{timestamps: true,versionKey:false})
schema.post('init',(doc)=>{
    doc.image = process.env.BASE_URL +"category/"+doc.image
})


export const Category= model("Category",schema)