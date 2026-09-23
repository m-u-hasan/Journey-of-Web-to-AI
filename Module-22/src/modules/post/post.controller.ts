import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpSatus from "http-status"


const createPost =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.user?.id;

    const payload = req.body;

    const result = await postService.createPost(payload, id as string);


    sendResponse(res, {
        success: true,
        statusCode: httpSatus.CREATED,
        message: "Post Created Successfully",
        data: result
    })

})


const getAllPosts =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const getPostById =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const updatePost=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})


const deletePost=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const getPostsStats= catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const getMyPosts= catchAsync(async(req: Request, res: Response, next: NextFunction)=>
{

})

export const postController={
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsStats,
    getMyPosts
}