import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "node:path"
import { fileURLToPath } from 'node:url';
import bodyParser from "body-parser";


import dbConnection from "./config/dbConnection.js";
import globalError from "./middleware/error.middleware.js";
import ApiError from "./lib/ApiError.js";

import BrandRouter from "./routes/brand.route.js";
import ProductRouter from "./routes/product.route.js";
import UserRoute from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import reviewRouter from "./routes/review.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "config.env" });

const app = express();

// Configuration app
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "/uploads")))
app.use(cookieParser());

// Mount Routes
app.use("/app/v1/brands", BrandRouter);
app.use("/app/v1/products", ProductRouter);
app.use("/app/v1/users" , UserRoute)
app.use("/app/v1/auth" , authRouter)
app.use("/app/v1/reviews" , reviewRouter)

// globalError
app.all("*", (req, res, next) => {
  return next(new ApiError(`Can't find this path ${req.originalUrl}`, 404));
});

app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Errors : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting Down... ");
    process.exit(1);
  });
});

const Port = process.env.PORT || 3066;
app.listen(Port, (req, res) => {
  console.log(`app listening on Port : ${Port}`);
  dbConnection();
});
