import { createServer, IncomingMessage, Server } from "http";

const server:Server= createServer((req:IncomingMessage,res)=>{
    console.log(req);
});

// const server:Server= createServer((req:IncomingMessage,res)=>{
//     console.log(req);
// })

server.listen(5000,()=>{
    console.log("Server is running at port: 50000");
});
