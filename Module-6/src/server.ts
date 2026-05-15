//import { createServer, get, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/route";

import { createServer, IncomingMessage, Server } from "http";
const server: Server = createServer((req: IncomingMessage, res) => {

    routeHandler(req, res);

},);

server.listen(5000, () => {
    console.log("Server is running at port: 50000");
});
