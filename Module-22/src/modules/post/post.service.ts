import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

const createPost = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create(
        {
            data: {
                ...payload,
                authorId: userId
            }
        }
    )
    return result
}

const getAllPosts = async () => {
    const allPosts = await prisma.post.findMany(
        {
            include: {
                author: {
                    omit: {
                        password: true,
                    }
                },
                comments: true
            }
        }
    );
    return allPosts;
}

const getPostById = async (postId: string) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

const updatePost = await prisma.post.update({
    where: {
        id: postId,
    },
    data: {
        views: {
            increment: 1
        },
    },

    include: {
        author: {
            omit: {
                password: true
            }
        },
        comments: true
    }
})
return updatePost
}


const deletePost = () => {

}

const getPostsStats = () => {

}

const getMyPosts = async(authorId: string) => {
    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        orderBy:{
            createdAt: "desc"
        },
        include: {
            comments: true,
            author: {
                omit:{
                    password: true,
                }
                
        },
        _count:{
            select:{
                comments: true
                
            }
        }
        }


});
return result;
}

export const postService = {

    createPost,

    getAllPosts,
    getPostById,
     getMyPosts 

}