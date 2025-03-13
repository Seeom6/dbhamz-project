import express from "express";

import { allowedTo, protect } from "../controllers/auth.controller.js";
import {
    checkOutSession,
    filterOrderForLoggedUser,
    getAllOrders, getMyOrders,
    getOrder,
    getPaymentStatus
} from "../controllers/order.controller.js";



const Router = express.Router()


Router.route("/").get(protect , allowedTo("user","admin") , filterOrderForLoggedUser ,getAllOrders)
Router.get("/my-order",protect ,allowedTo("user"), getMyOrders)


Router.get("/checkout-payments/:cartId", protect,allowedTo("user"), checkOutSession)
Router.get("/check-payment-status/:id", getPaymentStatus)
Router.get("/:id", protect, getOrder)

<<<<<<< HEAD
Router.route("/checkout-payment/:cartId").post(protect,allowedTo("user"), checkOutSession)
=======
>>>>>>> 4d095729625eebbe768adb66c39e6a9dcd350368


export default Router