import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { userController } from "./user.controller";
const router =Router();

router.post("/register", userController.registerUser )

router.get("/me", userController.getMyProfile)



export const userRoutes = router;