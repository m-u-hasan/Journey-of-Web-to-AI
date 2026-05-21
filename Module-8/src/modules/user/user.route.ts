import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

//==============Insert Data in users Table=================
router.post("/",userController.createUser);

export const userRoute = router