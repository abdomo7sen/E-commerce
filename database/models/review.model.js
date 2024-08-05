import { model, Schema, Types } from "mongoose";


const schema = new Schema({

    comment:string,
    user:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    rate:{
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    product:{
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    }
},{timestamps: true,versionKey:false})

export const Review= model("Review",schema)