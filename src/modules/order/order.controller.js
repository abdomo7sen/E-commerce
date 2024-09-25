
import { Cart } from "../../../database/models/cart.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Product } from "../../../database/models/product.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/messages.js"
import * as dotenv from "dotenv"
dotenv.config({path:'./config/.env'})

import Stripe from 'stripe';
const stripe = new Stripe(process.env.SCRT_KEY);


const cashOrder= async (req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new AppError(messages.cart.NotFound,404))
    
    let totalOrderPrice=cart.discount?cart.totalPriceAfterDiscount:cart.totalPrice
    let order= new Order({
        user:req.user.userId,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options=cart.cartItems.map((pro)=>{
        return({
            "updateOne":{
                "filter":{_id:pro.product},
                "update":{$inc:{stock:-pro.quantity,sold:pro.quantity}}
            }
        })
    })
    await Product.bulkWrite(options)
    await Cart.findByIdAndDelete(cart._id)
    res.json({message:messages.order.CreatedSuccessfully,order})
}

const userOrders= async(req, res, next) => {
    let orders=await Order.find({user:req.user.userId}).populate("orderItems.product")
    res.json({message:messages.order.Success,orders})
}

const allOrders= async(req, res, next) => {
    let filter={};
    if (req.params.id) {filter.user=req.params.id}
    let orders=await Order.find(filter).populate("orderItems.product")

    res.json({message:messages.order.Success,orders})
}
const createCheckOutSession= async(req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new AppError(messages.cart.NotFound,404))
    
    let totalOrderPrice=cart.discount?cart.totalPriceAfterDiscount:cart.totalPrice
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data:{
                unit_amount:totalOrderPrice*100,
                currency:"egp",
                product_data:{
                    name:req.user.name,
                }
            
            },
            quantity: 1,
          },
      ],
      mode: 'payment',
      success_url: `https://abdomo7sen.github.io/products`,
      cancel_url: `https://abdomo7sen.github.io/`,

      customer_email:req.user.email,
      client_reference_id:req.params.id,
      metadata:req.body.shippingAddress
    });
  
    res.json({message:messages.Success,session});
}
export {
    cashOrder,
    userOrders,
    allOrders,
    createCheckOutSession,
    
}



