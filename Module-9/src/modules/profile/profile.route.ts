import { Router } from "express";
import { profileController } from "./profile.controller";

const router=Router();

router.post("/", profileController.createProfile);
//console.log("This is profiel router");


export const profileRoute=router;