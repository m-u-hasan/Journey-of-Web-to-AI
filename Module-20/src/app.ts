import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";
import { userRoutes } from "./modules/users/user.route";


const app: Application = express();

app.use(cors({
    origin: config.app_urlL,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("GET / request received");
    res.send("Hello World");
});


app.use("/api/user", userRoutes)

export default app;