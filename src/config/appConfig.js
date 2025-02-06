import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import {fileURLToPath} from "node:url";
import morgan from "morgan";


export const appConfig = (app)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(express.static(path.join(__dirname , "/uploads")))
    app.use(cookieParser());
    app.use(morgan("dev"));
}