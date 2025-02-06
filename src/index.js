

import express from "express";
import dotenv from "dotenv";

import dbConnection from "./config/dbConnection.js";
import globalError from "./middleware/error.middleware.js";
import ApiError from "./lib/ApiError.js";
import {appRouter} from "./routes/index.js";
import {appConfig} from "./config/appConfig.js";

dotenv.config({ path: "config.env" });

const app = express();

appConfig(app)
appRouter(app)

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

dbConnection().then(()=>{
  const Port = process.env.PORT || 3066;
  app.listen(Port, (req, res) => {
    console.log(`app listening on Port : ${Port}`);
  });
})

