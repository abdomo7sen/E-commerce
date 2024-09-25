import { model, Schema, Types} from "mongoose";
import { payment } from "../../src/utils/common/enum.js";


const schema = new Schema({
    user:{
        type:Types.ObjectId,
        ref: "User"
    },
    orderItems:[
        {
            product:{
                type:Types.ObjectId,
                ref: "Product"
            },
            quantity:{type:Number},
            price:Number,
        },
    ],
        totalOrderPrice:Number,
        // status:{type:String,default: "pending"},
        shippingAddress:{
            city:String,
            phone:String,
            street:String,
        },
        paymentMethod:{
            type:String,
            enum:Object.values(payment),
            default: payment.CASH

        },

        isPaid:{
            type:Boolean,
            default:false
        },
        paymentDate:Date,
        shippingDate:Date,
        isDelivered:{
            type:Boolean,
            default:false
        },
},{timestamps: true,versionKey:false})

export const Order= model("Order",schema)