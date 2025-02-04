import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "./../lib/validation/auth.validator.js";

const Router = express.Router();

Router.route("/register").post(signupValidator, signup);
Router.route("/login").post(loginValidator, login);

export default Router;
