import asyncHandler from "express-async-handler";
import { CartModel } from "./../models/cart.model.js";
import ApiError from "./../lib/ApiError.js";
import Order from "./../models/order.model.js";
import { getAllItems, getOneItem } from "./general.controller.js";
import {UserService} from "../service/user.service.js";
import axios from "axios";
import {OrderService} from "../service/order.service.js";
import {ZiinaPaymentStatus as ZinaPaymentStatus, ZiinaPaymentStatus} from "../service/payments/ziina/ziina.types.js";
import {ZinnaService} from "../service/payments/ziina/zinna.service.js";


<<<<<<< HEAD
export const createZiinaPayment = async (amount, currencyCode, referenceId) => {
  try {
    const response = await axios.post(
      `${process.env.ZIINA_API_URL}/payment_intent`,
      {
        amount: amount, // Amount in the smallest currency unit (e.g., cents)
        currency_code: currencyCode, // Currency code (e.g., AED)
          // customer_email: userEmail, // Customer's email
        reference_id: referenceId, // Unique reference ID for the transaction
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create Ziina payment");
  }
};
=======
>>>>>>> 4d095729625eebbe768adb66c39e6a9dcd350368

export const checkOutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // Fetch the cart

  const cart = await CartModel.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError("ليس لديك سلة", 404));
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  const user = await UserService.getUserById(req.user.id)
  try {
    const payment = await ZinnaService.createZinaPayment(
      totalOrderPrice * 100,
      "AED",
<<<<<<< HEAD
        // "alslamat407@gmail.com",
      req.user._id
=======
        cart._id
>>>>>>> 4d095729625eebbe768adb66c39e6a9dcd350368
    );
    console.log(payment);
    const order = await Order.create({
      user: req.user._id,
      cartItems: cart.cartItems,
      taxPrice,
      shippingData : 0,
      totalOrderPrice,
      paymentMethod: "card",
      isPaid: false,
      paymentStatus: payment.status,
      paymentId: payment.id,
      reference_id: payment.reference_id,
    });

    res.status(200).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      paymentUrl: payment.redirect_url,
      order,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ApiError("فشل في إنشاء الدفع مع Ziina", 500));
  }
});

export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if(req.user.roles === "user") req.body.filterObj = {user: req.user._id}
    next()
})

export const getPaymentStatus = asyncHandler(async (req, res, next) => {
  try {
    const payment = await axios.get(
        `${process.env.ZIINA_API_URL}/payment_intent/${req.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
    )
    res.json({payment: payment.data});
  }catch (error) {
    console.log(error.message);
    next(error)
  }

})

export const getAllOrders = getAllItems(Order);

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const user = await UserService.getUserById(req.user.id);
  const order = await OrderService.getMyOrders(user._id);
  res.status(200).json({
    data: order,
  })
})

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderService.getOrderById(req.params.id)
  if(![ZiinaPaymentStatus.canceled, ZiinaPaymentStatus.canceled, ZiinaPaymentStatus.failed].includes(order.status)){
    const payment = await ZinnaService.getPayment(order.paymentId)
    order.status = payment.status;
    await order.save()
  }
  res.json({
    data: order
  })
})