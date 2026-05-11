import { createServer, get, IncomingMessage, Server } from "http";

const server:Server= createServer((req:IncomingMessage,res)=>{
    //console.log(req.url); // "/", "/user" "/Product"
      //console.log(req.method); //"Get", "Post", "Deelte"

const url=req.url;
const method=req.method;


if(url==="/" && method==="GET")
{
 //console.log("Server runing in root route");
 //for show browser/client
res.writeHead(200,{"content-type":"application/json"});
res.end(JSON.stringify({message: "This is root route"}));
}
else if(url?.startsWith("/Products"))
{
    res.writeHead(400,{"content-type":"application/json"});
res.end(JSON.stringify({message: "This is product route"}));
}

else{
    res.writeHead(400,{"content-type":"application/json"});
res.end(JSON.stringify({message: "Route Not found"}));
}



},);



server.listen(5000,()=>{
    console.log("Server is running at port: 50000");
});
