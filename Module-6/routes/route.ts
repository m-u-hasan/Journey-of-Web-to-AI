import type { IncomingMessage, ServerResponse } from "http";
//import{productController} from "../controller/productController.ts"
import { productController } from "../controller/productController.ts";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    //console.log(req.url); // "/", "/user" "/Product"
    //console.log(req.method); //"Get", "Post", "Deelte"

    const url = req.url;
    const method = req.method;


    if (url === "/" && method === "GET") {
        //console.log("Server runing in root route");
        //for show browser/client
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is root route hub" }));
    }
    else if (url?.startsWith("/Products")) {
        productController(req, res);
    }

    else {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not found" }));
    }


};