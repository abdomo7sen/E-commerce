import { model, Schema} from "mongoose";


const schema = new Schema({

    name: {
        type: String,
        required: [true, "Please enter brand name"],
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
    logo:{
        type: String
    },
    // createdBy:{
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }

},{timestamps: true,versionKey:false})

schema.post("init",(doc)=>{
    doc.logo="http://127.0.0.1:3000/uploads/brand/"+doc.logo
})


export const Brand= model("Brand",schema)