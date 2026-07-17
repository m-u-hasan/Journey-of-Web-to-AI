import { prisma } from "./lib/prisma";

async function main() {
    // Create a new user with a post
    // const user = await prisma.user.create({
    //     data: {
    //         name: "Alice",
    //         email: "al@prisma.io",
    //         posts: {
    //             create: {
    //                 title: "Hello World",
    //                 content: "This is my first post!",
    //                 published: true,
    //             },
    //         },
    //     },
    //     include: {
    //         posts: true,
    //     },
    // });

    const newPost = await prisma.post.create({
        data: {
            authorId: 1,
            title: "its is very disturbing situtation",
            content: "I am very dimotivated about my life",
            published: true,
        },
    });
    console.log("created 2nd post:", newPost);
    // console.log("Created user:", user);

    // Fetch all users with their posts
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });