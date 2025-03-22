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
      defualt: null,
    },
    lastName: {
      type: String,
      defualt: null,
    },
    phone: {
      type: String,
      defualt: null,
    },
    city: {
      type: String,
      defualt: null,
    },
    country: {
      type: String,
      defualt: null,
    },
    street:  {
      type: String,
      defualt: null,
    },
    area: {
      type: String,
      defualt: null,
    },
    note: {
      type: String,
      defualt: null,
    },
  }
}, {timestamps : true});


const Order = mongoose.model("Order" , orderSchema)

export default Order