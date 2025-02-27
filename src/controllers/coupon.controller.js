
import { CouponModel } from '../models/coupon.model.js'
import {createItem, deleteItem, getAllItems, getOneItem, updateItem} from "./general.controller.js";

export const createCoupon = createItem(CouponModel)

export const getCoupons = getAllItems(CouponModel)

export const getOneItemCoupon = getOneItem(CouponModel)

export const updateCoupon = updateItem(CouponModel)

export const deleteCoupon = deleteItem(CouponModel)
