import { model, Schema, Types } from "mongoose";


const schema = new Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    category:{
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    // createdBy:{
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
},{timestamps: true,versionKey:false})

export const SubCategory= model("SubCategory",schema)