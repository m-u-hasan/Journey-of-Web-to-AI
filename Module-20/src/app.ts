import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";


const app: Application = express();

app.use(cors({
    origin: config.app_urlL,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("GET / request received");
    res.send("Hello World");
});


app.post("/api/USERS/register", async (req: Request, res: Response) => {

    const payload = req.body;
    console.log(payload);

    res.status(httpStatus.CREATED).json({ message: "User Registerd succesfully" });

})
export default app;