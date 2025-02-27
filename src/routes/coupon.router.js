import { Router } from "express";
import {
    createCoupon,
    deleteCoupon,
    getCoupons, getOneItemCoupon,
    updateCoupon
} from "../controllers/coupon.controller.js";
import {allowedTo, protect} from "../controllers/auth.controller.js";

const router = Router();

router.use(protect, allowedTo('user','maneger',"admin"));

router.route('/')
    .get(getCoupons)
    .post(createCoupon)

router.route('/:id')
    .get(getOneItemCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)

export default router