import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpSatus from "http-status"
import { error } from "node:console";


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
    const result = await postService.getAllPosts();

    sendResponse(res, {
        success: true,
        statusCode: httpSatus.OK,
        message: "Get all post successfully",
        data: result
    })
})

const getPostById =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const postId= req.params.postId;
    if(!postId){
        throw new Error ("Post ")
    }
    const result = await postService.getPostById(postId as string)

    sendResponse (res, {
        success: true,
        statusCode: httpSatus.OK,
        message: "Post rettrived success",
        data: result
    })
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