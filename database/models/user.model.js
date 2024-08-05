import bcrypt from 'bcrypt';
import { model, Schema, Types } from "mongoose";
import { gender, systemRole } from "../../src/utils/common/enum.js";


const schema = new Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
        minlength: [3,"too short  name"],
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8,"too short password"],
        
    },
    rePassword:{
        type: String,
        required: [true, "Please confirm your password"],
        
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        enum:Object.values(systemRole),
        default:systemRole.USER
    },
    passwordChangedAt:Date
    
},{timestamps: true,versionKey:false})

schema.pre('save',function () {
    this.password=bcrypt.hashSync(this.password,8)
    this.rePassword=bcrypt.hashSync(this.rePassword,8)
})
schema.pre("findOneAndUpdate",function () {
    if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,8)
    if(this._update.rePassword)this._update.rePassword=bcrypt.hashSync(this._update.rePassword,8)
})

export const User= model("User",schema)