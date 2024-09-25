
import { Cart } from "../../../database/models/cart.model.js"
import { Coupon } from "../../../database/models/coupon.model.js"
import { Product } from "../../../database/models/product.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/messages.js"

function calcTotalPrice(cartExist){
    cartExist.totalPrice=cartExist.cartItems.reduce((prev,item) => prev+=item.price*item.quantity,0)

    if(cartExist.discount){
        cartExist.totalPriceAfterDiscount=cartExist.totalPrice-(cartExist.totalPrice*cartExist.discount)/100

    }
}

const addToCart= async (req,res,next)=>{
    let cartExist=await Cart.findOne({user:req.user.userId})    
    let product=await Product.findById(req.body.product)
    
    if(!product) next(new AppError(messages.Product.NotFound))
        req.body.price=product.price
    if(product.stock<req.body.quantity) return next(new AppError(messages.cart.stock,404))

    if(!cartExist){
    const cart=new Cart({
        user:req.user.userId,
        
        cartItems:[req.body],
    })
    calcTotalPrice(cart)
    await cart.save()
    res.status(201).json({message:messages.cart.CreatedSuccessfully,cart})
    }else{
        let itemExistInCart=cartExist.cartItems.find((item)=>{return item.product == req.body.product })
        
        if(itemExistInCart){ 
            itemExistInCart.quantity+=req.body.quantity||1
        if(product.stock<itemExistInCart.quantity) return next(new AppError(messages.cart.stock,404))   

        }

        if(!itemExistInCart){
            cartExist.cartItems.push(req.body)
        }

            calcTotalPrice(cartExist)
            await cartExist.save()
        res.status(201).json({message:messages.cart.Added,cartExist})
    }
}



const updateCart=async (req,res,next)=>{
    const cart=await Cart.findOne({user:req.user.userId})
    
    let item = cart.cartItems.find(item=>item.product==req.params.id)

    if(!item) return next(new AppError(messages.Product.NotFound,404))

    item.quantity=req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json({message:messages.cart.UpdatedSuccessfully,cart})
}

const deleteCartItem=async (req,res,next)=>{
    const cart=await Cart.findOneAndUpdate({user:req.user.userId},{$pull:{cartItems:{_id:req.params.id}}},{new:true})

    calcTotalPrice(cart)
    await cart.save()
    res.json({message:messages.Product.DeletedSuccessfully,cart})
}

const getLoggedUserCart=async(req,res,next)=>{
    const cart =await Cart.findOne({user:req.user.userId})

    cart || next(new AppError(messages.cart.NotFound,404))
    !cart || res.json({message:"success",cart})
}

const clearUserCart=async(req,res,next)=>{
    const cart =await Cart.findOneAndDelete({user:req.user.userId})

    cart || next(new AppError(messages.cart.NotFound,404))
    !cart || res.json({message:"success",cart})
}

const applyCoupon=async(req,res,next)=>{
    const coupon= await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError(messages.Coupon.Invalid,404))
    

        const cart=await Cart.findOne({user:req.user.userId})
        console.log(cart);
        
        cart.discount=coupon.discount
    await cart.save()

    res.json({message:messages.Coupon.Apply,cart})
}


export {
    addToCart, clearUserCart, deleteCartItem, getLoggedUserCart, updateCart,applyCoupon
}

