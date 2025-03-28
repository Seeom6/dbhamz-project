import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      price: Number,
      quantity: {
        type: Number,
      },
    }
  ],
  paymentId: {
    type: String,
  },
  taxPrice : {
    type: Number,
    default: 0
  },
    shippingPrice: {
      type: Number,
      default: 0,
    },
  totalOrderPrice:{
    type: Number
  },
  totalOrderPriceAfterDiscount: {
    type: Number,
    default: null
  },
  paymentMethod : {
    type: String,
    default: "card"
  },
  isPaid : {
    type: Boolean,
    default: false
  },
  paidAt : Date,
  paymentStatus: {
    type: String,
  },
  isDelivered:{
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  shippingData: {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    street:  {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
  }
}, {timestamps : true});


const Order = mongoose.model("Order" , orderSchema)

export default Order