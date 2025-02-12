
import asyncHandler from "express-async-handler";
import CartService  from "../service/cart.service.js"
import {CartModel} from "../models/cart.model.js";


export const addProductToCart = asyncHandler(async (req, res)=>{
  await CartService.addProductToCart(req.body,req.user)
  res.status(200).json({ numberOfItem: cart.cartItems.length, data: cart })

})

export const getProductInCart = asyncHandler( async (req,res)=>{
  const cart = await CartService.getProductInCart(req.user._id)
  res.status(200).json({ numberOfItem: cart.cartItems.length, data: cart })
})

export const removeItemFromTheCart = asyncHandler( async (req, res)=>{
  let cart = await CartService.removeItemFromTheCart(req.params.id, req.user._id)
  res.status(200).json({ numberOfItem: cart.cartItems.length, data: cart })
})

export const clearCart = asyncHandler( async (req, res)=>{
  await CartModel.findOneAndDelete({user: req.user._id})
  res.status(204).json()
} )

export const updateItemQuantity = asyncHandler( async (req, res)=>{
  const cart = await CartService.updateItemQuantity(req.body, req.params.id, req.user._id)
  res.status(200).json({ numberOfItem: cart.cartItems.length, data: cart })
})