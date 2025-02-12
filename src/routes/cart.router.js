import { Router } from "express";
import {
  addProductToCart,
  getProductInCart,
  removeItemFromTheCart,
  clearCart,
  updateItemQuantity
} from "../controllers/cart.controller.js";
import { allowedTo, protect } from "../controllers/auth.controller.js";
import {
  addProductToCartValidator,
  removeItemFromCartValidator,
  updateCartQuantityValidator
} from "../lib/validation/cart.validation.js";
const router = Router();

router.use(protect, allowedTo('user'));


router.route('/')
  .post(addProductToCartValidator, addProductToCart)
  .get(getProductInCart)
  .delete(clearCart)

router.route('/:id')
  .delete(removeItemFromCartValidator, removeItemFromTheCart)
  .put(updateCartQuantityValidator, updateItemQuantity)


export default router