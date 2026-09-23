import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { postController } from "./post.controller";

const router = Router();

router.post("/",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),
    postController.createPost);

router.get("/stats",
    postController.getPostsStats

);
router.get("/", postController.getAllPosts);



router.get("/my-posts",

    postController.getMyPosts

)

router.get("/:postId",

    postController.getPostById

)

router.patch(":/postId",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),

    postController.updatePost

)

router.delete("/:postId",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),
    postController.deletePost

)