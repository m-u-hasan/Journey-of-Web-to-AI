import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import { pool } from "../../db";
import auth from "../../middleware/auth";


const router = Router();
//==============CRUD Operation=================
router.post("/",userController.createUser);

router.get("/", auth(), userController.getAllUsers ); //====use of auth midelware====

router.get("/:id", userController.getSingleUser );

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);



export const userRoute = router