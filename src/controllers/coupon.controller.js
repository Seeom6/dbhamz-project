import Coupon from "../models/coupon.model.js"; 
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";


// # Create Brand
// # POST   /app/brands
// # Private
export const createCoupon = createItem(Coupon);

// # Get Brand
// # GET    /app/brands
// # Public
export const getCoupons = getAllItems(Coupon);

// # Get Brand
// # GET    /app/brands/:id
// # Public
export const getOneCoupon = getOneItem(Coupon);

// # Update Brand
// # PATCH   /app/brands/:id
// # Private
export const updateCoupon = updateItem(Coupon);

// # Delete Brand
// # DELETE    /app/brands/:id
// # Private
export const deleteOneCoupon = deleteItem(Coupon);
